import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import COLORS from '../../../../public/assets/colors/colors';
import WaveSurfer from 'wavesurfer.js';
import moment from 'moment';
import AlertModal from '../../../modals/alertmodal/AlertModal';
import GenericTooltip from '../../GenericTooltip';
import DotProgress from '../../../DotProgress';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';

const AudioReplayDynamic = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState('');

  const [backModal, setBackModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // useEffect(() => {

  //   console.log(router.query.name);
  //   // start the screen loading.
  //   const handleStart = (url) => (url !== router.asPath) && setLoading(true);

  //   // stop the screen loading.
  //   const handleComplete = (url) => (url === router.asPath) && setLoading(false);

  //   // check what is the state of the route.
  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleComplete)
  //   router.events.on('routeChangeError', handleComplete)

  //   return () => {
  //     // destroying the events after they complete.
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleComplete)
  //     router.events.off('routeChangeError', handleComplete)
  //   }
  // }, [router.events, router.asPath]);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (GetPlatData) {
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      let context = new AudioContext();
      let processor = context.createScriptProcessor(1024, 1, 1);
      // }
      if (router.query.name != undefined) {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: 'grey',
          progressColor: 'white',
          backgroundColor: `transparent`,
          barWidth: 1,
          barGap: 6,
          //   autoCenter: true,
          partialRender: true,
          barHeight: 10,
          cursorWidth: 0,
          cursorColor: 'white',
          audioContext: context || null,
          audioScriptProcessor: processor || null,
          responsive: true,
          hideCursor: true,
          height: 70,
          maxCanvasWidth: 128,
          mediaControls: true,
        });

        var song =
          // "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/bonus.wav";
          router.query.name;
        wavesurfer.current.load(song);

        wavesurfer.current.on('ready', function () {
          console.log('it is in ready');
          if (play == true) {
            wavesurfer.current.play();
            console.log('it is playing');
          } else {
            wavesurfer.current.pause();
            console.log('it is pause');
            let secs = wavesurfer.current.getDuration();
            const formatted = moment.utc(secs * 1000).format('mm:ss');
            setDuration(formatted);
          }
        });

        wavesurfer.current.on('play', () => {
          console.log('it is a play event');
          let AudioContext = window.AudioContext || window.webkitAudioContext;
          context = new AudioContext();
          processor = context.createScriptProcessor(1024, 1, 1);
        });
        wavesurfer.current.on('audioprocess', () => {
          console.log('it is in audioprocess');
          let timeLeft = wavesurfer.current.getCurrentTime();
          const convert = moment.utc(timeLeft * 1000).format('mm:ss');
          setDuration(convert);
          if (convert == duration) {
            setPlay(false);
          }
        });
      }
    }
    return () => wavesurfer.current.destroy();
  }, [play]);

  const handlePlay = () => {
    setPlay(!play);
  };

  const handleBackModal = () => {
    router.push('/ch/AudioBriifCreation');
  };

  return (
    <>
      {deleteModal == true && (
        <>
          <DummyDeleteModal
            openModal={deleteModal}
            handleCloseModal={() => {
              setDeleteModal(false);
            }}
            image={'/assets/images/trash.svg'}
            heading="Delete"
            text="Are you sure, you want to delete this recording?"
            buttonText1="No"
            buttonText2="Yes"
            handleClick={() => {
              handleBackModal();
            }}
          />
        </>
      )}
      {backModal == true && (
        <>
          <DummyDeleteModal
            openModal={backModal}
            handleCloseModal={() => {
              setBackModal(false);
            }}
            image={'/assets/icons/new/exit.png'}
            heading="Exit!"
            text="You are about to loose your recording, do you confirm?"
            buttonText1="No"
            buttonText2="Yes"
            handleClick={() => {
              handleBackModal();
            }}
          />
        </>
      )}
      <>
        {loading == true && <DotProgress />}
        <Layout heading="Communication Hub">
          <div className="col-12 justify-content-center row w-100 mx-auto px-0 h-100">
            <div className="position-absolute px-0 h-100">
              <div
                className={`position-relative w-100 mx-auto`}
                style={{ height: '95%', borderRadius: '15px', backgroundColor: COLORS.mainColor }}
              >
                <div
                  className="h3 pt-3 row mb-0 px-2 w-100 mx-auto justify-content-center d-inline-flex align-items-center position-absolute "
                  style={{ zIndex: '1' }}
                >
                  <span className="row">
                    <span className="d-flex align-items-center justify-content-start">
                      <Image
                        src="/assets/icons/new/back.png"
                        width="17px"
                        height="17px"
                        className="col-4"
                        alt="back"
                        onClick={() => {
                          setBackModal(true);
                        }}
                      />
                      {/* </Link> */}
                      <span className="semibold-large white ps-3 col-8">Recording Replay</span>
                    </span>
                  </span>
                </div>
                <div className="position-absolute w-100 bottom-0 start-50 translate-middle-x mb-5 ">
                  <div className="d-flex justify-content-center pb-4">
                    <span className="d-inline-flex col-12 col-md-6 row align-items-end justify-content-center mx-auto">
                      <div className="waveform p-0 border-0 shadow-0 col-10" ref={waveformRef}></div>
                    </span>
                  </div>
                  <div className="col btn d-flex justify-content-center p-0 pe-3 mt-5 pb-4">
                    <div className="text-white d-flex align-self-start bold">{duration}</div>
                  </div>

                  <div className="row p-0 mt-5 ">
                    <div className="d-flex justify-content-center ">
                      <div className="d-flex align-items-center px-3 ">
                        <GenericTooltip
                          placement="top"
                          title="Delete"
                          component={
                            <Image
                              src="/assets/icons/new/delete.png"
                              width="22px"
                              height="25px"
                              className=""
                              alt="back"
                              onClick={() => {
                                setDeleteModal(true);
                              }}
                            />
                          }
                        />
                      </div>
                      <span className="d-flex justify-content-center align-items-center px-5 pb-2 ">
                        {play == false ? (
                          <GenericTooltip
                            placement="top"
                            title="Play"
                            component={
                              <Image
                                src="/assets/icons/new/activeplay.png"
                                width="55px"
                                height="55px"
                                alt="play"
                                className=""
                                onClick={() => {
                                  handlePlay();
                                }}
                              />
                            }
                          />
                        ) : (
                          <GenericTooltip
                            placement="top"
                            title="Pause"
                            component={
                              <Image
                                src="/assets/icons/new/audio_pause.svg"
                                width="55px"
                                height="55px"
                                alt="pause"
                                className=""
                                onClick={() => {
                                  handlePlay();
                                }}
                              />
                            }
                          />
                        )}
                      </span>
                      <div
                        className="text-white semibold px-3 justify-content-end d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          router.push({
                            pathname: '../RecordingForm',
                            query: {
                              name: router.query.name,
                              type: router.query.type,
                              seconds: router.query.seconds,
                              recording: router.query.recording,
                            },
                          });
                        }}
                      >
                        Done
                      </div>
                    </div>
                  </div>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>
        </Layout>
      </>
    </>
  );
};

export default AudioReplayDynamic;
