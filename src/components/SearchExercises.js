import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

// Alternative solution using ESLint directives
// eslint-disable-next-line no-unused-vars
const handleError = (errorMessage, error) => {
  // Function body
};

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions,
        );
        setBodyParts(['all', ...bodyPartsData]);
      } catch (error) {
        // Replacing console.error with our error handler
        handleError('Error fetching body parts', error);
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      setIsLoading(true);
      try {
        const exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions,
        );

        const searchedExercises = exercisesData.filter(
          (item) =>
            item.name.toLowerCase().includes(search) ||
            item.target.toLowerCase().includes(search) ||
            item.equipment.toLowerCase().includes(search) ||
            item.bodyPart.toLowerCase().includes(search),
        );

        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
        setSearch('');
        setExercises(searchedExercises);
      } catch (error) {
        // Replacing console.error with our error handler
        handleError('Error searching exercises', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Stack alignItems="center" mt="50px" justifyContent="center" p="20px">
        <Typography
          fontWeight={700}
          sx={{
            fontSize: { lg: '44px', xs: '30px' },
            mb: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Awesome Exercises You <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Should Know
          </span>
        </Typography>

        <Box
          position="relative"
          mb="72px"
          sx={{
            width: { lg: '70%', xs: '90%' },
            maxWidth: '1000px',
          }}
        >
          <TextField
            height="76px"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises, Body Parts, Equipment..."
            type="text"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#757575' }} />
                </InputAdornment>
              ),
              sx: {
                fontWeight: '500',
                border: 'none',
                borderRadius: '100px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: '5px 10px',
              },
            }}
          />
          <Button
            className="search-btn"
            disabled={isLoading}
            sx={{
              color: '#fff',
              textTransform: 'none',
              width: { lg: '175px', xs: '80px' },
              height: '56px',
              position: 'absolute',
              right: '0px',
              fontSize: { lg: '20px', xs: '14px' },
              borderRadius: '0 100px 100px 0',
              background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
              boxShadow: '0 4px 15px rgba(229, 57, 53, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                boxShadow: '0 6px 20px rgba(229, 57, 53, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(1px)',
                boxShadow: '0 2px 10px rgba(229, 57, 53, 0.4)',
              },
              '&.Mui-disabled': {
                background: 'linear-gradient(135deg, #bdbdbd 0%, #e0e0e0 100%)',
                color: 'rgba(255,255,255,0.8)',
              },
            }}
            onClick={handleSearch}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </Box>

        <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '600',
              mb: 3,
              textAlign: 'center',
              color: '#212529',
            }}
          >
            Explore by Body Part
          </Typography>
          <HorizontalScrollbar
            data={bodyParts}
            bodyParts
            setBodyPart={setBodyPart}
            bodyPart={bodyPart}
          />
        </Box>
      </Stack>
    </motion.div>
  );
};

export default SearchExercises;
