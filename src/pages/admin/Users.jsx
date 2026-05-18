import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function Users() {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const load = () => axiosSecure.get('/api/users').then(({ data }) => setUsers(data));
  useEffect(() => { load(); }, []);

  const setRole = async (email, role) => {
    await axiosSecure.patch(`/api/users/${email}/role`, { role });
    load();
  };

  const toggleBlock = async (email, blocked) => {
    await axiosSecure.patch(`/api/users/${email}/block`, { blocked: !blocked });
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Users ({users.length})</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Avatar', 'Name', 'Email', 'Role', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {u.photoURL
                      ? <img src={u.photoURL} className="w-9 h-9 rounded-full object-cover" alt="" />
                      : <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                          {(u.name || u.email || '?')[0].toUpperCase()}
                        </div>
                    }
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{u.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.blocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                      {u.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => setRole(u.email, u.role === 'admin' ? 'user' : 'admin')}
                        className={`text-xs px-3 py-1 rounded-lg border-none cursor-pointer ${u.role === 'admin' ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' : 'bg-purple-50 hover:bg-purple-100 text-purple-600'}`}>
                        {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button onClick={() => toggleBlock(u.email, u.blocked)}
                        className={`text-xs px-3 py-1 rounded-lg border-none cursor-pointer ${u.blocked ? 'bg-green-50 hover:bg-green-100 text-green-600' : 'bg-red-50 hover:bg-red-100 text-red-600'}`}>
                        {u.blocked ? 'Unblock' : 'Block'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
