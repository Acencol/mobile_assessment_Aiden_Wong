import mockRoutes from '../../assets/routes.json';

export const fetchRoutes = async (fromAddress, toAddress) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simulate occasional network error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Unable to fetch routes. Please check your connection and try again.');
  }
  
  // Validate addresses
  if (!fromAddress || !toAddress) {
    throw new Error('Both addresses are required');
  }
  
  if (fromAddress.toLowerCase() === toAddress.toLowerCase()) {
    throw new Error('Starting and destination addresses cannot be the same');
  }
  
  // Return routes sorted by eco-score (ascending - lower is better)
  return [...mockRoutes].sort((a, b) => a.score - b.score).slice(0, 3);
};

// Export additional utility function for testing
export const generateMockRoutes = () => {
  return [...mockRoutes];
};