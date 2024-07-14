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
import OTPInput from "../otpInput/OtpInput";
var modalShow;

const steps = ["Sign Up Details", "Professional Details"];
const Otp = (props) => {
  console.log(props, "ddddd");
  const router = useRouter();

  // const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [getPlatData, setGetPlatData] = useState({});
  const [assetsLink, setAssetsLink] = useState("");
  // const [modalShow, setModalShow] =useState(false)
  const [openModal, setOpenModal] = useState(false);

  const { userPlatfrom } = useSelector((state) => state.get_plat);

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

  const handleOTPComplete = (otp) => {
    props.setOtp(otp);
  };

  return (
    <>
      {openModal ? <LoginModal /> : null}
      <div className="ms-1 ms-lg-3 w-100 d-flex justify-content-center mb-5 ">
        <div
          className="d-flex justify-content-center align-items-center mb-2"
          style={{ flexDirection: "column" }}
        >
          <h2>OTP Verification</h2>
          <p style={{ color: "#7C8185" }}>
            Enter OTP Code that you have received by email!
          </p>
          {props.email ? (
            <p className="semibold mt-3">
              {props.email[0]}
              {"*".repeat(props.email.indexOf("@") - 5)}
              {props.email[props.email.indexOf("@") - 1]}
              {props.email.substring(props.email.indexOf("@"))}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="mt-3 col-md-10">
        <div className="row mt-3 ">
          <div className="col-md-12 d-flex justify-content-center">
            {/* <p className="medium text-secondary">Email</p>
            <div className="input-group mb-3">
              <span
                className="input-group-text rounded-0 border-0 border-bottom bg-white"
                id="basic-addon1"
              >
                <Image
                  src="/assets/icons/new/ic_email.png"
                  width="23px"
                  height="18px"
                  alt="email"
                />
              </span>
              <input
                value={props.email}
                onChange={(e) => props.handleEmailInput(e)}
                // id="email"
                name="otp"
                type="otp"
                style={{ fontSize: "16px" }}
                className="form-control rounded-0 border-0 border-bottom medium"
                placeholder="Enter OTP"
              />
            </div>
            <p className="text-danger medium">{props.emailError}</p> */}
            <OTPInput numInputs={6} onComplete={handleOTPComplete} />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5 mb-3  col-md-12">
          <button
            type="submit"
            // disabled={
            //   !props.firstName ||
            //   !props.lastName ||
            //   !props.email ||
            //   !props.phoneNumber ||
            //   !props.password
            // }
            className="ripple btn text-white w-100 py-3 semibold "
            style={{
              background:
                "linear-gradient(223.45deg, #88EDFE -20.39%, #625EFE 42.98%, #C224FE 109.21%)",
              borderRadius: "10px",
            }}
            onClick={() => {
              props.otpVerification();
            }}
          >
            Verify OTP
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center mt-4">
        <p
          className="cursor-pointer regular-small me-2"
          style={{ opacity: "0.8", letterSpacing: "1px" }}
        >
          Didn’t received OTP?
          <span
            className="semibold px-2 "
            onClick={() => {
              props.resendOtp();
            }}
          >
            Send Again
          </span>
        </p>
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

export default Otp;
