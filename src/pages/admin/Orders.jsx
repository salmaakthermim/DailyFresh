import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-600',
};

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function Orders() {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [total, setTotal] = useState(0);

  const load = () => axiosSecure.get(`/api/orders?status=${filter}&limit=50`)
    .then(({ data }) => { setOrders(data.orders); setTotal(data.total); });

  useEffect(() => { load(); }, [filter]);

  const changeStatus = async (id, status) => {
    await axiosSecure.patch(`/api/orders/${id}/status`, { status });
    load();
  };

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return;
    await axiosSecure.delete(`/api/orders/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Orders ({total})</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white">
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Order ID', 'Customer', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(o => (
                <tr key={o._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{o._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3 text-gray-700">{o.userEmail}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">${o.totalAmount?.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <select value={o.status} onChange={e => changeStatus(o._id, e.target.value)}
                        className="text-xs border border-gray-200 rounded px-2 py-1 outline-none bg-white cursor-pointer">
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button onClick={() => deleteOrder(o._id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded border-none cursor-pointer">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
