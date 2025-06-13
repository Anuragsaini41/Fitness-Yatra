import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Safe setter for exercises that prevents null values
  const handleSetExercises = (data) => {
    setExercises(data || []);
  };

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={handleSetExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        setIsLoading={setIsLoading}
      />
      <Exercises
        setExercises={handleSetExercises}
        exercises={exercises}
        bodyPart={bodyPart}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Box>
  );
};

export default Home;
