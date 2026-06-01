import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TARGET = Date.now() + 24 * 60 * 60 * 1000;

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, TARGET - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function Stars({ rating = 4 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-2xl font-bold text-gray-900 leading-none">{String(value).padStart(2, '0')}</p>
    </div>
  );
}

export default function FlashSales() {
  const time = useCountdown();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [hovered, setHovered]   = useState(null);
  const [scrollIdx, setScrollIdx] = useState(0);
  const visible = 4;

  useEffect(() => {
    axios.get(`${API}/api/products?limit=20`)
      .then(({ data }) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const prev = () => setScrollIdx(i => Math.max(0, i - 1));
  const next = () => setScrollIdx(i => Math.min(Math.max(0, products.length - visible), i + 1));

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10 border-b border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-8 bg-red-500 rounded-sm inline-block" />
            <span className="text-red-500 text-sm font-semibold">Today's</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Flash Sales</h2>
        </div>

        {/* Countdown */}
        <div className="flex items-end gap-2 pb-1">
          <TimeBox value={time.days}    label="Days" />
          <span className="text-2xl font-bold text-red-500 leading-none mt-4">:</span>
          <TimeBox value={time.hours}   label="Hours" />
          <span className="text-2xl font-bold text-red-500 leading-none mt-4">:</span>
          <TimeBox value={time.minutes} label="Minutes" />
          <span className="text-2xl font-bold text-red-500 leading-none mt-4">:</span>
          <TimeBox value={time.seconds} label="Seconds" />
        </div>

        {/* Arrows */}
        <div className="flex gap-2 sm:ml-auto">
          <button onClick={prev} disabled={scrollIdx === 0}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center border-none cursor-pointer transition-colors">←</button>
          <button onClick={next} disabled={scrollIdx >= products.length - visible}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center border-none cursor-pointer transition-colors">→</button>
        </div>
      </div>

      {/* Cards */}
      <div className="overflow-hidden">
        {loading ? (
          <div className="flex gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-shrink-0 w-[calc(25%-12px)] min-w-[200px] bg-gray-100 rounded-lg h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📦</p>
            <p>No products yet. Add products from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="flex gap-4 transition-transform duration-300"
            style={{ transform: `translateX(calc(-${scrollIdx * (100 / visible)}% - ${scrollIdx * 4}px))` }}>
            {products.map((p) => (
              <div key={p._id}
                className="flex-shrink-0 w-[calc(25%-12px)] min-w-[200px] bg-gray-50 rounded-lg overflow-hidden group relative"
                onMouseEnter={() => setHovered(p._id)}
                onMouseLeave={() => setHovered(null)}>

                {p.discount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded z-10">
                    -{p.discount}%
                  </span>
                )}

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 border-none cursor-pointer">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>

                {/* Image */}
                <div className="h-52 overflow-hidden bg-gray-50">
                  {p.image
                    ? <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    : <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
                  }
                </div>

                {/* Add to Cart on hover */}
                <div className={`transition-all duration-200 overflow-hidden ${hovered === p._id ? 'max-h-12' : 'max-h-0'}`}>
                  <button className="w-full bg-gray-900 hover:bg-black text-white text-sm py-2.5 border-none cursor-pointer">
                    Add To Cart
                  </button>
                </div>

                {/* Info */}
                <Link to={`/product/${p._id}`} className="block p-3 no-underline">
                  <p className="text-sm font-medium text-gray-800 mb-1 truncate">{p.name}</p>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-red-500 font-semibold text-sm">${p.price}</span>
                    {p.original && <span className="text-gray-400 line-through text-xs">${p.original}</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Stars rating={p.rating || 4} />
                    <span className="text-xs text-gray-400">({p.reviews || 0})</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <button className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded text-sm font-medium border-none cursor-pointer transition-colors">
          View All Products
        </button>
      </div>
    </section>
  );
}
