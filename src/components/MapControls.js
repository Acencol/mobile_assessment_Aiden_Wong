import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MapControls({ onMapTypeChange, onZoomIn, onZoomOut, mapType }) {
  return (
    <View style={styles.controlsContainer}>
      {/* Map Type Toggle */}
      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => onMapTypeChange(mapType === 'standard' ? 'satellite' : 'standard')}
      >
        <Text style={styles.controlText}>
          {mapType === 'standard' ? '🛰️' : '🗺️'}
        </Text>
      </TouchableOpacity>

      {/* Zoom Controls */}
      <TouchableOpacity style={styles.controlButton} onPress={onZoomIn}>
        <Text style={styles.controlText}>+</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.controlButton} onPress={onZoomOut}>
        <Text style={styles.controlText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    top: 150,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  controlButton: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});