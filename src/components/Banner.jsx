import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Each category has its own slide with matching image
const categories = [
  {
    key: 'womansFashion',
    bg: 'from-[#2d1b4e] to-[#1a0a2e]',
    accent: 'text-pink-400',
    dotColor: '#f472b6',

    titleLine1: 'New Season',
    titleLine2: "Women's Collection",
    subtitle: 'Trendy styles for every occasion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85',
  },
  {
    key: 'mensFashion',
    bg: 'from-[#1a2a1a] to-[#0d1f0d]',
    accent: 'text-lime-400',
    dotColor: '#a3e635',
    titleLine1: 'Sharp & Stylish',
    titleLine2: "Men's Fashion",
    subtitle: 'Premium looks at unbeatable prices',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&q=85',
  },
  {
    key: 'electronics',
    bg: 'from-[#0f1a2e] to-[#0a1020]',
    accent: 'text-cyan-400',
    dotColor: '#22d3ee',
    titleLine1: 'Up to 30% off',
    titleLine2: 'Latest Gadgets',
    subtitle: 'Top brands, best deals',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=700&q=85',
  },
  {
    key: 'homeLifestyle',
    bg: 'from-[#2a1f0e] to-[#1a1208]',
    accent: 'text-amber-400',
    dotColor: '#fbbf24',
    titleLine1: 'Transform Your',
    titleLine2: 'Living Space',
    subtitle: 'Beautiful home essentials',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=85',
  },
  {
    key: 'medicine',
    bg: 'from-[#0e2a1f] to-[#081a12]',
    accent: 'text-emerald-400',
    dotColor: '#34d399',
    titleLine1: 'Your Health',
    titleLine2: 'Our Priority',
    subtitle: 'Trusted medicines & supplements',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=85',
  },
  {
    key: 'sportsOutdoor',
    bg: 'from-[#1a0e2a] to-[#100818]',
    accent: 'text-violet-400',
    dotColor: '#a78bfa',
    titleLine1: 'Gear Up &',
    titleLine2: 'Play Hard',
    subtitle: 'Sports & outdoor equipment',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&q=85',
  },
  {
    key: 'babysToys',
    bg: 'from-[#2a1a0e] to-[#1a0e06]',
    accent: 'text-orange-300',
    dotColor: '#fdba74',
    titleLine1: 'Fun & Safe',
    titleLine2: 'Toys for Kids',
    subtitle: 'Quality toys for happy children',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',
  },
  {
    key: 'groceriesPets',
    bg: 'from-[#1a2e1a] to-[#0d1f0d]',
    accent: 'text-green-400',
    dotColor: '#4ade80',
    titleLine1: 'Fresh Groceries',
    titleLine2: 'Daily Delivered',
    subtitle: 'Farm fresh, straight to your door',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=85',
  },
  {
    key: 'healthBeauty',
    bg: 'from-[#2a0e1a] to-[#1a0810]',
    accent: 'text-rose-400',
    dotColor: '#fb7185',
    titleLine1: 'Glow Up with',
    titleLine2: 'Health & Beauty',
    subtitle: 'Premium skincare & wellness',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=85',
  },
];

export default function Banner() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [catOpen, setCatOpen] = useState(false);

  const goTo = (index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % categories.length), 4000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = categories[current];

  return (
    <div className="border-b border-gray-200">

      {/* Mobile: Category Accordion */}
      <div className="lg:hidden border-b border-gray-200">
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-white border-none cursor-pointer"
        >
          <span>📂 {t('categories') || 'Categories'}</span>
          <span className={`transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {catOpen && (
          <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-gray-100">
            {categories.map((cat, i) => (
              <a key={cat.key} href="#"
                onClick={() => { goTo(i); setCatOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm no-underline transition-colors border-b border-gray-100 ${
                  i === current ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                <span>{cat.tag}</span>
                <span>{t(cat.key)}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Sidebar + Slider */}
      <div className="flex" style={{ minHeight: '380px' }}>

        {/* Desktop Category Sidebar */}
        <aside className="hidden lg:block w-52 min-w-[208px] border-r border-gray-200 bg-white py-4">
          <ul className="list-none m-0 p-0">
            {categories.map((cat, i) => (
              <li key={cat.key}>
                <a
                  href="#"
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 text-sm no-underline transition-colors border-l-2 ${
                    i === current
                      ? 'border-gray-900 bg-gray-50 text-gray-900 font-medium'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{cat.tag}</span>
                  <span>{t(cat.key)}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Slider */}
        <div
          className={`relative flex-1 bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]`}
          style={{ transition: 'background 0.7s ease' }}
        >
          {/* Slide Content */}
          <div
            key={animKey}
            className="flex items-center justify-between w-full h-full px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12"
            style={{ animation: 'slideIn 0.5s ease forwards' }}
          >
            {/* Left: Text */}
            <div className="text-white flex-1 max-w-xs lg:max-w-sm z-10">
              <span className={`text-xs font-semibold uppercase tracking-widest mb-3 block ${slide.accent}`}>
                {slide.tag} {t(slide.key)}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                {slide.titleLine1}<br />{slide.titleLine2}
              </h2>
              <p className="text-white/60 text-xs sm:text-sm mb-7">{slide.subtitle}</p>
              <a
                href="#"
                className="inline-block px-6 py-2.5 border-2 border-white text-white text-sm rounded hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                {t('shopNow')} →
              </a>
            </div>

            {/* Right: Product Image */}
            <div className="hidden sm:flex flex-1 items-center justify-end h-full">
              <img
                key={slide.key}
                src={slide.image}
                alt={t(slide.key)}
                className="h-52 sm:h-60 lg:h-72 w-auto object-cover rounded-xl shadow-2xl"
                style={{ animation: 'imgIn 0.6s ease forwards' }}
              />
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full border-none cursor-pointer transition-all duration-300 p-0"
                style={{
                  width: i === current ? '20px' : '8px',
                  height: '8px',
                  background: i === current ? cat.dotColor : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => goTo((current - 1 + categories.length) % categories.length)}
            aria-label="Previous"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 border-none text-white text-2xl sm:text-3xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={() => goTo((current + 1) % categories.length)}
            aria-label="Next"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 border-none text-white text-2xl sm:text-3xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes imgIn {
          from { opacity: 0; transform: translateX(50px) scale(0.93); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
