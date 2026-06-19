import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, Home, LogOut } from 'lucide-react';

export default function SellerLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const links = [
    { to: "/seller", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
    { to: "/seller/products", label: "My Products", icon: <Package size={20} /> },
    { to: "/", label: "Back to Home", icon: <Home size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          {user?.photoURL ? (
            <img src={user.photoURL} className="w-10 h-10 rounded-full" alt="" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {user?.displayName?.[0] || 'S'}
            </div>
          )}
          <div>
            <h3 className="font-bold text-gray-800 text-sm">{user?.displayName || 'Seller'}</h3>
            <span className="text-xs text-blue-500 uppercase tracking-widest font-semibold text-[10px]">Seller Central</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {l.icon}
              <span className="truncate">{l.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-none cursor-pointer">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
