import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Stars({ rating = 4 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    axios.get(`${API}/api/products?limit=8`)
      .then(({ data }) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-10 h-1 bg-red-500 rounded-full" />
          <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Our Signature</span>
          <span className="w-10 h-1 bg-red-500 rounded-full" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Featured Products
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Explore our hand-picked selection of premium items tailored for your lifestyle.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse shadow-sm border border-gray-100" />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            No featured products available at the moment.
          </div>
        ) : (
          products.slice(0, 8).map((p, index) => (
            <div 
              key={p._id} 
              className="group relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              style={{ animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`, opacity: 0 }}
            >
              {p.discount && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                  -{p.discount}%
                </div>
              )}

              {/* Wishlist Button */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (isInWishlist(p._id)) removeFromWishlist(p._id);
                  else addToWishlist(p);
                }}
                className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 border border-gray-100 cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <svg className={`w-5 h-5 transition-colors ${isInWishlist(p._id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`} fill={isInWishlist(p._id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center relative p-6">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain filter transition-transform duration-500 group-hover:scale-110 drop-shadow-md" />
                ) : (
                  <div className="text-6xl opacity-20">🛒</div>
                )}
                
                {/* Add to Cart Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100">
                    Quick Add
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow bg-white">
                <Link to={`/product/${p._id}`} className="no-underline text-gray-900">
                  <h3 className="text-lg font-semibold mb-1 truncate hover:text-red-500 transition-colors">{p.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <Stars rating={p.rating || 5} />
                  <span className="text-xs text-gray-400">({p.reviews || 12})</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${p.price}</span>
                    {p.original && <span className="text-sm font-medium text-gray-400 line-through">${p.original}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
