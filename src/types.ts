export type Page = 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'profile' | 'seller' | 'admin'

export interface Vehicle {
  id: string
  year: number
  make: string
  model: string
  engine: string
}

export interface SellerOffer {
  id: string
  sellerName: string
  sellerRating: number
  sellerReviews: number
  price: number
  condition: string
  shipping: string
  shippingDays: number
  badge?: string
  location: string
}

export interface Product {
  id: string
  name: string
  partNumber: string
  brand: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  rating: number
  reviewCount: number
  compatibleVehicles: string[]
  condition: 'OEM' | 'Aftermarket' | 'Remanufactured'
  inStock: boolean
  sellers: SellerOffer[]
  description: string
  specs: Record<string, string>
  warranty: string
  soldCount: number
}

export interface CartItem {
  product: Product
  seller: SellerOffer
  quantity: number
}
