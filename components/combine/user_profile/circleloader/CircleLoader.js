import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './CircleLoader.module.scss';

function CircularStatic(props) {
  console.log(props.value, 'props.value');
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        thickness={3}
        {...props}
        className={'circleLoaderForeground position-absolute'}
        style={{ zIndex: '1' }}
      />
      <CircularProgress variant="determinate" value={100} className={'circleLoaderBackground'} thickness={3} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" className="circularLoaderPercentageText">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const CircleLoader = (props) => {
  const [progress, setProgress] = useState(props.progress);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 100 ? 0 : prevProgress));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularStatic value={progress} />;
};

export default CircleLoader;
