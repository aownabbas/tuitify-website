import React, { useState, useEffect } from 'react';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import dynamic from 'next/dynamic';
import moment from 'moment';
const { Decoder, Encoder, tools, Reader } = require('ts-ebml');
import 'videojs-record/dist/css/videojs.record.css';
import Router from 'next/router';
import screenRecording from '../../../redux/actions/ScreenRecording';
import Image from 'next/image';
import useTimer from '../../ch/chmainpage/interaction/interactionmodals/timer/useTimer';
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

const ScreenCasting = (props) => {
  const router = useRouter();

  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [recording, setRecording] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
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

  const handleChange = (event) => {
    recording.record().destroy();
    setChecked(event.target.checked);
    setAudio(!audio);
    console.log(audio);

    audio == true ? console.log('audio on') : console.log('audio off');

    audio == true
      ? setVideoJsOptions({
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
              maxLength: 100,
              debug: true,
              videoMimeType: isFirefox || isSafari ? 'video/mp4' : 'video/webm;codecs=vp8',
            },
          },
        });
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

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();

  let videoNode, player;
  let flag = false;
  useEffect(() => {
    if (!flag) {
      handleRecording();
    }
    flag = true;

    return () => {};
  }, [videoJsOptions]);

  // if(recording != ""){
  //   document.getElementById("getDevice").click();
  // }
  async function handleRecording() {
    try {
      const videojs = (await import('video.js')).default;
      const RecordRTC = (await import('recordrtc')).default;
      const Record = await import('videojs-record/dist/videojs.record.js');
      // if(player == undefined) {}
      // else{
      player = videojs(videoNode, videoJsOptions, () => {
        // print version information at startup
        setRecording(player);
        const version_info =
          'Using video.js ' +
          videojs.VERSION +
          ' with videojs-record ' +
          videojs.getPluginVersion('record') +
          ' and recordrtc ' +
          RecordRTC.version;
        videojs.log(version_info);
      });
      player.record().enumerateDevices();

      player.record().getRecordType();

      player.on('enumerateReady', () => {
        console.log('device clicked');
        // document.getElementById("getDevice").click();
        // player.record().getDevice();
      });

      // device is ready
      player.on('deviceReady', () => {
        console.log('device is ready!');
        setText('start recording');
        setShow(false);
        player.record().start();
      });

      // user clicked the record button and started recording
      player.on('startRecord', () => {
        console.log('started recording!');
        setText('stop');
        setShow(true);
        startTime();
      });

      // user completed recording and stream is available
      player.on('finishRecord', async () => {
        if (isSafari) {
          var blobUrl = URL.createObjectURL(player.recordedData);
          console.log('blobUrl', blobUrl);
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
          };
          getSeekableBlob(player.recordedData, function (blob) {
            var blobUrl = URL.createObjectURL(blob);
            console.log('blobUrl', blobUrl);
            props.setScreenModalOpen(true);
            props.setScreenBlobUrl(blobUrl);
            // Router.push({
            //   pathname: "../../../../ch/RecordingForm",
            //   query: { name: `${blobUrl}`, type: `mp4`, seconds: `0`, recording: "screen" },
            // });
          });
        }
        console.log(player.record().getDuration(), formatted, 'duration time');
        props.setTime(player.record().getDuration());
        // player.record().getDuration();
        setShow(false);
        player.record().destroy();
      });

      // error handling
      player.on('error', (element, error) => {
        console.warn(error);
      });

      player.on('deviceError', () => {
        console.error('device error:', player.deviceErrorCode);
      });
    } catch (error) {
      console.log('Error', error);
    }
  }
  const formatted = moment.utc(seconds * 1000).format('mm:ss');
  console.log(formatted, 'duration time');

  const hellofunction = () => {
    recording.record().getDevice();
    console.log('im here');
  };

  return (
    <>
      {/* <div>
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
                      hellofunction();
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
      </div> */}

      {show == true ? (
        <>
          <div className="position-fixed" style={{ bottom: '0' }}>
            <div data-vjs-player style={{ objectFit: 'cover', width: '6000px', height: '600px', borderRadius: '25px' }}>
              <video
                id="myScreen"
                ref={(node) => (videoNode = node)}
                className="video-js bg-transparent vjs-default-skin"
                playsInline
              ></video>
            </div>
          </div>
          <div
            className="d-flex fluid-container col-12 justify-content-center align-items-end mb-4 position-fixed"
            style={{ bottom: '0', zIndex: '9999999' }}
          >
            <button
              onClick={() => {
                dispatch(screenRecording('false'));
                pauseTime();
                recording.record().stop();
                props.setStartRecording(false);
              }}
              className="main-background-color d-flex align-items-center justify-content--start ps-3"
              style={{
                width: '400px',
                borderRadius: '15px',
                opacity: '0.9',
                zIndex: '9999999',
                border: '2px solid #303548',
                paddingBottom: '10px',
                paddingTop: '10px',
              }}
            >
              <Image
                src="/assets/icons/new/ic_activerecording.svg"
                width="45px"
                className="d-inline-flex"
                alt="active recording"
                height="45px"
              />
              <p className="ms-5 ps-5 mb-0 semibold-small text-white text-uppercase d-flex justify-content-end">
                {formatted}
              </p>
            </button>
          </div>
        </>
      ) : (
        <div className="position-fixed" style={{ bottom: '0' }}>
          <div data-vjs-player style={{ objectFit: 'cover', width: '6000px', height: '600px', borderRadius: '25px' }}>
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

export default ScreenCasting;
