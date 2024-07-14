import SkeletonLoader from './kh_components/kh_home/SkeletonLoader';

const NotificationSkeletonLoader = ({ index }) => {
  return (
    <div
      key={index}
      className="row bg-white hover-bg-lightgrey usercard-shadow col-11 p-0 my-2 py-1 mx-auto d-flex align-items-center"
      style={{ borderRadius: '7px', minHeight: '38px' }}
    >
      <div className="col-2 d-flex">
        <SkeletonLoader height={35} borderRadius="50%" width="35px" />
      </div>
      <div className="col-7 text-start lh-1 px-0">
        <span className="semibold-mid-small text-start text-nowrap">
          <SkeletonLoader height={10} borderRadius="15px" width="100%" />
          <SkeletonLoader height={10} borderRadius="15px" width="100%" />
        </span>
      </div>
      <div className="col-3 px-2">
        <SkeletonLoader height={25} borderRadius="3px" width="100%" />
      </div>
    </div>
  );
};

export default NotificationSkeletonLoader;
