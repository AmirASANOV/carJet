import type { Product, Vehicle, CartItem } from '../types'
import { checkCompatibility } from '../data/mockData'

interface ProductCardProps {
  product: Product
  activeVehicle: Vehicle | null
  onView: (product: Product) => void
  onAddToCart: (item: CartItem) => void
}

const conditionLabel: Record<string, string> = {
  OEM: 'OEM',
  Aftermarket: 'Неоригинал',
  Remanufactured: 'Восстановленный',
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#F59E0B' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function ProductCard({ product, activeVehicle, onView, onAddToCart }: ProductCardProps) {
  const compat = checkCompatibility(activeVehicle, product.compatibleVehicles)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const cheapestSeller = product.sellers.reduce((a, b) => a.price < b.price ? a : b)

  return (
    <div
      className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden group cursor-pointer transition-all hover:shadow-lg hover:border-[#E0E0E0]"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      onClick={() => onView(product)}
    >
      {/* Изображение */}
      <div className="relative aspect-square bg-surface overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-brand text-white text-xs font-700 px-2 py-0.5 rounded-md" style={{ fontFamily: 'Barlow, sans-serif' }}>
            -{discount}%
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="text-xs font-600 px-2 py-0.5 rounded-md bg-white/90 text-ink-60" style={{ fontFamily: 'Barlow, sans-serif' }}>
            {conditionLabel[product.condition] ?? product.condition}
          </span>
        </div>
      </div>

      {/* Содержимое */}
      <div className="p-3.5">
        {/* Совместимость — ключевая функция */}
        {compat === 'fits' && (
          <div className="flex items-center gap-1.5 bg-ok-tint text-ok px-2.5 py-1 rounded-md text-xs font-600 mb-2.5" style={{ fontFamily: 'Barlow, sans-serif' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Подходит для {activeVehicle!.year} {activeVehicle!.make} {activeVehicle!.model}
          </div>
        )}
        {compat === 'verify' && (
          <div className="flex items-center gap-1.5 bg-warn-tint text-warn px-2.5 py-1 rounded-md text-xs font-600 mb-2.5" style={{ fontFamily: 'Barlow, sans-serif' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Проверьте совместимость
          </div>
        )}
        {compat === 'unknown' && (
          <div className="flex items-center gap-1.5 bg-surface text-ink-40 px-2.5 py-1 rounded-md text-xs mb-2.5" style={{ fontFamily: 'Barlow, sans-serif' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Выберите авто для проверки
          </div>
        )}

        <p className="text-xs text-ink-40 mb-0.5" style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600 }}>{product.brand}</p>
        <h3 className="text-sm font-500 text-ink leading-snug mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-1.5 mb-2.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-ink-40">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-ink-20 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-ink-40">
            {product.sellers.length} {product.sellers.length === 1 ? 'продавец' : 'продавца'} · {cheapestSeller.shipping}
          </div>
          <button
            onClick={e => {
              e.stopPropagation()
              onAddToCart({ product, seller: cheapestSeller, quantity: 1 })
            }}
            className="flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-600 px-3 py-1.5 rounded-lg transition-colors"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}
