-- Run this only if customers should be able to view active products before signing in.
-- This grants SELECT only; it does not allow anonymous users to insert/update/delete products.
grant usage on schema public to anon;
grant select on table public.products to anon;

drop policy if exists products_read_active_anon on public.products;
create policy products_read_active_anon
on public.products
for select
to anon
using (is_active = true);
