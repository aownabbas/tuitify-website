import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Switch } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import screenRecording from '../../../../redux/actions/ScreenRecording';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  height: 400,
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 5,
};

const ScreenRecordingModal = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.setAudio(!props.audio);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[400],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });
  // const onStop = (file) => {
  //   console.log('onStop: screen data', file);
  //   router.push({pathname: "/components/recordingcreation/recordingform/RecordingForm", query: { name: `${file}`, type: `mp4`, seconds: `0` }})

  // }
  // const blobPropertyBag =(blobPropertyBag)=>{
  //   console.log(blobPropertyBag);
  // }

  return (
    <>
      <div>
        {props.modalOpen == true ? (
          <Modal
            style={{ zIndex: '999999' }}
            open={props.modalOpen}
            onClose={props.handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="text-center border-0 bg-white">
              {props.image}
              <Typography id="modal-modal-title" sx={{ mt: 2 }} className="bold" variant="h6" component="h2">
                {props.title}
              </Typography>
              <Typography id="modal-modal-description" className="light-medium px-2" sx={{ mt: 1, mb: 4 }}>
                {props.description}
              </Typography>
              <div className="row d-block">
                <div className="mt-5 mx-auto row col-8">
                  <button
                    onClick={() => {
                      dispatch(screenRecording('true'));
                      props.setStartRecording(true);
                      props.handleModalClose();
                    }}
                    className="main-background-color text-white w-100 semibold-small mb-4"
                    style={{
                      borderRadius: '15px',
                      border: '2px solid #303548',
                      paddingBottom: '15px',
                      paddingTop: '15px',
                    }}
                  >
                    {props.button1}
                  </button>
                </div>
              </div>
              <div className="row mb-5 pb-3">
                <p className="semibold-xsmall d-inline pe-0 col-7 text-end mb-0 d-flex align-items-center justify-content-end">
                  Record with Audio
                </p>
                <div className="me-1 d-inline col-4 text-start">
                  <Switch
                    className=" ms-2"
                    size="large"
                    theme={theme}
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    value="controlled"
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
              </div>
            </Box>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default ScreenRecordingModal;
