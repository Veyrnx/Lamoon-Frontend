import { useEffect, useMemo, useState, type ReactNode } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "./lib/supabase";

type IconName = "bag" | "box" | "calendar" | "check" | "chevron" | "clock" | "close" | "gift" | "heart" | "home" | "leaf" | "location" | "mail" | "minus" | "phone" | "plus" | "search" | "settings" | "star" | "truck" | "user"

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, ReactNode> = {
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    box: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7M12 11v10" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4m8-4v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    gift: (
      <>
        <path d="M4 10h16v11H4zM3 7h18v3H3zM12 7v14" />
        <path d="M12 7H8.5a2.5 2.5 0 1 1 2.2-3.7L12 7Zm0 0h3.5a2.5 2.5 0 1 0-2.2-3.7L12 7Z" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5a5.5 5.5 0 0 0 1.1-8.9Z" />
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" />
        <path d="M4 21c3-6 7-9 12-12" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.5-1.5-6.5-4.5-8-8l2-2-2-4Z" />
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    star: (
      <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8l3-6Z" />
    ),
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

type Product = {
  id: number
  supabaseId?: string
  name: string
  detail: string
  price: number
  stock?: number
  tag?: string
  image: string
}

const demoProducts: Product[] = [
  {
    id: 1,
    name: "มะพร้าวน้ำหอม",
    detail: "หอมมะพร้าวแท้ เนื้อนุ่มละมุน",
    price: 69,
    stock: 18,
    tag: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1501118347049-aba774d9e0a0?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "ชาไทย",
    detail: "ชาเข้มข้น หวานน้อยกำลังดี",
    price: 69,
    stock: 12,
    tag: "แนะนำ",
    image:
      "https://images.unsplash.com/photo-1477505982272-ead89926a577?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "สตรอเบอร์รี่",
    detail: "เปรี้ยวหวานจากผลไม้แท้",
    price: 69,
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1589378884250-431463f05637?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "ช็อกโกแลต",
    detail: "โกโก้เข้ม เต็มรสช็อกโกแลต",
    price: 79,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1689076758310-92b693fe6b8b?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 5,
    name: "ช็อกชิพ",
    detail: "ช็อกโกแลตกรุบกรอบทุกคำ",
    price: 79,
    stock: 5,
    tag: "เหลือน้อย",
    image:
      "https://images.unsplash.com/photo-1563589173312-476d8c36b242?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "เผือก",
    detail: "หอมเผือกธรรมชาติ เนื้อเนียน",
    price: 69,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1691200324934-d1fca4986671?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 7,
    name: "วนิลลา",
    detail: "วนิลลาหอมคลาสสิก ทานง่าย",
    price: 65,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1597041505347-26a27f87b914?auto=format&fit=crop&w=800&q=85",
  },
]

type Festival = {
  code: string
  name: string
  detail: string
  minimum: number
  discount: number
  theme: string
}

const festivals: Festival[] = [
  {
    code: "NEWYEAR120",
    name: "สุขสันต์วันปีใหม่",
    detail: "ส่งต่อความสุขให้ทุกคนในครอบครัว",
    minimum: 600,
    discount: 120,
    theme: "bg-[#e3eadc]",
  },
  {
    code: "SONGKRAN80",
    name: "เย็นฉ่ำวันสงกรานต์",
    detail: "คลายร้อนกับไอศกรีมโฮมเมด",
    minimum: 400,
    discount: 80,
    theme: "bg-[#dce9e5]",
  },
  {
    code: "KIDSDAY50",
    name: "วันเด็กแสนสนุก",
    detail: "ของอร่อยสำหรับเด็ก ๆ และครอบครัว",
    minimum: 200,
    discount: 50,
    theme: "bg-[#f3e1cf]",
  },
]

type TubOrder = {
  deliveryDate: string
  deliveryTime: string
  flavor: string
  quantity: number
  addOns: string[]
}

const tubAddOns = [
  { name: "ถ้วยกรอบยกแถว", price: 180 },
  { name: "ถ้วยกระดาษยกแถว", price: 120 },
  { name: "ขนมปังยกแพ็ค", price: 80 },
]

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "icon"
  className?: string
  ariaLabel?: string
  disabled?: boolean
}) {
  const variants = {
    primary: "bg-[#536348] text-white hover:bg-[#3f4c37] shadow-sm",
    secondary: "bg-[#f4ebdc] text-[#3e4b35] hover:bg-[#eadbc6]",
    ghost: "bg-transparent text-[#4b5743] hover:bg-[#f4ebdc]",
    icon: "bg-white text-[#4b5743] hover:bg-[#f4ebdc] border border-[#e5d8c5]",
  }
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      className={`disabled:cursor-not-allowed disabled:opacity-40 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-semibold transition active:scale-[.98] ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [checkoutAfterLogin, setCheckoutAfterLogin] = useState(false)
  const [products, setProducts] = useState<Product[]>(demoProducts)
  const [catalogStatus, setCatalogStatus] = useState<"loading" | "connected" | "error" | "not-configured">("loading")
  const [catalogMessage, setCatalogMessage] = useState("")
  const [cart, setCart] = useState<Record<number, number>>({})
  const [pendingCartProductId, setPendingCartProductId] = useState<number | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placedOrderNumber, setPlacedOrderNumber] = useState("")
  const [redeemPoints, setRedeemPoints] = useState(false)
  const [activeView, setActiveView] =
    useState<"shop" | "tracking" | "rewards" | "settings">("shop")
  const [search, setSearch] = useState("")
  const [tubOrders, setTubOrders] = useState<TubOrder[]>([])
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null)
  const [activeFestivals, setActiveFestivals] = useState<Festival[]>([])
  useEffect(() => {
    async function loadActivePromotions() {
      if (!supabase) {
        console.error("ยังไม่ได้เชื่อมต่อ Supabase")
        return
      }
      const { data, error } = await supabase
        .from("promotions")
        .select("code, name, description, minimum_order_amount, value")
        .eq("is_active", true)
        .eq("promotion_type", "fixed")
        .order("name")

      if (error) {
        console.error("โหลดโปรโมชั่นไม่สำเร็จ:", error.message)
        return
      }

      const promotions: Festival[] = (data ?? []).map((item, index) => ({
        code: item.code,
        name: item.name,
        detail: item.description ?? "",
        minimum: Number(item.minimum_order_amount ?? 0),
        discount: Number(item.value ?? 0),
        theme: [
          "bg-[#e3eadc]",
          "bg-[#dce9e5]",
          "bg-[#f3e1cf]",
        ][index % 3],
      }))

      setActiveFestivals(promotions)
    }

    void loadActivePromotions()
  }, [])
  useEffect(() => {
    if (!supabase) return
    let alive = true
    void supabase.auth.getSession().then(({ data }) => {
      if (alive) setUser(data.session?.user ?? null)
    })
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      alive = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      if (!supabase) {
        setCatalogStatus("not-configured")
        setCatalogMessage("ยังไม่ได้ตั้งค่า Supabase ในไฟล์ .env.local จึงกำลังแสดงข้อมูลตัวอย่าง")
        return
      }

      setCatalogStatus("loading")
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, image_url, price, is_active, product_stock(quantity)")
        .eq("is_active", true)
        .order("name")

      if (cancelled) return

      if (error) {
        setCatalogStatus("error")
        setCatalogMessage(`โหลดสินค้าจาก Supabase ไม่สำเร็จ: ${error.message}  — กรุณาตรวจสอบการเชื่อมต่อโปรเจกต์ใหม่`)
        return
      }

      const liveProducts: Product[] = (data ?? []).map((item, index) => ({
        id: index + 1,
        supabaseId: item.id,
        name: item.name,
        detail: item.description ?? "ไอศกรีมโฮมเมด",
        price: Number(item.price),
        image: item.image_url || demoProducts[index % demoProducts.length]?.image || "",
        stock: Math.max(0, Number((Array.isArray(item.product_stock) ? item.product_stock[0]?.quantity : (item.product_stock as { quantity?: number } | null)?.quantity) ?? 0)),
      }))

      setProducts(liveProducts)
      setCatalogStatus("connected")
      setCatalogMessage('กรณีต้องการยกเลิกออเดอร์ โปรดติดต่อทางร้าน 02-123-4567 เวลาทำการ 09:00 - 20:00 น. ทุกวัน')

    }

    void loadProducts()
    const timer = window.setInterval(() => { void loadProducts() }, 15000)
    const onFocus = () => { void loadProducts() }
    window.addEventListener("focus", onFocus)
    return () => { cancelled = true; window.clearInterval(timer); window.removeEventListener("focus", onFocus) }
  }, [])

  useEffect(() => {
    if (catalogStatus !== "connected") return
    setCart((current) => {
      const updated: Record<number, number> = {}
      for (const [id, qty] of Object.entries(current)) {
        const product = products.find((p) => p.id === Number(id))
        const allowed = Math.min(qty, product?.stock ?? 0)
        if (allowed > 0) updated[Number(id)] = allowed
      }
      return JSON.stringify(updated) === JSON.stringify(current) ? current : updated
    })
  }, [products, catalogStatus])

  const cupCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const itemCount =
    cupCount +
    tubOrders.reduce((sum, item) => sum + item.quantity, 0)
  const cupSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((item) => item.id === Number(id))
    return sum + (product?.price ?? 0) * qty
  }, 0)
  const tubSubtotal = tubOrders.reduce((total, order) => {
    const extras = order.addOns.reduce(
      (sum, name) =>
        sum + (tubAddOns.find((item) => item.name === name)?.price ?? 0),
      0
    )

    return total + (1000 + extras) * order.quantity
  }, 0)
  const subtotal = cupSubtotal + tubSubtotal
  const promo = activeFestivals.find((festival) => festival.code === selectedPromo) ?? null
  const discount = promo && subtotal >= promo.minimum ? promo.discount : 0
  const filtered = useMemo(
    () =>
      products.filter(
        (p) => p.name.includes(search) || p.detail.includes(search),
      ),
    [products, search],
  )

  function addTubOrder(newOrder: TubOrder) {
    setTubOrders((current) => {
      const index = current.findIndex(
        (item) =>
          item.flavor === newOrder.flavor &&
          item.deliveryDate === newOrder.deliveryDate &&
          item.deliveryTime === newOrder.deliveryTime &&
          JSON.stringify([...item.addOns].sort()) ===
          JSON.stringify([...newOrder.addOns].sort())
      )

      if (index === -1) {
        return [...current, newOrder]
      }

      return current.map((item, i) =>
        i === index
          ? {
            ...item,
            quantity: item.quantity + newOrder.quantity,
          }
          : item
      )
    })
  }


  function addToCart(id: number) {
    const product = products.find((p) => p.id === id)
    if (!product || product.stock === undefined || product.stock <= 0) return
    setCart((current) => ({ ...current, [id]: Math.min(product.stock!, (current[id] ?? 0) + 1) }))
  }
  useEffect(() => {
    if (!user || pendingCartProductId === null) return

    addToCart(pendingCartProductId)
    setPendingCartProductId(null)
  }, [user, pendingCartProductId])

  function changeQuantity(id: number, delta: number) {
    setCart((current) => {
      const product = products.find((p) => p.id === id)
      const next = Math.min(Math.max(0, product?.stock ?? 0), Math.max(0, (current[id] ?? 0) + delta))
      const updated = { ...current, [id]: next }
      if (!next) delete updated[id]
      return updated
    })
  }

  // กดโปรโมชันเดิมซ้ำเพื่อยกเลิก หรือกดโปรโมชันอื่นเพื่อเปลี่ยนรายการ
  function togglePromo(code: string) {
    setSelectedPromo((current) => (current === code ? null : code))
  }

  function goTo(view: "shop" | "tracking" | "rewards" | "settings") {
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#30382c]">
      <header className="sticky top-0 z-40 border-b border-[#e8ddcc]/80 bg-[#fbf7ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => goTo("shop")}
          >
            <span className="grid size-11 place-items-center rounded-full bg-[#536348] text-white">
              <Icon name="leaf" className="size-6" />
            </span>
            <span>
              <span className="block text-xl font-bold leading-none">ละมุน</span>
              <span className="text-xs text-[#7c7568]">ไอศกรีมโฮมเมด</span>
            </span>
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" onClick={() => goTo("shop")}>
              <Icon name="home" />
              เลือกไอศกรีม
            </Button>
            <Button variant="ghost" onClick={() => goTo("tracking")}>
              <Icon name="truck" />
              ติดตามการจัดส่ง
            </Button>
            <Button variant="ghost" onClick={() => goTo("rewards")}>
              <Icon name="star" />
              แต้มสะสม
            </Button>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              className="hidden sm:inline-flex"
              variant="ghost"
              onClick={() => {
                if (user) void supabase?.auth.signOut()
                else setLoginOpen(true)
              }}
            >
              <Icon name="user" />
              {user ? "ออกจากระบบ" : "เข้าสู่ระบบ"}
            </Button>
            {user && (
              <Button
                ariaLabel="บัญชีและการตั้งค่า"
                className="hidden sm:inline-flex"
                variant="ghost"
                onClick={() => goTo("settings")}
              >
                <Icon name="settings" />
                บัญชี
              </Button>
            )}
            <Button
              ariaLabel={`ตะกร้าสินค้า ${itemCount} ชิ้น`}
              className="relative px-4"
              variant="icon"
              onClick={() => setCartOpen(true)}
            >
              <Icon name="bag" />
              <span className="hidden sm:inline">ตะกร้า</span>
              {itemCount > 0 && (
                <span className="grid size-6 place-items-center rounded-full bg-[#b86146] text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {activeView === "shop" && (
        <main>
          <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <div className="relative grid min-h-[510px] overflow-hidden rounded-[2rem] bg-[#dbe2ce] lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative z-10 flex flex-col items-start justify-center px-7 py-12 sm:px-12 lg:px-16">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-[#536348]">
                  <Icon name="leaf" className="size-4" />
                  ทำสดใหม่ทุกวัน
                </span>
                <h1 className="max-w-xl text-3xl font-bold leading-[1.2] tracking-tight text-[#34402f] sm:text-4xl lg:text-5xl">
                  ความสุขละลายช้า ๆ ในทุกคำ
                </h1>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5f6858]">
                  ไอศกรีมโฮมเมดจากวัตถุดิบธรรมชาติ เลือกรสที่ชอบ เช็กสต็อก
                  และสั่งส่งถึงบ้านได้ง่าย ๆ
                </p>
                <Button
                  className="mt-8 px-7"
                  onClick={() =>
                    document
                      .getElementById("flavors")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  เลือกไอศกรีมเลย
                  <Icon name="chevron" />
                </Button>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#5f6858]">
                  <span className="flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-full bg-white">
                      <Icon name="check" className="size-4" />
                    </span>
                    ชำระเงินปลอดภัย
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-full bg-white">
                      <Icon name="check" className="size-4" />
                    </span>
                    จัดส่งควบคุมความเย็น
                  </span>
                </div>
              </div>
              <div className="relative min-h-72 lg:min-h-full">
                <img
                  alt="ไอศกรีมหลากรสในกล่อง พร้อมเสิร์ฟ"
                  className="absolute inset-0 size-full object-cover"
                  src="https://images.unsplash.com/photo-1629385744299-74b9cf013f52?auto=format&fit=crop&w=1400&q=90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#dbe2ce] via-transparent to-transparent lg:block" />
                <div className="absolute bottom-6 right-6 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-[#f1d5bd] text-[#8c4d37]">
                      <Icon name="star" />
                    </span>
                    <span>
                      <strong className="block text-lg">สะสมแต้มทุกคำสั่งซื้อ</strong>
                      <span className="text-sm text-[#756f63]">
                        ครบ 100 แต้ม รับส่วนลด 50 บาท
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FestivalsSection
            selectedPromo={selectedPromo}
            selectPromo={togglePromo}
            activeFestivals={activeFestivals}
          />
          <TubSection
            products={products}
            addOrder={addTubOrder}
            currentOrder={tubOrders[0] ?? null}
            openCart={() => setCartOpen(true)}
          />

          {/* หมายเหตุใต้รูปไอศกรีมแบบถัง ก่อนถึงส่วนรสชาติของเรา */}
          <aside
            aria-labelledby="tub-order-notice-title"
            className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-[#dfceb7] bg-[#faf6ee] px-5 py-5 text-[#4b5543] shadow-sm sm:px-7">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-[#e6eadf] text-xl">ⓘ</span>
                <div>
                  <h3 id="tub-order-notice-title" className="text-lg font-bold text-[#344332]">หมายเหตุ ก่อนสั่งซื้อไอศกรีมแบบถัง</h3>
                  <p className="mt-2 leading-relaxed">
                    กรุณาตรวจสอบหรือเปลี่ยนชื่อ เบอร์โทรศัพท์ และที่อยู่จัดส่งในหน้าตั้งค่าข้อมูลส่วนตัวให้เรียบร้อยก่อนกดสั่งซื้อ ระบบจะใช้ที่อยู่นี้เป็นที่อยู่จัดส่งสำหรับออเดอร์ถังค่ะ
                  </p>
                  <p className="mt-2 leading-relaxed">
                    กรณีต้องการสั่งทั้งแบบถังและกล่อง ให้กดสั่งแยกในกรณีที่อยู่ในการจัดส่งต่างกัน
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
            id="flavors"
          >
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="font-semibold text-[#a25d43]">
                  รสชาติของเรา
                </span>
                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  เลือกรสที่ถูกใจ
                </h2>
                <p className="mt-2 text-[#756f63]">
                  แสดงจำนวนสินค้าคงเหลือแบบชัดเจน สั่งได้อย่างมั่นใจ
                </p>
              </div>
              <label className="flex min-h-12 w-full items-center gap-3 rounded-full border border-[#ddd0bd] bg-white px-5 md:w-80">
                <Icon name="search" className="size-5 text-[#827b6f]" />
                <input
                  aria-label="ค้นหารสชาติ"
                  className="w-full bg-transparent text-base outline-none placeholder:text-[#9a9387]"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหารสชาติ..."
                  value={search}
                />
              </label>
            </div>
            {catalogMessage && (
              <div className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${catalogStatus === "connected" ? "border-[#cdd9c4] bg-[#eef4e9] text-[#43563b]" : "border-[#e5c9a9] bg-[#fff4e6] text-[#82552c]"}`} role="status">
                {catalogMessage}
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <article
                  className="group overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-[0_8px_30px_rgba(77,67,50,.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(77,67,50,.12)]"
                  key={product.id}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt={`ไอศกรีมรส${product.name}`}
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                      src={product.image}
                    />
                    {product.tag && (
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-sm font-bold ${product.tag === "เหลือน้อย"
                          ? "bg-[#fff0e7] text-[#a44d34]"
                          : "bg-[#f8f3e8] text-[#59654e]"
                          }`}
                      >
                        {product.tag}
                      </span>
                    )}
                    <button
                      aria-label={`เพิ่ม${product.name}เป็นรายการโปรด`}
                      className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-[#655f55] shadow-sm transition hover:text-[#a95148]"
                    >
                      <Icon name="heart" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <strong className="text-lg text-[#536348]">
                        ฿{product.price}
                      </strong>
                    </div>
                    <p className="mt-1 text-sm text-[#7b7468]">
                      {product.detail}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className={`flex items-center gap-1.5 text-sm font-semibold ${product.stock === undefined || product.stock <= 7 ? "text-[#a6533c]" : "text-[#607054]"}`}>
                        <span className={`size-2 rounded-full ${product.stock === undefined || product.stock <= 7 ? "bg-[#c86f53]" : "bg-[#718163]"}`} />
                        {product.stock === undefined || product.stock <= 0 ? "ไม่พร้อมจำหน่าย" : `พร้อมจำหน่าย · เหลือ ${product.stock} กล่อง`}
                      </span>
                      <Button
                        className="min-h-10 px-4 text-sm"
                        onClick={() => {
                          if (!user) {
                            setPendingCartProductId(product.id);
                            setLoginOpen(true);
                            return;
                          }

                          addToCart(product.id);
                        }}
                        disabled={product.stock === undefined || product.stock <= 0}
                        ariaLabel={product.stock === undefined || product.stock <= 0 ? `${product.name} ไม่พร้อมจำหน่าย` : `เพิ่ม${product.name}`}
                      >
                        <Icon name="plus" className="size-4" />
                        เพิ่ม
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-[#efe6d8]">
            <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-8">
              {[
                {
                  icon: "box" as IconName,
                  title: "แพ็กอย่างดี",
                  text: "กล่องเก็บความเย็นโดยเฉพาะ ไอศกรีมถึงมือแบบพร้อมทาน",
                },
                {
                  icon: "truck" as IconName,
                  title: "ติดตามง่าย",
                  text: "ดูสถานะและเวลาจัดส่งได้ทุกขั้นตอนจากหน้าเว็บไซต์",
                },
                {
                  icon: "star" as IconName,
                  title: "ยิ่งสั่ง ยิ่งคุ้ม",
                  text: "ทุก 10 บาท รับ 1 แต้ม ใช้เป็นส่วนลดในครั้งต่อไป",
                },
              ].map((item) => (
                <div
                  className="flex gap-4 rounded-2xl bg-[#f8f3eb] p-6"
                  key={item.title}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#dbe2ce] text-[#536348]">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#736d62]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeView === "tracking" && (
        <TrackingView user={user} onShop={() => goTo("shop")} />
      )}
      {activeView === "rewards" && <RewardsView user={user} onShop={() => goTo("shop")} />}
      {activeView === "settings" && <SettingsView user={user} />}

      <footer className="border-t border-[#e7dccb] bg-[#f7f1e8] pb-24 pt-10 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#536348] text-white">
              <Icon name="leaf" />
            </span>
            <span>
              <strong className="block">ละมุน ไอศกรีมโฮมเมด</strong>
              <span className="text-sm text-[#7d7569]">ทุกคำทำด้วยความตั้งใจ</span>
            </span>
          </div>
          <div className="text-sm leading-7 text-[#716a60]">
            <strong className="text-[#3f483a]">ต้องการความช่วยเหลือ?</strong>
            <br />
            โทร 02-123-4567 · ทุกวัน 09:00–20:00 น.
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-2xl border border-[#e2d6c5] bg-white/95 p-2 shadow-xl backdrop-blur md:hidden">
        <MobileNav
          active={activeView === "shop"}
          icon="home"
          label="เลือกซื้อ"
          onClick={() => goTo("shop")}
        />
        <MobileNav
          active={activeView === "tracking"}
          icon="truck"
          label="ติดตาม"
          onClick={() => goTo("tracking")}
        />
        <MobileNav
          active={activeView === "rewards"}
          icon="star"
          label="แต้มสะสม"
          onClick={() => goTo("rewards")}
        />
        <MobileNav
          active={activeView === "settings"}
          icon="settings"
          label="บัญชี"
          onClick={() => goTo("settings")}
        />
      </div>

      {cartOpen && (
        <OrderCartDrawer
          products={products}
          cart={cart}
          close={() => setCartOpen(false)}
          subtotal={subtotal}
          discount={discount}
          promo={promo}
          selectedPromo={selectedPromo}
          selectPromo={togglePromo}
          tubOrders={tubOrders}
          changeQuantity={changeQuantity}
          changeTubQuantity={(index, delta) => {
            setTubOrders((current) =>
              current
                .map((item, i) =>
                  i === index
                    ? { ...item, quantity: item.quantity + delta }
                    : item
                )
                .filter((item) => item.quantity > 0)
            )
          }}
          checkout={() => {
            setCartOpen(false)
            setOrderPlaced(false)
            if (!user) {
              setCheckoutAfterLogin(true)
              setLoginOpen(true)
            } else {
              setCheckoutOpen(true)
            }
          }}
        />
      )}
      {loginOpen && (
        <LoginModal
          close={() => {
            setLoginOpen(false)
            setCheckoutAfterLogin(false)
          }}
          onSuccess={() => {
            setLoginOpen(false)
            if (checkoutAfterLogin) setCheckoutOpen(true)
            setCheckoutAfterLogin(false)
          }}
        />
      )}
      {checkoutOpen && (
        <OrderCheckoutModal
          initialDeliveryDate={tubOrders[0]?.deliveryDate ?? ""}
          close={() => setCheckoutOpen(false)}
          discount={discount}
          done={orderPlaced}
          placeOrder={async (usePoints, deliveryDate) => {
            if (!supabase) {
              window.alert("ยังไม่ได้ตั้งค่า Supabase กรุณาตรวจสอบไฟล์ .env.local")
              return
            }
            if (!user) {
              setCheckoutOpen(false)
              setCheckoutAfterLogin(true)
              setLoginOpen(true)
              return
            }
            const { data: customerProfile, error: profileError } = await supabase
              .from("customers")
              .select("phone, address")
              .eq("profile_id", user.id)
              .maybeSingle()
            if (profileError) {
              window.alert("ตรวจสอบข้อมูลส่วนตัวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง")
              return
            }
            if (!customerProfile?.phone?.trim() || !customerProfile?.address?.trim()) {
              window.alert("กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนในหน้าบัญชี โดยระบุเบอร์โทรศัพท์และที่อยู่สำหรับจัดส่งก่อนสั่งซื้อ")
              setCheckoutOpen(false)
              setActiveView("settings")
              return
            }
            const items = Object.entries(cart).map(([id, quantity]) => {
              const product = products.find((item) => item.id === Number(id))
              return product?.supabaseId
                ? { product_id: product.supabaseId, quantity }
                : null
            }).filter((item): item is { product_id: string; quantity: number } => item !== null)
            if (
              (items.length === 0 && tubOrders.length === 0) ||
              items.length !== Object.keys(cart).length
            ) {
              window.alert("มีสินค้าในตะกร้าที่ยังไม่ได้เชื่อมกับ Supabase กรุณารีเฟรชหน้าแล้วเลือกสินค้าที่โหลดจากฐานข้อมูลใหม่")
              return
            }
            if (
              tubOrders.some(
                (order) =>
                  order.deliveryDate !== deliveryDate ||
                  order.deliveryTime !== tubOrders[0]?.deliveryTime
              )
            ) {
              window.alert(
                "ไอศกรีมแบบถังในออเดอร์เดียวกันต้องมีวันและเวลาจัดส่งตรงกัน กรุณาแยกออเดอร์หากต้องการจัดส่งต่างเวลา"
              )
              return
            }
            const { data: orderId, error } = await supabase.rpc("place_order", {
              p_items: items,
              p_tub: tubOrders.map((order) => ({
                flavor: order.flavor,
                quantity: order.quantity,
                add_ons: order.addOns,
              })),
              p_delivery_date: `${deliveryDate}T${tubOrders[0]?.deliveryTime ?? "12:00"}:00+07:00`,
              p_delivery_type: "in_town",
              p_delivery_address: customerProfile.address.trim(),
              p_promotion_code: discount > 0 ? (promo?.code ?? null) : null,
              p_redeem_points: usePoints,
              p_notes: null,
            })
            if (error || !orderId) {
              window.alert(`บันทึกคำสั่งซื้อไม่สำเร็จ: ${error?.message ?? "ไม่พบหมายเลขคำสั่งซื้อ"}`)
              return
            }
            const { data: savedOrder } = await supabase
              .from("orders")
              .select("order_number")
              .eq("id", orderId)
              .maybeSingle()
            setPlacedOrderNumber(savedOrder?.order_number ?? String(orderId))
            setOrderPlaced(true)
            setCart({})
            setTubOrders([])
          }}
          promo={promo}
          subtotal={subtotal}
          orderNumber={placedOrderNumber}
          customerPointsEnabled={redeemPoints}
          setCustomerPointsEnabled={setRedeemPoints}
        />
      )}
    </div>
  )
}

function FestivalsSection({
  selectedPromo,
  selectPromo,
  activeFestivals,
}: {
  selectedPromo: string | null
  selectPromo: (code: string) => void
  activeFestivals: Festival[]
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mb-7">
        <span className="font-semibold text-[#a25d43]">โปรโมชันพิเศษ</span>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">ส่วนลดตามเทศกาล</h2>
        <p className="mt-2 text-[#756f63]">
          เลือกโปรโมชันไว้ก่อนได้ ระบบจะหักส่วนลดให้อัตโนมัติเมื่อยอดถึงขั้นต่ำ
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {activeFestivals.map((festival) => {
          const selected = selectedPromo === festival.code
          return (
            <article
              className={`relative overflow-hidden rounded-3xl border p-6 ${festival.theme} ${selected
                ? "border-[#536348] ring-2 ring-[#536348]/20"
                : "border-[#ded5c7]"
                }`}
              key={festival.code}
            >
              <span className="absolute -right-8 -top-8 size-28 rounded-full bg-white/35" />
              <span className="grid size-12 place-items-center rounded-2xl bg-white/80 text-[#6f5541]">
                <Icon name="gift" className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{festival.name}</h3>
              <p className="mt-1 text-sm text-[#716a60]">{festival.detail}</p>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <span className="text-sm text-[#756f63]">ลดทันที</span>
                  <strong className="block text-2xl text-[#a6533c]">
                    ฿{festival.discount}
                  </strong>
                </div>
                <span className="rounded-full bg-white/75 px-3 py-2 text-sm font-semibold">
                  ขั้นต่ำ ฿{festival.minimum}
                </span>
              </div>
              <Button
                className="mt-5 w-full"
                variant={selected ? "secondary" : "primary"}
                onClick={() => selectPromo(festival.code)}
              >
                {selected ? (
                  <>
                    <Icon name="close" />
                    ยกเลิกส่วนลด
                  </>
                ) : (
                  "ใช้โปรโมชันนี้"
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-[#7b7468]">
                รหัส {festival.code} · ใช้ได้ 1 สิทธิ์ต่อคำสั่งซื้อ
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function TubSection({
  products,
  addOrder,
  currentOrder,
  openCart,
}: {
  products: Product[]
  addOrder: (order: TubOrder) => void
  currentOrder: TubOrder | null
  openCart: () => void
}) {
  const [flavor, setFlavor] = useState(products[0]?.name ?? "")
  const [quantity, setQuantity] = useState(1)
  const [addOns, setAddOns] = useState<string[]>([])
  const [added, setAdded] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState(currentOrder?.deliveryDate ?? "")
  const [deliveryTime, setDeliveryTime] = useState(currentOrder?.deliveryTime ?? "")
  const [deliveryError, setDeliveryError] = useState("")
  const todayTH = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date())

  useEffect(() => {
    if (products.length > 0 && !products.some((product) => product.name === flavor)) {
      setFlavor(products[0].name)
    }
  }, [products, flavor])

  const extrasTotal = addOns.reduce(
    (sum, name) =>
      sum + (tubAddOns.find((item) => item.name === name)?.price ?? 0),
    0,
  )

  function toggleAddOn(name: string) {
    setAdded(false)
    setAddOns((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    )
  }

  function addTub() {
    if (!deliveryDate || deliveryDate < todayTH) {
      setDeliveryError("กรุณาเลือกวันจัดส่งตั้งแต่วันนี้เป็นต้นไป")
      return
    }
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(deliveryTime)) { setDeliveryError("กรุณาเลือกเวลาที่ต้องการจัดส่ง"); return }
    if (`${deliveryDate}T${deliveryTime}:00+07:00` <= new Date().toISOString() && deliveryDate === todayTH) { /* server validates final timestamp */ }
    setDeliveryError("")
    addOrder({ flavor, quantity, addOns, deliveryDate, deliveryTime })
    setAdded(true)
  }

  return (
    <section
      className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8"
      id="tub-order"
    >
      <div className="overflow-hidden rounded-[2rem] bg-[#4f5f47] text-white">
        <div className="grid lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-80">
            <img
              alt="ไอศกรีมโฮมเมดหลากรสสำหรับงานเลี้ยง"
              className="absolute inset-0 size-full object-cover opacity-80"
              src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob21lbWFkZSUyMGljZSUyMGNyZWFtJTIwdHViJTIwcGFydHklMjBjYXRlcmluZ3xlbnwxfHx8fDE3OTE1NTM2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#34402f]/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#536348]">
                เหมาะสำหรับงานเลี้ยงและจัดกิจกรรม
              </span>
              <h2 className="mt-5 text-3xl font-bold">ไอศกรีมแบบถัง</h2>
              <p className="mt-2 text-[#e1e8db]">
                1 ถัง ราคา 1,000 บาท เลือกรสและอุปกรณ์เสริมได้ตามต้องการ
              </p>
            </div>
          </div>
          <div className="bg-[#f7f1e8] p-6 text-[#30382c] sm:p-8">
            <div className="rounded-2xl border border-[#d7c9b5] bg-white p-4">
              <div className="flex gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e4eadc] text-[#536348]">
                  <Icon name="gift" />
                </span>
                <div>
                  <strong className="text-lg">ของแถมมาตรฐานทุกถัง</strong>
                  <p className="mt-1 text-sm leading-relaxed text-[#756f63]">
                    ถ้วยกรอบ 1 แพ็ค · ขนมปัง 1 แพ็ค · ถ้วยพร้อมช้อน 1 แพ็ค
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="font-semibold">
                เลือกรสชาติ
                <select
                  className="mt-2 min-h-12 w-full rounded-xl border border-[#d8cbb9] bg-white px-4 outline-none focus:border-[#66735a]"
                  onChange={(event) => {
                    setFlavor(event.target.value)
                    setAdded(false)
                  }}
                  value={flavor}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <span className="font-semibold">จำนวนถัง</span>
                <div className="mt-2 flex min-h-12 items-center justify-between rounded-xl border border-[#d8cbb9] bg-white px-2">
                  <button
                    aria-label="ลดจำนวนถัง"
                    className="grid size-10 place-items-center rounded-full hover:bg-[#f1eadf]"
                    onClick={() => {
                      setQuantity((current) => Math.max(1, current - 1))
                      setAdded(false)
                    }}
                  >
                    <Icon name="minus" />
                  </button>
                  <strong className="text-xl">{quantity}</strong>
                  <button
                    aria-label="เพิ่มจำนวนถัง"
                    className="grid size-10 place-items-center rounded-full hover:bg-[#f1eadf]"
                    onClick={() => {
                      setQuantity((current) => current + 1)
                      setAdded(false)
                    }}
                  >
                    <Icon name="plus" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-[#d8cbb9] bg-white p-5 sm:p-6">
              <h3 className="text-lg font-bold text-[#344332]">กำหนดวันจัดส่งไอศกรีม</h3>
              <p className="mt-1 text-sm text-[#756f63]">เลือกวันที่ต้องการรับสินค้า ที่อยู่จะใช้ตามข้อมูลในหน้าตั้งค่าของคุณ</p>
              <label className="mt-5 block text-sm font-semibold text-[#344332]" htmlFor="tub-delivery-date">วันที่ต้องการจัดส่ง <span className="text-red-600">*</span></label>
              <input
                id="tub-delivery-date"
                aria-label="วันที่ต้องการจัดส่งไอศกรีมแบบถัง"
                type="date"
                required
                min={todayTH}
                value={deliveryDate}
                onChange={(event) => { setDeliveryDate(event.target.value); setDeliveryError(""); setAdded(false) }}
                className="mt-3 min-h-12 w-full max-w-sm rounded-xl border border-[#d8cbb9] bg-white px-4 text-[#30382c] outline-none focus:border-[#536348]"
              />
              <label className="mt-4 block text-sm font-semibold text-[#344332]" htmlFor="tub-delivery-time">เวลาที่ต้องการจัดส่ง <span className="text-red-600">*</span></label>
              <input id="tub-delivery-time" aria-label="เวลาที่ต้องการจัดส่งไอศกรีมแบบถัง" type="time" required value={deliveryTime} onChange={(event) => { setDeliveryTime(event.target.value); setDeliveryError(""); setAdded(false) }} className="mt-3 min-h-12 w-full max-w-sm rounded-xl border border-[#d8cbb9] bg-white px-4 text-[#30382c] outline-none focus:border-[#536348]" />
              <p className="mt-2 text-xs text-[#756f63]">เวลาไทย (Asia/Bangkok) ร้านจะยืนยันช่วงเวลาจัดส่งอีกครั้ง</p>
              {deliveryError && <p role="alert" className="mt-2 text-sm text-red-700">{deliveryError}</p>}
            </div>
            <fieldset className="mt-5">
              <legend className="font-semibold">ต้องการซื้ออุปกรณ์เพิ่มหรือไม่?</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {tubAddOns.map((item) => {
                  const checked = addOns.includes(item.name)
                  return (
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${checked
                        ? "border-[#657559] bg-[#edf1e8]"
                        : "border-[#d8cbb9] bg-white"
                        }`}
                      key={item.name}
                    >
                      <input
                        checked={checked}
                        className="size-5 accent-[#536348]"
                        onChange={() => toggleAddOn(item.name)}
                        type="checkbox"
                      />
                      <span className="text-sm">
                        <strong className="block">{item.name}</strong>
                        <span className="text-[#7b7468]">+฿{item.price}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
            <div className="mt-6 flex flex-col items-stretch justify-between gap-4 border-t border-[#ded3c3] pt-5 sm:flex-row sm:items-center">
              <div>
                <span className="text-sm text-[#756f63]">รวมรายการนี้</span>
                <strong className="block text-3xl text-[#536348]">
                  ฿{((1000 + extrasTotal) * quantity).toLocaleString()}
                </strong>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <Button className="px-7" onClick={addTub}>
                  {added ? (
                    <>
                      <Icon name="check" />
                      เพิ่มลงตะกร้าแล้ว
                    </>
                  ) : (
                    <>
                      <Icon name="bag" />
                      เพิ่มลงตะกร้า
                    </>
                  )}
                </Button>
                {(added || currentOrder) && (
                  <button
                    className="text-sm font-semibold text-[#536348] underline underline-offset-4"
                    onClick={openCart}
                  >
                    ดูรายการในตะกร้า
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SettingsView({ user }: { user: User | null }) {
  const [profile, setProfile] = useState({
    email: user?.email ?? "",
    phone: "",
    address: "",
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let alive = true
    async function loadProfile() {
      if (!user || !supabase) return
      setLoading(true)
      const { data, error } = await supabase
        .from("customers")
        .select("phone, address")
        .eq("profile_id", user.id)
        .maybeSingle()
      if (alive && !error && data) {
        setProfile(current => ({
          ...current,
          email: user.email ?? current.email,
          phone: data.phone ?? "",
          address: data.address ?? "",
        }))
      }
      if (alive) setLoading(false)
    }
    void loadProfile()
    return () => { alive = false }
  }, [user])

  function updateProfile(field: keyof typeof profile, value: string) {
    setSaved(false)
    setProfile((current) => ({ ...current, [field]: value }))
  }

  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <span className="font-semibold text-[#a25d43]">บัญชีของฉัน</span>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">ตั้งค่าข้อมูลส่วนตัว</h1>
        <p className="mt-2 text-[#756f63]">
          แก้ไขช่องทางติดต่อและที่อยู่สำหรับจัดส่งครั้งถัดไป
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[.65fr_1.35fr]">
        <aside className="rounded-3xl bg-[#dbe2ce] p-6">
          <span className="grid size-16 place-items-center rounded-full bg-white text-[#536348]">
            <Icon name="user" className="size-8" />
          </span>
          <h2 className="mt-5 text-xl font-bold">{user?.user_metadata?.full_name || "ลูกค้าละมุน"}</h2>
          <p className="mt-1 text-[#66705e]">{user ? "บัญชีที่เข้าสู่ระบบแล้ว" : "ยังไม่ได้เข้าสู่ระบบ"}</p>
          <div className="mt-6 space-y-3 border-t border-[#bdc8b3] pt-5 text-sm">
            <p className="flex items-center gap-3">
              <Icon name="phone" />
              {profile.phone}
            </p>
            <p className="flex items-center gap-3 break-all">
              <Icon name="mail" />
              {profile.email}
            </p>
          </div>
        </aside>
        <section className="rounded-3xl border border-[#e7dccb] bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eee7dc] text-[#536348]">
              <Icon name="settings" />
            </span>
            <div>
              <h2 className="text-xl font-bold">ข้อมูลติดต่อและจัดส่ง</h2>
              <p className="text-sm text-[#7b7468]">
                ข้อมูลนี้ใช้สำหรับแจ้งสถานะและจัดส่งสินค้า
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="font-semibold">
              อีเมล
              <span className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-[#dbcfbe] bg-[#fffdf9] px-4 focus-within:border-[#66735a]">
                <Icon name="mail" className="size-5 text-[#81796d]" />
                <input
                  className="w-full bg-transparent outline-none"
                  onChange={(event) =>
                    updateProfile("email", event.target.value)
                  }
                  type="email"
                  value={profile.email}
                />
              </span>
            </label>
            <label className="font-semibold">
              เบอร์โทรศัพท์
              <span className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-[#dbcfbe] bg-[#fffdf9] px-4 focus-within:border-[#66735a]">
                <Icon name="phone" className="size-5 text-[#81796d]" />
                <input
                  className="w-full bg-transparent outline-none"
                  inputMode="tel"
                  onChange={(event) =>
                    updateProfile("phone", event.target.value)
                  }
                  value={profile.phone}
                />
              </span>
            </label>
          </div>
          <label className="mt-5 block font-semibold">
            ที่อยู่สำหรับจัดส่ง
            <span className="mt-2 flex items-start gap-3 rounded-xl border border-[#dbcfbe] bg-[#fffdf9] px-4 py-3 focus-within:border-[#66735a]">
              <Icon
                name="location"
                className="mt-1 size-5 shrink-0 text-[#81796d]"
              />
              <textarea
                className="min-h-24 w-full resize-none bg-transparent outline-none"
                onChange={(event) =>
                  updateProfile("address", event.target.value)
                }
                value={profile.address}
              />
            </span>
          </label>
          {saved && (
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#e7eee1] p-4 font-semibold text-[#536348]">
              <Icon name="check" />
              บันทึกข้อมูลเรียบร้อยแล้ว
            </div>
          )}
          <p className="mt-4 text-xs leading-relaxed text-[#8a8277]">กรุณากรอกเบอร์โทรศัพท์และที่อยู่สำหรับจัดส่งให้ครบถ้วนก่อนสั่งซื้อ ระบบจะบันทึกข้อมูลไว้ในบัญชีของคุณ</p>
          <div className="mt-6 flex justify-end">
            <Button onClick={async () => {
              if (!user || !supabase) {
                window.alert("กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูลส่วนตัว")
                return
              }
              if (!profile.phone.trim() || !profile.address.trim()) {
                window.alert("กรุณากรอกเบอร์โทรศัพท์และที่อยู่สำหรับจัดส่งให้ครบถ้วน")
                return
              }
              setLoading(true)
              const { error } = await supabase
                .from("customers")
                .update({ phone: profile.phone.trim(), address: profile.address.trim() })
                .eq("profile_id", user.id)
              setLoading(false)
              if (error) {
                window.alert(`บันทึกข้อมูลไม่สำเร็จ: ${error.message} กรุณารัน SQL สำหรับเพิ่มคอลัมน์ phone และ address ก่อน`)
                return
              }
              setSaved(true)
            }}>
              <Icon name="check" />
              {loading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

function OrderCartDrawer({
  products,
  cart,
  close,
  subtotal,
  discount,
  promo,
  selectedPromo,
  selectPromo,
  tubOrders,
  changeQuantity,
  changeTubQuantity,
  checkout,
}: {
  products: Product[]
  cart: Record<number, number>
  close: () => void
  subtotal: number
  discount: number
  promo: Festival | null
  selectedPromo: string | null
  selectPromo: (code: string) => void
  tubOrders: TubOrder[]
  changeQuantity: (id: number, delta: number) => void
  changeTubQuantity: (index: number, delta: number) => void
  checkout: () => void
}) {
  const rows = products.filter((product) => cart[product.id])
  const hasItems = rows.length > 0 || tubOrders.length > 0

  return (
    <div className="fixed inset-0 z-50 bg-[#252b22]/40" onMouseDown={close}>
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fbf7ef] p-5 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">ตะกร้าของคุณ</h2>
            <p className="text-sm text-[#7c756a]">
              {rows.length + tubOrders.length} รายการ
            </p>
          </div>
          <Button
            ariaLabel="ปิดตะกร้า"
            className="size-11 p-0"
            variant="icon"
            onClick={close}
          >
            <Icon
              name="close"
              className="h-6 w-6 shrink-0 text-[#30382c]"
            />
          </Button>
        </div>
        <div className="mt-6 flex-1 space-y-4 overflow-auto">
          {!hasItems && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#eee7dc] text-[#7e786d]">
                  <Icon name="bag" className="size-9" />
                </span>
                <h3 className="mt-5 text-xl font-bold">ตะกร้ายังว่างอยู่</h3>
                <p className="mt-2 text-[#7c756a]">
                  เลือกไอศกรีมรสโปรดของคุณก่อนนะ
                </p>
                <Button className="mt-5" onClick={close}>
                  กลับไปเลือกไอศกรีม
                </Button>
              </div>
            </div>
          )}
          {rows.map((product) => (
            <div
              className="flex gap-3 rounded-2xl bg-white p-3"
              key={product.id}
            >
              <img
                alt=""
                className="size-20 rounded-xl object-cover"
                src={product.image}
              />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <strong>{product.name}</strong>
                  <strong>฿{product.price * cart[product.id]}</strong>
                </div>
                <span className="text-sm text-[#7c756a]">กล่อง 250 มล.</span>
                <QuantityControl
                  quantity={cart[product.id]}
                  decrease={() => changeQuantity(product.id, -1)}
                  increase={() => changeQuantity(product.id, 1)}
                />
              </div>
            </div>
          ))}
          {tubOrders.map((tubOrder, index) => {
            const extras = tubOrder.addOns.reduce(
              (sum, name) =>
                sum +
                (tubAddOns.find((item) => item.name === name)?.price ?? 0),
              0
            )
            const tubImage = products.find(
              (product) => product.name === tubOrder.flavor
            )?.image

            return (
              <div
                key={index}
                className="rounded-2xl border border-[#d5dfcc] bg-[#f0f4ec] p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#536348] text-white">
                    {tubImage ? (
                      <img
                        src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob21lbWFkZSUyMGljZSUyMGNyZWFtJTIwcGFydHklMjBjYXRlcmluZ3xlbnwxfHx8fDE3OTE1NTM2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt={`ไอศกรีมแบบถัง รส${tubOrder.flavor}`}
                        className="size-14 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#536348] text-white">
                        <Icon name="box" />
                      </div>
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <strong>ไอศกรีมแบบถัง</strong>
                      <strong>
                        ฿{((1000 + extras) * tubOrder.quantity).toLocaleString()}
                      </strong>
                    </div>

                    <p className="text-sm text-[#65705e]">
                      รส{tubOrder.flavor} · ของแถมมาตรฐานครบชุด
                    </p>

                    {tubOrder.addOns.length > 0 && (
                      <p className="mt-1 text-xs text-[#7c756a]">
                        ซื้อเพิ่ม: {tubOrder.addOns.join(", ")}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-[#7c756a]">
                      จัดส่งวันที่ {tubOrder.deliveryDate} เวลา {tubOrder.deliveryTime}
                    </p>

                    <QuantityControl
                      quantity={tubOrder.quantity}
                      decrease={() => changeTubQuantity(index, -1)}
                      increase={() => changeTubQuantity(index, 1)}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          {hasItems && (
            <div className="rounded-2xl border border-[#e4d7c4] bg-white p-4">
              <div className="flex items-center gap-2 font-bold">
                <Icon name="gift" className="text-[#a25d43]" />
                ส่วนลดเทศกาล
              </div>
              <div className="mt-3 grid gap-2">
                {festivals.map((festival) => (
                  <button
                    className={`flex items-center justify-between rounded-xl border p-3 text-left ${selectedPromo === festival.code
                      ? "border-[#536348] bg-[#eef2e9]"
                      : "border-[#e5dacb]"
                      }`}
                    key={festival.code}
                    onClick={() => selectPromo(festival.code)}
                  >
                    <span>
                      <strong className="block text-sm">{festival.name}</strong>
                      <span className="text-xs text-[#7b7468]">
                        ลด ฿{festival.discount} เมื่อครบ ฿{festival.minimum}
                      </span>
                    </span>
                    {selectedPromo === festival.code && (
                      <Icon name="check" className="size-5 text-[#536348]" />
                    )}
                  </button>
                ))}
              </div>
              {promo && subtotal < promo.minimum && (
                <p className="mt-3 rounded-lg bg-[#fff1e7] p-3 text-sm text-[#98513b]">
                  เพิ่มอีก ฿{promo.minimum - subtotal} เพื่อรับส่วนลด ฿{promo.discount}
                </p>
              )}
              {discount > 0 && (
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#536348]">
                  <Icon name="check" />
                  ใช้ส่วนลด ฿{discount} แล้ว
                </p>
              )}
            </div>
          )}
        </div>
        {hasItems && (
          <div className="border-t border-[#e4dacb] pt-5">
            <div className="flex justify-between text-[#756f63]">
              <span>ยอดสินค้า</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="mt-2 flex justify-between font-semibold text-[#a6533c]">
                <span>ส่วนลดเทศกาล</span>
                <span>-฿{discount}</span>
              </div>
            )}
            <div className="mt-2 flex justify-between text-[#756f63]">
              <span>ค่าจัดส่งควบคุมความเย็น</span>
              <span>฿49</span>
            </div>
            <div className="mt-4 flex justify-between text-xl font-bold">
              <span>รวมทั้งหมด</span>
              <span>฿{(subtotal + 49 - discount).toLocaleString()}</span>
            </div>
            <Button className="mt-5 w-full" onClick={checkout}>
              ไปชำระเงิน
              <Icon name="chevron" />
            </Button>
          </div>
        )}
      </aside>
    </div>
  )
}

function QuantityControl({
  quantity,
  decrease,
  increase,
}: {
  quantity: number
  decrease: () => void
  increase: () => void
}) {
  return (
    <div className="mt-2 flex w-fit items-center rounded-full border border-[#ded3c3] bg-white">
      <button
        aria-label="ลดจำนวน"
        className="grid size-8 place-items-center"
        onClick={decrease}
      >
        <Icon name="minus" className="size-4" />
      </button>
      <span className="w-8 text-center font-semibold">{quantity}</span>
      <button
        aria-label="เพิ่มจำนวน"
        className="grid size-8 place-items-center"
        onClick={increase}
      >
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  )
}

function OrderCheckoutModal({
  initialDeliveryDate,
  close,
  done,
  placeOrder,
  subtotal,
  discount,
  promo,
  orderNumber,
  customerPointsEnabled,
  setCustomerPointsEnabled,
}: {
  initialDeliveryDate: string
  close: () => void
  done: boolean
  placeOrder: (usePoints: boolean, deliveryDate: string) => void | Promise<void>
  subtotal: number
  discount: number
  promo: Festival | null
  orderNumber: string
  customerPointsEnabled: boolean
  setCustomerPointsEnabled: (enabled: boolean) => void
}) {
  const [deliveryDate, setDeliveryDate] = useState(initialDeliveryDate)
  const [dateError, setDateError] = useState("")
  const bangkokToday = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date())
  const submitWithDate = () => {
    if (!deliveryDate || deliveryDate < bangkokToday) {
      setDateError("กรุณาเลือกวันจัดส่งตั้งแต่วันนี้เป็นต้นไป")
      return
    }
    setDateError("")
    void placeOrder(customerPointsEnabled, deliveryDate)
  }
  const discountAfterRedemption = Math.min(
    Math.max(subtotal - discount, 0),
    customerPointsEnabled ? 50 : 0,
  )
  const estimatedPoints = Math.floor(
    Math.max(subtotal - discount - discountAfterRedemption, 0) / 10,
  )
  if (done)
    return (
      <Modal close={close}>
        <div className="py-5 text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#dbe8d4] text-[#536348]">
            <Icon name="check" className="size-10" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">สั่งซื้อสำเร็จ</h2>
          <p className="mt-2 text-[#756f63]">
            หมายเลขคำสั่งซื้อ #{orderNumber || "กำลังโหลด"}
            <br />
            กรุณาเตรียมตัวให้พร้อมในวันจัดส่ง
            <br />
            หากสั่งซื้อนอกเวลาทำการ ร้านค้าจะจัดส่งในวันถัดไป
          </p>
          <Button className="mt-6 w-full" onClick={close}>
            เรียบร้อย
          </Button>
        </div>
      </Modal>
    )
  return (
    <Modal close={close}>
      <h2 className="text-2xl font-bold">ชำระเงิน</h2>
      <label className="mt-5 block font-semibold" htmlFor="requested-delivery-date">
        เลือกวันจัดส่ง
      </label>
      <input
        id="requested-delivery-date"
        type="date"
        min={bangkokToday}
        required
        value={deliveryDate}
        onChange={(event) => { setDeliveryDate(event.target.value); setDateError("") }}
        className="mt-2 min-h-12 w-full rounded-xl border border-[#d8cbb9] bg-white px-4 text-[#30382c] outline-none focus:border-[#66735a]"
      />
      <p className="mt-1 text-xs text-[#756f63]">เลือกวันที่ต้องการรับสินค้า (เวลาไทย) ร้านจะยืนยันวันจัดส่งอีกครั้ง</p>
      {dateError && <p role="alert" className="mt-2 text-sm text-red-700">{dateError}</p>}
      <p className="mt-1 text-[#756f63]">เลือกวิธีชำระเงินที่สะดวก</p>
      <button className="mt-6 flex w-full items-center gap-4 rounded-2xl border-2 border-[#66735a] bg-[#f5f7f1] p-4 text-left">
        <span className="grid size-11 place-items-center rounded-xl bg-[#536348] text-white">
          <Icon name="bag" />
        </span>
        <span className="flex-1">
          <strong className="block">พร้อมเพย์ / QR Code</strong>
          <span className="text-sm text-[#756f63]">ชำระผ่านแอปธนาคาร</span>
        </span>
        <span className="size-5 rounded-full border-[6px] border-[#536348]" />
      </button>
      <button className="mt-3 flex w-full items-center gap-4 rounded-2xl border border-[#ded3c3] bg-white p-4 text-left">
        <span className="grid size-11 place-items-center rounded-xl bg-[#eee7dc] text-[#635d53]">
          <Icon name="box" />
        </span>
        <span className="flex-1">
          <strong className="block">บัตรเครดิต / เดบิต</strong>
          <span className="text-sm text-[#756f63]">Visa, Mastercard</span>
        </span>
        <span className="size-5 rounded-full border border-[#aaa296]" />
      </button>
      <div className="mt-6 rounded-2xl bg-[#f0e9dd] p-4">
        <div className="flex justify-between text-[#756f63]">
          <span>ยอดสินค้าและค่าจัดส่ง</span>
          <span>฿{(subtotal + 49).toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="mt-2 flex justify-between font-semibold text-[#a6533c]">
            <span>{promo?.name}</span>
            <span>-฿{discount}</span>
          </div>
        )}
        <div className="my-3 h-px bg-[#d9cebe]" />
        <div className="flex justify-between">
          <span>ยอดชำระทั้งหมด</span>
          <strong className="text-xl">
            ฿{(subtotal + 49 - discount).toLocaleString()}
          </strong>
        </div>
      </div>
      <label className="mt-4 flex items-start gap-3 rounded-xl border border-[#ded3c3] bg-white p-3 text-sm">
        <input type="checkbox" className="mt-1" checked={customerPointsEnabled} onChange={(e) => setCustomerPointsEnabled(e.target.checked)} />
        <span><strong>ใช้แต้มสะสม 100 แต้ม แลกส่วนลด 50 บาท</strong><br /><span className="text-[#756f63]">ระบบจะตรวจสอบแต้มและหักแต้มให้เมื่อบันทึกคำสั่งซื้อสำเร็จ</span></span>
      </label>
      <div className="mt-3 flex items-start justify-between gap-3 rounded-xl border border-[#d7e0cf] bg-[#f0f4ec] px-4 py-3 text-sm">
        <span className="text-[#536348]">แต้มที่คาดว่าจะได้รับ<br /><span className="text-xs font-normal text-[#756f63]">คิดจากยอดสินค้าหลังหักส่วนลด ไม่รวมค่าจัดส่ง</span></span>
        <strong className="shrink-0 text-lg text-[#536348]">{estimatedPoints} แต้ม</strong>
      </div>
      <Button className="mt-5 w-full" onClick={() => submitWithDate()}>
        ยืนยันคำสั่งซื้อ
      </Button>
    </Modal>
  )
}

function MobileNav({
  icon,
  label,
  onClick,
  active,
}: {
  icon: IconName
  label: string
  onClick: () => void
  active: boolean
}) {
  return (
    <button
      className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold ${active ? "bg-[#eef1e7] text-[#45523e]" : "text-[#80786d]"
        }`}
      onClick={onClick}
    >
      <Icon name={icon} className="size-5" />
      {label}
    </button>
  )
}

type AppUser = User | null

type TrackingOrder = {
  id: string
  order_number: string
  status: string
  created_at: string
  delivery_date: string | null
  delivery_address: string | null
  subtotal: number
  discount_amount: number
  total_amount: number
  order_items: { product_name_snapshot: string; quantity: number; line_total: number; item_options?: { flavor?: string; add_ons?: string[] } | null }[]
}

function TrackingView({ user, onShop }: { user: AppUser; onShop: () => void }) {
  const [orders, setOrders] = useState<TrackingOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [alerts, setAlerts] = useState<{ id: string; title: string; message: string; is_read: boolean; created_at: string }[]>([])
  useEffect(() => {
    let alive = true
    async function load() {
      if (!supabase || !user) { setOrders([]); setLoading(false); return }
      setLoading(true)
      const { data: customer, error: customerError } = await supabase.from("customers").select("id").eq("profile_id", user.id).maybeSingle()
      if (customerError || !customer) { if (alive) { setMessage("ไม่พบข้อมูลลูกค้าของบัญชีนี้ กรุณาออกจากระบบแล้วเข้าสู่ระบบใหม่"); setLoading(false) }; return }
      const { data: alertRows } = await supabase.from("customer_notifications").select("id,title,message,is_read,created_at").order("created_at", { ascending: false }).limit(30)
      if (alive) setAlerts(alertRows ?? [])
      const { data, error } = await supabase.from("orders").select("id, order_number, status, created_at, delivery_date, delivery_address, subtotal, discount_amount, total_amount, order_items(product_name_snapshot, quantity, line_total, item_options)").eq("customer_id", customer.id).order("created_at", { ascending: false })
      if (alive) { setOrders((data ?? []) as unknown as TrackingOrder[]); setMessage(error ? `โหลดคำสั่งซื้อไม่สำเร็จ: ${error.message}` : ""); setLoading(false) }
    }
    void load()
    const timer = window.setInterval(() => { if (alive) void load() }, 30000)
    return () => { alive = false; window.clearInterval(timer) }
  }, [user])
  const labels: Record<string, string> = { pending: "รับคำสั่งซื้อแล้ว", confirmed: "ยืนยันคำสั่งซื้อ", preparing: "กำลังเตรียมไอศกรีม", ready: "พร้อมจัดส่ง", delivered: "จัดส่งสำเร็จ", cancelled: "ยกเลิกคำสั่งซื้อ" }
  return <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-10 sm:px-6">
    <div className="mb-8"><h1 className="text-2xl font-bold sm:text-3xl">ติดตามการจัดส่ง</h1><p className="mt-2 text-[#756f63]">แสดงคำสั่งซื้อที่ผูกกับบัญชีที่เข้าสู่ระบบเท่านั้น</p></div>
    {user && alerts.length > 0 && <section className="mb-6 rounded-2xl border border-[#d8cbb9] bg-white p-5"><h2 className="mb-3 text-lg font-bold">แจ้งเตือนการจัดส่ง</h2><div className="space-y-3">{alerts.map(alert => <div key={alert.id} className={`rounded-xl p-3 ${alert.is_read ? "bg-[#f8f5ef]" : "bg-[#e8eddf]"}`}><strong>{alert.title}</strong><p className="mt-1 text-sm">{alert.message}</p><p className="mt-1 text-xs text-[#756f63]">{new Date(alert.created_at).toLocaleString("th-TH")}</p>{!alert.is_read && <button className="mt-2 text-sm underline" onClick={async () => { const { error } = await supabase.from("customer_notifications").update({ is_read: true }).eq("id", alert.id); if (!error) setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, is_read: true } : a)) }}>ทำเครื่องหมายว่าอ่านแล้ว</button>}</div>)}</div></section>}
    {!user ? <div className="rounded-2xl bg-white p-6">กรุณาเข้าสู่ระบบเพื่อดูคำสั่งซื้อของคุณ</div> : loading ? <p>กำลังโหลดคำสั่งซื้อ…</p> : message ? <p className="rounded-2xl bg-white p-5">{message}</p> : orders.length === 0 ? <div className="rounded-2xl bg-white p-6"><p>ยังไม่มีคำสั่งซื้อในบัญชีนี้</p><Button className="mt-4" onClick={onShop}>เลือกซื้อไอศกรีม</Button></div> : <div className="space-y-5">{orders.map(order => <article key={order.id} className="rounded-3xl border border-[#e7dccb] bg-white p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><strong className="text-lg">คำสั่งซื้อ #{order.order_number}</strong><p className="mt-1 text-sm text-[#756f63]">สั่งเมื่อ {new Date(order.created_at).toLocaleString("th-TH")}</p></div><span className="rounded-full bg-[#e8eddf] px-4 py-2 text-sm font-bold">{labels[order.status] ?? order.status}</span></div><div className="mt-5 space-y-3">{(order.order_items ?? []).map((item, i) => <div key={`${order.id}-${i}`} className="flex justify-between gap-3 text-sm"><span>{item.product_name_snapshot} × {item.quantity}{item.item_options?.flavor ? ` (รส${item.item_options.flavor})` : ""}{item.item_options?.add_ons?.length ? ` · เพิ่ม ${item.item_options.add_ons.join(", ")}` : ""}</span><strong>฿{Number(item.line_total).toLocaleString("th-TH")}</strong></div>)}</div><div className="my-4 h-px bg-[#eee4d6]" /><div className="flex justify-between"><span>ยอดรวมที่ชำระ</span><strong>฿{Number(order.total_amount).toLocaleString("th-TH")}</strong></div>{order.delivery_date && <p className="mt-2 text-sm text-[#756f63]">กำหนดจัดส่ง: {new Date(order.delivery_date).toLocaleString("th-TH")}</p>}{order.delivery_address && <p className="mt-2 text-sm text-[#756f63]">ที่อยู่: {order.delivery_address}</p>}</article>)}</div>}
  </main>
}

function RewardsView({ user, onShop }: { user: AppUser; onShop: () => void }) {
  const [points, setPoints] = useState(0)
  const [resetAt, setResetAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  useEffect(() => {
    let alive = true
    async function load() {
      if (!supabase || !user) { setPoints(0); setResetAt(null); setLoading(false); return }
      setLoading(true)
      const { data, error } = await supabase.from("customers").select("points_balance, loyalty_reset_at").eq("profile_id", user.id).maybeSingle()
      if (alive) { setPoints(Number(data?.points_balance ?? 0)); setResetAt(data?.loyalty_reset_at ?? null); setMessage(error ? `โหลดแต้มไม่สำเร็จ: ${error.message}` : ""); setLoading(false) }
    }
    void load()
    return () => { alive = false }
  }, [user])
  const progress = points % 100
  return <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-10 sm:px-6">
    <div className="overflow-hidden rounded-[2rem] bg-[#536348] p-7 text-white sm:p-10"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><span className="text-[#d9e2cf]">แต้มสะสมของคุณ</span><div className="mt-2 flex items-end gap-3"><strong className="text-4xl">{loading ? "…" : points}</strong><span className="pb-2 text-xl">แต้ม</span></div><p className="mt-3 text-[#d9e2cf]">{user ? (points >= 100 ? "คุณมีแต้มเพียงพอสำหรับแลกส่วนลด 50 บาท" : `อีก ${100 - points} แต้ม รับส่วนลด 50 บาท`) : "เข้าสู่ระบบเพื่อดูแต้มสะสมของคุณ"}</p></div><Icon name="star" className="size-16 text-[#d7bc78]" /></div><div className="mt-8 h-3 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-[#e9cf8e]" style={{ width: `${progress}%` }} /></div></div>
    {message && <p className="mt-4 text-sm text-[#a6533c]">{message}</p>}
    <div className="mt-8 grid gap-5 sm:grid-cols-2"><section className="rounded-3xl border border-[#e7dccb] bg-white p-6"><Icon name="star" /><h2 className="mt-4 text-xl font-bold">วิธีรับแต้ม</h2><p className="mt-2 leading-relaxed text-[#756f63]">ทุกยอดซื้อ 10 บาท รับ 1 แต้ม คำนวณจากยอดสินค้า หลังหักส่วนลด แต้มจะรีเซ็ตทุก 1 ปีนับจากวันสมัครบัญชีและต่อรอบปี</p>{resetAt && <p className="mt-2 text-sm text-[#756f63]">รีเซ็ตแต้มรอบถัดไป: {new Date(resetAt).toLocaleDateString("th-TH")}</p>}</section><section className="rounded-3xl border border-[#e7dccb] bg-white p-6"><Icon name="gift" /><h2 className="mt-4 text-xl font-bold">ใช้แต้มเป็นส่วนลด</h2><p className="mt-2 leading-relaxed text-[#756f63]">สะสมครบ 100 แต้ม แลกรับส่วนลด 50 บาทในขั้นตอนสั่งซื้อ โดยหัก 100 แต้มต่อการแลก 1 ครั้ง</p></section></div><div className="mt-6 text-center"><Button onClick={onShop}>เลือกไอศกรีมเพื่อรับแต้ม</Button></div>
  </main>
}

function CartDrawer({
  products,
  cart,
  close,
  subtotal,
  changeQuantity,
  checkout,
}: {
  products: Product[]
  cart: Record<number, number>
  close: () => void
  subtotal: number
  changeQuantity: (id: number, delta: number) => void
  checkout: () => void
}) {
  const rows = products.filter((product) => cart[product.id])
  return (
    <div className="fixed inset-0 z-50 bg-[#252b22]/40" onMouseDown={close}>
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fbf7ef] p-5 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">ตะกร้าของคุณ</h2>
            <p className="text-sm text-[#7c756a]">{rows.length} รายการ</p>
          </div>
          <Button
            ariaLabel="ปิดตะกร้า"
            className="size-11 p-0"
            variant="icon"
            onClick={close}
          >
            <Icon
              name="close"
              className="h-6 w-6 shrink-0 text-[#30382c]"
            />
          </Button>
        </div>
        <div className="mt-6 flex-1 space-y-4 overflow-auto">
          {rows.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#eee7dc] text-[#7e786d]">
                  <Icon name="bag" className="size-9" />
                </span>
                <h3 className="mt-5 text-xl font-bold">ตะกร้ายังว่างอยู่</h3>
                <p className="mt-2 text-[#7c756a]">
                  เลือกไอศกรีมรสโปรดของคุณก่อนนะ
                </p>
                <Button className="mt-5" onClick={close}>
                  กลับไปเลือกไอศกรีม
                </Button>
              </div>
            </div>
          ) : (
            rows.map((product) => (
              <div
                className="flex gap-3 rounded-2xl bg-white p-3"
                key={product.id}
              >
                <img
                  alt=""
                  className="size-20 rounded-xl object-cover"
                  src={product.image}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <strong>{product.name}</strong>
                    <strong>฿{product.price * cart[product.id]}</strong>
                  </div>
                  <span className="text-sm text-[#7c756a]">กล่อง 250 มล.</span>
                  <div className="mt-2 flex w-fit items-center rounded-full border border-[#ded3c3]">
                    <button
                      aria-label="ลดจำนวน"
                      className="grid size-8 place-items-center"
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      <Icon name="minus" className="size-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {cart[product.id]}
                    </span>
                    <button
                      aria-label="เพิ่มจำนวน"
                      className="grid size-8 place-items-center"
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      <Icon name="plus" className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {rows.length > 0 && (
          <div className="border-t border-[#e4dacb] pt-5">
            <div className="flex justify-between text-[#756f63]">
              <span>ยอดรวมสินค้า</span>
              <span>฿{subtotal}</span>
            </div>
            <div className="mt-2 flex justify-between text-[#756f63]">
              <span>ค่าจัดส่ง</span>
              <span>฿49</span>
            </div>
            <div className="mt-4 flex justify-between text-xl font-bold">
              <span>ยอดชำระ</span>
              <span>฿{subtotal + 49}</span>
            </div>
            <p className="mt-2 text-sm text-[#718064]">
              คำสั่งซื้อนี้จะได้รับ {Math.floor((subtotal + 49) / 10)} แต้ม
            </p>
            <Button className="mt-5 w-full" onClick={checkout}>
              ดำเนินการชำระเงิน
              <Icon name="chevron" />
            </Button>
          </div>
        )}
      </aside>
    </div>
  )
}

function LoginModal({
  close,
  onSuccess,
}: {
  close: () => void
  onSuccess: () => void
}) {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")

  async function submit() {
    if (!supabase) {
      setMessage("ยังไม่ได้ตั้งค่า Supabase กรุณาตรวจสอบไฟล์ .env.local")
      return
    }
    if (!email.trim() || !password) {
      setMessage("กรุณากรอกอีเมลและรหัสผ่านให้ครบ")
      return
    }
    if (mode === "signup" && !name.trim()) {
      setMessage("กรุณากรอกชื่อที่ใช้แสดง")
      return
    }
    setBusy(true)
    setMessage("")
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: name.trim() } },
        })
        if (error) throw error
        if (data.session) {
          onSuccess()
        } else {
          setMessage("สมัครสมาชิกแล้ว กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี จากนั้นกลับมาเข้าสู่ระบบ")
          setMode("login")
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (error) throw error
        onSuccess()
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ดำเนินการไม่สำเร็จ กรุณาลองอีกครั้ง")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal close={close}>
      <div className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#dbe2ce] text-[#536348]">
          <Icon name="user" className="size-8" />
        </span>
        <h2 className="mt-4 text-2xl font-bold">{mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</h2>
        <p className="mt-2 text-[#776f65]">เข้าสู่ระบบเพื่อบันทึกคำสั่งซื้อและติดตามรายการของคุณ</p>
      </div>
      {mode === "signup" && (
        <label className="mt-6 block font-semibold">
          ชื่อที่ใช้แสดง
          <input className="mt-2 min-h-12 w-full rounded-xl border border-[#dbcfbe] bg-white px-4 outline-none focus:border-[#66735a]" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อ-นามสกุล" />
        </label>
      )}
      <label className="mt-6 block font-semibold">
        อีเมล
        <input className="mt-2 min-h-12 w-full rounded-xl border border-[#dbcfbe] bg-white px-4 outline-none focus:border-[#66735a]" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <label className="mt-4 block font-semibold">
        รหัสผ่าน
        <input className="mt-2 min-h-12 w-full rounded-xl border border-[#dbcfbe] bg-white px-4 outline-none focus:border-[#66735a]" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="อย่างน้อย 6 ตัวอักษร" />
      </label>
      {message && <p role="alert" className="mt-4 rounded-xl bg-[#fff0e7] p-3 text-sm text-[#9b4e37]">{message}</p>}
      <Button className="mt-5 w-full" onClick={() => void submit()}>
        {busy ? "กำลังดำเนินการ..." : mode === "login" ? "เข้าสู่ระบบ" : "สร้างบัญชี"}
      </Button>
      <p className="mt-4 text-center text-sm text-[#776f65]">
        {mode === "login" ? "ยังไม่มีบัญชี? " : "มีบัญชีอยู่แล้ว? "}
        <button className="font-semibold text-[#536348] underline" onClick={() => { setMessage(""); setMode(mode === "login" ? "signup" : "login") }}>
          {mode === "login" ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
        </button>
      </p>
    </Modal>
  )
}

function CheckoutModal({
  close,
  done,
  placeOrder,
  subtotal,
}: {
  close: () => void
  done: boolean
  placeOrder: () => void
  subtotal: number
}) {
  if (done)
    return (
      <Modal close={close}>
        <div className="py-5 text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#dbe8d4] text-[#536348]">
            <Icon name="check" className="size-10" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">สั่งซื้อสำเร็จ</h2>
          <p className="mt-2 text-[#756f63]">
            หมายเลขคำสั่งซื้อ #LMN240219
            <br />
            ร้านค้าจะจัดส่งสินค้าภายใน 1–2 วัน
            <br />
            หากสั่งซื้อนอกเวลาทำการ ร้านค้าจะจัดส่งในวันถัดไป
          </p>
          <Button className="mt-6 w-full" onClick={close}>
            เรียบร้อย
          </Button>
        </div>
      </Modal>
    )
  return (
    <Modal close={close}>
      <h2 className="text-2xl font-bold">ชำระเงิน</h2>
      <p className="mt-1 text-[#756f63]">เลือกวิธีชำระเงินที่สะดวก</p>
      <button className="mt-6 flex w-full items-center gap-4 rounded-2xl border-2 border-[#66735a] bg-[#f5f7f1] p-4 text-left">
        <span className="grid size-11 place-items-center rounded-xl bg-[#536348] text-white">
          <Icon name="bag" />
        </span>
        <span className="flex-1">
          <strong className="block">พร้อมเพย์ / QR Code</strong>
          <span className="text-sm text-[#756f63]">ชำระผ่านแอปธนาคาร</span>
        </span>
        <span className="size-5 rounded-full border-[6px] border-[#536348]" />
      </button>
      <button className="mt-3 flex w-full items-center gap-4 rounded-2xl border border-[#ded3c3] bg-white p-4 text-left">
        <span className="grid size-11 place-items-center rounded-xl bg-[#eee7dc] text-[#635d53]">
          <Icon name="box" />
        </span>
        <span className="flex-1">
          <strong className="block">บัตรเครดิต / เดบิต</strong>
          <span className="text-sm text-[#756f63]">Visa, Mastercard</span>
        </span>
        <span className="size-5 rounded-full border border-[#aaa296]" />
      </button>
      <div className="mt-6 rounded-2xl bg-[#f0e9dd] p-4">
        <div className="flex justify-between">
          <span>ยอดชำระทั้งหมด</span>
          <strong className="text-xl">฿{subtotal + 49}</strong>
        </div>
      </div>
      <Button className="mt-5 w-full" onClick={placeOrder}>
        ยืนยันและชำระเงิน
      </Button>
    </Modal>
  )
}

function Modal({ children, close }: { children: ReactNode; close: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-[#252b22]/50 p-4"
      onMouseDown={close}
    >
      <section
        className="relative w-full max-w-md rounded-3xl bg-[#fbf7ef] p-6 shadow-2xl sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Button
          ariaLabel="ปิด"
          className="absolute right-4 top-4 size-10 p-0"
          variant="icon"
          onClick={close}
        >
          <Icon
            name="close"
            className="h-6 w-6 shrink-0 text-[#30382c]"
          />
        </Button>
        {children}
      </section>
    </div>
  )
}

export default App
