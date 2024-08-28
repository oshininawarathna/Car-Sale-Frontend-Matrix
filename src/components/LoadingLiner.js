import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const LoadingLiner = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
};

export default LoadingLiner;
