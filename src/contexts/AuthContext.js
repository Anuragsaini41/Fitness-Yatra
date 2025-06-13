import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Box, CircularProgress } from '@mui/material';
import { auth, firestore } from '../firebase/config'; // firestore import करें, db की जगह

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Sign up function
  async function signup(email, password, username, fullName) {
    try {
      console.log('Signing up with:', email, username, fullName);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log('User credential obtained, updating profile...');
      await updateProfile(userCredential.user, { displayName: fullName });

      try {
        console.log('Creating profile document...');
        await setDoc(doc(firestore, 'userProfiles', userCredential.user.uid), {
          username,
          fullName,
          email,
          age: '',
          gender: '',
          fitnessGoal: 'weight-loss',
          activityLevel: 'moderate',
          createdAt: new Date().toISOString(),
        });
        console.log('Profile document created successfully');
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        // Continue even if Firestore fails - user is still authenticated
      }

      console.log('Signup successful');
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error.code, error.message);
      setAuthError(error);
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    try {
      console.log('Logging in with:', email);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      setAuthError(error);
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      setAuthError(error);
      throw error;
    }
  }

  // Update profile function
  async function updateUserProfile(data) {
    if (!currentUser) return null;

    try {
      await setDoc(doc(firestore, 'userProfiles', currentUser.uid), data, { merge: true });
      setUserProfile((prev) => ({ ...prev, ...data }));
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      setAuthError(error);
      throw error;
    }
  }

  // Get user profile data
  async function fetchUserProfile(uid) {
    try {
      const docRef = doc(firestore, 'userProfiles', uid); // db की जगह firestore
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const profileData = docSnap.data();
        setUserProfile(profileData);
        return profileData;
      }

      // If no profile exists, create a default one
      const defaultProfile = {
        username: uid.substring(0, 8),
        email: currentUser?.email || '',
        createdAt: new Date().toISOString(),
      };

      try {
        await setDoc(docRef, defaultProfile);
        setUserProfile(defaultProfile);
        return defaultProfile;
      } catch (createError) {
        console.error('Error creating default profile:', createError);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
      // Important: don't throw the error here, just handle it gracefully
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
      setCurrentUser(user);

      if (user) {
        try {
          await fetchUserProfile(user.uid);
        } catch (error) {
          console.error('Error in auth state change:', error);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      authError,
      login,
      signup,
      logout,
      updateUserProfile,
      fetchUserProfile,
      loading,
    }),
    [currentUser, userProfile, loading, authError],
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <CircularProgress color="error" />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
