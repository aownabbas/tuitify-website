import React, { Fragment, useEffect, useState } from 'react';
import classes from './SignupInspire.module.css';
import SignupForm from '../../../components/auth/SignupForm';
import signupDetailFormDrop from '../../../redux/actions/signupDetailFormDrop';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import getPlat from '../../../redux/actions/GetPlat';
import Link from 'next/link';

const FirstSignupForm = () => {
  const [loading, setLoading] = useState(false);

  const [switchForm, setSwitchForm] = useState('signupdetail');
  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setSwitchForm(target.value);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlat());
    dispatch(signupDetailFormDrop());
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
  const mySolutationData = useSelector((state) => state.get_salutation);

  const router = useRouter();

  const GotoLoginScreen = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/auth/login/LoginContainer',
    });
  };

  return (
    <>
      {loading == true ? (
        <div className="d-flex align-items-center justify-content-center alignCenter">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <Fragment>
          <div className="overflow-scroll mx-5" style={{height: "98vh"}}>
            <div className="mt-2">
              <div className="d-flex justify-content-between">
                <div style={{ display: 'block', width: 114, height: 62 }}>
                  <Image
                    src="/assets/img/inspireLogo.svg"
                    alt="Inspire Logo"
                    height={62}
                    width={114}
                    layout="responsive"
                  />
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <div className="d-flex justify-content-between" style={{ marginTop: '0.8rem' }}>
                    <p style={{ paddingLeft: '2rem' }}>
                      <Link href="">
                        <a style={{ textDecoration: 'none' }}>Home</a>
                      </Link>
                    </p>
                    <p style={{ paddingLeft: '2rem' }}>
                      <Link href="">
                        <a style={{ textDecoration: 'none' }}>Create Content</a>
                      </Link>
                    </p>
                    <p style={{ paddingLeft: '2rem' }}>
                      <Link href="">
                        <a style={{ textDecoration: 'none' }}>About Us</a>
                      </Link>
                    </p>
                  </div>
                  <div className="d-flex justify-content-evenly">
                    <div style={{ paddingLeft: '5rem' }}>
                      <button className={classes.navButton} onClick={GotoLoginScreen}>
                        LOGIN
                      </button>
                    </div>
                    {/* <div>
                      <button className={classes.navButton2}>SIGN UP</button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4" style={{ height: '80px', borderRadius: '16px' }}>
              <div className="row">
                <div style={{ position: 'relative' }} className="px-0" >
                  <div className="d-none d-sm-block" style={{ height: '550px', width: '100%' }}>
                    <Image
                      src="/assets/images/signup-page-image.png"
                      alt="signup-page-image"
                      className="img-fluid"
                      height={550}
                      width={550}
                      layout="fill"
                    />
                  </div>
                  {/* <div
                    className={`${classes.signupSideDive} d-none d-md-block `}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  >
                    <div className="container">
                      <p className={`${classes.mainTxtHeading}`} style={{ paddingTop: '2rem' }}>
                        Let’s Get Started
                      </p>
                      <p className={`${classes.mainTxt} mt-3`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac sem habitant
                      </p>
                      <div className="d-flex justify-content-around mt-4">
                        <div>
                          <input
                            type="radio"
                            id="SignUpDetails"
                            value="signupdetail"
                            checked={switchForm == 'signupdetail'}
                            onChange={handleChange}
                            style={{
                              height: '29px',
                              width: '29px',
                            }}
                          />
                          <br />
                          <label className={`${classes.radiobuttonLabel} text-white`} htmlFor="SignUpDetails">
                            Sign Up Details
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="professionalDetails"
                            value="professionaldetail"
                            checked={switchForm == 'professionaldetail'}
                            onChange={handleChange}
                            style={{
                              height: '29px',
                              width: '29px',
                            }}
                            disabled
                          />
                          <br />
                          <label className={`${classes.radiobuttonLabel} text-white`} htmlFor="professionalDetails">
                            Professional Details
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className={`${classes.myFormContainer}`}>
                    <div className="row">
                      <div className="col-md-6" style={{ backgroundColor: 'inherit' }}>
                        {/* pane */}
                        <div
                          className={`${classes.signupSideDive} d-none d-md-block `}
                          style={{ position: 'absolute', top: 0, left: 0, width: '30%' }}
                        >
                          <div className="container">
                            <p className={`${classes.mainTxtHeading}`} style={{ paddingTop: '2rem' }}>
                              Let’s Get Started
                            </p>
                            <p className={`${classes.mainTxt} mt-3`}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac sem habitant
                            </p>
                            <div className="d-flex justify-content-around mt-4 mb-4">
                              <div>
                                <input
                                  type="radio"
                                  id="SignUpDetails"
                                  value="signupdetail"
                                  checked={switchForm == 'signupdetail'}
                                  onChange={handleChange}
                                  style={{
                                    height: '29px',
                                    width: '29px',
                                  }}
                                />
                                <br />
                                <label className={`${classes.radiobuttonLabel} text-white`} htmlFor="SignUpDetails">
                                  Sign Up Details
                                </label>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="professionalDetails"
                                  value="professionaldetail"
                                  checked={switchForm == 'professionaldetail'}
                                  onChange={handleChange}
                                  style={{
                                    height: '29px',
                                    width: '29px',
                                  }}
                                  disabled
                                />
                                <br />
                                <label
                                  className={`${classes.radiobuttonLabel} text-white`}
                                  htmlFor="professionalDetails"
                                >
                                  Professional Details
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*  */}
                      </div>
                      <div className={`${classes.myFormContainermain} col-md-6 mb-3`}>
                        {[mySolutationData].map((saluteItem) => (
                          <SignupForm
                            key={saluteItem.id}
                            mysalutdata={saluteItem.get_salutation.salutation}
                            countryCodes={saluteItem.get_salutation.contry_code}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default FirstSignupForm;
