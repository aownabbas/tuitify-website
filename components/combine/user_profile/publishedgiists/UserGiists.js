import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import classes from '../otheruserprofile/UserProfile.module.css';
import CircleLoader from '../circleloader/CircleLoader';
import { useRouter } from 'next/router';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Box } from '@mui/material';
import DeleteModal from '../../../modals/deletemodal/DeleteModal';
import Kh_FavouriteGiistAction from '../../../../redux/actions/Kh_FavouriteGiistAction';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import PublishGiistModal from '../../../modals/publishGiistmodal/PublishGiistModal';
import RenameUploadedMedia from '../../../modals/renamemedia/RenameUploadedMedia';
import DelMedia from '../../../../redux/actions/DelMedia';
import PlayMediaModal from '../../../modals/playmediamodal/PlayMediaModal';
import DeleteS3Media from '../../../../utils/DeleteS3Media';
import DelUserGiist from '../../../../redux/actions/DelUserGiist';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import Kh_UnpublishGiist from '../../../../redux/actions/Kh_UnpublishGiist';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';
import AwaitingReviewGiists from '../../../../redux/actions/AwaitingReviewGiists';
import PublishedGiistsAction from '../../../../redux/actions/PublishedGiistsAction';
import CountingDifGiistsAction from '../../../../redux/actions/CountingDifGiistsAction';
// Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
import PrimaryMediaPlayer from '../../mediaPlayer/PrimaryMediaPlayer';
import Kh_playGiistsAction from '../../../../redux/actions/Kh_playGiistsAction';
const UserGiists = ({
  id,
  title,
  mediatabValue,
  chapterTabIndex,
  mediaToGiistAdditionHandler,
  thumbnail,
  previewMedia,
  created,
  avg_rating,
  first_name,
  last_name,
  image,
  progress,
  cardModal,
  language,
  tabTitle,
  toUpdateTitle,
  setToupdateTitle,
  updateId,
  setUpdateId,
  publisherFirstName,
  publisherLastName,
  publisherImage,
  publisherId,
  userId,
  imagename,
  file_name,
  setDotProgressLoading,
  currentStatus,
  rejectionMessage,
  favorite,
  viewsCount,
  setGiistData,
  page,
  PER_PAGE,
  status,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [renameUploadMediaModal, setRenameUploadMediaModal] = useState(false);
  const [UnPublishGiistOnEditModal, setUnPublishGiistOnEditModal] = useState(false);
  const [UnPublishGiistModal, setUnPublishGiistModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [successErrorMessage, setSuccessErrorMessage] = useState('');
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);
  const [favouriteGiist, setFavouriteGiist] = useState('');
  const [show, setShow] = useState(false);
  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const [boolState, setBoolState] = useState();

  // For favorite and unfavorite
  const [like, setLike] = useState(0);

  // Aws Link
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const router = useRouter();
  const path = router.pathname;

  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const UnPublishOpenModal = (event) => {
    // console.log(event,"ggg")
    event.stopPropagation();
    setUnPublishGiistOnEditModal(true);
    // handleClose(event);
    setAnchorEl(null);
  };
  const UnPublishColseModal = () => setUnPublishGiistOnEditModal(false);
  // Check if favorite or not
  useEffect(() => {
    setLike(favorite);
  }, []);

  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const UnPublishGiistOpenModal = (event) => {
    event.stopPropagation();
    setUnPublishGiistModal(true);
    handleClose(event);
  };

  const handleOpendModalPublish = async ({ heading, message, buttonText, image }) => {
    setModalShowErrorSuccess(true);
    setSuccessErrorMessage({ heading, message, buttonText, image });
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const UnPublishGiistColseModal = (event) => {
    event.stopPropagation();
    setUnPublishGiistModal(false);
  };
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const publishModalOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpenPublishModal(true);
  };
  const publishModalClose = () => setOpenPublishModal(false);

  const renameMediaModalOpen = () => setRenameUploadMediaModal(true);
  const renameMediaModalClose = () => setRenameUploadMediaModal(false);
  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    // event.stopPropagation();
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState(null);
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;
    setLoginData(LoginData);
    setAccessToken(access_token);
  }, []);

  const favouriteGiistSuccess = (res) => {
    setFavouriteGiist(res);
  };

  const favouriteGiistError = (err) => {
    // console.log(err);
    setFavouriteGiist(err);
  };

  const likeGiist = () => {
    const params = `giist_id=${id}`;
    dispatch(Kh_FavouriteGiistAction(params, accessToken, favouriteGiistSuccess, favouriteGiistError));
    setLike(1);
  };

  const dislikeGiist = () => {
    const params = `giist_id=${id}`;
    dispatch(Kh_FavouriteGiistAction(params, accessToken, favouriteGiistSuccess, favouriteGiistError));
    setLike(0);
  };

  const handleGiistApiCall = () => {
    const GiistApiCallParams = `limit=${PER_PAGE}&page=${page}&user_id=${loginData?.id}&status=${status}`;
    status == null
      ? dispatch(AwaitingReviewGiists(`limit=${PER_PAGE}&page=${page}`, onGiistDataSuccess, onGiistsDataError))
      : dispatch(PublishedGiistsAction(GiistApiCallParams, onGiistDataSuccess, onGiistsDataError));
    dispatch(CountingDifGiistsAction());
  };

  const deleteMediaHandler = async (id, file_name, imagename) => {
    await DeleteS3Media([file_name, imagename]);
    const delParams = `id=${id}`;
    dispatch(DelMedia(accessToken, delParams, onDeleteMediaSuccess, onDeleteMediaError));
  };

  const onDeleteMediaSuccess = (res) => {
    console.log('res againg =>', res);
  };
  const onDeleteMediaError = (err) => {
    console.log(err);
  };

  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const UnPublishGiist = async (event, id) => {
    // event.stopPropagation();
    // UnPublishColseModal();
    setDotProgressLoading(true);
    dispatch(Kh_UnpublishGiist(id, accessToken, onUnPublishGiistSuccess, onUnPublishGiistError));
  };
  const onUnPublishGiistSuccess = async (res) => {
    if (res.status == true) {
      if (UnPublishGiistModal) {
        UnPublishGiistColseModal();
        setUnPublishGiistModal(false);
        setDotProgressLoading(false);
        handleGiistApiCall();
      } else {
        await handleEdit();
        setDotProgressLoading(false);
      }
    }
  };

  const onUnPublishGiistError = (error) => {
    console.log(error);
    setDotProgressLoading(false);
  };

  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const userProfileClick = async (e, userId) => {
    // setBoolState(false)
    e.stopPropagation();
    await router.push({ pathname: '/combine/UserProfile', query: { user: userId } });
  };

  const [mediaplayModal, setMediaplayModal] = useState(false);
  const handleOpenMediaplay = () => setMediaplayModal(true);
  const handleCloseMediaplay = () => setMediaplayModal(false);

  const [deleteModal, setDeleteModal] = useState({
    image: '/assets/images/trash.svg',
    heading: 'Delete this Giist?',
    text: 'Are you sure about deleting this Giist?',
  });

  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const handleEdit = async (event) => {
    // event.stopPropagation();
    handleClose(event);
    // alert("hhh");
    setAnchorEl(null);
    setDotProgressLoading(true);
    await router.push({
      pathname: '/kh/GiistCreation',
      query: {
        mode: 'edit',
        id: id,
      },
    });
    setDotProgressLoading(false);
  };

  const handleEdit1 = async (event) => {
    event.stopPropagation();
    // handleClose(event);
    // alert("hhh");
    setAnchorEl(null);
    setDotProgressLoading(true);
    await router.push({
      pathname: '/kh/GiistCreation',
      query: {
        mode: 'edit',
        id: id,
      },
    });
    setDotProgressLoading(false);
  };

  const deleteUserGiistHandler = async (user_giist_id) => {
    handleCloseModal();
    setDotProgressLoading(true);
    dispatch(DelUserGiist(accessToken, user_giist_id, onDeleteGiistSuccess, onDeleteGiistError));
  };

  const onGiistDataSuccess = (res) => {
    setGiistData(res);
  };
  const onGiistsDataError = (err) => {
    console.log('Error', err);
  };

  const onDeleteGiistSuccess = async (res) => {
    setDotProgressLoading(false);
    if (res.data.status == true) {
      await handleOpendModalPublish({
        heading: 'Delete Giist',
        message: res.data.message,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
      });
      handleGiistApiCall();
    } else {
      await handleOpendModalPublish({
        heading: 'Delete Giist',
        message: res.data.message,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
      });
    }
  };

  const onDeleteGiistError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: 'Oops, something went wrong or check your internet connection',
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
    });
    setDotProgressLoading(false);
  };
  const giveThumbnail = (thum) => {
    console.log(thum, 'thumbnail clicked');
  };

  // playgiistvideo code here
  // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
  const [playGiistVideo, setPlayGiistVideo] = useState();
  const [getPlatData, setGetPlatData] = useState({});
  const [tutorialMediaTypeset, setTutorialMediasMediaTypeSet] = useState(1);
  const [time, setTime] = useState('0.00');
  const [playMedia, setPlayMedia] = useState(true);
  const [playing, setPlaying] = useState(true);

  const [playGiists, setPlayGiists] = useState(null);
  const [chapterId, setChapterId] = useState();
  const [mediaType, setMediaType] = useState('');
  const [user_id, setUser_id] = useState('');
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
  const [ratingsMessage, setRatingsMessage] = useState('');
  const [title1, setTitle1] = useState();

  const [reported, setReported] = useState(0);

  const [reportModal, setReportModal] = useState(false);

  const handleOpenSuccessModal = () => setReportModal(true);
  const handleCloseSuccessModal = () => setReportModal(false);
  // var VidId = props.router.query.id;
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [cmelink, setCmelink] = useState('');
  const [cmepoints, setCmepoints] = useState(null);

  const handleMouseOver = () => {
    try {
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      setGetPlatData(GetPlatData);
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      setLoginData(LoginData);
      // const { id } = LoginData;
      // setUser_id(id);
      const { access_token } = LoginData;
      setAccessToken(access_token);
      if (userId) {
        const params = `u_id=${userId}&platform_id=${GetPlatData.platform_id}&id=${id}`;
        dispatch(Kh_playGiistsAction(params, access_token, onPlayGiistsSuccess, onPlayGiistsError));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseOut = () => {
    // setTimeout(() => setHovering(false), 5000);
    setPlayGiistVideo(false);
  };

  console.log(cmelink, 'cme link');
  const onPlayGiistsSuccess = async (res) => {
    console.log(res, 'resssss');

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
    // setPlayGiistVideo(true);
    setPlayGiists(resposi);
    setRatingsMessage(res.tuity[0].ratingMessage);
    // if (res.chapters[0].subchapter.length && res.chapters[0].subchapter[0].media_type == 1){
    //   // alert("jjj")
    // }
    if (res.chapters[0].subchapter.length) {
      if (res.chapters[0].subchapter[0].media_type == 1) {
        setPlayGiistVideo(true);
        setPlaying(true);
        setChapIndex(0);
        setSubChapIndex(0);
        setquizType(res.chapters[0].subchapter[0]?.quiz_type);
        setChapterLink(res.chapters[0].subchapter[0].link);
        setChapterId(res.chapters[0].subchapter[0].id);
        setTitle1(res.chapters[0].subchapter[0].chap_title);
        setMediaType(res.chapters[0].subchapter[0].media_type);
        setTime(res.chapters[0].subchapter[0]?.duration);
        setTutorialMediasMediaTypeSet(res.chapters[0].subchapter[0]?.tutorial_medias_media_type);
        setQuizId(res.chapters[0].subchapter[0]?.quiz_id);
        console.log(res.chapters[0].subchapter[0].media_type, 'typesss', res.chapters[0].subchapter[0].chap_title);
      }
    } else {
      if (res.chapters[0].media_type == 1) {
        setquizType(res.chapters[0]?.quiz_type);
        setChapIndex(0);
        setSubChapIndex(null);
        setChapterId(res.chapters[0].id);
        setTitle1(res.chapters[0].chap_title);
        setChapterLink(res.chapters[0].link);
        setPlaying(true);
        setMediaType(res.chapters[0].media_type);
        setTime(res.chapters[0]?.duration);
        setTutorialMediasMediaTypeSet(res.chapters[0]?.tutorial_medias_media_type);
        setQuizId(res.chapters[0]?.quiz_id);
        setPlayGiistVideo(true);
      }
    }
  };
  const onPlayGiistsError = (err) => {
    console.log(err, 'err');
  };

  const handleForwardVideoLInk = (event) => {
    // if(boolState !== false){
    event.preventDefault();
    router.push({
      pathname:
        path == '/kh/published_giists/PublishedGiists'
          ? '../../kh/PlayReviewGiist'
          : '../../kh/published_giists/PlayGiistsVideo',
      query: { id: id },
    });
    // }
  };

  const stopClickingEvent = (event) => {
    event.stopPropagation();
    // alert("hhhhhh")
  };

  return (
    <div
      style={{ width: '100%', borderRadius: '12px' }}
      className={
        path == '/home/Home' ||
        path == '/kh/KnowledgeHome' ||
        path == '/kh/ViewAllGiists' ||
        path == '/kh/published_giists/PublishedGiists' ||
        path == '/kh/SearchKnowledge'
          ? 'card'
          : ``
      }
    >
      <div className="row">
        <div
          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
          onClick={handleForwardVideoLInk}
          className={
            path == '/home/Home' ||
            path == '/kh/KnowledgeHome' ||
            path == '/kh/published_giists/PublishedGiists' ||
            path == '/kh/ViewAllGiists' ||
            path == '/kh/SearchKnowledge'
              ? 'card-body'
              : ''
          }
          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
          style={{ aspectRatio: '16/13', minWidth: '100%', cursor: 'pointer' }}
        >
          <div
            style={{
              position: 'relative',
              minWidth: '100%',
              aspectRatio: '16/9',
            }}
            // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            // onMouseMove={handleMouseOver}
          >
            {/* new code for play giist on hover */}
            {playGiistVideo == true ? (
              <div
                style={{
                  borderRadius: '15px',
                  height: '167px',
                  width: 'auto',
                  overflow: 'hidden',
                  background: 'black',
                }}
              >
                <PrimaryMediaPlayer
                  link={chapterLink}
                  platformData={getPlatData}
                  type={tutorialMediaTypeset}
                  time={time}
                  playMedia={playMedia}
                  // handlePlayGiists={() => handlePlayGiists()}
                  playing={playing}
                  setPlaying={setPlaying}
                  awsLink={awsLink}
                />
              </div>
            ) : (
              <div
                style={{
                  borderRadius: '15px',
                  height: '167px',
                  width: 'auto',
                  overflow: 'hidden',
                }}
              >
                <Link
                  href={{
                    pathname:
                      path == '/kh/published_giists/PublishedGiists'
                        ? '../../kh/PlayReviewGiist'
                        : '../../kh/published_giists/PlayGiistsVideo',
                    query: { id: id },
                  }}
                >
                  <div
                    // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                    className={`${classes.imageContainer1}`}
                  >
                    {thumbnail != null &&
                    thumbnail != `${awsLink}giists/images/${null}` &&
                    thumbnail != `${undefined}/giists/images/${thumbnail}` &&
                    thumbnail != `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/undefined` ? (
                      <Image
                        src={thumbnail}
                        onClick={() => giveThumbnail(thumbnail)}
                        height={176}
                        width={176}
                        layout="fill"
                        objectFit="fit"
                        style={{ borderRadius: '15px', background: 'rgba(196, 196, 196,0.5)' }}
                        className="img-row mb-2 mt-0 img-fluid"
                      />
                    ) : (
                      <Image
                        src={'/assets/images/noThumbnail.png'}
                        height={176}
                        width={176}
                        layout="fill"
                        objectFit="fit"
                        style={{ borderRadius: '15px' }}
                        className="img-row mb-2 mt-0 img-fluid"
                      />
                    )}
                    <div
                      // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                      className={`${classes.overlay1}`}
                    ></div>
                  </div>
                </Link>
              </div>
            )}

            {/* // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose */}
            {playGiistVideo !== true && (
              <span className="position-absolute top-50 start-50 translate-middle">
                {router.pathname == '/kh/medialibrary/MediaLibrary' ? (
                  <>
                    <Image
                      src="/assets/icons/new/circle_play.svg"
                      className=""
                      alt="play"
                      width="32px"
                      height="32px"
                      onClick={handleOpenMediaplay}
                    />
                    <PlayMediaModal
                      id={id}
                      mediatabValue={'doc'}
                      thumbnail={thumbnail}
                      previewInteractionDoc={previewMedia}
                      mediaplayModal={mediaplayModal}
                      handleCloseMediaplay={handleCloseMediaplay}
                    />
                  </>
                ) : chapterTabIndex !== undefined ? (
                  <Image
                    src="/assets/icons/new/circle_play.svg"
                    className=""
                    alt="play"
                    width="32px"
                    height="32px"
                    onClick={() => {
                      mediaToGiistAdditionHandler(id, previewMedia);
                    }}
                  />
                ) : (
                  <Link
                    href={{
                      pathname:
                        path == '/kh/published_giists/PublishedGiists'
                          ? '../../kh/PlayReviewGiist'
                          : '../../kh/published_giists/PlayGiistsVideo',
                      query: { id: id },
                    }}
                  >
                    <Image src="/assets/icons/new/circle_play.svg" className="" alt="play" width="32px" height="32px" />
                  </Link>
                )}
              </span>
            )}
            {playGiistVideo !== true ? (
              router.pathname == '/kh/medialibrary/MediaLibrary' ? (
                <div className="position-absolute top-0 end-0 ">
                  <Box
                    id="upload-media-option"
                    aria-controls={open ? 'upload-media-option-list' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </Box>
                  <Menu
                    id="upload-media-option-list"
                    MenuListProps={{
                      'aria-labelledby': 'upload-media-option',
                      style: {
                        width: '100px',
                      },
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      onClick={() => {
                        renameMediaModalOpen();
                        setUpdateId(id);
                        handleClose();
                      }}
                    >
                      Rename
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleOpen();
                        setUpdateId(id);
                        handleClose();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                  <DeleteModal
                    updateId={updateId}
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    deleteMediaHandler={deleteMediaHandler}
                    image={deleteModal.image}
                    heading={deleteModal.heading}
                    text={deleteModal.text}
                    file_name={file_name}
                    imagename={imagename}
                  />
                  <RenameUploadedMedia
                    openModal={renameUploadMediaModal}
                    handleCloseModal={renameMediaModalClose}
                    accessToken={accessToken}
                    toUpdateTitle={toUpdateTitle}
                    setToupdateTitle={setToupdateTitle}
                    updateId={updateId}
                  />
                </div>
              ) : !tabTitle ||
                tabTitle === 'My Published Giists' ||
                tabTitle === 'Sent for Publishing' ||
                tabTitle == 'Awaiting My Review' ? (
                <div className="position-absolute top-0 start-0 w-100">
                  <div className="px-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div style={{ position: 'absolute', marginLeft: '2px', marginTop: '9px' }}>
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <Image src="/assets/icons/StarRated.svg" alt="star" height="15.23px" width="16.24px" />
                          </div>
                          <div
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13.4667px',
                              lineHeight: '17px',
                              color: '#FFFFFF',
                            }}
                            className="ms-1 pt-1"
                          >
                            {avg_rating == 0 ? 'Not rated yet' : avg_rating}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end w-100">
                        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '10px' }}>
                          <div className="d-flex align-items-center" style={{ marginRight: '10px' }}>
                            <Image
                              src={
                                language === 0
                                  ? '/assets/images/english.png'
                                  : language === 1
                                  ? '/assets/images/arabic.png'
                                  : language === 2
                                  ? '/assets/images/french.png'
                                  : '/assets/images/french.png'
                              }
                              alt="flag"
                              height="15px"
                              width="29px"
                            />
                          </div>
                          <div className="d-flex align-items-center me-2">
                            <Image src="/assets/icons/icon_views.svg" alt="heart" width="20px" height="20px" />
                            <span
                              className="ms-1 text-white"
                              style={{
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '18px',
                              }}
                            >
                              {viewsCount}
                            </span>
                          </div>
                          {tabTitle === 'Sent for Publishing' || tabTitle == 'Awaiting My Review' ? (
                            ''
                          ) : (
                            <>
                              {like == 0 ? (
                                <Image
                                  src={'/assets/icons/Heart.svg'}
                                  width="16px"
                                  height="14px"
                                  alt="heart"
                                  onClick={() => likeGiist()}
                                />
                              ) : (
                                <Image
                                  src={'/assets/icons/new/redheart.png'}
                                  width="16px"
                                  height="14px"
                                  alt="heart"
                                  onClick={() => dislikeGiist()}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : tabTitle === 'Rejected Giists' ? (
                <div className=" position-absolute top-0 start-0 w-100">
                  <div className="px-2 py-2">
                    <div className="d-flex align-items-center justify-content-end mb-1">
                      <Image
                        src="/assets/icons/reject-icon.svg"
                        width="25px"
                        height="25px"
                        alt="rejection of giist"
                        onMouseOver={() => setShow(true)}
                        onMouseOut={() => {
                          setShow(false);
                        }}
                      />
                    </div>
                    {show == true && (
                      <div
                        style={{
                          width: '80%',
                          borderRadius: '10px',
                          background: '#FFFFFF',
                          position: 'absolute',
                          right: '0',
                          marginRight: '1.5em',
                          padding: '8px',
                        }}
                      >
                        <p
                          className="mb-1"
                          style={{
                            fontFamily: 'Gilroy-Regular',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#303548',
                          }}
                        >
                          Rejected
                        </p>
                        <p
                          style={{
                            fontFamily: 'Gilroy-Regular',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '11px',
                            lineHeight: '13px',
                            color: 'rgba(48, 53, 72, 0.5)',
                          }}
                        >
                          {!rejectionMessage ? 'No reason for rejection ' : rejectionMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
          <div className="mb-0">
            <p className={` pt-3 mb-0 ${classes.cardTitle}`}>
              {title?.length > 25 ? title.slice(0, 25) + '...' : title}
            </p>
            {chapterTabIndex !== undefined || router.pathname == '/kh/medialibrary/MediaLibrary' ? (
              ''
            ) : (
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div className="d-flex align-items-start">
                  <Image
                    src={
                      awsLink != undefined && image != null
                        ? awsLink + 'users/profileImages/' + image
                        : '/assets/icons/new/user.svg'
                    }
                    alt="user Image"
                    height={40}
                    width={40}
                    style={{ borderRadius: '50%' }}
                    // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                    onClick={(e) => {
                      userProfileClick(e, userId);
                    }}
                  />
                  <div className="d-flex align-items-start flex-column ms-1 ">
                    <p className={`${classes.userGiistName} mb-0`}>
                      {`${
                        (first_name + ' ' + last_name).length > 10
                          ? (first_name + ' ' + last_name).slice(0, 10) + '...'
                          : first_name + ' ' + last_name
                      }`}
                    </p>
                    <span className={classes.giistDate}>{moment(created).utc().format('DD/M/YYYY')}</span>
                  </div>
                </div>
                {tabTitle == 'Awaiting My Review' || tabTitle == 'My Favourites' || tabTitle == 'Share with me' ? (
                  ''
                ) : (
                  <div className="mt-1">
                    {!cardModal == '' ? (
                      <>
                        <div className="d-flex justify-content-between">
                          <div style={{ paddingRight: '15px' }}>
                            {!tabTitle && <CircleLoader progress={progress} />}
                          </div>
                          <div className="pt-2">
                            <Box
                              id="giist-card-option"
                              aria-controls={open ? 'gissts-card-option-list' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </Box>
                          </div>
                        </div>
                        {/* // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose whole menu is related to the new changes for playvideo on mouseover */}
                        <Menu
                          id="gissts-card-option-list"
                          MenuListProps={{
                            'aria-labelledby': 'giist-card-option',
                            style: {
                              width: '100px',
                              background: '#353452',
                              color: '#fff',
                              border: '1px solid #353452',
                            },
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                          onClose={(event) => handleClose(event)}
                          TransitionComponent={Fade}
                        >
                          {tabTitle == 'Unpublished Giists' ? (
                            <MenuItem
                              onClick={(event) => {
                                publishModalOpen(event);
                              }}
                            >
                              Publish
                            </MenuItem>
                          ) : (
                            ''
                          )}
                          <MenuItem
                            onClick={
                              currentStatus == 2 ? (event) => UnPublishOpenModal(event) : (event) => handleEdit1(event)
                            }
                          >
                            Edit
                          </MenuItem>
                          <MenuItem onClick={(event) => handleOpen(event)}>Delete</MenuItem>
                          {currentStatus == 2 && (
                            <MenuItem onClick={(event) => UnPublishGiistOpenModal(event)}>UnPublish</MenuItem>
                          )}
                        </Menu>
                        <DummyDeleteModal
                          openModal={UnPublishGiistOnEditModal}
                          handleCloseModal={UnPublishColseModal}
                          image="/assets/images/edit-3.svg"
                          heading="Editing Giist"
                          text="Are you sure you want to edit this giist? By editing, this giist will get unpublished"
                          buttonText1="No"
                          buttonText2="Edit"
                          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                          handleClick={(event) => UnPublishGiist(event, id)}
                          stopClickingEvent={(event) => stopClickingEvent(event)}
                        />
                        <DummyDeleteModal
                          openModal={UnPublishGiistModal}
                          handleCloseModal={(event) => UnPublishGiistColseModal(event)}
                          image="/assets/images/edit-3.svg"
                          heading="Unpublish Giist"
                          text="Are you sure, you want to unpublish this Giist?"
                          buttonText1="No"
                          buttonText2="Yes"
                          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                          handleClick={(event) => UnPublishGiist(event, id)}
                          stopClickingEvent={(event) => stopClickingEvent(event)}
                        />

                        <DummyDeleteModal
                          openModal={openModal}
                          handleCloseModal={handleCloseModal}
                          image="/assets/images/trash.svg"
                          heading="Delete this Giist?"
                          text="Are you sure about deleting this Giist?"
                          buttonText1="No"
                          buttonText2="Yes"
                          handleClick={() => deleteUserGiistHandler(id)}
                          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                          stopClickingEvent={(event) => stopClickingEvent(event)}
                        />
                        <PublishGiistModal
                          openPublishModal={openPublishModal}
                          handleCloseModal={publishModalClose}
                          giistId={id}
                          publisherFirstName={publisherFirstName}
                          publisherLastName={publisherLastName}
                          publisherImage={publisherImage}
                          publisherId={publisherId}
                          setDotProgressLoading={setDotProgressLoading}
                          handleOpendModalPublish={handleOpendModalPublish}
                          handleGiistApiCall={handleGiistApiCall}
                          // Aown: In usergiist I have added onmouse over play video code. this change is related for that purpose
                          stopClickingEvent={(event) => stopClickingEvent(event)}
                        />
                        <SuccessModal
                          modalOpen={modalShowErrorSuccess}
                          handleModalClose={handleCloseModalPublish}
                          image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
                          title={successErrorMessage.heading}
                          description={successErrorMessage.message}
                          button1={successErrorMessage.buttonText}
                          setDotProgressLoading={setDotProgressLoading}
                        />
                      </>
                    ) : (
                      <CircleLoader progress={progress} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGiists;
