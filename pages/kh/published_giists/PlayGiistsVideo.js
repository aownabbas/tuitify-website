import { useState, useRef, useEffect } from 'react';
import classes from '../../../components/kh_components/mygiists/PlayGiistsVideo.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import WestIcon from '@mui/icons-material/West';
import { useDispatch } from 'react-redux';
import Kh_playGiistsAction from '../../../redux/actions/Kh_playGiistsAction';
import { withRouter } from 'next/router';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteModal from '../../../components/modals/deletemodal/DeleteModal';
import Kh_FavouriteGiistAction from '../../../redux/actions/Kh_FavouriteGiistAction';
import { URL } from '../../../public/assets/path/path';
import { useRouter } from 'next/router';
import Interaction from '../../../components/kh_components/giist_play_components/interaction/Interaction';
import { Tooltip } from '@material-ui/core';
import SkeletonLoader from '../../../components/kh_components/kh_home/SkeletonLoader';
import RejectModal from '../../../components/modals/rejectModal/RejectModal';
import Kh_RejectGiistAction from '../../../redux/actions/Kh_RejectGiistAction';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';
import PrimaryMediaPlayer from '../../../components/combine/mediaPlayer/PrimaryMediaPlayer';
import QuizPlay from '../../../components/kh_components/mygiists/QuizPlay';
import Kh_UnpublishGiist from '../../../redux/actions/Kh_UnpublishGiist';
import DummyDeleteModal from '../../../components/modals/deletemodal/DummyDeleteModal';
import DotProgress from '../../../components/DotProgress';
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';
import RatingModal from '../../../components/modals/ratingmodal/RatingModal';
import RatingsAction from '../../../redux/actions/RatingsAction';
import CmeModal from '../../../components/modals/cmemodal/CmeModal';

const PlayGiistsVideo = (props) => {
  const dispatch = useDispatch();
  const [playGiists, setPlayGiists] = useState(null);
  const [accessToken, setAccessToken] = useState();
  const [chapterId, setChapterId] = useState();
  const [time, setTime] = useState('0.00');
  const [getPlatData, setGetPlatData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [mediaType, setMediaType] = useState('');
  const [user_id, setUser_id] = useState('');
  const [tutorialMediaTypeset, setTutorialMediasMediaTypeSet] = useState(1);
  const [quizId, setQuizId] = useState('');
  var [quizType, setquizType] = useState(null);
  const [reportGiist, setReportGiist] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const handleReportGiistModalOpen = () => setReportGiist(true);
  const handleReportGiistModalClose = () => setReportGiist(false);
  const [stateButton, setStateButton] = useState(true);
  const [chapIndex, setChapIndex] = useState(0);
  const [subChapIndex, setSubChapIndex] = useState(null);
  const [dotloading, setDotloading] = useState(false);
  const [chapterLink, setChapterLink] = useState('');
  const [title, setTitle] = useState();

  const [reported, setReported] = useState(0);

  const [reportModal, setReportModal] = useState(false);

  const handleOpenSuccessModal = () => setReportModal(true);
  const handleCloseSuccessModal = () => setReportModal(false);
  var VidId = props.router.query.id;
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [cmelink, setCmelink] = useState('');
  const [cmepoints, setCmepoints] = useState(null);

  useEffect(() => {
    try {
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      setGetPlatData(GetPlatData);
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      setLoginData(LoginData);
      const { id } = LoginData;
      setUser_id(id);
      const { access_token } = LoginData;
      setAccessToken(access_token);
      if (VidId) {
        const params = `u_id=${id}&platform_id=${GetPlatData.platform_id}&id=${VidId}`;
        dispatch(Kh_playGiistsAction(params, access_token, onPlayGiistsSuccess, onPlayGiistsError));
      }
    } catch (err) {
      console.log(err);
    }
  }, [VidId]);
  console.log(cmelink, 'cme link');
  const onPlayGiistsSuccess = async (res) => {
    setCmelink(res.tuity[0]?.type?.cme_link);
    setCmepoints(res?.tuity[0]?.type?.cme_points);
    let resposi = res;
    let modifiedChapters = resposi?.chapters.map((chapter) => {
      if (chapter.subchapter.length != 0) {
        return { ...chapter, openSub: true }; // Add the 'openSub' property with an initial value of false
      }
      return { ...chapter };
    });
    resposi.chapters = modifiedChapters; // Assign the modified array back to the original array

    setPlayGiists(resposi);
    setRatingsMessage(res.tuity[0].ratingMessage);
    if (res.chapters[0].subchapter.length) {
      setPlaying(true);
      setChapIndex(0);
      setSubChapIndex(0);
      setquizType(res.chapters[0].subchapter[0]?.quiz_type);
      setChapterLink(res.chapters[0].subchapter[0].link);
      setChapterId(res.chapters[0].subchapter[0].id);
      setTitle(res.chapters[0].subchapter[0].chap_title);
      setMediaType(res.chapters[0].subchapter[0].media_type);
      setTime(res.chapters[0].subchapter[0]?.duration);
      setTutorialMediasMediaTypeSet(res.chapters[0].subchapter[0]?.tutorial_medias_media_type);
      setQuizId(res.chapters[0].subchapter[0]?.quiz_id);
    } else {
      setquizType(res.chapters[0]?.quiz_type);
      setChapIndex(0);
      setSubChapIndex(null);
      setChapterId(res.chapters[0].id);
      setTitle(res.chapters[0].chap_title);
      setChapterLink(res.chapters[0].link);
      setPlaying(true);
      setMediaType(res.chapters[0].media_type);
      setTime(res.chapters[0]?.duration);
      setTutorialMediasMediaTypeSet(res.chapters[0]?.tutorial_medias_media_type);
      setQuizId(res.chapters[0]?.quiz_id);
    }
  };
  const onPlayGiistsError = (err) => {
    console.log(err, 'err');
  };

  const handleAccordian = (
    chap_title,
    link,
    id,
    media_type,
    duration,
    tutorial_medias_media_type,
    quiz_type,
    quiz_id,
  ) => {
    handleNextChap(id);
    setChapterLink(link);
    setPlaying(true);
    setTitle(chap_title);
    setChapterId(id);
    setMediaType(media_type);
    setTime(duration);
    setTutorialMediasMediaTypeSet(tutorial_medias_media_type);
    setquizType(quiz_type);
    setQuizId(quiz_id);
    setStateButton(true);
  };

  // Like and disLike Giist
  const [like, setLike] = useState(false);
  const favparams = `giist_id=${VidId}`;
  const likeGiist = () => {
    dispatch(Kh_FavouriteGiistAction(favparams, accessToken, favouriteGiistSuccess, favouriteGiistError));
    setLike(true);
  };

  const dislikeGiist = () => {
    dispatch(Kh_FavouriteGiistAction(favparams, accessToken, favouriteGiistSuccess, favouriteGiistError));
    setLike(false);
  };
  const favouriteGiistSuccess = (res) => {
    console.log(res, 'favourite');
  };
  const favouriteGiistError = (err) => {
    console.log(err);
  };
  // this state set atuo play Giist
  const [playMedia, setPlayMedia] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(null);

  async function handleNextChap(chapterId) {
    await GlobalApiCall(
      `${URL.khbaseUrl}next_chap?t_id=${VidId}&c_id=${chapterId}&u_id=${user_id}&platform_id=${getPlatData?.platform_id}`,
      'get',
      {},
      async (response) => {
        if (response.data.completion > 60 && cmelink && cmepoints && response?.data?.is_pass == 0) {
          console.log('cheking cme 1');
          handleCMEOpen();
        }
      },
      (err) => {
        console.log(err, 'error');
      },
    );
  }

  const handlePlayGiists = async () => {
    await GlobalApiCall(
      `${URL.khbaseUrl}next_chap?t_id=${VidId}&c_id=${chapterId}&u_id=${user_id}&platform_id=${getPlatData?.platform_id}`,
      'get',
      {},
      async (response) => {
        if (response.data.completion > 60 && cmelink && cmepoints && response?.data?.is_pass == 0) {
          console.log('cheking cme 2');
          handleCMEOpen();
        }
        if (response.data.next.length == 0) {
          await router.push('/kh/KnowledgeHome');
          setDotloading(false);
          return;
        }
        handleNextChap(response.data.next[0]?.id);
        setStateButton(true);
        setPlaying(true);
        setQuizId(response.data.next[0].quiz_id);
        setProgress(response.data.completion);
        setChapterLink(response.data.next[0].link);
        setChapterId(response.data.next[0].id);
        setTitle(response.data.next[0].chap_title);
        setMediaType(response.data.next[0].media_type);
        setTime(response.data.next[0].duration);
        setTutorialMediasMediaTypeSet(response.data.next[0].tutorial_medias_media_type);
        setquizType(response.data.next[0].quiz_type);
        const { chapterIndex, subChapterIndex } = findChapterAndSubChapterIndex(response.data.next[0].id);
        if (subChapterIndex == -1) {
          setChapIndex(chapterIndex);
          setSubChapIndex(null);
        } else {
          setChapIndex(chapterIndex);
          setSubChapIndex(subChapterIndex);
        }
      },
      (err) => {
        console.log(err, 'error');
      },
    );
  };

  const handleClick2 = (chapterId) => {
    setPlayGiists((prevState) => {
      return {
        ...prevState,
        chapters: prevState.chapters.map((chapter) => {
          if (chapter.id === chapterId) {
            return {
              ...chapter,
              openSub: !chapter.openSub, // Toggle the 'openSub' property
            };
          }
          return chapter;
        }),
      };
    });
  };

  function findChapterAndSubChapterIndex(chapterId) {
    let chapterIndex = -1;
    let subChapterIndex = -1;

    // Loop through the chapters in the playGiists object
    for (let i = 0; i < playGiists.chapters.length; i++) {
      // Check if chapterId matches
      if (playGiists.chapters[i].id == chapterId) {
        chapterIndex = i;
        break;
      }

      // Check if subchapters exist
      if (playGiists.chapters[i].subchapter) {
        // Loop through the subchapters in the current chapter
        for (let j = 0; j < playGiists.chapters[i].subchapter.length; j++) {
          // Check if chapterId matches
          if (playGiists.chapters[i].subchapter[j].id == chapterId) {
            chapterIndex = i;
            subChapterIndex = j;
            break;
          }
        }
      }
    }

    return { chapterIndex, subChapterIndex };
  }

  // it seleced the sub chapter
  const playSubChapter = (
    chap_title,
    id,
    link,
    media_type,
    duration,
    tutorial_medias_media_type,
    quiz_type,
    quiz_id,
  ) => {
    handleNextChap(id);
    setChapterLink(link);
    setPlaying(true);
    setChapterId(id);
    setTitle(chap_title);
    setMediaType(media_type);
    setTime(duration);
    setTutorialMediasMediaTypeSet(tutorial_medias_media_type);
    setquizType(quiz_type);
    setQuizId(quiz_id);
    setStateButton(true);
  };
  const router = useRouter();

  const listInnerRef = useRef();

  const handleCountryFlag = async () => {
    if (!reportMessage) {
      return;
    }
    handleReportGiistModalClose();
    setDotloading(true);
    await GlobalApiCall(
      `${URL.khbaseUrl}reportGiist?id=${VidId}&comment=${reportMessage}`,
      'get',
      {},
      (res) => {
        setDotloading(false);
        handleOpenSuccessModal();
        playGiists.tuity[0].reported = 1;
      },
      (err) => {
        console.log(err, 'err');
        setDotloading(false);
        handleOpenSuccessModal();
      },
    );
    setReportMessage('');
  };

  const [deleteModal, setDeleteModal] = useState({
    deleteImage: '/assets/images/trash.svg',
    publishImage: '/assets/icons/publishGiist.png',
    heading: 'Delete this Giist?',
    publishHeading: 'Publish this Giist?',
    publishtext: 'This action will make this Giist available to its recipients',
    text: 'Are you sure about deleting this Giist?',
    rejectModal: '',
    openPublishModal: '',
    goLiveModal: '',
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [openmodal, setOpenmodal] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const rejectModalOpen = () => {
    setDeleteModal({ ...deleteModal, rejectModal: true });
    setAnchorEl(null);
    setStatus(0);
  };
  const rejectModalClose = () => {
    setDeleteModal({ ...deleteModal, rejectModal: false });
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    setOpenmodal(true);
    setAnchorEl(null);
  };

  const GoLiveModalOpen = () => {
    setDeleteModal({ ...deleteModal, goLiveModal: true });
    setAnchorEl(null);
    setStatus(1);
  };
  const goLiveModalClose = () => {
    setDeleteModal({ ...deleteModal, goLiveModal: false });
    setAnchorEl(null);
  };
  const closeModal = () => {
    setOpenmodal(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [status, setStatus] = useState();
  const [reason, setReason] = useState();

  const confirmGiistRejection = () => {
    const paramsBody = {
      giist_id: VidId,
      status: status,
      rejection_reason: reason,
    };
    dispatch(Kh_RejectGiistAction(paramsBody, accessToken, onReviewGiistSuccess, onReviewGiistError));
  };
  const confirmGiistPublish = () => {
    dispatch(Kh_RejectGiistAction(VidId, status, reason, accessToken, onReviewGiistSuccess, onReviewGiistError));
  };

  const onReviewGiistSuccess = (res) => {
    console.log(res, 'ressddddddd');
  };

  const onReviewGiistError = (err) => {
    console.log(err, 'err');
  };
  const [ratings, setRatings] = useState('');
  const [ratingsMessage, setRatingsMessage] = useState('');

  const giistRatings = () => {
    setDotloading(true);
    const itmes = JSON.parse(localStorage.getItem('@LoginData'));
    var params = JSON.stringify({
      platform_id: itmes.platform_id,
      u_id: itmes.id,
      rating: ratings,
      t_id: VidId,
      message: ratingsMessage,
    });
    dispatch(RatingsAction(params, onRatingSuccess, onRatingError));
  };

  const onRatingSuccess = (res) => {
    var rateGiist = playGiists;
    rateGiist.tuity[0].avg_rating = ratings;
    rateGiist.tuity[0].myrating = ratings;
    rateGiist.tuity[0].message = ratingsMessage;
    setPlayGiists(rateGiist);
    setDotloading(false);
  };
  const onRatingError = (err) => {
    console.log(err, 'errorrs');
    setDotloading(false);
  };

  const handleEditGiist = async (id) => {
    await router.push({
      pathname: '/kh/GiistCreation',
      query: { mode: 'edit', id: id },
    });
    setDotloading(false);
  };

  const [UnPublishGiistOnEditModal, setUnPublishGiistOnEditModal] = useState(false);

  const UnPublishOpenModal = () => {
    setUnPublishGiistOnEditModal(true);
    handleClose();
  };
  const UnPublishColseModal = () => setUnPublishGiistOnEditModal(false);

  const UnPublishGiist = (id) => {
    setDotloading(true);
    UnPublishColseModal();
    dispatch(Kh_UnpublishGiist(id, accessToken, onUnPublishGiistSuccess, onUnPublishGiistError));
  };

  const onUnPublishGiistSuccess = async (res) => {
    if (res.status == true) {
      await handleEditGiist(VidId);
    }
  };

  const onUnPublishGiistError = (error) => {
    console.log(error);
    setDotloading(false);
  };

  // update value on front end side in chapsubchap Api
  function updateProperty(chapterPlayGiist, chapIndex, subChapIndex, property, value) {
    let chapterPlayList = chapterPlayGiist;
    if (subChapIndex == null) {
      chapterPlayList.chapters[chapIndex][property] = value;
    } else {
      chapterPlayList.chapters[chapIndex].subchapter[subChapIndex][property] = value;
    }
    setPlayGiists(chapterPlayList);
  }

  console.log(progress, 'the progress of giist');

  const [cmeModalOpen, setCMEmodalOpen] = useState(false);
  const handleCMEOpen = () => {
    setCMEmodalOpen(true);
    setPlaying(false);
  };
  const handleCMECloseModal = () => setCMEmodalOpen(false);

  const [successmodalOpen, setSuccessmodalOpen] = useState(false);
  const handleOpen = () => setSuccessmodalOpen(true);
  const handleCloseModal = () => setSuccessmodalOpen(false);

  const handleCME = async () => {
    const cmeTypeValues = playGiists?.tuity[0]?.type;
    await GlobalApiCall(
      `${URL.khbaseUrl}cme_claim?user_id=${user_id}&tutorial_id=${VidId}&platform_id=${
        getPlatData?.platform_id
      }&is_pass=${cmeTypeValues?.is_pass == 0 && 1}&points=${cmeTypeValues?.cme_points}`,
      'post',
      {},
      async (response) => {
        console.log(response, 'the responses ');
      },
      (err) => {
        console.log(err, 'error');
      },
    );
  };

  const [rateModal, setRateModal] = useState(false);
  const [ratedModal, setRatedModal] = useState(false);

  console.log(cmeModalOpen, 'cmeModalOpen == true');

  return (
    <Layout heading="Knowledge Hub">
      {dotloading == true && <DotProgress />}
      {cmeModalOpen == true && (
        <CmeModal
          modalOpen={cmeModalOpen}
          handleModalClose={handleCMECloseModal}
          image={<Image src={'/assets/images/blue-circle-cup.svg'} width="102px" height="102px" alt="alert" />}
          title={'Congratulations!'}
          description={'You have completed more than 60% of this CME Training'}
          button1={'Claim Later'}
          button2={'Claim'}
          cmeLink={cmelink}
          handleOpen={handleOpen}
          setPlaying={setPlaying}
          // handleCME={handleCME}
        />
      )}

      <div
        className="w-100"
        ref={listInnerRef}
        style={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          maxWidth: '100%',
          height: '86vh',
        }}
      >
        {openmodal === true ? (
          <DeleteModal
            openModal={handleOpenModal}
            handleCloseModal={closeModal}
            image={deleteModal.deleteImage}
            heading={deleteModal.heading}
            text={deleteModal.text}
          />
        ) : (
          ''
        )}
        {deleteModal.goLiveModal === true ? (
          <DeleteModal
            openModal={GoLiveModalOpen}
            handleCloseModal={goLiveModalClose}
            image={deleteModal.publishImage}
            heading={deleteModal.publishHeading}
            text={deleteModal.publishtext}
            confirmGiistPublish={confirmGiistPublish}
          />
        ) : (
          ''
        )}
        {deleteModal.rejectModal === true ? (
          <RejectModal
            openModal={rejectModalOpen}
            handleCloseModal={rejectModalClose}
            image={deleteModal.publishImage}
            heading={deleteModal.heading}
            text={deleteModal.text}
            rejectGiist={confirmGiistRejection}
            setReason={setReason}
          />
        ) : (
          ''
        )}
        <div className="row pt-3">
          {playGiists ? (
            playGiists.tuity?.map((item) => (
              <div
                className={`col-lg-8 col-md-12 col-sm-12 col-xs-12 `}
                style={{ borderRadius: '10px', overflow: 'hidden !important' }}
              >
                <div className="d-flex ">
                  <Link
                    href={
                      router.query.path === 'ReviewGiist' ? '/kh/published_giists/PublishedGiists' : '/kh/KnowledgeHome'
                    }
                  >
                    <div>
                      <WestIcon sx={{ height: 24, width: 24 }} />
                    </div>
                  </Link>
                  <div className={`${classes.listTxt} ps-2 mt-1 ms-2`}>
                    <span>{item.title}</span>{' '}
                  </div>
                </div>
                <div
                  className="mt-3"
                  style={{
                    background: 'linear-gradient(180deg, #F6F2F1,#F6F2F1, #ddd4d4,rgb(59 64 84))',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    borderRaius: '10px !important',
                    aspectRatio: '16/9',
                  }}
                >
                  <>
                    {mediaType === 4 ? (
                      <div className={`col-12 ${classes.quizBox}`} style={{ position: 'relative' }}>
                        <QuizPlay
                          VidId={VidId}
                          chapterId={chapterId}
                          handlePlayGiists={handlePlayGiists}
                          quizId={quizId}
                          quizType={quizType}
                          playGiists={playGiists}
                          setPlayGiists={setPlayGiists}
                          stateButton={stateButton}
                          chapIndex={chapIndex}
                          subChapIndex={subChapIndex}
                          updateProperty={updateProperty}
                          setStateButton={setStateButton}
                          setDotloading={setDotloading}
                        />
                      </div>
                    ) : mediaType === 0 ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: '#787773',
                          borderRadius: '10px',
                        }}
                        onClick={() => handlePlayGiists()}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '3rem',
                            minWidth: '15vw',
                            color: '#FFFFFF',
                          }}
                        >
                          No media in this chapter
                        </div>
                      </div>
                    ) : (
                      <PrimaryMediaPlayer
                        link={chapterLink}
                        platformData={getPlatData}
                        type={tutorialMediaTypeset}
                        time={time}
                        playMedia={playMedia}
                        handlePlayGiists={() => handlePlayGiists()}
                        playing={playing}
                        setPlaying={setPlaying}
                        awsLink={awsLink}
                      />
                    )}
                  </>
                </div>
                <div className="row mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="bold">{title}</div>
                    <div className="">
                      <div className="d-flex align-items-center">
                        <div className="ps-2">
                          <Image src="/assets/icons/blackEye.png" alt="pause" width="22px" height="22px" />
                        </div>
                        <span className="ms-2 regular-small text-truncate pb-1">{item.viewsCount}</span>
                        {playGiists?.tuity[0].avg_rating == 0 ? (
                          <div className="ms-2">
                            <Image
                              src="/assets/icons/StarRated.svg"
                              alt="pause"
                              width="22px"
                              height="22px"
                              onClick={() => {
                                setRateModal(true);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="ms-2">
                            <Image
                              src="/assets/icons/StarRated.svg"
                              alt="pause"
                              width="22px"
                              height="22px"
                              onClick={() => {
                                setRatedModal(true);
                              }}
                            />
                          </div>
                        )}
                        {playGiists?.tuity[0].avg_rating == 0 ? (
                          <div
                            className={`${classes.beloVidTxt} ms-2 regular-small text-truncate pe-3 pb-1`}
                            onClick={() => {
                              setRateModal(true);
                            }}
                          >
                            {playGiists?.tuity[0].avg_rating == 0
                              ? 'Not rated yet'
                              : `${playGiists?.tuity[0].avg_rating} Ratings`}
                          </div>
                        ) : (
                          <div
                            className={`${classes.beloVidTxt} ms-2 regular-small text-truncate pe-3 pb-1`}
                            onClick={() => {
                              setRatedModal(true);
                            }}
                          >
                            {playGiists?.tuity[0].avg_rating == 0
                              ? 'Not rated yet'
                              : `${playGiists?.tuity[0].avg_rating} Ratings`}
                          </div>
                        )}
                        {item.reported == 1 ? (
                          <Tooltip className="text-danger" title="Already reported" placement="top">
                            <div className="ms-2 ">
                              <Image src="/assets/icons/reportFlag.svg" alt="flag" width="22px" height="22px" />
                            </div>
                          </Tooltip>
                        ) : (
                          <div className="ms-2">
                            <Image
                              src="/assets/icons/whiteFlag.png"
                              onClick={handleReportGiistModalOpen}
                              alt="flag"
                              width="22px"
                              height="22px"
                            />
                          </div>
                        )}

                        <RejectModal
                          openModal={reportGiist}
                          handleCloseModal={handleReportGiistModalClose}
                          reportGiist={true}
                          reportMessage={reportMessage}
                          setReportMessage={setReportMessage}
                          handleCountryFlag={handleCountryFlag}
                        />
                        <RatingModal
                          rateModal={rateModal}
                          setRateModal={setRateModal}
                          ratedModal={ratedModal}
                          setRatedModal={setRatedModal}
                          ratings={ratings}
                          setRatings={setRatings}
                          setRatingsMessage={setRatingsMessage}
                          ratingsMessage={ratingsMessage}
                          giistRatings={giistRatings}
                          myrating={playGiists?.tuity[0].myrating}
                        />
                        <div className="ms-2">
                          {like == false ? (
                            <Image
                              src="/assets/icons/whiteHeart.png"
                              width="22px"
                              height="22px"
                              alt="heart"
                              onClick={() => likeGiist()}
                            />
                          ) : (
                            <Image
                              src="/assets/icons/heart_icon_active.png"
                              alt="heart"
                              width="22px"
                              height="22px"
                              onClick={() => dislikeGiist()}
                            />
                          )}
                          {successmodalOpen == true && (
                            <CmeModal
                              modalOpen={successmodalOpen}
                              handleModalClose={handleCloseModal}
                              image={
                                <Image
                                  src={'/assets/images/2tick-circle-blue.svg'}
                                  width="81px"
                                  height="81px"
                                  alt="alert"
                                />
                              }
                              title={'Confirmation!'}
                              description={'Did you complete your CME questions correctly and got your certificate?'}
                              button1={'No'}
                              button2={'Yes'}
                              handleCME={handleCME}
                              setPlaying={setPlaying}
                            />
                          )}
                        </div>
                        {/* <div className="ms-2">
                          <Image src="/assets/icons/ic_share.png" alt="pause" width="24px" height="24px" />
                        </div> */}
                        {playGiists.tuity[0]?.id === user_id ? (
                          <>
                            <div className="ms-2 ps-3">
                              <Image
                                src="/assets/icons/dots.png"
                                alt="pause"
                                width="5px"
                                height="24px"
                                onClick={handleClick}
                              />
                            </div>
                            <div className="ms-2">
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                                  style: {
                                    width: '100px',
                                    background: '#353452',
                                    color: '#fff',
                                    border: '1px solid #353452 !important',
                                  },
                                }}
                              >
                                <MenuItem
                                  onClick={() => {
                                    UnPublishOpenModal();
                                  }}
                                >
                                  Edit
                                </MenuItem>
                              </Menu>
                            </div>
                          </>
                        ) : (
                          ''
                        )}
                      </div>

                      <DummyDeleteModal
                        openModal={UnPublishGiistOnEditModal}
                        handleCloseModal={UnPublishColseModal}
                        image="/assets/images/edit-3.svg"
                        heading="Unpublish Giist"
                        text="Are you sure, you want to edit this giist? By editing this giist will get unpublished"
                        unPublisher={true}
                        buttonText1="No"
                        buttonText2="Yes"
                        handleClick={() => UnPublishGiist(VidId)}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-2 align-items-center">
                  <div>
                    <Image
                      className="rounded-circle"
                      src={
                        playGiists.tuity[0]?.image !== null
                          ? `${awsLink}users/profileImages/${playGiists.tuity[0]?.image}`
                          : '/assets/images/noThumbnail.png'
                      }
                      alt="user"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="ms-2">
                    <div className="semibold-mid-small ">
                      {item.first_name}
                      <span className="semibold-mid-small"> {item.last_name}</span>
                    </div>
                    <div className="regular-xxsmall ">{moment(item.created).format('DD MMMM, YYYY')} </div>
                  </div>
                </div>
                <div className="small-bold mt-2">Description</div>
                <div className="row ">
                  <p>{item.description}</p>
                </div>
                <div className="row mt-4">
                  <hr style={{ borderTop: '2px solid grey' }} />
                </div>
                <Interaction
                  giist_id={props.router.query.id}
                  setPlaying={setPlaying}
                  // setInteractionsData={setInteractionsData}
                  // interactionsData={interactionsData}
                />
              </div>
            ))
          ) : (
            <div className={`col-lg-8 col-md-12 col-sm-12 col-xs-12  `}>
              <div>
                <SkeletonLoader height={15} borderRadius="15px" width="70%" />
              </div>
              <div className="mt-4">
                <SkeletonLoader height={450} borderRadius="15px" />
              </div>
              <div className="row mt-3">
                <div className="col-8">
                  <SkeletonLoader height={30} borderRadius="15px" />
                </div>
                <div className="col-4">
                  <div className="d-flex">
                    <div className="col-1 mt-1">
                      <SkeletonLoader height={20} borderRadius="50%" width="90%" />
                    </div>
                    <div className="col-2 ms-1 mt-2">
                      <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    </div>
                    <div className="col-1 mt-1">
                      <SkeletonLoader height={20} borderRadius="50%" width="90%" />
                    </div>
                    <div className="col-2 ms-1 mt-2">
                      <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    </div>
                    <div className="col-2">
                      <SkeletonLoader height={30} borderRadius="50%" width="70%" />
                    </div>
                    <div className="col-2">
                      <SkeletonLoader height={30} borderRadius="50%" width="70%" />
                    </div>
                    <div className="col-2">
                      <SkeletonLoader height={30} borderRadius="50%" width="70%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-1">
                  <SkeletonLoader height={45} borderRadius="50%" width="100%" />
                </div>
                <div className="col-2 mt-2">
                  <div>
                    <SkeletonLoader height={10} borderRadius="12px" width="90%" />
                  </div>
                  <div className="mt-2">
                    <SkeletonLoader height={10} borderRadius="12px" width="90%" />
                  </div>
                </div>
              </div>
              <div className="col-3 mt-3">
                <SkeletonLoader height={10} borderRadius="12px" width="100%" />
              </div>
              <div className="col-6 mt-2">
                <SkeletonLoader height={20} borderRadius="12px" width="100%" />
              </div>
            </div>
          )}
          <div className={`col-lg-4 col-md-12 col-sm-12 col-xs-12 `}>
            {playGiists ? (
              <p className={`${classes.chapters} ms-2 mb-3`}>Chapters</p>
            ) : (
              <div className="col-6 mt-2">
                <SkeletonLoader height={15} borderRadius="12px" width="100%" />
              </div>
            )}
            <div style={{ height: '80vh', overflowY: 'auto' }}>
              {playGiists ? (
                playGiists.chapters?.map((item, index) => (
                  <div className="container-fluid">
                    <div
                      className={
                        item.id == chapterId
                          ? `border border-primary ${classes.myAccordion} row mb-3 cursor-pointer `
                          : `${classes.myAccordion} row mb-3 cursor-pointer pb-2`
                      }
                      style={{ minHeight: '64px' }}
                    >
                      <div
                        className="px-4"
                        onClick={() => {
                          item.firstTime = 0;
                          setChapIndex(index);
                          setSubChapIndex(null);
                          if (!item.subchapter.length) {
                            handleAccordian(
                              item.chap_title,
                              item.link,
                              item.id,
                              item.media_type,
                              item.duration,
                              item.tutorial_medias_media_type,
                              item.quiz_type,
                              item.quiz_id,
                            );
                          }
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between pt-3  ">
                          <div className="d-flex align-items-center">
                            <Image
                              src={
                                item.media_type === 0 || item.media_type === 1
                                  ? '/assets/img/vidcamChapters.svg'
                                  : item.media_type === 2
                                  ? '/assets/icons/documentIcon.svg'
                                  : item.media_type === 4
                                  ? '/assets/icons/quizIcon.svg'
                                  : '/assets/icons/audioIcon.svg'
                              }
                              alt="icons"
                              height={30}
                              width={30}
                            />
                            <div className="position-relative ms-2">
                              <p className={`${classes.chapterText}`}>
                                {index + 1}. {item.chap_title}
                              </p>
                            </div>
                          </div>
                          <div>
                            {item.subchapter.length != 0 && (
                              <Image
                                className=""
                                src="/assets/icons/arrow_down.png"
                                alt="downArrow"
                                height={15}
                                width={18}
                                onClick={() => {
                                  handleClick2(item.id);
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div style={{ width: '90%', float: 'right' }}>
                          {item.openSub == true ? (
                            <hr
                              className=""
                              style={{
                                height: '0.5px',
                                opacity: '0.2',
                                margin: '0.5rem 0px',
                              }}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      {item.openSub == true &&
                        item.subchapter.map((item, subIndex) => (
                          <div className="row">
                            <div
                              className={
                                item.id == chapterId
                                  ? `offset-md-2 col-md-10 py-1 border border-primary ${classes.myAccordion} `
                                  : 'offset-md-2 col-md-10 py-1'
                              }
                              onClick={() => {
                                setChapIndex(index);
                                setSubChapIndex(subIndex);
                                item.firstTime = 0;
                                playSubChapter(
                                  item.chap_title,
                                  item.id,
                                  item.link,
                                  item.media_type,
                                  item.duration,
                                  item.tutorial_medias_media_type,
                                  item.quiz_type,
                                  item.quiz_id,
                                );
                              }}
                            >
                              <div className="d-flex align-items-center py-1">
                                <div className="d-flex align-items-center">
                                  <Image
                                    src="/assets/icons/subchap.png"
                                    alt="subChapterIcon"
                                    height={32}
                                    width={32}
                                    style={{ opacity: '0.5' }}
                                  />
                                </div>
                                <div className="d-flex align-items-center ms-3">
                                  <p className={classes.subChapterText}>
                                    {index + 1}.{subIndex + 1} {item.chap_title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <SuccessModal
                        modalOpen={reportModal}
                        handleModalClose={handleCloseSuccessModal}
                        image={
                          <Image src={`/assets/icons/new/checkedtick.svg`} width="65px" height="70px" alt="alert" />
                        }
                        title={`Success`}
                        description={'You have Reported this Giist, Admin will take necessary action on it'}
                        button1={'Okay'}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-100">
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader height={80} borderRadius="12px" width="100%" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(PlayGiistsVideo);
