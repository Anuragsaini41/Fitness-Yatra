import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';

const ExerciseCard = ({ exercise }) => (
  <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="exercise-image"
        style={{
          width: '100%',
          height: '320px',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '50px',
          padding: '5px 15px',
          boxShadow: '0 3px 10px rgba(229, 57, 53, 0.15)',
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#e53935',
          }}
        >
          {exercise.bodyPart}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ p: '20px' }}>
      <Typography
        color="#000"
        fontWeight="bold"
        sx={{
          fontSize: { lg: '22px', xs: '18px' },
          mt: '5px',
          mb: '10px',
          textTransform: 'capitalize',
        }}
      >
        {exercise.name}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            color: '#fff',
            background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
            fontSize: '12px',
            borderRadius: '20px',
            textTransform: 'capitalize',
            px: 2,
            py: 0.5,
          }}
        >
          {exercise.target}
        </Button>
        <Button
          sx={{
            color: '#fff',
            background: 'linear-gradient(135deg, #ff5252 0%, #ff867c 100%)',
            fontSize: '12px',
            borderRadius: '20px',
            textTransform: 'capitalize',
            px: 2,
            py: 0.5,
          }}
        >
          {exercise.equipment}
        </Button>
      </Stack>
    </Box>
  </Link>
);

export default ExerciseCard;
