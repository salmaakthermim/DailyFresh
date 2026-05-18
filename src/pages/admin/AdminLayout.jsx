import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { to: '/admin',                  label: 'Dashboard',    icon: '📊', end: true },
  { to: '/admin/products',         label: 'Products',     icon: '📦' },
  { to: '/admin/categories',       label: 'Categories',   icon: '🗂️' },
  { to: '/admin/orders',           label: 'Orders',       icon: '🛒' },
  { to: '/admin/users',            label: 'Users',        icon: '👥' },
  { to: '/admin/coupons',          label: 'Coupons',      icon: '🎟️' },
  { to: '/admin/banners',          label: 'Banners',      icon: '🖼️' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-700">
        <p className="text-lg font-bold">DailyFresh 🥦</p>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive ? 'bg-gray-700 text-white font-medium border-r-2 border-green-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }>
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          {user?.photoURL
            ? <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover" alt="" />
            : <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold">
                {(user?.displayName || user?.email || 'A')[0].toUpperCase()}
              </div>
          }
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.displayName || 'Admin'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full text-left text-xs text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer py-1">
          ← Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 flex flex-col bg-gray-900">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}
            className="md:hidden bg-transparent border-none cursor-pointer text-gray-600 text-xl">☰</button>
          <h1 className="text-base font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="ml-auto">
            <NavLink to="/" className="text-xs text-gray-500 hover:text-gray-800 no-underline">← Back to Site</NavLink>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
