import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import { useAuth } from '../context/AuthContext';

export default function SellerRoute({ children }) {
  const { user, loading } = useAuth();
  const { isSeller, isAdmin, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (isSeller || isAdmin) return children;

  return <Navigate to="/" replace />;
}
