import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Users, Package, ShoppingCart, CircleDollarSign } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7'];

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
        <StatCard label="Total Users"    value={stats?.totalUsers}    icon={<Users className="text-blue-500" size={32} />} color="border-blue-400" />
        <StatCard label="Total Products" value={stats?.totalProducts} icon={<Package className="text-green-500" size={32} />} color="border-green-400" />
        <StatCard label="Total Orders"   value={stats?.totalOrders}   icon={<ShoppingCart className="text-orange-500" size={32} />} color="border-orange-400" />
        <StatCard label="Total Revenue"  value={stats ? `$${stats.totalRevenue.toFixed(2)}` : null} icon={<CircleDollarSign className="text-purple-500" size={32} />} color="border-purple-400" />
      </div>

      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue (Last 7 Days)</h3>
            <div className="h-72">
              {stats.revenueData?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <RechartsTooltip cursor={{ stroke: '#D1D5DB', strokeWidth: 1, strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No revenue data for the last 7 days.</div>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Orders by Status</h3>
            <div className="h-72">
              {stats.ordersByStatus?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats.ordersByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {stats.ordersByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No order data.</div>
              )}
            </div>
            {stats.ordersByStatus?.length > 0 && (
               <div className="flex flex-wrap justify-center gap-3 mt-2">
                 {stats.ordersByStatus.map((entry, index) => (
                   <div key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                     <span className="capitalize">{entry.name}</span>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders?.length > 0 ? (
                  stats.recentOrders.map(order => (
                    <tr key={order._id} className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{order._id.slice(-6).toUpperCase()}</td>
                      <td className="px-4 py-3">{order.userEmail}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-800">${order.totalAmount?.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500 font-medium">No Recent Orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Add Product',    to: '/admin/products?action=add',   color: 'bg-green-500' },
              { label: 'Manage Orders',  to: '/admin/orders',                color: 'bg-orange-500' },
              { label: 'Manage Users',   to: '/admin/users',                 color: 'bg-blue-500' },
              { label: 'Add Coupon',     to: '/admin/coupons?action=add',    color: 'bg-purple-500' },
            ].map(({ label, to, color }) => (
              <a key={label} href={to}
                className={`${color} text-white font-medium text-sm px-4 py-3 rounded-lg no-underline hover:opacity-90 transition-opacity text-center w-full shadow-sm`}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
