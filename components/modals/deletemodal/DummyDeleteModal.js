import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    border: '0px',
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
    padding: '15px',
    paddingTop: '40px',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px !important',
    textTransform: 'capitalize',
    border: '1px solid #353452 !important',
    color: '#353452 !important',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #353452',
    },
  },
  yesButton: {
    width: '132px !important',
    height: '48px !important',
    borderRadius: '8px  !important',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize !important',
    backgroundColor: '#353452  !important',
    fontWeight: '500 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    /* identical to box height */
    '&:hover': {
      backgroundColor: '#353452 !important',
      textShadow: 'none !important',
    },
  },
  yesButtonDisabled: {
    width: '132px !important',
    height: '48px !important',
    borderRadius: '8px  !important',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize !important',
    backgroundColor: 'grey !important',
    fontWeight: '500 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    '&:hover': {
      backgroundColor: 'grey !important',
      textShadow: 'none !important',
      cursor: 'not-allowed !important',
    },
  },
};

const DummyDeleteModal = ({
  openModal,
  handleCloseModal,
  heading,
  text,
  DeleteSpecificChapter,
  index,
  pathType,
  subIndex,
  image,
  parentIndex,
  input,
  setMesgPublisher,
  mesgPublisher,
  publisher,
  fullName,
  unPublisher,
  UnPublishGiist,
  actionFrom,
  id,
  buttonText1,
  buttonText2,
  handleClick,
  // Aown: In dummydeleteModal I have added onclick event.
  stopClickingEvent,
}) => {
  const router = useRouter();
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton, yesButtonDisabled } = style;

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
      // Aown: In dummydeleteModal I have added onclick event.
      onClick={stopClickingEvent}
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Box mb={2} sx={{ p: publisher ? 0 : 1 }}>
            {publisher ? (
              <>
                <Image src={image} height={60} width={60} alt="publisher" style={{ borderRadius: '50%' }} />
                <div>{fullName}</div>
              </>
            ) : (
              <Image src={image} height={70} width={70} alt="Alert" />
            )}
          </Box>
          <Typography id="delete-modal-title" sx={modalHeading}>
            {heading}
          </Typography>
          <Typography id="del-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          {publisher?.id && (
            <Box pt={publisher ? 2 : 3} pb={0}>
              <label
                htmlFor="Messagefor_publisher"
                className={`py-1 fw-bold d-flex flex-start`}
                style={{
                  fontStyle: 'normal',
                  fontWeight: 300,
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: 'rgba(53, 52, 82, 0.78)',
                }}
              >
                Publisher Message <span className="text-danger fw-bold">*</span>
              </label>
              <textarea
                id="Messagefor_publisher"
                name="description"
                placeholder="Write message to publisher"
                onChange={(e) => setMesgPublisher(e.target.value)}
                value={mesgPublisher}
                cols={80}
                rows={4}
                maxLength={300}
                style={{
                  width: '100%',
                  height: '100px',
                  borderRadius: '10px',
                  padding: '5px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: '#ffffff',
                  resize: 'none',
                }}
              />
            </Box>
          )}
          <Box sx={buttonGroup}>
            <Button
              variant="outlined"
              // Aown: In dummydeleteModal I have added onclick event.
              onClick={(event) => {
                handleCloseModal(event);
              }}
              sx={noButton}
            >
              {buttonText1}
            </Button>
            <Button
              variant="contained"
              // sx={yesButton}
              sx={
                !mesgPublisher?.length && publisher?.id && router.pathname == '/kh/GiistCreation'
                  ? yesButtonDisabled
                  : yesButton
              }
              // Aown: In dummydeleteModal I have added onclick event.
              onClick={(event) => {
                handleCloseModal(event);
                handleClick(event);
              }}
              disabled={
                !mesgPublisher?.length && publisher?.id && router.pathname == '/kh/GiistCreation' ? true : false
              }
            >
              {buttonText2}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DummyDeleteModal;
