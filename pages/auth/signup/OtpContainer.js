import React, { useState, useEffect } from "react";
import Login from "../../../components/auth/Login";
import COLORS from "../../../public/assets/colors/colors";
import InvalidModal from "../../../components/auth/loginmodal/InvalidModal";
import axios from "axios";
import { URL } from "../../../public/assets/path/path";
import { useRouter } from "next/router";
import login from "../../../redux/actions/Login";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import SuccessModal from "../../../components/modals/simplemodal/SuccessModal";
import DotProgress from "../../../components/DotProgress";
import Otp from "../../../components/auth/Otp";
import OtpVerifyAction from "../../../redux/actions/OtpVerifyAction";
import resendOtpAction from "../../../redux/actions/ResendOtpAction";

const OtpContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { email } = router.query;
  console.log(email, "email");

  const [successModal, setSuccessModal] = useState(false);
  const [dotLoading, setDotLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [platformId, setPlatformId] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  console.log("OTP:", otp); // Do something with the OTP, like sending it for verification

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem("@GetPlatData"));
    setPlatformId(GetPlatData.platform_id);
  }, []);

  const otpVerification = () => {
    setDotLoading(true);

    let params = `email=${email}&platform_id=${platformId}&signup_verification_token=${otp}`;

    dispatch(OtpVerifyAction(params, onOtpVerifySuccess, onOtpVerifyError));
  };

  const onOtpVerifySuccess = (res) => {
    setDotLoading(false);
    if (res.status == true) {
      setSuccessModal(true);
      setTitle("User Created!");
      setError(res.message);
    } else if (res.status == false) {
      setErrorModal(true);
      setDotLoading(false);
      setTitle("Something Wrong");

      setError(res.message);
    }
    console.log(res, "verify success");
  };

  const onOtpVerifyError = (err) => {
    setDotLoading(false)
    setErrorModal(true)
    setError(err.response.data.message)
    console.log(err, "verify error");
  };

  const resendOtp = () => {
    setDotLoading(true);

    let params = `email=${email}&platform_id=${platformId}`;

    dispatch(resendOtpAction(params, onResendOtpSuccess, onResendOtpError));
  };

  const onResendOtpSuccess = (res) => {
    setDotLoading(false);
    if (res.status == true) {
      setSuccessModal(true);
      setTitle("Success");
      setError('Otp Sent');
    } else if (res.status == false) {
      setErrorModal(true);
      setDotLoading(false);
      setTitle("Something Wrong");
      setError(res.message);
    }
    console.log(res, "otp success");
  };

  const onResendOtpError = (err) => {
    setDotLoading(false)
    setErrorModal(true)
    setError(err.response.data.message)
    console.log(err, "otp error");
  };

  return (
    <>
      {/* {isLoading == false || loading == false ? ( */}
      {dotLoading && <DotProgress />}

      <SuccessModal
        modalOpen={successModal}
        handleModalClose={() => {
          setSuccessModal(false);
        }}
        image={
          <Image
            src="/assets/images/tick.svg"
            width="65px"
            height="70px"
            alt="alert"
          />
        }
        title={title}
        description={error}
        button1={"Okay"}
        link={"/"}
        setDotProgressLoading={setDotLoading}
      />
      <SuccessModal
        modalOpen={errorModal}
        handleModalClose={() => {
          setErrorModal(false);
        }}
        image={
          <Image
            src="/assets/icons/new/red_alert.svg"
            width="65px"
            height="70px"
            alt="alert"
          />
        }
        title={"Something went wrong!"}
        description={error}
        button1={"Okay"}
        // link={"/"}
        setDotProgressLoading={setDotLoading}
      />
      <div
        id="wrapper"
        className="position-realative"
        style={{ overflow: "hidden" }}
      >
        <div
          className="row w-100 vh-100 mx-auto"
          // style={{ height: "25vh"}}
        >
          <div
            className="col-8 col-md-8 col-sm-8 p-0"
            style={{ backgroundColor: COLORS.mainColor }}
          >
            <div className="authentication-bg"></div>
          </div>
          <div className="col-12 col-md-4 px-0 d-block d-md-flex justify-content-center vh-100 align-items-center">
            <div
              className="col-12 py-3 d-flex d-md-none justify-content-start align-items-center"
              style={{ backgroundColor: COLORS.mainColor }}
            >
              <div className="ms-1 ms-lg-3 w-100 position-relative">
                <div className="ms-0 ms-lg-3 d-flex align-items-center position-relative">
                  <span className="d-inline-flex justify-content-start">
                    <Image
                      src="/assets/icons/new/dotes.png"
                      width="88px"
                      height="109px"
                      className=""
                      alt="dotes"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-10 col-lg-10 mt-5 mt-md-0 d-flex justify-content-center align-items-center mx-auto"
              style={{ backgroundColor: COLORS.white, flexDirection: "column" }}
            >
              {/* <div className="mx-auto "> */}
              {/* SignUp Page */}

              <Otp
                setOtp={setOtp}
                //   onNext={handleNextClick}
                otpVerification={otpVerification}
                resendOtp={resendOtp}
                otp={otp}
                email={email}
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpContainer;
