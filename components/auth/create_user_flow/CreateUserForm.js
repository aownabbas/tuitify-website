import Image from 'next/image';
import { useState } from 'react';
import COLORS from '../../../public/assets/colors/colors';
import SelectComponent from './SelectComponent';

const CreateUserForm = () => {
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // Password
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form>
      <div className="row"></div>
      <div className="input-group mb-3 ">
        <div className="input-group-text col-lg-2 col-md-2 col-sm-2 col-2 mt-3  border-bottom bg-white rounded-0 border-0">
          <Image src="/assets/images/select_logo.png" width={16} height={16} alt="select" />
        </div>
        <div className="col-lg-10 col-md-10 col-sm-10 col-10 ">
          <div style={{ border: 'none', width: '100%' }}>
            {' '}
            <SelectComponent />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="small" htmlFor="inputLastName" style={{ opacity: '0.8', fontSize: '13px' }}>
            First Name
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/images/frame.png" width={16} height={16} alt="firstName" />
            </span>

            <input
              type="text"
              id="inputFirstName"
              className="form-control rounded-0 border-0 border-bottom"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              style={{
                border: 'none',
                borderBottom: COLORS.formBorder,
                background: 'inherit',
                padding: '16px',
                opacity: '0.9',
              }}
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="small" htmlFor="inputLastName" style={{ opacity: '0.8', fontSize: '13px' }}>
            Last Name
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/images/frame.png" width={16} height={16} alt="lastName" />
            </span>
            <input
              type="text"
              id="inputLastName"
              className="form-control rounded-0 border-0 border-bottom"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              style={{
                border: 'none',
                borderBottom: COLORS.formBorder,
                background: 'inherit',
                padding: '16px',
                opacity: '0.9',
              }}
            />
          </div>
        </div>
        {/*  */}

        <div className="input-group mb-3">
          <label className="small" htmlFor="inputLastName" style={{ opacity: '0.8', fontSize: '13px' }}>
            Email
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              <Image src="/assets/images/ic_email.png" width="16px" height={11} />
            </span>
            <input
              type="email"
              id="inputFirstName"
              className="form-control rounded-0 border-0 border-bottom"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleChange}
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

      <div className="row">
        <label className="small" htmlFor="inputLastName" style={{ opacity: '0.8', fontSize: '13px' }}>
          Password
        </label>
        <div className="input-group mb-4">
          <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
            <Image src="/assets/images/ic_password.png" width={16} height={16} alt="password" />
          </span>

          <input
            type={passwordShown ? 'text' : 'password'}
            id="inputFirstName"
            className="form-control rounded-0 border-0 border-bottom"
            placeholder="Your Password"
            name="password"
            onChange={handleChange}
            style={{
              border: 'none',
              borderBottom: '1px solid #707070',
              background: 'inherit',
              padding: '16px',
              opacity: '0.9',
            }}
          />
          <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
            <Image src="/assets/images/ic_eye.png" onClick={togglePassword} width={16} height={11} alt="showPassword" />
          </span>
        </div>
      </div>

      <div className="d-grid gap-2 mb-3">
        <button
          type="submit"
          className="btn btn-secondary btn-lg text-white"
          style={{
            background: COLORS.mainColor,
            borderRadius: '15px',
            padding: '15px',
          }}
        >
          Create User
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
