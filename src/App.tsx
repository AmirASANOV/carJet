import { useState } from "react"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"
import type { Page, Vehicle, Product, CartItem } from "./types"
import { PRODUCTS, SAVED_VEHICLES } from "./data/mockData"

import Header from "./components/Header"
import VehicleSelector from "./components/VehicleSelector"
import Footer from "./components/Footer"

import HomePage from "./pages/HomePage"
import CatalogPage from "./pages/CatalogPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import ProfilePage from "./pages/ProfilePage"
import SellerDashboard from "./pages/SellerDashboard"
import AdminPanel from "./pages/AdminPanel"

const pagePaths: Record<Page, string> = {
  home: "/",
  catalog: "/catalog",
  product: "/products",
  cart: "/cart",
  checkout: "/checkout",
  profile: "/profile",
  seller: "/seller",
  admin: "/admin",
}

function ProductRoute({
  activeVehicle,
  onNavigate,
  onAddToCart,
  onOpenVehicleSelector,
}: {
  activeVehicle: Vehicle | null
  onNavigate: (page: Page) => void
  onAddToCart: (item: CartItem) => void
  onOpenVehicleSelector: () => void
}) {
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === productId)

  if (!product) return <Navigate to="/catalog" replace />

  return (
    <ProductPage
      key={product.id}
      product={product}
      activeVehicle={activeVehicle}
      onNavigate={onNavigate}
      onAddToCart={onAddToCart}
      onOpenVehicleSelector={onOpenVehicleSelector}
    />
  )
}

export default function App() {
  const routerNavigate = useNavigate()
  const location = useLocation()
  const [cart, setCart] = useState<CartItem[]>([])
  const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>(SAVED_VEHICLES)
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(
    SAVED_VEHICLES[0],
  )
  const [showVehicleSelector, setShowVehicleSelector] = useState(false)

  const page: Page = location.pathname.startsWith("/products/")
    ? "product"
    : (Object.entries(pagePaths).find(
        ([, path]) => path === location.pathname,
      )?.[0] as Page | undefined ?? "home")

  function navigate(p: Page) {
    routerNavigate(pagePaths[p])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function viewProduct(product: Product) {
    routerNavigate(`/products/${product.id}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const key = `${item.product.id}-${item.seller.id}`
      const existing = prev.find(
        (i) => `${i.product.id}-${i.seller.id}` === key,
      )
      if (existing) {
        return prev.map((i) =>
          `${i.product.id}-${i.seller.id}` === key
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        )
      }
      return [...prev, item]
    })
  }

  function updateCartQty(productId: string, sellerId: string, qty: number) {
    if (qty <= 0) {
      setCart((prev) =>
        prev.filter(
          (i) => !(i.product.id === productId && i.seller.id === sellerId),
        ),
      )
    } else {
      setCart((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.seller.id === sellerId
            ? { ...i, quantity: qty }
            : i,
        ),
      )
    }
  }

  function removeFromCart(productId: string, sellerId: string) {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.seller.id === sellerId),
      ),
    )
  }

  function selectVehicle(v: Vehicle) {
    setActiveVehicle(v)
    if (!savedVehicles.find((sv) => sv.id === v.id)) {
      setSavedVehicles((prev) => [...prev, v])
    }
  }

  function placeOrder() {
    setCart([])
  }

  const noFooterPages: Page[] = ["checkout"]
  const showFooter = !noFooterPages.includes(page)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        activeVehicle={activeVehicle}
        cart={cart}
        onNavigate={navigate}
        onOpenVehicleSelector={() => setShowVehicleSelector(true)}
        currentPage={page}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                activeVehicle={activeVehicle}
                onNavigate={navigate}
                onOpenVehicleSelector={() => setShowVehicleSelector(true)}
                onViewProduct={viewProduct}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/catalog"
            element={
              <CatalogPage
                activeVehicle={activeVehicle}
                onViewProduct={viewProduct}
                onAddToCart={addToCart}
                onOpenVehicleSelector={() => setShowVehicleSelector(true)}
                onNavigate={navigate}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProductRoute
                activeVehicle={activeVehicle}
                onNavigate={navigate}
                onAddToCart={addToCart}
                onOpenVehicleSelector={() => setShowVehicleSelector(true)}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQty={updateCartQty}
                onRemove={removeFromCart}
                onNavigate={navigate}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cart={cart}
                onNavigate={navigate}
                onPlaceOrder={placeOrder}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                savedVehicles={savedVehicles}
                activeVehicle={activeVehicle}
                onSelectVehicle={selectVehicle}
                onOpenVehicleSelector={() => setShowVehicleSelector(true)}
                onNavigate={navigate}
              />
            }
          />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showFooter && <Footer onNavigate={navigate} />}

      {showVehicleSelector && (
        <VehicleSelector
          activeVehicle={activeVehicle}
          savedVehicles={savedVehicles}
          onSelect={selectVehicle}
          onClose={() => setShowVehicleSelector(false)}
        />
      )}
    </div>
  )
}
