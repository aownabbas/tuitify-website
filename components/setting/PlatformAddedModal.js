import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Image from "next/image";

const style = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "12px",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    border: "none",
  },
  centeringContent: {
    textAlign: "center",
    textAlign: "center",
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "25px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    paddingTop: "5vh",
  },
  noButton: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    textTransform: "capitalize",
    border: "1px solid #353452",
    "&:hover": {
      backgroundColor: "inherit",
      textShadow: "none",
      border: "1px solid #353452",
    },
  },
  yesButton: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    color: "#FFFFFF !important",
    textShadow: "none !important",
    textTransform: "capitalize",
    backgroundColor: "#353452",
    "&:hover": {
      backgroundColor: "#353452",
      textShadow: "none",
    },
  },
};

const PlatformAddedModal = ({showModals,setShowModals}) => {
  const [open, setOpen] = useState(true);
  // alert('ddd')
  const handlemobileclose = () => setOpen(false);
  const router = useRouter();

  // console.log(router.pathname,'path')
  const {
    modalStyle,
    centeringContent,
    modalHeading,
    buttonGroup,
    noButton,
    yesButton,
  } = style;

  // const loginImage = new Image();
  // loginImage.src = "/assets/images/Rectangle 7357.svg";
  return (
    <div>
      <Modal
        open={showModals}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: "center !important" }}>
              <Image src="/assets/images/Rectangle 7357.svg" height={64} width={64} alt="Succcess" />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              Testing 02
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center !important" }}
            >
              Congratulation, new platform created successfully
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px",
              }}
            >
              <Box sx={buttonGroup}>
                <Button variant="contained" sx={yesButton}
                onClick={()=>{setShowModals(false)}}
                >
                  Okay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PlatformAddedModal;