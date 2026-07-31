import type { CartItem, Page } from "../types";

interface CartPageProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, sellerId: string, qty: number) => void;
  onRemove: (productId: string, sellerId: string) => void;
  onNavigate: (page: Page) => void;
}

export default function CartPage({
  cart,
  onUpdateQty,
  onRemove,
  onNavigate,
}: CartPageProps) {
  const subtotal = cart.reduce((s, i) => s + i.seller.price * i.quantity, 0);
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const tax = subtotal * 0.0875;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ADADAD"
            strokeWidth="1.5"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h2
          className="font-display text-2xl font-700 text-ink mb-2"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Корзина пуста
        </h2>
        <p className="text-ink-40 text-sm mb-6">
          Найдите нужные запчасти и добавьте их сюда.
        </p>
        <button
          onClick={() => onNavigate("catalog")}
          className="bg-brand text-white font-700 text-sm px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors"
          style={{ fontFamily: "Barlow, sans-serif" }}
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1
        className="font-display text-3xl font-700 text-ink mb-6"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        Корзина
        <span className="text-ink-20 text-xl ml-2">
          ({cart.reduce((s, i) => s + i.quantity, 0)} товара)
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.seller.id}`}
              className="bg-white rounded-xl border border-wire p-4 flex gap-4"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              <div className="w-20 h-20 bg-surface rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-600 text-ink-40 mb-0.5"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  {item.product.brand}
                </p>
                <h3 className="text-sm font-500 text-ink mb-1 line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-xs text-ink-40 mb-1">
                  Арт.: {item.product.partNumber}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs bg-surface text-ink-60 px-2 py-0.5 rounded"
                    style={{ fontFamily: "Barlow, sans-serif" }}
                  >
                    {item.product.condition === "OEM"
                      ? "OEM"
                      : item.product.condition === "Aftermarket"
                        ? "Неоригинал"
                        : "Восстановленный"}
                  </span>
                  <span className="text-xs text-ink-40">
                    Продавец:{" "}
                    <span className="text-ink font-500">
                      {item.seller.sellerName}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ok">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item.seller.shipping} · Доставка {item.seller.shippingDays}–
                  {item.seller.shippingDays + 1} рабочих дня
                </div>
              </div>

              <div className="flex flex-col items-end justify-between shrink-0">
                <span
                  className="font-700 text-lg text-ink"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  ${(item.seller.price * item.quantity).toFixed(2)}
                </span>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border border-wire rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        onUpdateQty(
                          item.product.id,
                          item.seller.id,
                          item.quantity - 1,
                        )
                      }
                      className="px-2 py-1 text-ink-60 hover:bg-surface text-sm transition-colors"
                    >
                      −
                    </button>
                    <span
                      className="px-3 py-1 text-sm font-600 border-x border-wire"
                      style={{ fontFamily: "Barlow, sans-serif" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQty(
                          item.product.id,
                          item.seller.id,
                          item.quantity + 1,
                        )
                      }
                      className="px-2 py-1 text-ink-60 hover:bg-surface text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.product.id, item.seller.id)}
                    className="text-ink-20 hover:text-bad transition-colors"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Промокод */}
          {/* <div className="bg-white rounded-xl border border-wire p-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <p className="text-sm font-600 text-ink mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>Промокод</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Введите промокод"
                className="flex-1 px-3 py-2 text-sm border border-wire rounded-lg outline-none focus:border-brand"
              />
              <button className="px-4 py-2 border border-brand text-brand text-sm font-600 rounded-lg hover:bg-brand-tint transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Применить
              </button>
            </div>
          </div> */}
        </div>

        {/* Итого */}
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-xl border border-wire p-5 sticky top-24"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
          >
            <h2
              className="font-700 text-ink mb-4"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              Сумма заказа
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-ink-60">
                  Товары ({cart.reduce((s, i) => s + i.quantity, 0)} шт.)
                </span>
                <span
                  className="font-600 text-ink"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-60">Доставка</span>
                <span
                  className={`font-600 ${shipping === 0 ? "text-ok" : "text-ink"}`}
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  {shipping === 0 ? "Бесплатно" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-ok bg-ok-tint px-2 py-1 rounded">
                  ✓ У вас бесплатная доставка!
                </p>
              )}
              {shipping > 0 && (
                <p className="text-xs text-ink-40 bg-surface px-2 py-1 rounded">
                  Добавьте ещё на ${(75 - subtotal).toFixed(2)} для бесплатной
                  доставки
                </p>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-ink-60">Налог (оценка)</span>
                <span
                  className="text-ink"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-wire pt-3 mb-5">
              <div className="flex justify-between items-baseline">
                <span
                  className="font-700 text-ink"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  Итого
                </span>
                <span
                  className="font-700 text-xl text-ink"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate("checkout")}
              className="w-full bg-brand hover:bg-brand-dark text-white font-700 text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              Перейти к оформлению
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-ink-40">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Безопасная оплата с шифрованием 256-бит
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-40">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                </svg>
                Возврат без вопросов в течение 30 дней
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
