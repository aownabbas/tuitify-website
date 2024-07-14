import classes from '../../pages/auth/signup/SignupInspire.module.css';
import COLORS from '../../public/assets/colors/colors';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SignupForm = (props) => {
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [firstFormData, setFirstFormData] = useState('');
  // states for input fields
  const [salutations, setSalutations] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // form validation [proceed button will be actived only when all fields are filled]

  function SubmitButton() {
    if (salutations && firstName && lastName && email && countryCode && phoneNumber && password) {
      return (
        <button type="button" className={`${classes.proceedButton} text-white `} onClick={setFormDataHandler}>
          Proceed
        </button>
      );
    } else {
      return (
        <button type="button" className={`${classes.proceedButton} text-white `} disabled>
          Proceed
        </button>
      );
    }
  }

  // end form validation

  const formshowPasswordHandler = () => {
    setPasswordShow(!passwordShow);
  };

  //   sending data to other form using routing
  const setFormDataHandler = (event) => {
    event.preventDefault();
    router.push({
      pathname: '/auth/signup/SecondSignupForm',
      query: {
        salutation: salutations,
        firstName: firstName,
        lastName: lastName,
        email: email,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        password: password,
      },
    });
  };

  const validateNumber = (e) => {
    // var key = window.event ? event.keyCode : event.which;
    // if (event.keyCode === 8 || event.keyCode === 46) {
    //     return true;
    // } else if ( key < 48 || key > 57 ) {
    //     return false;
    // } else {
    // 	return true;
    // }
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  return (
    <div className="container mb-3">
      <p className={`text-center mt-4 ${classes.signupStyle}`}>Sign Up</p>
      <div className="container">
        <div className="row" style={{ marginLeft: '12px', marginRight: '12px' }}>
          <select
            className="mt-4 form-control rounded-0 border-0 border-bottom"
            value={salutations}
            onChange={(e) => setSalutations(e.target.value)}
            style={{
              position: 'relative',
              border: 'none',
              borderBottom: '1px solid grey',
            }}
            required
          >
            <option value="" selected>
              Salutation
            </option>
            {props.mysalutdata?.map((myitem) => (
              <option key={myitem.salutation}>{myitem.salutation}</option>
            ))}
          </select>
        </div>
        <div className="row mt-3" style={{ marginLeft: '2px', marginRight: '2px' }}>
          <div className="col-md-6 col-sm-6 mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                <Image src="/assets/images/frame.png" alt="frame" width={21} height={18} />
              </span>

              <input
                type="text"
                id="inputFirstName"
                className="form-control rounded-0 border-0 border-bottom"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: COLORS.formBorder,
                  background: 'inherit',
                  padding: '16px',
                  opacity: '0.9',
                }}
                required
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6 mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                <Image src="/assets/images/frame.png" alt="frame" width={21} height={18} />
              </span>
              <input
                type="text"
                id="inputLastName"
                className="form-control rounded-0 border-0 border-bottom"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: COLORS.formBorder,
                  background: 'inherit',
                  padding: '16px',
                  opacity: '0.9',
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                <Image src="/assets/images/ic_email.png" alt="email" width={16.45} height={12.93} />
              </span>
              <input
                type="email"
                id="inputFirstName"
                className="form-control rounded-0 border-0 border-bottom"
                placeholder="Enter Your Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{
                  border: 'none',
                  borderBottom: '1px solid #707070',
                  background: 'inherit',
                  padding: '16px',
                  opacity: '0.9',
                }}
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginLeft: '2px', marginRight: '2px' }}>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/img/pakFlag.svg" alt="pak flag" width={29} height={18} />
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ border: 'none' }}>
                <option value="" selected>
                  code
                </option>
                {props.countryCodes?.map((myitem) => (
                  <option key={myitem.country_code}>{myitem.country_code}</option>
                ))}
              </select>
            </span>
            <input
              type="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              id="inputFirstName"
              className="form-control rounded-0 border-0 border-bottom"
              placeholder="Enter phone number"
              value={phoneNumber}
              minLength="7"
              maxLength="14"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                validateNumber;
              }}
              style={{
                border: 'none',
                borderBottom: '1px solid #707070',
                background: 'inherit',
                padding: '16px',
                opacity: '0.9',
              }}
            />
          </div>
        </div>

        <div className="row" style={{ marginLeft: '2px', marginRight: '2px' }}>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/images/ic_password.png" alt="password key" width={20} height={20} />
            </span>
            <input
              type={passwordShow ? 'text' : 'password'}
              id="inputFirstName"
              className="form-control rounded-0 border-0 border-bottom"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: 'none',
                borderBottom: '1px solid #707070',
                background: 'inherit',
                padding: '16px',
                opacity: '0.9',
              }}
              required
            />
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              {!passwordShow ? (
                <Image
                  src="/assets/icons/new/seen_ic.png"
                  alt="unseen pic"
                  width={35}
                  height={30}
                  onClick={formshowPasswordHandler}
                />
              ) : (
                <Image
                  src="/assets/icons/new/unseen_ic.png"
                  alt="unseen pic"
                  width={35}
                  height={30}
                  onClick={formshowPasswordHandler}
                />
              )}
            </span>
          </div>
        </div>
        <div className="d-grid gap-2 mb-3">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
