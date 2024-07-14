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
const SignUpSecondForm = (props) => {
  console.log(props.handleCreateUser, "dddddss");
  const router = useRouter();

  // const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [getPlatData, setGetPlatData] = useState({});
  // const [modalShow, setModalShow] =useState(false)
  const [openModal, setOpenModal] = useState(false);
  
  const [userPlatfrom, setUserPlatfrom] = useState('')

  // const { userPlatfrom } = useSelector((state) => state.get_plat);

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

  return (
    <>
      {openModal ? <LoginModal /> : null}
      <div className="ms-1 ms-lg-3 w-100 d-flex justify-content-center">
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
      <div className="col-md-12 d-flex justify-content-center mt-2 ">
        <div className="col-md-9">
          <Stepper
            // nonLinear
            activeStep={1}
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
      <div className="mt-2 col-md-12">
        <div className="row mb-4">
          <div className="col-md-6">
            <select
              className="mt-4 form-control rounded-0 border-0 border-bottom"
              value={props.country}
              onChange={(e) => {
                props.setCountry(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid grey",
              }}
            >
              <option value="" selected>
                Country
              </option>
              {props.dropdownData.countries?.map((countries) => (
                <option key={countries.country}>{countries.country}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="mt-4 form-control rounded-0 border-0 border-bottom"
              value={props.city}
              onChange={(e) => {
                props.setCity(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid grey",
              }}
            >
              <option value="" selected>
                City
              </option>
              {props.dropdownData.cities?.map((cities) => (
                <option key={cities.city}>{cities.city}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          className="row mb-4"
          style={{ marginLeft: "2px", marginRight: "2px" }}
        >
          <select
            className="form-control rounded-0 border-0 border-bottom"
            value={props.speciality}
            onChange={(e) => {
              props.setSpeciality(e.target.value);
            }}
            style={{
              border: "none",
              borderBottom: "1px solid grey",
            }}
          >
            <option value="" selected>
              Speciality
            </option>
            {props.dropdownData.speciality?.map((allSpeciality) => (
              <option key={allSpeciality.speciality}>
                {allSpeciality.speciality}
              </option>
            ))}
          </select>
        </div>
        <div className="row mb-4">
          <div className="input-group">
            <input
              type="text"
              id="inputWorkplaceName"
              className="form-control rounded-0 border-0 border-bottom"
              placeholder="Workplace Name"
              value={props.workplace}
              onChange={(e) => {
                props.setWorkplace(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid #707070",
                background: "inherit",
                padding: "5px",
                opacity: "0.9",
              }}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <select
              className="form-control rounded-0 border-0 border-bottom"
              value={props.workplaceType}
              onChange={(e) => {
                props.setWorkplaceType(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid grey",
              }}
            >
              <option value="" selected>
                Workplace Type
              </option>
              {props.dropdownData.workplace_type?.map((all_workplacetypes) => (
                <option key={all_workplacetypes.workplace_type}>
                  {all_workplacetypes.workplace_type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-control rounded-0 border-0 border-bottom"
              value={props.workplaceSector}
              onChange={(e) => {
                props.setWorkplaceSector(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid grey",
              }}
            >
              <option value="" selected>
                Workplace Sector
              </option>
              {props.dropdownData.workplace_sector?.map((wp_sector) => (
                <option key={wp_sector.workplace_sector}>
                  {wp_sector.workplace_sector}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mx-4 mb-3"></div>

        <div className="d-flex justify-content-center mt-4 mx-4">
          <button
            type="submit"
            disabled={
              !props.country ||
              !props.city ||
              !props.speciality ||
              !props.workplace ||
              !props.workplaceSector ||
              !props.workplaceType
            }
            className="ripple btn text-white w-100 py-3 semibold "
            style={{
              background:
                "linear-gradient(223.45deg, #88EDFE -20.39%, #625EFE 42.98%, #C224FE 109.21%)",
              borderRadius: "10px",
            }}
            onClick={() => {
              props.handleCreateUser();
            }}
          >
            Submit
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

export default SignUpSecondForm;
