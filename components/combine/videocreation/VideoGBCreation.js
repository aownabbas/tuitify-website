import React, { useState, useEffect } from 'react';
// video js library css import
import 'video.js/dist/video-js.css';
import 'videojs-record/dist/css/videojs.record.css';
import 'webrtc-adapter';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import COLORS from '../../../public/assets/colors/colors';
import moment from 'moment';

// module scss for the briif video screen.
import styles from './VideoGBCreation.module.scss';
import Router from 'next/router';
import Image from 'next/image';

//custom hook timer.
// import useTimer from '../../chmainpage/interaction/interactionmodals/timer/useTimer';
import useTimer from '../../ch/chmainpage/interaction/interactionmodals/timer/useTimer';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from '../../layout/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoGBReplay from './VideoGBReplay';

// ts-ebml library elements for correct recording the video.
const { Decoder, tools, Reader } = require('ts-ebml');

//variable that knows weather we are on the firefox browser or not.
const isFirefox = typeof InstallTrigger !== 'undefined';

const VideoGBCreation = ({
  setChapters,
  chapters,
  giistcreationRec,
  setIsWebcamActive,
  platformData,
  isWebcamActive,
  S3_BUCKET,
  REGION,
  AccessKeyId,
  SecretAccessKey,
  TranscodePipelineId,
  giistChapMediaCreate,
  giistSubChapMediaCreate,
  giistChapterId,
  setUploadedBlobData,
  indexForMedia,
  subindexForMedia,
  setDotProgressLoading,
  DotProgressLoading,
  chaptersCreateRes,
  transcodePresetId,
}) => {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState('');
  const [device, setDevice] = useState(false);

  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

  // options for video js library.
  const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    poster: '',
    // frameWidth: 1800,
    // frameHeight: 500,
    // autoMuteDevice: true,
    imageOutputQuality: 4,
    plugins: {
      record: {
        audio: true,
        // video: true,
        video: {
          // video media constraints: set resolution of camera
          width: { ideal: 1920 }, // <-- This works too
          height: { ideal: 1080 },
        },
        // dimensions of captured video frames
        // frameWidth: 1280,
        // frameHeight: 720,

        maxLength: 20000,
        debug: true,
        // condition for firefox video.
        videoMimeType: isFirefox || isSafari ? 'video/mp4' : 'video/webm;codecs=vp8',
      },
    },
  };
  let videoNode, player;
  let flag = false;
  var duration;
  useEffect(() => {
    // for only rendering useEffect one time when player is not equal to undefined.
    if (!flag) {
      handleRecording();
    }
    flag = true;

    // start the screen loading.
    const handleStart = (url) => url !== Router.asPath && setLoading(true);

    // stop the screen loading.
    const handleComplete = (url) => url === Router.asPath && setLoading(false);

    // check what is the state of the route.
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      // destroying the events after they complete.
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
      try {
        if (player) {
          player.record().destroy();
        }
      } catch (error) {
        console.log('error');
      }
    };
  }, [Router.events, Router.asPath]);

  const [blobURL, setBlobURL] = useState(null);
  const [durationSet, setDurationSet] = useState('');

  // main function for recording the briif video.
  async function handleRecording() {
    // video js library and its dependencies imports through async await.
    const videojs = (await import('video.js')).default;
    const RecordRTC = (await import('recordrtc')).default;
    const Record = await import('videojs-record/dist/videojs.record.js');

    // initializing player element.
    player = videojs(videoNode, videoJsOptions, () => {
      // print version information at startup

      //setting recording state with player data to access the player info in render.
      setRecording(player);
      player.record().getDevice();
      const version_info =
        'Using video.js ' +
        videojs.VERSION +
        ' with videojs-record ' +
        videojs.getPluginVersion('record') +
        ' and recordrtc ' +
        RecordRTC.version;
      videojs.log(version_info);
      //
    });
    player.record().enumerateDevices();

    // player.record().getDevice();
    player.on('enumerateReady', function () {
      var devices = player.record().devices;
      var list = document.getElementById('devices');
      var node, textnode;

      // remove existing list items
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      console.log('total devices:', devices.length);

      // The user must have already granted permission to the page
      // to use the media devices in order to get the device label
      // populated. When served over HTTPS, the browser will remember
      // permission granted on subsequent loads, so the permission
      // will have been granted before requesting media. When using
      // HTTP, not HTTPS, the getUserMedia request must be made and
      // accepted before enumerateDevices will populate labels.
      devices.forEach(function (device) {
        let description = device.kind + ' - label: ' + (device.label || 'unknown') + ' (id: ' + device.deviceId + ')';
        console.log(description);

        // add device to list
        node = document.createElement('li');
        textnode = document.createTextNode(description);
        node.appendChild(textnode);
        list.appendChild(node);
      });
    });

    // error handling
    player.on('enumerateError', function () {
      console.log('enumerate error:', player.enumerateErrorCode);
    });

    // device is ready
    player.on('deviceReady', () => {
      setDevice(true);
      console.log('device is ready!');
      setText('start');
      setShow(false);
    });

    // user clicked the record button and started recording
    player.on('startRecord', () => {
      console.log('started recording!');
      setText('stop');
      setShow(true);
    });

    // user completed recording and stream is available
    player.on('finishRecord', async () => {
      console.log('finishRecording');
      if (isSafari) {
        var blobUrl = URL.createObjectURL(player.recordedData);
        console.log('blobUrl in finish', blobUrl);
        setBlobURL(blobUrl);
      } else {
        const getSeekableBlob = (inputBlob, callback) => {
          var reader = new Reader(); //
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
        duration = player.record().getDuration();
        setDurationSet(duration);
        getSeekableBlob(player.recordedData, function (blob) {
          var blobUrl = URL.createObjectURL(blob);
          console.log('blobUrl in else', blobUrl);
          setBlobURL(blobUrl);
        });
      }
      player.record().stopStream();
      player.record().destroy();
    });

    // error handling
    player.on('error', (element, error) => {
      console.warn(error);
    });

    player.on('deviceError', () => {
      console.error('device error:', player.deviceErrorCode);
    });
  }

  /* workaround browser issues */
  // let formatted = moment.utc(state.time).format("mm:ss");
  const formatted = moment.utc(seconds * 1000).format('mm:ss');

  return (
    <>
      {loading == true ? (
        <div className="d-flex align-items-center justify-content-center alignCenter">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          {/* <Layout heading="Knowlede Hub"> */}
          {blobURL != null ? (
            <VideoGBReplay
              indexForMedia={indexForMedia}
              subindexForMedia={subindexForMedia}
              setChapters={setChapters}
              chapters={chapters}
              isWebcamActive={isWebcamActive}
              setIsWebcamActive={setIsWebcamActive}
              platformData={platformData}
              S3_BUCKET={S3_BUCKET}
              REGION={REGION}
              AccessKeyId={AccessKeyId}
              SecretAccessKey={SecretAccessKey}
              TranscodePipelineId={TranscodePipelineId}
              transcodePresetId={transcodePresetId}
              name={blobURL}
              type="mp4"
              seconds="0"
              recording="video"
              giistChapMediaCreate={giistChapMediaCreate}
              giistSubChapMediaCreate={giistSubChapMediaCreate}
              giistChapterId={giistChapterId}
              setUploadedBlobData={setUploadedBlobData}
              setDotProgressLoading={setDotProgressLoading}
              DotProgressLoading={DotProgressLoading}
              duration={durationSet}
              chaptersCreateRes={chaptersCreateRes}
            />
          ) : (
            <div className="col-12 justify-content-center row w-100 mx-auto px-0 h-100">
              {/* { device == true ? */}
              <div className="position-absolute px-0 h-100">
                <div
                  className={`${styles.title} position-relative w-75 mx-auto h-100`}
                  // style={{ height: "470px" }}
                >
                  <div
                    className="h3 pt-4 mb-0 px-4 d-inline-flex align-items-center position-absolute"
                    style={{ zIndex: '1' }}
                  >
                    {/* <Link href="/components/Main" as="/" passHref>
                      <Image src="/assets/icons/new/back.png" width="17px" height="17px" className="" alt="back" />
                    </Link> */}

                    <ArrowBackIcon style={{ color: '#FFFFFF !important' }} onClick={() => setIsWebcamActive(false)} />
                    {/* will be shown on codition 
                    <span className="semibold-large white ps-3">Recording</span> */}
                    <span className="semibold-large white ps-3">Webcam</span>
                  </div>
                  <span className={`${styles.videoContainer}`}>
                    <div
                      data-vjs-player
                      className={`m-0 w-100`}
                      style={{
                        width: '1350px',
                        borderRadius: '25px',
                      }}
                    >
                      <video
                        id="myVideo"
                        ref={(node) => (videoNode = node)}
                        className="video-js w-100 vjs-default-skin"
                        playsInline
                        style={{
                          height: '100%',
                          borderRadius: '25px',
                        }}
                      ></video>
                    </div>
                  </span>

                  <div
                    className="col-12 d-flex justify-content-center mx-auto w-100 mb-0 briif-video-container position-relative"
                    // style={{ height: "525px" }}
                  >
                    <div
                      className="square d-flex px-4 mx-auto align-items-center briif-video-controls position-absolute"
                      style={{
                        width: '97%',
                        height: '65px',
                        backgroundColor: !isWebcamActive ? COLORS.mainColor : 'rgba(48, 53, 72, 0.4)',
                        backdropFilter: !isWebcamActive ? '' : 'blur(10px)',
                        opacity: '0.8',
                      }}
                    >
                      <div className="position-absolute row col-6 col-md-4 d-flex align-items-center justify-content-start white">
                        <div className="col-6 col-sm-4 col-md-5 col-lg-4 col-xxl-3 d-flex pe-0 align-items-center justify-content-center">
                          {show == false ? (
                            <span className="d-flex pe-0 align-items-center" style={{ cursor: 'pointer' }}>
                              <Image
                                id="record"
                                src="/assets/icons/creationicons/videocam.png"
                                alt="videocam"
                                onClick={() => {
                                  recording.record().start();
                                  startTime();
                                }}
                                className=""
                                style={{ opacity: 1 }}
                                width="45px"
                                height="27px"
                              />
                            </span>
                          ) : (
                            <span className="d-inline-flex" style={{ cursor: 'pointer' }}>
                              <Image
                                src="/assets/icons/creationicons/ic_stop.png"
                                id="stop"
                                onClick={() => {
                                  recording.record().stop();
                                  pauseTime();
                                }}
                                alt="stop"
                                width="45px"
                                height="45px"
                              />
                            </span>
                          )}
                        </div>
                        <span className="h5 mb-0 white text-capitalize px-0 text-md-start col-6 text-nowrap d-md-inline col-6 col-md-6 col-lg-8 col-xxl-9">
                          {text}
                        </span>
                      </div>
                      <div className="w-100 text-md-center pe-3 pe-md-0 text-end align-items-center">
                        <div className="h3 mt-2 white semibold-xlarge">{formatted}</div>
                      </div>

                      {/* ==> commented (click up) 
                      {isWebcamActive && (
                        <div className="d-flex">
                          <Image src="/assets/images/microphone-2.svg" height={32} width={32} />
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              {device == true ? (
                ''
              ) : (
                <div
                  className="position-absolute ms-1 d-flex align-items-center justify-content-center"
                  style={{ height: '525px' }}
                >
                  <CircularProgress className="text-white" style={{ color: 'white' }} disableShrink />
                </div>
              )}
            </div>
          )}
          {/* </Layout> */}
        </>
      )}
    </>
  );
};

export default VideoGBCreation;
