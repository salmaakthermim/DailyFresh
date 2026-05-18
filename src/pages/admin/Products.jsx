import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const empty = { name: '', price: '', category: '', image: '', description: '', stock: '' };

export default function Products() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const load = () => axiosSecure.get(`/api/products?limit=100&search=${search}`).then(({ data }) => setProducts(data.products));
  useEffect(() => { load(); }, [search]);

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
    if (!confirm('Delete this product?')) return;
    await axiosSecure.delete(`/api/products/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
        <div className="flex gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
          <button onClick={openAdd}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer border-none">
            + Add Product
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[
                { key: 'name',        label: 'Name',        type: 'text' },
                { key: 'price',       label: 'Price ($)',   type: 'number' },
                { key: 'stock',       label: 'Stock',       type: 'number' },
                { key: 'category',    label: 'Category',    type: 'text' },
                { key: 'image',       label: 'Image URL',   type: 'url' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required={key !== 'image'}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="submit" disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-2 rounded-lg text-sm cursor-pointer border-none">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm cursor-pointer border-none">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                      : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">📦</div>
                    }
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-gray-800">${p.price}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.stock > 0 ? p.stock : 'Out'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg border-none cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(p._id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-lg border-none cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
