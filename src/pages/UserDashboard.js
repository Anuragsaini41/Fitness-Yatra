import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Light (exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (exercise 3-5 days/week)' },
  { value: 'active', label: 'Active (exercise 6-7 days/week)' },
  { value: 'very-active', label: 'Very Active (intense exercise daily)' },
];

const fitnessGoals = [
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'muscle-gain', label: 'Muscle Gain' },
  { value: 'maintenance', label: 'Maintenance' },
];

const UserDashboard = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    fitnessGoal: '',
    activityLevel: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        age: userProfile.age || '',
        gender: userProfile.gender || '',
        fitnessGoal: userProfile.fitnessGoal || 'weight-loss',
        activityLevel: userProfile.activityLevel || 'moderate',
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({
        ...formData,
        updatedAt: new Date().toISOString(),
      });
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (!currentUser) {
    return (
      <Container sx={{ mt: 15, mb: 5 }}>
        <Alert severity="warning">Please log in to view your dashboard.</Alert>
      </Container>
    );
  }

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const colorVariations = [
    'linear-gradient(135deg, #FF5252 0%, #FF867C 100%)',
    'linear-gradient(135deg, #E53935 0%, #FF5252 100%)',
    'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
  ];

  // Deterministic color based on username
  const getUserColor = (name) => {
    if (!name) return colorVariations[0];
    const sumChars = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colorVariations[sumChars % colorVariations.length];
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                background: getUserColor(userProfile?.username),
                fontSize: '32px',
              }}
            >
              {getInitials(userProfile?.username)}
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {userProfile?.fullName || 'User'} {/* Changed from username to fullName */}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentUser?.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              component={Link}
              to="/workout-generator"
              variant="contained"
              sx={{
                py: 1.5,
                px: 4,
                background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                fontWeight: 600,
                fontSize: '16px',
                textTransform: 'none',
                borderRadius: '30px',
                boxShadow: '0 4px 10px rgba(229, 57, 53, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
                  boxShadow: '0 6px 15px rgba(229, 57, 53, 0.4)',
                },
              }}
            >
              Create Your Workout Plan
            </Button>
          </Box>

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'var(--dark-text)',
            }}
          >
            Your Fitness Profile
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  disabled // Add this to make it read-only
                  helperText="Username cannot be changed after signup"
                />
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 120 } }}
                  value={formData.age}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Fitness Goal"
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  margin="normal"
                >
                  {fitnessGoals.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  select
                  label="Activity Level"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  margin="normal"
                >
                  {activityLevels.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    px: 4,
                    background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                    fontWeight: 600,
                    fontSize: '16px',
                    textTransform: 'none',
                    borderRadius: '30px',
                    boxShadow: '0 4px 10px rgba(229, 57, 53, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
                      boxShadow: '0 6px 15px rgba(229, 57, 53, 0.4)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserDashboard;
