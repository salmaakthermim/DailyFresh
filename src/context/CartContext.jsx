import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('cart_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('cart_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('cart_coupon');
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, qty: Math.min(item.qty + quantity, product.stock || 99) } 
            : item
        );
      }
      return [...prev, { 
        _id: product._id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        stock: product.stock,
        qty: quantity 
      }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        return { ...item, qty: Math.max(1, Math.min(newQty, item.stock || 99)) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, coupon, setCoupon }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
