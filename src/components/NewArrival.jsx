import React from 'react';
import { Link } from 'react-router-dom';

export default function NewArrival() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-16 bg-white">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-5 h-10 bg-red-500 rounded-sm" />
          <span className="text-red-500 font-bold tracking-wide text-sm">Featured</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-black tracking-tight">
          New Arrival
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Left Column - PS5 (Large Featured) */}
        <div className="bg-black rounded-sm overflow-hidden relative group min-h-[400px] lg:min-h-[600px] flex items-end">
          <img 
            src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800" 
            alt="PlayStation 5" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
          <div className="relative z-10 p-8 sm:p-10 w-full md:w-3/4">
            <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-3">PlayStation 5</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link to="#" className="text-white font-medium border-b border-gray-400 pb-1 hover:border-white transition-colors duration-300">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Column (Stacked Grid) */}
        <div className="flex flex-col gap-6 md:gap-8">
          
          {/* Top - Women's Collections */}
          <div className="bg-[#0D0D0D] rounded-sm overflow-hidden relative group h-[280px] sm:h-[300px] flex items-end">
            <img 
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800" 
              alt="Women's Collections" 
              className="absolute inset-0 w-full h-full object-cover object-right opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative z-10 p-6 sm:p-8 w-full md:w-3/4">
              <h3 className="text-white text-2xl font-semibold mb-3">Women's Collections</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                Featured woman collections that give you another vibe.
              </p>
              <Link to="#" className="text-white font-medium border-b border-gray-400 pb-1 hover:border-white transition-colors duration-300">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Bottom Grid (2 Items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 flex-grow">
            
            {/* Speakers */}
            <div className="bg-[#0D0D0D] rounded-sm overflow-hidden relative group h-[250px] sm:h-[284px] flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=500" 
                alt="Speakers" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="relative z-10 p-6 sm:p-8 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Speakers</h3>
                <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                  Amazon wireless speakers
                </p>
                <Link to="#" className="text-white font-medium border-b border-gray-400 pb-1 hover:border-white transition-colors duration-300 text-sm">
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Perfume */}
            <div className="bg-[#0D0D0D] rounded-sm overflow-hidden relative group h-[250px] sm:h-[284px] flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1585386959984-a4155224a1b5?auto=format&fit=crop&q=80&w=500" 
                alt="Perfume" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="relative z-10 p-6 sm:p-8 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Perfume</h3>
                <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                  GUCCI INTENSE OUD EDP
                </p>
                <Link to="#" className="text-white font-medium border-b border-gray-400 pb-1 hover:border-white transition-colors duration-300 text-sm">
                  Shop Now
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
