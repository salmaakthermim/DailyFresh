import { createContext, useContext, useState, useEffect } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const loadWishlist = () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axiosSecure.get('/api/wishlist')
      .then(res => setWishlist(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadWishlist();
  }, [user, axiosSecure]);

  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please log in to add items to wishlist.");
      return;
    }
    const prev = [...wishlist];
    setWishlist([{ productId: product._id, name: product.name, price: product.price, image: product.image }, ...wishlist]);
    try {
      await axiosSecure.post('/api/wishlist', {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      loadWishlist();
    } catch (e) {
      console.error(e);
      setWishlist(prev);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    const prev = [...wishlist];
    setWishlist(wishlist.filter(item => item.productId !== productId));
    try {
      await axiosSecure.delete(`/api/wishlist/${productId}`);
    } catch (e) {
      console.error(e);
      setWishlist(prev);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
