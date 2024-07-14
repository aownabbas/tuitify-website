import Skeleton from '@mui/material/Skeleton';

const InteractionSkeletonLoader = ({ skeletonObjArr, index }) => {
  const keyAndIndex = index == undefined ? '' : index;
  return (
    <div className="mt-3" key={keyAndIndex} id={keyAndIndex}>
      <div className="row">
        <div className="col-1 mx-1">
          <Skeleton
            className="ms-2 position-relative overflow-hidden text-center"
            animation="wave"
            style={{ borderRadius: '50% 50% 50% 50%' }}
            variant="circular"
            width={40}
            height={40}
          />
        </div>
        <div className="col-10">
          <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 3 }} />
          <Skeleton animation="wave" height={15} width="30%" style={{ marginBottom: 10 }} />
        </div>
      </div>
      <div className="row d-flex align-items-end">
        <div className="col-8">
          <Skeleton
            variant="rectangular"
            height={70}
            className="ms-5"
            animation="wave"
            width="70%"
            style={{ marginBottom: 20, borderRadius: '10px' }}
          />
        </div>
        <div className="col-4 text-end">
          <div className="d-inline-flex">
            {skeletonObjArr.map((item, index) => {
              return (
                <>
                  <div className="col-2 mx-2" key={index}>
                    <Skeleton
                      className="position-relative overflow-hidden text-center"
                      animation="wave"
                      style={{ borderRadius: '50% 50% 50% 50%' }}
                      variant="circular"
                      width={25}
                      height={25}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Skeleton animation="wave" height={5} width="90%" className="mx-auto" style={{ marginBottom: 3 }} />
    </div>
  );
};

export default InteractionSkeletonLoader;
