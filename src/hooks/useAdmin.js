import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useAxiosSecure from './useAxiosSecure';

export default function useAdmin() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) { setAdminLoading(false); return; }
    axiosSecure.get(`/api/users/role/${user.email}`)
      .then(({ data }) => setIsAdmin(data.role === 'admin'))
      .catch(() => setIsAdmin(false))
      .finally(() => setAdminLoading(false));
  }, [user]);

  return { isAdmin, adminLoading };
}
