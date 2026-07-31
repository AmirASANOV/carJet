import { useState } from 'react'
import type { CartItem, Page } from '../types'

interface CheckoutPageProps {
  cart: CartItem[]
  onNavigate: (page: Page) => void
  onPlaceOrder: () => void
}

const REGIONS = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград']

export default function CheckoutPage({ cart, onNavigate, onPlaceOrder }: CheckoutPageProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address')
  const [address, setAddress] = useState({ firstName: 'Алексей', lastName: 'Морозов', address1: 'ул. Ленина, д. 48, кв. 12', address2: '', city: 'Москва', region: 'Москва', zip: '101000', phone: '+7 (495) 555-01-92' })
  const [payMethod, setPayMethod] = useState<'card' | 'sbp' | 'applepay'>('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [placed, setPlaced] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.seller.price * i.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 7.99
  const tax = subtotal * 0.0875
  const total = subtotal + shipping + tax

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-ok-tint rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Заказ оформлен!</h1>
        <p className="text-ink-40 mb-1">Заказ №PS-2026-084921</p>
        <p className="text-sm text-ink-60 mb-6 max-w-xs mx-auto">
          Спасибо! Ваш заказ подтверждён и готовится к отправке. Вы получите письмо с номером отслеживания в ближайшее время.
        </p>
        <div className="bg-surface rounded-xl p-4 mb-6 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink-40">Ожидаемая доставка</span>
            <span className="font-600 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>31 июля — 1 августа 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink-40">Доставка по адресу</span>
            <span className="font-600 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>Москва, 101000</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => onNavigate('profile')} className="border border-wire text-sm font-600 px-5 py-2.5 rounded-xl hover:bg-surface transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Отследить заказ
          </button>
          <button onClick={() => onNavigate('home')} className="bg-brand text-white text-sm font-700 px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Продолжить покупки
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="font-display text-3xl font-700 text-ink mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Оформление заказа</h1>

      {/* Шаги */}
      <div className="flex items-center gap-0 mb-8">
        {([
          { key: 'address', label: 'Доставка' },
          { key: 'payment', label: 'Оплата' },
          { key: 'review', label: 'Проверка' },
        ] as const).map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 transition-colors ${
                s.key === step ? 'bg-brand text-white' :
                (step === 'payment' && s.key === 'address') || step === 'review' ? 'bg-ok text-white' :
                'bg-surface-2 text-ink-40'
              }`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                {(step === 'payment' && s.key === 'address') || (step === 'review' && s.key !== 'review') ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-600 ${s.key === step ? 'text-ink' : 'text-ink-40'}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                {s.label}
              </span>
            </div>
            {i < 2 && <div className="w-12 h-px bg-wire mx-3" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основная форма */}
        <div className="lg:col-span-2">
          {step === 'address' && (
            <div className="bg-white rounded-xl border border-wire p-5">
              <h2 className="font-700 text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Адрес доставки</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Имя', key: 'firstName', colSpan: 1 },
                  { label: 'Фамилия', key: 'lastName', colSpan: 1 },
                  { label: 'Улица, дом, квартира', key: 'address1', colSpan: 2 },
                  { label: 'Корп. / Стр. (необязательно)', key: 'address2', colSpan: 2 },
                  { label: 'Город', key: 'city', colSpan: 1 },
                  { label: 'Индекс', key: 'zip', colSpan: 1 },
                  { label: 'Номер телефона', key: 'phone', colSpan: 2 },
                ].map(field => (
                  <div key={field.key} className={field.colSpan === 2 ? 'col-span-2' : ''}>
                    <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>{field.label}</label>
                    <input
                      type="text"
                      value={(address as any)[field.key]}
                      onChange={e => setAddress(a => ({ ...a, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>Регион</label>
                  <select value={address.region} onChange={e => setAddress(a => ({ ...a, region: e.target.value }))} className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand">
                    {REGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => setStep('payment')}
                className="mt-5 w-full bg-brand hover:bg-brand-dark text-white font-700 text-sm py-3 rounded-xl transition-colors"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Перейти к оплате →
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-xl border border-wire p-5">
              <h2 className="font-700 text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Способ оплаты</h2>
              <div className="flex gap-2 mb-4">
                {([
                  { key: 'card', label: 'Банковская карта' },
                  { key: 'sbp', label: 'СБП' },
                  { key: 'applepay', label: 'Apple Pay' },
                ] as const).map(m => (
                  <button
                    key={m.key}
                    onClick={() => setPayMethod(m.key)}
                    className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-600 transition-all ${payMethod === m.key ? 'border-brand bg-brand-tint text-brand' : 'border-wire text-ink-60'}`}
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>Имя на карте</label>
                    <input value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} placeholder="Алексей Морозов" className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand" />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>Номер карты</label>
                    <input value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value }))} placeholder="1234 5678 9012 3456" className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>Срок действия</label>
                      <input value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))} placeholder="ММ / ГГ" className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-600 text-ink-60 mb-1" style={{ fontFamily: 'Barlow, sans-serif' }}>CVV</label>
                      <input value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} placeholder="•••" className="w-full px-3 py-2.5 border border-wire rounded-lg text-sm outline-none focus:border-brand font-mono" />
                    </div>
                  </div>
                </div>
              )}

              {payMethod !== 'card' && (
                <div className="bg-surface rounded-xl p-8 text-center">
                  <div className="text-2xl mb-2">{payMethod === 'sbp' ? '⚡' : '🍎'}</div>
                  <p className="text-sm text-ink-60">Вы будете перенаправлены для оплаты через {payMethod === 'sbp' ? 'Систему быстрых платежей' : 'Apple Pay'}.</p>
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep('address')} className="border border-wire text-sm font-600 px-5 py-3 rounded-xl hover:bg-surface transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>← Назад</button>
                <button onClick={() => setStep('review')} className="flex-1 bg-brand hover:bg-brand-dark text-white font-700 text-sm py-3 rounded-xl transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>Проверить заказ →</button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="bg-white rounded-xl border border-wire p-5">
              <h2 className="font-700 text-ink mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Проверка заказа</h2>

              <div className="bg-surface rounded-xl p-4 mb-4">
                <p className="text-xs font-600 text-ink-40 uppercase tracking-widest mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>Адрес доставки</p>
                <p className="text-sm font-600 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>{address.firstName} {address.lastName}</p>
                <p className="text-sm text-ink-60">{address.address1}{address.address2 ? `, ${address.address2}` : ''}</p>
                <p className="text-sm text-ink-60">{address.city}, {address.region} {address.zip}</p>
              </div>

              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.seller.id}`} className="flex gap-3 py-2 border-b border-wire last:border-0">
                    <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden shrink-0">
                      <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-ink-40">Кол-во: {item.quantity} · {item.seller.sellerName}</p>
                    </div>
                    <div className="font-700 text-sm text-ink shrink-0" style={{ fontFamily: 'Barlow, sans-serif' }}>
                      ${(item.seller.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('payment')} className="border border-wire text-sm font-600 px-5 py-3 rounded-xl hover:bg-surface transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>← Назад</button>
                <button
                  onClick={() => { onPlaceOrder(); setPlaced(true) }}
                  className="flex-1 bg-brand hover:bg-brand-dark text-white font-700 text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  Оформить заказ · ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Итого сбоку */}
        <div>
          <div className="bg-white rounded-xl border border-wire p-4 sticky top-24">
            <h3 className="font-700 text-sm text-ink mb-3" style={{ fontFamily: 'Barlow, sans-serif' }}>Итого</h3>
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-ink-40">Товары</span>
                <span style={{ fontFamily: 'Barlow, sans-serif' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-40">Доставка</span>
                <span className={shipping === 0 ? 'text-ok font-600' : ''} style={{ fontFamily: 'Barlow, sans-serif' }}>
                  {shipping === 0 ? 'Бесплатно' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-40">Налог</span>
                <span style={{ fontFamily: 'Barlow, sans-serif' }}>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-wire pt-2 flex justify-between items-baseline">
              <span className="font-700 text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>Итого</span>
              <span className="font-700 text-xl text-ink" style={{ fontFamily: 'Barlow, sans-serif' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
