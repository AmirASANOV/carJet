import type { Page } from '../types'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-ink-80 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Бренд */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 2z" fill="white" fillOpacity=".25"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                  <path d="M12 5v4M12 15v4M5 12h4M15 12h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="font-display font-800 text-xl" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                PART<span className="text-brand-light">SYNC</span>
              </div>
            </div>
            <p className="text-sm text-ink-20 leading-relaxed max-w-xs">
              Умный способ найти автозапчасти. Совместимость по вашему автомобилю, проверенные продавцы и доставка в день заказа на миллионы запчастей.
            </p>
            <div className="flex gap-3 mt-5">
              {['ВК', 'ТГ', 'ЮТ', 'ОК'].map(sn => (
                <a key={sn} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand flex items-center justify-center transition-colors text-xs text-ink-20 hover:text-white font-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  {sn}
                </a>
              ))}
            </div>
          </div>

          {/* Магазин */}
          <div>
            <p className="text-xs font-600 uppercase tracking-widest text-ink-20 mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Магазин</p>
            <ul className="space-y-2.5">
              {['Все категории', 'Тормоза', 'Запчасти двигателя', 'Подвеска', 'Электрика', 'Акции', 'Новинки'].map(l => (
                <li key={l}>
                  <button onClick={() => onNavigate('catalog')} className="text-sm text-ink-20 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Аккаунт */}
          <div>
            <p className="text-xs font-600 uppercase tracking-widest text-ink-20 mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Аккаунт</p>
            <ul className="space-y-2.5">
              {['Мой аккаунт', 'Мои заказы', 'Мой гараж', 'Избранное', 'Отследить заказ', 'Возврат и обмен'].map(l => (
                <li key={l}>
                  <button onClick={() => onNavigate('profile')} className="text-sm text-ink-20 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Продавцам */}
          <div>
            <p className="text-xs font-600 uppercase tracking-widest text-ink-20 mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Продавцам</p>
            <ul className="space-y-2.5">
              {['Стать продавцом', 'Кабинет продавца', 'Тарифы и комиссии', 'Правила продавца', 'Центр поддержки', 'Связаться с нами'].map(l => (
                <li key={l}>
                  <button onClick={() => onNavigate('seller')} className="text-sm text-ink-20 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Знаки доверия */}
        <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/10">
          {[
            { icon: '🔒', label: 'Безопасная оплата' },
            { icon: '↩', label: 'Возврат 30 дней' },
            { icon: '✓', label: 'Проверенные продавцы' },
            { icon: '🚚', label: 'Доставка в день заказа' },
            { icon: '📞', label: 'Поддержка 24/7' },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2 text-sm text-ink-20">
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
          <div className="ml-auto text-xs text-ink-40">
            © 2026 PartSync Inc. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
}
