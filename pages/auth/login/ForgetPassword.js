import React, { useState, useEffect } from 'react';
import COLORS from '../../../public/assets/colors/colors';
import { withRouter, useRouter } from 'next/router';
// confirm password page import.
import ConfirmPassword from './ConfirmPassword';
import axios from 'axios';
import { URL } from '../../../public/assets/path/path';
//custom invalid modal.
import InvalidModal from '../../../components/auth/loginmodal/InvalidModal';
import Image from 'next/image';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';

const ForgetPassword = (props) => {
  const router = useRouter();

  // states for handling input values, modal opening
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(null);
  const [invalidCodeModal, setInvalidCodeModal] = useState(false);
  const [confirmPasswordPage, setConfirmPasswordPage] = useState(false);

  // platform data state.
  const [getPlatData, setGetPlatData] = useState(null);

  // function for closing invalid modal.
  const handleInvalidCodeModalClose = () => setInvalidCodeModal(false);

  const handleConfirmPasswordPageBack = () => {
    setConfirmPasswordPage(false);
  };

  // when submit the code.
  const submitCodeHandler = async (e, environment, platformId, OTPCode, writtenEmail) => {
    e.preventDefault();
    // check weather the code is right.
    try {
      // const params = `name=${getPlatData.name}&env=${code_verified.env}&platform_id=${getPlatData.platform_id}&email=${props.router.query.email}&code=${code}`;
      const params = `platform_id=${platformId}&email=${writtenEmail}&code=${OTPCode}`;
      await GlobalApiCall(`${URL.khbaseUrl}code_verified?${params}`, 'post', {}, function (response) {
        // handle success
        if (response.data.status === 'true') {
          setConfirmPasswordPage(true);
          router.push({
            pathname: '/auth/login/ConfirmPassword',
            query: { email: `${writtenEmail}` },
          });
        } else {
          // if code is incorrect.
          setCodeError(
            'The code you Enter is incorrect. Please enter the correct code that is sent to the specific E-mail',
          );
          setInvalidCodeModal(true);
        }
      });
    } catch (error) {
      (function (error) {
        // handle error
        console.log(error, 'the error reponse');
      });
    }
  };

  // code input field value getting.
  const handleVerificationCode = (e) => {
    setCode(e.target.value);
  };

  function getSecondPart(str) {
    return str.split('=')[1];
  }

  useEffect(() => {
    // get platform data from local storage.
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      setGetPlatData(GetPlatData);
    }

    return () => {};
  }, []);

  return (
    <>
      {confirmPasswordPage ? (
        // confirm page if the code enter was correct.
        <ConfirmPassword
          handleForgetPasswordPage={props.handleForgetPasswordPage}
          submitLoginHandler={props.submitLoginHandler}
          handleEmailInput={props.handleEmailInput}
          handlePasswordInput={props.handlePasswordInput}
          handleRememberChecked={props.handleRememberChecked}
          handleTermsChecked={props.handleTermsChecked}
          handleConfirmPasswordPageBack={handleConfirmPasswordPageBack}
          remember={props.remember}
          password={props.password}
          email={props.email}
          terms={props.terms}
          emailError={props.emailError}
          passwordError={props.passwordError}
        />
      ) : (
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
                      className="bg-white p-0 d-inline-flex justify-content-center align-items-center"
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
                    {/* <span className="text-white extrabold-large mx-4">giisty</span> */}
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
              > */}
              {/* <div className="col-10 col-md-8 mt-5 col-lg-6 mx-auto"> */}
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
                  {/* <div className="mx-auto "> */}
                  <Image
                    src="/assets/icons/new/back-arrow.png"
                    className=""
                    width="17px"
                    height="17px"
                    alt="back"
                    onClick={() =>
                      // if press back button goes to login page.
                      router.push('/auth/login/LoginContainer')
                    }
                  />
                  <h3 className="semibold-xlarge d-flex justify-content-center">Forget Password</h3>
                  {/* <form className="mt-5" onSubmit={(e) => submitCodeHandler(e)}> */}
                  <div className="mx-2">
                    <p className="medium" style={{ opacity: '0.5' }}>
                      OTP Verification
                    </p>
                    <div className="input-group mb-3">
                      <input
                        value={code}
                        onChange={(e) => handleVerificationCode(e)}
                        id="code"
                        name="code"
                        type="text"
                        className="form-control text-center rounded-0 border-0 border-bottom medium"
                        placeholder="Enter Verification Code"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-5 mx-2">
                    {/* if the code is more or equal to the 4 characters then button enable otherwise disabled */}
                    {code.length >= 4 ? (
                      <button
                        type="submit"
                        className="btn text-white w-100 py-3 semibold"
                        style={{
                          backgroundColor: COLORS.mainColor,
                          borderRadius: '10px',
                        }}
                        onClick={(e) =>
                          submitCodeHandler(
                            e,
                            getPlatData?.env,
                            getPlatData?.platform_id,
                            code,
                            props.router.query.email,
                          )
                        }
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled
                        className="btn text-white w-100 py-3 semibold btn-disabled"
                        style={{
                          backgroundColor: COLORS.mainColor,
                          borderRadius: '10px',
                        }}
                      >
                        Done
                      </button>
                    )}
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
          {codeError && (
            // if the code is incorrect open invalid model.
            <InvalidModal
              invalidModal={invalidCodeModal}
              handleInvalidModalClose={handleInvalidCodeModalClose}
              heading="Invalid Code"
              description={codeError}
            />
          )}
        </>
      )}
    </>
  );
};

export default withRouter(ForgetPassword);
