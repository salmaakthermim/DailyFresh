import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reverse or randomize visually for "trending" mock effect
    axios.get(`${API}/api/products?limit=12`)
      .then(({ data }) => setProducts((data.products || []).slice().reverse()))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-16 bg-[#1a0b16] text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 flex flex-col items-center mb-12">
        <span className="bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-red-500/20 mb-4 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span> Live Now
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">Trending This Week</h2>
      </div>

      <div className="relative z-10 flex overflow-x-auto gap-6 sm:gap-8 pb-8 scrollbar-hide snap-x">
        {loading ? (
          [1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex-shrink-0 w-72 sm:w-80 h-96 bg-white/5 rounded-3xl animate-pulse backdrop-blur-sm border border-white/10" />
          ))
        ) : products.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-500">
            No trending products right now.
          </div>
        ) : (
          products.map((p) => (
            <div 
              key={p._id} 
              className="flex-shrink-0 w-72 sm:w-80 snap-center group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors duration-300"
            >
              <div className="h-64 w-full bg-white/5 p-8 flex items-center justify-center relative">
                <span className="absolute top-4 left-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Top Seller
                </span>
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="text-6xl opacity-30">🔥</div>
                )}
              </div>
              
              <div className="p-6 relative">
                 <div className="absolute -top-6 right-6 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-red-600">
                  <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </div>
                 
                 <Link to={`/product/${p._id}`} className="no-underline text-white">
                  <h3 className="text-xl font-semibold mb-2 truncate group-hover:text-red-400 transition-colors">{p.name}</h3>
                 </Link>
                 <div className="flex items-center gap-3">
                   <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500 pl-1">
                     ${p.price}
                   </span>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
