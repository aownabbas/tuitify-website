import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import useTimer from './timer/useTimer';
import Image from 'next/image';
import styles from './AudioInteractionModal.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 2,
  outline: 'none',
};

const AudioInteractionModal = ({ audioOpen, handleAudioClose, type, setInteractionsLoading, uploadFileInput }) => {
  const { seconds, startTime, stopTime, pauseTime } = useTimer();

  const [media, setMedia] = useState({});
  const [audioData, setAudioData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Cleanup function to stop the recording and clear the media stream when the component unmounts or when audioOpen changes to false
    return () => {
      setAudioData(null);
      if (media?.state == 'recording') {
        handleStop();
      }
    };
  }, [audioOpen, media]);

  const handleStartRecording = () => {
    setShow(true);
    const constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const options = {
          audioBitsPerSecond: 128000,
          mimeType: 'audio/webm; codecs=opus',
          sampleRate: 44100,
          numberOfAudioChannels: 2,
        };
        const mediaRecorder = new MediaRecorder(stream, options);
        setMedia(mediaRecorder);
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleStop = () => {
    try {
      media?.stop();
      media?.stream.getTracks().forEach((track) => track.stop());
      media.addEventListener('dataavailable', (e) => {
        const blob = URL.createObjectURL(e.data);
        setShow(false);
        setAudioData(blob);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearData = () => {
    setAudioData(null);
  };

  const formatted = moment.utc(seconds * 1000).format('mm:ss');

  return (
    <>
      <Modal
        open={audioOpen}
        onClose={() => {
          handleStop();
          handleClearData();
          stopTime();
          handleAudioClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center overflow-none">
          <div className="d-flex justify-content-end">
            <Image
              src="/assets/icons/new/x.png"
              id="record"
              width="26px"
              height="26px"
              alt="close"
              onClick={() => {
                handleStop();
                handleClearData();
                stopTime();
                handleAudioClose();
              }}
            />
          </div>
          <Typography id="modal-modal-title" className="bold" variant="h6" component="h6">
            Audio Reply
          </Typography>
          <Typography id="modal-modal-description" className="light" sx={{ mt: 2, mb: 3 }}>
            Record your reply
          </Typography>
          {show === false ? (
            seconds === 0 ? (
              <Image
                src="/assets/icons/new/voice.png"
                id="record"
                onClick={() => {
                  handleStartRecording();
                  startTime();
                }}
                width="42px"
                height="55px"
                alt="voice"
              />
            ) : (
              <Image src="/assets/icons/new/voice.png" id="record" width="42px" height="55px" alt="voice" />
            )
          ) : (
            <div className="position-relative mx-auto d-flex align-items-center justify-content-center" style={{ width: '117px', height: '117px' }}>
              <Image
                src="/assets/icons/new/onLongPressAudioInteraction.svg"
                id="stop"
                onClick={() => {
                  handleStop();
                  pauseTime();
                }}
                style={{ zIndex: '9999' }}
                width="31px"
                height="40px"
                className=""
                alt="long press"
              />
              <div className={`${styles.waves} waves position-absolute`}>
                <span className={`${styles.wave} wave`}></span>
                <span className={`${styles.wave} wave`}></span>
              </div>
            </div>
          )}
          <Typography id="counter" className="semibold-large">
            {formatted}
          </Typography>
          {seconds == 0 && (
            <div className="row d-block">
              <div className="mt-2 mx-auto row col">
                <p className="semibold active-color">Click on audio to start recording</p>
              </div>
            </div>
          )}
          {seconds != 0 && audioData == null && (
            <div className="row d-block">
              <div className="mt-2 mx-auto row col">
                <p className="semibold stop-color">Click on audio to stop recording</p>
              </div>
            </div>
          )}

          {seconds != 0 && audioData != null && (
            <div className="row d-flex justify-content-center">
              <div className="col-6 mt-4 mb-2">
                <button
                  className="main-background-color text-white w-100 py-2 semibold"
                  onClick={() => {
                    setInteractionsLoading(true);
                    uploadFileInput(audioData, seconds, type == '1' ? '1' : 'mp3');
                    stopTime();
                    handleAudioClose();
                    handleClearData();
                  }}
                  style={{ borderRadius: '7px', border: '2px solid #303548' }}
                >
                  Post Comment
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AudioInteractionModal;
