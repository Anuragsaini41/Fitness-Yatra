import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  useTheme,
  alpha,
  Zoom,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FitnessCenter,
  DirectionsRun,
  Timer,
  CheckCircle,
  EmojiEvents,
  BarChart,
  TrendingUp,
  FavoriteBorder,
  Schedule,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import workoutPlans from '../data/workoutPlans';

const WorkoutGenerator = () => {
  const { currentUser } = useAuth();
  const [level, setLevel] = useState('beginner');
  const [goal, setGoal] = useState('weight-loss');
  const [bodyType, setBodyType] = useState('mesomorph');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSession, setActiveSession] = useState(0);
  const theme = useTheme();

  // Reset component state when mounted
  useEffect(() => {
    setGeneratedPlan(null);
    setError(null);
  }, []);

  const handleGenerateWorkout = () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate loading for better UX
      setTimeout(() => {
        const selectedPlan = workoutPlans?.[level]?.[goal]?.[bodyType];

        if (!selectedPlan) {
          setError(
            'No workout plan found for the selected criteria. Please try different options.',
          );
          setGeneratedPlan(null);
        } else {
          setGeneratedPlan(selectedPlan);
          setError(null);
          setActiveSession(0);
        }

        setIsLoading(false);
      }, 1200);
    } catch (err) {
      setError('Failed to generate workout plan. Please try again.');
      setIsLoading(false);
      console.error('Error generating workout plan:', err);
    }
  };

  const levelOptions = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'New to fitness or returning after a break',
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: '6+ months of consistent training',
    },
    { value: 'advanced', label: 'Advanced', description: '2+ years of serious training' },
  ];

  const goalOptions = [
    { value: 'weight-loss', label: 'Weight Loss', description: 'Burn fat while preserving muscle' },
    { value: 'muscle-gain', label: 'Muscle Gain', description: 'Build strength and muscle size' },
    {
      value: 'maintenance',
      label: 'Maintenance',
      description: 'Maintain current physique and fitness',
    },
  ];

  const bodyTypeOptions = [
    { value: 'ectomorph', label: 'Ectomorph', description: 'Naturally thin, lean build' },
    { value: 'mesomorph', label: 'Mesomorph', description: 'Athletic, muscular build' },
    {
      value: 'endomorph',
      label: 'Endomorph',
      description: 'Broader frame, gains muscle/fat easily',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          mt: { lg: '96px', xs: '60px' },
          p: { lg: 5, xs: 2 },
          background:
            'linear-gradient(135deg, rgba(250,250,252,0.9) 0%, rgba(245,247,250,0.9) 100%)',
          borderRadius: 4,
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)',
        }}
      >
        <Typography
          variant="h3"
          mb={2}
          fontWeight="800"
          textAlign="center"
          sx={{
            background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          Personalized Workout Generator
        </Typography>

        <Typography
          variant="h6"
          mb={5}
          textAlign="center"
          color="text.secondary"
          fontWeight="400"
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Create your custom training plan based on your fitness level, goals, and body type
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 4,
            maxWidth: 1000,
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  borderColor:
                    level === 'beginner' ? theme.palette.primary.main : theme.palette.divider,
                  boxShadow:
                    level === 'beginner'
                      ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                      : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography gutterBottom variant="overline" color="text.secondary">
                    STEP 1
                  </Typography>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Experience Level
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {levelOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="500">
                            {option.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  borderColor:
                    level === 'intermediate' ? theme.palette.primary.main : theme.palette.divider,
                  boxShadow:
                    goal === 'muscle-gain'
                      ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                      : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography gutterBottom variant="overline" color="text.secondary">
                    STEP 2
                  </Typography>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Fitness Goal
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {goalOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="500">
                            {option.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  borderColor:
                    level === 'advanced' ? theme.palette.primary.main : theme.palette.divider,
                  boxShadow:
                    bodyType === 'mesomorph'
                      ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                      : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography gutterBottom variant="overline" color="text.secondary">
                    STEP 3
                  </Typography>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Body Type
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {bodyTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="500">
                            {option.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleGenerateWorkout}
                disabled={isLoading}
                sx={{
                  py: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                  boxShadow: '0 10px 20px -10px rgba(229, 57, 53, 0.5)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    boxShadow: '0 15px 25px -10px rgba(229, 57, 53, 0.6)',
                    background: 'linear-gradient(90deg, #d32f2f 0%, #f44336 100%)',
                  },
                }}
                startIcon={isLoading ? null : <FitnessCenter />}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Generate My Workout Plan'
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Zoom in={!!error}>
            <Box
              sx={{
                mt: 4,
                p: 3,
                bgcolor: alpha(theme.palette.error.main, 0.08),
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                maxWidth: 1000,
                mx: 'auto',
              }}
            >
              <Typography color="error.main" fontWeight={500}>
                {error}
              </Typography>
            </Box>
          </Zoom>
        )}

        {generatedPlan && !isLoading && (
          <Fade in={!!generatedPlan}>
            <Box sx={{ mt: 8, maxWidth: 1200, mx: 'auto' }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.5)',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 50px -20px rgba(0,0,0,0.1)',
                }}
              >
                <Box sx={{ px: 4, py: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.9),
                          width: 60,
                          height: 60,
                        }}
                      >
                        <EmojiEvents fontSize="large" />
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="overline" fontWeight={500} color="primary.main">
                        YOUR CUSTOM WORKOUT PLAN
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {generatedPlan.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        icon={<Schedule />}
                        label={`${generatedPlan.frequency}`}
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          borderRadius: 2,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box sx={{ p: 4 }}>
                  <Typography variant="body1" mb={4} sx={{ lineHeight: 1.8 }}>
                    {generatedPlan.description}
                  </Typography>

                  <Typography variant="h6" fontWeight={600} mb={3}>
                    Training Schedule
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Stepper
                      activeStep={activeSession}
                      alternativeLabel
                      nonLinear
                      sx={{
                        mb: 4,
                        '& .MuiStepLabel-label': {
                          mt: 1,
                        },
                      }}
                    >
                      {generatedPlan.sessions.map((session, index) => (
                        <Step key={session.day}>
                          <StepLabel
                            onClick={() => setActiveSession(index)}
                            sx={{ cursor: 'pointer' }}
                          >
                            {session.day}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    <Fade in key={activeSession}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                          boxShadow: `0 5px 15px -5px ${alpha(theme.palette.primary.main, 0.1)}`,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <DirectionsRun sx={{ mr: 1 }} color="primary" />
                          {generatedPlan.sessions[activeSession].name}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <List>
                          {generatedPlan.sessions[activeSession].exercises.map((exercise, i) => (
                            <ListItem
                              key={i}
                              sx={{
                                borderBottom:
                                  i < generatedPlan.sessions[activeSession].exercises.length - 1
                                    ? '1px solid rgba(0,0,0,0.05)'
                                    : 'none',
                                py: 1.5,
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                {exercise.sets ? (
                                  <FitnessCenter color="action" />
                                ) : (
                                  <Timer color="action" />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body1" fontWeight={500}>
                                    {exercise.name}
                                  </Typography>
                                }
                                secondary={
                                  exercise.sets ? (
                                    <Typography variant="body2" color="text.secondary">
                                      {exercise.sets} sets × {exercise.reps} reps
                                    </Typography>
                                  ) : (
                                    <Typography variant="body2" color="text.secondary">
                                      {exercise.duration}
                                    </Typography>
                                  )
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Card>
                    </Fade>
                  </Box>

                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Training Tips
                  </Typography>

                  <List>
                    {generatedPlan.tips.map((tip, i) => (
                      <ListItem key={i} sx={{ py: 0.75, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2">{tip}</Typography>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Box>
          </Fade>
        )}
      </Box>
    </motion.div>
  );
};

export default WorkoutGenerator;
