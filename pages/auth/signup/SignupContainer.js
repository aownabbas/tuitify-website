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
import SignUp from '../../../components/auth/SignUp';
import SignUpSecondForm from '../../../components/auth/SIgnUpSecondForm';
import signupDetailFormDrop from '../../../redux/actions/signupDetailFormDrop';
import signupDetailFormAPI from '../../../redux/actions/SignupDetailFormAPI';
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';
import DotProgress from '../../../components/DotProgress';
import OtpModal from '../../../components/modals/simplemodal/OtpModal';
import { Box, Modal, Typography } from '@mui/material';
import Link from 'next/link';

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

const SignupContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  // states for handling input values, modal opening, errors
  const [forgetPasswordPage, setForgetPasswordPage] = useState(false);
  const [emptyModal, setEmptyModal] = useState(false);
  const [invalidModal, setInvalidModal] = useState(false);
  const [invalidCredentialModal, setInvalidCredentialModal] = useState(false);

  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [dropdownData, setDropdownData] = useState('');
  console.log(dropdownData, 'dropdownData');

  const [salutations, setSalutations] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [workplaceType, setWorkplaceType] = useState('');
  const [workplaceSector, setWorkplaceSector] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [dotLoading, setDotLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [platformId, setPlatformId] = useState('');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  console.log(platformId, 'GetPlatData');
  const [userPlatfrom, setUserPlatfrom] = useState('');

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

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  // const { userPlatfrom } = useSelector((state) => state.get_plat);

  const mySolutationData = useSelector((state) => state.get_salutation);

  const handleNextClick = () => {
    setShowSecondComponent(true);
  };

  useEffect(() => {
    handleResize();
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setUserPlatfrom(GetPlatData);
    setPlatformId(GetPlatData.platform_id);

    let params = `name=inspire&env=Production&platform_id=${platformId}`;
    dispatch(signupDetailFormDrop(params, onDropDownSuccess, onDrpDownError));
  }, [platformId]);

  const onDropDownSuccess = (res) => {
    setDropdownData(res);
    console.log(res, 'dropdown');
  };

  const onDrpDownError = (err) => {
    console.log(err, 'dropdown err');
  };

  const handleCreateUser = () => {
    setDotLoading(true);

    let params = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      country: country,
      speciality: speciality,
      workplace_type: workplaceType,
      workplace_sector: workplaceSector,
      country_code: countryCode,
      city: city,
      salutation: salutations,
      platform_id: platformId,
      phone_number: phoneNumber,
      workplace_name: workplace,
      password: password,
      signup_verification_token: '1',
    });
    dispatch(signupDetailFormAPI(params, onSignUpSuccess, onSignUpError));
  };

  const onSignUpSuccess = (res) => {
    if (res.status == true) {
      setSuccessModal(true);
      setTitle('User Created!');
      setDotLoading(false);
    } else if (res.status == false) {
      setErrorModal(true);
      setTitle('Email already Exits!');
      setMessage(res.message);
      setDotLoading(false);
    }

    // if (res.status == true) {
    //   setSuccessModal(true);
    //   setDotLoading(false);
    // }

    console.log(res, 'signup success');
  };

  const onSignUpError = (err) => {
    setErrorModal(true);
    setTitle('Something Wrong');
    setMessage(err.response.data.message);
    console.log(err.response.data.message, 'signup error');
    setDotLoading(false);
  };

  // email format use for testing email during login.
  const emailFormate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleNavigation = () => {
    router.push({
      pathname: '/auth/signup/OtpContainer',
      query: { email: email }, // Replace emailValue with your state variable containing the email
    });
  };
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
      {/* {isLoading == false || loading == false ? ( */}
      {dotLoading && <DotProgress />}

      <OtpModal
        modalOpen={successModal}
        handleModalClose={() => {
          setSuccessModal(false);
        }}
        image={<Image src="/assets/images/tick.svg" width="65px" height="70px" alt="alert" />}
        title={title}
        description={'User has been successfully created.'}
        button1={'Okay'}
        link={handleNavigation}
        setDotProgressLoading={setDotLoading}
      />
      <SuccessModal
        modalOpen={errorModal}
        handleModalClose={() => {
          setErrorModal(false);
        }}
        image={<Image src="/assets/icons/new/red_alert.svg" width="65px" height="70px" alt="alert" />}
        title={title}
        description={message}
        button1={'Okay'}
        link={'/auth/signup/SignupContainer'}
        setDotProgressLoading={setDotLoading}
      />
      <div id="wrapper" className="position-realative" style={{ overflow: 'hidden' }}>
        <div
          className="row w-100 vh-100 mx-auto"
          // style={{ height: "25vh"}}
        >
          <div className="col-12 col-md-8  p-0" style={{ backgroundColor: COLORS.mainColor }}>
            <img
              src={`${awsLink}platforms/banners/${userPlatfrom?.background_image}`}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="col-12 col-md-4 px-0 d-block d-md-flex justify-content-center vh-100 align-items-center">
            <div
              className="col-12 col-md-10 col-lg-10 mt-5 mt-md-0 d-flex justify-content-center align-items-center mx-auto"
              style={{ backgroundColor: COLORS.white, flexDirection: 'column' }}
            >
              {/* <div className="mx-auto "> */}
              {/* SignUp Page */}
              {showSecondComponent ? (
                <SignUpSecondForm
                  dropdownData={dropdownData}
                  setCountry={setCountry}
                  country={country}
                  city={city}
                  setCity={setCity}
                  speciality={speciality}
                  setSpeciality={setSpeciality}
                  workplace={workplace}
                  setWorkplace={setWorkplace}
                  workplaceType={workplaceType}
                  setWorkplaceType={setWorkplaceType}
                  workplaceSector={workplaceSector}
                  setWorkplaceSector={setWorkplaceSector}
                  handleCreateUser={handleCreateUser}
                />
              ) : (
                <SignUp
                  dropdownData={dropdownData}
                  onNext={handleNextClick}
                  setSalutations={setSalutations}
                  salutations={salutations}
                  setFirstName={setFirstName}
                  firstName={firstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  password={password}
                  setPassword={setPassword}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
              )}
              {/* </div> */}
            </div>
            {/* empty modal
            {emptyModal && (
              <InvalidModal
                invalidModal={emptyModal}
                handleInvalidModalClose={handleEmptyModalClose}
                heading="Empty E-mail"
                description="The E-mail field is Empty. Please Enter an E-mail before proceeding."
              />
            )}
            invalid modal
            {invalidModal && (
              <InvalidModal
                invalidModal={invalidModal}
                handleInvalidModalClose={handleInvalidModalClose}
                heading="Invalid E-mail"
                description="The E-mail you have enter is invalid. Your E-mail must include @ and . signs."
              />
            )}
            unauthorized modal
            {invalidCredentialModal && (
              <InvalidModal
                invalidModal={invalidCredentialModal}
                handleInvalidModalClose={handleInvalidCredentialModalClose}
                heading="Invalid E-mail or Password"
                description="Your E-mail or password is incorrect. Please review your Credentials."
              />
            )} */}
          </div>
        </div>
      </div>
      {/* ) : ( */}
      {/* // Loader */}
      {/* <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <CircularProgress disableShrink />
        </div> */}
      {/* )} */}
    </>
  );
};

export default SignupContainer;
