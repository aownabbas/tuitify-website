import React, { useEffect, useState } from 'react';
import COLORS from '../../public/assets/colors/colors';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InvalidModal from './loginmodal/InvalidModal';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LoginModal from '../modals/loginmodal/LoginModal';
import Link from 'next/link';
import { useSelector } from 'react-redux';
var modalShow;
const Login = (props) => {
  console.log(props, 'ddddd');
  const router = useRouter();

  // const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [getPlatData, setGetPlatData] = useState({});
  const [assetsLink, setAssetsLink] = useState('');
  // const [modalShow, setModalShow] =useState(false)
  const [openModal, setOpenModal] = useState(false);
  // const [platformName, setPlatformName] = useState("");

  const { userPlatfrom } = useSelector((state) => state.get_plat);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  console.log('userPlatfrom', userPlatfrom);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    // setPlatformName(GetPlatData?.name);
    modalShow = router.query.Expire;
    if (modalShow == 'true') {
      setOpenModal(true);
    }
    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    return () => {};
  }, []);

  return (
    <>
      {openModal ? <LoginModal /> : null}
      <div className="ms-1 ms-lg-3 w-100 d-flex justify-content-center">
        <div className="d-flex justify-content-center align-items-center">
          <div className="bg-white  p-0 d-inline-flex justify-content-center align-items-center">
            {/* if we have platform data then image show */}
            {awsLink ? (
              awsLink == (null || {}) ? (
                ''
              ) : (
                <Image
                  // src={(getPlatData.link+"logos/"+getPlatData.logo)}
                  style={{ borderRadius: '5px' }}
                  src={`${awsLink}platforms/logos/${userPlatfrom?.logo}`}
                  width="37px"
                  height="37px"
                  alt="logo"
                />
              )
            ) : (
              ''
            )}
          </div>
          <h1 className="bold text-capitalize ms-2">{userPlatfrom?.name}</h1>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          props.submitLoginHandler(e);
        }}
        className="mt-5"
      >
        <div className="mx-4">
          <p className="medium text-secondary" style={{ opacity: '0.8', letterSpacing: '1px' }}>
            Email
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/icons/new/ic_email.png" width="23px" height="18px" alt="email" />
            </span>
            <input
              value={props.email}
              onChange={(e) => props.handleEmailInput(e)}
              id="email"
              name="email"
              type="email"
              style={{ fontSize: '16px' }}
              className="form-control rounded-0 border-0 border-bottom medium"
              placeholder="johndoe@gmail.com"
              aria-label="email"
              aria-describedby="basic-addon1"
              onBlur={(e) => {
                props.handleEmailBlur(e);
              }}
            />
          </div>
          <p className="text-danger medium">{props.emailError}</p>
        </div>
        <div className="mx-4 mb-3">
          <p className="medium text-secondary " style={{ opacity: '0.8', letterSpacing: '1px' }}>
            Password
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/icons/new/ic_password.png" width="23px" height="23px" alt="password" />
            </span>
            <input
              value={props.password}
              onChange={(e) => props.handlePasswordInput(e)}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="form-control rounded-0 border-0 border-bottom medium"
              placeholder="********"
              aria-label="password"
              aria-describedby="basic-addon1"
              onBlur={(e) => {
                props.handlePasswordBlur(e);
              }}
            />
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              {showPassword ? (
                <Image
                  src="/assets/icons/new/seen_ic.png"
                  onClick={handleShowPassword}
                  width="30px"
                  height="27px"
                  alt="seen"
                />
              ) : (
                <Image
                  src="/assets/icons/new/unseen_ic.png"
                  onClick={handleShowPassword}
                  width="30px"
                  height="27px"
                  alt="un seen"
                />
              )}
            </span>
          </div>
          <p className="text-danger medium">{props.passwordError}</p>
        </div>
        <FormControl sx={{ mx: 4 }} component="fieldset" variant="standard">
          <FormGroup>
            <div className="d-flex mb-2" style={{ justifyContent: 'space-between' }}>
              <FormControlLabel
                // className="mb-2"
                control={<Checkbox name="RememberMe" size="small" onClick={props.handleRememberChecked} />}
                label={
                  <span className="medium" style={{ opacity: '0.8' }}>
                    Remember Me
                  </span>
                }
              />
              <div className="d-flex align-items-center">
                <p
                  className="cursor-pointer medium "
                  onClick={() => {
                    props.handleForgetPasswordPage();
                  }}
                  style={{ opacity: '0.8' }}
                >
                  Forgot Password?
                </p>
              </div>
            </div>
            <FormControlLabel
              className="mt-0 mb-2"
              control={<Checkbox name="Terms" onClick={props.handleTermsChecked} size="small" />}
              label={
                <span className="medium" style={{ opacity: '0.8' }}>
                  I accept{' '}
                  <span
                    className="text-primary text-decoration-underline"
                    onClick={() => {
                      window.open(`${awsLink}platforms/tc/${userPlatfrom?.term1}`);
                    }}
                  >
                    Terms & Conditions of Giisty
                  </span>
                </span>
              }
            />
            <FormControlLabel
              className="mt-1 d-flex align-items-start mb-2"
              control={<Checkbox name="Policies" className="pt-0" size="small" onClick={props.handlePoliciesChecked} />}
              label={
                <span className="medium" style={{ opacity: '0.8' }}>
                  I accept{' '}
                  <span
                    className="text-primary text-decoration-underline"
                    onClick={() => {
                      window.open(`${awsLink}platforms/tc/${userPlatfrom?.term2}`);
                    }}
                  >
                    the treatment of my Personal Information by Sanofi in accordance with the Communications and Privacy
                    Policies.
                  </span>
                </span>
              }
            />
          </FormGroup>
        </FormControl>

        <div className="d-flex justify-content-center mt-4 mx-4">
          {props.terms && props.policies ? (
            <button
              type="submit"
              className="ripple btn text-white w-100 py-3 semibold"
              style={{
                backgroundColor: COLORS.mainColor,
                borderRadius: '10px',
                outline: 'none',
              }}
              formNoValidate="formNoValidate"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              disabled
              className="ripple btn text-white w-100 py-3 semibold btn-disabled"
              style={{
                backgroundColor: COLORS.mainColor,
                borderRadius: '10px',
              }}
            >
              Login
            </button>
          )}
        </div>
      </form>
      {userPlatfrom?.show_signup_form == 1 && (
        <div className="d-flex align-items-center mt-3">
          <p className="cursor-pointer regular-small me-2" style={{ opacity: '0.8', letterSpacing: '1px' }}>
            Don't have an account?
            <Link href={'/auth/signup/SignupContainer'} className="semibold ">
              Register
            </Link>
          </p>
        </div>
      )}

      {props.successModal && (
        <InvalidModal
          invalidModal={props.successModal}
          handleInvalidModalClose={props.handleSuccessModalClose}
          heading="Password Changed"
          description="Your Password has been changed successfully."
        />
      )}
    </>
  );
};

export default Login;
