import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { EggAlt, Spa } from '@mui/icons-material';

const VegNonVegToggle = ({ dietPreference, setDietPreference }) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setDietPreference(newValue);
    }
  };

  return (
    <Box
      sx={{
        my: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Typography variant="subtitle1" sx={{ mr: 2, mb: { xs: 1, sm: 0 }, fontWeight: 500 }}>
        Diet Preference:
      </Typography>
      <ToggleButtonGroup
        value={dietPreference}
        exclusive
        onChange={handleChange}
        aria-label="diet preference"
        sx={{
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderRadius: 3,
          '& .MuiToggleButtonGroup-grouped': {
            border: 0,
            borderRadius: 3,
            py: 1,
            px: 3,
            '&.Mui-selected': {
              backgroundColor: (theme) => (dietPreference === 'vegetarian' ? '#4caf50' : '#ff5252'),
              color: 'white',
            },
          },
        }}
      >
        <ToggleButton value="vegetarian" aria-label="vegetarian">
          <Spa sx={{ mr: 1 }} />
          Vegetarian
        </ToggleButton>
        <ToggleButton value="non-vegetarian" aria-label="non-vegetarian">
          <EggAlt sx={{ mr: 1 }} />
          Non-Vegetarian
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default VegNonVegToggle;
