import axios from 'axios';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export default function useAxiosSecure() {
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axiosSecure.interceptors.request.eject(interceptor);
  }, []);

  return axiosSecure;
}
