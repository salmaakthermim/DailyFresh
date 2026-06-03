import { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ICON_MAP = {
  'Phones': <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  'Computers': <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  'SmartWatch': <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="5" width="12" height="14" rx="3" ry="3"></rect><path d="M8 2v3"></path><path d="M16 2v3"></path><path d="M8 19v3"></path><path d="M16 19v3"></path><line x1="12" y1="10" x2="12" y2="14" /><line x1="12" y1="10" x2="14" y2="10" /></svg>,
  'Camera': <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  'HeadPhones': <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>,
  'Gaming': <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><path d="M6 12h4"></path><path d="M8 10v4"></path><path d="M15 13h.01"></path><path d="M18 11h.01"></path></svg>
};

const DEFAULT_ICON = (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
);

export default function CategoriesBrowser() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('Camera'); // For mockup aesthetics

  useEffect(() => {
    // Backend-e call diye dynamic data fetching
    axios.get(`${API}/api/categories`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        } else {
          // Database faka thakle mock data dekhabe, jate design ta dekha jay
          setCategories([
            { name: 'Phones', _id: 'mock1' },
            { name: 'Computers', _id: 'mock2' },
            { name: 'SmartWatch', _id: 'mock3' },
            { name: 'Camera', _id: 'mock4' },
            { name: 'HeadPhones', _id: 'mock5' },
            { name: 'Gaming', _id: 'mock6' }
          ]);
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setCategories([
          { name: 'Phones', _id: 'mock1' },
          { name: 'Computers', _id: 'mock2' },
          { name: 'SmartWatch', _id: 'mock3' },
          { name: 'Camera', _id: 'mock4' },
          { name: 'HeadPhones', _id: 'mock5' },
          { name: 'Gaming', _id: 'mock6' }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10 border-b border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-8 bg-red-500 rounded-sm inline-block" />
            <span className="text-red-500 text-sm font-semibold">Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide">Browse By Category</h2>
        </div>
        
        {/* Arrows */}
        <div className="flex gap-2 sm:ml-auto mb-1">
          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center border-none cursor-pointer transition-colors text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center border-none cursor-pointer transition-colors text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {loading ? (
          <div className="text-center w-full text-gray-400 py-4">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center w-full text-gray-400 py-4">No categories found in database.</div>
        ) : categories.map((cat, i) => {
          const isAct = activeCat === cat.name;
          return (
            <div 
              key={cat._id || i}
              onClick={() => setActiveCat(cat.name)}
              className={`flex-shrink-0 w-36 h-36 flex flex-col items-center justify-center gap-3 rounded border transition-colors cursor-pointer ${
                isAct 
                  ? 'bg-[#db4444] border-[#db4444] text-white shadow-sm' 
                  : 'bg-transparent border-gray-300 text-gray-800 hover:bg-gray-50'
              }`}
            >
              {/* If icon doesn't exist for the name, show default */}
              {ICON_MAP[cat.name] || DEFAULT_ICON}
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  );
}
