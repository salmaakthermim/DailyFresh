import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    tag: '🥦 Fresh Arrivals',
    title: ['Up to 30% off', 'Organic Veggies'],
    subtitle: 'Farm fresh, delivered daily to your door',
    bg: 'from-[#1a1a2e] to-[#16213e]',
    accent: 'text-green-400',
    dotColor: '#4ade80',
  },
  {
    id: 2,
    tag: '🍎 Seasonal Fruits',
    title: ['Buy 2 Get 1', 'Free on Fruits'],
    subtitle: 'Limited time offer — grab it before it ends',
    bg: 'from-[#0f3460] to-[#1a1a4e]',
    accent: 'text-orange-400',
    dotColor: '#f97316',
  },
  {
    id: 3,
    tag: '🥛 Dairy & More',
    title: ['Fresh Dairy', 'Every Morning'],
    subtitle: 'Straight from local farms, no preservatives',
    bg: 'from-[#16213e] to-[#0f3460]',
    accent: 'text-blue-400',
    dotColor: '#60a5fa',
  },
];

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  "Baby's & Toys",
  'Groceries & Pets',
  'Health & Beauty',
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = (index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="flex border-b border-gray-200" style={{ minHeight: '380px' }}>
      {/* Category Sidebar */}
      <aside className="w-52 min-w-[208px] border-r border-gray-200 bg-white py-4">
        <ul className="list-none m-0 p-0">
          {categories.map((cat) => (
            <li key={cat}>
              <a
                href="#"
                className="block px-6 py-2.5 text-sm text-gray-600 no-underline hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Slider */}
      <div
        className={`relative flex-1 bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden transition-all duration-700`}
      >
        {/* Slide Content */}
        <div
          key={animKey}
          className="px-16 py-12 text-white"
          style={{ animation: 'slideIn 0.5s ease forwards' }}
        >
          <span className={`text-xs font-semibold uppercase tracking-widest mb-3 block ${slide.accent}`}>
            {slide.tag}
          </span>
          <h2 className="text-5xl font-bold text-white leading-tight mb-3">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h2>
          <p className="text-white/60 text-sm mb-8">{slide.subtitle}</p>
          <a
            href="#"
            className="inline-block px-7 py-2.5 border-2 border-white text-white text-sm rounded hover:bg-white hover:text-gray-900 transition-all duration-200"
          >
            Shop Now →
          </a>
        </div>

        {/* Decorative circle */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full opacity-10 bg-white" />
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full opacity-10 bg-white" />

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
              style={{
                background: i === current ? s.dotColor : 'rgba(255,255,255,0.35)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 border-none text-white text-3xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer leading-none"
        >
          ‹
        </button>
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 border-none text-white text-3xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer leading-none"
        >
          ›
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
