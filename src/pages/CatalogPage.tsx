import { useState } from "react";
import type { Vehicle, Product, CartItem, Page } from "../types";
import { PRODUCTS, CATEGORIES, checkCompatibility } from "../data/mockData";
import ProductCard from "../components/ProductCard";

interface CatalogPageProps {
  activeVehicle: Vehicle | null;
  onViewProduct: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenVehicleSelector: () => void;
  onNavigate: (page: Page) => void;
}

const conditionOptions = [
  { value: "OEM", label: "OEM" },
  { value: "Aftermarket", label: "Неоригинал" },
  { value: "Remanufactured", label: "Восстановленный" },
];

export default function CatalogPage({
  activeVehicle,
  onViewProduct,
  onAddToCart,
  onOpenVehicleSelector,
}: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [fitsVehicleOnly, setFitsVehicleOnly] = useState(false);

  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;
    if (selectedConditions.length && !selectedConditions.includes(p.condition))
      return false;
    if (priceMin && p.price < parseFloat(priceMin)) return false;
    if (priceMax && p.price > parseFloat(priceMax)) return false;
    if (
      fitsVehicleOnly &&
      activeVehicle &&
      checkCompatibility(activeVehicle, p.compatibleVehicles) !== "fits"
    )
      return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
    return b.soldCount - a.soldCount;
  });

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }
  function toggleCondition(c: string) {
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    selectedConditions.length +
    (priceMin || priceMax ? 1 : 0) +
    (fitsVehicleOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Хлебные крошки + заголовок */}
      <div className="mb-5">
        <div
          className="flex items-center gap-2 text-xs text-ink-40 mb-2"
          style={{ fontFamily: "Barlow, sans-serif" }}
        >
          <span>Главная</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-ink-60">
            {selectedCategory || "Все запчасти"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h1
            className="font-display text-3xl font-700 text-ink"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {selectedCategory || "Все автозапчасти"}
          </h1>
          <span className="text-sm text-ink-40">
            {filtered.length} результатов
          </span>
        </div>
      </div>

      {/* Баннер совместимости */}
      {activeVehicle ? (
        <div className="bg-ok-tint border border-ok/30 rounded-xl p-3.5 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ok/20 rounded-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16A34A"
                strokeWidth="2.5"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <p
                className="text-sm font-600 text-ok"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Поиск запчастей для {activeVehicle.year} {activeVehicle.make}{" "}
                {activeVehicle.model} · {activeVehicle.engine}
              </p>
              <p className="text-xs text-ok/70">
                Запчасти с зелёным значком гарантированно подходят вашему
                автомобилю
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setFitsVehicleOnly(!fitsVehicleOnly)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${fitsVehicleOnly ? "bg-ok" : "bg-wire"}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${fitsVehicleOnly ? "translate-x-4" : "translate-x-0.5"}`}
                />
              </div>
              <span
                className="text-xs font-600 text-ink-60"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Только для моего авто
              </span>
            </label>
            <button
              className="text-xs text-ink-40 hover:text-ink underline"
              onClick={() => {}}
            >
              Сменить
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-brand-tint border border-brand-pale rounded-xl p-3.5 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand/15 rounded-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F05A00"
                strokeWidth="2"
              >
                <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
            </div>
            <div>
              <p
                className="text-sm font-600 text-brand"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Укажите автомобиль для точных результатов
              </p>
              <p className="text-xs text-brand/60">
                Мгновенно отфильтрует запчасти, гарантированно подходящие вашей
                машине
              </p>
            </div>
          </div>
          <button
            onClick={onOpenVehicleSelector}
            className="bg-brand text-white text-sm font-600 px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            + Добавить автомобиль
          </button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Панель фильтров */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div
            className="bg-white rounded-xl border border-wire overflow-hidden"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-wire">
              <span
                className="font-600 text-sm text-ink"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Фильтры
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedBrands([]);
                    setSelectedConditions([]);
                    setPriceMin("");
                    setPriceMax("");
                    setFitsVehicleOnly(false);
                  }}
                  className="text-xs text-brand"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  Сбросить ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Категория */}
            <div className="px-4 py-3 border-b border-wire">
              <p
                className="text-xs font-600 uppercase tracking-widest text-ink-40 mb-2.5"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Категория
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors flex justify-between ${!selectedCategory ? "bg-brand-tint text-brand font-600" : "text-ink-60 hover:bg-surface"}`}
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  Все категории
                  <span className="text-xs text-ink-20">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors flex justify-between ${selectedCategory === cat.name ? "bg-brand-tint text-brand font-600" : "text-ink-60 hover:bg-surface"}`}
                    style={{ fontFamily: "Barlow, sans-serif" }}
                  >
                    {cat.name}
                    <span className="text-xs text-ink-20">
                      {PRODUCTS.filter((p) => p.category === cat.name).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Цена */}
            <div className="px-4 py-3 border-b border-wire">
              <p
                className="text-xs font-600 uppercase tracking-widest text-ink-40 mb-2.5"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Диапазон цен ($)
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-wire rounded-md outline-none focus:border-brand"
                />
                <span className="text-ink-20 text-xs">–</span>
                <input
                  type="number"
                  placeholder="До"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-wire rounded-md outline-none focus:border-brand"
                />
              </div>
            </div>

            {/* Бренд */}
            <div className="px-4 py-3 border-b border-wire">
              <p
                className="text-xs font-600 uppercase tracking-widest text-ink-40 mb-2.5"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Бренд
              </p>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      onClick={() => toggleBrand(brand)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? "bg-brand border-brand" : "border-wire group-hover:border-brand"}`}
                    >
                      {selectedBrands.includes(brand) && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-sm text-ink-60"
                      style={{ fontFamily: "Barlow, sans-serif" }}
                    >
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Состояние */}
            <div className="px-4 py-3">
              <p
                className="text-xs font-600 uppercase tracking-widest text-ink-40 mb-2.5"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Состояние
              </p>
              <div className="space-y-1">
                {conditionOptions.map((c) => (
                  <label
                    key={c.value}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      onClick={() => toggleCondition(c.value)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedConditions.includes(c.value) ? "bg-brand border-brand" : "border-wire group-hover:border-brand"}`}
                    >
                      {selectedConditions.includes(c.value) && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-sm text-ink-60"
                      style={{ fontFamily: "Barlow, sans-serif" }}
                    >
                      {c.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Сетка товаров */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 gap-3">
            <p className="text-sm text-ink-40 shrink-0">
              <span className="font-600 text-ink">{filtered.length}</span>{" "}
              результатов
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-auto px-3 py-2 text-sm border border-wire rounded-lg outline-none focus:border-brand text-ink bg-white"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              <option value="relevance">По релевантности</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
              <option value="reviews">По отзывам</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <h3
                className="font-600 text-ink mb-1"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Ничего не найдено
              </h3>
              <p className="text-sm text-ink-40">
                Попробуйте изменить фильтры или поисковый запрос.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  activeVehicle={activeVehicle}
                  onView={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
