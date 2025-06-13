import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Alert, Snackbar } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import WorkoutGenerator from './pages/WorkoutGenerator';
import HealthCalculator from './pages/HealthCalculator';
import ProgressTracker from './pages/ProgressTracker';
import MealPlanner from './pages/MealPlanner';
import Community from './pages/Community'; // Import Community page
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent = () => {
  const { authError } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (authError) {
      if (authError.code !== 'permission-denied') {
        setErrorMessage(`Auth Error: ${authError.code || authError.message}`);

        const timer = setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
    return undefined; // Return a value for all code paths
  }, [authError]);

  return (
    <Box
      sx={{
        width: { xs: '95%', sm: '90%', md: '85%', lg: '80%', xl: '1488px' },
        maxWidth: '1488px',
        pb: '40px',
      }}
      m="auto"
    >
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/community" element={<Community />} /> {/* Add Community route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/workout-generator"
            element={
              <PrivateRoute>
                <WorkoutGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/health-calculator"
            element={
              <ErrorBoundary>
                <HealthCalculator />
              </ErrorBoundary>
            }
          />
          <Route
            path="/progress-tracker"
            element={
              <PrivateRoute>
                <ErrorBoundary>
                  <ProgressTracker />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <PrivateRoute>
                <ErrorBoundary>
                  <MealPlanner />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
      <Footer />

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
