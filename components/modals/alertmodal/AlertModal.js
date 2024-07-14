import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Router, { useRouter } from 'next/router';

// modal styling.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 424,
  height: 457,
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 5,
};

const AlertModal = (props) => {
  const router = useRouter();

  return (
    <>
      <Modal
        style={{ zIndex: '3' }}
        // if props.alertOpen is true then it opens modal.
        open={props.alertOpen}
        onClose={props.handleAlertClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center border-0 bg-white">
          {props.image}
          <Typography id="modal-modal-title" sx={{ mt: 2 }} className="bold" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" className="light" sx={{ mt: 3, mb: 3 }}>
            {props.description}
          </Typography>
          <div className="row">
            <div className="col-6 mt-5">
              {/* this button closes the modal */}
              <button
                className="bg-white w-100 py-2 semibold"
                onClick={props.handleAlertClose}
                style={{ borderRadius: '7px', border: '2px solid #303548' }}
              >
                {props.button1}
              </button>
            </div>
            <div className="col-6 mt-5">
              {/* {router.pathname == '/kh/GiistCreation' ? ( */}
              {props.isWebcamActive || props.isAudioRecActive == true ? (
                <button
                  className="main-background-color text-white w-100 py-2 semibold"
                  style={{ borderRadius: '7px', border: '2px solid #303548' }}
                  onClick={() => {
                    if (props.isAudioRecActive == true) {
                      props.setIsAudioRecActive(false);
                    } else {
                      props.setIsWebcamActive(false);
                    }
                  }}
                >
                  {props.button2}
                </button>
              ) : (
                <>
                  {props.handleAlertActionBriif ? (
                    // if there is some function to perform before closing the modal then run this condition.
                    <button
                      className="main-background-color text-white w-100 py-2 semibold"
                      onClick={() => {
                        props.actionFrom
                          ? props.handleAlertActionBriif(
                              props.briifId,
                              props.briifAId,
                              props.briifCount,
                              props.actionFrom,
                            )
                          : props.handleAlertActionBriif(props.briifId, props.briifAId, props.briifCount);
                        props.handleAlertClose();
                      }}
                      style={{ borderRadius: '7px', border: '2px solid #303548' }}
                    >
                      {props.button2}
                    </button>
                  ) : (
                    // button routes to main and closes the modal.
                    <button
                      className="main-background-color text-white w-100 py-2 semibold"
                      onClick={() => {
                        props.recording != ''
                          ? props.recording == 'audio'
                            ? router.push('/ch/AudioBriifCreation')
                            : props.recordingGB == 'audio'
                            ? props.setIsAudioRecActive(false)
                            : props.recording == 'video'
                            ? router.push('/ch/VideoBriifCreation')
                            : props.recording == 'screen'
                            ? router.push('/components/Main', '/')
                            : props.recording == 'screen-exit'
                            ? props.setScreenModalOpen(false)
                            : props.recording == 'giist' && router.push('/kh/GiistCreation')
                          : router.push('/components/Main', '/');
                        props.handleAlertClose();
                      }}
                      style={{ borderRadius: '7px', border: '2px solid #303548' }}
                    >
                      {props.button2}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default AlertModal;
