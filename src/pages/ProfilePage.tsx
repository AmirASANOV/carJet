import { useState } from 'react'
import type { Vehicle, Page } from '../types'

interface ProfilePageProps {
  savedVehicles: Vehicle[]
  activeVehicle: Vehicle | null
  onSelectVehicle: (v: Vehicle) => void
  onOpenVehicleSelector: () => void
  onNavigate: (page: Page) => void
}

const ORDERS = [
  { id: 'PS-2026-084921', date: '28 июля 2026', status: 'Доставлен', items: 2, total: 119.97, tracking: '1Z999AA10123456784' },
  { id: 'PS-2026-071244', date: '14 июля 2026', status: 'Доставлен', items: 1, total: 54.99, tracking: '1Z999AA10123456785' },
  { id: 'PS-2026-059830', date: '30 июня 2026', status: 'Доставлен', items: 3, total: 287.95, tracking: '1Z999AA10123456786' },
  { id: 'PS-2026-044211', date: '15 июня 2026', status: 'Доставлен', items: 1, total: 42.99 },
]

const SAVED_PARTS = [
  { name: 'Свечи зажигания NGK Iridium IX — 4 шт.', price: 32.99, brand: 'NGK', image: 'https://images.unsplash.com/photo-1574023278045-99a8e20bca59?w=80&h=80&fit=crop&auto=format' },
  { name: 'Передние тормозные колодки Brembo', price: 64.99, brand: 'Brembo', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format' },
  { name: 'Воздушный фильтр K&N высокой производительности', price: 54.99, brand: 'K&N', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=80&h=80&fit=crop&auto=format' },
]

const STATUS_MAP: Record<string, string> = {
  'Доставлен': 'bg-ok-tint text-ok',
  'Отправлен': 'bg-[#EFF6FF] text-[#2563EB]',
  'Обрабатывается': 'bg-warn-tint text-warn',
  'Отменён': 'bg-bad-tint text-bad',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-600 px-2 py-0.5 rounded-md ${STATUS_MAP[status] || 'bg-surface text-ink-60'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
      {status}
    </span>
  )
}

export default function ProfilePage({ savedVehicles, activeVehicle, onSelectVehicle, onOpenVehicleSelector, onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'orders' | 'wishlist' | 'settings'>('overview')

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Сайдбар */}
        <aside className="w-56 shrink-0">
          <div className="bg-white rounded-xl border border-wire p-4 mb-4 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="w-14 h-14 bg-brand rounded-full flex items-center justify-center text-white font-700 text-xl mx-auto mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              АМ
            </div>
            <p className="font-700 text-ink text-sm" style={{ fontFamily: 'Barlow, sans-serif' }}>Алексей Морозов</p>
            <p className="text-xs text-ink-40">a.morozov@email.com</p>
            <div className="flex justify-center gap-2 mt-3">
              <div className="bg-brand-tint text-brand text-xs px-2 py-0.5 rounded font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>Pro</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {([
              { key: 'overview', label: 'Обзор', icon: '◻' },
              { key: 'vehicles', label: 'Мой гараж', icon: '🚗' },
              { key: 'orders', label: 'Мои заказы', icon: '📦' },
              { key: 'wishlist', label: 'Избранное', icon: '♡' },
              { key: 'settings', label: 'Настройки', icon: '⚙' },
            ] as const).map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm border-b border-wire last:border-0 transition-colors ${
                  activeTab === item.key ? 'bg-brand-tint text-brand font-600' : 'text-ink-60 hover:bg-surface'
                }`}
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <span>{item.icon}</span>
                {item.label}
                {item.key === 'orders' && (
                  <span className="ml-auto bg-brand text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center" style={{ fontFamily: 'Barlow, sans-serif' }}>4</span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Основной контент */}
        <div className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <div>
              <h2 className="font-display text-2xl font-700 text-ink mb-5" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Добро пожаловать, Алексей</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Всего заказов', value: '12', sub: 'За всё время' },
                  { label: 'Куплено запчастей', value: '34', sub: 'С 2022 года' },
                  { label: 'Экономия', value: '$284', sub: 'Vs. дилерские цены' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl border border-wire p-4 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                    <div className="font-display text-3xl font-700 text-brand mb-0.5" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{s.value}</div>
                    <div className="font-600 text-xs text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{s.label}</div>
                    <div className="text-xs text-ink-40">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-wire">
                  <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>Последние заказы</span>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-brand">Все заказы →</button>
                </div>
                {ORDERS.slice(0, 3).map(o => (
                  <div key={o.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-wire last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-600 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{o.id}</p>
                      <p className="text-xs text-ink-40">{o.date} · {o.items} {o.items === 1 ? 'товар' : 'товара'}</p>
                    </div>
                    <StatusBadge status={o.status} />
                    <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${o.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Мой гараж</h2>
                <button
                  onClick={onOpenVehicleSelector}
                  className="bg-brand text-white text-sm font-600 px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  <span>+</span> Добавить авто
                </button>
              </div>

              <div className="grid gap-3">
                {savedVehicles.map(v => (
                  <div
                    key={v.id}
                    className={`bg-white rounded-xl border-2 p-4 transition-all ${activeVehicle?.id === v.id ? 'border-brand' : 'border-wire hover:border-ink-10'}`}
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5">
                          <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/>
                          <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-700 text-ink text-sm" style={{ fontFamily: 'Barlow, sans-serif' }}>
                          {v.year} {v.make} {v.model}
                        </h3>
                        <p className="text-xs text-ink-40">{v.engine}</p>
                        {activeVehicle?.id === v.id && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-1.5 h-1.5 bg-ok rounded-full" />
                            <span className="text-xs text-ok font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>Активный</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {activeVehicle?.id !== v.id && (
                          <button
                            onClick={() => onSelectVehicle(v)}
                            className="text-sm text-brand font-600 px-3 py-1.5 border border-brand rounded-lg hover:bg-brand-tint transition-colors"
                            style={{ fontFamily: 'Barlow, sans-serif' }}
                          >
                            Сделать активным
                          </button>
                        )}
                        <button
                          onClick={() => onNavigate('catalog')}
                          className="text-sm font-600 px-3 py-1.5 border border-wire rounded-lg hover:bg-surface transition-colors text-ink-60"
                          style={{ fontFamily: 'Barlow, sans-serif' }}
                        >
                          Найти запчасти
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="font-display text-2xl font-700 text-ink mb-5" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Мои заказы</h2>
              <div className="space-y-3">
                {ORDERS.map(o => (
                  <div key={o.id} className="bg-white rounded-xl border border-wire p-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{o.id}</p>
                        <p className="text-xs text-ink-40 mt-0.5">{o.date} · {o.items} {o.items === 1 ? 'товар' : 'товара'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={o.status} />
                        <span className="font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${o.total.toFixed(2)}</span>
                      </div>
                    </div>
                    {o.tracking && (
                      <div className="flex items-center gap-2 text-xs text-ink-40 bg-surface rounded-lg px-3 py-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        Трек-номер: <span className="font-600 text-ink font-mono">{o.tracking}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs font-600 text-ink-60 border border-wire px-3 py-1.5 rounded-lg hover:bg-surface transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                        Подробнее
                      </button>
                      {o.status === 'Доставлен' && (
                        <button className="text-xs font-600 text-brand border border-brand px-3 py-1.5 rounded-lg hover:bg-brand-tint transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                          Заказать снова
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="font-display text-2xl font-700 text-ink mb-5" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Избранное</h2>
              <div className="space-y-3">
                {SAVED_PARTS.map(p => (
                  <div key={p.name} className="bg-white rounded-xl border border-wire p-4 flex gap-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                    <div className="w-16 h-16 bg-surface rounded-lg overflow-hidden shrink-0">
                      <img src={p.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-600 text-ink-40 mb-0.5" style={{ fontFamily: 'Barlow, sans-serif' }}>{p.brand}</p>
                      <p className="text-sm text-ink line-clamp-1">{p.name}</p>
                      <p className="font-700 text-brand mt-1" style={{ fontFamily: 'Barlow, sans-serif' }}>${p.price}</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button className="bg-brand text-white text-xs font-600 px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                        В корзину
                      </button>
                      <button className="text-xs text-ink-40 hover:text-bad transition-colors">Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="font-display text-2xl font-700 text-ink mb-5" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Настройки аккаунта</h2>
              <div className="bg-white rounded-xl border border-wire p-5 mb-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Личные данные</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Имя', value: 'Алексей' },
                    { label: 'Фамилия', value: 'Морозов' },
                    { label: 'Email', value: 'a.morozov@email.com' },
                    { label: 'Телефон', value: '+7 (495) 555-01-92' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>{f.label}</label>
                      <input defaultValue={f.value} className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand" />
                    </div>
                  ))}
                </div>
                <button className="mt-4 bg-brand text-white text-sm font-700 px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Сохранить
                </button>
              </div>

              <div className="bg-white rounded-xl border border-wire p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Уведомления</h3>
                {[
                  { label: 'Статус заказа', checked: true },
                  { label: 'Снижение цен на избранное', checked: true },
                  { label: 'Новые запчасти для моих авто', checked: true },
                  { label: 'Акции продавцов', checked: false },
                ].map(n => (
                  <label key={n.label} className="flex items-center justify-between py-2.5 border-b border-wire last:border-0 cursor-pointer">
                    <span className="text-sm text-ink-60">{n.label}</span>
                    <div className={`w-9 h-5 rounded-full transition-colors relative ${n.checked ? 'bg-brand' : 'bg-wire'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${n.checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
