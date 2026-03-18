'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthContextType, UserRole } from './types';
import { mockUsers } from './mock-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid email or password');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const signup = useCallback((name: string, email: string, password: string, role: UserRole) => {
    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      password,
      role,
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
