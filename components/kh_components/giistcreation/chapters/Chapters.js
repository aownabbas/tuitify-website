import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import COLORS from '../../../../public/assets/colors/colors';
import ChaptersTab from './ChaptersTab';
import { Grid } from '@mui/material';
import AddChapter from './addchapter/AddChapter';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import ReplayRecModal from '../../../modals/replaymodal/ReplayRecModal';
import { useRef } from 'react';
import SuccessErrorModal from '../../../modals/successErrormodal/SuccessErrorModal';
import { useEffect } from 'react';
import PreviewGiist from '../quiz/PreviewGiist';
import PrimaryMediaPlayer from '../../../combine/mediaPlayer/PrimaryMediaPlayer';
import useMediaQuery from '@mui/material/useMediaQuery';
import classes from '../../../combine/mediaPlayer/PrimaryMediaPlayer.module.css';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import DeleteS3Media from '../../../../utils/DeleteS3Media';
import CreateChapsMedia from '../../../../redux/actions/CreateChapsMedia';
import { DeleteGiistChapMedia } from '../../../../redux/actions/DeleteGiistChapMedia';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';

const ScreenRecording = dynamic(() => import('../../../ch/briifrecording/screencast/ScreenRecording'), {
  ssr: false,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`giistCreation-tabpanel-${index}`}
      aria-labelledby={`giistCreation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `giistCreation-tab-${index}`,
    'aria-controls': `giistCreation-tabpanel-${index}`,
  };
}

const tabsStyling = {
  parentBox: {
    // display: 'flex',
    // width: '100% !important',
    // aspectRatio: '16/9',
    borderRadius: '10px !important',
    position: 'relative',
    overflow: 'hidden',
  },
  tabsTagWrapper: {
    background: '#FFFFFF',
    padding: '0px',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    border: '1px solid rgba(53, 52, 82, 0.2)',
    width: '100%',
    height: '400px !important',
  },
  tabStyleActive: {
    background: COLORS.mainColor,
    width: '100%',
    color: '#FFFFFF !important',
    height: '100px',
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
    '&:hover': {
      textShadow: 'none',
    },
  },
  tabStyleInActive: {
    background: '#FFFFFF',
    width: '100%',
    color: 'COLORS.mainColor',
    height: '100px',
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
    '&:hover': {
      textShadow: 'none',
    },
  },
};

const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00';
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const Chapters = (props) => {
  const {
    setChapters,
    chapters,
    chapterInput,
    chaptersCreateRes,
    setIsWebcamActive,
    setIsAudioRecActive,
    S3_BUCKET,
    REGION,
    AccessKeyId,
    SecretAccessKey,
    platformData,
    giistChapCreate,
    giistChapEdit,
    giistSubChapCreate,
    giistSubchapEdit,
    setGiistChapterId,
    giistChapterId,
    giistChapMediaCreate,
    openSuccessmediaupload,
    handleMediaUploadModalClose,
    setCastedBlobData,
    activeSubChap,
    setActiveSubChap,
    setIndexForMedia,
    indexForMedia,
    subindexForMedia,
    setSubindexForMedia,
    setTutorialMediaType,
    tutorialMediaType,
    detailCreationRes,
    quizShow,
    setquizShow,
    handleSelectQuiz,
    openNotificationModal,
    handleNotificationModalClose,
    giistSubChapMediaCreate,
    chapterIdSingle,
    setChaptersCreateRes,
    subChapterResObj,
    handleEditQuiz,
    loginData,
    setChapterAddloading,
    chapterAddloading,
    setDotProgressLoading,
    DotProgressLoading,
    setMediaType,
    setChapterSingleData,
    chapterSingleData,
    setQuizTypeDefine,
    handleDeleteQuiz,
    awsLink,
    setDimensions,
  } = props;
  const VideoParentFrame = useMediaQuery('(min-width:1024px) and (min-width: 768px)');
  const { tabsTagWrapper, tabStyleActive, tabStyleInActive } = tabsStyling;
  const [giistTabValue, setGiistTabValue] = useState(0);
  const [setduration, setSetduration] = useState('');
  const [playing2, setPlaying2] = useState(true);
  const [successErrorMessage, setSuccessErrorMessage] = useState({
    heading: '',
    message: '',
    buttonText: '',
    image: '',
  });

  const dispatch = useDispatch();

  const changeTabValueHandler = (event, newValue) => {
    setGiistTabValue(newValue);
  };
  const [showActionBar, setShowActionBar] = useState(false);

  // casting
  const { screenRecording } = useSelector((state) => state.screen_recording);
  const [time, setTime] = useState('');
  const [screenModalOpen, setScreenModalOpen] = useState(false);
  const [screenBlobUrl, setScreenBlobUrl] = useState('');
  const [startRecording, setStartRecording] = useState(false);
  const [isScreenRecordingModalOpen, setIsScreenRecordingModalOpen] = useState(false);

  const [backModal, setBackModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [vid, setVid] = useState();

  const [quizDeleteModal, setQuizDeleteModal] = useState(false);

  const handleOpenDeleteModal = (id) => setQuizDeleteModal(true);
  const handleCloseDeleteModal = () => setQuizDeleteModal(false);

  const [mediadeleteAlert, setMediadeleteAlert] = useState(false);

  const handleOpenmediadeleteAlertModal = () => setMediadeleteAlert(true);
  const handleClosemediadeleteAlertModal = () => setMediadeleteAlert(false);

  // recording replay modal for screen
  const playerRef = useRef(null);

  const [state, setState] = useState({
    playing: true,
    muted: true,
    played: 0,
    seeking: false,
  });
  const { playing, muted, played, seeking } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };
  const handleProgress = (changeState) => {
    if (!state.seeking) {
      console.log(changeState, 'changeState');
      setState({
        ...state,
        played: parseFloat(changeState.playedSeconds / duration),
      });
    }
  };
  const handleSeekChange = (e, newValue) => {
    console.log(newValue, 'newValue');
    setState({ ...state, played: parseFloat(newValue / 1000) });
    if (newValue == '1000') {
      handlePlayPause();
    }
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 1000);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';

  const duration = playerRef.current ? time : '00:00';

  const totalDuration = format(duration);

  const elapsedTime = format(currentTime);

  const handleCheckMediaOrQuiz = () => {
    if (chapterIdSingle?.subChapters.length > 0) {
      let selecSubChapter = chapterIdSingle?.subChapters[subindexForMedia];
      selecSubChapter?.quiz?.questions.map((question) => {
        switch (question.question_type) {
          case 1:
            question.question_type = 'Multiple Answers';
            break;
          case 2:
            question.question_type = 'One Answer';
            break;
          case 3:
            question.question_type = 'True / False';
            break;
          case 5:
            question.question_type = 'Paragraph';
            break;
        }
      });
      setChapterSingleData(selecSubChapter);
    } else {
      chapterIdSingle?.quiz?.questions.map((question) => {
        switch (question.question_type) {
          case 1:
            question.question_type = 'Multiple Answers';
            break;
          case 2:
            question.question_type = 'One Answer';
            break;
          case 3:
            question.question_type = 'True / False';
            break;
          case 5:
            question.question_type = 'Paragraph';
            break;
        }
      });
      setChapterSingleData(chapterIdSingle);
    }
  };

  useEffect(() => {
    handleCheckMediaOrQuiz();
  }, [chaptersCreateRes?.data, indexForMedia, subindexForMedia, chapterIdSingle?.chapter_id]);

  const delMediaHandler = async () => {
    setDotProgressLoading(true);
    let file_name = '';
    let chaptId = chaptersCreateRes?.data?.chapters[indexForMedia]?.chapter_id;
    let subchapId = chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters[subindexForMedia]?.chapter_id;

    let tutorialMediaObj = chaptersCreateRes?.data?.chapters[indexForMedia]?.tutorialMedia;
    let subTutorialMediaObj =
      chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters[subindexForMedia]?.tutorialMedia;

    let dataRes = tutorialMediaObj?.type;
    let subDataRes = subTutorialMediaObj?.type;

    let mediaTitle = tutorialMediaObj?.title;
    let subMediaTitle = subTutorialMediaObj?.title;
    console.log(chaptId, subchapId, 'this is chapter id');
    try {
      if (dataRes == 0) {
        file_name = `giists/video/${mediaTitle}`;
      } else if (dataRes == 2) {
        file_name = `giists/audio/${mediaTitle}`;
      } else if (dataRes == 1) {
        file_name = `giists/documents/${mediaTitle}`;
      } else if (subDataRes == 0) {
        file_name = `giists/video/${subMediaTitle}`;
      } else if (subDataRes == 1) {
        file_name = `giists/audio/${subMediaTitle}`;
      } else if (subDataRes == 2) {
        file_name = `giists/documents/${subMediaTitle}`;
      } else {
        file_name = '';
      }

      if ((tutorialMediaObj || subTutorialMediaObj) && !file_name == '') {
        await DeleteS3Media([file_name]);
        let data = {
          chapter_media_id: subTutorialMediaObj?.id ? subTutorialMediaObj?.id : tutorialMediaObj?.id,
          giist_id: chaptersCreateRes?.data?.id,
          chapter_id: subchapId ? subchapId : chaptId,
        };
        console.log(data, 'data deletion form db');
        await dispatch(DeleteGiistChapMedia(data, onchapmediadelSuccess, onchapmediadelError));
      } else {
        setDotProgressLoading(false);
        handleModal({
          heading: 'Something Wrong',
          message: `Oops, File name should not be empty`,
          buttonText: 'Try Again',
          image: '/assets/icons/danger.svg',
        });
      }
      console.log(tutorialMediaObj, 'tutorialMediaObj deleteion');
    } catch (e) {
      const messge = e.message;
      setDotProgressLoading(false);
      handleModal({
        heading: 'Something Wrong',
        message: `Oops, ${messge} data from server`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
      });
    }
  };

  const onchapmediadelSuccess = (res) => {
    setChaptersCreateRes(res);
    setDotProgressLoading(false);
    handleModal({
      heading: 'Media Removed Successfully',
      message: `You are now able to edit this chapter`,
      buttonText: 'Okay',
      image: '/assets/icons/new/checkedtick.svg',
    });

    console.log(res, 'deleting response');
  };
  const onchapmediadelError = (err) => {
    const message = err.message;
    setDotProgressLoading(false);
    handleModal({
      heading: 'Something Wrong',
      message: `Oops, ${message}`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
    });
    console.log(message, 'deleting response error');
  };

  const handleModal = ({ heading, message, buttonText, image }) => {
    console.log(heading, message, buttonText, image, 'heading, message, buttonText, image');
    setSuccessErrorMessage({
      heading: heading,
      message: message,
      buttonText: buttonText,
      image: image,
    });
    handleOpenmediadeleteAlertModal();
    console.log('modal opening funtion');
    return;
  };

  return (
    <div className="col-12">
      <div className={`row pt-5 `}>
        <div className={`col-lg-4 col-md-12 col-sm-12 col-xs-12  `}>
          <AddChapter
            channgeInputToTxt={props.channgeInputToTxt}
            setChanngeInputToTxt={props.setChanngeInputToTxt}
            soloInput={props.soloInput}
            setSoloInput={props.setSoloInput}
            setChapters={setChapters}
            chapters={chapters}
            chaptersCreateRes={chaptersCreateRes}
            giistChapCreate={giistChapCreate}
            giistChapEdit={giistChapEdit}
            giistSubChapCreate={giistSubChapCreate}
            giistSubchapEdit={giistSubchapEdit}
            setGiistChapterId={setGiistChapterId}
            activeSubChap={activeSubChap}
            setActiveSubChap={setActiveSubChap}
            setIndexForMedia={setIndexForMedia}
            indexForMedia={indexForMedia}
            subindexForMedia={subindexForMedia}
            setSubindexForMedia={setSubindexForMedia}
            detailCreationRes={detailCreationRes}
            openNotificationModal={openNotificationModal}
            handleNotificationModalClose={handleNotificationModalClose}
            setChaptersCreateRes={setChaptersCreateRes}
            chapterAddloading={chapterAddloading}
            setChapterAddloading={setChapterAddloading}
            DotProgressLoading={DotProgressLoading}
            setDotProgressLoading={setDotProgressLoading}
            handleModal={handleModal}
          />
        </div>
        <div
          // className={`col-lg-8 col-md-12 col-sm-12 col-xs-12 ${classes.fullWidthVideo}`}
          className={`col-lg-8 col-md-12 col-sm-12 col-xs-12 `}
          // this styling is applied to make tabs disable in case of no chapter
          style={{
            borderRadius: '10px !important',
            overflow: 'hidden',
            // minHeight: '378px',
            pointerEvents: !chaptersCreateRes?.data?.chapters[indexForMedia]?.title ? 'none' : '',
            opacity: !chaptersCreateRes?.data?.chapters[indexForMedia]?.title || chapterAddloading ? '0.3' : '',
          }}
        >
          {chapterSingleData?.quiz != null ||
          chaptersCreateRes?.data?.chapters[indexForMedia]?.tutorialMedia != null ||
          chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters[subindexForMedia]?.tutorialMedia != null ? (
            <>
              {chapterSingleData?.quiz != null ? (
                <PreviewGiist
                  chapterSingleData={chapterSingleData}
                  awsLink={awsLink}
                  platformData={platformData}
                  setChapterSingleData={setChapterSingleData}
                  setquizShow={setquizShow}
                  setQuizTypeDefine={setQuizTypeDefine}
                  handleDeleteQuiz={handleDeleteQuiz}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                />
              ) : (
                <div
                  // container
                  style={{
                    background: 'linear-gradient(180deg, #F6F2F1,#F6F2F1, #ddd4d4,rgb(59 64 84))',
                    diplay: 'flex',
                    justifyContent: 'center',
                    aspectRatio: '16/9',
                    position: 'relative',
                    // height: '270px',
                    // width: '480px',
                    borderRadius: '10px',
                  }}
                >
                  <PrimaryMediaPlayer
                    platformData={platformData}
                    awsLink={awsLink}
                    link={chapterSingleData?.tutorialMedia?.title}
                    time={chapterSingleData?.tutorialMedia?.duration}
                    type={chapterSingleData?.tutorialMedia?.type}
                    thumbnail={chapterSingleData?.tutorialMedia?.thumbnail}
                    mediaLibraryId={chapterSingleData?.tutorialMedia?.libraries_media_id}
                    playing={playing2}
                    setPlaying={setPlaying2}
                    delMediaHandler={delMediaHandler}
                  />
                </div>
              )}
            </>
          ) : (
            <Grid container spacing={2}>
              <Grid item lg={2} md={2} sm={2} xs={3} sx={{ overflowY: 'scroll' }}>
                <Tabs
                  orientation="vertical"
                  value={giistTabValue}
                  onChange={changeTabValueHandler}
                  aria-label="Vertical giistsCreation tabs"
                  sx={tabsTagWrapper}
                  TabIndicatorProps={{ style: { background: 'transparent' } }}
                >
                  <Tab
                    // onClick={() => setMediaType(1)}
                    label="Video"
                    {...a11yProps(0)}
                    icon={
                      <Image
                        src={
                          giistTabValue == 0 ? '/assets/images/white-cam-icon.svg' : '/assets/images/black-cam-icon.svg'
                        }
                        height={25}
                        width={25}
                        alt={giistTabValue == 0 ? 'white cam' : 'black cam'}
                      />
                    }
                    sx={giistTabValue == 0 ? tabStyleActive : tabStyleInActive}
                    disableRipple
                    disableFocusRipple
                  />
                  <Tab
                    // onClick={() => setMediaType(5)}
                    label="Audio"
                    {...a11yProps(1)}
                    icon={
                      <Image
                        src={
                          giistTabValue == 1
                            ? '/assets/images/white-audio_icon.svg'
                            : '/assets/images/black-aud-icon.svg'
                        }
                        height={25}
                        width={25}
                        alt={giistTabValue == 1 ? 'white cam' : 'black cam'}
                      />
                    }
                    sx={giistTabValue == 1 ? tabStyleActive : tabStyleInActive}
                    disableRipple
                    disableFocusRipple
                  />
                  <Tab
                    onClick={() => {
                      // setMediaType(2);
                      setTutorialMediaType(1);
                    }}
                    label="Document"
                    {...a11yProps(2)}
                    icon={
                      <Image
                        src={
                          giistTabValue == 2
                            ? '/assets/images/white-document_icon.svg'
                            : '/assets/images/black-document-icon.svg'
                        }
                        height={25}
                        width={25}
                        alt={giistTabValue == 2 ? 'white doc' : 'black doc'}
                      />
                    }
                    sx={giistTabValue == 2 ? tabStyleActive : tabStyleInActive}
                    disableRipple
                    disableFocusRipple
                  />
                  <Tab
                    onClick={() => setMediaType(4)}
                    label="Quiz"
                    {...a11yProps(3)}
                    icon={
                      <Image
                        src={
                          giistTabValue == 3
                            ? '/assets/images/white-quiz_icon.svg'
                            : '/assets/images/black-quiz-icon.svg'
                        }
                        height={25}
                        width={25}
                        alt={giistTabValue == 3 ? 'white cam' : 'black cam'}
                      />
                    }
                    sx={giistTabValue == 3 ? tabStyleActive : tabStyleInActive}
                    disableRipple
                    disableFocusRipple
                  />
                </Tabs>
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                sm={10}
                xs={9}
                sx={{
                  maxHeight: '400px',
                  mt: 2,
                  border: '1px solid rgba(53, 52, 82, 0.2)',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
              >
                <TabPanel value={giistTabValue} index={0}>
                  <ChaptersTab
                    chaptersCreateRes={chaptersCreateRes}
                    index="0"
                    setIsWebcamActive={setIsWebcamActive}
                    setIsScreenRecordingModalOpen={setIsScreenRecordingModalOpen}
                    giistChapMediaCreate={giistChapMediaCreate}
                    indexForMedia={indexForMedia}
                    subindexForMedia={subindexForMedia}
                    chapters={chapters}
                    awsLink={awsLink}
                    setTutorialMediaType={setTutorialMediaType}
                    giistSubChapMediaCreate={giistSubChapMediaCreate}
                    setMediaType={setMediaType}
                    S3_BUCKET={S3_BUCKET}
                    REGION={REGION}
                    AccessKeyId={AccessKeyId}
                    SecretAccessKey={SecretAccessKey}
                    setDotProgressLoading={setDotProgressLoading}
                    DotProgressLoading={DotProgressLoading}
                    loginData={loginData}
                    platformData={platformData}
                    setquizShow={setquizShow}
                    setDimensions={setDimensions}
                  />
                </TabPanel>
                <TabPanel value={giistTabValue} index={1}>
                  <ChaptersTab
                    chaptersCreateRes={chaptersCreateRes}
                    index="1"
                    chapters={chapters}
                    indexForMedia={indexForMedia}
                    subindexForMedia={subindexForMedia}
                    setIsAudioRecActive={setIsAudioRecActive}
                    setTutorialMediaType={setTutorialMediaType}
                    giistSubChapMediaCreate={giistSubChapMediaCreate}
                    setMediaType={setMediaType}
                    S3_BUCKET={S3_BUCKET}
                    REGION={REGION}
                    AccessKeyId={AccessKeyId}
                    SecretAccessKey={SecretAccessKey}
                    setDotProgressLoading={setDotProgressLoading}
                    DotProgressLoading={DotProgressLoading}
                    loginData={loginData}
                    giistChapMediaCreate={giistChapMediaCreate}
                    platformData={platformData}
                    awsLink={awsLink}
                    setquizShow={setquizShow}
                  />
                </TabPanel>
                <TabPanel value={giistTabValue} index={2}>
                  <ChaptersTab
                    chaptersCreateRes={chaptersCreateRes}
                    index="2"
                    chapters={chapters}
                    indexForMedia={indexForMedia}
                    subindexForMedia={subindexForMedia}
                    S3_BUCKET={S3_BUCKET}
                    REGION={REGION}
                    AccessKeyId={AccessKeyId}
                    SecretAccessKey={SecretAccessKey}
                    setTutorialMediaType={setTutorialMediaType}
                    tutorialMediaType={tutorialMediaType}
                    giistChapMediaCreate={giistChapMediaCreate}
                    giistSubChapMediaCreate={giistSubChapMediaCreate}
                    setMediaType={setMediaType}
                    setDotProgressLoading={setDotProgressLoading}
                    DotProgressLoading={DotProgressLoading}
                    loginData={loginData}
                    platformData={platformData}
                    awsLink={awsLink}
                    setquizShow={setquizShow}
                  />
                </TabPanel>
                <TabPanel value={giistTabValue} index={3}>
                  <ChaptersTab
                    index="3"
                    quizShow={quizShow}
                    setquizShow={setquizShow}
                    chapters={chapters}
                    indexForMedia={indexForMedia}
                    handleSelectQuiz={handleSelectQuiz}
                    subindexForMedia={subindexForMedia}
                    chapterIdSingle={chapterIdSingle}
                    chaptersCreateRes={chaptersCreateRes}
                    subChapterResObj={subChapterResObj}
                    handleEditQuiz={handleEditQuiz}
                    loginData={loginData}
                    setChaptersCreateRes={setChaptersCreateRes}
                    setMediaType={setMediaType}
                    awsLink={awsLink}
                  />
                </TabPanel>
              </Grid>
            </Grid>
          )}

          {showActionBar == true && (
            <Box
              sx={{
                height: '64px',
                border: '1px solid black',
                width: '300px',
                position: 'absolute',
                right: '0',
                marginRight: '20px',
                bottom: 0,
                marginBottom: '20px',
                background: 'rgba(48, 53, 72, 0.7)',
                borderRadius: '10px',
                color: '#FFFFFF !important',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Image src="/assets/images/crop.svg" height="26" width="26" alt="crop" />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Image
                  src="/assets/images/record-icon.svg"
                  height="26"
                  width="26"
                  alt="crop"
                  onClick={() => setShowActionBar(false)}
                />
                <Typography component={'span'} sx={{ px: 1, color: '#FFFFFF !important' }}>
                  00:02:00
                </Typography>
              </Box>
              <Image src="/assets/images/maximize-icon.svg" height="26" width="26" alt="crop" />
            </Box>
          )}
          {(startRecording == true || screenRecording == 'true' || isScreenRecordingModalOpen == true) && (
            <ScreenRecording
              giistRec="giist_rec"
              setTime={setTime}
              setScreenBlobUrl={setScreenBlobUrl}
              screenModalOpen={screenModalOpen}
              setScreenModalOpen={setScreenModalOpen}
              startRecording={startRecording}
              setStartRecording={setStartRecording}
              modalOpen={isScreenRecordingModalOpen}
              handleModalClose={() => setIsScreenRecordingModalOpen(false)}
              image={<Image src="/assets/images/screencast-modal.svg" height={70} width={70} alt="trash" />}
              title={'Record your screen'}
              description={'After clicking on “Start Recording”, your screen recording will be started'}
              button1={'Start Recording'}
              setSetduration={setSetduration}
              chaptersCreateRes={chaptersCreateRes}
            />
          )}
          {screenModalOpen == true && (
            <ReplayRecModal
              giistRec="giist_rec"
              giistSubChapMediaCreate={giistSubChapMediaCreate}
              screenModalOpen={screenModalOpen}
              screenBlobUrl={screenBlobUrl}
              time={time}
              setScreenModalOpen={setScreenModalOpen}
              setBackModal={setBackModal}
              backModal={backModal}
              setDeleteModal={setDeleteModal}
              deleteModal={deleteModal}
              setVid={setVid}
              playerRef={playerRef}
              state={state}
              setState={setState}
              playing={playing}
              muted={muted}
              played={played}
              seeking={seeking}
              handlePlayPause={handlePlayPause}
              handleProgress={handleProgress}
              handleSeekChange={handleSeekChange}
              handleSeekMouseDown={handleSeekMouseDown}
              handleSeekMouseUp={handleSeekMouseUp}
              handleMute={handleMute}
              handleRewind={handleRewind}
              handleFastForward={handleFastForward}
              totalDuration={totalDuration}
              elapsedTime={elapsedTime}
              S3_BUCKET={S3_BUCKET}
              REGION={REGION}
              AccessKeyId={AccessKeyId}
              SecretAccessKey={SecretAccessKey}
              platformData={platformData}
              awsLink={awsLink}
              giistChapMediaCreate={giistChapMediaCreate}
              giistChapterId={giistChapterId}
              setCastedBlobData={setCastedBlobData}
              indexForMedia={indexForMedia}
              subindexForMedia={subindexForMedia}
              setDotProgressLoading={setDotProgressLoading}
              DotProgressLoading={DotProgressLoading}
              duration={setduration}
              chaptersCreateRes={chaptersCreateRes}
            />
          )}
          {/* </Box> */}
        </div>
      </div>
      {chaptersCreateRes?.status == true && (
        <SuccessErrorModal
          open={openSuccessmediaupload}
          handleCloseMediaplay={handleMediaUploadModalClose}
          chaptersCreateRes={chaptersCreateRes?.status}
        />
      )}
      <DummyDeleteModal
        openModal={quizDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        image={'/assets/images/trash.svg'}
        heading="Remove Quiz"
        text="Are you sure you want to remove this Quiz?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => handleDeleteQuiz(chapterSingleData?.quiz?.quiz_id)}
      />
      <SuccessModal
        modalOpen={mediadeleteAlert}
        image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
        title={successErrorMessage.heading}
        description={successErrorMessage.message}
        button1={successErrorMessage.buttonText}
        handleModalClose={handleClosemediadeleteAlertModal}
      />
    </div>
  );
};

export default Chapters;
