import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AdminRoute from './routes/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Coupons from './pages/admin/Coupons';
import Banners from './pages/admin/Banners';
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
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout><Banner /></MainLayout>} />
          <Route path="/signup" element={<MainLayout><SignUp /></MainLayout>} />
          <Route path="/login"  element={<MainLayout><Login /></MainLayout>} />

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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
