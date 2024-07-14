import React from 'react';
import classes from './Rank.module.css';
import Image from 'next/image';
const Rank = (props) => {
  console.log(props.userProfileDetails, 'props.userProfileDetails');

  return (
    <>
      {props.userProfileDetails && props.userProfileDetails ? (
        props.userProfileDetails.userProfile?.map((item) => (
          <>
            <div className="row">
              <div className="col-md-6" style={{ padding: '4px' }}>
                <div className={`${classes.rankborder} w-100 p-1 text-start ps-3 mt-3`}>
                  <p className={`${classes.rankNumber} mb-1`}>{item.tutorial_views_count}</p>
                  <p className={`${classes.rankDescription}`}>Total Giists Viewed</p>
                </div>
              </div>
              <div className="col-md-6" style={{ padding: '4px' }}>
                <div className={`${classes.rankborder} w-100 p-1 text-start ps-3 mt-3`}>
                  <p className={`${classes.rankNumber} mb-1`}>{item.tutorials_count}</p>
                  <p className={`${classes.rankDescription}`}>Total Giists Created</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 padding-between">
                <div className={`${classes.rankborder} w-100 p-1 text-start ps-3 mt-3`}>
                  <p className={`${classes.rankNumber} mb-1`}>{item.own_tutorial_views_count}</p>
                  <p className={`${classes.rankDescription}`}>Total Views</p>
                </div>
              </div>
              <div className="col-md-6 padding-between">
                <div className={`${classes.rankborder} w-100 p-1 text-start ps-3 mt-3`}>
                  <div className="float">
                    <div className="padding-between">
                      <Image src="/assets/icons/Star 1.svg" width="16px" height="16px" alt="star" />
                    </div>
                    <div className="w-75">
                      <p className={`${classes.rankNumber} mb-1`}>{Math.round(item.total_avg_rating)}</p>
                    </div>
                  </div>
                  <p className={`${classes.rankDescription}`}>Total Giist Ratings</p>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="text-center mt-5">No Rank found</div>
      )}
    </>
  );
};

export default Rank;
