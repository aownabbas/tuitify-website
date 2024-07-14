import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 364,
  height: 357,
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 3,
  border: 'none',
};
const OtpModal = (props) => {
  const router = useRouter();
  return (
    <>
      <Modal
        style={{ zIndex: '999999' }}
        open={props.modalOpen}
        onClose={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center border-0 bg-white">
          {props.image}
          <Typography id="modal-modal-title" sx={{ mt: 1 }} className="bold" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" className="light px-2" sx={{ mt: 2, mb: 2 }}>
            {props.description}
          </Typography>
          <div className="row d-block">
            <div className="mt-5 mx-auto row col-6">
              <button
                className="main-background-color text-white px-0 w-100 py-2 "
                onClick={() => props.link()}
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #353452',
                  letterSpacing: 0.5,
                }}
              >
                {props.button1}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default OtpModal;