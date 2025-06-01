/**
 * Route Service module for handling route data operations
 * Provides mock API functionality for route fetching and manipulation
 * Simulates network delays and data processing for realistic behavior
 */
import mockRoutes from '../../assets/routes.json';

/**
 * Fetches and processes route options for given addresses
 * @async
 * @param {string} fromAddress - Starting location address
 * @param {string} toAddress - Destination address
 * @returns {Promise<Array>} Sorted array of top 3 routes by eco-score
 * @throws {Error} If addresses are invalid or identical
 * @description
 * - Simulates network delay (1-2 seconds)
 * - Validates address inputs
 * - Sorts routes by eco-score (ascending)
 * - Returns top 3 most eco-friendly options
 */
export const fetchRoutes = async (fromAddress, toAddress) => {
  // Simulate API call delay with random variance
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Validate address inputs
  if (!fromAddress || !toAddress) {
    throw new Error('Both addresses are required');
  }
  
  if (fromAddress.toLowerCase() === toAddress.toLowerCase()) {
    throw new Error('Starting and destination addresses cannot be the same');
  }
  
  // Process and return sorted routes
  return [...mockRoutes].sort((a, b) => a.score - b.score).slice(0, 3);
};

/**
 * Utility function for testing route data
 * @returns {Array} Copy of mock routes data
 * @description Creates a fresh copy of mock data for testing purposes
 */
export const generateMockRoutes = () => {
  return [...mockRoutes];
};