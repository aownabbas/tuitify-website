import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = ({ height, width, borderRadius, border }) => {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      height={height}
      width={width}
      style={{ marginBottom: 5, borderRadius: borderRadius, border: border }}
    />
  );
};
export default SkeletonLoader;
