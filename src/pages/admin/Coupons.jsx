import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const today = () => new Date().toISOString().split('T')[0];

export default function Coupons() {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: '', discount: '', type: 'percent', expiresAt: today() });
  const [showForm, setShowForm] = useState(false);

  const load = () => axiosSecure.get('/api/coupons').then(({ data }) => setCoupons(data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosSecure.post('/api/coupons', form);
    setShowForm(false);
    setForm({ code: '', discount: '', type: 'percent', expiresAt: today() });
    load();
  };

  const toggle = async (id) => { await axiosSecure.patch(`/api/coupons/${id}/toggle`); load(); };
  const del    = async (id) => { if (!confirm('Delete coupon?')) return; await axiosSecure.delete(`/api/coupons/${id}`); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Coupons</h2>
        <button onClick={() => setShowForm(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer border-none">
          + Add Coupon
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">New Coupon</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Code</label>
                <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  required placeholder="e.g. SAVE20"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 uppercase" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Discount</label>
                  <input type="number" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })}
                    required min="1"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white">
                    <option value="percent">Percent (%)</option>
                    <option value="flat">Flat ($)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Expires At</label>
                <input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })}
                  required min={today()}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm cursor-pointer border-none">Create</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm cursor-pointer border-none">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Code', 'Discount', 'Type', 'Expires', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map(c => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold text-gray-800">{c.code}</td>
                  <td className="px-4 py-3 text-gray-700">{c.discount}{c.type === 'percent' ? '%' : '$'}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{c.type}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(c.expiresAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => toggle(c._id)}
                        className={`text-xs px-3 py-1 rounded-lg border-none cursor-pointer ${c.active ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' : 'bg-green-50 hover:bg-green-100 text-green-600'}`}>
                        {c.active ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => del(c._id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-lg border-none cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">No coupons yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
