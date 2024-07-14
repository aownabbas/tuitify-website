import React, { useState, useEffect } from 'react';
import classes from './UserProfile.module.css';
import Rank from '../myprofile/myprofiletabs/profile_tabs/Rank';
import Image from 'next/image';
import followUser from '../../../../redux/actions/FollowUser';
import unFollow from '../../../../redux/actions/UnFollow';
import { useDispatch } from 'react-redux';
import TabsContainer from '../myprofile/myprofiletabs/TabsContainer';

const OtherUserProfileInfo = (props) => {
  let getPlatData = props?.getPlatData;

  const dispatch = useDispatch();

  const handleFollow = () => {
    const params = `f_to=${props.otherUser_id}&name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&f_by=${props.user_id}`;
    dispatch(followUser(params, onFollowUserSuccess, onFollowUserError));
    props.setUserProfileDetails((prevState) => ({
      ...prevState,
      userProfile: [
        {
          ...prevState.userProfile[0],
          followed_users_count: prevState.userProfile[0].followed_users_count + 1,
        },
      ],
    }));
    props.setFollowStatus(true);
  };

  const onFollowUserSuccess = (res) => {
    console.log('res', res);
  };
  const onFollowUserError = () => {
    console.log('no ok');
  };

  const handleUnFollow = () => {
    const params = `f_to=${props.otherUser_id}&name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&f_by=${props.user_id}`;
    dispatch(unFollow(params, onUnFollowSuccess, onUnFollowError));
    props.setUserProfileDetails((prevState) => ({
      ...prevState,
      userProfile: [
        {
          ...prevState.userProfile[0],
          followed_users_count: prevState.userProfile[0].followed_users_count - 1,
        },
      ],
    }));
    props.setFollowStatus(false);
  };

  const onUnFollowSuccess = (res) => {
    console.log('res', res);
  };
  const onUnFollowError = () => {
    console.log('no ok');
  };

  const handlepic = (pic) => {
    console.log(pic, 'clicked pic');
  };

  return (
    <>
      <div className={`${classes.card} mt-0 card`} style={{ overflowY: 'hidden', height: '100%' }}>
        {/* <CircleLoader /> */}
        <div className="card-body">
          <div className="card-title mb-4">
            <div className="text-center ">
              {props.userProfileDetails.userProfile.map((users) => (
                <>
                  <Image
                    className={`${classes.imgFrame} img-fluid mb-3 mt-0 text-center `}
                    src={
                      getPlatData && !users.image
                        ? '/assets/icons/new/user.svg'
                        : `${props.awsLink}users/profileImages/${users.image}`
                    }
                    onClick={() => handlepic(`${props.awsLink}users/profileImages/${users.image}`)}
                    alt="User Profile picture"
                    height={138}
                    width={138}
                  />
                  <p className={classes.userName}>{users.first_name}</p>
                </>
              ))}

              {props.userProfileDetails.userProfile.map((users) => (
                <p className={classes.userEmail} key={users.id}>
                  {users.email}
                </p>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="row text-center mb-3">
              <div className="col-md-6 col-sm-6 col-xs-6">
                {/* <p className={classes.userFollowers}>320</p> */}
                <p className={classes.userFollowers}>
                  {props.userProfileDetails.userProfile[0]?.following_users_count}
                </p>
                <p className={classes.userfolTxt}>Following</p>
              </div>
              {/* <div className={`${classes.leftborder} col-md-1 col-sm-1 d-none d-sm-block`} /> */}
              <div className={`${classes.leftborder} col-md-6 col-sm-6 col-xs-6`}>
                <p className={classes.userFollowers}>{props.userProfileDetails.userProfile[0]?.followed_users_count}</p>
                <p className={classes.userfolTxt}>Followers</p>
              </div>
            </div>
            <div className="text-center mb-3">
              {props.followStatus === false ? (
                <button className={classes.userButton} onClick={() => handleFollow()}>
                  Follow
                </button>
              ) : (
                <button className={classes.userUnfollowButton} onClick={() => handleUnFollow()}>
                  Unfollow
                </button>
              )}
              {/* <button className={classes.userButton}>Follow</button> */}
            </div>
          </div>
          <div className="row">
            <TabsContainer
              userProfileDetails={props.userProfileDetails}
              userGroups={props.userGroups}
              userActivity={props.userActivity}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserProfileInfo;
