import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Chip,
  InputAdornment,
  CircularProgress,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Accordion,
  ListItemText,
  ListItemIcon,
  Avatar,
  Snackbar,
  Alert,
  AccordionSummary,
  AccordionDetails,
  Modal,
} from '@mui/material';

import {
  Search,
  Favorite,
  FavoriteBorder,
  Timer,
  Restaurant,
  FitnessCenter,
  CheckBox,
  EggAlt,
  EmojiFoodBeverage,
  Add,
  ExpandMore,
  DirectionsRun,
  SelfImprovement,
  SportsSoccer,
  FastfoodOutlined,
  RestaurantMenuOutlined,
} from '@mui/icons-material';

import { motion } from 'framer-motion';
import { ref, onValue, push, remove } from 'firebase/database';
import { database } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

import recipesData from '../data/recipes.json';

const MealPlanner = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [dietFilter, setDietFilter] = useState('all');
  const [caloriesFilter, setCaloriesFilter] = useState('all');

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);

  const [dietPreference, setDietPreference] = useState('vegetarian');
  const [bodyType, setBodyType] = useState('mesomorph');
  const [workoutType, setWorkoutType] = useState('strength');
  const [showDietSuggestions, setShowDietSuggestions] = useState(false);
  const [dietProfileExpanded, setDietProfileExpanded] = useState(false);

  const [showInitialForm, setShowInitialForm] = useState(true);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [workoutIntensity, setWorkoutIntensity] = useState('moderate');
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [recipeType, setRecipeType] = useState(null);

  const calculateDailyCalories = () => {
    let bmr = 0;
    if (age && weight && height) {
      bmr = 10 * weight + 6.25 * height - 5 * age;
      bmr = bmr + (currentUser?.gender === 'female' ? -161 : 5);
      const intensityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        high: 1.725,
        extreme: 1.9,
      };
      return Math.round(bmr * intensityFactors[workoutIntensity]);
    }
    return 2000;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowInitialForm(false);

    const customMealPlan = generateMealPlan();
    setSelectedMealPlan(customMealPlan);

    if (currentUser) {
      const preferencesRef = ref(database, `userMeals/${currentUser.uid}/preferences`);
      push(preferencesRef, {
        dietPreference,
        bodyType,
        workoutType,
        age,
        weight,
        height,
        workoutIntensity,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleViewMealRecipe = (mealTitle) => {
    const matchingRecipe = recipes.find((recipe) => recipe.title === mealTitle);
    if (matchingRecipe) {
      setSelectedRecipe(matchingRecipe);
      setRecipeDialogOpen(true);
    } else {
      showSnackbar('Recipe details not found for this meal', 'info');
    }
  };

  useEffect(() => {
    setRecipes(recipesData.recipes || []);

    if (currentUser) {
      setLoading(true);
      const savedRef = ref(database, `userMeals/${currentUser.uid}/savedRecipes`);
      onValue(
        savedRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const savedRecipesArray = Object.keys(data).map((key) => ({
              ...data[key],
              fbKey: key,
            }));
            setSavedRecipes(savedRecipesArray);
          } else {
            setSavedRecipes([]);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error loading saved recipes:', error);
          setLoading(false);
        },
      );
      const preferencesRef = ref(database, `userMeals/${currentUser.uid}/preferences`);
      onValue(preferencesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const preferences = Object.values(data);
          const latestPreference = preferences[preferences.length - 1];
          if (latestPreference) {
            if (latestPreference.dietPreference) setDietPreference(latestPreference.dietPreference);
            if (latestPreference.bodyType) setBodyType(latestPreference.bodyType);
            if (latestPreference.workoutType) setWorkoutType(latestPreference.workoutType);
          }
        }
      });
    }
  }, [currentUser]);

  const handleDietPreferenceChange = (event) => {
    const newPreference = event.target.checked ? 'non-vegetarian' : 'vegetarian';
    setDietPreference(newPreference);
    if (currentUser) {
      const preferencesRef = ref(database, `userMeals/${currentUser.uid}/preferences`);
      push(preferencesRef, {
        dietPreference: newPreference,
        bodyType,
        workoutType,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleBodyTypeChange = (event) => {
    setBodyType(event.target.value);
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };

  const handleGetDietSuggestions = () => {
    setShowDietSuggestions(true);
    if (currentUser) {
      const preferencesRef = ref(database, `userMeals/${currentUser.uid}/preferences`);
      push(preferencesRef, {
        dietPreference,
        bodyType,
        workoutType,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleViewRecipe = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setRecipeDialogOpen(true);
    }
  };

  const handleSaveRecipe = (recipe) => {
    if (!currentUser) {
      showSnackbar('Please login to save recipes', 'error');
      return;
    }
    const isSaved = savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id);
    if (isSaved) {
      const savedRecipe = savedRecipes.find((saved) => saved.id === recipe.id);
      if (savedRecipe && savedRecipe.fbKey) {
        remove(ref(database, `userMeals/${currentUser.uid}/savedRecipes/${savedRecipe.fbKey}`))
          .then(() => {
            showSnackbar('Recipe removed from favorites', 'success');
          })
          .catch((error) => {
            console.error('Error removing recipe:', error);
            showSnackbar('Failed to remove recipe', 'error');
          });
      }
    } else {
      push(ref(database, `userMeals/${currentUser.uid}/savedRecipes`), {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        calories: recipe.calories,
        protein: recipe.protein,
        diet: recipe.diet,
        mealType: recipe.mealType,
        savedAt: new Date().toISOString(),
      })
        .then(() => {
          showSnackbar('Recipe saved to favorites', 'success');
        })
        .catch((error) => {
          console.error('Error saving recipe:', error);
          showSnackbar('Failed to save recipe', 'error');
        });
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDietProfile = () => {
    setDietProfileExpanded(!dietProfileExpanded);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      !searchTerm || recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesDiet = true;
    if (dietFilter !== 'all' && recipe.diet) {
      matchesDiet = recipe.diet.includes(dietFilter);
    }
    let matchesCalories = true;
    if (caloriesFilter === 'under300') {
      matchesCalories = recipe.calories < 300;
    } else if (caloriesFilter === '300-500') {
      matchesCalories = recipe.calories >= 300 && recipe.calories <= 500;
    } else if (caloriesFilter === 'over500') {
      matchesCalories = recipe.calories > 500;
    }
    let matchesPreference = true;
    if (dietPreference === 'vegetarian' && recipe.diet) {
      matchesPreference = recipe.diet.includes('vegetarian');
    }
    return matchesSearch && matchesDiet && matchesCalories && matchesPreference;
  });

  const isRecipeSaved = (recipeId) => savedRecipes.some((recipe) => recipe.id === recipeId);

  const generateMealPlan = () => {
    let availableRecipes = [...recipes];

    if (dietPreference === 'vegetarian') {
      availableRecipes = availableRecipes.filter(
        (recipe) => recipe.diet && recipe.diet.includes('vegetarian'),
      );
    }

    const breakfastRecipes = availableRecipes.filter((r) => r.mealType === 'breakfast');
    const lunchRecipes = availableRecipes.filter((r) => r.mealType === 'lunch');
    const dinnerRecipes = availableRecipes.filter((r) => r.mealType === 'dinner');
    const snackRecipes = availableRecipes.filter((r) => r.mealType === 'snack');

    let breakfast,
      lunch,
      dinner,
      snacks = [];

    if (bodyType === 'ectomorph') {
      breakfast = getHighCalorieRecipe(breakfastRecipes);
      lunch = getHighProteinRecipe(lunchRecipes);
      dinner = getHighCalorieRecipe(dinnerRecipes);
      snacks = getRandomRecipes(snackRecipes, 2);
    } else if (bodyType === 'mesomorph') {
      breakfast = getBalancedRecipe(breakfastRecipes);
      lunch = getHighProteinRecipe(lunchRecipes);
      dinner = getBalancedRecipe(dinnerRecipes);
      snacks = getRandomRecipes(snackRecipes, 1);
    } else if (bodyType === 'endomorph') {
      breakfast = getLowCalorieRecipe(breakfastRecipes);
      lunch = getHighProteinLowCarbRecipe(lunchRecipes);
      dinner = getLowCalorieRecipe(dinnerRecipes);
      snacks = getRandomRecipes(snackRecipes, 1);
    }

    breakfast = breakfast ||
      getRandomRecipe(breakfastRecipes) || {
        title: 'Suggested Breakfast',
        calories: 350,
        protein: 15,
        carbs: 40,
        fat: 12,
      };

    lunch = lunch ||
      getRandomRecipe(lunchRecipes) || {
        title: 'Suggested Lunch',
        calories: 450,
        protein: 25,
        carbs: 45,
        fat: 15,
      };

    dinner = dinner ||
      getRandomRecipe(dinnerRecipes) || {
        title: 'Suggested Dinner',
        calories: 400,
        protein: 30,
        carbs: 30,
        fat: 15,
      };

    snacks = snacks.length > 0 ? snacks : [];

    if (workoutType === 'strength') {
      const highProteinRecipes = availableRecipes.filter(
        (r) => r.diet && r.diet.includes('high-protein'),
      );

      if (highProteinRecipes.length > 0) {
        if (lunchRecipes.length > 0) {
          lunch = getHighProteinRecipe(lunchRecipes) || lunch;
        }
      }
    } else if (workoutType === 'cardio') {
      if (snackRecipes.length > 0) {
        const energySnack = getRandomRecipe(
          snackRecipes.filter((r) => r.carbs > 15) || snackRecipes,
        );
        if (energySnack) {
          snacks = snacks.length > 0 ? [...snacks, energySnack] : [energySnack];
        }
      }
    }

    const validSnacks = snacks.filter(Boolean);

    const meals = [breakfast, lunch, dinner, ...validSnacks].filter(Boolean);
    const totalCalories = meals.reduce((sum, meal) => sum + (meal?.calories || 0), 0);
    const totalProtein = meals.reduce((sum, meal) => sum + (meal?.protein || 0), 0);
    const totalCarbs = meals.reduce((sum, meal) => sum + (meal?.carbs || 0), 0);
    const totalFat = meals.reduce((sum, meal) => sum + (meal?.fat || 0), 0);

    return {
      id: `custom-${Date.now()}`,
      name: `Custom ${capitalize(bodyType)} ${capitalize(workoutType)} Meal Plan`,
      description: `Personalized meal plan for your ${bodyType} body type with focus on ${workoutType} training.`,
      type: dietPreference,
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      bodyType: bodyType,
      workoutType: workoutType,
      meals: {
        breakfast: {
          title: breakfast?.title || 'Recommended Breakfast',
          calories: breakfast?.calories || 0,
          recipe: breakfast,
        },
        lunch: {
          title: lunch?.title || 'Recommended Lunch',
          calories: lunch?.calories || 0,
          recipe: lunch,
        },
        dinner: {
          title: dinner?.title || 'Recommended Dinner',
          calories: dinner?.calories || 0,
          recipe: dinner,
        },
        snacks: validSnacks.map((snack) => snack.title),
      },
    };
  };

  const getHighCalorieRecipe = (recipes) => {
    if (!recipes || recipes.length === 0) return null;
    return recipes.reduce((prev, current) => (prev.calories > current.calories ? prev : current));
  };

  const getLowCalorieRecipe = (recipes) => {
    if (!recipes || recipes.length === 0) return null;
    return recipes.reduce((prev, current) => (prev.calories < current.calories ? prev : current));
  };

  const getHighProteinRecipe = (recipes) => {
    if (!recipes || recipes.length === 0) return null;
    return recipes.reduce((prev, current) => (prev.protein > current.protein ? prev : current));
  };

  const getBalancedRecipe = (recipes) => {
    if (!recipes || recipes.length === 0) return null;
    const sortedByCalories = [...recipes].sort((a, b) => a.calories - b.calories);
    const middleIndex = Math.floor(sortedByCalories.length / 2);
    return sortedByCalories[middleIndex];
  };

  const getHighProteinLowCarbRecipe = (recipes) => {
    if (!recipes || recipes.length === 0) return null;
    const filtered = recipes.filter(
      (r) => r.protein / r.calories > 0.15 && r.carbs / r.calories < 0.3,
    );
    return filtered.length > 0 ? getRandomRecipe(filtered) : getHighProteinRecipe(recipes);
  };

  const getRandomRecipe = (recipes) => {
    if (!recipes || recipes.length === 0) return null;
    return recipes[Math.floor(Math.random() * recipes.length)];
  };

  const getRandomRecipes = (recipes, count) => {
    if (!recipes || recipes.length === 0) return [];
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
          minHeight: '80vh',
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
          Personal Meal Planner
        </Typography>

        <Modal
          open={showInitialForm}
          aria-labelledby="meal-planner-form-title"
          aria-describedby="meal-planner-form-description"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Paper
            sx={{
              width: '90%',
              maxWidth: 800,
              p: 4,
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 3,
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              id="meal-planner-form-title"
              variant="h5"
              fontWeight={600}
              textAlign="center"
              mb={3}
            >
              Customize Your Meal Plan
            </Typography>

            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={2}>
                    To create your personalized meal plan, we need a bit more information about you:
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" mr={2}>
                      Diet Preference:
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={dietPreference === 'non-vegetarian'}
                          onChange={handleDietPreferenceChange}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {dietPreference === 'vegetarian' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <RestaurantMenuOutlined
                                sx={{ color: 'success.main', mr: 0.5 }}
                                fontSize="small"
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: 'success.main', fontWeight: 600 }}
                              >
                                Vegetarian
                              </Typography>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <FastfoodOutlined
                                sx={{ color: 'error.main', mr: 0.5 }}
                                fontSize="small"
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: 'error.main', fontWeight: 600 }}
                              >
                                Non-Vegetarian
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: <InputAdornment position="end">years</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select Your Body Type:
                  </Typography>

                  <Grid container spacing={2}>
                    {[
                      {
                        type: 'ectomorph',
                        title: 'Ectomorph',
                        description: 'Naturally thin, lean build with difficulty gaining weight',
                      },
                      {
                        type: 'mesomorph',
                        title: 'Mesomorph',
                        description:
                          'Athletic build, responds well to exercise, gains muscle easily',
                      },
                      {
                        type: 'endomorph',
                        title: 'Endomorph',
                        description:
                          'Naturally higher body fat, gains muscle & fat easily, harder to lose weight',
                      },
                    ].map((type) => (
                      <Grid item xs={12} sm={4} key={type.type}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            height: '100%',
                            border: '2px solid',
                            borderColor: bodyType === type.type ? 'primary.main' : 'transparent',
                            p: 2,
                            borderRadius: 2,
                            boxShadow: bodyType === type.type ? 3 : 1,
                            transition: 'all 0.2s',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
                          }}
                          onClick={() => setBodyType(type.type)}
                        >
                          <Typography variant="h6" gutterBottom>
                            {type.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {type.description}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Workout Type</InputLabel>
                    <Select
                      value={workoutType}
                      label="Workout Type"
                      onChange={handleWorkoutTypeChange}
                      required
                    >
                      <MenuItem value="strength">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FitnessCenter fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                          Strength Training
                        </Box>
                      </MenuItem>
                      <MenuItem value="cardio">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DirectionsRun fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                          Cardio
                        </Box>
                      </MenuItem>
                      <MenuItem value="yoga">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SelfImprovement fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                          Yoga
                        </Box>
                      </MenuItem>
                      <MenuItem value="sports">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SportsSoccer fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                          Sports
                        </Box>
                      </MenuItem>
                      <MenuItem value="none">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>None</Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Workout Intensity</InputLabel>
                    <Select
                      value={workoutIntensity}
                      label="Workout Intensity"
                      onChange={(e) => setWorkoutIntensity(e.target.value)}
                      required
                    >
                      <MenuItem value="sedentary">Sedentary (little to no exercise)</MenuItem>
                      <MenuItem value="light">Light (exercise 1-3 days/week)</MenuItem>
                      <MenuItem value="moderate">Moderate (exercise 3-5 days/week)</MenuItem>
                      <MenuItem value="high">High (exercise 6-7 days/week)</MenuItem>
                      <MenuItem value="extreme">Extreme (very intense exercise daily)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                      borderRadius: 2,
                      boxShadow: '0 4px 15px rgba(229, 57, 53, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                        boxShadow: '0 6px 20px rgba(229, 57, 53, 0.4)',
                      },
                    }}
                  >
                    Generate My Meal Plan
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Modal>

        {!showInitialForm && (
          <>
            <Typography
              variant="h6"
              mb={4}
              textAlign="center"
              color="text.secondary"
              fontWeight="400"
              sx={{ maxWidth: '800px', mx: 'auto' }}
            >
              Your personalized meal plan based on your body type, age, weight, and workout
              intensity
            </Typography>

            <Container maxWidth="lg">
              {selectedMealPlan && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 4 },
                    mb: 5,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {selectedMealPlan.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {selectedMealPlan.description}
                    </Typography>

                    <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<FitnessCenter fontSize="small" />}
                        label={`${bodyType} body type`}
                        variant="outlined"
                        color="primary"
                      />

                      <Chip
                        icon={<DirectionsRun fontSize="small" />}
                        label={`${workoutType} training`}
                        variant="outlined"
                        color="primary"
                      />

                      <Chip
                        icon={
                          dietPreference === 'vegetarian' ? (
                            <RestaurantMenuOutlined fontSize="small" />
                          ) : (
                            <FastfoodOutlined fontSize="small" />
                          )
                        }
                        label={dietPreference === 'vegetarian' ? 'Vegetarian' : 'Non-vegetarian'}
                        variant="outlined"
                        color={dietPreference === 'vegetarian' ? 'success' : 'error'}
                      />

                      <Chip
                        icon={<FitnessCenter fontSize="small" />}
                        label={`${selectedMealPlan.calories} calories/day`}
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Daily Nutrition
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            bgcolor: 'rgba(229, 57, 53, 0.05)',
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Calories
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {selectedMealPlan.calories}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            kcal
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            bgcolor: 'rgba(229, 57, 53, 0.05)',
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Protein
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {selectedMealPlan.protein}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            grams
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            bgcolor: 'rgba(229, 57, 53, 0.05)',
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Carbs
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {selectedMealPlan.carbs}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            grams
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            bgcolor: 'rgba(229, 57, 53, 0.05)',
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Fat
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {selectedMealPlan.fat}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            grams
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>

                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Your Daily Meals
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmojiFoodBeverage color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6" fontWeight={600}>
                              Breakfast
                            </Typography>
                          </Box>

                          <Typography variant="body1" fontWeight={500} gutterBottom>
                            {selectedMealPlan.meals?.breakfast?.title || 'Not specified'}
                          </Typography>

                          {selectedMealPlan.meals?.breakfast?.calories && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {selectedMealPlan.meals.breakfast.calories} calories
                            </Typography>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleViewMealRecipe(selectedMealPlan.meals?.breakfast?.title)
                              }
                              startIcon={<Restaurant />}
                              sx={{ borderRadius: 2 }}
                            >
                              Show Recipe
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Restaurant color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6" fontWeight={600}>
                              Lunch
                            </Typography>
                          </Box>

                          <Typography variant="body1" fontWeight={500} gutterBottom>
                            {selectedMealPlan.meals?.lunch?.title || 'Not specified'}
                          </Typography>

                          {selectedMealPlan.meals?.lunch?.calories && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {selectedMealPlan.meals.lunch.calories} calories
                            </Typography>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleViewMealRecipe(selectedMealPlan.meals?.lunch?.title)
                              }
                              startIcon={<Restaurant />}
                              sx={{ borderRadius: 2 }}
                            >
                              Show Recipe
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Restaurant color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6" fontWeight={600}>
                              Dinner
                            </Typography>
                          </Box>

                          <Typography variant="body1" fontWeight={500} gutterBottom>
                            {selectedMealPlan.meals?.dinner?.title || 'Not specified'}
                          </Typography>

                          {selectedMealPlan.meals?.dinner?.calories && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {selectedMealPlan.meals.dinner.calories} calories
                            </Typography>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleViewMealRecipe(selectedMealPlan.meals?.dinner?.title)
                              }
                              startIcon={<Restaurant />}
                              sx={{ borderRadius: 2 }}
                            >
                              Show Recipe
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmojiFoodBeverage color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6" fontWeight={600}>
                              Snacks
                            </Typography>
                          </Box>

                          {selectedMealPlan.meals?.snacks &&
                          selectedMealPlan.meals.snacks.length > 0 ? (
                            <List dense>
                              {selectedMealPlan.meals.snacks.map((snack, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <CheckBox fontSize="small" color="primary" />
                                  </ListItemIcon>
                                  <ListItemText primary={snack} />
                                </ListItem>
                              ))}
                            </List>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No snacks specified
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setShowInitialForm(true)}
                      sx={{ borderRadius: 2 }}
                    >
                      Adjust Profile
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setTabValue(0)}
                      sx={{
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                        },
                      }}
                    >
                      Browse All Recipes
                    </Button>
                  </Box>
                </Paper>
              )}

              <Typography variant="h5" textAlign="center" mb={3} fontWeight={600}>
                Explore All Options
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.7)',
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
                      borderRadius: '3px 3px 0 0',
                    },
                    '& .Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab
                    icon={<Restaurant sx={{ mr: 1 }} />}
                    label="Recipes"
                    iconPosition="start"
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, textTransform: 'none' }}
                  />
                  {currentUser && (
                    <Tab
                      icon={<Favorite sx={{ mr: 1 }} />}
                      label="Saved"
                      iconPosition="start"
                      sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, textTransform: 'none' }}
                    />
                  )}
                </Tabs>

                <div role="tabpanel" hidden={tabValue !== 0}>
                  {tabValue === 0 && (
                    <Box>
                      <Box mb={4}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={5} md={6}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Search Indian Recipes"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Search />
                                  </InputAdornment>
                                ),
                                sx: { borderRadius: 3 },
                              }}
                            />
                          </Grid>
                          <Grid item xs={6} sm={4} md={3}>
                            <FormControl fullWidth>
                              <InputLabel>Diet Type</InputLabel>
                              <Select
                                value={dietFilter}
                                label="Diet Type"
                                onChange={(e) => setDietFilter(e.target.value)}
                              >
                                <MenuItem value="all">All Diets</MenuItem>
                                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                                <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
                                <MenuItem value="vegan">Vegan</MenuItem>
                                <MenuItem value="high-protein">High Protein</MenuItem>
                                <MenuItem value="south-indian">South Indian</MenuItem>
                                <MenuItem value="north-indian">North Indian</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <FormControl fullWidth>
                              <InputLabel>Calories</InputLabel>
                              <Select
                                value={caloriesFilter}
                                label="Calories"
                                onChange={(e) => setCaloriesFilter(e.target.value)}
                              >
                                <MenuItem value="all">All Calories</MenuItem>
                                <MenuItem value="under300">Under 300</MenuItem>
                                <MenuItem value="300-500">300-500</MenuItem>
                                <MenuItem value="over500">Over 500</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box
                        mb={3}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Showing {filteredRecipes.length} recipes
                          {dietPreference === 'vegetarian' && (
                            <Chip
                              size="small"
                              label="Vegetarian Only"
                              color="success"
                              variant="outlined"
                              icon={<RestaurantMenuOutlined fontSize="small" />}
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Typography>
                      </Box>

                      {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                          <CircularProgress />
                        </Box>
                      ) : filteredRecipes.length === 0 ? (
                        <Box sx={{ textAlign: 'center', my: 4 }}>
                          <Typography variant="h6" color="text.secondary">
                            No recipes found matching your criteria
                          </Typography>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {filteredRecipes.map((recipe) => (
                            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                              <Card
                                sx={{
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  borderRadius: 3,
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                  },
                                }}
                              >
                                <Box sx={{ position: 'relative' }}>
                                  <CardMedia
                                    component="img"
                                    height="180"
                                    image={recipe.image}
                                    alt={recipe.title}
                                  />
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      top: 10,
                                      right: 10,
                                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                      borderRadius: '50%',
                                      p: 1,
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      onClick={() => handleSaveRecipe(recipe)}
                                      color="primary"
                                    >
                                      {isRecipeSaved(recipe.id) ? (
                                        <Favorite color="error" />
                                      ) : (
                                        <FavoriteBorder />
                                      )}
                                    </IconButton>
                                  </Box>
                                  <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
                                    {recipe.diet?.includes('vegetarian') && (
                                      <Chip
                                        size="small"
                                        label="Veg"
                                        sx={{
                                          bgcolor: 'rgba(76, 175, 80, 0.9)',
                                          color: '#fff',
                                          fontWeight: 600,
                                          borderRadius: '4px',
                                        }}
                                      />
                                    )}
                                    {recipe.diet?.includes('non-vegetarian') && (
                                      <Chip
                                        size="small"
                                        label="Non-Veg"
                                        sx={{
                                          bgcolor: 'rgba(229, 57, 53, 0.9)',
                                          color: '#fff',
                                          fontWeight: 600,
                                          borderRadius: '4px',
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Chip
                                    label={recipe.mealType}
                                    sx={{
                                      position: 'absolute',
                                      bottom: 10,
                                      left: 10,
                                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                      color: (() => {
                                        switch (recipe.mealType) {
                                          case 'breakfast':
                                            return '#f57c00';
                                          case 'lunch':
                                            return '#388e3c';
                                          case 'dinner':
                                            return '#1976d2';
                                          default:
                                            return '#616161';
                                        }
                                      })(),
                                      fontWeight: 600,
                                    }}
                                  />
                                </Box>
                                <CardContent sx={{ flexGrow: 1 }}>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    sx={{ mb: 2 }}
                                  >
                                    {recipe.title}
                                  </Typography>
                                  <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                    <Grid item xs={6}>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <FitnessCenter
                                          fontSize="small"
                                          sx={{ color: 'text.secondary', mr: 1 }}
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                          {recipe.calories} Cal
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Timer
                                          fontSize="small"
                                          sx={{ color: 'text.secondary', mr: 1 }}
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                          {recipe.time} min
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  <Box
                                    sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}
                                  >
                                    <Box sx={{ textAlign: 'center' }}>
                                      <Typography variant="caption" color="text.secondary">
                                        Protein
                                      </Typography>
                                      <Typography variant="body2" fontWeight="bold">
                                        {recipe.protein}g
                                      </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                      <Typography variant="caption" color="text.secondary">
                                        Carbs
                                      </Typography>
                                      <Typography variant="body2" fontWeight="bold">
                                        {recipe.carbs}g
                                      </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                      <Typography variant="caption" color="text.secondary">
                                        Fat
                                      </Typography>
                                      <Typography variant="body2" fontWeight="bold">
                                        {recipe.fat}g
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleViewRecipe(recipe.id)}
                                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                                  >
                                    View Recipe
                                  </Button>
                                </Box>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  )}
                </div>

                {currentUser && (
                  <div role="tabpanel" hidden={tabValue !== 1 || !currentUser}>
                    {tabValue === 1 && currentUser && (
                      <Box>
                        {savedRecipes.length === 0 ? (
                          <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              You haven't saved any recipes yet
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => setTabValue(0)}
                              startIcon={<Add />}
                              sx={{
                                mt: 2,
                                borderRadius: 2,
                                background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                                textTransform: 'none',
                              }}
                            >
                              Browse Recipes
                            </Button>
                          </Box>
                        ) : (
                          <Grid container spacing={3}>
                            {savedRecipes.map((recipe) => (
                              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                                <Card
                                  sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                  }}
                                >
                                  <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                      component="img"
                                      height="180"
                                      image={
                                        recipe.image ||
                                        'https://via.placeholder.com/300x200?text=Recipe+Image'
                                      }
                                      alt={recipe.title}
                                    />
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '50%',
                                        p: 1,
                                      }}
                                    >
                                      <IconButton
                                        size="small"
                                        onClick={() => handleSaveRecipe(recipe)}
                                        color="error"
                                      >
                                        <Favorite />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                  <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                      {recipe.title}
                                    </Typography>
                                    {recipe.calories && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                      >
                                        {recipe.calories} Calories
                                      </Typography>
                                    )}
                                    <Button
                                      fullWidth
                                      variant="outlined"
                                      color="primary"
                                      onClick={() => handleViewRecipe(recipe.id)}
                                      sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                                    >
                                      View Recipe
                                    </Button>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        )}
                      </Box>
                    )}
                  </div>
                )}
              </Paper>
            </Container>
          </>
        )}

        <Dialog
          open={recipeDialogOpen}
          onClose={() => setRecipeDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedRecipe && (
            <>
              <DialogTitle>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography variant="h5" component="div">
                    {selectedRecipe.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {selectedRecipe.diet?.includes('vegetarian') && (
                      <Chip
                        size="small"
                        label="Veg"
                        sx={{
                          bgcolor: 'success.light',
                          color: 'white',
                          fontWeight: 600,
                          mr: 1,
                          height: 24,
                        }}
                      />
                    )}
                    {selectedRecipe.diet?.includes('non-vegetarian') && (
                      <Chip
                        size="small"
                        label="Non-Veg"
                        sx={{
                          bgcolor: 'error.light',
                          color: 'white',
                          fontWeight: 600,
                          mr: 1,
                          height: 24,
                        }}
                      />
                    )}
                    <IconButton onClick={() => handleSaveRecipe(selectedRecipe)}>
                      {isRecipeSaved(selectedRecipe.id) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.title}
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Nutrition Facts
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Calories
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {selectedRecipe.calories} kcal
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Protein
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {selectedRecipe.protein}g
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Carbs
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {selectedRecipe.carbs}g
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Fat
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {selectedRecipe.fat}g
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={7}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Ingredients
                      </Typography>
                      <List>
                        {selectedRecipe.ingredients?.map((ingredient, index) => (
                          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <EggAlt fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={ingredient} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Instructions
                      </Typography>
                      <List>
                        {selectedRecipe.instructions?.map((step, index) => (
                          <ListItem key={index} disablePadding sx={{ py: 1 }}>
                            <ListItemIcon>
                              <Avatar
                                sx={{
                                  bgcolor: 'primary.main',
                                  width: 28,
                                  height: 28,
                                  fontSize: '0.85rem',
                                }}
                              >
                                {index + 1}
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={step} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setRecipeDialogOpen(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

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
      </Box>
    </motion.div>
  );
};

export default MealPlanner;
