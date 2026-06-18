import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminRoute from './routes/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Coupons from './pages/admin/Coupons';
import Banners from './pages/admin/Banners';
import SellerRoute from './routes/SellerRoute';
import SellerLayout from './pages/seller/SellerLayout';
import SellerDashboard from './pages/seller/Dashboard';
import SellerProducts from './pages/seller/MyProducts';
import UserRoute from './routes/UserRoute';
import UserLayout from './pages/user/UserLayout';
import UserDashboard from './pages/user/Dashboard';
import UserOrders from './pages/user/MyOrders';
import UserWishlist from './pages/user/Wishlist';
import './App.css';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/signup" element={<MainLayout><SignUp /></MainLayout>} />
          <Route path="/login"  element={<MainLayout><Login /></MainLayout>} />
          <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute><AdminLayout /></AdminRoute>
          }>
            <Route index          element={<Dashboard />} />
            <Route path="products"   element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders"     element={<Orders />} />
            <Route path="users"      element={<Users />} />
            <Route path="coupons"    element={<Coupons />} />
            <Route path="banners"    element={<Banners />} />
          </Route>

          {/* Seller routes */}
          <Route path="/seller" element={
            <SellerRoute><SellerLayout /></SellerRoute>
          }>
            <Route index element={<SellerDashboard />} />
            <Route path="products" element={<SellerProducts />} />
          </Route>

          {/* User routes */}
          <Route path="/user" element={
            <UserRoute><UserLayout /></UserRoute>
          }>
            <Route index element={<UserDashboard />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="wishlist" element={<UserWishlist />} />
          </Route>
        </Routes>
        </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
