import { Fragment, useEffect, useRef, useState } from 'react';
import classes from './SignupInspire.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useRouter } from 'next/router';
import signupDetailFormAPI from '../../../redux/actions/SignupDetailFormAPI';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import Link from 'next/link';

const SecondSignupForm = (props) => {
  const allinputs = useRef();
  const post_formData = useSelector((state) => state.post_formData);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [variableName, setVariableName] = useState('');
  const [switchForm, setSwitchForm] = useState('professionaldetail');

  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setSwitchForm(target.value);
    }
  };

  const dataforDropdowns = useSelector((state) => state.get_salutation);
  const allData = dataforDropdowns.get_salutation;

  // second (professional form) code

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [workPlace, setWorkPlace] = useState('');
  const [workPlaceType, setWorkPlaceType] = useState('');
  const [workPlaceSector, setWorkPlaceSector] = useState('');
  const [mydata, setmydate] = useState();
  // form validation [Signup button will be actived only when all fields are filled]

  const SignupButtonHandler = () => {
    if (country && city && speciality && workPlace && workPlaceType && workPlaceSector) {
      return (
        <button type="button" onClick={(e) => SignUp(e)} className={`${classes.proceedButton} text-white `}>
          Sign Up
        </button>
      );
    } else {
      return (
        <button type="submit" className={`${classes.proceedButton} text-white `} disabled>
          Sign Up
        </button>
      );
    }
  };

  // end form validation [Signup button will be actived only when all fields are filled]

  const dispatch = useDispatch();
  const params = `name=inspire&env=Production&first_name=${props.router.query.firstName}&last_name=${props.router.query.lastName}&email=${props.router.query.email}&country=${country}&password=${props.router.query.password}&speciality=${speciality}&workplace_type=${workPlaceType}&workplace_sector=${workPlaceSector}&country_code=${props.router.query.countryCode}&city=${city}&salutation=${props.router.query.salutation}&platform_id=22&phone_number=${props.router.query.phoneNumber}&workplace_name=${workPlace}&signup_verification_token=1`;
  const SignUp = (e) => {
    e.preventDefault();
    console.log(params);
    dispatch(signupDetailFormAPI(params, onSignUpSuccess, onSignUpError));
    setCountry('');
    setCity('');
    setSpeciality('');
    setWorkPlace('');
    setWorkPlaceType('');
    setWorkPlaceSector('');

    router.push({
      pathname: '/auth/login/LoginContainer',
    });
  };
  const onSignUpSuccess = (res) => {
    setmydate(res.data);
  };
  const onSignUpError = (err) => {
    console.log(err);
  };
  const router = useRouter();

  const GotoLoginScreen = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/auth/login/LoginContainer',
    });
  };

  useEffect(() => {
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

  return (
    <>
      {loading == true ? (
        <div className="d-flex align-items-center justify-content-center alignCenter">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <Fragment>
          <div className="container">
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
            <div className="mt-4" style={{ height: '600px', borderRadius: '16px' }}>
              <div className="row">
                <div style={{ position: 'relative' }}>
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

                  {/* form 2 professional detail pane */}
                  {/* <div className={`${classes.signupSideDive}`} style={{ position: 'absolute', top: '0' }}>
                    <div className="container">
                      <p className={`${classes.mainTxtHeading} mt-3`}>Let’s Get Started</p>
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
                            disabled
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
                          />
                          <br />
                          <label className={`${classes.radiobuttonLabel} text-white`} htmlFor="professionalDetails">
                            Professional Details
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* form 2 professional detail pane */}

                  {/* form 2 code */}
                  <div className={`${classes.myFormContainer}`}>
                    <div className="row">
                      <div className="col-md-6" style={{ backgroundColor: 'inherit' }}>
                        <div
                          className={`${classes.signupSideDive} d-none d-md-block `}
                          style={{ position: 'absolute', top: 0, left: 0, width: '30%' }}
                        >
                          {/*fksjdksdfjk  */}
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
                                  disabled
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
                          {/*fksjdksdfjk  */}
                        </div>
                      </div>
                      <div className={`${classes.myFormContainermain} col-md-6 mb-3`}>
                        <div className="container ">
                          <div style={{ marginTop: '6rem' }}>
                            <form onSubmit={SignUp}>
                              <div className="container">
                                <div className="row mb-5">
                                  <div className="col-md-6">
                                    <select
                                      className="mt-4 form-control rounded-0 border-0 border-bottom"
                                      value={country}
                                      onChange={(e) => {
                                        setCountry(e.target.value);
                                      }}
                                      style={{
                                        border: 'none',
                                        borderBottom: '1px solid grey',
                                      }}
                                    >
                                      <option value="" selected>
                                        Country
                                      </option>
                                      {allData.countries?.map((countries) => (
                                        <option key={countries.country}>{countries.country}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-6">
                                    <select
                                      className="mt-4 form-control rounded-0 border-0 border-bottom"
                                      value={city}
                                      onChange={(e) => {
                                        setCity(e.target.value);
                                      }}
                                      style={{
                                        border: 'none',
                                        borderBottom: '1px solid grey',
                                      }}
                                    >
                                      <option value="" selected>
                                        City
                                      </option>
                                      {allData.cities?.map((cities) => (
                                        <option key={cities.city}>{cities.city}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-5" style={{ marginLeft: '2px', marginRight: '2px' }}>
                                  <select
                                    className="form-control rounded-0 border-0 border-bottom"
                                    value={speciality}
                                    onChange={(e) => {
                                      setSpeciality(e.target.value);
                                    }}
                                    style={{
                                      border: 'none',
                                      borderBottom: '1px solid grey',
                                    }}
                                  >
                                    <option value="" selected>
                                      Speciality
                                    </option>
                                    {allData.speciality?.map((allSpeciality) => (
                                      <option key={allSpeciality.speciality}>{allSpeciality.speciality}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="row mb-5">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      id="inputWorkplaceName"
                                      className="form-control rounded-0 border-0 border-bottom"
                                      placeholder="Workplace Name"
                                      value={workPlace}
                                      onChange={(e) => {
                                        setWorkPlace(e.target.value);
                                      }}
                                      style={{
                                        border: 'none',
                                        borderBottom: '1px solid #707070',
                                        background: 'inherit',
                                        padding: '5px',
                                        opacity: '0.9',
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="row mb-5">
                                  <div className="col-md-6 mb-4">
                                    <select
                                      className="form-control rounded-0 border-0 border-bottom"
                                      value={workPlaceType}
                                      onChange={(e) => {
                                        setWorkPlaceType(e.target.value);
                                      }}
                                      style={{
                                        border: 'none',
                                        borderBottom: '1px solid grey',
                                      }}
                                    >
                                      <option value="" selected>
                                        Workplace Type
                                      </option>
                                      {allData.workplace_type?.map((all_workplacetypes) => (
                                        <option key={all_workplacetypes.workplace_type}>
                                          {all_workplacetypes.workplace_type}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-6 mb-4">
                                    <select
                                      className="form-control rounded-0 border-0 border-bottom"
                                      value={workPlaceSector}
                                      onChange={(e) => {
                                        setWorkPlaceSector(e.target.value);
                                      }}
                                      style={{
                                        border: 'none',
                                        borderBottom: '1px solid grey',
                                      }}
                                    >
                                      <option value="" selected>
                                        Workplace Sector
                                      </option>
                                      {allData.workplace_sector?.map((wp_sector) => (
                                        <option key={wp_sector.workplace_sector}>{wp_sector.workplace_sector}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="d-grid gap-2 mb-3">
                                  <SignupButtonHandler />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* form 2 code */}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default withRouter(SecondSignupForm);
