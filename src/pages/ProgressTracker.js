import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Snackbar,
  Alert,
  alpha,
  Chip,
  Stack,
  Divider,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  Delete,
  CalendarMonth,
  FitnessCenter,
  TrendingUp,
  Timeline,
  MonitorWeight,
  Check,
  WatchLater,
  LocalFireDepartment,
  Speed,
  Whatshot,
  EmojiEvents,
  DirectionsRun,
  AccessibilityNew,
  DirectionsWalk,
} from '@mui/icons-material';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  isValid,
  differenceInDays,
  addDays,
} from 'date-fns';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  AreaChart,
  Area,
} from 'recharts';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

// Global styles में अधिक explicit रूप से width force करें
const globalStyles = {
  '.recharts-wrapper': {
    maxWidth: 'none !important',
    width: '100% !important', // Force width to be 100%
  },
  '.recharts-surface': {
    width: '100% !important', // Force SVG width to be 100%
  },
  '.recharts-responsive-container': {
    width: '100% !important',
    maxWidth: 'none !important',
  },
  '.MuiCardContent-root': {
    width: '100%',
  },
};

// TabPanel Component with Animations
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progress-tabpanel-${index}`}
      aria-labelledby={`progress-tab-${index}`}
      {...other}
    >
      {value === index && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ py: 3 }}>{children}</Box>
        </motion.div>
      )}
    </div>
  );
};

// StatsCard Component
const StatsCard = ({ icon, title, value, subtitle, color, trend, trendValue }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.15)} 100%)`,
        border: '1px solid',
        borderColor: alpha(theme.palette[color].main, 0.2),
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5, height: '100%' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: `${color}.main` }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 3,
              bgcolor: alpha(theme.palette[color].main, 0.15),
              color: theme.palette[color].main,
            }}
          >
            {icon}
          </Box>
        </Box>

        {trend && (
          <Box
            sx={{
              mt: 1.5,
              display: 'flex',
              alignItems: 'center',
              color:
                trendValue > 0
                  ? trend === 'positive'
                    ? 'success.main'
                    : 'error.main'
                  : trendValue < 0
                    ? trend === 'positive'
                      ? 'error.main'
                      : 'success.main'
                    : 'text.secondary',
            }}
          >
            {trendValue !== 0 && (
              <>
                {(trend === 'positive' && trendValue > 0) ||
                (trend === 'negative' && trendValue < 0) ? (
                  <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                ) : (
                  <TrendingUp fontSize="small" sx={{ mr: 0.5, transform: 'rotate(180deg)' }} />
                )}
                <Typography variant="body2" fontWeight={500}>
                  {trendValue > 0 ? '+' : ''}
                  {trendValue}
                </Typography>
              </>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Main Component
const ProgressTracker = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [weightData, setWeightData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [workoutNote, setWorkoutNote] = useState('');
  const [workoutType, setWorkoutType] = useState('strength');
  const [intensity, setIntensity] = useState('medium');
  const [workoutCompleted, setWorkoutCompleted] = useState(true);
  const [duration, setDuration] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dateFormatted, setDateFormatted] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteType, setDeleteType] = useState('');

  const db = database;

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const weightRef = ref(db, `userProgress/${currentUser.uid}/weight`);
      const workoutRef = ref(db, `userProgress/${currentUser.uid}/workouts`);

      onValue(weightRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const weightEntries = Object.keys(data).map((key) => ({
            id: key,
            date: data[key].date,
            weight: data[key].weight,
            formattedDate: format(parseISO(data[key].date), 'MMM dd, yyyy'),
          }));

          weightEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
          setWeightData(weightEntries);
        } else {
          setWeightData([]);
        }
        setIsLoading(false);
      });

      onValue(
        workoutRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const workoutEntries = Object.keys(data).map((key) => ({
              id: key,
              date: data[key].date,
              type: data[key].type,
              completed: data[key].completed,
              duration: data[key].duration,
              intensity: data[key].intensity,
              note: data[key].note,
              formattedDate: format(parseISO(data[key].date), 'MMM dd, yyyy'),
            }));

            workoutEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
            setWorkoutData(workoutEntries);
          } else {
            setWorkoutData([]);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Database error:', error);
          setIsLoading(false);
          showSnackbar('Failed to load data. Please try again.', 'error');
        },
      );
    }
  }, [currentUser, db]);

  useEffect(() => {
    if (selectedDate) {
      setDateFormatted(format(selectedDate, 'yyyy-MM-dd'));
    }
  }, [selectedDate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddWeight = () => {
    if (!newWeight || isNaN(parseFloat(newWeight)) || parseFloat(newWeight) <= 0) {
      showSnackbar('Please enter a valid weight', 'error');
      return;
    }

    if (!selectedDate || !isValid(selectedDate)) {
      showSnackbar('Please select a valid date', 'error');
      return;
    }

    if (!currentUser) {
      showSnackbar('Please sign in to add weight data', 'error');
      return;
    }

    const date = format(selectedDate, 'yyyy-MM-dd');
    const existingEntry = weightData.find((entry) => entry.date === date);

    try {
      if (existingEntry) {
        // Update existing entry
        update(ref(db, `userProgress/${currentUser.uid}/weight/${existingEntry.id}`), {
          weight: parseFloat(newWeight),
          date,
        })
          .then(() => {
            showSnackbar('Weight updated successfully', 'success');
            setNewWeight('');
          })
          .catch((error) => {
            showSnackbar(`Error: ${error.message}`, 'error');
          });
      } else {
        // Add new entry
        push(ref(db, `userProgress/${currentUser.uid}/weight`), {
          weight: parseFloat(newWeight),
          date,
        })
          .then(() => {
            showSnackbar('Weight added successfully', 'success');
            setNewWeight('');
          })
          .catch((error) => {
            showSnackbar(`Error: ${error.message}`, 'error');
          });
      }
    } catch (error) {
      showSnackbar(`Critical Error: ${error.message}`, 'error');
    }
  };

  const handleAddWorkout = () => {
    if (!selectedDate || !isValid(selectedDate)) {
      showSnackbar('Please select a valid date', 'error');
      return;
    }

    if (!duration || isNaN(parseInt(duration)) || parseInt(duration) <= 0) {
      showSnackbar('Please enter a valid duration', 'error');
      return;
    }

    const date = format(selectedDate, 'yyyy-MM-dd');
    const existingEntry = workoutData.find((entry) => entry.date === date);

    try {
      if (existingEntry) {
        update(ref(db, `userProgress/${currentUser.uid}/workouts/${existingEntry.id}`), {
          date,
          type: workoutType,
          completed: workoutCompleted,
          duration: parseInt(duration),
          intensity,
          note: workoutNote,
        })
          .then(() => {
            showSnackbar('Workout updated successfully', 'success');
            resetWorkoutForm();
          })
          .catch((error) => {
            showSnackbar(`Error: ${error.message}`, 'error');
          });
      } else {
        push(ref(db, `userProgress/${currentUser.uid}/workouts`), {
          date,
          type: workoutType,
          completed: workoutCompleted,
          duration: parseInt(duration),
          intensity,
          note: workoutNote,
        })
          .then(() => {
            showSnackbar('Workout added successfully', 'success');
            resetWorkoutForm();
          })
          .catch((error) => {
            showSnackbar(`Error: ${error.message}`, 'error');
          });
      }
    } catch (error) {
      showSnackbar(`Critical Error: ${error.message}`, 'error');
    }
  };

  const resetWorkoutForm = () => {
    setWorkoutNote('');
    setIntensity('medium');
    setDuration('');
    setWorkoutCompleted(true);
  };

  const handleDeleteEntry = (id, type) => {
    setSelectedEntryId(id);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedEntryId) return;

    try {
      if (deleteType === 'weight') {
        remove(ref(db, `userProgress/${currentUser.uid}/weight/${selectedEntryId}`))
          .then(() => {
            showSnackbar('Weight entry deleted successfully', 'success');
            setDeleteDialogOpen(false);
          })
          .catch((error) => {
            showSnackbar(`Error: ${error.message}`, 'error');
          });
      } else if (deleteType === 'workout') {
        remove(ref(db, `userProgress/${currentUser.uid}/workouts/${selectedEntryId}`))
          .then(() => {
            showSnackbar('Workout entry deleted successfully', 'success');
            setDeleteDialogOpen(false);
          })
          .catch((error) => {
            showSnackbar(`Error: ${error.message}`, 'error');
          });
      }
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Helper function to get workout icon based on type
  const getWorkoutIcon = (type, props = {}) => {
    switch (type) {
      case 'strength':
        return <FitnessCenter {...props} />;
      case 'cardio':
        return <DirectionsRun {...props} />;
      case 'yoga':
        return <AccessibilityNew {...props} />;
      case 'hiit':
        return <Whatshot {...props} />;
      case 'walking':
        return <DirectionsWalk {...props} />;
      default:
        return <FitnessCenter {...props} />;
    }
  };

  // Helper function to get intensity color
  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getWeeklyWorkoutStats = () => {
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
    const daysInWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });

    const weeklyWorkouts = daysInWeek.map((day) => {
      const formattedDay = format(day, 'yyyy-MM-dd');
      const workoutEntry = workoutData.find((w) => w.date === formattedDay);

      return {
        date: format(day, 'EEE'),
        dayDate: formattedDay,
        count: workoutEntry && workoutEntry.completed ? workoutEntry.duration : 0,
        completed: workoutEntry ? workoutEntry.completed : false,
        intensity: workoutEntry ? workoutEntry.intensity : null,
        type: workoutEntry ? workoutEntry.type : null,
        isToday: format(new Date(), 'yyyy-MM-dd') === formattedDay,
      };
    });

    return weeklyWorkouts;
  };

  const getMonthlyWorkoutCount = () => {
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = format(date, 'yyyy-MM-dd');

      const workoutsOnDay = workoutData.filter((w) => w.date === formattedDate && w.completed);

      last30Days.push({
        date: formattedDate,
        day: format(date, 'MMM dd'),
        count: workoutsOnDay.length,
        completed: workoutsOnDay.length > 0,
        totalMinutes: workoutsOnDay.reduce((sum, w) => sum + (w.duration || 0), 0),
      });
    }

    return last30Days;
  };

  const WeightTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {payload[0].payload.formattedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Weight:</strong> {payload[0].value} kg
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const WorkoutTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {payload[0].payload.day}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Duration:</strong> {payload[0].payload.totalMinutes} minutes
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const weightStats = useMemo(() => {
    if (weightData.length === 0) return { current: 0, lowest: 0, highest: 0, change: 0 };

    const weights = weightData.map((d) => d.weight);
    const currentWeight = weights[0] || 0;
    const lowestWeight = Math.min(...weights);
    const highestWeight = Math.max(...weights);
    const oldestWeight = weightData[weightData.length - 1]?.weight || currentWeight;
    const change = currentWeight - oldestWeight;

    return {
      current: currentWeight,
      lowest: lowestWeight,
      highest: highestWeight,
      change,
    };
  }, [weightData]);

  const workoutStats = useMemo(() => {
    if (workoutData.length === 0) return { total: 0, completed: 0, streak: 0, avgDuration: 0 };

    const completedWorkouts = workoutData.filter((w) => w.completed);
    const totalMinutes = completedWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const avgDuration =
      completedWorkouts.length > 0 ? Math.round(totalMinutes / completedWorkouts.length) : 0;

    // Calculate current streak
    let streak = 0;
    const today = new Date();
    const seenDates = new Set();

    // Add all completed workout dates to a set
    workoutData.forEach((workout) => {
      if (workout.completed) {
        seenDates.add(workout.date);
      }
    });

    // Check consecutive days backward from today
    let checkDate = today;
    while (true) {
      const formattedDate = format(checkDate, 'yyyy-MM-dd');
      if (seenDates.has(formattedDate)) {
        streak++;
        checkDate = addDays(checkDate, -1);
      } else {
        // Allow one day gap if not today
        if (
          format(checkDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ||
          !seenDates.has(format(addDays(checkDate, -1), 'yyyy-MM-dd'))
        ) {
          break;
        }
        checkDate = addDays(checkDate, -1);
      }
    }

    return {
      total: workoutData.length,
      completed: completedWorkouts.length,
      streak,
      avgDuration,
    };
  }, [workoutData]);

  // Enhanced UI rendering
  return (
    <motion.div>
      <Box sx={{ ...globalStyles }}>
        <Box
          sx={{
            mt: { lg: '96px', xs: '60px' },
            p: { lg: 5, xs: 2 },
            background:
              'linear-gradient(135deg, rgba(250,250,252,0.95) 0%, rgba(245,247,250,0.95) 100%)',
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
            Progress Tracker
          </Typography>

          <Typography
            variant="h6"
            mb={5}
            textAlign="center"
            color="text.secondary"
            fontWeight="400"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Track your fitness journey and visualize your progress over time
          </Typography>

          {!currentUser ? (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                textAlign: 'center',
                borderRadius: 4,
                maxWidth: 600,
                mx: 'auto',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h5" mb={2}>
                Please login to track your progress
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/login"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                  boxShadow: '0 10px 20px -10px rgba(229, 57, 53, 0.5)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    boxShadow: '0 15px 25px -10px rgba(229, 57, 53, 0.6)',
                    background: 'linear-gradient(90deg, #d32f2f 0%, #f44336 100%)',
                  },
                }}
              >
                Login to Track Progress
              </Button>
            </Paper>
          ) : (
            <Container maxWidth="xl">
              {' '}
              {/* lg से xl करें - ताकि ग्राफ्स के लिए अधिक स्पेस मिले */}
              {isLoading ? (
                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((item) => (
                      <Grid item xs={12} sm={6} md={3} key={item}>
                        <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
                      </Grid>
                    ))}
                  </Grid>
                  <Skeleton variant="rounded" height={400} sx={{ mt: 4, borderRadius: 4 }} />
                </Box>
              ) : (
                <>
                  {/* Top Stats Cards */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatsCard
                        icon={<MonitorWeight fontSize="large" />}
                        title="Current Weight"
                        value={`${weightStats.current || 0} kg`}
                        color="primary"
                        trend="negative"
                        trendValue={weightStats.change}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatsCard
                        icon={<EmojiEvents fontSize="large" />}
                        title="Workout Streak"
                        value={`${workoutStats.streak} days`}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatsCard
                        icon={<WatchLater fontSize="large" />}
                        title="Average Duration"
                        value={`${workoutStats.avgDuration} min`}
                        color="info"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatsCard
                        icon={<Check fontSize="large" />}
                        title="Completed Workouts"
                        value={workoutStats.completed}
                        subtitle={`of ${workoutStats.total} total`}
                        color="warning"
                      />
                    </Grid>
                  </Grid>

                  {/* Main Content Area with Tabs */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 3 },
                      borderRadius: 4,
                      mt: 4,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.5)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{
                        mb: 3,
                        '& .MuiTabs-indicator': {
                          backgroundColor: 'primary.main',
                          height: 3,
                          borderRadius: '6px',
                        },
                        '& .Mui-selected': {
                          color: 'primary.main',
                          fontWeight: 700,
                          fontSize: '1.05rem',
                        },
                      }}
                    >
                      <Tab
                        icon={<MonitorWeight sx={{ mr: 1 }} />}
                        label="Weight"
                        iconPosition="start"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.95rem' },
                          textTransform: 'none',
                        }}
                      />
                      <Tab
                        icon={<FitnessCenter sx={{ mr: 1 }} />}
                        label="Workouts"
                        iconPosition="start"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.95rem' },
                          textTransform: 'none',
                        }}
                      />
                      <Tab
                        icon={<TrendingUp sx={{ mr: 1 }} />}
                        label="Analytics"
                        iconPosition="start"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.95rem' },
                          textTransform: 'none',
                        }}
                      />
                    </Tabs>

                    {/* Weight Tab */}
                    <TabPanel value={tabValue} index={0}>
                      <Grid container spacing={3}>
                        {/* Left section for inputs and recent entries - 50% width */}
                        <Grid item xs={12} md={6}>
                          <Stack spacing={3}>
                            {/* Weight input card */}
                            <Card
                              elevation={0}
                              sx={{
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'visible',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                '&:hover': {
                                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                  transform: 'translateY(-3px)',
                                },
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  mb={3}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <MonitorWeight sx={{ mr: 1 }} /> Log Your Weight
                                </Typography>

                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <TextField
                                      label="Date"
                                      type="date"
                                      value={selectedDateStr}
                                      onChange={(e) => {
                                        setSelectedDateStr(e.target.value);
                                        if (isValid(new Date(e.target.value))) {
                                          setSelectedDate(new Date(e.target.value));
                                        }
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonth />
                                          </InputAdornment>
                                        ),
                                      }}
                                      fullWidth
                                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      label="Weight (kg)"
                                      type="number"
                                      value={newWeight}
                                      onChange={(e) => setNewWeight(e.target.value)}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">kg</InputAdornment>
                                        ),
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <MonitorWeight />
                                          </InputAdornment>
                                        ),
                                      }}
                                      fullWidth
                                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                  </Grid>

                                  <Grid item xs={12}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      fullWidth
                                      onClick={handleAddWeight}
                                      startIcon={<Add />}
                                      sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        background:
                                          'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                                        boxShadow: '0 4px 15px rgba(229, 57, 53, 0.3)',
                                        textTransform: 'none',
                                        fontSize: '1.05rem',
                                        fontWeight: 600,
                                        '&:hover': {
                                          boxShadow: '0 6px 20px rgba(229, 57, 53, 0.4)',
                                          background:
                                            'linear-gradient(90deg, #d32f2f 0%, #f44336 100%)',
                                        },
                                      }}
                                    >
                                      {weightData.find((entry) => entry.date === dateFormatted)
                                        ? 'Update Weight'
                                        : 'Add Weight'}
                                    </Button>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>

                            {/* Recent Entries Card */}
                            <Card
                              elevation={0}
                              sx={{
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'visible',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                display: { xs: 'none', md: 'block' },
                                '&:hover': {
                                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                  transform: 'translateY(-3px)',
                                },
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  mb={3}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <MonitorWeight sx={{ mr: 1 }} /> Recent Entries
                                </Typography>

                                {weightData.length === 0 ? (
                                  <Box
                                    sx={{
                                      py: 4,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <MonitorWeight
                                      sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }}
                                    />
                                    <Typography color="text.secondary" textAlign="center">
                                      No weight records yet.
                                      <br />
                                      Start tracking your progress!
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Stack
                                    spacing={1.5}
                                    sx={{ maxHeight: 380, overflowY: 'auto', pr: 1 }}
                                  >
                                    {weightData.slice(0, 6).map((entry) => (
                                      <Card
                                        key={entry.id}
                                        variant="outlined"
                                        sx={{
                                          borderRadius: 2,
                                          borderLeft: '4px solid',
                                          borderLeftColor: 'primary.main',
                                          transition: 'all 0.2s ease',
                                          '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            transform: 'translateY(-2px)',
                                          },
                                        }}
                                      >
                                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                          <Grid container alignItems="center" spacing={1}>
                                            <Grid item xs={2}>
                                              <Box
                                                sx={{
                                                  width: 36,
                                                  height: 36,
                                                  borderRadius: 2,
                                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                  color: theme.palette.primary.main,
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                }}
                                              >
                                                <MonitorWeight fontSize="small" />
                                              </Box>
                                            </Grid>

                                            <Grid item xs={7}>
                                              <Typography variant="body1" fontWeight={600}>
                                                {entry.weight} kg
                                              </Typography>
                                              <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ fontSize: '0.8rem' }}
                                              >
                                                {entry.formattedDate}
                                              </Typography>
                                            </Grid>

                                            <Grid
                                              item
                                              xs={3}
                                              sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                              }}
                                            >
                                              <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                  handleDeleteEntry(entry.id, 'weight')
                                                }
                                              >
                                                <Delete fontSize="small" />
                                              </IconButton>
                                            </Grid>
                                          </Grid>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </Stack>
                                )}
                              </CardContent>
                            </Card>
                          </Stack>
                        </Grid>

                        {/* Right section for chart - 50% width */}
                        <Grid item xs={12} md={6}>
                          <Stack spacing={3}>
                            {/* Weight Progress Chart */}
                            <Card
                              elevation={0}
                              sx={{
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                '&:hover': {
                                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                  transform: 'translateY(-3px)',
                                },
                              }}
                            >
                              <CardContent
                                sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                              >
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  mb={3}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <Timeline sx={{ mr: 1 }} /> Weight Progress Chart
                                </Typography>

                                <Box
                                  sx={{
                                    flexGrow: 1,
                                    width: '100%',
                                    height: { xs: '300px', sm: '400px', md: '500px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {weightData.length === 0 ? (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        width: '100%',
                                      }}
                                    >
                                      <Timeline
                                        sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
                                      />
                                      <Typography color="text.secondary" textAlign="center">
                                        No weight data available yet.
                                        <br />
                                        Start tracking to see your progress!
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart
                                        data={[...weightData].reverse()}
                                        margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                          dataKey="formattedDate"
                                          angle={-45}
                                          textAnchor="end"
                                          height={70}
                                          tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                          domain={['dataMin - 2', 'dataMax + 2']}
                                          label={{
                                            value: 'Weight (kg)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            style: { textAnchor: 'middle' },
                                          }}
                                        />
                                        <Tooltip content={<WeightTooltip />} />
                                        <ReferenceLine
                                          y={weightStats.current}
                                          label={{
                                            position: 'right',
                                            value: 'Current',
                                            fill: '#3f51b5',
                                            fontSize: 12,
                                          }}
                                          stroke="#3f51b5"
                                          strokeDasharray="3 3"
                                        />
                                        <ReferenceLine
                                          y={weightData[weightData.length - 1]?.weight}
                                          label={{
                                            position: 'left',
                                            value: 'Start',
                                            fill: '#4caf50',
                                            fontSize: 12,
                                          }}
                                          stroke="#4caf50"
                                          strokeDasharray="3 3"
                                        />
                                        <Line
                                          type="monotone"
                                          dataKey="weight"
                                          stroke="#e53935"
                                          strokeWidth={3}
                                          dot={{ r: 4 }}
                                          activeDot={{ r: 8 }}
                                        />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  )}
                                </Box>

                                {weightData.length > 0 && (
                                  <Grid container spacing={3} sx={{ mt: 3 }}>
                                    <Grid item xs={4}>
                                      <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          gutterBottom
                                        >
                                          Weight Range
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600}>
                                          {weightStats.lowest} - {weightStats.highest} kg
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          gutterBottom
                                        >
                                          Net Change
                                        </Typography>
                                        <Typography
                                          variant="h6"
                                          fontWeight={600}
                                          color={
                                            weightStats.change >= 0 ? 'error.main' : 'success.main'
                                          }
                                        >
                                          {weightStats.change > 0 ? '+' : ''}
                                          {weightStats.change} kg
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          gutterBottom
                                        >
                                          Current Weight
                                        </Typography>
                                        <Typography
                                          variant="h6"
                                          fontWeight={600}
                                          color="primary.main"
                                        >
                                          {weightStats.current} kg
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                )}
                              </CardContent>
                            </Card>

                            {/* Recent entries for mobile view */}
                            <Card
                              elevation={0}
                              sx={{
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'visible',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease',
                                display: { xs: 'block', md: 'none' },
                                '&:hover': {
                                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                  transform: 'translateY(-3px)',
                                },
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  mb={3}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <MonitorWeight sx={{ mr: 1 }} /> Recent Entries
                                </Typography>

                                {weightData.length === 0 ? (
                                  <Box
                                    sx={{
                                      py: 4,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <MonitorWeight
                                      sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }}
                                    />
                                    <Typography color="text.secondary" textAlign="center">
                                      No weight records yet.
                                      <br />
                                      Start tracking your progress!
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Stack
                                    spacing={1.5}
                                    sx={{ maxHeight: 380, overflowY: 'auto', pr: 1 }}
                                  >
                                    {weightData.slice(0, 6).map((entry) => (
                                      <Card
                                        key={entry.id}
                                        variant="outlined"
                                        sx={{
                                          borderRadius: 2,
                                          borderLeft: '4px solid',
                                          borderLeftColor: 'primary.main',
                                          transition: 'all 0.2s ease',
                                          '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            transform: 'translateY(-2px)',
                                          },
                                        }}
                                      >
                                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                          <Grid container alignItems="center" spacing={1}>
                                            <Grid item xs={2}>
                                              <Box
                                                sx={{
                                                  width: 36,
                                                  height: 36,
                                                  borderRadius: 2,
                                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                  color: theme.palette.primary.main,
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                }}
                                              >
                                                <MonitorWeight fontSize="small" />
                                              </Box>
                                            </Grid>

                                            <Grid item xs={7}>
                                              <Typography variant="body1" fontWeight={600}>
                                                {entry.weight} kg
                                              </Typography>
                                              <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ fontSize: '0.8rem' }}
                                              >
                                                {entry.formattedDate}
                                              </Typography>
                                            </Grid>

                                            <Grid
                                              item
                                              xs={3}
                                              sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                              }}
                                            >
                                              <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                  handleDeleteEntry(entry.id, 'weight')
                                                }
                                              >
                                                <Delete fontSize="small" />
                                              </IconButton>
                                            </Grid>
                                          </Grid>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </Stack>
                                )}
                              </CardContent>
                            </Card>
                          </Stack>
                        </Grid>
                      </Grid>
                    </TabPanel>

                    {/* Workouts Tab */}
                    <TabPanel value={tabValue} index={1}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          {/* Workout Input Form */}
                          <Card
                            elevation={0}
                            sx={{
                              borderRadius: 3,
                              border: '1px solid',
                              borderColor: 'divider',
                              overflow: 'visible',
                              mb: 4,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                transform: 'translateY(-3px)',
                              },
                            }}
                          >
                            <CardContent>
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                mb={2}
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <FitnessCenter sx={{ mr: 1 }} /> Log Your Workout
                              </Typography>

                              <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Date"
                                    type="date"
                                    value={selectedDateStr}
                                    onChange={(e) => {
                                      setSelectedDateStr(e.target.value);
                                      if (isValid(new Date(e.target.value))) {
                                        setSelectedDate(new Date(e.target.value));
                                      }
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <CalendarMonth />
                                        </InputAdornment>
                                      ),
                                    }}
                                    fullWidth
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                  />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <FormControl
                                    fullWidth
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                  >
                                    <InputLabel>Workout Type</InputLabel>
                                    <Select
                                      value={workoutType}
                                      label="Workout Type"
                                      onChange={(e) => setWorkoutType(e.target.value)}
                                    >
                                      <MenuItem value="strength">💪 Strength Training</MenuItem>
                                      <MenuItem value="cardio">🏃 Cardio</MenuItem>
                                      <MenuItem value="yoga">🧘 Yoga/Flexibility</MenuItem>
                                      <MenuItem value="hiit">🔥 HIIT</MenuItem>
                                      <MenuItem value="walking">👣 Walking/Running</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <FormControl
                                    fullWidth
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                  >
                                    <InputLabel>Intensity</InputLabel>
                                    <Select
                                      value={intensity}
                                      label="Intensity"
                                      onChange={(e) => setIntensity(e.target.value)}
                                    >
                                      <MenuItem value="low">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Speed sx={{ mr: 1, color: 'success.main' }} /> Low
                                        </Box>
                                      </MenuItem>
                                      <MenuItem value="medium">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Speed sx={{ mr: 1, color: 'warning.main' }} /> Medium
                                        </Box>
                                      </MenuItem>
                                      <MenuItem value="high">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Speed sx={{ mr: 1, color: 'error.main' }} /> High
                                        </Box>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                  <TextField
                                    label="Duration (minutes)"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    type="number"
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">minutes</InputAdornment>
                                      ),
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <WatchLater />
                                        </InputAdornment>
                                      ),
                                    }}
                                    fullWidth
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                  />
                                </Grid>

                                <Grid item xs={12}>
                                  <TextField
                                    label="Notes (optional)"
                                    value={workoutNote}
                                    onChange={(e) => setWorkoutNote(e.target.value)}
                                    multiline
                                    rows={2}
                                    fullWidth
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                  />
                                </Grid>

                                <Grid item xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={workoutCompleted}
                                        onChange={(e) => setWorkoutCompleted(e.target.checked)}
                                        color="success"
                                      />
                                    }
                                    label="Workout Completed"
                                    sx={{
                                      '& .MuiFormControlLabel-label': {
                                        fontWeight: 500,
                                        color: workoutCompleted ? 'success.main' : 'text.secondary',
                                      },
                                    }}
                                  />
                                </Grid>

                                <Grid item xs={12}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleAddWorkout}
                                    startIcon={<Add />}
                                    sx={{
                                      py: 1.5,
                                      borderRadius: 2,
                                      background:
                                        'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                                      boxShadow: '0 4px 15px rgba(229, 57, 53, 0.3)',
                                      textTransform: 'none',
                                      fontSize: '1.05rem',
                                      fontWeight: 600,
                                      '&:hover': {
                                        boxShadow: '0 6px 20px rgba(229, 57, 53, 0.4)',
                                        background:
                                          'linear-gradient(90deg, #d32f2f 0%, #f44336 100%)',
                                      },
                                    }}
                                  >
                                    {workoutData.find((entry) => entry.date === dateFormatted)
                                      ? 'Update Workout'
                                      : 'Add Workout'}
                                  </Button>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>

                        {/* Recent Workouts */}
                        <Grid item xs={12} md={6}>
                          <Card
                            elevation={0}
                            sx={{
                              height: '100%',
                              borderRadius: 3,
                              border: '1px solid',
                              borderColor: 'divider',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                transform: 'translateY(-3px)',
                              },
                            }}
                          >
                            <CardContent>
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                mb={3}
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <FitnessCenter sx={{ mr: 1 }} /> Recent Workouts
                              </Typography>

                              {workoutData.length === 0 ? (
                                <Box
                                  sx={{
                                    py: 6,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <FitnessCenter
                                    sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
                                  />
                                  <Typography color="text.secondary" textAlign="center">
                                    No workouts logged yet.
                                    <br />
                                    Start tracking your fitness activity!
                                  </Typography>
                                </Box>
                              ) : (
                                <Stack
                                  spacing={2}
                                  sx={{ maxHeight: 500, overflowY: 'auto', pr: 1 }}
                                >
                                  {workoutData.slice(0, 10).map((workout) => (
                                    <Card
                                      key={workout.id}
                                      variant="outlined"
                                      sx={{
                                        borderRadius: 2,
                                        borderLeft: '4px solid',
                                        borderLeftColor: workout.completed
                                          ? 'success.main'
                                          : 'warning.main',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                          transform: 'translateY(-2px)',
                                        },
                                      }}
                                    >
                                      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2 } }}>
                                        <Grid container spacing={2}>
                                          <Grid item xs={2} sm={1}>
                                            <Box
                                              sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 2,
                                                bgcolor: alpha(
                                                  theme.palette[
                                                    getIntensityColor(workout.intensity)
                                                  ].main,
                                                  0.1,
                                                ),
                                                color:
                                                  theme.palette[
                                                    getIntensityColor(workout.intensity)
                                                  ].main,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                              }}
                                            >
                                              {getWorkoutIcon(workout.type, { fontSize: 'medium' })}
                                            </Box>
                                          </Grid>

                                          <Grid item xs={10} sm={7}>
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                              }}
                                            >
                                              <Typography variant="subtitle1" fontWeight={600}>
                                                {workout.type.charAt(0).toUpperCase() +
                                                  workout.type.slice(1)}
                                              </Typography>
                                              <Chip
                                                label={`${workout.duration} min`}
                                                size="small"
                                                color={
                                                  workout.duration > 45 ? 'success' : 'primary'
                                                }
                                                sx={{ fontWeight: 500 }}
                                              />
                                              <Chip
                                                label={
                                                  workout.intensity.charAt(0).toUpperCase() +
                                                  workout.intensity.slice(1)
                                                }
                                                size="small"
                                                color={getIntensityColor(workout.intensity)}
                                                variant="outlined"
                                                sx={{ fontWeight: 500 }}
                                              />
                                            </Box>

                                            <Typography
                                              variant="body2"
                                              color="text.secondary"
                                              sx={{ mt: 0.5 }}
                                            >
                                              {workout.formattedDate}
                                            </Typography>

                                            {workout.note && (
                                              <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                  mt: 1,
                                                  fontStyle: 'italic',
                                                  display: '-webkit-box',
                                                  WebkitLineClamp: 2,
                                                  WebkitBoxOrient: 'vertical',
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                "{workout.note}"
                                              </Typography>
                                            )}
                                          </Grid>

                                          <Grid item xs={10} sm={3}>
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: {
                                                  xs: 'flex-start',
                                                  sm: 'flex-end',
                                                },
                                                height: '100%',
                                              }}
                                            >
                                              <Chip
                                                label={
                                                  workout.completed ? 'Completed' : 'Not Completed'
                                                }
                                                color={workout.completed ? 'success' : 'warning'}
                                                sx={{ fontWeight: 500 }}
                                              />
                                            </Box>
                                          </Grid>

                                          <Grid
                                            item
                                            xs={2}
                                            sm={1}
                                            sx={{
                                              display: 'flex',
                                              justifyContent: 'flex-end',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <IconButton
                                              size="small"
                                              color="error"
                                              onClick={() =>
                                                handleDeleteEntry(workout.id, 'workout')
                                              }
                                              sx={{
                                                background: alpha(theme.palette.error.main, 0.1),
                                                '&:hover': {
                                                  background: alpha(theme.palette.error.main, 0.2),
                                                },
                                              }}
                                            >
                                              <Delete fontSize="small" />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </Stack>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </TabPanel>

                    {/* Analytics Tab */}
                    <TabPanel value={tabValue} index={2}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Full-width top card */}
                        <Card
                          elevation={0}
                          sx={{
                            width: '100%',
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                              transform: 'translateY(-3px)',
                            },
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              mb={2}
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              <MonitorWeight sx={{ mr: 1 }} /> Weight Trend Analysis
                            </Typography>

                            <Box sx={{ height: 380, width: '100%' }}>
                              {weightData.length === 0 ? (
                                <Box
                                  sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <MonitorWeight
                                    sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
                                  />
                                  <Typography color="text.secondary" textAlign="center">
                                    No weight data available yet.
                                    <br />
                                    Start tracking to see your progress!
                                  </Typography>
                                </Box>
                              ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart
                                    data={[...weightData].reverse()}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }} // Left margin को बढ़ाया
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                      dataKey="formattedDate"
                                      angle={-45}
                                      textAnchor="end"
                                      height={70}
                                      tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                      domain={['dataMin - 2', 'dataMax + 2']}
                                      label={{
                                        value: 'Weight (kg)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { textAnchor: 'middle' },
                                      }}
                                    />
                                    <Tooltip content={<WeightTooltip />} />
                                    <ReferenceLine
                                      y={weightStats.current}
                                      label={{
                                        position: 'right',
                                        value: 'Current',
                                        fill: '#3f51b5',
                                        fontSize: 12,
                                      }}
                                      stroke="#3f51b5"
                                      strokeDasharray="3 3"
                                    />
                                    <ReferenceLine
                                      y={weightData[weightData.length - 1]?.weight}
                                      label={{
                                        position: 'left',
                                        value: 'Start',
                                        fill: '#4caf50',
                                        fontSize: 12,
                                      }}
                                      stroke="#4caf50"
                                      strokeDasharray="3 3"
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="weight"
                                      stroke="#e53935"
                                      strokeWidth={3}
                                      dot={{ r: 4 }}
                                      activeDot={{ r: 8 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              )}
                            </Box>

                            {weightData.length > 0 && (
                              <Grid container spacing={3} sx={{ mt: 1 }}>
                                <Grid item xs={4}>
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      Weight Change
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontWeight={600}
                                      color={
                                        weightStats.change >= 0 ? 'error.main' : 'success.main'
                                      }
                                    >
                                      {weightStats.change > 0 ? '+' : ''}
                                      {weightStats.change} kg
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={4}>
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      Average Weight
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600} color="info.main">
                                      {(
                                        weightData.reduce((acc, curr) => acc + curr.weight, 0) /
                                        weightData.length
                                      ).toFixed(1)}{' '}
                                      kg
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={4}>
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      Total Entries
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600} color="warning.main">
                                      {weightData.length} logs
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            )}
                          </CardContent>
                        </Card>

                        {/* Side by side cards */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 3,
                            mt: 3, // थोड़ा और margin-top जोड़ें
                          }}
                        >
                          {/* Left card */}
                          <Card
                            elevation={0}
                            sx={{
                              flex: 1,
                              borderRadius: 3,
                              border: '1px solid',
                              borderColor: 'divider',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                transform: 'translateY(-3px)',
                              },
                            }}
                          >
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                              {' '}
                              {/* Padding को optimize करें */}
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                mb={2}
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Timeline sx={{ mr: 1 }} /> Weekly Workout Activity
                              </Typography>
                              <Box sx={{ height: 340, width: '100%' }}>
                                {workoutData.length === 0 ? (
                                  <Box
                                    sx={{
                                      height: '100%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Timeline
                                      sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
                                    />
                                    <Typography color="text.secondary" textAlign="center">
                                      No workout data available yet.
                                      <br />
                                      Start tracking to see your activity!
                                    </Typography>
                                  </Box>
                                ) : (
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                      data={getWeeklyWorkoutStats()}
                                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }} // Right और left margins को बढ़ाया
                                    >
                                      <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f0f0f0"
                                      />
                                      <XAxis dataKey="date" />
                                      <YAxis
                                        label={{
                                          value: 'Minutes',
                                          angle: -90,
                                          position: 'insideLeft',
                                          style: { textAnchor: 'middle' },
                                        }}
                                      />
                                      <Tooltip />
                                      <Bar dataKey="count" name="Workout Minutes" fill="#e53935">
                                        {getWeeklyWorkoutStats().map((entry, index) => (
                                          <Cell
                                            key={`cell-${index}`}
                                            fill={entry.isToday ? '#e53935' : '#ff8a80'}
                                          />
                                        ))}
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                )}
                              </Box>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={4}>
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      Today
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                      {getWeeklyWorkoutStats().find((d) => d.isToday)?.count || 0}{' '}
                                      min
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={4}>
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      This Week
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                      {getWeeklyWorkoutStats().reduce(
                                        (sum, day) => sum + day.count,
                                        0,
                                      )}{' '}
                                      min
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={4}>
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      Avg/Day
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                      {Math.round(
                                        getWeeklyWorkoutStats().reduce(
                                          (sum, day) => sum + day.count,
                                          0,
                                        ) / 7,
                                      )}{' '}
                                      min
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>

                          {/* Right card */}
                          <Card
                            elevation={0}
                            sx={{
                              flex: 1,
                              borderRadius: 3,
                              border: '1px solid',
                              borderColor: 'divider',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                transform: 'translateY(-3px)',
                              },
                            }}
                          >
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                              {' '}
                              {/* Padding को optimize करें */}
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                mb={2}
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <TrendingUp sx={{ mr: 1 }} /> Monthly Activity Trend
                              </Typography>
                              <Box sx={{ height: 340, width: '100%' }}>
                                {workoutData.length === 0 ? (
                                  <Box
                                    sx={{
                                      height: '100%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <TrendingUp
                                      sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
                                    />
                                    <Typography color="text.secondary" textAlign="center">
                                      No workout data available yet.
                                      <br />
                                      Start tracking to see your activity!
                                    </Typography>
                                  </Box>
                                ) : (
                                  <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                      data={getMonthlyWorkoutCount()}
                                      margin={{ top: 10, right: 30, left: 20, bottom: 30 }} // Left और right margins को बढ़ाया
                                    >
                                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                      <XAxis
                                        dataKey="day"
                                        angle={-45}
                                        textAnchor="end"
                                        height={70}
                                        tick={{ fontSize: 10 }}
                                        interval={3}
                                      />
                                      <YAxis />
                                      <Tooltip content={<WorkoutTooltip />} />
                                      <ReferenceLine
                                        y={60}
                                        label={{
                                          position: 'right',
                                          value: 'Avg',
                                          fill: '#4caf50',
                                          fontSize: 12,
                                        }}
                                        stroke="green"
                                        strokeDasharray="3 3"
                                      />
                                      <Area
                                        type="monotone"
                                        dataKey="totalMinutes"
                                        name="Total Minutes"
                                        stroke="#ff5252"
                                        fill="#ff8a80"
                                      />
                                    </AreaChart>
                                  </ResponsiveContainer>
                                )}
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      </Box>
                    </TabPanel>
                  </Paper>
                </>
              )}
            </Container>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this entry? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={confirmDelete} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProgressTracker;
