import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  gameTokens: number;
  erc20Tokens: number;
}

interface Web3ContextType {
  account: string | null;
  user: User | null;
  token: string | null;
  isConnected: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const API_URL = 'http://localhost:3000/api';

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);
        setIsConnected(true);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      setError('Please install MetaMask to connect your wallet');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/auth/register`, { username, email, password });
      await login(email, password);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateUserProfile = async (data: Partial<User>) => {
    try {
      const response = await axios.put(`${API_URL}/users/${user?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to update profile');
      throw error;
    }
  };

  const value: Web3ContextType = {
    account,
    user,
    token,
    isConnected,
    error,
    connectWallet,
    disconnectWallet,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};