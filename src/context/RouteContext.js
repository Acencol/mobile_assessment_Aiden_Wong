/**
 * Route Context module for global state management
 * Manages route data, loading states, and address information
 * Provides context hooks for components to access and update route state
 */
import React, { createContext, useContext, useReducer } from 'react';

/**
 * Create context for route management
 * @constant {React.Context}
 */
const RouteContext = createContext();

/**
 * Initial state for route context
 * @constant {Object}
 * @property {Array} routes - List of available routes
 * @property {boolean} loading - Loading state indicator
 * @property {string|null} error - Error message if present
 * @property {string} fromAddress - Starting location
 * @property {string} toAddress - Destination location
 */
const initialState = {
  routes: [],
  loading: false,
  error: null,
  fromAddress: '',
  toAddress: ''
};

/**
 * Reducer function for managing route state updates
 * @param {Object} state - Current state object
 * @param {Object} action - Action object with type and payload
 * @returns {Object} Updated state
 * @description Handles actions:
 * - SET_LOADING: Updates loading state
 * - SET_ROUTES: Updates routes array and clears error
 * - SET_ERROR: Sets error message and clears loading
 * - SET_ADDRESSES: Updates from/to addresses
 */
function routeReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ROUTES':
      return { ...state, routes: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_ADDRESSES':
      return { ...state, fromAddress: action.from, toAddress: action.to };
    default:
      return state;
  }
}

/**
 * Route Provider component for wrapping app with route context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with state and dispatch
 */
export const RouteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, initialState);
  return (
    <RouteContext.Provider value={{ state, dispatch }}>
      {children}
    </RouteContext.Provider>
  );
};

/**
 * Custom hook for accessing route context
 * @returns {Object} Context object with state and dispatch
 * @throws {Error} If used outside RouteProvider
 */
export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within RouteProvider');
  }
  return context;
};