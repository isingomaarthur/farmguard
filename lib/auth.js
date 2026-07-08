// Auth utilities for persisting the JWT and current user session.

const STORAGE_KEY = 'farmguard_auth';

export const useAuth = () => {
  const getAuth = () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  const setAuth = (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    }
  };

  const clearAuth = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const getToken = () => {
    const auth = getAuth();
    return auth?.token || null;
  };

  return { getAuth, setAuth, clearAuth, getToken };
};

// Helper to add auth token to API requests
export const getAuthHeader = () => {
  const token = typeof window !== 'undefined' 
    ? (() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored).token : null;
      })()
    : null;
  
  return token ? { Authorization: `Bearer ${token}` } : {};
};
