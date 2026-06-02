import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Cart() {
  const { cart: cartItems, removeFromCart, updateQuantity, coupon, setCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = cartItems.reduce((a, b) => a + (b.price * b.qty), 0);
  let discountAmount = 0;
  if (coupon) {
    if (coupon.type === 'percent') discountAmount = (subtotal * coupon.discount) / 100;
    else if (coupon.type === 'flat') discountAmount = coupon.discount;
  }
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      setCouponMsg('Loading...');
      const { data } = await axios.post(`${API}/api/coupons/validate`, { code: couponCode });
      setCoupon({ code: couponCode, discount: data.discount, type: data.type });
      setCouponMsg('Coupon applied!');
    } catch (error) {
      setCouponMsg(error.response?.data?.message || 'Invalid coupon');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 max-w-7xl mx-auto min-h-[60vh]">
      {/* Breadcrumb */}
      <nav className="text-sm font-medium mb-12 flex items-center gap-2">
        <Link to="/" className="text-gray-400 hover:text-gray-600 no-underline">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">Cart</span>
      </nav>

      {/* Cart Container */}
      <div className="flex flex-col gap-8">
        
        {/* Headers */}
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-10 py-4 bg-white rounded shadow-[0px_1px_10px_rgba(0,0,0,0.05)] text-gray-900 font-semibold mb-2">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="text-right">Subtotal</span>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div key={item._id} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 px-10 py-5 bg-white rounded shadow-[0px_1px_10px_rgba(0,0,0,0.05)] relative group">
            {/* Delete button that looks like mockup (red circle cross) */}
            <button onClick={() => removeFromCart(item._id)} className="absolute left-6 top-1/2 -translate-y-1/2 sm:opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs leading-none pb-[2px] cursor-pointer border-none z-10 shadow">
              &times;
            </button>

            {/* Product */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-medium text-gray-800">{item.name}</span>
            </div>

            {/* Price */}
            <div className="text-gray-800 font-medium">
              ${item.price}
            </div>

            {/* Quantity Controls */}
            <div>
              <div className="inline-flex items-center border border-gray-300 rounded px-3 py-1.5 w-[70px] justify-between">
                <span className="text-sm font-medium">{String(item.qty).padStart(2, '0')}</span>
                <div className="flex flex-col -ml-1">
                  <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="text-gray-500 hover:text-black leading-[0.5] text-[10px] cursor-pointer bg-transparent border-none">▲</button>
                  <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="text-gray-500 hover:text-black leading-[0.5] text-[10px] cursor-pointer bg-transparent border-none">▼</button>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <div className="font-medium text-gray-800 sm:text-right">
              ${item.price * item.qty}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-2 gap-4">
          <Link to="/" className="px-10 py-3 border border-gray-400 text-gray-800 rounded font-medium hover:bg-gray-50 transition-colors inline-block text-center no-underline">
            Return To Shop
          </Link>
          <button className="px-10 py-3 border border-gray-400 text-gray-800 rounded font-medium hover:bg-gray-50 transition-colors cursor-pointer bg-white">
            Update Cart
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mt-10 gap-10">
          
          {/* Coupon */}
          <div className="flex flex-col w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
              <input 
                type="text" 
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="Coupon Code" 
                className="px-6 py-3 border border-gray-400 rounded w-full sm:w-[300px] outline-none focus:border-red-500"
              />
              <button onClick={handleApplyCoupon} className="px-10 py-3 bg-[#db4444] hover:bg-red-600 text-white font-medium rounded transition-colors whitespace-nowrap cursor-pointer border-none shadow-sm">
                Apply Coupon
              </button>
            </div>
            {couponMsg && (
              <p className={`text-sm ${couponMsg === 'Coupon applied!' ? 'text-green-600' : 'text-red-500'}`}>
                {couponMsg}
              </p>
            )}
            {coupon && (
              <p className="text-sm text-gray-500 cursor-pointer hover:text-red-500 hover:underline mt-1 inline-block w-max" onClick={() => { setCoupon(null); setCouponCode(''); setCouponMsg(''); }}>
                Remove current coupon
              </p>
            )}
          </div>

          {/* Cart Total */}
          <div className="w-full lg:w-[470px] border-2 border-gray-800 rounded px-6 py-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 text-left">Cart Total</h2>
            
            <div className="flex justify-between items-center py-4 border-b border-gray-300">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-900 font-medium whitespace-nowrap">${subtotal}</span>
            </div>
            
            {coupon && (
              <div className="flex justify-between items-center py-4 border-b border-gray-300">
                <span className="text-gray-700">Discount ({coupon.code}):</span>
                <span className="text-green-600 font-medium whitespace-nowrap">
                  -${Number(discountAmount).toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-4 border-b border-gray-300">
              <span className="text-gray-700">Shipping:</span>
              <span className="text-gray-900 font-medium">Free</span>
            </div>
            
            <div className="flex justify-between items-center py-4">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-900 font-medium">${total.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex justify-center">
              <Link to="/checkout" className="px-10 py-3.5 bg-[#db4444] hover:bg-red-600 text-white font-medium rounded transition-colors cursor-pointer border-none shadow-sm w-auto sm:w-[260px] text-center no-underline">
                Process to checkout
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
