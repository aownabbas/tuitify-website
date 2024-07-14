import React, { useState, useEffect, useRef } from 'react';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import moment from 'moment';
const { Decoder, Encoder, tools, Reader } = require('ts-ebml');
import 'videojs-record/dist/css/videojs.record.css';
import screenRecording from '../../../../redux/actions/ScreenRecording';
import Image from 'next/image';
import useTimer from '../../chmainpage/interaction/interactionmodals/timer/useTimer';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Switch } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import { useRouter } from 'next/router';

const isFirefox = typeof InstallTrigger !== 'undefined';

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

const ScreenRecording = (props) => {
  const router = useRouter();

  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [showRecordingPane, setShowRecordingPane] = useState(false);
  const [recording, setRecording] = useState('');

  const dispatch = useDispatch();

  const [audio, setAudio] = useState(false);
  const [videoJsOptions, setVideoJsOptions] = useState({
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    // videoMimeType: 'video/webm;codecs=H264',

    plugins: {
      record: {
        audio: true,
        video: false,
        screen: true,
        maxLength: 20000,
        debug: true,
        videoMimeType: isFirefox || isSafari ? 'video/mp4' : 'video/webm;codecs=vp8',
      },
    },
  });

  const [checked, setChecked] = React.useState(true);

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

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();

  var videoNode;
  var player = null;

  let flag = false;
  useEffect(() => {
    handleRecording();
    return () => {
      // Destroy the player on component unmount
    };
  }, [videoJsOptions]);

  async function handleRecording() {
    const videojs = (await import('video.js')).default;
    const RecordRTC = (await import('recordrtc')).default;
    console.log('player.on', RecordRTC);
    const Record = await import('videojs-record/dist/videojs.record.js');
    try {
      player = videojs(videoNode, videoJsOptions, async () => {
        // print version information at startup
        const version_info =
          'Using video.js ' +
          videojs.VERSION +
          ' with videojs-record ' +
          videojs.getPluginVersion('record') +
          ' and recordrtc ' +
          RecordRTC.version;
        videojs.log(version_info);
        setRecording(player);
      });

      player.record().enumerateDevices();

      player.record().getRecordType();

      player.on('enumerateReady', () => {
        console.log('device clicked');
      });

      // device is ready
      player.on('deviceReady', () => {
        // temp1.videoTracks()

        setText('start recording');
        setShowRecordingPane(false);
        player.record().start();
        console.log('deviceReady', player);
        player.record().stream.getVideoTracks()[0].onended = () => {
          dispatch(screenRecording('false'));
          pauseTime();
          player.record().stop();
          props.setStartRecording(false);
        };
      });
      // user clicked the record button and started recording
      player.on('startRecord', () => {
        setText('stop');
        setShow(true);
        setShowRecordingPane(true);
        startTime();
      });

      player.on('finishRecord', async () => {
        if (isSafari) {
          var blobUrl = URL.createObjectURL(player.recordedData);
          props.setScreenModalOpen(true);
          props.setScreenBlobUrl(blobUrl);
        } else {
          const getSeekableBlob = (inputBlob, callback) => {
            var reader = new Reader();
            var decoder = new Decoder();
            // var tools = tools;
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              var ebmlElms = decoder.decode(this.result);
              ebmlElms.forEach(function (element) {
                reader.read(element);
              });
              reader.stop();
              var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
              var body = this.result.slice(reader.metadataSize);
              var newBlob = new Blob([refinedMetadataBuf, body], {
                type: 'video/webm',
              });
              callback(newBlob);
            };
            fileReader.readAsArrayBuffer(inputBlob);
            console.log(inputBlob, 'inputBlob');
          };
          const duration = player.record().getDuration();
          props.setSetduration(duration);
          getSeekableBlob(player.recordedData, function (blob) {
            var blobUrl = URL.createObjectURL(blob);
            props.setScreenModalOpen(true);
            props.setScreenBlobUrl(blobUrl);
          });
        }

        props.setTime(player.record().getDuration());
        // player.record().getDuration();
        setShow(false);
        setShowRecordingPane(false);
        player.record().destroy();
      });

      // error handling
      player.on('error', (element, error) => {
        console.warn(error, 'error');
      });

      player.on('deviceError', () => {
        console.error('device error:', player.deviceErrorCode);
      });
    } catch (error) {
      console.log('Screen Casting error', error);
    }
  }
  const formatted = moment.utc(seconds * 1000).format('mm:ss');

  function handleChange(event) {
    if (recording) {
      if (recording.player_) {
        recording.dispose();
      }
      setChecked(event.target.checked);
      setAudio(!audio);
      audio == true
        ? setVideoJsOptions({
            controls: true,
            bigPlayButton: false,
            width: 320,
            height: 240,
            fluid: false,
            plugins: {
              record: {
                audio: true,
                video: false,
                screen: true,

                maxLength: 20000,
                debug: true,
                videoMimeType: isFirefox || isSafari ? 'video/mp4' : 'video/webm;codecs=vp8',
              },
            },
          })
        : setVideoJsOptions({
            controls: true,
            bigPlayButton: false,
            width: 320,
            height: 240,
            fluid: false,
            // videoMimeType: 'video/webm;codecs=H264',

            plugins: {
              record: {
                audio: false,
                video: false,
                screen: true,
                video: {
                  // video media constraints: set resolution of camera
                  width: { ideal: 1920 }, // <-- This works too
                  height: { ideal: 1080 },
                },
                maxLength: 100,
                debug: true,
                videoMimeType: isFirefox || isSafari ? 'video/mp4' : 'video/webm;codecs=vp8',
              },
            },
          });
    } else {
      ('');
    }
  }

  const hellofunction = async () => {
    if (recording) {
      return recording.record().getDevice();
    }
  };

  // const stopRecording=()=>{
  //   alert("check")
  // }
  // player.on('stopRecord', () => {
  //   alert("check")
  // });

  // const stopRecording = () => {
  //   recordRTCRef.current.stopRecording(() => {
  //     // const blob = recordRTCRef.current.getBlob();
  //     // setRecordedBlob(blob);
  //     // setRecording(false);
  //     alert("gggjjj")
  //   });
  // };
  const recorderRef = useRef(null);
  const stopRecording = () => {
    recorderRef.current.stop((blob) => {
      alert('htyyyyy');
      // setRecordedBlob(blob);
      // setRecording(false);
      // videoRef.current.src = URL.createObjectURL(blob);
    });
  };

  return (
    <>
      <div>
        {props.modalOpen == true ? (
          <Modal
            style={{ zIndex: '1' }}
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
                      hellofunction();
                    }}
                    disabled={!recording}
                    className="main-background-color text-white w-100 semibold-small mb-4"
                    style={{
                      borderRadius: '15px',
                      border: '2px solid #303548',
                      paddingBottom: '15px',
                      paddingTop: '15px',
                      opacity: !recording ? 0.5 : 1,
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
      {show == true ? (
        <>
          <div
            className={props.giistRec == 'giist_rec' ? 'position-absolute h-25 w-75 ' : 'position-fixed'}
            style={{ bottom: '0' }}
          >
            <div data-vjs-player style={{ objectFit: 'cover', width: 'auto', height: '100px', borderRadius: '25px' }}>
              <video
                id="myScreen"
                ref={(node) => (videoNode = node)}
                className="video-js bg-transparent vjs-default-skin"
                playsInline
              ></video>
            </div>
          </div>
          <div className={'position-absolute '} style={{ bottom: 30, right: 30, zIndex: '1' }}>
            <button
              onClick={() => {
                dispatch(screenRecording('false'));
                pauseTime();
                recording.record().stop();
                props.setStartRecording(false);
              }}
              className="main-background-color d-flex row align-items-center justify-content-start ps-3"
              style={{
                width: '150px',
                borderRadius: '15px',
                opacity: '0.9',
                zIndex: '1',
                border: '2px solid #303548',
                paddingBottom: '7px',
                paddingTop: '7px',
              }}
            >
              <Image
                src="/assets/icons/new/ic_activerecording.svg"
                width="42px"
                className="col-3"
                alt="active recording"
                height="42px"
              />
              <p className="col-6 text-end mb-0 semibold-small text-white text-uppercase d-flex justify-content-end">
                {formatted}
              </p>
            </button>
          </div>
        </>
      ) : (
        <div className="position-fixed" style={{ bottom: '0' }}>
          <div data-vjs-player style={{ objectFit: 'cover', width: 'auto', height: '100px', borderRadius: '25px' }}>
            <video
              id="myScreen"
              ref={(node) => (videoNode = node)}
              className="video-js bg-transparent vjs-default-skin"
              playsInline
            ></video>
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenRecording;
