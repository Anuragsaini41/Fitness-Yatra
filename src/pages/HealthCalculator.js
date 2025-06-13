import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Slider,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  useTheme,
  alpha,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FitnessCenter,
  LocalFireDepartment,
  Scale,
  Height,
  DirectionsRun,
  Straighten,
  CheckCircle,
  MonitorWeight,
  Restaurant,
} from '@mui/icons-material';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`calc-tabpanel-${index}`}
    aria-labelledby={`calc-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const HealthCalculator = () => {
  const [tabValue, setTabValue] = useState(0);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const theme = useTheme();

  // BMI Calculator State
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmiResult, setBmiResult] = useState(null);
  const [weightStatus, setWeightStatus] = useState('');
  const [idealWeightRange, setIdealWeightRange] = useState({ min: 0, max: 0 });

  // Calorie Calculator State
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [calorieResult, setCalorieResult] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCalculationComplete(false);
  };

  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
    setCalculationComplete(false);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
    setCalculationComplete(false);
  };

  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
    setCalculationComplete(false);
  };

  const calcBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBmiResult(bmi.toFixed(1));

    // Determine weight status
    if (bmi < 18.5) {
      setWeightStatus('Underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setWeightStatus('Healthy Weight');
    } else if (bmi >= 25 && bmi < 30) {
      setWeightStatus('Overweight');
    } else {
      setWeightStatus('Obese');
    }

    // Calculate ideal weight range based on BMI 18.5-24.9
    const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
    const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);
    setIdealWeightRange({ min: minWeight, max: maxWeight });

    setCalculationComplete(true);
  };

  const calcCalories = () => {
    // Mifflin-St Jeor Equation for BMR
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multiplier for TDEE
    const activityMultipliers = {
      sedentary: 1.2, // Little or no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Heavy exercise 6-7 days/week
      veryActive: 1.9, // Very heavy exercise, physical job or training twice a day
    };

    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

    // Calculate different calorie goals
    setCalorieResult({
      bmr: Math.round(bmr),
      maintain: tdee,
      mildLoss: Math.round(tdee - 250),
      weightLoss: Math.round(tdee - 500),
      extremeLoss: Math.round(tdee - 1000),
      mildGain: Math.round(tdee + 250),
      weightGain: Math.round(tdee + 500),
    });

    setCalculationComplete(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      Underweight: '#2196f3', // Blue
      'Healthy Weight': '#4caf50', // Green
      Overweight: '#ff9800', // Orange
      Obese: '#f44336', // Red
    };
    return colors[status] || theme.palette.primary.main;
  };

  const getBmiTips = () => {
    const tips = {
      Underweight: [
        'Focus on nutrient-dense foods that provide quality calories',
        'Add healthy fats like nuts, avocados, and olive oil to your meals',
        'Strength training can help build muscle mass',
        'Eat 5-6 smaller meals throughout the day',
        'Consider consulting with a healthcare provider about your weight',
      ],
      'Healthy Weight': [
        'Maintain a balanced diet rich in fruits, vegetables, lean proteins, and whole grains',
        'Continue regular physical activity - aim for at least 150 minutes per week',
        'Stay hydrated and limit processed foods',
        'Focus on nutrition quality rather than calorie counting',
        'Regular health check-ups to maintain overall wellness',
      ],
      Overweight: [
        'Create a moderate calorie deficit through diet and exercise',
        'Incorporate more physical activity into your daily routine',
        'Prioritize protein and fiber-rich foods to improve satiety',
        'Practice mindful eating to recognize hunger and fullness cues',
        'Set realistic weight loss goals (1-2 pounds per week)',
      ],
      Obese: [
        'Consider consulting with healthcare professionals for personalized advice',
        'Focus on gradual, sustainable lifestyle changes rather than rapid weight loss',
        'Start with low-impact exercises like walking or swimming',
        'Monitor portion sizes and keep a food journal',
        'Seek support through groups or counseling for long-term success',
      ],
    };
    return tips[weightStatus] || [];
  };

  const activityOptions = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise, desk job' },
    { value: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    {
      value: 'moderate',
      label: 'Moderately Active',
      description: 'Moderate exercise 3-5 days/week',
    },
    { value: 'active', label: 'Very Active', description: 'Heavy exercise 6-7 days/week' },
    {
      value: 'veryActive',
      label: 'Extremely Active',
      description: 'Very intense exercise, physical job or 2x daily training',
    },
  ];

  const getCalorieCommentary = () => {
    if (!calorieResult) return '';

    let commentary;
    if (gender === 'male') {
      commentary = `Based on your profile as a ${age}-year-old male weighing ${weight}kg with a height of ${height}cm and ${activityLevel} activity level, your body needs about ${calorieResult.maintain} calories to maintain your current weight.`;
    } else {
      commentary = `Based on your profile as a ${age}-year-old female weighing ${weight}kg with a height of ${height}cm and ${activityLevel} activity level, your body needs about ${calorieResult.maintain} calories to maintain your current weight.`;
    }
    return commentary;
  };

  const valuetext = (value) => `${value}`;

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
          Health Calculators
        </Typography>

        <Typography
          variant="h6"
          mb={5}
          textAlign="center"
          color="text.secondary"
          fontWeight="400"
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Calculate your BMI, ideal weight range, and daily calorie requirements
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            maxWidth: 1000,
            mx: 'auto',
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
              mb: 2,
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
              icon={<Scale sx={{ mr: 1 }} />}
              label="BMI Calculator"
              iconPosition="start"
              sx={{
                fontSize: { xs: '0.8rem', sm: '1rem' },
                textTransform: 'none',
              }}
            />
            <Tab
              icon={<LocalFireDepartment sx={{ mr: 1 }} />}
              label="Calorie Calculator"
              iconPosition="start"
              sx={{
                fontSize: { xs: '0.8rem', sm: '1rem' },
                textTransform: 'none',
              }}
            />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    height: '100%',
                    borderColor: theme.palette.divider,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      mb={3}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Height sx={{ mr: 1 }} />
                      Height (cm)
                    </Typography>
                    <Slider
                      value={height}
                      min={100}
                      max={220}
                      step={1}
                      onChange={handleHeightChange}
                      valueLabelDisplay="on"
                      getAriaValueText={valuetext}
                      sx={{
                        '& .MuiSlider-thumb': {
                          backgroundColor: theme.palette.primary.main,
                        },
                        '& .MuiSlider-track': {
                          background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                        },
                        mb: 2,
                      }}
                    />
                    <TextField
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      type="number"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                      }}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    height: '100%',
                    borderColor: theme.palette.divider,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      mb={3}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <MonitorWeight sx={{ mr: 1 }} />
                      Weight (kg)
                    </Typography>
                    <Slider
                      value={weight}
                      min={30}
                      max={150}
                      step={0.5}
                      onChange={handleWeightChange}
                      valueLabelDisplay="on"
                      getAriaValueText={valuetext}
                      sx={{
                        '& .MuiSlider-thumb': {
                          backgroundColor: theme.palette.primary.main,
                        },
                        '& .MuiSlider-track': {
                          background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                        },
                        mb: 2,
                      }}
                    />
                    <TextField
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      type="number"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                      }}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={calcBMI}
                  startIcon={<FitnessCenter />}
                  fullWidth
                  sx={{
                    py: 1.5,
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
                >
                  Calculate BMI
                </Button>
              </Grid>
            </Grid>

            {calculationComplete && bmiResult && (
              <Fade in={calculationComplete}>
                <Box sx={{ mt: 4 }}>
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
                    <Box sx={{ px: 4, py: 3, bgcolor: alpha(getStatusColor(weightStatus), 0.1) }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs>
                          <Typography variant="overline" fontWeight={500} color="primary.main">
                            YOUR BMI RESULT
                          </Typography>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <Typography variant="h3" fontWeight={700}>
                                {bmiResult}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                  color: getStatusColor(weightStatus),
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 2,
                                  bgcolor: alpha(getStatusColor(weightStatus), 0.1),
                                }}
                              >
                                {weightStatus}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 4 }}>
                      <Typography variant="h6" fontWeight={600} mb={2}>
                        Ideal Weight Range
                      </Typography>

                      <Box
                        sx={{
                          mb: 4,
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.light, 0.07),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body1">
                          For your height of {height} cm, your ideal weight range is between{' '}
                          <strong>{idealWeightRange.min} kg</strong> and{' '}
                          <strong>{idealWeightRange.max} kg</strong>.
                        </Typography>
                      </Box>

                      <Typography variant="h6" fontWeight={600} mb={2}>
                        Personalized Tips
                      </Typography>

                      <List>
                        {getBmiTips().map((tip, i) => (
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

                      <Box sx={{ mt: 3 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontStyle: 'italic' }}
                        >
                          Note: BMI is a screening tool, not a diagnostic tool. Factors like muscle
                          mass and body composition are not considered in BMI calculations.
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Fade>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    height: '100%',
                    borderColor: theme.palette.divider,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Personal Information
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      Age (years)
                    </Typography>
                    <Slider
                      value={age}
                      min={15}
                      max={80}
                      step={1}
                      onChange={handleAgeChange}
                      valueLabelDisplay="on"
                      getAriaValueText={valuetext}
                      sx={{
                        '& .MuiSlider-thumb': {
                          backgroundColor: theme.palette.primary.main,
                        },
                        '& .MuiSlider-track': {
                          background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                        },
                        mb: 2,
                      }}
                    />

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mt: 3 }}
                    >
                      Gender
                    </Typography>
                    <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                      />
                    </RadioGroup>

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mt: 3 }}
                    >
                      Height & Weight
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          type="number"
                          label="Height"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                          }}
                          fullWidth
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          value={weight}
                          onChange={(e) => setWeight(Number(e.target.value))}
                          type="number"
                          label="Weight"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                          }}
                          fullWidth
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    height: '100%',
                    borderColor: theme.palette.divider,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      mb={3}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <DirectionsRun sx={{ mr: 1 }} />
                      Activity Level
                    </Typography>

                    <TextField
                      select
                      fullWidth
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    >
                      {activityOptions.map((option) => (
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
                  onClick={calcCalories}
                  startIcon={<LocalFireDepartment />}
                  fullWidth
                  sx={{
                    py: 1.5,
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
                >
                  Calculate Daily Calories
                </Button>
              </Grid>
            </Grid>

            {calculationComplete && calorieResult && (
              <Fade in={calculationComplete}>
                <Box sx={{ mt: 4 }}>
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
                            <Restaurant fontSize="large" />
                          </Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="overline" fontWeight={500} color="primary.main">
                            YOUR DAILY CALORIE NEEDS
                          </Typography>
                          <Typography variant="h4" fontWeight={700}>
                            {calorieResult.maintain} Calories
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            to maintain your current weight
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 4 }}>
                      <Typography variant="body1" mb={4}>
                        {getCalorieCommentary()}
                      </Typography>

                      <Typography variant="h6" fontWeight={600} mb={3}>
                        Calorie Goals
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Card
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.info.light, 0.1),
                              borderColor: alpha(theme.palette.info.main, 0.2),
                            }}
                          >
                            <Typography variant="overline" color="info.main" fontWeight={600}>
                              WEIGHT LOSS
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Mild weight loss (0.25 kg/week):
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                  {calorieResult.mildLoss} cal
                                </Typography>
                              </Grid>
                              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography variant="body2">Weight loss (0.5 kg/week):</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                  {calorieResult.weightLoss} cal
                                </Typography>
                              </Grid>
                              <Grid container justifyContent="space-between">
                                <Typography variant="body2">Extreme loss (1 kg/week):</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                  {calorieResult.extremeLoss} cal
                                </Typography>
                              </Grid>
                            </Box>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.success.light, 0.1),
                              borderColor: alpha(theme.palette.success.main, 0.2),
                              height: '100%',
                            }}
                          >
                            <Typography variant="overline" color="success.main" fontWeight={600}>
                              WEIGHT GAIN
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Mild weight gain (0.25 kg/week):
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                  {calorieResult.mildGain} cal
                                </Typography>
                              </Grid>
                              <Grid container justifyContent="space-between">
                                <Typography variant="body2">Weight gain (0.5 kg/week):</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                  {calorieResult.weightGain} cal
                                </Typography>
                              </Grid>
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight={600} mb={2}>
                          Your Basal Metabolic Rate (BMR)
                        </Typography>
                        <Box
                          sx={{
                            mb: 4,
                            p: 2,
                            bgcolor: alpha(theme.palette.primary.light, 0.07),
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body1">
                            Your Basal Metabolic Rate is{' '}
                            <strong>{calorieResult.bmr} calories</strong> per day. This is the
                            number of calories your body needs to maintain basic physiological
                            functions at rest.
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontStyle: 'italic' }}
                        >
                          Note: These calculations provide estimates. Individual needs may vary
                          based on factors like metabolism, body composition, and specific health
                          conditions.
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Fade>
            )}
          </TabPanel>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default HealthCalculator;
