import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useRoute } from '../context/RouteContext';

const getModeIcon = (mode) => {
  const icons = {
    driving: '🚗',
    bicycling: '🚴',
    transit: '🚌',
    walking: '🚶'
  };
  return icons[mode] || '🚗';
};

const RouteItem = ({ route, onPress }) => (
  <TouchableOpacity style={styles.routeItem} onPress={onPress}>
    <View style={styles.routeHeader}>
      <Text style={styles.modeIcon}>{getModeIcon(route.mode)}</Text>
      <Text style={styles.modeName}>{route.mode.toUpperCase()}</Text>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>{route.score}</Text>
      </View>
    </View>
    
    <View style={styles.routeDetails}>
      <Text style={styles.detailText}>Distance: {route.distance_km} km</Text>
      <Text style={styles.detailText}>Time: {route.time_min} min</Text>
      <Text style={styles.detailText}>CO₂: {route.co2_g} g</Text>
    </View>
  </TouchableOpacity>
);

export default function ResultsScreen({ navigation }) {
  const { state } = useRoute();

  const handleRoutePress = (route) => {
    // Navigate to map with route data
    navigation.navigate('Map', { route });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Route Options</Text>
      <Text style={styles.subtitle}>
        From: {state.fromAddress} → To: {state.toAddress}
      </Text>
      
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