import React, { useState, useEffect } from 'react';
import Layout from '../../layout/Layout';
import moment from 'moment';
import useTimer from '../../ch/chmainpage/interaction/interactionmodals/timer/useTimer';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { useRouter } from 'next/router';
import GenericTooltip from '../../ch/GenericTooltip';
import AudioGBReplay from './AudioGBReplay';

const AudioGBCreation = (props) => {
  const {
    isAudioRecActive,
    setIsAudioRecActive,
    S3_BUCKET,
    REGION,
    AccessKeyId,
    SecretAccessKey,
    chaptIndex,
    giistChapMediaCreate,
    setDotProgressLoading,
    DotProgressLoading,
    subindexForMedia,
    giistSubChapMediaCreate,
    chaptersCreateRes,
    TranscodePipelineId,
    transcodePresetId,
  } = props;
  const router = useRouter();

  const [media, setMedia] = useState({});
  const [data, setData] = useState(null);

  const [recordState, setState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [show, setShow] = useState(false);

  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();

  const [loading, setLoading] = useState(false);

  const [recording, setRecording] = useState('');
  const [device, setDevice] = useState(false);

  const [blobURL, setBlobURL] = useState(null);

  const [mimeType, setMimeType] = useState('audio/webm');

  const start = () => {
    setShow(true);
  };
  const stop = () => {
    setShow(false);
  };
  const onStop = (data) => {
    setShow(false);
    setAudioData(data.url);
    console.log('onStop: audio data', data.url);
    router.push({
      pathname: './RecordingForm',
      query: {
        name: `${data.url}`,
        type: `mp3`,
        seconds: `${seconds}`,
        recording: 'audio',
      },
    });
  };

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events, router.asPath]);

  const handleStartRecording = (e) => {
    const constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // const options = { audioBitsPerSecond: 128000, mimeType: mimeType };
        const options = {
          audioBitsPerSecond: 128000,
          mimeType: 'audio/webm; codecs=opus',
          sampleRate: 44100,
          numberOfAudioChannels: 2,
        };
        const mediaRecorder = new MediaRecorder(stream, options);
        console.log(mediaRecorder, 'media recorder');
        const m = mediaRecorder;
        setMedia(m);

        m.start();
        console.log(mediaRecorder, 'media recorder after start');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleStop = (e) => {
    media.stop();
    media.stream.getTracks().forEach((i) => i.stop());
    media.addEventListener('dataavailable', (e) => {
      console.log(e.data);
      let blob = URL.createObjectURL(e.data);
      console.log(blob);
      setData(blob);
      setShow(false);
      setAudioData(blob);
      console.log('onStop: audio data', blob);
      // router.push({
      //   pathname: "./RecordingForm",
      //   query: { name: `${blob}`, type: `mp3`, seconds: `${seconds}`, recording: "audio" },
      // });
      setBlobURL(blob);
      //   router.push({
      //     pathname: './replays/AudioReplay',
      //     query: { name: `${blob}`, type: `mp3`, seconds: `${seconds}`, recording: 'audio' },
      //   });
    });
  };

  const handleClearData = (audioData) => {
    console.log(audioData);
    setAudioData(null);
    console.log(audioData);
  };

  const formatted = moment.utc(seconds * 1000).format('mm:ss');

  console.log(seconds, formatted, 'seconds and formated');

  return (
    <>
      {loading == true ? (
        <div className="d-flex align-items-center justify-content-center alignCenter">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          {blobURL !== null ? (
            <AudioGBReplay
              name={blobURL}
              setMimeType={setMimeType}
              type="mp3"
              seconds={seconds}
              recording={'audio'}
              isAudioRecActive={isAudioRecActive}
              setIsAudioRecActive={setIsAudioRecActive}
              S3_BUCKET={S3_BUCKET}
              REGION={REGION}
              AccessKeyId={AccessKeyId}
              SecretAccessKey={SecretAccessKey}
              TranscodePipelineId={TranscodePipelineId}
              transcodePresetId={transcodePresetId}
              chaptIndex={chaptIndex}
              subindexForMedia={subindexForMedia}
              giistChapMediaCreate={giistChapMediaCreate}
              giistSubChapMediaCreate={giistSubChapMediaCreate}
              setDotProgressLoading={setDotProgressLoading}
              DotProgressLoading={DotProgressLoading}
              chaptersCreateRes={chaptersCreateRes}
            />
          ) : (
            <div className="col-12 main-background-color mx-auto" style={{ height: '97%', borderRadius: '20px' }}>
              <div className="h3 pt-4 mb-0 px-4 d-inline-flex align-items-center">
                {/* <Link href="/components/Main" as="/" passHref> */}
                <Image
                  src="/assets/icons/new/back.png"
                  alt="back"
                  width="17px"
                  height="17px"
                  className=""
                  onClick={() => setIsAudioRecActive(false)}
                />
                {/* </Link> */}
                <span className="semibold-large text-white ps-3">Recording</span>
              </div>
              <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
                {show == false ? (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      // start();
                      handleStartRecording(e);
                      // recording.record().start();
                      setShow(true);
                      startTime();
                    }}
                    className="circle bg-white position-relative d-flex justify-content-center align-items-center mb-3"
                  >
                    <div className="position-absolute text-center semibold">
                      <GenericTooltip
                        placement="left-start"
                        title="Press me to start recording"
                        component={
                          <Image
                            src="/assets/icons/new/voice.png"
                            alt="start"
                            id="record"
                            // onClick={(e) => {
                            //   // start();
                            //   handleStartRecording(e);
                            //   // recording.record().start();
                            //   setShow(true);
                            //   startTime();
                            // }}
                            width="30px"
                            height="42px"
                          />
                        }
                      />

                      <div className="h5 mt-3 text-uppercase">{show == false ? 'R e c o r d i n g' : 's t o p'}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      // stop();
                      // recording.record().stop();
                      handleStop(e, data);
                      setShow(false);
                      pauseTime();
                    }}
                    className="circle bg-white position-relative d-flex justify-content-center align-items-center mb-3"
                  >
                    <div className="position-absolute text-center semibold">
                      <GenericTooltip
                        placement="left-start"
                        title="Press me to stop recording"
                        component={
                          <Image
                            src="/assets/icons/creationicons/ic_stop.png"
                            alt="stop"
                            id="stop"
                            // onClick={(e) => {
                            //   // stop();
                            //   // recording.record().stop();
                            //   handleStop(e, data);
                            //   setShow(false);
                            //   pauseTime();
                            // }}
                            width="37px"
                            height="37px"
                            className="rounded-circle"
                          />
                        }
                      />

                      <div className="h5 mt-3 text-uppercase">{show == false ? 'R e c o r d i n g' : 's t o p'}</div>
                    </div>
                  </div>
                )}
                {/* </div>
              </div> */}
                <div className=" justify-content-center semi-bold align-items-start">
                  <div className="h3 text-white mt-3 semibold-xlarge">{formatted}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AudioGBCreation;
