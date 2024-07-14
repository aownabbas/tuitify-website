import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Button } from '@mui/material';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    border: 'none',
  },
  centeringContent: {
    textAlign: 'center',
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
    textAlign: 'center',
    color: '#303548',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    paddingTop: '30px',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid #353452',
    color: '#353452',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #353452',
    },
  },
  yesButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px !important',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize !important',
    backgroundColor: '#353452 !important',
    '&:hover': {
      backgroundColor: '#353452 !important',
      textShadow: 'none !important',
    },
  },
};

const QuizPlayModal = ({
  openModal,
  handleColseModal,
  heading,
  text,
  image,
  handlePlayGiists,
  setCurrentQuestion,
  setSliderValue,
  setResponse_id,
  buttonText,
  score,
  alertText,
  updateProperty,
  setStateButton,
  playGiists,
  chapIndex,
  subChapIndex,
  setDotloading,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;

  const handleClick = (handlePlayGiists) => {
    if (handlePlayGiists) {
      setDotloading(true);
      if (updateProperty && setStateButton) {
        setStateButton(true);
        updateProperty(playGiists, chapIndex, subChapIndex, 'firstTime', 0);
      }
      handlePlayGiists();
      setCurrentQuestion(0);
      setSliderValue(0);
      setResponse_id(0);
      handleColseModal();
    } else {
      handleColseModal();
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={false}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box>
        <Box sx={modalStyle}>
          <Box>
            {image ? (
              <Box className="mb-2 p-1" sx={{ textAlign: 'center !important' }}>
                <Image src={image} height="102px" width="102px" alt="trash" />
              </Box>
            ) : alertText == true ? (
              ''
            ) : (
              <div className="mb-2 p-1">
                <div
                  style={{
                    width: '102px',
                    height: '102px',
                    background: '#DDD',
                    margin: 'auto',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '71.68px',
                      height: '71.68px',
                      background: `linear-gradient(241.72deg, #88EDFE -43.84%, #625EFE 59.56%, #C224FE 167.61%)`,
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 'auto',
                    }}
                  >
                    <span
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '800',
                        fontSize: '24px',
                        lineHeight: '30px',
                        textAlign: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      {`${score}%`}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Typography id="delete-modal-title" sx={modalHeading}>
              {heading}
            </Typography>
            <Typography
              id="del-modal-description"
              sx={{ mt: 2, textAlign: 'center !important', color: 'rgba(53, 52, 82, 0.78)' }}
            >
              {text}
              {/* <span style={{ fontWeight: 'bold', color: 'black' }}>5/5'</span>. Thank you for your time */}
            </Typography>

            <Box sx={buttonGroup}>
              <Button variant="contained" sx={yesButton} onClick={() => handleClick(handlePlayGiists)}>
                {buttonText}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default QuizPlayModal;
