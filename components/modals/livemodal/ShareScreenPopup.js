import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
export default function ShareScreenPopup({
  openScreenPopup,
  anchorEl,
  setAnchorEl,
}) {
  //   const [anchorEl, setAnchorEl] = useState(null);

  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div sx={{paddingBottom:"20px" }}>
      {/* <Button aria-describedby={id} variant="contained" onClick={openScreenPopup}>
        Open Popover
      </Button> */}
      <Popover
        sx={{ marginLeft: "30px",paddingBottom:"20px" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div
          style={{
            width: "300px",
            padding: "20px",
          }}
        >
          <Typography className="semibold-mid-large">
            Share your screen
          </Typography>
          <div className="d-flex mt-3 cursor-pointer">
            <div className="">
              <Image
                className="rounded-3"
                src="/assets/icons/meetingIcons/entireScreen.png"
                width={16}
                height={10}
                alt="backIcon"
              />
            </div>
            <div className="ms-3 medium-mid-large">Your Entire Screen</div>
          </div>
          <div className="d-flex mt-3 cursor-pointer">
            <div className="">
              <Image
                className="rounded-3"
                src="/assets/icons/meetingIcons/windowScreen.png"
                width={16}
                height={10}
                alt="backIcon"
              />
            </div>
            <div className="ms-3 medium-mid-large">A Window</div>
          </div>
          <div className="d-flex mt-3 cursor-pointer">
            <div className="">
              <Image
                className="rounded-3"
                src="/assets/icons/meetingIcons/tabScreen.png"
                width={16}
                height={10}
                alt="backIcon"
              />
            </div>
            <div className="ms-3 medium-mid-large">A Tab</div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
