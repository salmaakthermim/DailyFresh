import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function Categories() {
  const axiosSecure = useAxiosSecure();
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({ name: '', icon: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => axiosSecure.get('/api/categories').then(({ data }) => setCats(data));
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm({ name: '', icon: '', image: '' }); setEditId(null); setShowForm(true); };
  const openEdit = (c) => { setForm(c); setEditId(c._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await axiosSecure.put(`/api/categories/${editId}`, form);
    else        await axiosSecure.post('/api/categories', form);
    setShowForm(false); load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete category?')) return;
    await axiosSecure.delete(`/api/categories/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        <button onClick={openAdd}
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer border-none">
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">{editId ? 'Edit' : 'Add'} Category</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[
                { key: 'name',  label: 'Name',      type: 'text' },
                { key: 'icon',  label: 'Icon/Emoji', type: 'text' },
                { key: 'image', label: 'Image URL',  type: 'url'  },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required={key === 'name'}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm cursor-pointer border-none">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm cursor-pointer border-none">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cats.map(c => (
          <div key={c._id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
              {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : c.icon || '🗂️'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{c.name}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(c)} className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 rounded border-none cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded border-none cursor-pointer">Del</button>
            </div>
          </div>
        ))}
        {cats.length === 0 && <p className="text-gray-400 text-sm col-span-4">No categories yet</p>}
      </div>
    </div>
  );
}
