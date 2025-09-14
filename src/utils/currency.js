/**
 * Format currency as Ghana Cedis (GHS)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format as Ghana Cedis
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numAmount);
};

/**
 * Get currency symbol for Ghana Cedis
 * @returns {string} GHS currency symbol
 */
export const getCurrencySymbol = () => {
  return 'GH₵';
};