import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${color} flex items-center gap-4`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">
        {value === null ? <span className="inline-block w-16 h-6 bg-gray-100 rounded animate-pulse" /> : value}
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get('/api/stats').then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users"    value={stats?.totalUsers}    icon="👥" color="border-blue-400" />
        <StatCard label="Total Products" value={stats?.totalProducts} icon="📦" color="border-green-400" />
        <StatCard label="Total Orders"   value={stats?.totalOrders}   icon="🛒" color="border-orange-400" />
        <StatCard label="Total Revenue"  value={stats ? `$${stats.totalRevenue.toFixed(2)}` : null} icon="💰" color="border-purple-400" />
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Product',    to: '/admin/products?action=add',   color: 'bg-green-500' },
            { label: 'Manage Orders',  to: '/admin/orders',                color: 'bg-orange-500' },
            { label: 'Manage Users',   to: '/admin/users',                 color: 'bg-blue-500' },
            { label: 'Add Coupon',     to: '/admin/coupons?action=add',    color: 'bg-purple-500' },
          ].map(({ label, to, color }) => (
            <a key={label} href={to}
              className={`${color} text-white text-sm px-4 py-2 rounded-lg no-underline hover:opacity-90 transition-opacity`}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
