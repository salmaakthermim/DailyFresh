import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const empty = { title: '', subtitle: '', image: '', bg: '#1a1a2e', accent: '#4ade80', order: 0 };

export default function Banners() {
  const axiosSecure = useAxiosSecure();
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => axiosSecure.get('/api/banners/all').then(({ data }) => setBanners(data));
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (b) => { setForm(b); setEditId(b._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await axiosSecure.put(`/api/banners/${editId}`, form);
    else        await axiosSecure.post('/api/banners', form);
    setShowForm(false); load();
  };

  const toggleActive = async (b) => {
    await axiosSecure.put(`/api/banners/${b._id}`, { ...b, active: !b.active });
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete banner?')) return;
    await axiosSecure.delete(`/api/banners/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Banners</h2>
        <button onClick={openAdd}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer border-none">
          + Add Banner
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">{editId ? 'Edit' : 'Add'} Banner</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[
                { key: 'title',    label: 'Title',       type: 'text' },
                { key: 'subtitle', label: 'Subtitle',    type: 'text' },
                { key: 'image',    label: 'Image URL',   type: 'url'  },
                { key: 'order',    label: 'Order (0-9)', type: 'number' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              ))}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Background Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={form.bg} onChange={e => setForm({ ...form, bg: e.target.value })}
                      className="w-10 h-9 rounded cursor-pointer border border-gray-200" />
                    <span className="text-sm text-gray-600">{form.bg}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Accent Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={form.accent} onChange={e => setForm({ ...form, accent: e.target.value })}
                      className="w-10 h-9 rounded cursor-pointer border border-gray-200" />
                    <span className="text-sm text-gray-600">{form.accent}</span>
                  </div>
                </div>
              </div>
              {/* Preview */}
              {form.image && (
                <div className="rounded-lg overflow-hidden h-24 relative" style={{ background: form.bg }}>
                  <img src={form.image} alt="preview" className="absolute right-0 top-0 h-full object-cover opacity-80" />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <p className="text-white font-bold text-sm" style={{ color: form.accent }}>{form.title}</p>
                    <p className="text-white/70 text-xs">{form.subtitle}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-2">
                <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm cursor-pointer border-none">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm cursor-pointer border-none">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map(b => (
          <div key={b._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-28 relative" style={{ background: b.bg }}>
              {b.image && <img src={b.image} alt={b.title} className="absolute right-0 top-0 h-full object-cover opacity-80" />}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <p className="text-white font-bold text-sm">{b.title}</p>
                <p className="text-white/60 text-xs">{b.subtitle}</p>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {b.active ? 'Active' : 'Hidden'}
              </span>
              <div className="flex gap-2">
                <button onClick={() => toggleActive(b)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded border-none cursor-pointer">
                  {b.active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => openEdit(b)} className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 rounded border-none cursor-pointer">Edit</button>
                <button onClick={() => del(b._id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded border-none cursor-pointer">Del</button>
              </div>
            </div>
          </div>
        ))}
        {banners.length === 0 && <p className="text-gray-400 text-sm">No banners yet</p>}
      </div>
    </div>
  );
}
