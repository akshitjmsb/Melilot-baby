import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ReloadPrompt from './components/ReloadPrompt';
import ToastContainer from './components/ToastContainer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SavedItemsProvider } from './context/SavedItemsContext';
import { ToastProvider } from './context/ToastContext';

import ProtectedRoute from './components/ProtectedRoute';
import SearchScreen from './screens/SearchScreen';
import AboutScreen from './screens/AboutScreen';
import SavedItemsScreen from './screens/SavedItemsScreen';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <SavedItemsProvider>
            <Router>
          <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/products" element={<ProductListScreen />} />
              <Route path="/product/:id" element={<ProductDetailScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationScreen />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/saved" element={<SavedItemsScreen />} />

              {/* Fallback routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <ReloadPrompt />
          <ToastContainer />
        </Router>
        </SavedItemsProvider>
      </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;