import { useState } from 'react'
import type { Vehicle, Product, CartItem, Page, SellerOffer } from '../types'
import { checkCompatibility } from '../data/mockData'

interface ProductPageProps {
  product: Product
  activeVehicle: Vehicle | null
  onNavigate: (page: Page) => void
  onAddToCart: (item: CartItem) => void
  onOpenVehicleSelector: () => void
}

const conditionLabel: Record<string, string> = {
  OEM: 'OEM',
  Aftermarket: 'Неоригинал',
  Remanufactured: 'Восстановленный',
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#F59E0B' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function ProductPage({ product, activeVehicle, onNavigate, onAddToCart, onOpenVehicleSelector }: ProductPageProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSeller, setSelectedSeller] = useState<SellerOffer>(product.sellers[0])
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'compatibility' | 'reviews'>('description')
  const [added, setAdded] = useState(false)

  const compat = checkCompatibility(activeVehicle, product.compatibleVehicles)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  function handleAddToCart() {
    onAddToCart({ product, seller: selectedSeller, quantity: qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 text-xs text-ink-40 mb-5" style={{ fontFamily: 'Barlow, sans-serif' }}>
        <button onClick={() => onNavigate('home')} className="hover:text-brand">Главная</button>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        <button onClick={() => onNavigate('catalog')} className="hover:text-brand">{product.category}</button>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-ink-60 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Изображения */}
        <div>
          <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden mb-3 border border-wire">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-brand text-white font-700 text-sm px-3 py-1 rounded-lg" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Скидка {discount}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImage ? 'border-brand' : 'border-wire hover:border-ink-20'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>{product.brand}</span>
            <span className="text-ink-10">·</span>
            <span className="text-xs text-ink-40 font-mono">Арт. {product.partNumber}</span>
          </div>

          <h1 className="font-display text-3xl font-700 text-ink mb-3 leading-tight" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <Stars rating={product.rating} />
              <span className="font-600 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{product.rating}</span>
            </div>
            <span className="text-sm text-brand underline cursor-pointer">({product.reviewCount.toLocaleString('ru-RU')} отзывов)</span>
            <span className="text-xs text-ink-40">Продано: {product.soldCount.toLocaleString('ru-RU')}</span>
          </div>

          {/* Совместимость — КЛЮЧЕВАЯ ФУНКЦИЯ */}
          <div className={`rounded-xl p-4 mb-5 border ${
            compat === 'fits' ? 'bg-ok-tint border-ok/30' :
            compat === 'verify' ? 'bg-warn-tint border-warn/30' :
            'bg-surface border-wire'
          }`}>
            {compat === 'fits' && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-ok rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div>
                  <p className="font-700 text-ok text-sm" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    Гарантированно подходит для вашего {activeVehicle!.year} {activeVehicle!.make} {activeVehicle!.model}
                  </p>
                  <p className="text-xs text-ok/70 mt-0.5">{activeVehicle!.engine} · Совместимость подтверждена</p>
                </div>
              </div>
            )}
            {compat === 'verify' && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-warn rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-700 text-warn text-sm" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    Уточните совместимость с {activeVehicle!.year} {activeVehicle!.make} {activeVehicle!.model}
                  </p>
                  <button className="text-xs text-warn underline mt-0.5" onClick={() => setActiveTab('compatibility')}>
                    Смотреть список совместимых авто →
                  </button>
                </div>
              </div>
            )}
            {compat === 'unknown' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-600 text-sm text-ink-60" style={{ fontFamily: 'Barlow, sans-serif' }}>Укажите автомобиль для проверки совместимости</p>
                  <p className="text-xs text-ink-40 mt-0.5">Совместимо с {product.compatibleVehicles.length} автомобилями</p>
                </div>
                <button
                  onClick={onOpenVehicleSelector}
                  className="bg-brand text-white text-sm font-600 px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors shrink-0"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  Добавить авто
                </button>
              </div>
            )}
          </div>

          {/* Цена */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-4xl font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>
              ${selectedSeller.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-ink-20 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {discount > 0 && (
              <span className="bg-brand-tint text-brand text-sm font-700 px-2 py-0.5 rounded" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Экономия ${(product.originalPrice! - product.price).toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm text-ok font-600 mb-5" style={{ fontFamily: 'Barlow, sans-serif' }}>
            ✓ В наличии · {selectedSeller.shipping} · Доставка за {selectedSeller.shippingDays}–{selectedSeller.shippingDays + 1} рабочих дня
          </p>

          {/* Предложения продавцов */}
          <div className="mb-5">
            <p className="text-xs font-600 uppercase tracking-widest text-ink-40 mb-3" style={{ fontFamily: 'Barlow, sans-serif' }}>
              {product.sellers.length} предложения от продавцов
            </p>
            <div className="space-y-2">
              {product.sellers.map(seller => (
                <label
                  key={seller.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSeller.id === seller.id ? 'border-brand bg-brand-tint' : 'border-wire hover:border-brand/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="seller"
                    checked={selectedSeller.id === seller.id}
                    onChange={() => setSelectedSeller(seller)}
                    className="accent-brand"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-600 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{seller.sellerName}</span>
                      {seller.badge && (
                        <span className={`text-[10px] font-700 px-1.5 py-0.5 rounded uppercase tracking-wide ${
                          seller.badge === 'Лучший продавец' ? 'bg-brand text-white' :
                          seller.badge === 'Проверен' ? 'bg-ok text-white' :
                          'bg-[#3B82F6] text-white'
                        }`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                          {seller.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Stars rating={seller.sellerRating} size={10} />
                      <span className="text-xs text-ink-40">({seller.sellerReviews.toLocaleString('ru-RU')}) · {seller.location}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-700 text-ink text-base" style={{ fontFamily: 'Barlow, sans-serif' }}>${seller.price.toFixed(2)}</div>
                    <div className="text-xs text-ok">{seller.shipping}</div>
                    <div className="text-xs text-ink-40">Доставка {seller.shippingDays} дн.</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Количество + Корзина */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-wire rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2.5 text-ink-60 hover:bg-surface transition-colors">−</button>
              <span className="px-4 py-2.5 text-sm font-600 border-x border-wire min-w-[3rem] text-center" style={{ fontFamily: 'Barlow, sans-serif' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2.5 text-ink-60 hover:bg-surface transition-colors">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-xl font-700 text-sm transition-all flex items-center justify-center gap-2 ${
                added ? 'bg-ok text-white' : 'bg-brand hover:bg-brand-dark text-white'
              }`}
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  Добавлено в корзину
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  В корзину
                </>
              )}
            </button>

            <button className="p-3 rounded-xl border border-wire text-ink-40 hover:border-brand hover:text-brand transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Значки доверия */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { icon: '🔒', label: 'Безопасная оплата' },
              { icon: '↩', label: 'Возврат 30 дней' },
              { icon: '✓', label: `Гарантия: ${product.warranty}` },
            ].map(b => (
              <div key={b.label} className="bg-surface rounded-lg p-2 text-center">
                <div className="text-base mb-0.5">{b.icon}</div>
                <div className="text-[10px] text-ink-40 leading-tight">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="border-t border-wire">
        <div className="flex gap-0">
          {([
            { key: 'description', label: 'Описание' },
            { key: 'specs', label: 'Характеристики' },
            { key: 'compatibility', label: 'Совместимость', count: product.compatibleVehicles.length },
            { key: 'reviews', label: 'Отзывы', count: product.reviewCount },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3.5 text-sm font-600 border-b-2 transition-all ${
                activeTab === tab.key ? 'border-brand text-brand' : 'border-transparent text-ink-40 hover:text-ink'
              }`}
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              {tab.label}
              {'count' in tab && tab.count !== undefined && (
                <span className="ml-1.5 bg-surface text-ink-40 text-xs px-1.5 rounded">
                  {typeof tab.count === 'number' ? tab.count.toLocaleString('ru-RU') : tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="max-w-2xl">
              <p className="text-sm text-ink-60 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-lg">
              <div className="rounded-xl border border-wire overflow-hidden">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div key={key} className={`flex items-center ${i % 2 === 0 ? 'bg-surface' : 'bg-white'}`}>
                    <div className="w-48 px-4 py-2.5 text-xs font-600 text-ink-60 shrink-0" style={{ fontFamily: 'Barlow, sans-serif' }}>{key}</div>
                    <div className="flex-1 px-4 py-2.5 text-sm text-ink border-l border-wire">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compatibility' && (
            <div className="max-w-2xl">
              <p className="text-sm text-ink-60 mb-4">Эта запчасть совместима со следующими автомобилями:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.compatibleVehicles.map((v, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                      activeVehicle && checkCompatibility(activeVehicle, [v]) === 'fits'
                        ? 'bg-ok-tint border-ok/30 text-ok font-600'
                        : 'bg-surface border-wire text-ink-60'
                    }`}
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/>
                      <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                    </svg>
                    {v}
                    {activeVehicle && checkCompatibility(activeVehicle, [v]) === 'fits' && (
                      <span className="ml-auto text-[10px]">Ваш автомобиль</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-6 mb-6 p-4 bg-surface rounded-xl">
                <div className="text-center">
                  <div className="font-display text-5xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{product.rating}</div>
                  <Stars rating={product.rating} size={16} />
                  <div className="text-xs text-ink-40 mt-1">{product.reviewCount.toLocaleString('ru-RU')} отзывов</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(star => {
                    const pct = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-ink-40 w-4 text-right">{star}</span>
                        <div className="flex-1 bg-wire rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-ink-40 w-6">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {[
                { name: 'Михаил Т.', rating: 5, date: '14 июня 2026', vehicle: '2020 Honda Civic 1.5T', text: 'Идеально подошли к моему Civic. Лёгкая установка, отличная эффективность торможения. Заметно лучше заводских колодок. Однозначно куплю снова.' },
                { name: 'Сара К.', rating: 5, date: '29 мая 2026', vehicle: '2019 Honda Accord 2.0T', text: 'Отличные колодки, пришли за 2 дня. Проверка совместимости на этом сайте помогла не купить лишнее — с прошлого заказа в другом магазине ошиблась с размером.' },
                { name: 'Джеймс Р.', rating: 4, date: '12 мая 2026', vehicle: '2021 Toyota Camry 2.5L', text: 'Хороший товар, установился быстро. Немного пылят, но не критично. Тормоза уверенные после 500 км пробега.' },
              ].map(r => (
                <div key={r.name} className="border-t border-wire py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-brand-tint rounded-full flex items-center justify-center text-brand font-700 text-xs" style={{ fontFamily: 'Barlow, sans-serif' }}>
                        {r.name[0]}
                      </div>
                      <div>
                        <span className="text-sm font-600 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{r.name}</span>
                        <div className="flex items-center gap-1.5">
                          <Stars rating={r.rating} size={11} />
                          <span className="text-xs text-ink-20">· {r.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-ok bg-ok-tint px-2 py-0.5 rounded-md" style={{ fontFamily: 'Barlow, sans-serif' }}>
                      ✓ Подходит для {r.vehicle}
                    </div>
                  </div>
                  <p className="text-sm text-ink-60 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
