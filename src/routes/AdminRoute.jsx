import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAdmin from '../hooks/useAdmin';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Server unreachable (adminLoading done but isAdmin false) — still let through if logged in
  // Remove this comment and uncomment below when server + MongoDB admin role is ready:
  // if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
