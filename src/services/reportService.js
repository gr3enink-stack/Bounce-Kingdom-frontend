import Report from '../models/Report.js';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';
const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : '/api');

// Generate and save revenue report
export const generateRevenueReport = async (period = 'monthly') => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/reports/revenue?period=${period}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to generate revenue report`);
    }
    
    const report = await response.json();
    return report;
  } catch (error) {
    console.error('Error generating revenue report:', error);
    throw new Error(`Error generating revenue report: ${error.message}`);
  }
};

// Generate and save bookings report
export const generateBookingsReport = async (period = 'monthly') => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/reports/bookings?period=${period}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to generate bookings report`);
    }
    
    const report = await response.json();
    return report;
  } catch (error) {
    console.error('Error generating bookings report:', error);
    throw new Error(`Error generating bookings report: ${error.message}`);
  }
};

// Generate and save equipment utilization report
export const generateEquipmentUtilizationReport = async (period = 'monthly') => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/reports/equipment-utilization?period=${period}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to generate equipment utilization report`);
    }
    
    const report = await response.json();
    return report;
  } catch (error) {
    console.error('Error generating equipment utilization report:', error);
    throw new Error(`Error generating equipment utilization report: ${error.message}`);
  }
};

// Get all reports
export const getAllReports = async (type = null, period = null) => {
  try {
    let url = `${apiBaseUrl}/api/reports`;
    const params = new URLSearchParams();
    
    if (type) params.append('type', type);
    if (period) params.append('period', period);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch reports`);
    }
    
    const reports = await response.json();
    return reports;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw new Error(`Error fetching reports: ${error.message}`);
  }
};

// Helper function to get start date based on period
const getStartDate = (period) => {
  const date = new Date();
  switch (period) {
    case 'daily':
      date.setDate(date.getDate() - 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() - 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() - 1);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      date.setMonth(date.getMonth() - 1);
  }
  return date;
};