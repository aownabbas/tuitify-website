import React, { useState, useEffect } from 'react';
import Login from '../../../components/auth/Login';
import COLORS from '../../../public/assets/colors/colors';
import InvalidModal from '../../../components/auth/loginmodal/InvalidModal';
import axios from 'axios';
import { URL } from '../../../public/assets/path/path';
import { useRouter } from 'next/router';
import login from '../../../redux/actions/Login';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import getPlat from '../../../redux/actions/GetPlat';
import Image from 'next/image';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';
import { Box, Modal, Typography } from '@mui/material';
import Link from 'next/link';
// Aown: In login container I have changed InvalidModal with SuccessModal.
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const LoginContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [getPlatData, setGetPlatData] = useState(null);

  // getting isloading state from login redux.
  const { isLoading } = useSelector((state) => state.login);

  const [loginData, setLoginData] = useState({
    status: '',
    user: [],
    platform: [],
    message: '',
  });

  const [loading, setLoading] = useState(false);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  // states for handling input values, modal opening, errors
  const [forgetPasswordPage, setForgetPasswordPage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyModal, setEmptyModal] = useState(false);
  const [invalidModal, setInvalidModal] = useState(false);
  const [invalidCredentialModal, setInvalidCredentialModal] = useState(false);
  const [remember, setRemember] = useState(false);
  const [terms, setTerms] = useState(false);
  const [policies, setPolicies] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlemobileclose = () => setOpen(true);
  const handleResize = () => {
    if (window.innerWidth <= 800) {
      handleOpen();
    } else {
      handleClose();
    }
  };
  const { userPlatfrom } = useSelector((state) => state.get_plat);

  // email format use for testing email during login.
  const emailFormate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // functions for closing modals.
  const handleEmptyModalClose = () => setEmptyModal(false);
  const handleInvalidModalClose = () => setInvalidModal(false);
  const handleInvalidCredentialModalClose = () => setInvalidCredentialModal(false);

  // function when use forget his/her password.
  const handleForgetPasswordPage = async () => {
    // checks weather email empty or invalid.
    if (!email.trim()) {
      setEmptyModal(true);
    } else {
      // dispatch forget password api.
      const params = `name=${getPlatData?.name}&env=${getPlatData?.env}&platform_id=${getPlatData?.platform_id}&email=${email}`;
      let paramsData = {
        // name: getPlatData?.name,
        // env: getPlatData?.env,
        platform_id: getPlatData?.platform_id,
        email: email,
      };

      await GlobalApiCall(
        `${URL.khbaseUrl}forgetpassword`,
        'post',
        paramsData,
        (response) => {
          // handle success
          if (response.data.status == 'true') {
            setForgetPasswordPage(true);
            // route to get code page.
            router.push({
              pathname: '/auth/login/ForgetPassword',
              query: { email: `${email}` },
            });
          } else {
            setInvalidModal(true);
          }
        },
        (error) => {
          // handle error
          console.log(error);
        },
      );
      // axios
      //   .post(`${URL.khbaseUrl}forgetpassword?${params}`)
      //   .then(function (response) {
      //     // handle success
      //     if (response.data.status === 'true') {
      //       setForgetPasswordPage(true);
      //       // route to get code page.
      //       router.push({ pathname: '/auth/login/ForgetPassword', query: { email: `${email}` } });
      //     } else {
      //       setInvalidModal(true);
      //     }
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error);
      //   });
    }
  };

  // if login button click this function will run.
  const submitLoginHandler = (e) => {
    e.preventDefault();

    // checks for validating the email and password fields.
    if (email === '' && password === '') {
      setEmailError('Please Enter the E-mail.');
      setPasswordError('Please Enter the password.');
    } else if (email === '' && password != '') {
      setEmailError('Please Enter the E-mail.');
      setPasswordError(null);
    } else if (email != '' && password === '') {
      setEmailError(null);
      setPasswordError('Please Enter the password.');
    }
    // else if(!emailFormate.test(email) && password.length < 8){
    //   setEmailError("Please Enter the valid E-mail. i.e. E-mail must include @ and .");
    //   setPasswordError("The password should be at least 8 characters.");
    // }
    else if (!emailFormate.test(email) && password != '') {
      setEmailError('Please Enter the valid E-mail. i.e. E-mail must include @ and .');
      setPasswordError(null);
    } else if (!emailFormate.test(email) && password == '') {
      setEmailError('Please Enter the valid E-mail. i.e. E-mail must include @ and .');
      setPasswordError('Please Enter the password.');
    }
    // else if(emailFormate.test(email) && password.length < 8){
    //   setEmailError(null);
    //   setPasswordError("The password should be at least 8 characters.");
    // }
    else if (password.length != '' && emailFormate.test(email)) {
      setEmailError(null);
      setPasswordError(null);
    } else if (!emailFormate.test(email)) {
      setEmailError('Please Enter the valid E-mail. i.e. E-mail must include @ and .');
    } else {
      // if no error setting errors to null.
      setEmailError(null);
      setPasswordError(null);
    }
    if (emailError != null || passwordError != null) {
      // if there is an error then opening invalid modal.
      setInvalidCredentialModal(true);
    } else {
      const LoginApi = async () => {
        // login data to local storage as well as in async.
        let GetPlatData = await JSON.parse(localStorage.getItem('@GetPlatData'));

        const timezone = new Date().getTimezoneOffset();

        console.log(GetPlatData, 'slkfklsm');

        const params = {
          name: `${GetPlatData?.name}`,
          timezone: `${timezone}`,
          email: `${email}`,
          password: `${password}`,
          platform_id: `${GetPlatData?.platform_id}`,
          token: ``,
          type: '0',
        };

        dispatch(login(params, onLoginSuccess, onLoginError));
      };

      LoginApi();
    }
  };
  const onLoginError = (err) => {
    setInvalidCredentialModal(true);
  };
  useEffect(() => {
    dispatch(getPlat());
    const getPlatApi = async () => {
      dispatch(getPlat());
    };
    getPlatApi();
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    handleResize();

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    // }
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  const onLoginSuccess = (res) => {
    setLoginData(res.data);
    const response = res.data;
    if (response) {
      if (response.status === 'true') {
        router.push('/').then(() => router.reload());
        // router.push('/');
        // router.reload();
      } else {
        setInvalidCredentialModal(true);
      }
    }
  };
  // function for getting email field value.
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  // handle email blur event.
  const handleEmailBlur = (e) => {
    if (email === '') {
      setEmailError('Please Enter the E-mail.');
    } else if (!emailFormate.test(email)) {
      setEmailError('Please Enter the valid E-mail. i.e. E-mail must include @ and .');
    } else {
      setEmailError(null);
    }
  };

  // function for getting password field value.
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  // handle password blur event.
  const handlePasswordBlur = (e) => {
    if (password === '') {
      setPasswordError('Please Enter the Password.');
    } else {
      setPasswordError(null);
    }
  };

  // checkboxes handle functions.
  const handleRememberChecked = () => {
    setRemember(!remember);
  };
  const handleTermsChecked = () => {
    setTerms(!terms);
  };
  const handlePoliciesChecked = () => {
    setPolicies(!policies);
  };
  const handleForgetPageBack = () => {
    setForgetPasswordPage(false);
  };
// Aown: In login container I have changed InvalidModal with SuccessModal.
  const [openPublishGisstModal, setOpenPublishGisstModal] = useState(false);

  return (
    <>
      <div>
        {/* modal will be shown on every page reload on first time */}
        <Modal
          open={open}
          onClose={handlemobileclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Get the App
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Download Giisty App on smartphone for better experience
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                padding: '20px',
              }}
            >
              <Box sx={{ height: '60px', width: '250px' }}>
                <Link href="https://play.google.com/store/apps/details?id=com.tuitify&hl=en_US&gl=US">
                  <Image src="/assets/images/Google_Play.svg" height={70} width={250} alt="" />
                </Link>
              </Box>
              <Box sx={{ height: '60px', width: '250px' }}>
                <Link href="https://apps.apple.com/in/app/giisty/id1550116149">
                  <Image src="/assets/images/appstore.svg" height={70} width={230} alt="" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
      {isLoading == false || loading == false ? (
        <div id="wrapper" className="position-realative" style={{ overflow: 'hidden' }}>
          <div className="row w-100 vh-100 mx-auto">
            <div className="col-12 col-md-8  p-0" style={{ backgroundColor: COLORS.mainColor }}>
              <img
                src={`${awsLink}platforms/banners/${userPlatfrom?.background_image}`}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="col-12 col-md-4 px-0 d-block d-md-flex justify-content-center vh-100 align-items-center">
              <div
                className="col-12 col-md-10 col-lg-10 mt-5 mt-md-0 d-flex justify-content-center align-items-center mx-auto"
                style={{
                  backgroundColor: COLORS.white,
                  flexDirection: 'column',
                }}
              >
                {/* <div className="mx-auto "> */}
                {/* Login Page */}
                <Login
                  handleForgetPasswordPage={handleForgetPasswordPage}
                  submitLoginHandler={submitLoginHandler}
                  handleEmailInput={handleEmailInput}
                  handleEmailBlur={handleEmailBlur}
                  handlePasswordBlur={handlePasswordBlur}
                  handlePasswordInput={handlePasswordInput}
                  handleRememberChecked={handleRememberChecked}
                  handleTermsChecked={handleTermsChecked}
                  handlePoliciesChecked={handlePoliciesChecked}
                  emptyModal={emptyModal}
                  invalidModal={invalidModal}
                  remember={remember}
                  password={password}
                  email={email}
                  terms={terms}
                  policies={policies}
                  emailError={emailError}
                  passwordError={passwordError}
                />
                {/* </div> */}
              </div>
              {/* empty modal */}
              {emptyModal && (
                <InvalidModal
                  invalidModal={emptyModal}
                  handleInvalidModalClose={handleEmptyModalClose}
                  heading="Empty E-mail"
                  description="The E-mail field is Empty. Please Enter an E-mail before proceeding."
                />
              )}
              {/* invalid modal */}
              {invalidModal && (
                <InvalidModal
                  invalidModal={invalidModal}
                  handleInvalidModalClose={handleInvalidModalClose}
                  heading="Invalid E-mail"
                  description="The E-mail you have enter is invalid. Your E-mail must include @ and . signs."
                />
              )}
              {/* unauthorized modal */}
              {/* // Aown: In login container I have changed InvalidModal with SuccessModal. */}
              {invalidCredentialModal && (
                <SuccessModal
                  modalOpen={invalidCredentialModal}
                  handleModalClose={() => {
                    handleInvalidCredentialModalClose();
                    // setModalOpen(false);
                  }}
                  image={<Image src="/assets/icons/danger.svg" className="" width="65px" height="70%" alt="alert" />}
                  title={'Invalid E-mail or Password'}
                  description={'Your E-mail or password is incorrect.'}
                  button1={'Close'}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        // Loader
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </>
  );
};

export default LoginContainer;
