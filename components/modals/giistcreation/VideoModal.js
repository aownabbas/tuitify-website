/** currrently this modal is handling
 * webcam and link modals
 * screenrecording is handling screencasting */
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from '../../kh_components/giistcreation/chapters/ChaptersTabs.module.css';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    border: 'none',
    outline: 'none',
    p: 4,
  },
  centeringContent: {
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '25px',
    paddingTop: '10vh',
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
    borderRadius: '8px',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize',
    backgroundColor: '#353452',
    '&:hover': {
      backgroundColor: '#353452',
      textShadow: 'none',
    },
  },
};

const VideoModal = ({
  openModal,
  handleClosemodal,
  modalName,
  setShowActionBar,
  setIsWebcamActive,
  setInputLink,
  inputLink,
  // previewHandler,
  handleOpenMediaplay,
  giistChapMediaCreate,
  indexForMedia,
  subindexForMedia,
  giistSubChapMediaCreate,
  chaptersCreateRes,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;
  const [activeLink, setActiveLink] = useState(false);
  const linkValidation = (e) => {
    const { value } = e.target;
    let isTrue = value.startsWith('https://');
    if (isTrue == true) {
      setActiveLink(isTrue);
      setInputLink(value);
    } else {
      setActiveLink(isTrue);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClosemodal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        {modalName == 'webcam' && (
          <Box sx={centeringContent}>
            <Box mb={2} sx={{ p: 2 }}>
              <Image src="/assets/images/modal-webcam.svg" height={70} width={70} alt="trash" />
            </Box>
            <Typography id="delete-modal-title" sx={modalHeading}>
              Use your webcam
            </Typography>
            <Typography id="del-modal-description" sx={{ mt: 2 }}>
              After clicking on “<b>Yes</b>”, your webcam will start recording
            </Typography>
            <Box sx={buttonGroup}>
              <Button variant="outlined" onClick={handleClosemodal} sx={noButton}>
                No
              </Button>
              <Button
                variant="contained"
                sx={yesButton}
                onClick={(e) => {
                  setIsWebcamActive(true);
                  // router.push({ pathname: '/kh/VideoGiistCreation', query: { giistcreationRec: 'giistcreationRec' } });
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        )}
        {modalName == 'screencast' && (
          <Box sx={centeringContent}>
            <Box mb={2} sx={{ p: 2 }}>
              <Image src="/assets/images/screencast-modal.svg" height={70} width={70} alt="trash" />
            </Box>
            <Typography id="delete-modal-title" sx={modalHeading}>
              Record Your Screen
            </Typography>
            <Typography id="del-modal-description" sx={{ mt: 2 }}>
              After clicking on “<b>Yes</b>”, your webcam will be started
            </Typography>
            <Box sx={buttonGroup}>
              <Button variant="outlined" onClick={handleClosemodal} sx={noButton}>
                No
              </Button>
              <Button
                variant="contained"
                sx={yesButton}
                onClick={() => {
                  setShowActionBar(true);
                  handleClosemodal();
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        )}
        {modalName == 'uselink' && (
          <Box sx={centeringContent}>
            <Box mb={1}>
              <Image src="/assets/images/link-chain-modal.svg" height={70} width={70} alt="trash" />
            </Box>
            <Typography id="delete-modal-title" sx={modalHeading}>
              Use Link
            </Typography>
            <Typography id="del-modal-description" sx={{ mt: 1 }}>
              Paste link only from Youtube, Vimeo or Dailymotion...
            </Typography>
            <Box pt={3}>
              <input
                type="url"
                className={classes.useLinkInput}
                placeholder="Paste link here..."
                onChange={(e) => {
                  // setInputLink(e.target.value);
                  linkValidation(e);
                }}
              />
              {activeLink == false && inputLink.length !== 0 && (
                <p className="text-danger mb-0">Please input correct link</p>
              )}
            </Box>
            <Box sx={buttonGroup}>
              <Button variant="outlined" onClick={handleClosemodal} sx={noButton}>
                No
              </Button>
              <Button
                variant="contained"
                sx={yesButton}
                disabled={activeLink == false ? 'true' : ''}
                onClick={(e) => {
                  // previewHandler(inputLink);
                  // giistChapMediaCreate(indexForMedia, inputLink);
                  if (activeLink == true) {
                    if (!chaptersCreateRes?.data?.chapters[indexForMedia].subChapters.length) {
                      console.log('replay video else');
                      giistChapMediaCreate(indexForMedia, inputLink, null, null, 1, 0);
                    } else {
                      console.log(indexForMedia, subindexForMedia, 'replay video if');
                      giistSubChapMediaCreate(indexForMedia, subindexForMedia, inputLink, null, null, 1, 0);
                    }

                    handleOpenMediaplay(true);
                    handleClosemodal();
                  }
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default VideoModal;
