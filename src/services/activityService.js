// Helper function to convert timestamp to "time ago" format
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const diffMs = now - new Date(timestamp);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHrs > 0) {
    return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  } else {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  }
};

const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : '/api');

// Create a new activity
export const createActivity = async (activityData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const activity = await response.json();
    return activity;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw new Error(`Error creating activity: ${error.message}`);
  }
};

// Get recent activities
export const getActivities = async (limit = 10) => {
  try {
    console.log('Running in browser environment, making API call to fetch activities');
    
    const response = await fetch(`${apiBaseUrl}/api/activities?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch activities`);
    }
    
    const activities = await response.json();
    console.log('Activities fetched successfully via API:', activities.length);
    return activities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw new Error(`Error fetching activities: ${error.message}`);
  }
};