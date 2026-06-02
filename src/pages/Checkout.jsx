import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Checkout() {
  const { cart: cartItems, clearCart, coupon, setCoupon } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate placing order
    clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 max-w-7xl mx-auto min-h-[60vh]">
      {/* Breadcrumb */}
      <nav className="text-sm font-medium mb-12 flex items-center gap-2 text-gray-400 flex-wrap">
        <Link to="/" className="hover:text-gray-600 no-underline text-gray-400">Account</Link>
        <span>/</span>
        <Link to="/" className="hover:text-gray-600 no-underline text-gray-400">My Account</Link>
        <span>/</span>
        <span>Product</span>
        <span>/</span>
        <Link to="/cart" className="hover:text-gray-600 no-underline text-gray-400">View Cart</Link>
        <span>/</span>
        <span className="text-gray-900">CheckOut</span>
      </nav>

      <h1 className="text-3xl font-semibold mb-10 text-gray-900">Billing Details</h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left - Billing Form */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">First Name<span className="text-red-500">*</span></label>
            <input type="text" required className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Company Name</label>
            <input type="text" className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Street Address<span className="text-red-500">*</span></label>
            <input type="text" required className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Apartment, floor, etc. (optional)</label>
            <input type="text" className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Town/City<span className="text-red-500">*</span></label>
            <input type="text" required className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Phone Number<span className="text-red-500">*</span></label>
            <input type="tel" required className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address<span className="text-red-500">*</span></label>
            <input type="email" required className="w-full bg-[#f5f5f5] rounded px-4 py-3 border-none outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input type="checkbox" id="saveInfo" className="w-5 h-5 accent-[#db4444] cursor-pointer" defaultChecked />
            <label htmlFor="saveInfo" className="text-gray-900 cursor-pointer text-sm">Save this information for faster check-out next time</label>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="lg:w-[450px] flex flex-col gap-6 pt-4">
          
          {/* Items */}
          <div className="flex flex-col gap-6 mb-4">
            {cartItems.length === 0 ? (
              <div className="text-gray-400 italic text-sm">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-900">${item.price * item.qty}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <span className="text-gray-800 text-sm">Subtotal:</span>
            <span className="text-gray-900 text-sm whitespace-nowrap">${subtotal}</span>
          </div>
          
          {coupon && (
            <div className="flex justify-between items-center py-3 border-b border-gray-300">
              <span className="text-gray-800 text-sm">Discount ({coupon.code}):</span>
              <span className="text-green-600 text-sm whitespace-nowrap">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <span className="text-gray-800 text-sm">Shipping:</span>
            <span className="text-gray-900 text-sm">Free</span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-800 text-sm">Total:</span>
            <span className="text-gray-900 text-sm whitespace-nowrap">${total.toFixed(2)}</span>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" value="bank" className="w-4 h-4 accent-black cursor-pointer" />
                <span className="text-sm text-gray-900">Bank</span>
              </label>
              <div className="flex gap-1.5 items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain" />
              </div>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" value="cod" defaultChecked className="w-4 h-4 accent-black cursor-pointer" />
              <span className="text-sm text-gray-900">Cash on delivery</span>
            </label>
          </div>

          {/* Coupon */}
          <div className="flex flex-col mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="Coupon Code" 
                className="px-6 py-3 border border-gray-800 rounded flex-1 outline-none focus:border-red-500 text-sm"
              />
              <button type="button" onClick={handleApplyCoupon} className="px-8 py-3 bg-[#db4444] hover:bg-red-600 text-white font-medium rounded transition-colors whitespace-nowrap cursor-pointer border-none shadow-sm text-sm">
                Apply Coupon
              </button>
            </div>
            {couponMsg && (
              <p className={`text-sm mt-2 ${couponMsg === 'Coupon applied!' ? 'text-green-600' : 'text-red-500'}`}>
                {couponMsg}
              </p>
            )}
            {coupon && (
              <p className="text-sm text-gray-500 cursor-pointer hover:text-red-500 hover:underline mt-1 inline-block w-max" onClick={() => { setCoupon(null); setCouponCode(''); setCouponMsg(''); }}>
                Remove current coupon
              </p>
            )}
          </div>

          <button type="submit" disabled={cartItems.length === 0} className="w-[200px] mt-4 py-3 bg-[#db4444] hover:bg-red-600 text-white font-medium rounded transition-colors cursor-pointer border-none shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            Place Order
          </button>
        </div>

      </form>
    </div>
  );
}
