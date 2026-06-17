import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const empty = { name: '', price: '', category: '', image: '', description: '', stock: '', original: '' };

export default function MyProducts() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch only their own products
  const load = () => axiosSecure.get('/api/products/my').then(({ data }) => setProducts(data));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, price: p.price, stock: p.stock }); setEditId(p._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) await axiosSecure.put(`/api/products/${editId}`, form);
      else        await axiosSecure.post('/api/products', form);
      setShowForm(false); load();
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product from your shop?')) return;
    await axiosSecure.delete(`/api/products/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-gray-800">My Products</h2>
        <button onClick={openAdd} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer border-none shadow-sm transition-colors">
          + Add Product
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'name', label: 'Name', type: 'text' },
                  { key: 'category', label: 'Category', type: 'text' },
                  { key: 'price', label: 'Current Price ($)', type: 'number' },
                  { key: 'original', label: 'Original Price ($)', type: 'number' },
                  { key: 'stock', label: 'Stock Limit', type: 'number' },
                  { key: 'image', label: 'Image URL', type: 'url' },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-xs text-gray-500 mb-1 block font-medium">{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      required={key !== 'image' && key !== 'original'}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none bg-gray-50" />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white py-2.5 rounded-lg text-sm cursor-pointer border-none font-bold transition-colors">
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm cursor-pointer border-none font-bold transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Item', 'Pricing', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg shadow-sm" /> : <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">📦</div>}
                      <div>
                        <div className="font-bold text-gray-900">{p.name || 'Unnamed Product'}</div>
                        <div className="text-xs text-blue-500 font-medium">{p.category || 'No Category'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">${p.price}</span>
                    {p.original && <span className="text-xs text-gray-400 line-through ml-2">${p.original}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'} uppercase tracking-widest`}>
                      {p.stock > 0 ? p.stock + ' left' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border-none cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors border-none cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={4} className="text-center py-12 text-gray-400">You haven't added any products yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
