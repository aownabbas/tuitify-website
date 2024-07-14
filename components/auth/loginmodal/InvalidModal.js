import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import COLORS from "../../../public/assets/colors/colors";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 440,
    bgcolor: 'background.paper',
    border: '0px',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

const InvalidModal = (props) => {
    return (
        <>
        <Modal
            open={props.invalidModal}
            onClose={props.handleInvalidModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="text-center">
              <Typography id="modal-modal-title" className="bold" variant="h6" component="h2">
                {props.heading}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.description}
              </Typography>
              <Button onClick={props.handleInvalidModalClose} className="text-white medium-large mt-5 mb-3 w-100 py-2" style={{ backgroundColor:COLORS.mainColor, borderRadius:"10px" }}>Close</Button>
            </Box>
          </Modal>
        </>
    )
}

export default InvalidModal
