import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Image from 'next/image';
import classes from './Setting.module.css';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    width: 364,
    p: 2,
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
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    paddingTop: '5vh',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid #353452',
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

const DeleteModal = ({
  deleteModals,
  setDeleteModals,
  successModal,
  setSuccessModal,
  handleDeletGroup,
  groupId,
  setDotLoading,
  name,
}) => {
  const [open, setOpen] = useState(true);
  // alert('ddd')
  const handlemobileclose = () => setOpen(false);
  const router = useRouter();

  // console.log(router.pathname,'path')
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;

  // const loginImage = new Image();
  // loginImage.src = "/assets/images/Rectangle 7357.svg";
  return (
    <div>
      <Modal
        open={deleteModals}
        onClose={() => setDeleteModals(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: 'center !important' }}>
              <Image src="/assets/images/trash.svg" height={64} width={64} alt="trash" />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              Deleting Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center !important' }}>
              {`Are you sure you want to delete “${name}” from the group list?`}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                padding: '20px',
              }}
            >
              <Box sx={buttonGroup}>
                <div className={classes.btn} style={{ display: 'flex' }}>
                  <button
                    className={classes.btn1}
                    onClick={() => {
                      setDeleteModals(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className={classes.btn2} onClick={() => handleDeletGroup(groupId)}>
                    Yes
                  </button>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={successModal}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: 'center !important' }}>
              <Image src="/assets/images/tick.svg" height={50} width={50} alt="trash" />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              Group Created!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center !important', opacity: 0.5 }}>
              your group has been successfully
              <br />
              created.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <Box sx={buttonGroup}>
                <div className={classes.btn} style={{ display: 'flex' }}>
                  <button
                    className={classes.btn2}
                    onClick={async () => {
                      setDotLoading(true);
                      setSuccessModal(false);
                      await router.push('/setting/GroupSetting');
                      setDotLoading(false);
                    }}
                  >
                    Okay
                  </button>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
