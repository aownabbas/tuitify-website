import React from 'react';
import SkeletonLoader from '../../../kh_components/kh_home/SkeletonLoader';

const PublishedGiistsSkeleton = () => {
  return (
    <div className={`mb-4 col-lg-4 col-6`}>
      <SkeletonLoader height={150} width={'100%'} borderRadius="20px" />
      <div className="d-flex justify-content-between">
        <SkeletonLoader height={40} width={'40px'} borderRadius="40px" />
        <div className="w-25 d-flex flex-column flex-start">
          <SkeletonLoader height={15} width={'100%'} borderRadius="20px" />
          <SkeletonLoader height={15} width={'100%'} borderRadius="20px" />
        </div>
        <SkeletonLoader height={40} width={'40px'} borderRadius="40px" />
      </div>
    </div>
  );
};

export default PublishedGiistsSkeleton;
