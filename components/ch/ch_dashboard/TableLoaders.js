import React from 'react';
import SkeletonLoader from '../../kh_components/kh_home/SkeletonLoader';

function TableLoaders({height}) {
  return (
    <>
      <div className="col-12" style={{ height: height }}>
        <SkeletonLoader height="100%" borderRadius="8px" width="99%" />
      </div>
      <div className="row mt-3">
        <div className="col-4 offset-5">
          <div className="d-flex">
            <div className="col-2 col-lg-1">
              <SkeletonLoader height={30} borderRadius="8px" width="90%" />
            </div>
            <div className="col-2 col-lg-1">
              <SkeletonLoader height={30} borderRadius="8px" width="90%" />
            </div>
            <div className="col-2 col-lg-1">
              <SkeletonLoader height={30} borderRadius="8px" width="90%" />
            </div>
            <div className="col-2 col-lg-1">
              <SkeletonLoader height={30} borderRadius="8px" width="90%" />
            </div>
            <div className="col-2 col-lg-1">
              <SkeletonLoader height={30} borderRadius="8px" width="90%" />
            </div>
          </div>
        </div>
      </div>
      <div className="row col-12 mt-4" style={{ height: '6%' }}>
        <div className="col-2 offset-8">
          <SkeletonLoader height="100%" borderRadius="8px" width="99%" />
        </div>
        <div className="col-2">
          <SkeletonLoader height="100%" borderRadius="8px" width="99%" />
        </div>
      </div>
    </>
  );
}

export default TableLoaders;
