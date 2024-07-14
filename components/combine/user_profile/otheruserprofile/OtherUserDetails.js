import React, { useState, useEffect } from 'react';
import classes from './UserProfile.module.css';
import Image from 'next/image';

const OtherUserDetails = (props) => {
  console.log(props.userProfileDetails);

  const [otherUserData, setOtherUserData] = useState([]);

  useEffect(() => {
    setOtherUserData(props.userProfileDetails);

    return () => {};
  }, []);

  return (
    <>
      <div className={`${classes.detailsCard} card mt-0 mb-3`}>
        <div className="card-body">
          <div className="container">
            <div className={`${classes.detailCardTitle} card-title mt-2`}>Profile Details</div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`}>First Name</label>
                {props.userProfileDetails.userProfile.map((user) => (
                  <p className={`${classes.detailtext}`} key={user.id}>
                    <Image
                      src="/assets/images/avatar.png"
                      height={16}
                      width={16}
                      alt="avatar"
                      style={{
                        marginBottom: '5px',
                        marginRight: '10px',
                        opacity: '0.4',
                      }}
                    />{' '}
                    &nbsp;
                    {user.first_name == null ? 'nothing provided' : user.first_name}
                  </p>
                ))}
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`}>Last Name</label>
                {props.userProfileDetails.userProfile.map((user) => (
                  <p className={`${classes.detailtext}`} key={user.id}>
                    <Image
                      src="/assets/images/avatar.png"
                      height={16}
                      width={16}
                      alt="avatar"
                      style={{
                        marginBottom: '5px',
                        marginRight: '10px',
                        opacity: '0.4',
                      }}
                    />{' '}
                    &nbsp;
                    {user.last_name == null ? 'nothing provided' : user.last_name}
                  </p>
                ))}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`}>Company Name</label>
                <p className={`${classes.detailtext}`}>
                  {/* Giisty */}
                  {props.userProfileDetails.userProfile[0]?.company == null
                    ? 'nothing provided'
                    : props.userProfileDetails.userProfile[0]?.company}
                </p>
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`}>Department</label>
                <p className={`${classes.detailtext}`}>
                  {/* Giisty */}
                  {props.userProfileDetails.userProfile[0]?.department == null
                    ? 'nothing provided'
                    : props.userProfileDetails.userProfile[0]?.department}
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`}>Position</label>
                <p className={`${classes.detailtext}`}>
                  {/* UI/UX Designing */}
                  {props.userProfileDetails.userProfile[0]?.position == null
                    ? 'nothing provided'
                    : props.userProfileDetails.userProfile[0]?.position}
                </p>
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`}>Phone Number</label>
                <p className={`${classes.detailtext}`}>
                  {/* +92 313 0140000 */}
                  {props.userProfileDetails.userProfile[0]?.phone == null
                    ? 'nothing provided'
                    : props.userProfileDetails.userProfile[0]?.phone}
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`}>Linked In</label>
                <p className={`${classes.detailtext}`}>
                  {/* @sharukh.giisty */}
                  {props.userProfileDetails.userProfile[0]?.linkedin == null
                    ? 'nothing provided'
                    : props.userProfileDetails.userProfile[0]?.linkedin}
                </p>
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`}>Description</label>
                {props.userProfileDetails.userProfile?.map((user) => (
                  // <p className={`${classes.detailtext}`}> Hey, I am a User Interface & User Experience Designer at...</p>
                  <p className={`${classes.detailtext}`} key={user.id}>
                    {' '}
                    {user.description == null ? 'nothing provided' : user.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserDetails;
