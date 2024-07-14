import React, { useState, useEffect } from 'react';
import COLORS from '../../../public/assets/colors/colors';
import axios from 'axios';
import { URL } from '../../../public/assets/path/path';

//custom invalid modal.
import InvalidModal from '../../../components/auth/loginmodal/InvalidModal';
import { withRouter, useRouter } from 'next/router';
import Image from 'next/image';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';

const ConfirmPassword = (props) => {
  const router = useRouter();

  // states for handling input values, errors and modal opening.
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notMatchedModal, setNotMatchedModal] = useState(false);
  const [somethingWentWrongModal, setSomethingWentWrongModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  // platform data state.
  const [getPlatData, setGetPlatData] = useState(null);

  // functions for handling input data.
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // this function open modal if the password and confirm password do not match.
  const handleNotMatchedModalClose = () => {
    setNotMatchedModal(false);
  };
  const handleSuccessModalClose = () => {
    setSuccessModal(false);
  };
  const handleSomethingWentWrongModalClose = () => {
    setSomethingWentWrongModal(false);
  };

  // when user press change password button this function runs.
  const submitConfirmPasswordHandler = async (e, platformId, writtenEmail) => {
    e.preventDefault();

    // checks weather the password matches confirm password.
    if (password === confirmPassword) {
      // const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&email=${props.router.query.email}&password=${password}`;
      const params = `name=${getPlatData.name}&platform_id=${platformId}&email=${writtenEmail}&password=${password}`;
      // changed the password.
      await GlobalApiCall(
        `${URL.khbaseUrl}passowrd_changed?${params}`,
        'post',
        {},
        (response) => {
          // handle success
          if (response.data) {
            if (response.data.status === 'true') {
              setSuccessModal(true);
              setLoginPage(true);
              // route to login page. (now the password is new)
              router.push('/auth/login/LoginContainer');
            } else {
              setSomethingWentWrongModal(true);
            }
          }
        },
        function (error) {
          // handle error
          console.log(error);
        },
      );
      // axios
      //   .put(`${URL.khbaseUrl}passowrd_changed?${params}`, { password: password })
      //   .then(function (response) {
      //     // handle success
      //     if (response.data) {
      //       if (response.data.status === 'true') {
      //         setSuccessModal(true);
      //         setLoginPage(true);
      //         // route to login page. (now the password is new)
      //         router.push('/auth/login/LoginContainer');
      //       } else {
      //         setSomethingWentWrongModal(true);
      //       }
      //     }
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error);
      //   });
      setLoginPage(true);
    } else {
      setNotMatchedModal(true);
    }
  };

  // handle password blur event.
  const handlePasswordBlur = (e) => {
    if (password === '') {
      setPasswordError('Please Enter the Password.');
    }
    if (password.length < 8) {
      setPasswordError('The password should be at least 8 characters.');
    } else {
      setPasswordError(null);
    }
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }

    return () => {};
  }, []);

  return (
    <>
      <div id="wrapper" className="position-realative" style={{ overflow: 'hidden' }}>
        <div
          className="row w-100 vh-100 mx-auto"
          // style={{ height: "100vh"}}
        >
          <div
            className="col-4 pt-5 ps-5 h-100 d-none d-md-flex justify-content-start"
            style={{ backgroundColor: COLORS.mainColor }}
          >
            <div className="ms-1 ms-lg-3 w-100">
              <div className="row ms-0 ms-lg-3">
                <div
                  className="bg-white d-inline-flex p-0 justify-content-center align-items-center"
                  style={{ width: '62px', height: '62px', borderRadius: '15px' }}
                >
                  {getPlatData ? (
                    getPlatData == (null || {}) ? (
                      ''
                    ) : (
                      <Image
                        // src={getPlatData.link + "logos/" + getPlatData.logo}
                        src="/assets/logo/transparent_logo.svg"
                        width="28px"
                        height="37px"
                        alt="logo"
                      />
                    )
                  ) : (
                    ''
                  )}
                </div>
                <div
                  className="d-inline-flex p-0 justify-content-center align-items-center"
                  style={{ width: '140px', height: '80px' }}
                >
                  <Image src="/assets/logo/logo_text.png" className="" width="85px" height="28px" alt="logo" />
                </div>
              </div>
            </div>
            <span className="position-absolute start-0 bottom-0">
              <Image src="/assets/icons/new/dotes.png" width="230px" height="284px" alt="dotes" />
            </span>
          </div>
          {/* <div
            className=" col-8 mt-5"
            style={{ backgroundColor: COLORS.white }}
          >
            <div className="col-10 col-md-8 mt-5 col-lg-6 mx-auto"> */}
          <div className="col-12 col-md-8 px-0 d-block d-md-flex justify-content-center vh-100 align-items-center">
            <div
              className="col-12 py-3 d-flex d-md-none justify-content-start align-items-center"
              style={{ backgroundColor: COLORS.mainColor }}
            >
              <div className="ms-1 ms-lg-3 w-100 position-relative">
                <div className="ms-0 ms-lg-3 d-flex align-items-center position-relative">
                  <span className="d-inline-flex justify-content-start">
                    <Image src="/assets/icons/new/dotes.png" width="88px" height="109px" className="" alt="dotes" />
                  </span>
                  <div className="row d-flex align-items-center position-absolute start-50 top-50 translate-middle  justify-content-center text-center">
                    <div className="col-12 d-flex justify-content-center">
                      <div
                        className="bg-white p-0 d-flex justify-content-center align-items-center"
                        style={{ width: '47px', height: '47px', borderRadius: '15px' }}
                      >
                        {/* if we have platform data then image show */}
                        {getPlatData ? (
                          getPlatData == (null || {}) ? (
                            ''
                          ) : (
                            <Image
                              // src={(getPlatData.link+"logos/"+getPlatData.logo)}
                              src="/assets/logo/transparent_logo.svg"
                              width="21px"
                              height="28px"
                              alt="logo"
                            />
                          )
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div
                      className=" col-12 p-0 justify-content-center align-items-center pt-2"
                      style={{ width: '140px', height: '47px' }}
                    >
                      <Image src="/assets/logo/logo_text.png" className="" width="62px" height="21px" alt="logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-8 col-lg-6 mt-5 mt-md-0 px-3 justify-content-center align-items-center mx-auto"
              style={{ backgroundColor: COLORS.white }}
            >
              <Image
                src="/assets/icons/new/back-arrow.png"
                className=""
                height="17px"
                alt="back"
                width="17px"
                onClick={() =>
                  router.push({
                    pathname: '/auth/login/ForgetPassword',
                    query: { email: `${props.router.query.email}` },
                  })
                }
              />
              <h3 className="semibold-xlarge d-flex justify-content-center">Confirm Password</h3>
              {/* <form className="mt-5" onSubmit={(e) => submitConfirmPasswordHandler(e)}> */}
              <div className="mx-2">
                <p className="medium" style={{ opacity: '0.5' }}>
                  Password
                </p>
                <div className="input-group mb-3">
                  <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                    <Image src="/assets/icons/new/ic_password.png" width="23px" height="23px" alt="password" />
                  </span>
                  <input
                    value={password}
                    onChange={(e) => handlePasswordInput(e)}
                    onBlur={(e) => handlePasswordBlur(e)}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control rounded-0 border-0 border-bottom medium"
                    placeholder="********"
                    aria-label="password"
                    aria-describedby="basic-addon1"
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
                <p className="text-danger medium">{passwordError}</p>
              </div>
              <div className="mx-2">
                <p className="medium" style={{ opacity: '0.5' }}>
                  Confirm Password
                </p>
                <div className="input-group mb-3">
                  <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                    <Image src="/assets/icons/new/ic_password.png" width="23px" height="23px" alt="password" />
                  </span>
                  <input
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordInput(e)}
                    id="c_password"
                    name="c_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control rounded-0 border-0 border-bottom medium"
                    placeholder="********"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                    {showConfirmPassword ? (
                      <Image
                        src="/assets/icons/new/seen_ic.png"
                        onClick={handleShowConfirmPassword}
                        width="30px"
                        height="27px"
                        alt="seen"
                      />
                    ) : (
                      <Image
                        src="/assets/icons/new/unseen_ic.png"
                        onClick={handleShowConfirmPassword}
                        width="30px"
                        height="27px"
                        alt="un seen"
                      />
                    )}
                  </span>
                </div>
                <p className="text-danger medium">{props.passwordError}</p>
              </div>
              <div className="d-flex justify-content-center mt-5 mx-2">
                <button
                  type="submit"
                  className="btn text-white w-100 py-3 semibold"
                  style={{
                    backgroundColor: COLORS.mainColor,
                    borderRadius: '10px',
                  }}
                  formNoValidate="formNoValidate"
                  onClick={(e) => submitConfirmPasswordHandler(e, getPlatData.platform_id, props.router.query.email)}
                >
                  Update Password
                </button>
              </div>
              <div className="d-flex justify-content-center mt-5"></div>
              {/* </form> */}
              {notMatchedModal && (
                <InvalidModal
                  invalidModal={notMatchedModal}
                  handleInvalidModalClose={handleNotMatchedModalClose}
                  heading="Passwords Not Matched"
                  description="The Password and the Confirm Password you enter do not match each other. Please enter the same passwords."
                />
              )}
              {somethingWentWrongModal && (
                <InvalidModal
                  invalidModal={somethingWentWrongModal}
                  handleInvalidModalClose={handleSomethingWentWrongModalClose}
                  heading="Oops... Something went wrong"
                  description="Something is not correct. Please re-enter your passwords."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ConfirmPassword);
