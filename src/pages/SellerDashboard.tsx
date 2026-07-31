import { useState } from 'react'

const SELLER_PRODUCTS = [
  { id: 1, name: 'Передние тормозные колодки Brembo', sku: 'P85020N', price: 61.99, stock: 148, sales: 342, status: 'Активно' },
  { id: 2, name: 'Воздушный фильтр K&N 33-2304', sku: '33-2304', price: 49.99, stock: 73, sales: 218, status: 'Активно' },
  { id: 3, name: 'Катушка зажигания Denso — 4 шт.', sku: '673-1302', price: 84.99, stock: 0, sales: 97, status: 'Нет в наличии' },
  { id: 4, name: 'Свечи зажигания NGK Iridium — 4 шт.', sku: 'BKR5EIX-11', price: 29.99, stock: 210, sales: 461, status: 'Активно' },
  { id: 5, name: 'Стойка Monroe OESpectrum', sku: '72664', price: 119.99, stock: 22, sales: 84, status: 'Активно' },
]

const SELLER_ORDERS = [
  { id: '#2026-4892', customer: 'Я. Вильямс', item: 'Тормозные колодки Brembo', total: 61.99, date: '28 июля', status: 'Ожидает отправки' },
  { id: '#2026-4891', customer: 'М. Чэнь', item: 'Воздушный фильтр K&N', total: 49.99, date: '28 июля', status: 'Отправлен' },
  { id: '#2026-4887', customer: 'Р. Дэвис', item: 'Свечи NGK x2', total: 59.98, date: '27 июля', status: 'Отправлен' },
  { id: '#2026-4872', customer: 'Т. Андерсон', item: 'Стойка Monroe', total: 119.99, date: '26 июля', status: 'Доставлен' },
]

function StatCard({ label, value, sub, color = 'text-ink' }: { label: string; value: string; sub: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl border border-wire p-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <p className="text-xs font-600 uppercase tracking-widest text-ink-40 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>{label}</p>
      <p className={`font-display text-3xl font-700 ${color}`} style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{value}</p>
      <p className="text-xs text-ink-40 mt-1">{sub}</p>
    </div>
  )
}

const STATUS_MAP: Record<string, string> = {
  'Активно': 'bg-ok-tint text-ok',
  'Нет в наличии': 'bg-bad-tint text-bad',
  'Ожидает отправки': 'bg-warn-tint text-warn',
  'Отправлен': 'bg-[#EFF6FF] text-[#2563EB]',
  'Доставлен': 'bg-ok-tint text-ok',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-600 px-2 py-0.5 rounded-md ${STATUS_MAP[status] || 'bg-surface text-ink-60'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
      {status}
    </span>
  )
}

const TAB_LABELS: Record<string, string> = {
  overview: 'Обзор',
  listings: 'Товары',
  orders: 'Заказы',
  analytics: 'Аналитика',
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'orders' | 'analytics'>('overview')

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-ok rounded-full" />
            <span className="text-xs font-600 text-ok uppercase tracking-widest" style={{ fontFamily: 'Barlow, sans-serif' }}>Кабинет продавца</span>
          </div>
          <h1 className="font-display text-3xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>РокАвто Запчасти</h1>
          <p className="text-sm text-ink-40">Лучший продавец · 4.6★ · Москва · Участник с 2019</p>
        </div>
        <button className="bg-brand text-white text-sm font-700 px-4 py-2.5 rounded-xl hover:bg-brand-dark transition-colors flex items-center gap-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Добавить товар
        </button>
      </div>

      {/* Вкладки */}
      <div className="flex gap-0 border-b border-wire mb-6">
        {(['overview', 'listings', 'orders', 'analytics'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-600 border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-brand text-brand' : 'border-transparent text-ink-40 hover:text-ink'}`}
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            {TAB_LABELS[tab]}
            {tab === 'orders' && (
              <span className="ml-1.5 bg-brand text-white text-[10px] rounded-full w-4 h-4 inline-flex items-center justify-center">{SELLER_ORDERS.filter(o => o.status === 'Ожидает отправки').length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Выручка (Июль)" value="18 420 ₽" sub="+14% к прошлому месяцу" color="text-brand" />
            <StatCard label="Заказы (Июль)" value="297" sub="234 выполнено · 1 ожидает" />
            <StatCard label="Активных товаров" value="48" sub="3 требуют пополнения" />
            <StatCard label="Рейтинг продавца" value="4.6★" sub="На основе 29 850 отзывов" color="text-[#F59E0B]" />
          </div>

          <div className="bg-white rounded-xl border border-wire overflow-hidden mb-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-wire">
              <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>Требуют внимания</span>
              <span className="bg-warn-tint text-warn text-xs font-600 px-2 py-0.5 rounded" style={{ fontFamily: 'Barlow, sans-serif' }}>1 ожидает отправки</span>
            </div>
            {SELLER_ORDERS.filter(o => o.status === 'Ожидает отправки').map(o => (
              <div key={o.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1">
                  <p className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{o.id}</p>
                  <p className="text-xs text-ink-40">{o.customer} · {o.item}</p>
                </div>
                <StatusBadge status={o.status} />
                <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${o.total.toFixed(2)}</span>
                <button className="bg-brand text-white text-xs font-600 px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Отметить отправленным
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-wire">
              <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>Мало на складе</span>
            </div>
            {SELLER_PRODUCTS.filter(p => p.stock < 25).map(p => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3 border-b border-wire last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-500 text-ink">{p.name}</p>
                  <p className="text-xs text-ink-40">Арт.: {p.sku}</p>
                </div>
                <span className={`font-700 text-sm ${p.stock === 0 ? 'text-bad' : 'text-warn'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                  {p.stock === 0 ? 'Нет в наличии' : `${p.stock} шт.`}
                </span>
                <button className="text-xs font-600 border border-wire text-ink-60 px-3 py-1.5 rounded-lg hover:bg-surface" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Пополнить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'listings' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <input placeholder="Поиск по товарам…" className="px-3 py-2 border border-wire rounded-lg text-sm outline-none focus:border-brand w-64" />
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-wire rounded-lg text-sm outline-none text-ink-60">
                <option>Все статусы</option>
                <option>Активно</option>
                <option>Нет в наличии</option>
              </select>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-wire bg-surface">
                  <th className="text-left px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>Товар</th>
                  <th className="text-right px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>Цена</th>
                  <th className="text-right px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>Склад</th>
                  <th className="text-right px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>Продажи</th>
                  <th className="px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>Статус</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {SELLER_PRODUCTS.map(p => (
                  <tr key={p.id} className="border-b border-wire last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-500 text-ink">{p.name}</p>
                      <p className="text-xs text-ink-40 font-mono">{p.sku}</p>
                    </td>
                    <td className="px-4 py-3.5 text-right font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${p.price}</td>
                    <td className={`px-4 py-3.5 text-right font-600 ${p.stock === 0 ? 'text-bad' : p.stock < 25 ? 'text-warn' : 'text-ink'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                      {p.stock}
                    </td>
                    <td className="px-4 py-3.5 text-right text-ink-60">{p.sales}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5 justify-end">
                        <button className="text-xs text-brand font-600 px-2 py-1 rounded hover:bg-brand-tint transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>Изменить</button>
                        <button className="text-xs text-ink-40 font-600 px-2 py-1 rounded hover:bg-surface transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>Снять</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-wire bg-surface">
                  {['№ заказа', 'Покупатель', 'Товар', 'Сумма', 'Дата', 'Статус', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SELLER_ORDERS.map(o => (
                  <tr key={o.id} className="border-b border-wire last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-3.5 font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{o.id}</td>
                    <td className="px-4 py-3.5 text-ink-60">{o.customer}</td>
                    <td className="px-4 py-3.5 text-ink max-w-[200px] truncate">{o.item}</td>
                    <td className="px-4 py-3.5 font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${o.total.toFixed(2)}</td>
                    <td className="px-4 py-3.5 text-ink-40">{o.date}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3.5">
                      {o.status === 'Ожидает отправки' && (
                        <button className="bg-brand text-white text-xs font-600 px-2.5 py-1.5 rounded-lg hover:bg-brand-dark transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                          Отправить
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Средний чек" value="5 230 ₽" sub="Июль 2026" />
            <StatCard label="Конверсия" value="3.8%" sub="+0.4% к июню" color="text-ok" />
            <StatCard label="Возвраты" value="1.2%" sub="Ниже порога 2%" color="text-ok" />
            <StatCard label="Положительные отзывы" value="98.7%" sub="Из всех отзывов" color="text-ok" />
          </div>

          <div className="bg-white rounded-xl border border-wire p-5 mb-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Выручка — последние 7 дней</h3>
            <div className="flex items-end gap-2 h-32">
              {[420, 680, 540, 820, 760, 910, 650].map((h, i) => {
                const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-brand rounded-t-md hover:bg-brand-dark transition-colors cursor-pointer"
                      style={{ height: `${(h / 910) * 100}%` }}
                    />
                    <span className="text-[10px] text-ink-40">{days[i]}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="px-5 py-3.5 border-b border-wire">
              <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>Лучшие товары</span>
            </div>
            {[...SELLER_PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 3).map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-wire last:border-0">
                <div className="w-6 h-6 bg-brand-tint rounded text-brand font-700 text-xs flex items-center justify-center" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-500 text-ink">{p.name}</p>
                  <p className="text-xs text-ink-40">${p.price} · {p.sales} продано</p>
                </div>
                <span className="font-700 text-sm text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  ${(p.price * p.sales).toLocaleString('ru-RU')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
