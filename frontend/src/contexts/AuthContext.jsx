import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import { userAPI } from '../services/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = Cookies.get('token');
    const userData = Cookies.get('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { token, user }
        });
        
        // Verify token is still valid
        verifyToken();
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await userAPI.getProfile();
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.user
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  const login = (token, user) => {
    // Store in cookies
    Cookies.set('token', token, { expires: 30 }); // 30 days
    Cookies.set('user', JSON.stringify(user), { expires: 30 });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { token, user }
    });
  };

  const logout = () => {
    // Remove from cookies
    Cookies.remove('token');
    Cookies.remove('user');

    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    Cookies.set('user', JSON.stringify(updatedUser), { expires: 30 });
    
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
