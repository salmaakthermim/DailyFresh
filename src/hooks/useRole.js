import { useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useAuth } from '../context/AuthContext';

export default function useRole() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (user?.email) {
        axiosSecure.get(`/api/users/role/${user.email}`)
          .then(res => {
            setRole(res.data.role);
          })
          .catch(() => {
            setRole('user'); // Fallback
          })
          .finally(() => {
            setRoleLoading(false);
          });
      } else {
        setRole(null);
        setRoleLoading(false);
      }
    }
  }, [user, loading, axiosSecure]);

  return { 
    role, 
    isAdmin: role === 'admin',
    isSeller: role === 'seller',
    isUser: role === 'user',
    roleLoading 
  };
}
