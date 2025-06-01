import React, { createContext, useContext, useReducer } from 'react';

const RouteContext = createContext();

const initialState = {
  routes: [],
  loading: false,
  error: null,
  fromAddress: '',
  toAddress: ''
};

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

export const RouteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, initialState);
  return (
    <RouteContext.Provider value={{ state, dispatch }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within RouteProvider');
  }
  return context;
};