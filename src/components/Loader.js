import React from 'react';
import { Stack } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => (
  <Stack direction="row" justifyContent="center" alignItems="center" width="100%" height="100px">
    <InfinitySpin width="200" color="#e53935" />
  </Stack>
);

export default Loader;
