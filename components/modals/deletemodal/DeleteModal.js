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
  },
  centeringContent: {
    textAlign: 'center',
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

const DeleteModal = ({
  id,
  openModal,
  handleCloseModal,
  updateId,
  deleteMediaHandler,
  refreshMedias,
  image,
  heading,
  text,
  confirmGiistPublish,
  file_name,
  imagename,
  deleteUserGiist,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;

  console.log(id, 'all props for giist');

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          {updateId ? (
            <Box>
              <Box mb={2} sx={{ p: 2 }}>
                <Image src="/assets/images/trash.svg" height={60} width={60} alt="trash" />
              </Box>
              <Typography id="delete-modal-title" sx={modalHeading}>
                Delete this Media?
              </Typography>
              <Typography id="del-modal-description" sx={{ mt: 2 }}>
                Are you sure to delete this Media?
              </Typography>
              <Box sx={buttonGroup}>
                <Button variant="outlined" onClick={handleCloseModal} sx={noButton}>
                  No
                </Button>
                <Button
                  variant="contained"
                  sx={yesButton}
                  onClick={() => {
                    deleteMediaHandler(updateId, file_name, imagename);
                    // mediaCounter();
                    // showingAllHandler();
                    refreshMedias();
                    handleCloseModal();
                    if (confirmGiistPublish !== undefined) {
                      confirmGiistPublish();
                    }
                  }}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Box mb={2} sx={{ p: 2 }}>
                <Image src={image} height={60} width={60} alt="trash" />
              </Box>
              <Typography id="delete-modal-title" sx={modalHeading}>
                {heading}
              </Typography>
              <Typography id="del-modal-description" sx={{ mt: 2 }}>
                {text}
              </Typography>
              <Box sx={buttonGroup}>
                <Button variant="outlined" onClick={handleCloseModal} sx={noButton}>
                  No
                </Button>

                <Button
                  variant="contained"
                  sx={yesButton}
                  onClick={() => {
                    if (!id) {
                      confirmGiistPublish();
                    } else {
                      deleteUserGiist(id);
                      handleCloseModal();
                    }
                  }}
                >
                  Yes
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
export default DeleteModal;
