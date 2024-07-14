import React, { useState, useEffect } from 'react';
import COLORS from '../public/assets/colors/colors';
import Main from '../pages/ch/Main';
import getPlat from '../redux/actions/GetPlat';
import { useDispatch, useSelector } from 'react-redux';
import FirstSignupForm from '../pages/auth/signup/FirstSignupForm';
import Image from 'next/image';
import LoginContainer from '../pages/auth/login/LoginContainer';
import SignupContainer from '../pages/auth/signup/SignupContainer';
import { useRouter } from 'next/router';
const LogoScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [splash, setSplash] = useState(true);
  const [userId, setUserId] = useState({});

  const [getPlatData, setGetPlatData] = useState({});

  const [isInspire, setIsInspire] = useState(false);

  const { userPlatfrom } = useSelector((state) => state.get_plat);

  console.log('SignupContainer', router.pathname);

  useEffect(() => {
    dispatch(getPlat());

    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    } else {
      setGetPlatData(null);
    }
    if (LoginData) {
      const id = LoginData.id;
      setUserId(id);
    } else {
      setUserId(null);
    }
  }, []);

  return (
    <>
      {splash ? (
        ((
          <div id="wrapper" style={{ overflow: 'hidden', backgroundColor: COLORS.mainColor }}>
            <div
              className="row mx-auto w-100 text-center"
              style={{
                maxHeight: '1125px',
                height: '1125px',
                minHeight: '1125px',
              }}
            >
              <div className="d-flex position-relative flex-column justify-content-center align-items-center">
                <Image src="/assets/logo/logo.png" width="150px" height="150px" alt="dots" />
                <Image src="/assets/logo/logo_text.png" width="150px" height="150px" className="mt-4" alt="dots" />
                <div className="end-0 position-absolute" style={{ marginTop: '400px' }}>
                  <Image src="/assets/icons/new/few-dotes.png" width="150px" height="150px" alt="dots" />
                </div>
              </div>
            </div>
          </div>
        ),
        setSplash(false))
      ) : (typeof window != 'undefined' && userId) !== null ? (
        <Main />
      ) : (
        <LoginContainer getPlatData={getPlatData} />
      )}
    </>
  );
};

export default LogoScreen;
