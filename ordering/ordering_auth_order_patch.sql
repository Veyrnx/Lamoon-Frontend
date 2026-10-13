-- Run this once in Supabase SQL Editor after the base coconut_icecream_supabase_install.sql.
-- It synchronizes the three demo website promotions and applies the displayed 49 THB delivery fee.
insert into public.promotions (name, code, description, promotion_type, value, minimum_order_amount, member_only, is_active)
values
  ('สุขสันต์วันปีใหม่', 'NEWYEAR120', 'ส่วนลด 120 บาท เมื่อซื้อครบ 600 บาท', 'fixed', 120, 600, false, true),
  ('เย็นฉ่ำวันสงกรานต์', 'SONGKRAN80', 'ส่วนลด 80 บาท เมื่อซื้อครบ 400 บาท', 'fixed', 80, 400, false, true),
  ('วันเด็กแสนสนุก', 'KIDSDAY50', 'ส่วนลด 50 บาท เมื่อซื้อครบ 200 บาท', 'fixed', 50, 200, false, true)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  promotion_type = excluded.promotion_type,
  value = excluded.value,
  minimum_order_amount = excluded.minimum_order_amount,
  member_only = excluded.member_only,
  is_active = excluded.is_active;

-- Schema extensions for tub items, account-based loyalty and customer-specific tracking.
alter table public.order_items alter column product_id drop not null;
alter table public.order_items add column if not exists item_options jsonb;
alter table public.customers add column if not exists loyalty_reset_at timestamptz;
alter table public.customers add column if not exists points_balance integer not null default 0;
update public.customers c
set loyalty_reset_at = coalesce(c.loyalty_reset_at, c.created_at + interval '1 year')
where c.loyalty_reset_at is null;

create table if not exists public.loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  points_change integer not null,
  transaction_type text not null check (transaction_type in ('earned','redeemed','expired','adjustment')),
  description text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Customers can read their own orders" on public.orders;
create policy "Customers can read their own orders" on public.orders for select to authenticated
using (exists (select 1 from public.customers c where c.id = orders.customer_id and c.profile_id = auth.uid()));
drop policy if exists "Customers can read items of their own orders" on public.order_items;
create policy "Customers can read items of their own orders" on public.order_items for select to authenticated
using (exists (select 1 from public.orders o join public.customers c on c.id = o.customer_id where o.id = order_items.order_id and c.profile_id = auth.uid()));

drop policy if exists "Customers can read their own customer profile" on public.customers;
create policy "Customers can read their own customer profile" on public.customers for select to authenticated
using (profile_id = auth.uid());

drop policy if exists "Customers can read their own loyalty transactions" on public.loyalty_transactions;
create policy "Customers can read their own loyalty transactions" on public.loyalty_transactions for select to authenticated
using (exists (select 1 from public.customers c where c.id = loyalty_transactions.customer_id and c.profile_id = auth.uid()));

grant select on public.orders, public.order_items, public.customers, public.loyalty_transactions to authenticated;

drop function if exists public.place_order(jsonb, timestamptz, text, text, text, text);

create or replace function public.place_order(
  p_items jsonb,
  p_delivery_date timestamptz default null,
  p_delivery_type text default 'pickup',
  p_delivery_address text default null,
  p_promotion_code text default null,
  p_notes text default null,
  p_tub jsonb default null,
  p_redeem_points boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer public.customers%rowtype;
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
  v_product_id uuid;
  v_quantity integer;
  v_price numeric(12,2);
  v_name text;
  v_subtotal numeric(12,2) := 0;
  v_discount numeric(12,2) := 0;
  v_total numeric(12,2) := 0;
  v_promo public.promotions%rowtype;
  v_has_promo boolean := false;
  v_tub_quantity integer := 0;
  v_tub_flavor text;
  v_tub_addons jsonb := '[]'::jsonb;
  v_addon jsonb;
  v_addon_name text;
  v_addon_price numeric(12,2);
  v_tub_unit numeric(12,2) := 1000;
  v_points_earned integer := 0;
  v_points_to_redeem integer := 0;
  v_points_available integer := 0;
begin
  if auth.uid() is null then raise exception 'กรุณาเข้าสู่ระบบก่อนสั่งซื้อ'; end if;
  if (coalesce(jsonb_typeof(p_items), 'array') <> 'array') then raise exception 'รูปแบบรายการสินค้าไม่ถูกต้อง'; end if;
  if coalesce(jsonb_array_length(p_items), 0) = 0 and p_tub is null then raise exception 'กรุณาเลือกสินค้าอย่างน้อย 1 รายการ'; end if;
  if p_delivery_type not in ('pickup','in_town','outside_town') then raise exception 'ประเภทการรับสินค้าไม่ถูกต้อง'; end if;

  select * into v_customer from public.customers c where c.profile_id = auth.uid() for update;
  if v_customer.id is null then raise exception 'ไม่พบข้อมูลลูกค้า กรุณาออกจากระบบแล้วเข้าสู่ระบบใหม่'; end if;

  -- Points expire on the anniversary cycle, starting from the customer's signup/profile creation date.
  if v_customer.loyalty_reset_at is null then
    update public.customers set loyalty_reset_at = coalesce(v_customer.created_at, now()) + interval '1 year' where id = v_customer.id returning * into v_customer;
  end if;
  while v_customer.loyalty_reset_at <= now() loop
    if v_customer.points_balance > 0 then
      insert into public.loyalty_transactions(customer_id, points_change, transaction_type, description)
      values (v_customer.id, -v_customer.points_balance, 'expired', 'หมดอายุแต้มเมื่อครบหนึ่งปี');
    end if;
    update public.customers set points_balance = 0, loyalty_reset_at = loyalty_reset_at + interval '1 year' where id = v_customer.id returning * into v_customer;
  end loop;

  for v_item in select value from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) loop
    v_product_id := (v_item ->> 'product_id')::uuid;
    v_quantity := (v_item ->> 'quantity')::integer;
    if v_quantity is null or v_quantity < 1 or v_quantity > 1000 then raise exception 'จำนวนสินค้าต้องอยู่ระหว่าง 1 ถึง 1000'; end if;
    select p.price, p.name into v_price, v_name from public.products p where p.id = v_product_id and p.is_active = true;
    if not found then raise exception 'ไม่พบสินค้าหรือสินค้าปิดขายแล้ว: %', v_product_id; end if;
    v_subtotal := v_subtotal + (v_price * v_quantity);
  end loop;

  if p_tub is not null then
    v_tub_quantity := (p_tub ->> 'quantity')::integer;
    v_tub_flavor := nullif(btrim(p_tub ->> 'flavor'), '');
    v_tub_addons := coalesce(p_tub -> 'add_ons', '[]'::jsonb);
    if v_tub_quantity is null or v_tub_quantity < 1 or v_tub_quantity > 100 then raise exception 'จำนวนถังต้องอยู่ระหว่าง 1 ถึง 100'; end if;
    if v_tub_flavor is null then raise exception 'กรุณาเลือกรสชาติไอศกรีมถัง'; end if;
    if jsonb_typeof(v_tub_addons) <> 'array' then raise exception 'รายการอุปกรณ์เสริมไม่ถูกต้อง'; end if;
    for v_addon in select value from jsonb_array_elements(v_tub_addons) loop
      v_addon_name := v_addon #>> '{}';
      v_addon_price := case v_addon_name when 'ถ้วยกรอบยกแถว' then 180 when 'ถ้วยกระดาษยกแถว' then 120 when 'ขนมปังยกแพ็ค' then 80 else null end;
      if v_addon_price is null then raise exception 'ไม่พบอุปกรณ์เสริม: %', v_addon_name; end if;
      v_tub_unit := v_tub_unit + v_addon_price;
    end loop;
    v_subtotal := v_subtotal + (v_tub_unit * v_tub_quantity);
  end if;

  if p_promotion_code is not null and btrim(p_promotion_code) <> '' then
    select * into v_promo from public.promotions p
    where upper(p.code) = upper(btrim(p_promotion_code)) and p.is_active = true
      and (p.starts_at is null or p.starts_at <= now()) and (p.ends_at is null or p.ends_at >= now()) limit 1;
    if not found then raise exception 'โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุ'; end if;
    if v_subtotal < v_promo.minimum_order_amount then raise exception 'ยอดสั่งซื้อไม่ถึงขั้นต่ำของโปรโมชั่น'; end if;
    if v_promo.member_only and not v_customer.is_member then raise exception 'โปรโมชั่นนี้สำหรับสมาชิกเท่านั้น'; end if;
    if v_promo.promotion_type = 'percent' then
      if v_promo.value > 100 then raise exception 'เปอร์เซ็นต์ส่วนลดต้องไม่เกิน 100'; end if;
      v_discount := round(v_subtotal * v_promo.value / 100, 2);
    elsif v_promo.promotion_type = 'fixed' then v_discount := least(v_subtotal, v_promo.value);
    end if;
    v_has_promo := true;
  end if;

  if coalesce(p_redeem_points, false) then
    v_points_available := v_customer.points_balance;
    if v_points_available < 100 then raise exception 'ต้องมีอย่างน้อย 100 แต้มจึงจะแลกส่วนลด 50 บาทได้'; end if;
    v_points_to_redeem := 100;
    v_discount := least(v_subtotal, v_discount + ((v_points_to_redeem / 100) * 50));
    update public.customers set points_balance = points_balance - v_points_to_redeem where id = v_customer.id;
  end if;

  v_total := greatest(v_subtotal - v_discount + 49, 0);
  v_order_number := 'CI-' || to_char(now(), 'YYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  insert into public.orders (order_number, customer_id, status, delivery_date, delivery_type, delivery_address, subtotal, discount_amount, total_amount, promotion_id, notes, created_by)
  values (v_order_number, v_customer.id, 'pending', p_delivery_date, p_delivery_type, p_delivery_address, v_subtotal, v_discount, v_total, case when v_has_promo then v_promo.id else null end, p_notes, auth.uid()) returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) loop
    v_product_id := (v_item ->> 'product_id')::uuid;
    v_quantity := (v_item ->> 'quantity')::integer;
    select p.price, p.name into v_price, v_name from public.products p where p.id = v_product_id and p.is_active = true;
    insert into public.order_items(order_id, product_id, product_name_snapshot, quantity, unit_price, line_total, item_options)
    values (v_order_id, v_product_id, v_name, v_quantity, v_price, v_price * v_quantity, null);
  end loop;

  if p_tub is not null then
    insert into public.order_items(order_id, product_id, product_name_snapshot, quantity, unit_price, line_total, item_options)
    values (v_order_id, null, 'ไอศกรีมแบบถัง', v_tub_quantity, v_tub_unit, v_tub_unit * v_tub_quantity,
      jsonb_build_object('flavor', v_tub_flavor, 'add_ons', v_tub_addons, 'base_price', 1000));
  end if;

  if p_delivery_date is not null or p_delivery_type <> 'pickup' then
    insert into public.deliveries(order_id, delivery_status, scheduled_at) values (v_order_id, 'scheduled', p_delivery_date);
  end if;

  v_points_earned := floor(greatest(v_subtotal - v_discount, 0) / 10)::integer;
  if v_points_earned > 0 then
    update public.customers set points_balance = points_balance + v_points_earned where id = v_customer.id;
    insert into public.loyalty_transactions(customer_id, order_id, points_change, transaction_type, description)
    values (v_customer.id, v_order_id, v_points_earned, 'earned', 'รับแต้มจากยอดซื้อคำสั่งซื้อ ' || v_order_number);
  end if;
  if v_points_to_redeem > 0 then
    insert into public.loyalty_transactions(customer_id, order_id, points_change, transaction_type, description)
    values (v_customer.id, v_order_id, -v_points_to_redeem, 'redeemed', 'แลกส่วนลด 50 บาทต่อ 100 แต้ม');
  end if;
  return v_order_id;
end;
$$;


-- เก็บข้อมูลติดต่อและที่อยู่จัดส่งของลูกค้าไว้ในบัญชี
alter table public.customers add column if not exists phone text;
alter table public.customers add column if not exists address text;

-- อนุญาตให้ลูกค้าแก้ไขเบอร์โทรศัพท์และที่อยู่ของบัญชีตัวเอง
 drop policy if exists "Customers can update their own customer profile" on public.customers;
 create policy "Customers can update their own customer profile" on public.customers for update to authenticated
 using (profile_id = auth.uid()) with check (profile_id = auth.uid());
