import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../services/userService.js';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real application, you would make an API call to authenticate the user
      // For now, we'll simulate authentication with the default admin user
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        // Store login status in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        // For a real implementation with MongoDB, you would do something like this:
        /*
        const user = await getUserByUsername(credentials.username);
        if (user && await user.matchPassword(credentials.password)) {
          if (user.role === 'admin') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/admin/dashboard');
          } else {
            setError('Access denied. Admin privileges required.');
          }
        } else {
          setError('Invalid username or password');
        }
        */
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Please sign in to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-btn" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Default credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;