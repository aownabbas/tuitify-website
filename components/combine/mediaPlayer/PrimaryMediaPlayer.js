import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import NextImage from 'next/image';
import { CircularProgress, Slider } from '@mui/material';
import GenericTooltip from '../../ch/GenericTooltip';
import { Box } from '@mui/system';
import DotProgress from '../../DotProgress';
import { useRouter } from 'next/router';
import classes from './PrimaryMediaPlayer.module.css';
import LinearProgress from '@mui/material/LinearProgress';

const PrimaryMediaPlayer = ({
  link,
  height,
  platformData,
  type,
  time,
  thumbnail,
  mediaLibraryId,
  handlePlayGiists,
  playing,
  setPlaying,
  delMediaHandler,
  awsLink,
  isCH,
}) => {
  const [hovering, setHovering] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [startBuffering, setStartbuffering] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [loaded, setLoaded] = useState(0);

  const handleMouseOver = () => {
    setHovering(true);
  };
  const handleMouseOut = () => {
    setTimeout(() => setHovering(false), 5000);
  };

  const router = useRouter();
  const [state, setState] = useState({
    // playing: playMedia,
    muted: false,
    played: 0,
    seeking: false,
    duration: 0,
    loaded: 0,
  });

  useEffect(() => {
    handlePlay();
  }, []);

  function getTypeChangeValue(type) {
    switch (type) {
      case 0:
        return 'video';
      case 1:
        return 'doc';
      case 2:
        return 'audio';
      case 3:
        return 'other';
    }
  }

  const typeChangeValue = getTypeChangeValue(type);
  const makeLink = `${awsLink}${
    !mediaLibraryId && typeChangeValue === 'audio' && isCH
      ? 'briffs/audio/'
      : !mediaLibraryId && typeChangeValue === 'audio'
      ? 'giists/audio/'
      : !mediaLibraryId && typeChangeValue === 'video' && isCH
      ? 'briffs/video/'
      : !mediaLibraryId && typeChangeValue === 'video'
      ? 'giists/video/'
      : mediaLibraryId && typeChangeValue === 'audio'
      ? 'mediaLibrary/audio/'
      : 'mediaLibrary/video/'
  }${link}`;

  let playerUrl = getPlayerUrl(typeChangeValue, makeLink);
  function getPlayerUrl(type, makeLink) {
    try {
      if ((type == 'video' || type == 'audio') && link?.startsWith('https://')) {
        return link;
      } else if (type == 'video' || type == 'audio') {
        return makeLink;
      } else {
        return link;
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  // Show Full Screen handle media
  const handle = useFullScreenHandle();

  // it's controls
  const playerRef = useRef(null);

  // const { playing, muted, played, seeking } = state;
  const { muted } = state;

  // it's function format time 00:02 form

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef.current
    ? // state.duration for youtube vidoes and durations came form database duration
      time
      ? time
      : state.duration
    : '00:00';

  function format(seconds) {
    if (isNaN(seconds)) {
      return '00:00';
    }
    seconds = Math.round(seconds);
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  function pad(string) {
    return ('0' + string).slice(-2);
  }

  const [loading, setLoading] = useState(true);

  function handleLoad() {
    setLoading(false);
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
    // setPlaying({ playing: false });
  };

  const handlePlay = () => {
    // setState({ ...state, playing: true });
    setPlaying(true);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  // get duration form react player
  const handleDuration = (duration) => {
    setState({ duration });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleSeekMouseUp = (event) => {
    setState({ ...state, seeking: false });
    const rect = event.currentTarget.getBoundingClientRect();
    const totalWidth = rect.width;
    const clickX = event.clientX - rect.left;
    const newProgress = (clickX / totalWidth) * 100;
    playerRef.current.seekTo(newProgress / 100);
  };

  const handleProgress = (changeState) => {
    const { loaded, played } = changeState;
    // const loadedPercentage = (loadedSeconds / duration) * 100;
    if (!state.seeking) {
      setState({
        ...state,
        played: parseFloat(played),
        loaded: parseFloat(loaded),
      });
    }
  };

  const handleSeekChange = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const totalWidth = rect.width;
    const clickX = event.clientX - rect.left;
    const newProgress = clickX / totalWidth;

    if (Math.random(newProgress) == 1) {
      handlePlayPause();
      return;
    }
    setState({ ...state, played: parseFloat(newProgress) });
  };

  // format the currentTime
  const elapsedTime = format(currentTime);
  // format the total time
  const totalDuration = format(duration);

  function getExtension(filename) {
    return filename?.split('.').pop();
  }

  // let filename = "main.config.js";
  let extension = getExtension(link);

  if (typeChangeValue == 'doc') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              opacity: 0.5,
              zIndex: 1,
              borderRadius: '10px',
            }}
          >
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )} */}
        {delMediaHandler && (
          <div style={{ position: 'absolute', top: '3%', right: '2%', zIndex: '10' }} onClick={() => delMediaHandler()}>
            <GenericTooltip
              placement="top"
              title="Delete Media"
              component={<NextImage src="/assets/icons/del-media-icon.svg" width={32} height={32} alt="trash icon" />}
            />
          </div>
        )}
        <iframe
          className="w-100 h-100"
          height={height}
          src={
            extension == 'pdf'
              ? `${awsLink}giists/documents/${link}#toolbar=0&scrollbar=0`
              : `https://view.officeapps.live.com/op/embed.aspx?src=${awsLink}giists/documents/${link}&embedded=true`
          }
          loading="lazy"
          style={{ borderRadius: '10px' }}
        ></iframe>
      </div>
    );
  }

  const buffering = () => {
    setStartbuffering(true);
  };
  const handlePlaying = () => {
    setStartbuffering(false);
  };

  const handleQualityChange = (q) => {
    setQuality(q);
  };

  const normalise = (value) => ((value - 0) * 100) / (1 - 0);

  return (
    <FullScreen handle={handle} className={classes.fullscreen}>
      <div
        style={{ height: '100%', width: '100%' }}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onMouseMove={handleMouseOver}
      >
        {/* to be used in future */}
        {startBuffering == true ? (
          <div
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '10' }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          ''
        )}
        {delMediaHandler && !handle.active && (
          <div style={{ position: 'absolute', top: '3%', right: '2%', zIndex: '10' }} onClick={() => delMediaHandler()}>
            <GenericTooltip
              placement="top"
              title="Delete Media"
              component={<NextImage src="/assets/icons/del-media-icon.svg" width={32} height={32} alt="trash icon" />}
            />
          </div>
        )}
        {/* <div className='gg'> */}
        <ReactPlayer
          className={`${classes.vidContent}`}
          url={playerUrl}
          playing={playing}
          muted={muted}
          onProgress={handleProgress}
          ref={playerRef}
          progressInterval={500}
          pip={true}
          onEnded={handlePlayGiists}
          autoPlay={true}
          controls={false}
          height={'100%'}
          onBuffer={buffering}
          onBufferEnd={handlePlaying}
          width={'100%'}
          style={{
            minHeight: '100%',
            overflow: 'hidden !important',
            position: 'relative',
            backgroundImage:
              typeChangeValue == 'audio' && thumbnail != 'undefined.png' && thumbnail != undefined
                ? 'url(' +
                  (platformData
                    ? platformData == (null || {})
                      ? ''
                      : '/assets/icons/new/audio_background.svg'
                    : '/assets/icons/new/audio_background.svg') +
                  ')'
                : typeChangeValue == 'audio'
                ? `url("/assets/icons/new/audio_background.svg")`
                : '',
            backgroundPosition: typeChangeValue == 'audio' && 'center',
            backgroundRepeat: typeChangeValue == 'audio' && 'no-repeat',
            backgroundSize: typeChangeValue == 'audio' && 'cover',
          }}
          duration={duration}
          onDuration={handleDuration}
          // Quality change control
          config={{
            file: {
              hlsOptions: {
                enableWorker: true,
                enableSoftwareAES: false,
                levelLoadingRetry: 3,
              },
              dashOptions: {
                forceVideoMime: 'video/mp4',
                lowLatencyMode: false,
                stableBufferTime: 2,
              },
              attributes: {
                controlsList: 'nodownload',
              },
              tracks: [],
              qualityOptions: [
                {
                  label: 'Auto',
                  value: 'auto',
                },
                {
                  label: 'Low',
                  value: 'low',
                  bitrate: 500,
                },
                {
                  label: 'Medium',
                  value: 'medium',
                  bitrate: 1000,
                },
                {
                  label: 'High',
                  value: 'high',
                  bitrate: 1500,
                },
              ],
              onSelectQuality: handleQualityChange,
            },
          }}
        />
        {/*Aown: In primary media player there is changing for not using slider in react player, as we 
dont need in knowledge home. */}
        {true &&
          router.pathname !== '/kh/KnowledgeHome' &&
          router.pathname !== '/kh/published_giists/PublishedGiists' &&
          router.pathname !== '/combine/UserProfile' &&
          router.pathname !== '/kh/ViewAllGiists' &&
          router.pathname !== '/kh/SearchKnowledge' && (
            <div className="react-player  mb-2 container d-flex justify-space-between mx-auto px-0">
              <div className="col-12 mt-4 px-0">
                <div
                  className="controls-background row align-items-center d-flex justify-content-center mx-2 text-white"
                  style={{ padding: '23px 13px' }}
                >
                  <div className="position-absolute d-flex align-items-center justify-content-center container">
                    <span className="h4 mb-0 col-1 px-1 d-flex align-items-center">
                      {playing != false && elapsedTime != totalDuration && currentTime != 0.0 ? (
                        <NextImage
                          onClick={() => handlePlayPause()}
                          src="/assets/icons/new/pause.png"
                          width="32px"
                          height="32px"
                          alt="pause"
                        />
                      ) : (
                        <NextImage
                          onMouseDownCapture={() => {
                            elapsedTime == totalDuration ? handlePlayPause() : console.log('good');
                          }}
                          onClick={() => {
                            elapsedTime == totalDuration ? handlePlayPause() : handlePlay();
                          }}
                          src="/assets/icons/new/Group8435.svg"
                          width="32px"
                          height="32px"
                          alt="pause"
                        />
                      )}
                    </span>
                    {/* <Slider
                    getAriaValueText={valuetext}
                    min={0}
                    step={1}
                    max={1000}
                    aria-label="Default"
                    // onChange={(e, value) => {
                    //   handleSeekChange(e, value);
                    // }}
                    onMouseDown={handleSeekMouseDown}
                    onChangeCommitted={handleSeekMouseUp}
                    className="text-white"
                    value={state.played * 1000}
                    size="small"
                    ref={trackRef}
                  /> */}

                    <Box sx={{ width: '100%' }}>
                      <LinearProgress
                        variant="buffer"
                        value={normalise(state.played)}
                        valueBuffer={normalise(state.loaded)}
                        onClick={handleSeekChange}
                        style={{ cursor: 'pointer', backgroundColor: 'red', color: 'red' }}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                      />
                    </Box>
                    {/* another slider is to be added for seekbar buffering */}
                    <span className="fw-lighter light-xsmall col-3 col-lg-2 px-1 text-end">
                      <small className="text-white text-nowrap">
                        {elapsedTime} / {totalDuration}
                      </small>
                    </span>
                    <span className="h4 mb-0 col-1 text-end align-items-center">
                      {muted ? (
                        <GenericTooltip
                          placement="top"
                          title="Mute"
                          component={
                            <NextImage
                              onClick={handleMute}
                              src="/assets/icons/new/volume_slash.svg"
                              width="19px"
                              height="17px"
                              alt="volume"
                            />
                          }
                        />
                      ) : (
                        <GenericTooltip
                          placement="top"
                          title="Volume"
                          component={
                            <NextImage
                              onClick={handleMute}
                              src="/assets/icons/new/ic_volume.svg"
                              width="17px"
                              height="17px"
                              alt="volume"
                            />
                          }
                        />
                      )}
                    </span>
                    {true == 'mp3' ? (
                      ''
                    ) : (
                      <span className="h4 mb-0 col-1 text-end align-items-center">
                        <GenericTooltip
                          placement="top"
                          title={handle.active == true ? 'Exit Full Screen' : 'Full Screen'}
                          component={
                            <NextImage
                              // onClick={handleRewind}
                              onClick={handle.active == true ? handle.exit : handle.enter}
                              src="/assets/icons/new/fullscreen.svg"
                              width="15px"
                              height="19px"
                              alt="reverse"
                            />
                          }
                        />
                      </span>
                    )}
                    <span className="h4 mb-0 col-1 text-end align-items-center">
                      <GenericTooltip
                        placement="top"
                        title="Rewind"
                        component={
                          <NextImage
                            onClick={handleRewind}
                            src="/assets/icons/creationicons/ic_reverse.svg"
                            width="15px"
                            height="19px"
                            alt="reverse"
                          />
                        }
                      />
                    </span>
                    <span className="h4 mb-0 col-1 text-center align-items-center">
                      <GenericTooltip
                        placement="top"
                        title="Fast Forward"
                        component={
                          <NextImage
                            onClick={handleFastForward}
                            src="/assets/icons/creationicons/ic_forward.svg"
                            width="15px"
                            height="19px"
                            alt="forward"
                          />
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </FullScreen>
  );
};

export default PrimaryMediaPlayer;
