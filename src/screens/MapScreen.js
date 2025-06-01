import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '../context/RouteContext';

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

export default function MapScreen({ route, navigation }) {
  const { state } = useRoute();
  const routeData = route?.params?.route || {
    mode: 'driving',
    distance_km: 12.3,
    time_min: 18,
    co2_g: 2214,
    score: 240.4
  };

  // For demo purposes, we'll create mock coordinates based on a center point
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Create mock route coordinates
  const routeCoordinates = [
    { latitude: region.latitude - 0.01, longitude: region.longitude - 0.01 },  // Start
    { latitude: region.latitude - 0.005, longitude: region.longitude },        // Waypoint
    { latitude: region.latitude + 0.01, longitude: region.longitude + 0.01 }   // End
  ];

  const handleBackToList = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
        >
          {/* Start Marker */}
          <Marker
            coordinate={routeCoordinates[0]}
            title="Start"
            description={state.fromAddress || "Starting Point"}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>🟢</Text>
            </View>
          </Marker>

          {/* End Marker */}
          <Marker
            coordinate={routeCoordinates[routeCoordinates.length - 1]}
            title="Destination"
            description={state.toAddress || "Destination Point"}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>🔴</Text>
            </View>
          </Marker>

          {/* Route Polyline */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={getRouteColor(routeData.mode)}
            strokeWidth={3}
          />
        </MapView>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToList}
      >
        <Text style={styles.backButtonText}>← Back to Routes</Text>
      </TouchableOpacity>
      
      {/* Note about mock implementation */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>📝 Note</Text>
        <Text style={styles.noteText}>
          This is a demo route visualization. In production, real GPS coordinates and route data would be used.
        </Text>
      </View>
    </View>
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
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    fontSize: 24,
  },
  backButton: {
    margin: 10,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
  }
});