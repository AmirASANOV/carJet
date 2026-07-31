import { useState } from 'react'
import type { Page, Vehicle, Product, CartItem } from './types'
import { SAVED_VEHICLES } from './data/mockData'

import Header from './components/Header'
import VehicleSelector from './components/VehicleSelector'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import SellerDashboard from './pages/SellerDashboard'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>(SAVED_VEHICLES)
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(SAVED_VEHICLES[0])
  const [showVehicleSelector, setShowVehicleSelector] = useState(false)

  function navigate(p: Page) {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function viewProduct(product: Product) {
    setSelectedProduct(product)
    navigate('product')
  }

  function addToCart(item: CartItem) {
    setCart(prev => {
      const key = `${item.product.id}-${item.seller.id}`
      const existing = prev.find(i => `${i.product.id}-${i.seller.id}` === key)
      if (existing) {
        return prev.map(i => `${i.product.id}-${i.seller.id}` === key ? { ...i, quantity: i.quantity + item.quantity } : i)
      }
      return [...prev, item]
    })
  }

  function updateCartQty(productId: string, sellerId: string, qty: number) {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => !(i.product.id === productId && i.seller.id === sellerId)))
    } else {
      setCart(prev => prev.map(i => i.product.id === productId && i.seller.id === sellerId ? { ...i, quantity: qty } : i))
    }
  }

  function removeFromCart(productId: string, sellerId: string) {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.seller.id === sellerId)))
  }

  function selectVehicle(v: Vehicle) {
    setActiveVehicle(v)
    if (!savedVehicles.find(sv => sv.id === v.id)) {
      setSavedVehicles(prev => [...prev, v])
    }
  }

  function placeOrder() {
    setCart([])
  }

  const noFooterPages: Page[] = ['checkout']
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
        {page === 'home' && (
          <HomePage
            activeVehicle={activeVehicle}
            onNavigate={navigate}
            onOpenVehicleSelector={() => setShowVehicleSelector(true)}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
          />
        )}

        {page === 'catalog' && (
          <CatalogPage
            activeVehicle={activeVehicle}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
            onOpenVehicleSelector={() => setShowVehicleSelector(true)}
            onNavigate={navigate}
          />
        )}

        {page === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            activeVehicle={activeVehicle}
            onNavigate={navigate}
            onAddToCart={addToCart}
            onOpenVehicleSelector={() => setShowVehicleSelector(true)}
          />
        )}

        {page === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQty={updateCartQty}
            onRemove={removeFromCart}
            onNavigate={navigate}
          />
        )}

        {page === 'checkout' && (
          <CheckoutPage
            cart={cart}
            onNavigate={navigate}
            onPlaceOrder={placeOrder}
          />
        )}

        {page === 'profile' && (
          <ProfilePage
            savedVehicles={savedVehicles}
            activeVehicle={activeVehicle}
            onSelectVehicle={selectVehicle}
            onOpenVehicleSelector={() => setShowVehicleSelector(true)}
            onNavigate={navigate}
          />
        )}

        {page === 'seller' && <SellerDashboard />}
        {page === 'admin' && <AdminPanel />}
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
