import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RecordConferenceStop } from '../../../redux/actions/RecordConferenceStart';
import EndConference from '../../../redux/actions/EndConference';
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
    p: 3,
  },
  centeringContent: {
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '27px',
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
    border: '1px solid #19242C !important',
    color: '#19242C !important',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #19242C',
    },
  },
  yesButton: {
    width: '132px !important',
    height: '48px !important',
    borderRadius: '8px  !important',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize !important',
    backgroundColor: '#CD1B1B  !important',
    fontWeight: '500 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    /* identical to box height */
    '&:hover': {
      backgroundColor: '#CD1B1B !important',
      textShadow: 'none !important',
    },
  },
};

const EndLiveMeetingModal = ({
  endLiveModal,
  setEndLiveModal,
  endMeetText,
  endMeetHeading,
  image,
  leaveHandler,
  handleRecordedModalOpen,
  leaveInRecordingCase,
  meetingChannel,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;
  const dispatch = useDispatch();

  const response_recording = useSelector((state) => state.response_recording);

  const leaveMeeting = async () => {
    const paramsBody = {
      channel: meetingChannel,
    };
    await dispatch(EndConference(paramsBody, onEndMeetingSuccess, onEndMeetingError));
  };

  const onEndMeetingSuccess = (res) => {
    console.log(res, 'eng meeting response');
  };
  const onEndMeetingError = (err) => {
    console.log(err, 'eng meeting response');
  };

  return (
    <Modal
      open={endLiveModal}
      //   onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Box mb={2} sx={{ p: 2 }}>
            <Image src={image} height={35} width={35} alt="trash" style={{ borderRadius: '50%' }} />
            {/* <div>{fullName}</div> */}
          </Box>
          <Typography id="delete-modal-title" sx={modalHeading}>
            {endMeetHeading}
          </Typography>
          <Typography id="del-modal-description" sx={{ mt: 2 }} className="regular-xsmall">
            {endMeetText}
          </Typography>
          <Box sx={buttonGroup}>
            <Button
              variant="outlined"
              onClick={() => {
                setEndLiveModal(false);
              }}
              sx={noButton}
            >
              No
            </Button>
            <Button
              sx={yesButton}
              onClick={async () => {
                if (response_recording?.recording_status?.status) {
                  setEndLiveModal(false);
                  handleRecordedModalOpen();
                  await leaveInRecordingCase();
                  dispatch(RecordConferenceStop());
                } else {
                  setEndLiveModal(false);
                  dispatch(RecordConferenceStop());
                  await leaveMeeting();
                  await leaveHandler();
                }
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EndLiveMeetingModal;
