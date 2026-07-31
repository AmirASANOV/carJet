import { useState } from 'react'
import type { Page, Vehicle, CartItem } from '../types'

interface HeaderProps {
  activeVehicle: Vehicle | null
  cart: CartItem[]
  onNavigate: (page: Page) => void
  onOpenVehicleSelector: () => void
  currentPage: Page
}

export default function Header({ activeVehicle, cart, onNavigate, onOpenVehicleSelector, currentPage }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-40">
      {/* Верхняя полоса */}
      <div className="bg-ink text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="text-[#ADADAD]">Бесплатная доставка при заказе от 5 000 ₽ · Отправка в день заказа до 15:00</span>
          <div className="flex items-center gap-4 text-[#ADADAD]">
            <button onClick={() => onNavigate('seller')} className="hover:text-brand-light transition-colors">Кабинет продавца</button>
            <span>|</span>
            <button onClick={() => onNavigate('admin')} className="hover:text-brand-light transition-colors">Администрация</button>
            <span>|</span>
            <span>Отследить заказ</span>
          </div>
        </div>
      </div>

      {/* Основная шапка */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Логотип */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 2z" fill="white" fillOpacity=".25"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
              <path d="M12 5v4M12 15v4M5 12h4M15 12h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-display font-800 text-xl leading-none text-ink tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              PART<span className="text-brand">SYNC</span>
            </div>
            <div className="text-[10px] text-ink-40 font-sans-auto tracking-widest uppercase leading-none mt-0.5">Маркетплейс автозапчастей</div>
          </div>
        </button>

        {/* Выбор автомобиля */}
        <button
          onClick={onOpenVehicleSelector}
          className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
            activeVehicle
              ? 'bg-brand-tint border-brand-pale text-brand'
              : 'bg-surface border-wire text-ink-60 hover:border-brand hover:text-brand'
          }`}
          style={{ fontFamily: 'Barlow, sans-serif' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/>
            <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
          </svg>
          {activeVehicle
            ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model}`
            : 'Мой автомобиль'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        {/* Поиск */}
        <div className="flex-1 flex rounded-lg border border-wire overflow-hidden focus-within:border-brand transition-colors">
          <select className="bg-surface text-sm px-3 py-2.5 border-r border-wire text-ink-60 outline-none cursor-pointer shrink-0" style={{ fontFamily: 'Barlow, sans-serif' }}>
            <option>Все категории</option>
            <option>Тормоза</option>
            <option>Двигатель</option>
            <option>Подвеска</option>
            <option>Электрика</option>
            <option>Зажигание</option>
            <option>Кузов</option>
            <option>Обслуживание</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onNavigate('catalog')}
            placeholder="Поиск по названию, артикулу или бренду…"
            className="flex-1 px-4 py-2.5 text-sm outline-none text-ink placeholder:text-ink-20"
          />
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-brand hover:bg-brand-dark text-white px-5 font-600 text-sm transition-colors flex items-center gap-2 shrink-0"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            Найти
          </button>
        </div>

        {/* Правые кнопки */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs transition-colors gap-0.5 ${currentPage === 'profile' ? 'text-brand' : 'text-ink-60 hover:text-brand'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Аккаунт</span>
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className={`relative flex flex-col items-center px-3 py-2 rounded-lg text-xs transition-colors gap-0.5 ${currentPage === 'cart' ? 'text-brand' : 'text-ink-60 hover:text-brand'}`}
          >
            <div className="relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-700 rounded-full w-4 h-4 flex items-center justify-center" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  {cartCount}
                </span>
              )}
            </div>
            <span>Корзина</span>
          </button>
        </div>
      </div>

      {/* Навигация по категориям */}
      <div className="border-t border-wire">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-0 overflow-x-auto">
            {['Тормоза', 'Двигатель', 'Подвеска', 'Электрика', 'Зажигание', 'Кузов', 'Обслуживание', 'Трансмиссия'].map(cat => (
              <button
                key={cat}
                onClick={() => onNavigate('catalog')}
                className="px-4 py-2.5 text-sm text-ink-60 hover:text-brand border-b-2 border-transparent hover:border-brand transition-all whitespace-nowrap"
                style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => onNavigate('catalog')}
              className="px-4 py-2.5 text-sm text-brand font-600 border-b-2 border-transparent hover:border-brand transition-all whitespace-nowrap ml-auto flex items-center gap-1"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Все акции
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
