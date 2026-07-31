import { useState } from 'react'

function StatCard({ label, value, sub, icon, color = 'bg-brand' }: { label: string; value: string; sub: string; icon: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl border border-wire p-4 flex gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-base shrink-0`}>{icon}</div>
      <div>
        <p className="font-display text-2xl font-700 text-ink leading-none" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{value}</p>
        <p className="text-xs font-600 text-ink-60 mt-0.5" style={{ fontFamily: 'Barlow, sans-serif' }}>{label}</p>
        <p className="text-[10px] text-ink-40">{sub}</p>
      </div>
    </div>
  )
}

const USERS = [
  { id: 'u1', name: 'Марк Джонсон', email: 'marcus.j@email.com', role: 'Покупатель', orders: 8, joined: 'Янв 2025', status: 'Активен' },
  { id: 'u2', name: 'Линда Чэнь', email: 'lchen@autofix.com', role: 'Продавец', orders: 142, joined: 'Мар 2024', status: 'Активен' },
  { id: 'u3', name: 'Дерек Уолш', email: 'd.walsh@gmail.com', role: 'Покупатель', orders: 2, joined: 'Июн 2026', status: 'Активен' },
  { id: 'u4', name: 'AutoVault LLC', email: 'sales@autovault.com', role: 'Продавец', orders: 884, joined: 'Авг 2023', status: 'Заблокирован' },
  { id: 'u5', name: 'Прия Шарма', email: 'priya.s@email.com', role: 'Покупатель', orders: 15, joined: 'Ноя 2024', status: 'Активен' },
]

const FLAGGED_LISTINGS = [
  { id: 'l1', title: 'Оригинальный генератор BMW (Очень дёшево)', seller: 'QuickParts99', reason: 'Возможная подделка', price: 29.99, flagged: '3 часа назад' },
  { id: 'l2', title: 'Универсальные тормозные колодки для всех авто', seller: 'FastAutoShip', reason: 'Некорректная совместимость', price: 12.99, flagged: '1 день назад' },
]

const TAB_LABELS: Record<string, string> = {
  overview: 'Обзор',
  users: 'Пользователи',
  listings: 'Объявления',
  revenue: 'Финансы',
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings' | 'revenue'>('overview')

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-bad rounded-full" />
            <span className="text-xs font-600 text-bad uppercase tracking-widest" style={{ fontFamily: 'Barlow, sans-serif' }}>Панель администратора</span>
          </div>
          <h1 className="font-display text-3xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Управление платформой</h1>
          <p className="text-sm text-ink-40">Обновлено: 29 июля 2026 в 11:42</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ok rounded-full animate-pulse" />
          <span className="text-xs text-ok font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>Все системы работают</span>
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex gap-0 border-b border-wire mb-6">
        {(['overview', 'users', 'listings', 'revenue'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-600 border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-brand text-brand' : 'border-transparent text-ink-40 hover:text-ink'}`}
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            {TAB_LABELS[tab]}
            {tab === 'listings' && (
              <span className="ml-1.5 bg-bad text-white text-[10px] rounded-full w-4 h-4 inline-flex items-center justify-center">{FLAGGED_LISTINGS.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Всего пользователей" value="184 920" sub="+2 140 в этом месяце" icon="👥" color="bg-[#3B82F6]" />
            <StatCard label="Активные продавцы" value="52 830" sub="4 210 ожидают одобрения" icon="🏪" color="bg-brand" />
            <StatCard label="Активных объявлений" value="2,4 млн" sub="98.3% соответствуют правилам" icon="📦" color="bg-ok" />
            <StatCard label="Оборот за месяц" value="82 млн ₽" sub="+18% к прошлому месяцу" icon="💰" color="bg-[#8B5CF6]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-xl border border-wire p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Здоровье платформы</h3>
              <div className="space-y-3">
                {[
                  { label: 'Точность базы совместимости', value: 98, color: 'bg-ok' },
                  { label: 'Соблюдение правил продавцами', value: 96, color: 'bg-ok' },
                  { label: 'Выполнение заказов', value: 94, color: 'bg-brand' },
                  { label: 'Удовлетворённость клиентов', value: 91, color: 'bg-brand' },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink-60">{m.label}</span>
                      <span className="font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{m.value}%</span>
                    </div>
                    <div className="bg-wire rounded-full h-1.5 overflow-hidden">
                      <div className={`${m.color} h-full rounded-full`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-wire p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Последние события</h3>
              <div className="space-y-3">
                {[
                  { msg: 'Продавец «AutoVault LLC» заблокирован за нарушение правил', time: '1 ч. назад', type: 'bad' },
                  { msg: '2 объявления ожидают ручной проверки', time: '3 ч. назад', type: 'warn' },
                  { msg: 'База обновлена: добавлено 48 200 записей совместимости', time: '6 ч. назад', type: 'ok' },
                  { msg: 'Выплаты на сумму 6,1 млн ₽ отправлены 42 800 продавцам', time: '1 д. назад', type: 'ok' },
                  { msg: 'Продавец «LindasAutoFix» прошёл проверку и одобрен', time: '1 д. назад', type: 'ok' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${a.type === 'ok' ? 'bg-ok' : a.type === 'warn' ? 'bg-warn' : 'bg-bad'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-ink-60 leading-snug">{a.msg}</p>
                      <p className="text-[10px] text-ink-20 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {FLAGGED_LISTINGS.length > 0 && (
            <div className="bg-white rounded-xl border border-bad/30 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-wire bg-bad-tint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="font-700 text-sm text-bad" style={{ fontFamily: 'Barlow, sans-serif' }}>Объявления, требующие проверки</span>
              </div>
              {FLAGGED_LISTINGS.map(l => (
                <div key={l.id} className="flex items-center gap-4 px-5 py-4 border-b border-wire last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-500 text-sm text-ink truncate">{l.title}</p>
                    <p className="text-xs text-ink-40">{l.seller} · {l.flagged}</p>
                    <span className="text-xs bg-bad-tint text-bad px-2 py-0.5 rounded mt-1 inline-block font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>{l.reason}</span>
                  </div>
                  <span className="font-700 text-sm text-ink shrink-0" style={{ fontFamily: 'Barlow, sans-serif' }}>${l.price}</span>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-xs bg-ok text-white font-600 px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity" style={{ fontFamily: 'Barlow, sans-serif' }}>Одобрить</button>
                    <button className="text-xs bg-bad text-white font-600 px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity" style={{ fontFamily: 'Barlow, sans-serif' }}>Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <input placeholder="Поиск пользователей…" className="px-3 py-2 border border-wire rounded-lg text-sm outline-none focus:border-brand flex-1 max-w-xs" />
            <select className="px-3 py-2 border border-wire rounded-lg text-sm outline-none text-ink-60">
              <option>Все роли</option>
              <option>Покупатель</option>
              <option>Продавец</option>
            </select>
            <select className="px-3 py-2 border border-wire rounded-lg text-sm outline-none text-ink-60">
              <option>Все статусы</option>
              <option>Активен</option>
              <option>Заблокирован</option>
            </select>
          </div>
          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-wire bg-surface">
                  {['Пользователь', 'Роль', 'Заказы', 'Дата регистрации', 'Статус', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-600 text-ink-40 uppercase tracking-wider" style={{ fontFamily: 'Barlow, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USERS.map(u => (
                  <tr key={u.id} className="border-b border-wire last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-brand-tint rounded-full flex items-center justify-center text-brand text-xs font-700 shrink-0" style={{ fontFamily: 'Barlow, sans-serif' }}>
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-500 text-ink text-sm">{u.name}</p>
                          <p className="text-xs text-ink-40">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-600 px-2 py-0.5 rounded ${u.role === 'Продавец' ? 'bg-brand-tint text-brand' : 'bg-surface text-ink-60'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-60 font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>{u.orders}</td>
                    <td className="px-4 py-3.5 text-ink-40">{u.joined}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-600 px-2 py-0.5 rounded-md ${u.status === 'Активен' ? 'bg-ok-tint text-ok' : 'bg-bad-tint text-bad'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5 justify-end">
                        <button className="text-xs text-brand font-600 px-2 py-1 rounded hover:bg-brand-tint" style={{ fontFamily: 'Barlow, sans-serif' }}>Просмотр</button>
                        <button className="text-xs text-ink-40 font-600 px-2 py-1 rounded hover:bg-surface" style={{ fontFamily: 'Barlow, sans-serif' }}>
                          {u.status === 'Активен' ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'listings' && (
        <div>
          <div className="mb-4 p-4 bg-warn-tint border border-warn/30 rounded-xl text-sm text-warn font-600 flex items-center gap-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            {FLAGGED_LISTINGS.length} объявления помечены системой модерации и требуют ручной проверки.
          </div>
          <div className="bg-white rounded-xl border border-wire overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {FLAGGED_LISTINGS.map(l => (
              <div key={l.id} className="flex items-start gap-4 p-5 border-b border-wire last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-600 text-sm text-ink mb-0.5" style={{ fontFamily: 'Barlow, sans-serif' }}>{l.title}</p>
                  <p className="text-xs text-ink-40">Продавец: {l.seller} · ${l.price} · Помечено {l.flagged}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-bad-tint text-bad px-2 py-0.5 rounded font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>⚠ {l.reason}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 mt-0.5">
                  <button className="text-xs border border-wire text-ink-60 font-600 px-3 py-1.5 rounded-lg hover:bg-surface" style={{ fontFamily: 'Barlow, sans-serif' }}>Просмотр</button>
                  <button className="text-xs bg-ok text-white font-600 px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Barlow, sans-serif' }}>Одобрить</button>
                  <button className="text-xs bg-bad text-white font-600 px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Barlow, sans-serif' }}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Оборот (Июль)" value="82 млн ₽" sub="+18% к прошлому месяцу" icon="📈" color="bg-ok" />
            <StatCard label="Комиссии (Июль)" value="4,9 млн ₽" sub="6% средняя ставка" icon="💳" color="bg-brand" />
            <StatCard label="Выплаты (Июль)" value="77 млн ₽" sub="Выплачено 28 июля" icon="💸" color="bg-[#3B82F6]" />
            <StatCard label="Споры" value="1,4 млн ₽" sub="8 открытых споров" icon="⚖" color="bg-warn" />
          </div>

          <div className="bg-white rounded-xl border border-wire p-5 mb-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Оборот по месяцам — 2026</h3>
            <div className="flex items-end gap-3 h-36">
              {[4.2, 4.8, 5.1, 5.6, 6.0, 6.8, 8.2].map((v, i) => {
                const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл']
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-ink-40 font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>{v}M</span>
                    <div
                      className={`w-full rounded-t-lg ${i === 6 ? 'bg-brand' : 'bg-brand/30'} hover:bg-brand transition-colors cursor-pointer`}
                      style={{ height: `${(v / 8.2) * 100}%` }}
                    />
                    <span className="text-[10px] text-ink-40">{months[i]}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-wire p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 className="font-700 text-sm text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Выручка по категориям (Июль)</h3>
            <div className="space-y-3">
              {[
                { cat: 'Детали двигателя', pct: 28, value: '23 млн ₽' },
                { cat: 'Тормоза', pct: 22, value: '18 млн ₽' },
                { cat: 'Подвеска', pct: 16, value: '13,1 млн ₽' },
                { cat: 'Электрика', pct: 14, value: '11,5 млн ₽' },
                { cat: 'Остальное', pct: 20, value: '16,4 млн ₽' },
              ].map(c => (
                <div key={c.cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-60">{c.cat}</span>
                    <div className="flex gap-3">
                      <span className="text-ink-40">{c.pct}%</span>
                      <span className="font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{c.value}</span>
                    </div>
                  </div>
                  <div className="bg-wire rounded-full h-2 overflow-hidden">
                    <div className="bg-brand h-full rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
