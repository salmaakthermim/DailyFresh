import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {user?.displayName}!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Account Status</h3>
          <p className="text-3xl font-extrabold text-green-500">Active</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Email</h3>
          <p className="text-lg font-bold text-gray-800">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
