import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import SkeletonLoader from '../kh_components/kh_home/SkeletonLoader';

const RankRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="regular-small" align="center" component="th" scope="row">
        <SkeletonLoader height={15} width="100%" borderRadius="40px" />
      </TableCell>
      <TableCell className="regular-small" align="center" component="th" scope="row">
        <SkeletonLoader height={40} width="100%" borderRadius="40px" />
      </TableCell>
      <TableCell className="regular-small" align="center" component="th" scope="row">
        <SkeletonLoader height={15} width="100%" borderRadius="40px" />
      </TableCell>
      <TableCell className="regular-small" align="center" component="th" scope="row">
        <SkeletonLoader height={15} width="100%" borderRadius="40px" />
      </TableCell>
      <TableCell className="regular-small" align="center" component="th" scope="row">
        <SkeletonLoader height={15} width="100%" borderRadius="40px" />
      </TableCell>
      <TableCell className="regular-small" align="center" component="th" scope="row">
        <SkeletonLoader height={15} width="100%" borderRadius="40px" />
      </TableCell>
    </TableRow>
  );
};

export default RankRowSkeleton;
