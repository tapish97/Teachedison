'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, setToken, clearToken } from './auth';
import api from './api';

interface AuthContextProps {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) setAuthToken(existingToken);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/token/', { email, password });
      const accessToken = (res.data as { access: string }).access;
      setToken(accessToken);
      setAuthToken(accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('❌ Login failed:', err.response?.data || err.message);
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
  try {
    console.log('📤 Sending registration request:', { email, password });

    const res = await api.post('/register/', { email, password });

    console.log('✅ Registration response:', res.data);
    router.push('/login');
  } catch (err: any) {
    if (err.response) {
      console.error('❌ Registration failed:');
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error('❌ Network or unexpected error:', err.message);
    }
    throw err;
  }
};

  const logout = () => {
    clearToken();
    setAuthToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
