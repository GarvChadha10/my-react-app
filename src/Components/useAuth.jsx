import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    setIsAuthenticated(!!token); 
  }, []);

  const login = (token) => {
    localStorage.setItem('google_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('google_token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
