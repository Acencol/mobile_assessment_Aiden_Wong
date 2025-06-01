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

export default function InputScreen({ navigation }) {
  const { state, dispatch } = useRoute();
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');

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
      <Text style={styles.title}>EcoRoute Planner</Text>
      
      <TextInput
        style={styles.input}
        placeholder="From address"
        value={fromAddress}
        onChangeText={setFromAddress}
      />
      
      <TextInput
        style={styles.input}
        placeholder="To address"
        value={toAddress}
        onChangeText={setToAddress}
      />
      
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