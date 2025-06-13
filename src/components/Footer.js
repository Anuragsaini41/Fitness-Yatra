import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo.png';

const Footer = () => (
  <Box mt="80px" bgcolor="#ffebee">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <img src={Logo} alt="logo" style={{ width: '150px', height: '150px' }} />
    </Stack>
    <Typography
      variant="h5"
      sx={{
        fontSize: { lg: '28px', xs: '20px' },
        background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
      }}
      mt="41px"
      textAlign="center"
      pb="40px"
    >
      Tagde 💪 Hone Pe Dhiyan Do
    </Typography>
  </Box>
);

export default Footer;
