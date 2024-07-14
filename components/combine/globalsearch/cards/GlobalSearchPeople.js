import React, { useState, useEffect } from 'react';
import unFollow from '../../../../redux/actions/UnFollow';
import followUser from '../../../../redux/actions/FollowUser';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import anyUserData from '../../../../redux/actions/AnyUserData';

const GlobalSearchPeople = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [bearerToken, setBearerToken] = useState('');

  const [getPlatData, setGetPlatData] = useState(null);

  // holds follow/un follow state.
  const [follow, setFollow] = useState(props.users.is_follow);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      setBearerToken(LoginData.access_token);

      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);

      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
    }
    return () => {};
  }, []);

  const handleFollow = () => {
    const params = `f_to=${props.users.id}&name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&f_by=${id}`;
    dispatch(followUser(params, onFollowUserSuccess, onFollowUserError));
  };

  const onFollowUserSuccess = (res) => {};
  const onFollowUserError = () => {
    console.log('no ok');
  };

  const handleUnFollow = () => {
    const params = `f_to=${props.users.id}&name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&f_by=${id}`;
    dispatch(unFollow(params, onUnFollowSuccess, onUnFollowError));
  };

  const onUnFollowSuccess = (res) => {};
  const onUnFollowError = () => {
    console.log('no ok');
  };
  console.log(props.users.id);

  const handleGoToProfile = (e) => {
    // const params = `id=${props.users.id}&platform_id=${getPlatData.platform_id}`;
    // dispatch(anyUserData(params, bearerToken, onAnyUserDataSuccess, onAnyUserDataError ))
    router.push({ pathname: '/combine/UserProfile', query: { user: props.users.id } });
  };
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    <>
      <div className=" pt-1 px-0" style={{ height: '200px' }}>
        <div
          className="position-relative border mx-0 me-3 shadow-sm mb-2"
          style={{ height: '156px', borderRadius: '15px' }}
          onClick={(e) => {
            handleGoToProfile(e);
          }}
        >
          <span className="col-4 p-0 d-flex justify-content-center mx-auto mb-2 mt-2">
            <Image
              className="p-0 rounded-circle my-auto"
              src={
                props.users.image == null
                  ? '/assets/icons/new/user.svg'
                  : getPlatData
                  ? getPlatData == (null || {})
                    ? ''
                    : `${awsLink}users/profileImages/${props.users.image}`
                  : '/assets/icons/new/user.svg'
              }
              alt="Alex Photo"
              width="48px"
              height="48px"
            />
          </span>
          <p className="text-center mb-3 semibold-xsmall text-capitalize">{props.users.first_name}</p>
          <div className="text-center">
            <button
              className="main-background-color text-white w-75 py-2 border-0 light-small mx-auto"
              style={{ borderRadius: '6px' }}
              onClick={(e) => {
                {
                  follow == false ? (setFollow(true), handleFollow(e)) : (setFollow(false), handleUnFollow(e));
                }
              }}
            >
              {follow == false ? 'Follow' : 'Un Follow'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalSearchPeople;
