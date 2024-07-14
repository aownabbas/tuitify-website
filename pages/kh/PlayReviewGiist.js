import { useState, useRef, useEffect } from 'react';
import classes from '../../components/kh_components/mygiists/PlayGiistsVideo.module.css';
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import DotProgress from '../../components/DotProgress';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';
import Image from 'next/image';
import PrimaryMediaPlayer from '../../components/combine/mediaPlayer/PrimaryMediaPlayer';
import SkeletonLoader from '../../components/kh_components/kh_home/SkeletonLoader';
import QuizPlay from '../../components/kh_components/mygiists/QuizPlay';
import { Menu, MenuItem } from '@mui/material';
import previewGiist from '../../redux/actions/kh_previewGiist';
import moment from 'moment';
import DummyDeleteModal from '../../components/modals/deletemodal/DummyDeleteModal';
import Kh_UnpublishGiist from '../../redux/actions/Kh_UnpublishGiist';
import DelUserGiist from '../../redux/actions/DelUserGiist';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';

import RejectModal from '../../components/modals/rejectModal/RejectModal';
import Kh_RejectGiistAction from '../../redux/actions/Kh_RejectGiistAction';

const PlayReviewGiist = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [chapterTitle, setChapterTitle] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [link, setLink] = useState('');
  const [duration, setDuration] = useState('');
  const [tutorialMediaType, setTutorialMediaType] = useState('');
  const [playing, setPlaying] = useState(true);
  const [subChapId, setSubChapId] = useState();
  const [showSubChaps, setShowSubChaps] = useState(true);
  const [getPlatData, setGetPlatData] = useState('');
  const [GiistResValues, setGiistResValues] = useState(null);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [rejectModal, setRejectModal] = useState(false);

  const rejectModalClose = () => {
    setRejectModal(false);
  };
  const rejectModalOpen = () => {
    setRejectModal(true);
    setStatus(0);
  };

  const [successErrorMessage, setSuccessErrorMessage] = useState('');
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);

  const handleOpendModalPublish = ({ heading, message, buttonText, image, move }) => {
    setSuccessErrorMessage({ heading, message, buttonText, image, move });
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };
  const [UnPublishGiistOnEditModal, setUnPublishGiistOnEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteOpenModal = () => {
    setDeleteModal(true);
  };

  const handleDeleteColseModal = () => {
    setDeleteModal(false);
  };

  const UnPublishColseModal = () => {
    setUnPublishGiistOnEditModal(false);
    setAnchorEl(null);
  };

  const UnPublishOpenModal = async () => {
    setUnPublishGiistOnEditModal(true);
    setAnchorEl(null);
  };

  const UnPublishGiist = (id) => {
    setLoading(true);
    UnPublishColseModal();
    dispatch(Kh_UnpublishGiist(id, loginData?.accessToken, onUnPublishGiistSuccess, onUnPublishGiistError));
  };

  const onUnPublishGiistSuccess = async (res) => {
    if (res.status == true) {
      await handleEditGiist(GiistId);
    }
  };
  const onUnPublishGiistError = (error) => {
    console.log(error);
    setLoading(false);
  };

  const deleteUserGiistHandler = async (user_giist_id) => {
    setLoading(true);
    dispatch(DelUserGiist(loginData?.accessToken, user_giist_id, onDeleteGiistSuccess, onDeleteGiistError));
  };

  const onDeleteGiistSuccess = (res) => {
    if (res.data.status == true) {
      handleOpendModalPublish({
        heading: 'Delete Giist',
        message: res.data.message,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: true,
      });
    } else {
      handleOpendModalPublish({
        heading: 'Delete Giist',
        message: res.data.message,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: true,
      });
    }
    setLoading(false);
  };

  const onDeleteGiistError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: 'Oops, something went wrong or check your internet connection',
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setLoading(false);
  };

  const [loginData, setLoginData] = useState('');
  const router = useRouter();

  var GiistId = props.router.query.id;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(async () => {
    let getLoginData = await JSON.parse(localStorage.getItem('@LoginData'));
    setLoginData(getLoginData);
    const getPlatformData = await JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(getPlatformData);
    if (props.router.query.id) {
      handleGetReviewData();
    }
  }, [props.router.query.id]);

  const handleGetReviewData = () => {
    const params = `id=${props.router.query.id}`;
    dispatch(previewGiist(params, onGiistPreviewSuccess, onGiistPreviewError));
  };
  const onGiistPreviewSuccess = (res) => {
    let resposi = res.data;
    let modifiedChapters = resposi?.chapters.map((chapter) => {
      if (chapter.subChapters.length != 0) {
        return { ...chapter, openSub: true }; // Add the 'openSub' property with an initial value of false
      }
      return { ...chapter };
    });
    resposi.chapters = modifiedChapters; // Assign the modified array back to the original array
    setGiistResValues(resposi);
    console.log('edit get data', resposi);
  };
  const onGiistPreviewError = (error) => {
    console.log('edit get data', error);
  };

  var [quizType, setquizType] = useState(null);

  useEffect(() => {
    if (GiistResValues && GiistResValues.chapters && GiistResValues.chapters.length > 0) {
      const firstChapter = GiistResValues.chapters[0];
      const firstSubChapter = firstChapter?.subChapters[0];
      if (!firstChapter.subChapters.length) {
        setChapterTitle(firstChapter?.title);
        setLink(firstChapter?.tutorialMedia?.title);
        setquizType(firstChapter?.quiz?.quiz_type);
        setChapterId(firstChapter.chapter_id);
        setMediaType(firstChapter.media_type);
        setDuration(firstChapter?.tutorialMedia?.duration);
        setTutorialMediaType(firstChapter?.tutorialMedia?.type);
      } else {
        setquizType(firstSubChapter?.quiz?.quiz_type);
        setChapterTitle(firstSubChapter?.title);
        setLink(firstSubChapter?.tutorialMedia?.title);
        setChapterId(firstSubChapter.chapter_id);
        setMediaType(firstSubChapter.media_type);
        setDuration(firstSubChapter?.tutorialMedia?.duration);
        setTutorialMediaType(firstSubChapter?.tutorialMedia?.type);
      }
    }
  }, [GiistResValues]);

  const handleAccordian = (title, link, chapter_id, media_type, duration, type, quizType) => {
    setquizType(quizType);
    setChapterTitle(title);
    setLink(link);
    setChapterId(chapter_id);
    setMediaType(media_type);
    setDuration(duration);
    setTutorialMediaType(type);
  };

  const handleEditGiist = async (id) => {
    setLoading(true);
    await router.push({ pathname: '/kh/GiistCreation', query: { mode: 'edit', id: id } });
    setLoading(false);
  };

  const [openChapter, setOpenChapter] = useState('');

  const [status, setStatus] = useState();
  const [reason, setReason] = useState('');
  console.log(reason, 'reason');

  const confirmGiistRejection = () => {
    if (status == 0 && !reason) {
      return handleOpendModalPublish({
        heading: 'Something Wrong',
        message: 'Please enter a message',
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
    }
    // else if(reason=="") {
    //   alert()
    // }
    setLoading(true);
    const paramsBody = {
      giist_id: GiistId,
      status: status,
      rejection_reason: reason,
    };
    dispatch(Kh_RejectGiistAction(paramsBody, loginData.accessToken, onReviewGiistSuccess, onReviewGiistError));
  };

  const [modalOpenLinve, setModalOpenLive] = useState(false);

  const handleGoLiveOpenModal = () => {
    setModalOpenLive(true);
    setStatus(1);
  };

  const handleGoLiveColseModal = () => {
    setModalOpenLive(false);
  };

  const handleGiistGoLive = () => {
    setLoading(true);
    const paramsBody = {
      giist_id: GiistId,
      status: status,
    };
    dispatch(Kh_RejectGiistAction(paramsBody, loginData.accessToken, onReviewGiistSuccess, onReviewGiistError));
  };

  const onReviewGiistSuccess = (res) => {
    if (res.status == true) {
      if (status == 0) {
        handleOpendModalPublish({
          heading: 'Rejection Successful',
          message: 'This giist has been successfully rejected ',
          buttonText: 'Okay',
          image: '/assets/icons/new/checkedtick.svg',
          move: true,
        });
        setLoading(false);
      } else {
        handleOpendModalPublish({
          heading: 'Publish Giist Successfully',
          message: 'this giist has been successfully Publish ',
          buttonText: 'Okay',
          image: '/assets/icons/new/checkedtick.svg',
          move: true,
        });
        setLoading(false);
      }
    }
  };

  const handleClick = (chapterId) => {
    setGiistResValues((prevState) => {
      return {
        ...prevState,
        chapters: prevState.chapters.map((chapter) => {
          if (chapter.chapter_id === chapterId) {
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
  // In the above code, we are using the setGiistResValues function to update the state of GiistResValues. We are using the functional form of setState to get the previous state and return the updated state based on the clicked chapterId. We are using the map function to loop over all the chapters and if the chapterId matches with the clicked chapter, we are updating the openSub property by toggling its value. Finally,

  const onReviewGiistError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: 'Oops, something went wrong or check your internet connection',
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setLoading(false);
  };

  console.log('GiistResValues', GiistResValues);

  return (
    <Layout heading="Knowledge Hub" showGiistIcon={true}>
      {loading && <DotProgress />}
      <div className="w-100">
        <div className="row pt-3">
          {GiistResValues ? (
            <div className={`col-lg-8 col-md-12 col-sm-12 col-xs-12 `} style={{ borderRadius: '10px' }}>
              <div className="d-flex ">
                <Link href="/kh/published_giists/PublishedGiists">
                  <div className="">
                    <WestIcon sx={{ height: 24, width: 24 }} />
                  </div>
                </Link>
                <div className={`${classes.listTxt} ps-2 mt-1 ms-2`}>
                  <span>{GiistResValues?.title}</span>
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
                        VidId={GiistId}
                        setDotloading={setLoading}
                        chapterId={chapterId}
                        ReviewGiist={true}
                        quizType={quizType}
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
                      link={link}
                      platformData={getPlatData}
                      type={tutorialMediaType}
                      time={duration}
                      playMedia={true}
                      playing={playing}
                      setPlaying={setPlaying}
                      awsLink={awsLink}
                    />
                  )}
                </>
              </div>
              <div className="row mt-3 ">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="bold">{chapterTitle}</div>
                  <Image src="/assets/icons/dots.png" alt="pause" width="5px" height="24px" onClick={handleOpen} />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      style: {
                        background: '#353452',
                        borderRadius: '4px',
                        color: '#fff',
                      },
                    }}
                  >
                    {GiistResValues?.publisher?.id == loginData?.id && GiistResValues?.currentStatus == 1 ? (
                      <>
                        <MenuItem onClick={() => rejectModalOpen()}>Reject</MenuItem>
                        <MenuItem onClick={() => handleGoLiveOpenModal()}>Go Live</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem
                          onClick={
                            GiistResValues?.currentStatus == 2
                              ? () => UnPublishOpenModal()
                              : () => handleEditGiist(GiistId)
                          }
                        >
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteOpenModal(GiistId)}>Delete</MenuItem>
                      </>
                    )}
                  </Menu>
                  <DummyDeleteModal
                    openModal={UnPublishGiistOnEditModal}
                    handleCloseModal={UnPublishColseModal}
                    image="/assets/images/edit-3.svg"
                    heading="Unpublish Giist"
                    text="Are you sure, you want to edit this giist? By editing this giist will get unpublished"
                    unPublisher={true}
                    buttonText1="No"
                    buttonText2="Yes"
                    handleClick={() => UnPublishGiist(GiistId)}
                  />
                  <DummyDeleteModal
                    openModal={deleteModal}
                    handleCloseModal={handleDeleteColseModal}
                    image="/assets/images/trash.svg"
                    heading="Delete this Giist?"
                    text="Are you sure about deleting this Giist?"
                    buttonText1="No"
                    buttonText2="Yes"
                    handleClick={() => deleteUserGiistHandler(GiistId)}
                  />
                </div>
              </div>
              <div className="d-flex mt-2  align-items-center">
                <div>
                  <Image
                    className="rounded-circle"
                    src={
                      awsLink !== undefined && GiistResValues.user.image
                        ? `${awsLink}users/profileImages/${GiistResValues.user.image}`
                        : '/assets/icons/new/user.svg'
                    }
                    alt="user"
                    height={30}
                    width={30}
                  />
                </div>
                <div className="ms-2">
                  <div className="semibold-mid-small ">
                    {GiistResValues?.user?.first_name}
                    <span className="semibold-mid-small "> {GiistResValues?.user?.last_name}</span>
                  </div>
                  <div className="regular-xxsmall ">{moment(GiistResValues?.created).format('DD MMMM, YYYY')} </div>
                </div>
              </div>
              <div className="mb-5 mt-2">
                {GiistResValues?.currentStatus === 1 ? (
                  <div
                    className="w-100 mt-2  p-3"
                    style={{ backgroundColor: '#FFCB40', opacity: '0.8', borderRadius: '12px' }}
                  >
                    <div className="row ">
                      <div className="col-6 ">
                        <div className="mt-2 small-bold">Message for Publisher</div>
                      </div>
                      <div className="col-6 ">
                        <div
                          className="d-flex align-items-center float-end p-1 px-3"
                          style={{ backgroundColor: 'rgba(48, 53, 72, 0.08)', borderRadius: '50px' }}
                        >
                          <div className="mt-1">
                            <Image
                              className="rounded-circle"
                              src={
                                awsLink !== undefined && GiistResValues.publisher?.image
                                  ? `${awsLink}users/profileImages/${GiistResValues.publisher?.image}`
                                  : '/assets/icons/new/user.svg'
                              }
                              alt="user"
                              height={30}
                              width={30}
                            />
                          </div>
                          <div className="ms-2 mt-1">
                            <div className="semibold-mid-small">
                              {GiistResValues?.publisher?.first_name}
                              <span className="semibold-mid-small"> {GiistResValues?.publisher?.last_name}</span>
                            </div>
                            <div className="regular-xxsmall ">{GiistResValues?.publisher?.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        {GiistResValues.tutorialReview?.message?.replaceAll(/(.{70})/g, '$1\u200b')}
                      </div>
                    </div>
                  </div>
                ) : GiistResValues?.currentStatus === 4 ? (
                  <div className="d-flex p-2" style={{ background: 'rgba(255, 203, 64, 0.16)', borderRadius: '10px' }}>
                    <div>
                      <Image src={'/assets/icons/Subtract.svg'} width="30px" height="30px" />
                    </div>
                    <div className="regular-small p-2">{GiistResValues?.tutorialReview?.rejectionMessage}</div>
                  </div>
                ) : (
                  ''
                )}
                {GiistResValues.description && (
                  <>
                    <div className="small-bold mt-2">Description</div>
                    <div className="row py-3">
                      <p>{GiistResValues.description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
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
              <div className="col-3 mt-3">
                <SkeletonLoader height={10} borderRadius="12px" width="100%" />
              </div>
              <div className="col-6 mt-2">
                <SkeletonLoader height={20} borderRadius="12px" width="100%" />
              </div>
            </div>
          )}
          <div className={`col-lg-4 col-md-12 col-sm-12 col-xs-12 `}>
            {GiistResValues ? (
              <p className={`${classes.chapters} ms-2 mb-3`}>Chapters</p>
            ) : (
              <div className="col-6 mt-2">
                <SkeletonLoader height={15} borderRadius="12px" width="100%" />
              </div>
            )}
            <div style={{ height: '70vh', overflowY: 'auto' }}>
              {GiistResValues ? (
                GiistResValues.chapters?.map((item, index) => (
                  <div className="container-fluid" key={item.chapter_id}>
                    <div
                      className={
                        chapterId === item.chapter_id
                          ? `border border-primary ${classes.myAccordion} row mb-3 cursor-pointer `
                          : `${classes.myAccordion} row mb-3 cursor-pointer pb-2`
                      }
                      style={{ minHeight: '64px' }}
                    >
                      <div
                        className="px-4"
                        onClick={() => {
                          if (!item.subChapters.length) {
                            handleAccordian(
                              item.title,
                              item?.tutorialMedia?.title,
                              item.chapter_id,
                              item.media_type,
                              item?.tutorialMedia?.duration,
                              item?.tutorialMedia?.type,
                              item?.quiz?.quiz_type,
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
                                {index + 1}. {item.title}
                              </p>
                            </div>
                          </div>
                          <div>
                            {item.subChapters.length != 0 && (
                              <Image
                                className=""
                                src="/assets/icons/arrow_down.png"
                                alt="downArrow"
                                height={15}
                                width={18}
                                onClick={() => {
                                  handleClick(item.chapter_id);
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div style={{ width: '90%', float: 'right' }}>
                          {item.openSub == true ? (
                            <hr style={{ height: '0.5px', opacity: '0.2', margin: '0.5rem 0px' }} />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      {item.openSub == true &&
                        item.subChapters.map((item, subIndex) => (
                          <div className="row" key={item.chapter_id}>
                            <div
                              className={
                                item.chapter_id == chapterId
                                  ? `offset-md-2 col-md-10 py-1 border border-primary ${classes.myAccordion} `
                                  : 'offset-md-2 col-md-10 py-1'
                              }
                              onClick={() => {
                                handleAccordian(
                                  item.title,
                                  item?.tutorialMedia?.title,
                                  item.chapter_id,
                                  item.media_type,
                                  item?.tutorialMedia?.duration,
                                  item?.tutorialMedia?.type,
                                  item?.quiz?.quiz_type,
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
                                    {index + 1}.{subIndex + 1} {item.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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
                </div>
              )}
            </div>
          </div>
        </div>
        <SuccessModal
          modalOpen={modalShowErrorSuccess}
          handleModalClose={handleCloseModalPublish}
          image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
          title={successErrorMessage.heading}
          description={successErrorMessage.message}
          button1={successErrorMessage.buttonText}
          setDotProgressLoading={setLoading}
          giistPublishMove={successErrorMessage.move}
        />
        <RejectModal
          openModal={rejectModal}
          handleCloseModal={rejectModalClose}
          image={deleteModal.publishImage}
          heading={deleteModal.heading}
          text={deleteModal.text}
          rejectGiist={confirmGiistRejection}
          setReason={setReason}
          reason={reason}
        />
        <DummyDeleteModal
          openModal={modalOpenLinve}
          handleCloseModal={handleGoLiveColseModal}
          image="/assets/icons/new/checkedtick.svg"
          heading="Publish this Giist?"
          text="This action will make this Giist available to its recipients"
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => handleGiistGoLive(GiistId)}
        />
      </div>
    </Layout>
  );
};

export default withRouter(PlayReviewGiist);
