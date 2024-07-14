import classes from "./Setting.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material";
import COLORS from "../../public/assets/colors/colors";
import { useRouter } from "next/router";

const steps = ["General Details", "Social Media & Privacy"];

const Platform = ({
  onNext,
  setName,
  name,
  status,
  setStatus,
  type,
  setType,
  textColor,
  buttonColor,
  setButtonColor,
  setTextColor,
  upload,
  handleUploadPlatformImage,
  handleUploadPlatformBg,
  uploadBg,
  srcFile,
  srcFileBg,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  // const [completed, setCompleted] = useState({});
  const [color, setColor] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const radioStyle = {
    backgroundImage:
      "linear-gradient(131.85deg, #D51AFF -19.16%, #4E6AFE 58.53%, #8BF3FE 135.61%)",
    marginRight: "10px",
  };
  const handleNextClick = () => {
    onNext();
  };
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
  const router = useRouter();

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
  const handleUploadClick = () => {
    const fileInput2 = document.getElementById("file-input");
    fileInput2.click();
  };
  const handleUploadClick2 = () => {
    const fileInput = document.getElementById("file-input-2");
    fileInput.click();
  };

  return (
    <div className="col-md-12 col-12 col-sm-12  d-flex flex-wrap w-100">
      <div className={classes.platform_box}>
        <div className="col-md-12 d-flex p-3 mt-2">
          <div className="col-md-6 px-2">
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
        <div className="col-12 col-md-12 col-sm-12 p-3">
          <div className="col-md-12 col-12 col-sm-12">
            <div className={classes.upload_img}>
              {uploadBg ? (
                <img
                  src={uploadBg ? uploadBg : "/assets/images/export.svg"}
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  onClick={handleUploadClick2}
                />
              ) : (
                <p
                  className="m-0"
                  onClick={handleUploadClick2}
                  style={{ cursor: "pointer" }}
                >
                  Upload Background Image{" "}
                  <span className="danger" style={{ color: "red" }}>
                    *
                  </span>
                </p>
              )}
              <input
                type="file"
                id="file-input-2"
                name="file"
                style={{ display: "none" }}
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  handleUploadPlatformBg(e);
                }}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex">
              <div className={classes.logo_box}>
                {upload ? (
                  <img
                    src={upload ? upload : "/assets/images/export.svg"}
                    width="92px"
                    height="92px"
                    onClick={handleUploadClick}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <>
                    <img
                      src="/assets/images/export.svg"
                      width="50px"
                      height="50px"
                      onClick={handleUploadClick}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                )}
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    handleUploadPlatformImage(e);
                  }}
                />
              </div>
              <div className={classes.chnge_lo}>
                <h4>
                  Upload Logo
                  <span className="danger" style={{ color: "red" }}>
                    *
                  </span>
                </h4>
                <p>max size: 10Mb</p>
              </div>
              <div className={classes.edt}>
                <Image
                  src="/assets/images/edit.svg"
                  width="24px"
                  height="24px"
                  onClick={handleUploadClick}
                />
              </div>
            </div>
            <div
              className={`${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2 mt-5 row`}
            >
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`${classes.myfont}`}>
                    Platform Name
                    <span className="danger" style={{ color: "red" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Giisty"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="inputfont mainborder  ps-3 mt-1"
                  />
                </div>
                <div className="col-12 mt-3 d-flex flex-column">
                  <label className={`${classes.myfont}`}>Text Color</label>
                  <input
                    type="text"
                    placeholder="Enter Text Color (Hex Code)"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="inputfont mainborder  ps-3 mt-1"
                  />
                </div>
              </div>
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`${classes.myfont}`}>Button Color</label>
                  <input
                    type="text"
                    placeholder="Enter Button Color (Hex Code)"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="inputfont mainborder  ps-3 mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-sm-8 mt-4 row">
              <div className="col-md-5">
                <div className={classes.rad}>
                  <h2>
                    Choose Platform Status
                    <span className="danger" style={{ color: "red" }}>
                      *
                    </span>
                  </h2>
                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        <input
                          type="radio"
                          id="Active"
                          name="active"
                          style={{ marginRight: "10px", accentColor: "black" }}
                          checked={status == 1}
                          onClick={() => {
                            setStatus(1);
                          }}
                        />
                        Active
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label>
                        <input
                          type="radio"
                          id="In-Active"
                          name="active"
                          checked={status == 0}
                          onClick={() => {
                            setStatus(0);
                          }}
                          style={{ marginRight: "10px", accentColor: "black" }}
                        />
                        In-Active
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className={classes.rad}>
                  <h2>
                    Choose Platform Type
                    <span className="danger" style={{ color: "red" }}>
                      *
                    </span>
                  </h2>
                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        <input
                          type="radio"
                          id="public"
                          name="public"
                          checked={type == 0}
                          onClick={() => {
                            setType(0);
                          }}
                          style={{ marginRight: "10px", accentColor: "black" }}
                        />
                        Public
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label>
                        <input
                          type="radio"
                          id="private"
                          name="public"
                          checked={type == 1}
                          onClick={() => {
                            setType(1);
                          }}
                          style={{ marginRight: "10px", accentColor: "black" }}
                        />
                        Private
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 col-12 mt-5 ">
              <div className="col-md-6 ">
                <div className={classes.btn} style={{ padding: "0px" }}>
                  <button
                    className={classes.btn1}
                    onClick={() => {
                      router.push("/setting/PlatformSetting");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={
                      !name ||
                      status == null ||
                      type == null ||
                      !upload ||
                      !uploadBg
                    }
                    className={classes.btn2}
                    onClick={handleNextClick}
                    style={{
                      opacity:
                        !name ||
                        type == null ||
                        status == null ||
                        !upload ||
                        !uploadBg
                          ? "0.5"
                          : "",
                      border: "none",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Platform;
