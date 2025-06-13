import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';

const bodyTypes = [
  {
    type: 'ectomorph',
    title: 'Ectomorph',
    description: 'Lean and long, with difficulty building muscle',
    image: 'https://source.unsplash.com/random/300x200/?slim',
  },
  {
    type: 'mesomorph',
    title: 'Mesomorph',
    description: 'Athletic and rectangular, with a hard body, well-defined muscles',
    image: 'https://source.unsplash.com/random/300x200/?athletic',
  },
  {
    type: 'endomorph',
    title: 'Endomorph',
    description: 'Soft and round, with a tendency to store fat',
    image: 'https://source.unsplash.com/random/300x200/?bulky',
  },
];

const workoutTypes = [
  { value: 'strength', label: 'Strength Training' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'yoga', label: 'Yoga & Flexibility' },
  { value: 'sports', label: 'Sports' },
  { value: 'none', label: 'Not Working Out Currently' },
];

const BodyTypeForm = ({
  selectedBodyType,
  setSelectedBodyType,
  workoutType,
  setWorkoutType,
  onSubmit,
}) => (
  <Box sx={{ mb: 4, p: 3, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.8)' }}>
    <Typography variant="h5" fontWeight="600" mb={3} textAlign="center">
      Personalize Your Diet Plan
    </Typography>

    <Typography variant="subtitle1" fontWeight="500" mb={2}>
      Select Your Body Type:
    </Typography>

    <Grid container spacing={{ xs: 2, md: 3 }} mb={4}>
      {bodyTypes.map((bodyType) => (
        <Grid item xs={12} sm={6} md={4} key={bodyType.type}>
          <Card
            sx={{
              cursor: 'pointer',
              height: '100%',
              borderRadius: 3,
              border: '2px solid',
              borderColor: selectedBodyType === bodyType.type ? 'primary.main' : 'transparent',
              boxShadow:
                selectedBodyType === bodyType.type
                  ? '0 0 0 2px rgba(229, 57, 53, 0.3)'
                  : '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              },
            }}
            onClick={() => setSelectedBodyType(bodyType.type)}
          >
            <CardMedia
              component="img"
              height={{ xs: 100, sm: 140 }}
              image={bodyType.image}
              alt={bodyType.title}
            />
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography gutterBottom variant="h6" component="div">
                {bodyType.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bodyType.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Typography variant="subtitle1" fontWeight="500" mb={2}>
      What type of workout do you usually do?
    </Typography>

    <RadioGroup value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        {workoutTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type.value}>
            <FormControlLabel
              value={type.value}
              control={
                <Radio
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={type.label}
              sx={{
                width: '100%',
                m: 0,
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: workoutType === type.value ? 'rgba(229, 57, 53, 0.05)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(229, 57, 53, 0.05)',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        size="large"
        onClick={onSubmit}
        disabled={!selectedBodyType || !workoutType}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
          boxShadow: '0 4px 15px rgba(229, 57, 53, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #d32f2f 0%, #ff1744 100%)',
            boxShadow: '0 6px 20px rgba(229, 57, 53, 0.4)',
          },
          '&.Mui-disabled': {
            background: 'linear-gradient(135deg, #bdbdbd 0%, #e0e0e0 100%)',
          },
        }}
      >
        Get My Recommendations
      </Button>
    </Box>
  </Box>
);

export default BodyTypeForm;
