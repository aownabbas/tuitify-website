import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 364,
  height: 315,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 3.5,
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: '20px',
};
const noButton = {
  width: '132px',
  height: '48px',
  borderRadius: '8px',
  textTransform: 'capitalize',
  border: '1px solid #353452 !important',
  color: '#353452',
  '&:hover': {
    backgroundColor: 'inherit',
    textShadow: 'none',
    border: '1px solid #353452',
  },
};
const yesButton = {
  width: '132px',
  height: '48px',
  borderRadius: '8px',
  color: '#FFFFFF !important',
  textShadow: 'none !important',
  textTransform: 'capitalize',
  backgroundColor: '#353452',
  '&:hover': {
    backgroundColor: '#353452',
    textShadow: 'none',
  },
};

const textWrite = {
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  /* identical to box height */
  color: '#303548',
};

export default function BasicModal({
  openModal,
  handleCloseModal,
  rejectGiist,
  reportGiist,
  setReason,
  reason,
  reportMessage,
  setReportMessage,
  handleCountryFlag,
}) {
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setReason(event.target.value);
  };
  const [rejectReason, setRejectReason] = useState();
  console.log(reason,"rejectReason");
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          className="text-center mb-3"
          id="modal-modal-title"
          style={{
            fontWeight: '700',
            fontSize: '24px',
            lineHeight: '30px',
            textAlign: 'center',
            color: '#303548',
          }}
        >
          {reportGiist ? 'Report' : 'Reject this Giist?'}
        </Typography>
        {!reportGiist ? (
          <Typography className="text-center" id="modal-modal-description" sx={{ mt: 2 }}>
            Please write down the rejection reasons, they will be sent to the creator
          </Typography>
        ) : (
          <Typography className={textWrite}>write your feedback</Typography>
        )}

        {reportGiist ? (
          <div>
            <textarea
              type="text"
              placeholder="type here..."
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(66, 74, 92, 0.24)',
                borderRadius: '12px',
                width: '100%',
                resize: 'none',
                outline: 'none',
                padding: '10px',
              }}
              rows={4}
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
            />
          </div>
        ) : (
          <div className="w-100 border  mt-2" style={{ height: '80px' }}>
            <input
              className="border-0 w-100 "
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(66, 74, 92, 0.24)',
                borderRadius: '12px',
                width: '100%',
                resize: 'none',
                outline: 'none',
                padding: '10px',
              }}
              value={rejectReason}
              onChange={handleChange}
              placeholder="Write here..."
            />
          </div>
        )}

        <Box sx={buttonGroup}>
          <Button variant="outlined" onClick={handleCloseModal} sx={noButton}>
            Cancel
          </Button>
          {reportGiist ? (
            <Button
              variant="contained"
              sx={yesButton}
              onClick={() => {
                handleCountryFlag();
              }}
            >
              Submit Report
            </Button>
          ) : (
            reason !=="" ?
            <Button
              variant="contained"
              sx={yesButton}
              onClick={() => {
                rejectGiist();
                handleCloseModal();
              }}
              
            >
              Confirm
            </Button>
            :
            <Button
            variant="contained"
            sx={yesButton}
            onClick={() => {
              rejectGiist();
              handleCloseModal();
            }}
            disabled
          >
            Confirm
          </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
