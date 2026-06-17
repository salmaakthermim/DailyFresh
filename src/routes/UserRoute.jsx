import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import { useAuth } from '../context/AuthContext';

export default function UserRoute({ children }) {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  
  if (role) return children; // Any logged in user (user, admin, seller) has access to user profile/dash

  return <Navigate to="/" replace />;
}
