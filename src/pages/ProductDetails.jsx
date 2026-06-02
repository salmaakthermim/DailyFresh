import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Stars({ rating = 4 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct]   = useState(null);
  const [related, setRelated]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [mainImg, setMainImg]   = useState('');
  const [qty, setQty]           = useState(1);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setMainImg(data.image || '');
        // load related by same category
        return axios.get(`${API}/api/products?category=${encodeURIComponent(data.category)}&limit=5`);
      })
      .then(({ data }) => setRelated(data.products.filter(p => p._id !== id)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      <div className="text-center">
        <p className="text-5xl mb-4">📦</p>
        <p>Product not found.</p>
        <Link to="/" className="text-red-500 text-sm mt-2 inline-block">← Back to Home</Link>
      </div>
    </div>
  );

  // Build image gallery — use product.images array if exists, else duplicate single image to show thumbnails
  const images = product.images?.length > 1 
    ? product.images 
    : product.image 
      ? [product.image, product.image, product.image, product.image] 
      : [];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-gray-600 no-underline text-gray-400">Home</Link>
        <span>/</span>
        <span className="text-gray-500">{product.category}</span>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">

        {/* Left — Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-6 lg:w-[60%]">
          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="flex sm:flex-col gap-4 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {images.map((img, i) => (
                <button key={i} onClick={() => setMainImg(img)}
                  className={`w-20 h-20 sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[110px] bg-[#f5f5f5] rounded flex-shrink-0 flex items-center justify-center border-none cursor-pointer group transition-all duration-300 ${mainImg === img ? 'opacity-100 shadow-sm border border-gray-300' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}>
                  <img src={img} alt="" className="w-full h-full p-2 object-contain group-hover:scale-110 transition-transform duration-500 ease-out" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="flex-1 bg-[#f5f5f5] rounded order-1 sm:order-2 flex items-center justify-center h-[350px] sm:h-[400px] lg:h-[490px] group cursor-zoom-in overflow-hidden relative">
            {mainImg
              ? <img key={mainImg} src={mainImg} alt={product.name} className="w-full h-full p-8 object-contain transition-transform duration-700 ease-out group-hover:scale-125" style={{ animation: 'fadeIn 0.5s ease-out forwards' }} />
              : <div className="text-7xl">📦</div>
            }
          </div>
        </div>

        {/* Right — Info */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{product.name}</h1>

          {/* Rating + Stock */}
          <div className="flex items-center gap-3 flex-wrap">
            <Stars rating={product.rating || 4} />
            <span className="text-sm text-gray-400">({product.reviews || 0} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-gray-900">${product.price}</span>
            {product.original && (
              <span className="text-lg text-gray-400 line-through">${product.original}</span>
            )}
            {product.discount && (
              <span className="bg-red-100 text-red-500 text-sm font-medium px-2 py-0.5 rounded">-{product.discount}%</span>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed font-[400] mt-2 mb-2">{product.description}</p>
          )}

          {/* Colours */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-900 text-[18px] mr-2">Colours:</span>
            <div className="flex items-center gap-2">
              <button className="w-4 h-4 rounded-full bg-[#A2B6D4] ring-2 ring-offset-2 ring-gray-900 border-none cursor-pointer"></button>
              <button className="w-4 h-4 rounded-full bg-[#E47B78] hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 border-none cursor-pointer"></button>
            </div>
          </div>

          {/* Size */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-gray-900 text-[18px] mr-6">Size:</span>
            <div className="flex items-center gap-3">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button key={size} className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded cursor-pointer transition-colors ${size === 'M' ? 'bg-red-500 text-white border border-red-500' : 'bg-white text-gray-800 border border-gray-300 hover:border-gray-400'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="flex items-center gap-4 mt-4">
            {/* Qty */}
            <div className="flex h-10 items-center border border-gray-300 rounded overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-full text-xl text-gray-600 hover:bg-gray-100 bg-transparent border-none cursor-pointer transition-colors flex items-center justify-center pb-1">
                −
              </button>
              <span className="w-14 h-full flex items-center justify-center text-[16px] font-semibold border-x border-gray-300">
                {qty}
              </span>
              <button onClick={() => setQty(q => Math.min(product.stock || 99, q + 1))}
                className="w-10 h-full text-xl text-white bg-[#db4444] hover:bg-red-600 border-none cursor-pointer transition-colors flex items-center justify-center pb-1">
                +
              </button>
            </div>

            {/* Buy Now */}
            <button onClick={() => { addToCart(product, qty); navigate('/cart'); }} className="h-10 bg-[#db4444] hover:bg-red-600 text-white px-10 rounded font-medium border-none cursor-pointer transition-colors shadow-sm text-sm flex items-center justify-center">
              Buy Now
            </button>

            {/* Wishlist */}
            <button onClick={() => setWishlist(w => !w)}
              className={`w-10 h-10 rounded border flex items-center justify-center cursor-pointer transition-colors ${wishlist ? 'bg-[#db4444] border-[#db4444] text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-[#db4444]'}`}>
              <svg className="w-5 h-5" fill={wishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mt-2">
            <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-200">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="text-sm font-medium text-gray-800">Free Delivery</p>
                <p className="text-xs text-gray-400">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="text-sm font-medium text-gray-800">Return Delivery</p>
                <p className="text-xs text-gray-400">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-4 h-8 bg-red-500 rounded-sm inline-block" />
            <span className="text-red-500 text-sm font-semibold">Related Item</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {related.slice(0, 5).map(p => (
              <Link key={p._id} to={`/product/${p._id}`}
                className="no-underline group bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  {p.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded z-10">-{p.discount}%</span>
                  )}
                  <button onClick={e => e.preventDefault()}
                    className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border-none cursor-pointer z-10">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <div className="h-40 overflow-hidden">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100">📦</div>
                    }
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 truncate mb-1">{p.name}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-500 font-semibold text-sm">${p.price}</span>
                    {p.original && <span className="text-gray-400 line-through text-xs">${p.original}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Stars rating={p.rating || 4} />
                    <span className="text-xs text-gray-400">({p.reviews || 0})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
