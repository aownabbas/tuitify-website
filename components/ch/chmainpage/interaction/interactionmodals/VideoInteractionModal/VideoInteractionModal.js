import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import moment, { duration } from 'moment';
import styles from './InteractionVideoModal.module.scss';
import dynamic from 'next/dynamic';
const { Decoder, tools, Reader } = require('ts-ebml');
import 'videojs-record/dist/css/videojs.record.css';
import useTimer from '../timer/useTimer';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: 424,
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  boxShadow: 24,
  p: 2,
};

const isFirefox = typeof InstallTrigger !== 'undefined';
// const userAgent = navigator.userAgent;
const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

const VideoInteractionModal = (props) => {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [videoStopped, setVideoStopped] = useState(false);
  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();
  const [device, setDevice] = useState(false);
  const [videoDuration, setVideoDuration] = useState('');

  console.log(videoDuration, 'videoDuration videoDuration');

  const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
      record: {
        audio: true,
        video: true,
        maxLength: 20000,
        debug: true,
        videoMimeType: isFirefox || isSafari ? 'video/mp4' : 'video/webm;codecs=vp8',
        // 'video/mp4',
        // (isFirefox || isSafari) ? 'video/mp4' :  'video/webm;codecs=vp8',
      },
    },
  };
  let videoNode, player;
  let flag = false;

  useEffect(() => {
    if (!flag) {
      handleRecording();
    }
    flag = true;

    return () => {
      if (player) {
        try {
          player.record().stopStream();
        } catch (error) {
          console.log(player);
        }
      }
    };
  }, []);

  // play when recorded state, ref and function
  const videoRef = useRef(null);
  const [vid, setVid] = useState(false);

  const play = () => {
    vid == false ? videoRef.current.play() : videoRef.current.pause();
    vid == false ? setVid(true) : setVid(false);
  };

  async function handleRecording() {
    const videojs = (await import('video.js')).default;
    const RecordRTC = (await import('recordrtc')).default;
    const Record = await import('videojs-record/dist/videojs.record.js');
    // setTimeout(() => {

    try {
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

      player.record().getDevice();

      // device is ready
      player.on('deviceReady', () => {
        setDevice(true);
        setText('start recording');
        setShow(false);
      });

      // user clicked the record button and started recording
      player.on('startRecord', () => {
        setText('stop');
        setShow(true);
      });

      // user completed recording and stream is available
      player.on('finishRecord', async () => {
        setVideoStopped(true);
        // let userAgent = navigator.userAgent;

        if (isSafari) {
          console.log(player.recordedData);
          var blobUrl = URL.createObjectURL(player.recordedData);
          setVideoUrl(blobUrl);
          console.log(blobUrl);
        } else {
          var reader = new Reader();
          var decoder = new Decoder();
          var fileReader = new FileReader();
          fileReader.onload = (function (context) {
            // var cont = context;
            return function (e) {
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
              var blobUrl = URL.createObjectURL(newBlob);
              setVideoUrl(blobUrl);
              console.log(blobUrl);
            };
          })(this);
          fileReader.readAsArrayBuffer(player.recordedData);
        }
        duration = player.record().getDuration();
        setVideoDuration(duration);
        // player.record().destroy();
        player.record().stopStream();
      });

      // error handling
      player.on('error', (element, error) => {
        console.warn(error);
      });

      player.on('deviceError', () => {
        console.error('device error:', player.deviceErrorCode);
      });
    } catch (error) {
      console.log('errro', error);
    }
  }

  let minutes = seconds * 1000;
  let start =
    minutes == 0 ? (
      <div
        onClick={() => {
          startTime();
          setIsOn(true);
          recording.record().start();
        }}
        className="rounded-circle bg-transparent position-absolute"
        style={{ width: '200px', height: '200px' }}
      ></div>
    ) : null;
  let stop =
    minutes == 0 || !isOn ? null : (
      <div
        onClick={() => {
          recording.record().stop();
          setIsOn(false);
          pauseTime();
        }}
        className="rounded-circle bg-transparent position-absolute"
        style={{ width: '200px', height: '200px', top: '0px' }}
      ></div>
    );
  let formatted = moment.utc(minutes).format('mm:ss');
  console.log(formatted, 'minutes');
  return (
    <>
      <Modal
        open={props.videoOpen}
        onClose={() => {
          flag = false;
          recording == '' ? '' : recording.record().stopDevice();
          setIsOn(false);
          pauseTime();
          props.handleVideoClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center">
          <div className="d-flex justify-content-end">
            <Image
              src="/assets/icons/new/x.png"
              id="record"
              width="26px"
              height="26px"
              alt="close"
              onClick={() => {
                flag = false;
                recording == '' ? '' : recording.record().stopDevice();
                setIsOn(false);
                pauseTime();
                props.handleVideoClose();
              }}
            />
          </div>
          <Typography id="modal-modal-title" className="bold" variant="h6" component="h2">
            Video Reply
          </Typography>
          <Typography id="modal-modal-description" className="light" sx={{ mt: 1, mb: 1 }}>
            Record your reply
          </Typography>

          <div
            className={`${styles.title} mx-auto d-flex justify-content-center text-center`}
            style={{
              objectFit: 'cover',
              width: '400px',
              // cursor: 'pointer',
            }}
          >
            {videoUrl != '' ? (
              //  console.log("video data here")
              <div className="position-relative" style={{ cursor: 'pointer' }}>
                <video ref={videoRef} onEnded={() => setVid(false)} style={{ cursor: 'pointer' }}>
                  <source src={videoUrl} type="video/mp4" style={{ cursor: 'pointer' }} />
                </video>
                {vid == false ? (
                  <span className="d-flex align-items-center position-absolute top-50 start-50 translate-middle">
                    <Image
                      src="/assets/icons/new/polygon_30.svg"
                      onClick={play}
                      className=""
                      alt="play-button"
                      width="19px"
                      height="19px"
                    />
                  </span>
                ) : (
                  <span className="d-flex align-items-center position-absolute top-50 start-50 translate-middle">
                    <Image
                      src="/assets/icons/new/video_pause.svg"
                      onClick={play}
                      className=""
                      alt="pause-button"
                      width="19px"
                      height="19px"
                    />
                  </span>
                )}
              </div>
            ) : (
              <div data-vjs-player style={{ borderRadius: '50%', cursor: 'pointer', height: '100%' }}>
                <video
                  id="myVideo"
                  ref={(node) => (videoNode = node)}
                  className="video-js vjs-default-skin"
                  playsInline
                  autoPlay={true}
                  // controls
                ></video>
                {start}
                {stop}
              </div>
            )}
            {device == true ? (
              ''
            ) : (
              <div className="position-absolute start-50 translate-middle" style={{ top: '300px' }}>
                <CircularProgress className="text-white" style={{ color: 'white' }} disableShrink />
              </div>
            )}
          </div>
          <Typography id="modal-modal-description" className="light" sx={{ mt: 3 }}>
            {minutes == '0' && (
              <div className="row">
                <div className="mt-2 row mx-auto col">
                  <p className="semibold active-color">Click on video to start recording</p>
                </div>
              </div>
            )}
            {minutes != '0' && videoStopped == false && (
              <div className="row">
                <div className="mt-2 row mx-auto col">
                  <p className="semibold stop-color">Click on video to stop recording</p>
                </div>
              </div>
            )}
            <Typography id="counter" className="semibold-large p-0 m-0">
              {formatted}
            </Typography>
            {minutes != '0' && videoStopped == true && (
              <div className="row d-flex justify-content-center gx-0">
                <div className="col-6 mt-4 mb-1">
                  <button
                    className="main-background-color text-white w-100 py-2 semibold"
                    onClick={() => {
                      props.setInteractionsLoading(true);
                      // formatted is the time duration
                      props.uploadFileInput(videoUrl, seconds, 'mov');
                      pauseTime();
                      props.handleVideoClose();
                    }}
                    style={{
                      borderRadius: '7px',
                      border: '2px solid #303548',
                    }}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default VideoInteractionModal;
