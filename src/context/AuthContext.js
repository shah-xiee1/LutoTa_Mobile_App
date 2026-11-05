import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@lutota_auth_user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load user auth', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // In MVP / student semester scope, accepts demo or registered accounts
    const displayName = email.split('@')[0] || 'Student Chef';
    const userData = {
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: email.trim().toLowerCase(),
      dormLocation: 'Campus Boarding House',
      dailyBudget: 70,
      createdAt: new Date().toISOString(),
    };

    setUser(userData);
    setIsGuest(false);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const signup = async ({ name, email, dormLocation, dailyBudget }) => {
    const userData = {
      name: name.trim() || 'Student Chef',
      email: email.trim().toLowerCase(),
      dormLocation: dormLocation.trim() || 'Campus Boarding House',
      dailyBudget: Number(dailyBudget) || 70,
      createdAt: new Date().toISOString(),
    };

    setUser(userData);
    setIsGuest(false);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  const logout = async () => {
    setUser(null);
    setIsGuest(false);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        loading,
        login,
        signup,
        continueAsGuest,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
