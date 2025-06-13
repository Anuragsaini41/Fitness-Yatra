import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => (
  <Box
    sx={{
      mt: { lg: '150px', xs: '70px' },
      ml: { sm: '50px' },
      position: 'relative',
      p: '20px',
      height: { lg: '85vh', xs: 'auto' },
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Stack sx={{ maxWidth: { lg: '50%', xs: '100%' } }}>
      <Typography
        sx={{
          background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          fontSize: { lg: '30px', xs: '26px' },
        }}
      >
        Fitness Yatra
      </Typography>

      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '54px', xs: '40px' },
          mb: '23px',
          mt: '30px',
          lineHeight: 1.2,
        }}
      >
        Train Insane <br />
        Or <br />
        Remain The Same
      </Typography>

      <Typography fontSize="22px" fontFamily="Poppins" lineHeight="35px" mb={4}>
        Check out the most effective exercises personalized to you
      </Typography>

      <Button
        href="#exercises"
        variant="contained"
        sx={{
          background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
          padding: '15px 30px',
          fontSize: '18px',
          textTransform: 'none',
          borderRadius: '30px',
          width: '200px',
          boxShadow: '0 8px 15px rgba(229, 57, 53, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
            transform: 'translateY(-3px)',
            boxShadow: '0 12px 20px rgba(229, 57, 53, 0.4)',
          },
        }}
      >
        Explore Exercises
      </Button>
    </Stack>

    <Typography
      fontWeight={600}
      sx={{
        opacity: '0.1',
        display: { lg: 'block', xs: 'none' },
        fontSize: '13rem',
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
      }}
    >
      DO IT
    </Typography>

    <Box
      sx={{
        position: 'absolute',
        right: { lg: '0', xs: '-100px' },
        top: { lg: '50%', xs: '-10%' },
        transform: { lg: 'translateY(-50%)', xs: 'none' },
        width: { lg: '700px', md: '500px', xs: '400px' },
        height: 'auto',
        zIndex: -1,
        opacity: { xs: 0.3, lg: 1 },
      }}
    >
      <img src={HeroBannerImage} alt="hero-banner" style={{ width: '100%', height: 'auto' }} />
    </Box>
  </Box>
);

export default HeroBanner;
