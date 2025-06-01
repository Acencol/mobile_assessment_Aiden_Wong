// Simple hash function to generate consistent but varied data based on addresses
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };
  
  // Generate route data based on addresses
  const generateRouteData = (fromAddress, toAddress) => {
    const routeHash = hashString(fromAddress + toAddress);
    
    // Base distance varies between 5-25 km based on addresses
    const baseDistance = 5 + (routeHash % 20);
    
    // Time and emissions calculations based on realistic ratios
    const routes = [
      {
        mode: "driving",
        distance_km: baseDistance,
        time_min: Math.round(baseDistance * 1.2 + (routeHash % 10)), // ~1.2 min per km + variance
        co2_g: Math.round(baseDistance * 180 + (routeHash % 100)), // ~180g per km for cars
        score: 0 // Will be calculated
      },
      {
        mode: "bicycling", 
        distance_km: baseDistance * 1.1, // Slightly longer for bike paths
        time_min: Math.round(baseDistance * 3.5 + (routeHash % 15)), // ~3.5 min per km
        co2_g: 0, // No emissions
        score: 0
      },
      {
        mode: "transit",
        distance_km: baseDistance * 1.2, // Longer route via transit
        time_min: Math.round(baseDistance * 2.8 + (routeHash % 20)), // ~2.8 min per km including waits
        co2_g: Math.round(baseDistance * 45 + (routeHash % 30)), // ~45g per km for public transit
        score: 0
      },
      {
        mode: "walking",
        distance_km: baseDistance * 0.9, // More direct pedestrian routes
        time_min: Math.round(baseDistance * 12 + (routeHash % 25)), // ~12 min per km
        co2_g: 0, // No emissions
        score: 0
      }
    ];
    
    // Calculate eco-scores (lower is better)
    // Score = time_weight * time + co2_weight * co2_normalized
    routes.forEach(route => {
      const co2_normalized = route.co2_g / 10; // Normalize CO2 to similar scale as time
      route.score = Math.round((route.time_min * 0.6) + (co2_normalized * 0.4));
    });
    
    // Round distances to 1 decimal place
    routes.forEach(route => {
      route.distance_km = Math.round(route.distance_km * 10) / 10;
    });
    
    return routes;
  };
  
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
    
    // Generate dynamic route data based on addresses
    const routes = generateRouteData(fromAddress.trim(), toAddress.trim());
    
    // Return routes sorted by eco-score (ascending - lower is better)
    return routes.sort((a, b) => a.score - b.score).slice(0, 3);
  };
  
  // Export additional utility functions for testing
  export const generateMockRoutes = (seed = 'default') => {
    return generateRouteData(seed + '_from', seed + '_to');
  };