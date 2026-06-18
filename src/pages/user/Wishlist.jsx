import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your wishlist...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[300px]">
        {wishlist.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <span className="text-4xl mb-4">❤️</span>
            <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
            <Link to="/" className="text-green-600 font-bold hover:text-green-700 transition-colors">Browse Products</Link>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <div key={item.productId} className="flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow relative bg-white">
                <button 
                  onClick={() => removeFromWishlist(item.productId)}
                  className="absolute top-2 right-2 bg-white text-gray-400 hover:text-red-500 rounded-full w-8 h-8 flex flex-col items-center justify-center shadow-sm z-10 transition-colors"
                  title="Remove from Wishlist"
                >
                  ✕
                </button>
                <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="max-h-full object-contain mix-blend-multiply" />
                  ) : (
                    <div className="text-gray-300">No Image</div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${item.productId}`} className="font-bold text-gray-900 mb-1 hover:text-green-600 transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="text-green-600 font-black mb-4 mt-auto">
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => {
                        addToCart({ _id: item.productId, ...item });
                        removeFromWishlist(item.productId);
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
