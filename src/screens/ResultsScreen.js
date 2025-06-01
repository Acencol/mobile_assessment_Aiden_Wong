/**
 * Results Screen component for the EcoRoute application
 * Displays sorted route options with their environmental impact metrics
 * Provides navigation to detailed map view for each route
 */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useRoute } from '../context/RouteContext';

/**
 * Maps transport modes to their corresponding emoji icons
 * @param {string} mode - Transport mode identifier
 * @returns {string} Emoji icon representing the transport mode
 */
const getModeIcon = (mode) => {
  const icons = {
    driving: '🚗',
    bicycling: '🚴',
    transit: '🚌',
    walking: '🚶'
  };
  return icons[mode] || '🚗';
};

/**
 * Route item component displaying individual route options
 * @param {Object} props - Component props
 * @param {Object} props.route - Route data object
 * @param {Function} props.onPress - Handler for route selection
 * @returns {JSX.Element} Route card UI with mode, metrics, and score
 */
const RouteItem = ({ route, onPress }) => (
  <TouchableOpacity style={styles.routeItem} onPress={onPress}>
    {/* Mode identifier and score section */}
    <View style={styles.routeHeader}>
      <Text style={styles.modeIcon}>{getModeIcon(route.mode)}</Text>
      <Text style={styles.modeName}>{route.mode.toUpperCase()}</Text>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>{route.score}</Text>
      </View>
    </View>
    
    {/* Route metrics display */}
    <View style={styles.routeDetails}>
      <Text style={styles.detailText}>Distance: {route.distance_km} km</Text>
      <Text style={styles.detailText}>Time: {route.time_min} min</Text>
      <Text style={styles.detailText}>CO₂: {route.co2_g} g</Text>
    </View>
  </TouchableOpacity>
);

/**
 * Results screen component showing all available routes
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object for screen transitions
 * @returns {JSX.Element} Results screen UI with list of route options
 */
export default function ResultsScreen({ navigation }) {
  const { state } = useRoute();

  /**
   * Handles navigation to map view for selected route
   * @param {Object} route - Selected route data
   */
  const handleRoutePress = (route) => {
    navigation.navigate('Map', { route });
  };

  return (
    <View style={styles.container}>
      {/* Screen header with route addresses */}
      <Text style={styles.title}>Best Route Options</Text>
      <Text style={styles.subtitle}>
        From: {state.fromAddress} → To: {state.toAddress}
      </Text>
      
      {/* Routes list with selection handling */}
      <FlatList
        data={state.routes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RouteItem route={item} onPress={() => handleRoutePress(item)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

/**
 * Component styles
 * @constant
 * @description
 * - container: Main screen layout
 * - title/subtitle: Header text styling
 * - routeItem: Card container for route options
 * - routeHeader: Mode and score section layout
 * - modeIcon/modeName: Transport mode identifier styling
 * - scoreBadge: Route score display styling
 * - routeDetails: Metrics section layout
 * - Shadow properties for card elevation effect
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  routeItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  modeName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
});