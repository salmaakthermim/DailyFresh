import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useRole from '../hooks/useRole';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { isAdmin, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
