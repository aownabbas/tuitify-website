import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Switch from '@mui/material/Switch';
import CopyChannel from '../../ch/liveMeeting/component/CopyChannel';
import { useDispatch, useSelector } from 'react-redux';
import { RecordConferenceStart } from '../../../redux/actions/RecordConferenceStart';

const style = {
  position: 'absolute',
  left: '5%',
  bottom: '15%',
  width: 320,
  bgcolor: 'background.paper',
  borderStyle: 'none !Important',
  p: 2,
  outline: 'none',
  boxShadow: 'none !Important',
  borderRadius: '5px',
};
const buttonStyle = {
  background: 'linear-gradient(115.58deg, #D51AFF -20.08%, #4E6AFE 52.78%, #8BF3FE 125.06%)',
  borderRadius: '8px',
  textTransform: 'capitalize ',
  paddingLeft: '15px',
  paddingRight: '15px',
};

function MeetLinkModal({
  meetingChannel,
  setOpenDrawer,
  setOpenpplDrawer,
  openDrawer,
  openpplDrawer,
  localAudioTrack,
  localVideoTrack,
  handleAllusersLists,
  setChannel,
  invited_user_join,
  setShowRecordingButton,
}) {
  const dispatch = useDispatch();
  const response_recording = useSelector((state) => state.response_recording);

  const [open, setOpen] = useState(invited_user_join == undefined ? true : false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startRecording, setStartRecording] = useState(false);
  const [recordingStatus, setrecordingStatus] = useState(
    response_recording?.recording_status?.status ? response_recording?.recording_status?.status : false,
  );

  const handlepplDrawerOpen = () => {
    // setOpenDrawer(!openDrawer);
    handleAllusersLists(meetingChannel);
    setOpenpplDrawer(!openpplDrawer);
    handleClose();
  };

  const handleScreenRecording = (event, channel) => {
    setStartRecording(event.target.checked);
    setShowRecordingButton(event.target.checked);
    if (event.target.checked) {
      const recordingBody = {
        channel: channel,
      };
      dispatch(RecordConferenceStart(recordingBody, onRecordingStartSuccess, onRecordingStartError));
    }
  };

  const onRecordingStartSuccess = (res) => {
    setrecordingStatus(true);
    setStartRecording(true);
  };
  const onRecordingStartError = (err) => {
    setrecordingStatus(false);
    setStartRecording(false);
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" className="semibold">
              Your meeting is ready
            </Typography>
            <button style={{ background: 'transparent', border: 'none' }}>
              <ClearIcon onClick={handleClose} />
            </button>
          </Box>
          <Button onClick={() => handlepplDrawerOpen()} sx={buttonStyle} className="mt-3">
            <div className=" mt-1">
              <div className="d-flex">
                <div>
                  <Image
                    className="rounded-circle"
                    src="/assets/icons/threeDots.png"
                    height={20}
                    width={20}
                    alt="AddPeople"
                  />
                </div>
                <div className="text-white regular-small ms-2">Add People</div>
              </div>
            </div>
          </Button>
          {/* temporarily commented */}
          {/* <CopyChannel meetingChannel={meetingChannel} /> */}
          <hr />
          <div className="row position-relative">
            <div className="d-flex justify-content-between py-2">
              <div className="ms-2 medium">
                <p style={{ fontWeight: 700, fontSize: '18px', lineHeight: '23px' }}>Record your session</p>
                <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '15px' }} className="pt-2">
                  This button will start recording this webconference session as a Giist on the DRAFT section on
                  MyGiists in the Knowledge Hub.
                </p>
              </div>
              <div>
                <Switch
                  checked={
                    response_recording?.recording_status?.status
                      ? response_recording?.recording_status?.status
                      : startRecording
                  }
                  onChange={(e) => handleScreenRecording(e, meetingChannel)}
                  disabled={!localAudioTrack && !localVideoTrack ? true : false}
                  size="small"
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
            {recordingStatus && (
              <div
                style={{
                  height: '50px',
                  width: '100%',
                  position: 'absolute',
                  zIndex: '2',
                  background: 'grey',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                }}
                onClick={() => setrecordingStatus(false)}
              >
                {response_recording?.recording_status?.message}
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default MeetLinkModal;
