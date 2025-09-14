const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : '/api');

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Get user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/users/username/${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch user`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Get user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/users/email/${email}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch user`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Update user
export const updateUser = async (id, updateData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};