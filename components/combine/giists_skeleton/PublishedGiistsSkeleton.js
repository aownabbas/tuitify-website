import React from 'react';
import SkeletonLoader from '../../kh_components/kh_home/SkeletonLoader';

const PublishedGiistsSkeleton = () => {
  return (
    <div className={`col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3`}>
      <SkeletonLoader height={240} width={'100%'} borderRadius="20px" />
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
