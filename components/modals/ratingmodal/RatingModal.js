import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  minHeight: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 3.5,
  border: 'none !important',
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

const RatingModal = ({
  setRateModal,
  rateModal,
  setRatings,
  ratings,
  giistRatings,
  setRatedModal,
  ratedModal,
  myrating,
  ratingsMessage,
  setRatingsMessage,
}) => {
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setReason(event.target.value);
  };
  const [rejectReason, setRejectReason] = useState();
  // const [ratings, setRatings] =useState('')
  const [experience, setExperience] = useState();
  console.log(experience, 'ratings');

  return (
    <>
      <Modal
        open={rateModal}
        //   onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-100 " style={{ textAlign: 'end' }}>
            <Image
              src="/assets/images/X.svg"
              width="24px"
              height="24px"
              onClick={() => {
                setRateModal(false);
              }}
            />
          </div>
          <Typography
            className="text-center mb-3 regular-large"
            id="modal-modal-title"
            style={{
              fontWeight: '700',
              fontSize: '24px !important',
              lineHeight: '30px',
              textAlign: 'center',
              color: '#303548',
            }}
          >
            Rate Your Experience
          </Typography>

          <Typography
            className="text-center mb-3 regular-small"
            id="modal-modal-title"
            style={{
              lineHeight: '19px',
              textAlign: 'center',
            }}
          >
            Are you satisfied with the Giist?
          </Typography>

          <div className="text-center mb-4 mt-4">
            <Rating
              name="size-large"
              onChange={(e) => {
                setRatings(e.target.value);
              }}
              value={ratings}
              sx={{ fontSize: '3.5rem' }}
            />
          </div>
          <div>
            <textarea
              className="medium-mid-large placee"
              type="text"
              placeholder="Tell us on how helpful this giist was and how we can improve..."
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(66, 74, 92, 0.24)',
                borderRadius: '12px',
                width: '100%',
                resize: 'none',
                outline: 'none',
                padding: '20px',
              }}
              onChange={(e) => {
                setRatingsMessage(e.target.value);
              }}
              value={ratingsMessage}
              rows={3}

              //   onChange={(e) => setReportMessage(e.target.value)}
            />
          </div>
          <Box sx={buttonGroup}>
            <Button
              variant="contained"
              sx={yesButton}
              onClick={() => {
                giistRatings();
                setRateModal(false);
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={ratedModal}
        //   onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-100 " style={{ textAlign: 'end' }}>
            <Image
              src="/assets/images/X.svg"
              width="24px"
              height="24px"
              onClick={() => {
                setRatedModal(false);
              }}
            />
          </div>
          <Typography
            className="text-center mb-3 regular-large"
            id="modal-modal-title"
            style={{
              fontWeight: '700',
              fontSize: '24px !important',
              lineHeight: '30px',
              textAlign: 'center',
              color: '#303548',
            }}
          >
            You already rated
          </Typography>
          <div className="text-center mb-4 mt-4">
            <Rating
              name="size-large"
              onChange={(e) => {
                setRatings(e.target.value);
              }}
              value={myrating}
              size="large"
              sx={{ fontSize: '3.5rem' }}
              disabled
            />
          </div>
          <div>
            <textarea
              className="medium-mid-large placee"
              type="text"
              placeholder="Tell us on how helpful this giist was and how we can improve..."
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(66, 74, 92, 0.24)',
                borderRadius: '12px',
                width: '100%',
                resize: 'none',
                outline: 'none',
                padding: '20px',
              }}
              onChange={(e) => {
                setExperience(e.target.value);
              }}
              value={ratingsMessage}
              rows={3}
              disabled
              //   onChange={(e) => setReportMessage(e.target.value)}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default RatingModal;
