import React, { useEffect } from 'react';
import classes from './MyProfile.module.css';
import Image from 'next/image';
import { Avatar, Box, Chip } from '@mui/material';
import { useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useRef } from 'react';
import { URL } from '../../../../public/assets/path/path';
import { useDispatch } from 'react-redux';
import UserProfileAction from '../../../../redux/actions/UserProfileAction';
import { useRouter } from 'next/router';
import { GlobalApiCall } from '../../../../redux/GlobalApiCall';

const styleObjects = {
  usersListPane: {
    top: '0',
    marginTop: '4rem !important',
    borderRadius: '12px',
    width: '200px',
    background: '#FFFFFF',
    border: '1px solid grey',
    height: '300px',
    position: 'absolute',
    zIndex: '1',
    overflowY: 'scroll',
    boxShadow: '10px 10px 10px grey',
    p: 2,
  },
};

const MyPublisher = ({ userResponseData, userProfileDetails, getPlatData, mybearerToken }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const apiPropUserData = userProfileDetails.userProfile[0];
  const responseUsers = userResponseData.data?.users;

  console.log(apiPropUserData, 'apiPropUserData response data');
  console.log(responseUsers, 'user userResponseData');

  const { usersListPane } = styleObjects;
  const [showUsers, setShowUsers] = useState(false);

  const [val, setVal] = useState([]);
  const [chipVal, setChipVal] = useState();
  console.log(val, 'value');
  console.log(chipVal, 'chip value');
  const [publisherId, setPublisherId] = useState(apiPropUserData?.publisher_id);
  // useEffect(() => {
  //   setChipVal(apiPropUserData)
  // }, []);

  console.log(showUsers, 'showusers');
  const ref = useRef();
  useOnClickOutside(ref, () => setShowUsers(false));

  console.log(publisherId, 'Selected publisher id');

  const editifnormation = async (id) => {
    var axios = require('axios');
    var data = JSON.stringify({
      // firstName: apiPropUserData.first_name,
      // lastName: apiPropUserData.last_name,
      // image: 'string',
      // company: apiPropUserData.company,
      // department: apiPropUserData.department,
      // position: apiPropUserData.position,
      // phone: apiPropUserData.phone,
      // linkedin: apiPropUserData.linkedin,
      // description: apiPropUserData.description,
      publisher_id: id,
    });
    console.log(data, 'my response data');
    // var config = {
    //   method: 'post',
    //   url: `${URL.khbaseUrl}updateUserProfile`,
    //   headers: {
    //     Authorization: 'Bearer ' + mybearerToken,
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // };
    await GlobalApiCall(
      `${URL.khbaseUrl}updateUserProfile`,
      'post',
      data,
      function (response) {
        console.log(response.data, 'Publisher api hit');
      },
      function (error) {
        console.log(error);
      },
    );
    // axios(config)
    //   .then(function (response) {
    //     console.log(response.data, 'Publisher api hit');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const userParams = `user_id=${router.query.user}`;
    dispatch(UserProfileAction(userParams, mybearerToken, onUserProfileActionSuccess, onUserProfileActionError));
  };
  const onUserProfileActionSuccess = (res) => {
    // setUserProfileDetails(res);
    console.log(res, 'userProfile');
  };

  const onUserProfileActionError = (err) => {
    console.log(err);
    console.log(err, 'err');
  };

  function handleAdd() {
    var add = [...val, []];
    setVal(add);
  }
  const handleDelete = (id) => {
    setVal('');
    setChipVal('');
    editifnormation(null);
  };
  return (
    <>
      <div className={`${classes.detailsCard} card mb-3`}>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-md-2 px-0">
                <div className={`card-title mt-2`}>
                  <p className={`${classes.detailCardTitle}`}>My Publisher</p>
                  <p className={`${classes.detailCardSubTitle}`}>Select Your Publisher</p>
                </div>
              </div>
              <div className="col-md-4 ms-3">
                <div className="row" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Enter publisher email / name"
                    className={`${classes.searchInput} mt-2`}
                    onClick={(e) => {
                      setShowUsers(true);
                    }}
                    disabled={chipVal == '' ? '' : 'true'}
                  />
                  {showUsers == true ? (
                    <Box ref={ref} sx={usersListPane}>
                      {responseUsers?.map((user) => (
                        <div
                          className="d-flex flex-row mb-3"
                          style={{ cursor: 'pointer' }}
                          key={user.id}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAdd();
                            setChipVal(user);
                            setPublisherId(user.id);
                            editifnormation(user.id);
                            setShowUsers(false);
                          }}
                        >
                          <div className="gap-3 pt-1">
                            <Image
                              style={{ borderRadius: '15px' }}
                              src={
                                user.image == null
                                  ? '/assets/icons/new/user.svg'
                                  : `${awsLink}users/profileImages/${user.image}`
                              }
                              height={20}
                              width={20}
                              alt="avatar"
                            />
                          </div>
                          <div className="ms-2">
                            {user.first_name} {user.last_name}
                          </div>
                        </div>
                      ))}
                    </Box>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="container">
                  {chipVal == undefined ? (
                    <div className="pt-2">
                      <div
                        className={`${classes.tag} pt-1 pb-1 p-1`}
                        key={apiPropUserData?.publisher_id}
                        id={apiPropUserData?.publisher_id}
                      >
                        <div className="row ">
                          <div className="d-flex justify-content-between">
                            <div className="ps-2">
                              <div className={`${classes.content} d-flex`}>
                                <Image
                                  src={
                                    apiPropUserData?.publisher_image == null
                                      ? '/assets/icons/new/user.svg'
                                      : `${awsLink}users/profileImages/${apiPropUserData?.publisher_image}`
                                  }
                                  alt=""
                                  width={30}
                                  height={30}
                                />
                              </div>
                            </div>
                            <div className="ps-1 ">
                              <p className={`${classes.tagName} col-12 p-0`}>{apiPropUserData?.publisher_name}</p>
                              <p className={`${classes.tagEmail} col-12 p-0 mb-0`}>
                                {apiPropUserData?.publisher_email}
                              </p>
                            </div>
                            <div
                              onClick={(e) => handleDelete(e)}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <Image src="/assets/images/tagCross.png" alt="" width={21} height={21} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <div className={`${classes.tag} pt-1 pb-1 p-1`} key={chipVal?.id} id={chipVal?.id}>
                        <div className="row ">
                          <div className="d-flex justify-content-between">
                            <div className="ps-2">
                              <div className={`${classes.content} d-flex`}>
                                <Image
                                  src={
                                    chipVal?.image == null
                                      ? '/assets/icons/new/user.svg'
                                      : `${awsLink}users/profileImages/${chipVal?.image}`
                                  }
                                  alt=""
                                  width={30}
                                  height={30}
                                />
                              </div>
                            </div>
                            <div className="ps-1 ">
                              <p className={`${classes.tagName} col-12 p-0`}>{chipVal?.first_name}</p>
                              <p className={`${classes.tagEmail} col-12 p-0 mb-0`}>{chipVal?.last_name}@giisty.com</p>
                            </div>
                            <div
                              onClick={(e) => handleDelete(e)}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <Image src="/assets/images/tagCross.png" alt="" width={21} height={21} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPublisher;
