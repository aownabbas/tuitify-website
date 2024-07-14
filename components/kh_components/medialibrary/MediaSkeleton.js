import { Box, Grid, Typography } from '@mui/material';
import SkeletonLoader from '../kh_home/SkeletonLoader';

const MediaSkeleton = ({ tabHeading, tabSubheading }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        <Typography component={'p'} sx={tabHeading}>
          <Typography component={'p'} sx={tabSubheading}>
            <SkeletonLoader height={25} borderRadius="15px" width="40%" />
          </Typography>
        </Typography>
        <SkeletonLoader height={35} borderRadius="15px" width="15%" />
      </Box>
      <Grid container spacing={2} pt={3}>
        <Grid item md={4} xs={12}>
          <SkeletonLoader height={180} borderRadius="15px" width="100%" />
          <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        </Grid>
        <Grid item md={4} xs={12}>
          <SkeletonLoader height={180} borderRadius="15px" width="100%" />
          <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        </Grid>
        <Grid item md={4} xs={12}>
          <SkeletonLoader height={180} borderRadius="15px" width="100%" />
          <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        </Grid>
        <Grid item md={4} xs={12}>
          <SkeletonLoader height={180} borderRadius="15px" width="100%" />
          <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        </Grid>
        <Grid item md={4} xs={12}>
          <SkeletonLoader height={180} borderRadius="15px" width="100%" />
          <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        </Grid>
        <Grid item md={4} xs={12}>
          <SkeletonLoader height={180} borderRadius="15px" width="100%" />
          <SkeletonLoader height={25} borderRadius="15px" width="20%" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaSkeleton;
