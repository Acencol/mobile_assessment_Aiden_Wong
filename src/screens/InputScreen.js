/**
 * Input Screen component for the EcoRoute application
 * Handles user input for route planning with address entry and validation
 * Manages loading states and error handling for route fetching
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRoute } from '../context/RouteContext';
import { fetchRoutes } from '../services/routeService';

/**
 * InputScreen component for route address entry
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object for screen transitions
 * @returns {JSX.Element} Input screen UI with address fields and search button
 */
export default function InputScreen({ navigation }) {
  // Global state management through context
  const { state, dispatch } = useRoute();
  
  // Local state for form inputs
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');

  /**
   * Handles route search submission and navigation
   * @async
   * @description
   * - Validates input fields
   * - Updates loading state
   * - Fetches routes from service
   * - Handles success/error states
   * - Navigates to results on success
   */
  const handleFindRoutes = async () => {
    if (!fromAddress.trim() || !toAddress.trim()) {
      Alert.alert('Error', 'Please enter both addresses');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ADDRESSES', from: fromAddress, to: toAddress });

    try {
      const routes = await fetchRoutes(fromAddress, toAddress);
      dispatch({ type: 'SET_ROUTES', payload: routes });
      navigation.navigate('Results');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* App title display */}
      <Text style={styles.title}>EcoRoute Planner</Text>
      
      {/* From address input field */}
      <TextInput
        style={styles.input}
        placeholder="From address"
        value={fromAddress}
        onChangeText={setFromAddress}
      />
      
      {/* To address input field */}
      <TextInput
        style={styles.input}
        placeholder="To address"
        value={toAddress}
        onChangeText={setToAddress}
      />
      
      {/* Search button with loading state handling */}
      <TouchableOpacity
        style={[
          styles.button,
          (!fromAddress.trim() || !toAddress.trim() || state.loading) && styles.buttonDisabled
        ]}
        onPress={handleFindRoutes}
        disabled={!fromAddress.trim() || !toAddress.trim() || state.loading}
      >
        {state.loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Find Routes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

/**
 * Component styles
 * @constant
 * @description
 * - container: Main screen layout with centered content
 * - title: App title text styling
 * - input: Text input field styling with consistent padding and borders
 * - button: Primary action button styling
 * - buttonDisabled: Disabled state styling for the button
 * - buttonText: Button label text styling
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});