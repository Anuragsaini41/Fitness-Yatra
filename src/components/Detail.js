import React from 'react';
import { Typography, Stack, Button, Grid, Box } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ p: { xs: '10px', sm: '20px' }, alignItems: 'center' }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            mb: { xs: 2, md: 0 },
          }}
        >
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="detail-image"
            style={{
              maxWidth: '100%',
              maxHeight: '550px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack sx={{ gap: { xs: '15px', md: '35px' } }}>
          <Typography
            sx={{ fontSize: { lg: '64px', xs: '30px' }, textAlign: { xs: 'center', md: 'left' } }}
            fontWeight={700}
            textTransform="capitalize"
          >
            {name}
          </Typography>

          <Typography
            sx={{
              fontSize: { lg: '24px', xs: '18px' },
              textAlign: { xs: 'center', md: 'left' },
            }}
            color="#4F4C4C"
          >
            Exercises keep you strong. <span style={{ textTransform: 'capitalize' }}>{name}</span>{' '}
            is one of the best exercises to target your {target}. It will help you improve your mood
            and gain energy.
          </Typography>

          <Stack spacing={2}>
            {extraDetail?.map((item) => (
              <Stack
                key={item.name}
                direction={{ xs: 'column', sm: 'row' }}
                gap={{ xs: '10px', sm: '24px' }}
                alignItems="center"
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              >
                <Button
                  sx={{
                    background: '#FFF2DB',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    minWidth: '80px',
                  }}
                >
                  <img src={item.icon} alt={bodyPart} style={{ width: '40px', height: '40px' }} />
                </Button>
                <Typography
                  textTransform="capitalize"
                  sx={{
                    fontSize: { lg: '30px', xs: '20px' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  {item.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Detail;
