import type { Product, Vehicle } from "../types";

export const VEHICLE_DATA: Record<string, Record<string, string[]>> = {
  Honda: {
    Accord: [
      "1.5T 4-цил. 192 л.с.",
      "2.0T 4-цил. 252 л.с.",
      "3.5L V6 278 л.с.",
    ],
    Civic: ["1.5T 4-цил. 158 л.с.", "2.0L 4-цил. 158 л.с.", "Si 1.5T 200 л.с."],
    "CR-V": ["1.5T 4-цил. 190 л.с.", "2.0L Гибрид 212 л.с."],
    Pilot: ["3.5L V6 280 л.с."],
    Odyssey: ["3.5L V6 280 л.с."],
  },
  Toyota: {
    Camry: ["2.5L 4-цил. 203 л.с.", "2.5L Гибрид 208 л.с.", "3.5L V6 301 л.с."],
    Corolla: ["2.0L 4-цил. 169 л.с.", "1.8L Гибрид 121 л.с."],
    RAV4: ["2.5L 4-цил. 203 л.с.", "2.5L Гибрид 219 л.с."],
    Highlander: ["2.4T 265 л.с.", "2.5L Гибрид 243 л.с."],
    Tacoma: ["2.7L 4-цил. 159 л.с.", "3.5L V6 278 л.с."],
  },
  Ford: {
    "F-150": [
      "3.5L V6 290 л.с.",
      "2.7L EcoBoost 325 л.с.",
      "3.5L EcoBoost 400 л.с.",
      "5.0L V8 400 л.с.",
    ],
    Mustang: ["2.3L EcoBoost 310 л.с.", "5.0L V8 450 л.с."],
    Explorer: ["2.3L EcoBoost 300 л.с.", "3.0L EcoBoost 365 л.с."],
    Escape: ["1.5L EcoBoost 181 л.с.", "2.0L EcoBoost 250 л.с."],
    Edge: ["2.0L EcoBoost 250 л.с."],
  },
  Chevrolet: {
    Silverado: ["2.7T 310 л.с.", "5.3L V8 355 л.с.", "6.2L V8 420 л.с."],
    Malibu: ["1.5T 4-цил. 160 л.с.", "2.0T 4-цил. 250 л.с."],
    Equinox: ["1.5T 4-цил. 170 л.с.", "2.0T 4-цил. 252 л.с."],
    Tahoe: ["5.3L V8 355 л.с.", "6.2L V8 420 л.с."],
    Camaro: ["2.0T 4-цил. 275 л.с.", "3.6L V6 335 л.с.", "6.2L V8 455 л.с."],
  },
  BMW: {
    "3 Series": [
      "2.0L TwinPower 255 л.с.",
      "3.0L TwinPower 382 л.с.",
      "M340i 382 л.с.",
    ],
    "5 Series": ["2.0L TwinPower 248 л.с.", "3.0L TwinPower 335 л.с."],
    X3: ["2.0L TwinPower 248 л.с.", "3.0L TwinPower 382 л.с."],
    X5: ["3.0L TwinPower 335 л.с.", "4.4L V8 523 л.с."],
  },
  Audi: {
    A4: ["2.0T TFSI 201 л.с.", "2.0T TFSI 261 л.с."],
    A6: ["2.0T TFSI 261 л.с.", "3.0T TFSI 335 л.с."],
    Q5: ["2.0T TFSI 261 л.с.", "SQ5 3.0T 349 л.с."],
    Q7: ["3.0T TFSI 335 л.с."],
    A3: ["2.0T TFSI 228 л.с."],
  },
  Hyundai: {
    Elantra: ["2.0L MPI 147 л.с.", "1.6T 201 л.с.", "N 2.0T 276 л.с."],
    Sonata: ["2.5L MPI 191 л.с.", "2.0T 290 л.с."],
    Tucson: ["2.5L MPI 187 л.с.", "1.6T Гибрид 226 л.с."],
    "Santa Fe": ["2.5L MPI 191 л.с.", "1.6T Гибрид 226 л.с."],
  },
  Nissan: {
    Altima: ["2.5L DOHC 182 л.с.", "2.0T VC-Turbo 248 л.с."],
    Sentra: ["2.0L DOHC 149 л.с."],
    Rogue: ["1.5T KR15 201 л.с."],
    Pathfinder: ["3.5L V6 284 л.с."],
  },
  Subaru: {
    Outback: ["2.5L Boxer 182 л.с.", "2.4T Boxer 260 л.с."],
    Forester: ["2.5L Boxer 182 л.с."],
    Impreza: ["2.0L Boxer 152 л.с."],
    Crosstrek: ["2.0L Boxer 152 л.с.", "2.5L Boxer 182 л.с."],
  },
  Mazda: {
    Mazda3: [
      "2.0L SKYACTIV 155 л.с.",
      "2.5L SKYACTIV 186 л.с.",
      "2.5T SKYACTIV 227 л.с.",
    ],
    Mazda6: ["2.5L SKYACTIV 187 л.с.", "2.5T SKYACTIV 227 л.с."],
    "CX-5": ["2.5L SKYACTIV 187 л.с.", "2.5T SKYACTIV 256 л.с."],
    "MX-5 Miata": ["2.0L SKYACTIV 181 л.с."],
  },
};

const S = [
  {
    id: "s1",
    sellerName: "АвтоЗапчасти Плюс",
    sellerRating: 4.8,
    sellerReviews: 45230,
    shipping: "Бесплатная доставка",
    shippingDays: 2,
    badge: "Лучший продавец",
    location: "Москва",
  },
  {
    id: "s2",
    sellerName: "МоторДеталь",
    sellerRating: 4.7,
    sellerReviews: 38190,
    shipping: "Бесплатная доставка",
    shippingDays: 3,
    badge: "Проверен",
    location: "Санкт-Петербург",
  },
  {
    id: "s3",
    sellerName: "РокАвто Запчасти",
    sellerRating: 4.6,
    sellerReviews: 29850,
    shipping: "Доставка 299 ₽",
    shippingDays: 3,
    badge: "Быстрая доставка",
    location: "Екатеринбург",
  },
  {
    id: "s4",
    sellerName: "АвтоМаркет",
    sellerRating: 4.4,
    sellerReviews: 18720,
    shipping: "Бесплатная доставка",
    shippingDays: 5,
    location: "Новосибирск",
  },
  {
    id: "s5",
    sellerName: "Саммит Рейсинг",
    sellerRating: 4.9,
    sellerReviews: 52100,
    shipping: "Бесплатная доставка",
    shippingDays: 2,
    badge: "Лучший продавец",
    location: "Казань",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Тормозные колодки Brembo передние — OEM качество",
    partNumber: "P85020N",
    brand: "Brembo",
    category: "Тормоза",
    subcategory: "Тормозные колодки",
    price: 64.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 1847,
    compatibleVehicles: [
      "2017-2023 Honda Accord",
      "2016-2021 Honda Civic",
      "2019-2023 Honda CR-V",
      "2019-2023 Toyota Camry",
      "2018-2023 Toyota Corolla",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 64.99, condition: "Новый — OEM" },
      { ...S[1], price: 67.49, condition: "Новый — OEM" },
      { ...S[2], price: 61.99, condition: "Новый — OEM" },
      { ...S[3], price: 59.99, condition: "Новый — OEM" },
    ],
    description:
      "Тормозные колодки Brembo обеспечивают превосходную эффективность торможения благодаря фирменному фрикционному составу. Разработаны для точного соответствия и оптимальной тормозной производительности. Фаски и прорези конструкции минимизируют шум и вибрацию, продлевая срок службы.",
    specs: {
      Расположение: "Передняя ось",
      Материал: "Полуметаллический",
      Толщина: "14 мм",
      Ширина: "92 мм",
      Высота: "63 мм",
      Пластина: "В комплекте",
      "Комплект крепежа": "В комплекте",
      "Датчик износа": "В комплекте",
    },
    warranty: "1 год / 20 000 км",
    soldCount: 8420,
  },
  {
    id: "p2",
    name: "Высокопроизводительный воздушный фильтр K&N",
    partNumber: "33-2304",
    brand: "K&N",
    category: "Двигатель",
    subcategory: "Воздушные фильтры",
    price: 54.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.7,
    reviewCount: 3254,
    compatibleVehicles: [
      "2016-2023 Honda Civic",
      "2018-2023 Honda Accord",
      "2019-2023 Toyota Camry",
      "2020-2023 Toyota RAV4",
      "2018-2023 Ford F-150",
      "2019-2023 Chevrolet Silverado",
    ],
    condition: "Aftermarket",
    inStock: true,
    sellers: [
      { ...S[0], price: 54.99, condition: "Новый" },
      { ...S[4], price: 52.99, condition: "Новый" },
      { ...S[2], price: 49.99, condition: "Новый" },
    ],
    description:
      "Сменные воздушные фильтры K&N повышают мощность и ускорение, обеспечивая при этом отличную фильтрацию. Моющийся и многоразовый фильтр рассчитан на весь срок службы автомобиля и пропускает значительно больше воздуха, чем стандартный бумажный фильтр.",
    specs: {
      "Тип фильтра": "Панельный",
      Материал: "Хлопковая марля",
      Форма: "Прямоугольная",
      Длина: "314 мм",
      Ширина: "194 мм",
      Высота: "43 мм",
      Цвет: "Красный",
      Моющийся: "Да",
    },
    warranty: "Ограниченная гарантия 1 000 000 миль",
    soldCount: 12850,
  },
  {
    id: "p3",
    name: "Катушки зажигания Denso — 4 штуки",
    partNumber: "673-1302",
    brand: "Denso",
    category: "Зажигание",
    subcategory: "Катушки зажигания",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1574023278045-99a8e20bca59?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1574023278045-99a8e20bca59?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviewCount: 967,
    compatibleVehicles: [
      "2017-2023 Honda Accord",
      "2016-2021 Honda Civic",
      "2015-2022 Toyota Camry",
      "2016-2022 Toyota Corolla",
      "2018-2022 Subaru Outback",
      "2019-2022 Subaru Forester",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 89.99, condition: "Новый — OEM" },
      { ...S[1], price: 94.99, condition: "Новый — OEM" },
      { ...S[3], price: 84.99, condition: "Новый — OEM" },
    ],
    description:
      "Катушки зажигания Denso производятся по тем же стандартам, что и оригинальные комплектующие. Каждая катушка обеспечивает максимальную производительность, надёжность и долговечность благодаря усиленной изоляции, стойкой к теплу и вибрации.",
    specs: {
      "Количество цилиндров": "4 штуки",
      "Тип разъёма": "3-контактный",
      "Первичное сопротивление": "0,7 Ом",
      "Вторичное сопротивление": "10 100 Ом",
      "Тип катушки": "COP (катушка на свече)",
      Резьба: "M6 × 1,0",
    },
    warranty: "3 года / 60 000 км",
    soldCount: 4210,
  },
  {
    id: "p4",
    name: "Стойка в сборе Monroe OESpectrum передняя",
    partNumber: "72664",
    brand: "Monroe",
    category: "Подвеска",
    subcategory: "Стойки и амортизаторы",
    price: 129.99,
    originalPrice: 169.99,
    image:
      "https://images.unsplash.com/photo-1599256872237-36b3c86d4c7d?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1599256872237-36b3c86d4c7d?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.6,
    reviewCount: 524,
    compatibleVehicles: [
      "2013-2017 Honda Accord",
      "2012-2016 Honda Civic",
      "2013-2016 Honda CR-V",
      "2015-2020 Mazda6",
      "2014-2019 Mazda3",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 129.99, condition: "Новый" },
      { ...S[2], price: 119.99, condition: "Новый" },
      { ...S[3], price: 124.99, condition: "Новый" },
    ],
    description:
      "Стойки Monroe OESpectrum восстанавливают динамику автомобиля до заводских характеристик. Конструкция «готов к монтажу» включает пружину, верхнюю опору и подшипник — полностью в сборе, без специального инструмента.",
    specs: {
      Расположение: "Передняя левая",
      Тип: "Стойка в сборе",
      Пружина: "В комплекте",
      "Верхняя опора": "В комплекте",
      Пыльник: "В комплекте",
      Буфер: "В комплекте",
      "Длина в расжатом виде": "580 мм",
      "Длина в сжатом виде": "380 мм",
    },
    warranty: "Ограниченная пожизненная гарантия",
    soldCount: 2150,
  },
  {
    id: "p5",
    name: "Щётки стеклоочистителя Bosch ICON — комплект 2 шт.",
    partNumber: "ICON18A+ICON26A",
    brand: "Bosch",
    category: "Кузов",
    subcategory: "Щётки стеклоочистителя",
    price: 34.99,
    originalPrice: 49.99,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c39f19d9d?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c39f19d9d?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.7,
    reviewCount: 5820,
    compatibleVehicles: [
      "2018-2023 Honda Accord",
      "2016-2023 Honda Civic",
      "2019-2023 Toyota Camry",
      "2018-2023 Toyota Corolla",
      "2014-2022 Mazda3",
      "2018-2023 Hyundai Elantra",
      "2018-2023 Hyundai Sonata",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 34.99, condition: "Новый" },
      { ...S[1], price: 36.99, condition: "Новый" },
      { ...S[2], price: 32.99, condition: "Новый" },
      { ...S[3], price: 29.99, condition: "Новый" },
    ],
    description:
      "Щётки Bosch ICON с технологией ClearMax 365 обеспечивают отличное качество очистки в любую погоду. Патентованная бескаркасная конструкция равномерно распределяет давление по всей длине щётки для максимального качества очистки.",
    specs: {
      "Водительская щётка": "660 мм",
      "Пассажирская щётка": "450 мм",
      Тип: "Бескаркасная",
      Крепление: "Универсальный штырьковый",
      Материал: "Натуральная резина",
    },
    warranty: "2 года",
    soldCount: 18930,
  },
  {
    id: "p6",
    name: "Генератор ACDelco Professional — восстановленный",
    partNumber: "335-1286",
    brand: "ACDelco",
    category: "Электрика",
    subcategory: "Генераторы",
    price: 219.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.5,
    reviewCount: 287,
    compatibleVehicles: [
      "2014-2019 Chevrolet Silverado",
      "2015-2019 Chevrolet Tahoe",
      "2014-2019 Chevrolet Camaro",
      "2014-2018 Chevrolet Equinox",
    ],
    condition: "Remanufactured",
    inStock: true,
    sellers: [
      { ...S[0], price: 219.99, condition: "Восстановленный" },
      { ...S[4], price: 209.99, condition: "Восстановленный" },
      { ...S[2], price: 199.99, condition: "Восстановленный" },
    ],
    description:
      "Восстановленные генераторы ACDelco Professional соответствуют или превышают оригинальные характеристики. Новые щётки, кольца скольжения, диоды, регулятор и подшипники гарантируют надёжную долгосрочную работу.",
    specs: {
      Мощность: "170 А",
      Напряжение: "12 В",
      Вращение: "По часовой стрелке",
      "Тип шкива": "Обгонная муфта",
      "Тип регулятора": "Встроенный",
      "Материал корпуса": "Алюминий",
    },
    warranty: "3 года / 100 000 км",
    soldCount: 892,
  },
  {
    id: "p7",
    name: "Комплект ремня ГРМ Gates с помпой",
    partNumber: "TCKWP329R",
    brand: "Gates",
    category: "Двигатель",
    subcategory: "Ремни ГРМ",
    price: 179.99,
    originalPrice: 229.99,
    image:
      "https://images.unsplash.com/photo-1550355293-bbee04a2d6af?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1550355293-bbee04a2d6af?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 1124,
    compatibleVehicles: [
      "2010-2022 Toyota Camry",
      "2009-2022 Toyota Corolla",
      "2009-2020 Toyota RAV4",
      "2011-2019 Toyota Highlander",
      "2005-2017 Toyota Tacoma",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 179.99, condition: "Новый" },
      { ...S[4], price: 174.99, condition: "Новый" },
      { ...S[2], price: 169.99, condition: "Новый" },
    ],
    description:
      "Полный комплект для замены ремня ГРМ: ремень, водяной насос, натяжитель и обводной ролик. Высококачественный ремень из резины HSN обеспечивает точную посадку и длительный срок службы.",
    specs: {
      "Состав комплекта": "4 компонента",
      "Материал ремня": "Резина HSN",
      "Зубьев ремня": "163",
      "Ширина ремня": "25 мм",
      "Водяной насос": "В комплекте",
      Натяжитель: "В комплекте",
      "Обводной ролик": "В комплекте",
    },
    warranty: "5 лет / 100 000 км",
    soldCount: 3840,
  },
  {
    id: "p8",
    name: "Масляный фильтр Motorcraft Premium",
    partNumber: "FL820S",
    brand: "Motorcraft",
    category: "Обслуживание",
    subcategory: "Масляные фильтры",
    price: 8.99,
    originalPrice: 12.99,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviewCount: 8924,
    compatibleVehicles: [
      "2011-2023 Ford F-150",
      "2015-2023 Ford Mustang",
      "2009-2022 Ford Escape",
      "2011-2022 Ford Explorer",
      "2013-2020 Ford Fusion",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 8.99, condition: "Новый — OEM" },
      { ...S[1], price: 9.49, condition: "Новый — OEM" },
      { ...S[3], price: 7.99, condition: "Новый — OEM" },
    ],
    description:
      "Масляные фильтры Motorcraft — оригинальный выбор для автомобилей Ford. Фильтрующий элемент улавливает мельчайшие частицы, сохраняя оптимальный поток масла. Силиконовый обратный клапан обеспечивает максимальную защиту двигателя при запуске.",
    specs: {
      Резьба: "M20 × 1,5",
      Высота: "100 мм",
      Диаметр: "75 мм",
      "Фильтрующий элемент": "Совместим с синтетикой",
      "Перепускной клапан": "Есть",
      "Обратный клапан": "Силиконовый",
    },
    warranty: "1 год",
    soldCount: 42100,
  },
  {
    id: "p9",
    name: "Шаровая опора Moog нижняя передняя",
    partNumber: "RK622178",
    brand: "Moog",
    category: "Подвеска",
    subcategory: "Шаровые опоры",
    price: 42.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.7,
    reviewCount: 2156,
    compatibleVehicles: [
      "2013-2022 Ford Fusion",
      "2013-2022 Ford Escape",
      "2013-2021 Ford Edge",
      "2015-2022 Ford Focus",
      "2014-2020 Lincoln MKZ",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 42.99, condition: "Новый" },
      { ...S[2], price: 39.99, condition: "Новый" },
      { ...S[3], price: 41.99, condition: "Новый" },
    ],
    description:
      "Шаровые опоры Moog с запатентованным подшипником подачи смазки, нагнетающим смазку через шар и гнездо при движении подвески. Конструкция запрессовки подходит для стандартного рычага подвески.",
    specs: {
      Расположение: "Передняя нижняя",
      Тип: "Запрессовываемая",
      "Диаметр пальца": "22 мм",
      "Резьба пальца": "M22 × 1,5",
      "Угол гнезда": "38°",
      "Пресс-маслёнка": "В комплекте",
      Пыльник: "В комплекте",
    },
    warranty: "Ограниченная пожизненная гарантия",
    soldCount: 5680,
  },
  {
    id: "p10",
    name: "Свечи зажигания NGK Iridium IX — 4 штуки",
    partNumber: "BKR5EIX-11",
    brand: "NGK",
    category: "Зажигание",
    subcategory: "Свечи зажигания",
    price: 32.99,
    originalPrice: 44.99,
    image:
      "https://images.unsplash.com/photo-1574023278045-99a8e20bca59?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1574023278045-99a8e20bca59?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 4521,
    compatibleVehicles: [
      "2016-2023 Honda Civic",
      "2017-2023 Honda Accord",
      "2019-2023 Toyota Camry",
      "2018-2023 Toyota Corolla",
      "2016-2023 Hyundai Elantra",
      "2018-2023 Hyundai Sonata",
      "2016-2023 Nissan Altima",
      "2018-2023 Nissan Sentra",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 32.99, condition: "Новый" },
      { ...S[1], price: 34.99, condition: "Новый" },
      { ...S[4], price: 31.99, condition: "Новый" },
      { ...S[3], price: 29.99, condition: "Новый" },
    ],
    description:
      "Свечи NGK Iridium IX с центральным электродом 0,6 мм из иридия обеспечивают превосходные характеристики воспламенения и длительный срок службы. Тройная торцевая прокладка исключает утечку газов сгорания.",
    specs: {
      Материал: "Иридий",
      Зазор: "1,1 мм",
      Резьба: "14 мм",
      Вылет: "19 мм",
      Уплотнение: "Прокладочное",
      Ключ: "16 мм",
      "Тепловое число": "5",
      Комплект: "4 свечи",
    },
    warranty: "4 года / 100 000 км",
    soldCount: 14200,
  },
  {
    id: "p11",
    name: "Суппорт Cardone восстановленный — передний левый",
    partNumber: "19-B2679",
    brand: "Cardone",
    category: "Тормоза",
    subcategory: "Тормозные суппорты",
    price: 58.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.4,
    reviewCount: 734,
    compatibleVehicles: [
      "2013-2017 Honda Accord",
      "2012-2016 Honda Civic",
      "2012-2016 Honda CR-V",
      "2013-2016 Honda Pilot",
    ],
    condition: "Remanufactured",
    inStock: true,
    sellers: [
      { ...S[0], price: 58.99, condition: "Восстановленный" },
      { ...S[2], price: 55.99, condition: "Восстановленный" },
    ],
    description:
      "Восстановленные суппорты Cardone проходят полную замену резиновых уплотнений и гидравлическое испытание. Тщательная очистка удаляет всю старую жидкость и загрязнения перед сборкой.",
    specs: {
      Расположение: "Передний левый",
      "Количество поршней": "2 поршня",
      "Материал поршня": "Фенольный",
      Скоба: "Не входит",
      "Комплект крепежа": "В комплекте",
      "Материал пыльника": "Резина EPDM",
    },
    warranty: "1 год / 20 000 км",
    soldCount: 1890,
  },
  {
    id: "p12",
    name: "Прокладка масляного поддона Dorman",
    partNumber: "264-185",
    brand: "Dorman",
    category: "Двигатель",
    subcategory: "Прокладки",
    price: 24.99,
    originalPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=700&fit=crop&auto=format",
    ],
    rating: 4.5,
    reviewCount: 1089,
    compatibleVehicles: [
      "2016-2023 Honda Civic",
      "2017-2023 Honda Accord",
      "2018-2023 Honda CR-V",
      "2019-2022 Honda Insight",
    ],
    condition: "OEM",
    inStock: true,
    sellers: [
      { ...S[0], price: 24.99, condition: "Новый" },
      { ...S[1], price: 26.49, condition: "Новый" },
      { ...S[3], price: 22.99, condition: "Новый" },
    ],
    description:
      "Прокладки масляного поддона Dorman обеспечивают надёжное уплотнение для предотвращения утечки масла. Изготовлены из высококачественной многослойной стали с силиконовым буртиком, стойкой к теплу, вибрации и химическому воздействию.",
    specs: {
      Материал: "Многослойная сталь + силикон",
      "Схема болтов": "20 отверстий",
      "Форма поддона": "Прямоугольная",
    },
    warranty: "1 год",
    soldCount: 2980,
  },
];

export const CATEGORIES = [
  {
    name: "Тормоза",
    icon: "⬡",
    count: 24850,
    description: "Колодки, диски, суппорты и крепёж",
  },
  {
    name: "Двигатель",
    icon: "⚙",
    count: 31420,
    description: "Фильтры, прокладки, ремни и многое другое",
  },
  {
    name: "Подвеска",
    icon: "⊕",
    count: 18950,
    description: "Амортизаторы, стойки и рычаги",
  },
  {
    name: "Электрика",
    icon: "⚡",
    count: 22380,
    description: "Генераторы, стартеры и датчики",
  },
  {
    name: "Зажигание",
    icon: "◎",
    count: 14230,
    description: "Свечи, катушки и провода",
  },
  {
    name: "Кузов",
    icon: "◇",
    count: 28100,
    description: "Щётки, зеркала и фары",
  },
  {
    name: "Обслуживание",
    icon: "✦",
    count: 19760,
    description: "Фильтры, жидкости и расходники",
  },
  {
    name: "Трансмиссия",
    icon: "▲",
    count: 9840,
    description: "Сцепление, уплотнения и опоры",
  },
];

export const SAVED_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    year: 2020,
    make: "Honda",
    model: "Accord",
    engine: "1.5T 4-цил. 192 л.с.",
  },
  {
    id: "v2",
    year: 2018,
    make: "Toyota",
    model: "Camry",
    engine: "2.5L 4-цил. 203 л.с.",
  },
];

export function checkCompatibility(
  vehicle: Vehicle | null,
  compatibleVehicles: string[],
): "fits" | "verify" | "unknown" {
  if (!vehicle) return "unknown";
  for (const compat of compatibleVehicles) {
    const match = compat.match(/^(\d{4})-(\d{4})\s+(.+)$/);
    if (match) {
      const startYear = parseInt(match[1]);
      const endYear = parseInt(match[2]);
      const vehiclePart = match[3];
      if (
        vehicle.year >= startYear &&
        vehicle.year <= endYear &&
        `${vehicle.make} ${vehicle.model}`
          .toLowerCase()
          .includes(vehiclePart.toLowerCase())
      ) {
        return "fits";
      }
    }
  }
  return "verify";
}
