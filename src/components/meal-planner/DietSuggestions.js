import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { Check, ArrowForward } from '@mui/icons-material';

const DietSuggestions = ({ bodyType, workoutType, dietPreference }) => {
  // Diet recommendations based on body type and workout
  const getDietRecommendations = () => {
    let recommendations = {
      macroRatio: '',
      highPriorityFoods: [],
      mealFrequency: '',
      specificTips: [],
    };

    // Set base recommendations by body type
    if (bodyType === 'ectomorph') {
      recommendations = {
        macroRatio: '50% carbs, 25% protein, 25% fat',
        mealFrequency: '6-7 smaller meals throughout the day',
        highPriorityFoods: [],
        specificTips: [
          'Focus on calorie-dense foods',
          'Consume more healthy carbs',
          'Include good quality fats in every meal',
        ],
      };
    } else if (bodyType === 'mesomorph') {
      recommendations = {
        macroRatio: '40% carbs, 30% protein, 30% fat',
        mealFrequency: '5-6 meals per day',
        highPriorityFoods: [],
        specificTips: [
          'Balance your carb/protein ratio',
          'Focus on moderate portions',
          'Include a variety of foods in your diet',
        ],
      };
    } else if (bodyType === 'endomorph') {
      recommendations = {
        macroRatio: '25% carbs, 40% protein, 35% fat',
        mealFrequency: '5 meals per day, controlled portions',
        highPriorityFoods: [],
        specificTips: [
          'Focus on protein-rich meals',
          'Choose low GI carbohydrates',
          'Incorporate healthy fats in moderation',
        ],
      };
    }

    // Modify recommendations based on workout type
    if (workoutType === 'strength') {
      recommendations.specificTips.push(
        'Have a protein-rich meal within 30 minutes after workout',
        'Include a mix of fast and slow-digesting proteins',
        'Take BCAAs before or during workouts',
      );
      recommendations.highPriorityFoods =
        dietPreference === 'vegetarian'
          ? [
              'Greek yogurt',
              'Paneer',
              'Lentils',
              'Quinoa',
              'Chickpeas',
              'Soy products',
              'Whey protein',
            ]
          : [
              'Chicken breast',
              'Fish',
              'Eggs',
              'Greek yogurt',
              'Lean beef',
              'Protein shakes',
              'Whey protein',
            ];
    } else if (workoutType === 'cardio') {
      recommendations.specificTips.push(
        'Eat a small carb-rich snack 30 minutes before workout',
        'Hydrate well before, during, and after workouts',
        'Focus on electrolyte replenishment post-workout',
      );
      recommendations.highPriorityFoods =
        dietPreference === 'vegetarian'
          ? ['Bananas', 'Dates', 'Sweet potatoes', 'Oatmeal', 'Rice', 'Coconut water']
          : ['Bananas', 'Chicken', 'Sweet potatoes', 'Fish', 'Rice', 'Eggs'];
    } else if (workoutType === 'yoga') {
      recommendations.specificTips.push(
        'Eat light meals 2 hours before practice',
        'Focus on easily digestible foods',
        'Incorporate anti-inflammatory foods',
      );
      recommendations.highPriorityFoods =
        dietPreference === 'vegetarian'
          ? ['Nuts', 'Seeds', 'Berries', 'Leafy greens', 'Sprouts', 'Avocados']
          : ['Nuts', 'Seeds', 'Berries', 'Fish', 'Eggs', 'Avocados'];
    } else if (workoutType === 'sports') {
      recommendations.specificTips.push(
        'Focus on quick energy sources before games/training',
        'Prioritize recovery nutrition after intense sessions',
        'Stay hydrated with electrolyte drinks during activity',
      );
      recommendations.highPriorityFoods =
        dietPreference === 'vegetarian'
          ? ['Bananas', 'Oats', 'Energy bars', 'Nuts', 'Dried fruits']
          : ['Bananas', 'Chicken', 'Eggs', 'Energy bars', 'Lean meats'];
    } else {
      // none
      recommendations.specificTips.push(
        'Focus on overall health and nutrition',
        'Control portion sizes',
        'Include a variety of food groups',
      );
      recommendations.highPriorityFoods =
        dietPreference === 'vegetarian'
          ? ['Vegetables', 'Fruits', 'Whole grains', 'Lentils', 'Nuts & seeds']
          : ['Vegetables', 'Fruits', 'Whole grains', 'Lean meats', 'Fish'];
    }

    return recommendations;
  };

  const recommendations = getDietRecommendations();

  // Calculate daily caloric needs (very simplified)
  const getCalorieRecommendation = () => {
    let baseCalories = 0;

    // Base by body type
    if (bodyType === 'ectomorph') {
      baseCalories = 2500;
    } else if (bodyType === 'mesomorph') {
      baseCalories = 2300;
    } else if (bodyType === 'endomorph') {
      baseCalories = 2100;
    }

    // Adjust by workout
    if (workoutType === 'strength') {
      baseCalories += 300;
    } else if (workoutType === 'cardio') {
      baseCalories += 400;
    } else if (workoutType === 'yoga') {
      baseCalories += 100;
    } else if (workoutType === 'sports') {
      baseCalories += 500;
    }

    return baseCalories;
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{
          mb: 3,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Personalized Diet Recommendations
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom fontWeight={600}>
                Your Profile
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Body Type"
                    secondary={bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Workout Focus"
                    secondary={workoutType.charAt(0).toUpperCase() + workoutType.slice(1)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Diet Preference"
                    secondary={dietPreference.charAt(0).toUpperCase() + dietPreference.slice(1)}
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(229, 57, 53, 0.1)', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="primary.dark" gutterBottom>
                  Recommended Daily Calories
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {getCalorieRecommendation()} calories
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom fontWeight={600}>
                Diet Recommendations
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Ideal Macro Distribution
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {recommendations.macroRatio}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Meal Frequency
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {recommendations.mealFrequency}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Priority Foods for Your Goals
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {recommendations.highPriorityFoods.map((food, index) => (
                    <Chip
                      key={index}
                      label={food}
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tips For Your Body & Workout Type
                </Typography>
                <List dense>
                  {recommendations.specificTips.map((tip, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ArrowForward fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* High Protein Foods Section */}
      <Paper
        elevation={0}
        sx={{ mt: 4, p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          High Protein {dietPreference === 'vegetarian' ? 'Vegetarian' : ''} Foods
        </Typography>

        <Grid container spacing={2}>
          {dietPreference === 'vegetarian' ? (
            <>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Paneer
                    </Typography>
                    <Typography variant="body2">18g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tofu
                    </Typography>
                    <Typography variant="body2">8g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Chickpeas
                    </Typography>
                    <Typography variant="body2">9g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Greek Yogurt
                    </Typography>
                    <Typography variant="body2">10g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(229, 57, 53, 0.05)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Chicken Breast
                    </Typography>
                    <Typography variant="body2">31g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(229, 57, 53, 0.05)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Eggs
                    </Typography>
                    <Typography variant="body2">13g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(229, 57, 53, 0.05)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Fish
                    </Typography>
                    <Typography variant="body2">25g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ bgcolor: 'rgba(229, 57, 53, 0.05)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Greek Yogurt
                    </Typography>
                    <Typography variant="body2">10g protein per 100g</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default DietSuggestions;
