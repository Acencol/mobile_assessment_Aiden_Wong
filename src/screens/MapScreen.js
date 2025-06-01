import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

// Get route color based on transport mode
const getRouteColor = (mode) => {
  const colors = {
    driving: '#FF6B6B',    // Red for driving
    bicycling: '#4ECDC4',  // Teal for biking
    transit: '#45B7D1',    // Blue for transit
    walking: '#96CEB4'     // Green for walking
  };
  return colors[mode] || '#007AFF';
};

// Get mode icon
const getModeIcon = (mode) => {
  const icons = {
    driving: '🚗',
    bicycling: '🚴',
    transit: '🚌',
    walking: '🚶'
  };
  return icons[mode] || '🚗';
};

// Simple route visualization component
const RouteVisualization = ({ mode }) => {
  const routeColor = getRouteColor(mode);
  
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapHeader}>
        <Text style={styles.mapTitle}>Route Preview</Text>
        <Text style={styles.mapSubtitle}>Visual representation of your {mode} route</Text>
      </View>
      
      {/* Simple route diagram */}
      <View style={styles.routeDiagram}>
        {/* Start point */}
        <View style={styles.startPoint}>
          <Text style={styles.pointEmoji}>🟢</Text>
          <Text style={styles.pointLabel}>Start</Text>
        </View>
        
        {/* Route line with waypoints */}
        <View style={styles.routeLineContainer}>
          <View style={[styles.routeLine, { backgroundColor: routeColor }]} />
          
          {/* Waypoints based on mode */}
          {mode === 'transit' && (
            <>
              <View style={[styles.waypoint, { top: '25%' }]}>
                <Text style={styles.waypointEmoji}>🚏</Text>
              </View>
              <View style={[styles.waypoint, { top: '75%' }]}>
                <Text style={styles.waypointEmoji}>🚏</Text>
              </View>
            </>
          )}
          
          {mode === 'bicycling' && (
            <View style={[styles.waypoint, { top: '50%' }]}>
              <Text style={styles.waypointEmoji}>🚴</Text>
            </View>
          )}
          
          {mode === 'walking' && (
            <>
              <View style={[styles.waypoint, { top: '33%' }]}>
                <Text style={styles.waypointEmoji}>🚶</Text>
              </View>
              <View style={[styles.waypoint, { top: '66%' }]}>
                <Text style={styles.waypointEmoji}>🚶</Text>
              </View>
            </>
          )}
        </View>
        
        {/* End point */}
        <View style={styles.endPoint}>
          <Text style={styles.pointEmoji}>🔴</Text>
          <Text style={styles.pointLabel}>Destination</Text>
        </View>
      </View>
      
      {/* Route characteristics */}
      <View style={styles.routeCharacteristics}>
        <Text style={styles.characteristicsTitle}>Route Characteristics</Text>
        <View style={styles.characteristicItem}>
          <Text style={styles.characteristicLabel}>Transport Mode:</Text>
          <Text style={styles.characteristicValue}>{getModeIcon(mode)} {mode.toUpperCase()}</Text>
        </View>
        <View style={styles.characteristicItem}>
          <Text style={styles.characteristicLabel}>Route Type:</Text>
          <Text style={styles.characteristicValue}>
            {mode === 'driving' && 'Direct roads and highways'}
            {mode === 'bicycling' && 'Bike lanes and paths'}
            {mode === 'transit' && 'Public transportation routes'}
            {mode === 'walking' && 'Pedestrian walkways'}
          </Text>
        </View>
        <View style={styles.characteristicItem}>
          <Text style={styles.characteristicLabel}>Route Color:</Text>
          <View style={styles.colorIndicator}>
            <View style={[styles.colorSwatch, { backgroundColor: routeColor }]} />
            <Text style={styles.characteristicValue}>{routeColor}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function MapScreen({ route, navigation }) {
  // Get route data from navigation params
  const routeData = route?.params?.route || {
    mode: 'driving',
    distance_km: 12.3,
    time_min: 18,
    co2_g: 2214,
    score: 240.4
  };

  const handleBackToList = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Route Information Header */}
      <View style={styles.routeInfo}>
        <View style={styles.routeHeader}>
          <Text style={styles.modeIcon}>{getModeIcon(routeData.mode)}</Text>
          <Text style={styles.modeName}>{routeData.mode.toUpperCase()}</Text>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>{routeData.score}</Text>
          </View>
        </View>
        <View style={styles.routeDetails}>
          <Text style={styles.detailText}>{routeData.distance_km} km</Text>
          <Text style={styles.detailText}>{routeData.time_min} min</Text>
          <Text style={styles.detailText}>{routeData.co2_g} g CO₂</Text>
        </View>
      </View>

      {/* Route Visualization */}
      <RouteVisualization mode={routeData.mode} />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToList}
      >
        <Text style={styles.backButtonText}>← Back to Routes</Text>
      </TouchableOpacity>
      
      {/* Note about real implementation */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>📝 Development Note</Text>
        <Text style={styles.noteText}>
          In a production app, this would show an interactive map with real GPS coordinates, 
          turn-by-turn directions, and live traffic data using services like Google Maps or Mapbox.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  routeInfo: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  modeName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
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
    fontWeight: '500',
  },
  mapContainer: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mapHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  routeDiagram: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  startPoint: {
    alignItems: 'center',
  },
  endPoint: {
    alignItems: 'center',
  },
  pointEmoji: {
    fontSize: 24,
  },
  pointLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontWeight: 'bold',
  },
  routeLineContainer: {
    flex: 1,
    width: 4,
    position: 'relative',
    marginVertical: 10,
  },
  routeLine: {
    flex: 1,
    width: 4,
    borderRadius: 2,
  },
  waypoint: {
    position: 'absolute',
    left: -8,
    transform: [{ translateX: -8 }],
  },
  waypointEmoji: {
    fontSize: 16,
  },
  routeCharacteristics: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  characteristicsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  characteristicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  characteristicLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  characteristicValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  colorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  colorSwatch: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  backButton: {
    backgroundColor: '#007AFF',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: '#fff3cd',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});