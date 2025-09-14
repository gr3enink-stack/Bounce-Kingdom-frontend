// Authentication service for handling login/logout

const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : '/api');

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('isAdminLoggedIn') === 'true';
};

// Login function
export const login = async (username, password) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred during login' };
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('isAdminLoggedIn');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};