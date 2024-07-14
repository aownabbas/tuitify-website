import React, { useEffect, useState } from "react";
import COLORS from "../../public/assets/colors/colors";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InvalidModal from "./loginmodal/InvalidModal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Image from "next/image";
import LoginModal from "../modals/loginmodal/LoginModal";
import { MenuItem, Select } from "@mui/material";

import {
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
var modalShow;

const steps = ["Sign Up Details", "Professional Details"];
const SignUp = (props) => {
  console.log(props , "ddddd");
  const router = useRouter();

  // const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [getPlatData, setGetPlatData] = useState({});
  const [assetsLink, setAssetsLink] = useState("");
  // const [modalShow, setModalShow] =useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [userPlatfrom, setUserPlatfrom] = useState('')

  // const { userPlatfrom } = useSelector((state) => state.get_plat);
  console.log(userPlatfrom,'userPlatfrom');

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;


  // const [platformName, setPlatformName] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // let platformName ;

  let name;
  try {
    const storedData = localStorage.getItem("@GetPlatData");
    name = storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    // Handle the error appropriately (e.g., provide a default value)
    name = null;
  }
  console.log(name?.name, "namee");

  // platformName = GetPlatData?.name

  useEffect((props) => {
    const GetPlatData = JSON.parse(localStorage.getItem("@GetPlatData"));
    setUserPlatfrom(GetPlatData)

    // setPlatformName(GetPlatData?.name);
    modalShow = router.query.Expire;
    if (modalShow == "true") {
      setOpenModal(true);
    }
    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    return () => {};
  }, []);
  // connector code
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor: COLORS.mainColor,
      borderRadius: 1,
      opacity: "0.2",
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: COLORS.mainColor,
    zIndex: 1,
    color: "#fff",
    width: 24,
    height: 24,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(!ownerState.completed &&
      !ownerState.active && {
        opacity: "0.2",
      }),
    ...(ownerState.active && {
      backgroundImage: `url(${"/assets/icons/new/activestep.svg"})`,
      fontWeight: "bold",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage: `url(${"/assets/icons/new/checkedtick.svg"})`,
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {};

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

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
    props.setPhoneNumber(value);
  };

  return (
    <>
      {openModal ? <LoginModal /> : null}
      <div className="ms-1 ms-lg-3 w-100 d-flex justify-content-center ">
      <div className="d-flex justify-content-center align-items-center mb-2">
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
      <div className="col-md-12 d-flex justify-content-center mt-2">
        <div className="col-md-9">
          <Stepper
            // nonLinear
            activeStep={0}
            alternativeLabel
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                //  completed={completed[index]}
              >
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      <div
        className="mt-2"
      >
      <div className="row" style={{ marginLeft: '12px', marginRight: '12px' }}>
          <select
            className="mt-4 form-control rounded-0 border-0 border-bottom"
            value={props.salutations}
            onChange={(e) => props.setSalutations(e.target.value)}
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
            {props.dropdownData.salutation?.map((myitem) => (
              <option key={myitem.salutation}>{myitem.salutation}</option>
            ))}
          </select>
        </div>
        <div className="row mt-3" style={{ marginLeft: '2px', marginRight: '2px' }}>
          <div className="col-md-6 col-sm-6 ">
            <div className="input-group mb-3">
              <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                <Image src="/assets/images/frame.png" alt="frame" width={21} height={18} />
              </span>

              <input
                type="text"
                id="inputFirstName"
                className="form-control rounded-0 border-0 border-bottom"
                placeholder="First Name"
                value={props.firstName}
                onChange={(e) => props.setFirstName(e.target.value)}
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
          <div className="col-md-6 col-sm-6 ">
            <div className="input-group mb-3">
              <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
                <Image src="/assets/images/frame.png" alt="frame" width={21} height={18} />
              </span>
              <input
                type="text"
                id="inputLastName"
                className="form-control rounded-0 border-0 border-bottom"
                placeholder="Last Name"
                value={props.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
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
          <div className="row col-md-12" style={{ paddingRight:'0px' }} >
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
                onChange={(e) => props.setEmail(e.target.value)}
                value={props.email}
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
       
        <div className="row mb-3" style={{ marginLeft: '2px', marginRight: '2px' }}>
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 border-0 border-bottom bg-white" id="basic-addon1">
              {/* <Image src="/assets/img/pakFlag.svg" alt="pak flag" width={29} height={18} /> */}
              <select value={props.countryCode} onChange={(e) => props.setCountryCode(e.target.value)} style={{ border: 'none' }}>
                <option value="" selected>
                  +92
                </option>
                {props.dropdownData.contry_code?.map((myitem) => (
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
              value={props.phoneNumber}
              minLength="7"
              maxLength="14"
              onChange={(e) => {
                props.setPhoneNumber(e.target.value);
                validateNumber;
              }}
              style={{
                border: 'none',
                borderBottom: '1px solid #707070',
                background: 'inherit',
                padding: '16px',
                opacity: '0.9',
              }}
              autocomplete="new-phone"
            />
          </div>
        </div>
        <div className="row mb-3" style={{ marginLeft: '2px', marginRight: '2px' }}>
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 border-0 border-bottom bg-white"
              id="basic-addon1"
            >
              <Image
                src="/assets/icons/new/ic_password.png"
                width="23px"
                height="23px"
                alt="password"
              />
            </span>
            <input
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control rounded-0 border-0 border-bottom medium"
              placeholder="********"
              aria-label="password"
              aria-describedby="basic-addon1"
              autocomplete="new-password"

              //   onBlur={(e) => {
              //     props.handlePasswordBlur(e);
              //   }}
            />
            <span
              className="input-group-text rounded-0 border-0 border-bottom bg-white"
              id="basic-addon1"
            >
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

        <div className="d-flex justify-content-center mt-4 mx-4">
          <button
            type="submit"
              disabled = {!props.firstName || !props.lastName || !props.email || !props.phoneNumber || !props.password}
            className="ripple btn text-white w-100 py-3 semibold "
            style={{
              background:
                "linear-gradient(223.45deg, #88EDFE -20.39%, #625EFE 42.98%, #C224FE 109.21%)",
              borderRadius: "10px",
            }}
            onClick={() => {
              props.onNext();
            }}
          >
            Next
          </button>
        </div>
      </div>
      {/* <div className="d-flex align-items-center mt-5">
        <p
          className="cursor-pointer regular-small "
          style={{ opacity: "0.8", letterSpacing:'1px' }}
        >
          Don't have an account?
          <span className="semibold">
            Register
          </span>
        </p>
      </div> */}
      {/* {props.successModal && (
        <InvalidModal
          invalidModal={props.successModal}
          handleInvalidModalClose={props.handleSuccessModalClose}
          heading="Password Changed"
          description="Your Password has been changed successfully."
        />
      )} */}
    </>
  );
};

export default SignUp;
