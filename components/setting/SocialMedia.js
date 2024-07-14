import classes from "./Setting.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
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

const SocialMedia = ({
  setShowModals,
  setLinkedin,
  setTwitter,
  setFaceb,
  twitter,
  linkedin,
  faceb,
  platformData,
  uploadPdfFile,
  handleUploadPlatformPdf,
  srcFilePdf,
  uploadPdfs,
  srcFilePdf2,
  handleUploadPlatformPdf2,
  updatePlatform,
  setDotLoading,
}) => {
  console.log(uploadPdfs, uploadPdfFile, "srcFilePdf");
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState("");
  const [upload2, setUpload2] = useState("");
  const [uploadDcoument, setUploadDcoument] = useState(false);
  const [uploadDcoument2, setUploadDcoument2] = useState(false);

  const handleUploadClick1 = () => {
    const fileInput1 = document.getElementById("file-input");
    fileInput1.click();
  };
  const handleUploadClick = () => {
    const fileInput2 = document.getElementById("file-input-2");
    fileInput2.click();
  };
  console.log(upload, "eeee");
  const uploadPdf = (e) => {
    setUpload(e.target.files[0]);
    setUploadDcoument(true);
  };
  const uploadPdf2 = (e) => {
    setUpload2(e.target.files[0]);
    setUploadDcoument2(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
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
  const { id } = router.query;
  return (
    <div className="col-md-12 col-12 col-sm-12  d-flex flex-wrap w-100">
      <div className={classes.platform_box} style={{ minHeight: "568px" }}>
        <div className="col-md-12 d-flex p-3 mt-2">
          <div className="col-md-6">
            <Stepper
              // nonLinear
              activeStep={2}
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
          <div className="col-md-6 d-flex flex-row-reverse">
            <div className={classes.btn}>
              <button
                className={classes.btn1}
                onClick={() => {
                  router.push("/setting/PlatformSetting");
                }}
              >
                Cancel
              </button>
              <button
                className={classes.btn2}
                disabled={!uploadPdfFile || !uploadPdfs}
                style={{
                  opacity: !uploadPdfFile || !uploadPdfs ? "0.5" : "",
                  border: "none",
                }}
                onClick={() => {
                  setDotLoading(true);
                  {
                    id ? updatePlatform() : platformData();
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12 px-3">
          <h1 className={classes.socialHead}>Social Media</h1>
        </div>
        <div className="col-12 col-md-12 col-sm-12 px-3">
          <div className="col-md-12">
            <div
              className={`${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2 mt-5 row`}
            >
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`${classes.myfont}`}>Facebook</label>
                  <input
                    type="text"
                    placeholder="Enter facebook url"
                    value={faceb}
                    onChange={(e) => setFaceb(e.target.value)}
                    className="inputfont mainborder  ps-3 mt-1"
                  />
                </div>
                <div className="col-12 mt-3 d-flex flex-column">
                  <label className={`${classes.myfont}`}>Linked In</label>
                  <input
                    type="text"
                    placeholder="Enter linkedin url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="inputfont mainborder  ps-3 mt-1"
                  />
                </div>
              </div>
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`${classes.myfont}`}>Twitter</label>
                  <input
                    type="text"
                    placeholder="Enter twitter url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="inputfont mainborder  ps-3 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 px-3 mt-4">
          <h1 className={classes.socialHead}>Terms & Conditions</h1>
        </div>
        <div className="col-12 col-md-12 col-sm-12 px-3">
          <div className="col-md-12">
            <div
              className={`${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2 mt-3 row`}
            >
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`${classes.myfont}`}>
                    Upload U & C Document
                    <span className="danger" style={{ color: "red" }}>
                      *
                    </span>
                  </label>
                  {uploadPdfFile ? (
                    <div className={classes.u_document}>
                      <div
                        className="col-md-12 row m-0 p-2"
                        onClick={handleUploadClick1}
                      >
                        <div
                          className="col-md-2"
                          style={{ paddingLeft: "0px" }}
                        >
                          <Image
                            src="/assets/images/Rectangle 7018.png"
                            width="52px"
                            height="65px"
                          />
                        </div>
                        <div
                          className="col-md-8"
                          style={{ paddingLeft: "0px" }}
                        >
                          <p className={classes.U_C}>{srcFilePdf?.name}</p>
                          <p className={classes.pdf}>18 Mbs</p>
                          <Box sx={{ width: "100%", marginTop: "15px" }}>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                            />
                          </Box>
                        </div>
                      </div>
                      {/* Upload PDF Document */}
                    </div>
                  ) : (
                    <div className={classes.upload_document}>
                      <span
                        onClick={handleUploadClick1}
                        style={{ cursor: "pointer" }}
                      >
                        Upload PDF Document
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    value={upload2}
                    onChange={(e) => {
                      handleUploadPlatformPdf(e);
                    }}
                    accept=".pdf"
                  />
                </div>
              </div>
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`${classes.myfont}`}>
                    Upload T & C Document
                    <span className="danger" style={{ color: "red" }}>
                      *
                    </span>
                  </label>
                  {uploadPdfs ? (
                    <div className={classes.u_document}>
                      <div
                        className="col-md-12 row m-0 p-2"
                        onClick={handleUploadClick}
                      >
                        <div
                          className="col-md-2"
                          style={{ paddingLeft: "0px" }}
                        >
                          <Image
                            src="/assets/images/Rectangle 7018.png"
                            width="52px"
                            height="65px"
                          />
                        </div>
                        <div
                          className="col-md-8"
                          style={{ paddingLeft: "0px" }}
                        >
                          <p className={classes.U_C}>{srcFilePdf2?.name}</p>
                          <p className={classes.pdf}>18 Mbs</p>
                          <Box sx={{ width: "100%", marginTop: "15px" }}>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                            />
                          </Box>
                        </div>
                      </div>
                      {/* Upload PDF Document */}
                    </div>
                  ) : (
                    <div className={classes.upload_document}>
                      <span
                        onClick={handleUploadClick}
                        style={{ cursor: "pointer" }}
                      >
                        Upload PDF Document
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="file-input-2"
                    name="file"
                    style={{ display: "none" }}
                    value={upload}
                    onChange={(e) => {
                      handleUploadPlatformPdf2(e);
                    }}
                    accept=".pdf"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
