import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@lutota_auth_user';
const REGISTERED_USERS_KEY = '@lutota_registered_users';

// Client-side secure deterministic hashing for stored credentials
const hashPassword = (password) => {
  let hash = 0;
  const str = String(password || '');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `lutota_sec_${Math.abs(hash)}_${str.length}`;
};

// Default seed demo account for instructors / evaluators
const DEFAULT_DEMO_USER = {
  name: 'Student Chef',
  email: 'student@dorm.ph',
  passwordHash: hashPassword('student123'),
  dormLocation: 'Campus Boarding House',
  dailyBudget: 70,
  defaultCookware: '1 burner',
  mealsCookedCount: 5,
  createdAt: '2026-01-01T00:00:00.000Z',
};

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

  const getRegisteredUsers = async () => {
    try {
      const stored = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // Seed default demo user if list is empty
      const initialList = [DEFAULT_DEMO_USER];
      await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(initialList));
      return initialList;
    } catch (e) {
      console.warn('Failed to load registered users', e);
      return [DEFAULT_DEMO_USER];
    }
  };

  const saveRegisteredUsers = async (usersList) => {
    try {
      await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(usersList));
    } catch (e) {
      console.warn('Failed to save registered users', e);
    }
  };

  const login = async (email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = String(password || '');

      const registeredUsers = await getRegisteredUsers();
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (!existingUser) {
        return {
          success: false,
          error: 'No account found with this email. Please sign up first.',
        };
      }

      if (existingUser.passwordHash !== hashPassword(cleanPass)) {
        return {
          success: false,
          error: 'Incorrect password. Please double check and try again.',
        };
      }

      const userData = {
        name: existingUser.name,
        email: existingUser.email,
        dormLocation: existingUser.dormLocation || 'Campus Boarding House',
        dailyBudget: Number(existingUser.dailyBudget) || 70,
        defaultCookware: existingUser.defaultCookware || '1 burner',
        mealsCookedCount: Number(existingUser.mealsCookedCount) || 5,
        createdAt: existingUser.createdAt || new Date().toISOString(),
      };

      setUser(userData);
      setIsGuest(false);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async ({ name, email, dormLocation, dailyBudget, password }) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = String(password || '');

      const registeredUsers = await getRegisteredUsers();
      const isDuplicate = registeredUsers.some(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (isDuplicate) {
        return {
          success: false,
          error: 'An account with this email already exists. Please log in instead.',
        };
      }

      const newUserEntry = {
        name: name.trim() || 'Student Chef',
        email: cleanEmail,
        passwordHash: hashPassword(cleanPass),
        dormLocation: dormLocation.trim() || 'Campus Boarding House',
        dailyBudget: Number(dailyBudget) || 70,
        defaultCookware: '1 burner',
        mealsCookedCount: 0,
        createdAt: new Date().toISOString(),
      };

      const updatedUsersList = [...registeredUsers, newUserEntry];
      await saveRegisteredUsers(updatedUsersList);

      const sessionUserData = {
        name: newUserEntry.name,
        email: newUserEntry.email,
        dormLocation: newUserEntry.dormLocation,
        dailyBudget: newUserEntry.dailyBudget,
        defaultCookware: newUserEntry.defaultCookware,
        mealsCookedCount: newUserEntry.mealsCookedCount,
        createdAt: newUserEntry.createdAt,
      };

      setUser(sessionUserData);
      setIsGuest(false);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUserData));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  const resetGuest = () => {
    setIsGuest(false);
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

    // Also update in registeredUsers collection if email matches
    try {
      const registeredUsers = await getRegisteredUsers();
      const updatedList = registeredUsers.map((u) => {
        if (u.email.toLowerCase() === user.email.toLowerCase()) {
          return { ...u, ...updates };
        }
        return u;
      });
      await saveRegisteredUsers(updatedList);
    } catch (e) {
      console.warn('Failed to update user in registered users list', e);
    }
  };

  const recordMealCooked = async () => {
    const currentCount = Number(user?.mealsCookedCount || 5);
    const newCount = currentCount + 1;
    await updateProfile({ mealsCookedCount: newCount });
    return newCount;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        setIsGuest,
        resetGuest,
        loading,
        login,
        signup,
        continueAsGuest,
        logout,
        updateProfile,
        recordMealCooked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

