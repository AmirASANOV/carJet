import { useState } from 'react'
import type { Vehicle, Product, CartItem } from '../types'
import type { Page } from '../types'
import { PRODUCTS, CATEGORIES, checkCompatibility } from '../data/mockData'
import ProductCard from '../components/ProductCard'

interface HomePageProps {
  activeVehicle: Vehicle | null
  onNavigate: (page: Page) => void
  onOpenVehicleSelector: () => void
  onViewProduct: (product: Product) => void
  onAddToCart: (item: CartItem) => void
}

export default function HomePage({ activeVehicle, onNavigate, onOpenVehicleSelector, onViewProduct, onAddToCart }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const featuredProducts = PRODUCTS.slice(0, 8)
  const compatibleProducts = activeVehicle
    ? PRODUCTS.filter(p => checkCompatibility(activeVehicle, p.compatibleVehicles) === 'fits').slice(0, 4)
    : []

  return (
    <div>
      {/* Главный баннер */}
      <section className="bg-ink min-h-[520px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-80 to-[#0f0f0f]" />
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-brand opacity-10 blur-3xl" />
        <div className="absolute right-32 bottom-0 w-64 h-64 rounded-full bg-brand-light opacity-8 blur-3xl" />

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-30 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=700&fit=crop&auto=format"
            alt="Автозапчасти"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/30 rounded-full px-3 py-1 mb-5">
              <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
              <span className="text-brand-light text-xs font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
                2,4 млн запчастей · 50 000+ проверенных продавцов
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-900 text-white leading-none mb-4"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '-0.02em' }}
            >
              НУЖНАЯ ЗАПЧАСТЬ —<br />
              <span className="text-brand">ВСЕГДА В ТОЧКУ.</span>
            </h1>

            <p className="text-ink-20 text-base leading-relaxed mb-8 max-w-md">
              Ищите по вашему конкретному автомобилю. Видите только подходящие запчасти. Сравнивайте продавцов, цены и доставку — всё в одном месте.
            </p>

            <div className="flex gap-0 rounded-xl overflow-hidden shadow-2xl mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onNavigate('catalog')}
                placeholder="Поиск по названию, бренду или артикулу…"
                className="flex-1 px-4 py-4 text-sm bg-white text-ink placeholder:text-ink-20 outline-none"
              />
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-brand hover:bg-brand-dark text-white px-6 font-700 text-sm flex items-center gap-2 transition-colors shrink-0"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                Найти запчасти
              </button>
            </div>

            <button
              onClick={onOpenVehicleSelector}
              className="flex items-center gap-2 text-sm"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              {activeVehicle ? (
                <>
                  <div className="flex items-center gap-2 bg-ok/20 border border-ok/30 rounded-lg px-3 py-1.5 text-ok text-xs font-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Запчасти для {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                  </div>
                  <span className="text-ink-40 text-xs">· Сменить авто</span>
                </>
              ) : (
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-xs font-600 hover:bg-white/20 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/>
                    <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                  </svg>
                  + Выберите автомобиль для точных результатов
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="bg-brand-tint border-b border-brand-pale">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { value: '2,4 млн+', label: 'Запчастей в наличии' },
              { value: '50 000+', label: 'Проверенных продавцов' },
              { value: '4,8★', label: 'Средний рейтинг' },
              { value: '98%', label: 'Точность совместимости' },
              { value: 'Бесплатно', label: 'Мин. стоимость доставки' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <span className="font-display text-xl font-700 text-brand" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{stat.value}</span>
                <span className="text-sm text-ink-60 border-l border-brand-pale pl-2.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Совместимые товары (только при выбранном авто) */}
      {activeVehicle && compatibleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-ok rounded-full" />
                <span className="text-xs font-600 text-ok uppercase tracking-widest" style={{ fontFamily: 'Barlow, sans-serif' }}>Гарантированная совместимость</span>
              </div>
              <h2 className="font-display text-2xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                Запчасти для {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-sm text-brand font-600 flex items-center gap-1 hover:gap-2 transition-all"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Все совместимые запчасти
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {compatibleProducts.map(p => (
              <ProductCard key={p.id} product={p} activeVehicle={activeVehicle} onView={onViewProduct} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}

      {/* Категории */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Категории запчастей
          </h2>
          <button onClick={() => onNavigate('catalog')} className="text-sm text-brand font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Все категории →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => onNavigate('catalog')}
              className="group bg-white rounded-xl border border-wire p-4 text-left hover:border-brand hover:shadow-md transition-all"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            >
              <div className="w-10 h-10 rounded-lg bg-surface-2 group-hover:bg-brand-tint flex items-center justify-center text-xl mb-3 transition-colors">
                {cat.icon}
              </div>
              <p className="font-600 text-sm text-ink mb-0.5" style={{ fontFamily: 'Barlow, sans-serif' }}>{cat.name}</p>
              <p className="text-xs text-ink-40 mb-1">{cat.description}</p>
              <p className="text-xs text-brand font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>{cat.count.toLocaleString('ru-RU')} запчастей</p>
            </button>
          ))}
        </div>
      </section>

      {/* Популярные товары */}
      <section className="max-w-7xl mx-auto px-4 py-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Лучшие запчасти
            </h2>
            <p className="text-sm text-ink-40 mt-0.5">Бестселлеры с проверенными отзывами покупателей</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-sm text-brand font-600 flex items-center gap-1 hover:gap-2 transition-all"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Смотреть все
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} activeVehicle={activeVehicle} onView={onViewProduct} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Как это работает */}
      <section className="bg-surface border-y border-wire py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-700 text-ink mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Совместимость — прежде всего
            </h2>
            <p className="text-ink-40 max-w-md mx-auto text-sm">Никаких догадок. PartSync проверяет каждую запчасть для вашего конкретного автомобиля, двигателя и комплектации.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Укажите автомобиль', desc: 'Введите год, марку, модель и двигатель для активации фильтрации по вашему автомобилю.', color: 'bg-brand' },
              { num: '02', title: 'Смотрите подходящие', desc: 'Каждый товар получает зелёный значок «Подходит для вашего авто», если совместимость подтверждена.', color: 'bg-ok' },
              { num: '03', title: 'Сравните предложения', desc: 'Несколько продавцов конкурируют по цене, скорости доставки и отзывам на одну и ту же запчасть.', color: 'bg-[#3B82F6]' },
              { num: '04', title: 'Быстрая доставка', desc: 'Заказ до 15:00 — отправка в тот же день. Отслеживание посылки в реальном времени от склада до двери.', color: 'bg-[#8B5CF6]' },
            ].map(step => (
              <div key={step.num} className="bg-white rounded-xl p-5 border border-wire">
                <div className={`${step.color} text-white font-display text-sm font-700 w-8 h-8 rounded-lg flex items-center justify-center mb-4`} style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {step.num}
                </div>
                <h3 className="font-600 text-ink mb-1.5 text-sm" style={{ fontFamily: 'Barlow, sans-serif' }}>{step.title}</h3>
                <p className="text-xs text-ink-40 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Баннер для продавцов */}
      <section className="bg-brand py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-800 text-white mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Продавайте автозапчасти на PartSync
            </h2>
            <p className="text-brand-pale text-sm">Присоединяйтесь к 50 000+ продавцов. Низкие комиссии, мгновенные выплаты, полный доступ к аналитике.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate('seller')}
              className="bg-white text-brand font-700 text-sm px-6 py-3 rounded-lg hover:bg-brand-tint transition-colors"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Начать продавать бесплатно
            </button>
            <button className="border border-white/40 text-white font-600 text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Узнать больше
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
