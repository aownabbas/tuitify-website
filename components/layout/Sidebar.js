import React, { useState, useEffect, useRef } from 'react';
import AlertModal from '../modals/alertmodal/AlertModal';
import useOnClickOutside from 'use-onclickoutside';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import COLORS from '../../public/assets/colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import sidebar from '../../redux/actions/Sidebar';
import { useRouter } from 'next/router';
import SuccessModal from '../modals/simplemodal/SuccessModal';
import LiveModal from '../modals/livemodal/LiveModal';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Collapse from 'react-bootstrap/Collapse';
import Modal from '@mui/material/Modal';
import PrimaryMediaPlayer from '../combine/mediaPlayer/PrimaryMediaPlayer';
import DummyDeleteModal from '../modals/deletemodal/DummyDeleteModal';
import { CreateConference } from '../../redux/actions/CreateConference';

const ScreenRecording = dynamic(() => import('../ch/briifrecording/screencast/ScreenRecording'), {
  ssr: false,
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
  border: '0px',
  borderRadius: '15px',
  overflow: 'hidden',
  px: 2,
  py: 1,
};

const classesStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 390,
  outline: 'none',
  border: '0px',
  borderRadius: '15px',
  overflow: 'hidden',
  px: 2,
  py: 1,
};

const Sidebar = (props) => {
  const clickOutside = useRef(null);
  const [openCommunicationDropdown, setOpenCommunicationDropdown] = useState(props.showBriffIcon);
  const [openKnowledgeDropdown, setOpenKnowledgeDropdown] = useState(props.showGiistIcon);
  const [openSettingDropdown, setOpenSettingDropdown] = useState(props.showSettingIcon);
  const [playing, setPlaying] = useState(true);
  const [backModal, setBackModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [setduration, setSetduration] = useState('');
  const [screenModalOpen, setScreenModalOpen] = useState(false);
  const [screenBlobUrl, setScreenBlobUrl] = useState('');
  useOnClickOutside(clickOutside, () => props.setSidebarMenuOpen('false'));

  const { userPlatfrom } = useSelector((state) => state.get_plat);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [startRecording, setStartRecording] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data } = useSelector((state) => state.sidebar);
  const { screenRecording } = useSelector((state) => state.screen_recording);

  const [id, setId] = useState('');

  //Modal States
  const [modalOpen, setModalOpen] = useState(false);
  //removing of baged states
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [receiveClose, setReceiveClose] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const [getPlatData, setGetPlatData] = useState(null);

  //success modal states
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalTitle, setSuccessModalTitle] = useState('');
  const [successModalDescription, setSuccessModalDescription] = useState('');
  const [successModalImage, setSuccessModalImage] = useState('');
  const [successModalButton, setSuccessModalButton] = useState('');

  const [isBottomAddPopoverOpen, setIsBottomAddPopoverOpen] = useState(false);

  const [activeButtonBriif, setActiveButtonBriif] = useState('received');

  const handleButtonClick = (buttonType) => {
    setActiveButtonBriif(buttonType);
  };

  //loading state
  const [dashboardLoading, setDashboardLoading] = useState(false);

  // ch paths
  const ActiveUsersPage = '/ch/dashboard/ActiveUsers';
  const BriifsInteractionsPage = '/ch/dashboard/Interactions';
  const GeneralStatsPage = '/ch/dashboard/GeneralStats';
  const InteractionDetailPage = '/ch/dashboard/InteractionsDetail';
  const LiveSessionsPage = '/ch/dashboard/LiveSessions';
  const EngagementRatePage = '/ch/dashboard/EngagementRate';
  const StatisticsPage = '/ch/dashboard/Statistics';
  const TotalBriifsPage = '/ch/dashboard/[slug]';
  const AudioBriifCreationPage = '/ch/AudioBriifCreation';
  const LiveMeetingsPage = '/ch/LiveMeetings';
  const MainPage = '/';
  const RecordingFormPage = '/ch/RecordingForm';
  const VideoBriifCreationPage = '/ch/VideoBriifCreation';

  // CH Dashboard path

  const ChDashborderPage = '/ch/dashboard/Statistics?dashboard=ch';
  const TotalBiifsPage = '/ch/dashboard/TotalBriifs?dashboard=ch';
  const TotalInteractionsPage = '/ch/dashboard/Interactions?dashboard=ch';
  const TotalBriifUserPage = '/ch/dashboard/ActiveUsers?dashboard=ch';
  const TotalLivePage = '/ch/dashboard/LiveSessions';
  const InteractionsDetail = '/ch/dashboard/InteractionsDetail';
  const ChGeneralStats = '/ch/dashboard/GeneralStats';

  // KH Dashboard Path
  const KhDashborderPage = '/ch/dashboard/Statistics?dashboard=kh';
  const TotalGiistPage = '/ch/dashboard/TotalGiists?dashboard=kh';
  const TotalInteractionsGiistPage = '/ch/dashboard/Interactions?dashboard=kh';
  const TotalGiistUserPage = '/ch/dashboard/ActiveUsers?dashboard=kh';
  const TotalEngagementRatePage = '/ch/dashboard/EngagementRate?dashboard=kh';

  //combine paths
  const GlobalSearchPage = '/combine/GlobalSearch';
  const UserProfilePage = '/combine/UserProfile';

  //home paths
  const HomePage = '/home/Home';

  // kh paths
  const PlayGiistsVideoPage = '/kh/published_giists/PlayGiistsVideo';
  const PublishedGiistsPage = '/kh/published_giists/PublishedGiists';
  const GiistCreationPage = '/kh/GiistCreation';
  const KnowledgeHomePage = '/kh/KnowledgeHome';
  const SearchKnowledgePage = '/kh/SearchKnowledge';
  const ViewAllGiistsPage = '/kh/ViewAllGiists';
  const MediaLibraryPage = '/kh/medialibrary/MediaLibrary';
  const PreviewGiistPage = '/kh/PlayReviewGiist';

  // setting path
  const SettingPage = '/setting/Setting';
  const GroupSetting = '/setting/GroupSetting';
  const CreateGroup = '/setting/CreateGroup';
  const CategoriesPage = '/setting/SelectCategories';
  const PlatformPage = '/setting/PlatformSetting';
  const UserPage = '/setting/UserSetting';

  const [isAddPopoverModalOpen, setIsAddPopoverModalOpen] = useState(false);

  const [loginData, setLoginData] = useState(null);
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      setLoginData(LoginData);
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
    }
  }, []);

  const [isKnowledgePopoverOpen, setIsKnowledgePopoverOpen] = useState(false);
  const [isGlobalSearchPopoverOpen, setIsGlobalSearchPopoverOpen] = useState(false);
  const [isSettingPopoverOpen, setIsSettingPopoverOpen] = useState(false);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);

  const [isScreenRecordingModalOpen, setIsScreenRecordingModalOpen] = useState(false);

  const [time, setTime] = useState('');

  const [isMobile, setIsMobile] = useState('');

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMobile('Desktop');
    }
    if (window.innerWidth <= 768) {
      setIsMobile('Mobile');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('load', handleResize);
    window.addEventListener('visibilitychange', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {};
  }, []);

  const channelTokenGen = () => {
    let length = 50;
    var result = '';
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  };

  const channelToken = channelTokenGen();
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);

  const onTokenSuccess = (res) => {
    console.log(res, 'token response');
    localStorage.removeItem('@ConferenceRemoteUser');
    localStorage.setItem('@ConferenceUser', JSON.stringify(res?.data));
    router.push(`/ch/liveconference/${channelToken}`);
  };

  const onTokenError = (err) => {
    // router.push('/');
    console.log(err, 'token response');
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  const handleChangeBriffTab = async (data) => {
    if (data == 'receive') {
      // props?.setSocketReceivedBriifs(null);
      handleButtonClick('received');
      dispatch(sidebar('receive'));
    } else if (data == 'sent') {
      handleButtonClick('sent');
      dispatch(sidebar('sent'));
    } else if (data == 'archived') {
      handleButtonClick('archived');
      dispatch(sidebar('archived'));
    } else if (data == 'draft') {
      handleButtonClick('draft');
      dispatch(sidebar('draft'));
    } else {
      handleButtonClick('ch');
      dispatch(sidebar('ch'));
    }
  };

  return (
    <>
      <SuccessModal
        modalOpen={modalShowErrorSuccess}
        handleModalClose={handleCloseModalPublish}
        image={<Image src="/assets/icons/danger.svg" width="65px" height="70px" alt="alert" />}
        title={'Something Went Wrong!'}
        description={'Sorry, You could not create meeting. Please try again later'}
        button1={'Okay'}
      />
      {modalOpen == true && (
        <LiveModal
          modalOpen={modalOpen}
          handleModalClose={() => {
            setModalOpen(false);
          }}
        />
      )}

      {deleteModal == true && (
        <>
          <DummyDeleteModal
            openModal={deleteModal}
            handleCloseModal={() => {
              setDeleteModal(false);
            }}
            image={'/assets/images/trash.svg'}
            heading="Delete?"
            text="Are you sure, you want to delete this  recording?"
            buttonText1="No"
            buttonText2="Yes"
            handleClick={() => setScreenModalOpen(false)}
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
            heading="Exit?"
            text="You are about to loose your recording, do you confirm?"
            buttonText1="No"
            buttonText2="Yes"
            handleClick={() => setScreenModalOpen(false)}
          />
        </>
      )}
      <>
        {isAddPopoverModalOpen == true && (
          <Modal
            style={{ zIndex: '999999' }}
            open={isAddPopoverModalOpen}
            onClose={() => setIsAddPopoverModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={classesStyle} className="text-center border-0 bg-white">
              <div className="h3 row mb-0 w-100 d-inline-flex align-items-center py-3" style={{ zIndex: '999' }}>
                <div className=" p-2 me-0 mb-2">
                  <p className="medium-large ">Create Briif </p>
                  <div className="row mt-4">
                    <div className="col-6 mx-auto text-center">
                      <Link href="/ch/VideoBriifCreation">
                        <Image src="/assets/icons/new/ic_video.svg" width="40px" height="40px" alt="video" />
                      </Link>
                      <p className=" mb-0 light-small">Webcam</p>
                    </div>
                    <div className="col-6 mx-auto text-center">
                      <Image
                        src="/assets/icons/new/webcam.svg"
                        width="40px"
                        height="40px"
                        alt="video"
                        onClick={() => setIsScreenRecordingModalOpen(true)}
                      />
                      <p className=" mb-0 light-small">Screencast</p>
                    </div>
                    <div className="col-6 mt-4 mx-auto text-center">
                      <Link href="/ch/AudioBriifCreation" passHref as="/ch/AudioBriifCreation">
                        <Image src="/assets/icons/new/ic_audio.svg" width="40px" height="40px" alt="audio" />
                      </Link>
                      <p className=" mb-0 light-small">Audio</p>
                    </div>
                    {/* <div className="col-6 mt-4 mx-auto text-center">
                      <Image
                        src="/assets/icons/new/live-session.svg"
                        width="40px"
                        height="40px"
                        alt="live"
                        onClick={() => setModalOpen(true)}
                      />
                      <p className=" mb-0 light-small">Go Live</p>
                    </div> */}
                  </div>
                </div>
                <div className="p-2 me-0">
                  <p className="medium-large mt-3">Create Giist </p>
                  <div className="row mt-4 ">
                    <Link href="/kh/GiistCreation">
                      <div className="col ms-3">
                        <Image
                          src="/assets/icons/new/sidebar/giistcreation_icon.svg"
                          width="40px"
                          height="40px"
                          alt="video"
                        />
                        <p className=" mb-0 light-small">Create</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </>

      {screenModalOpen == true && (
        <Modal
          style={{ zIndex: '1' }}
          open={screenModalOpen}
          onClose={false}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="screen-replay-modal text-center border-0 bg-white">
            <div className="h3 row mb-0 w-100 d-inline-flex align-items-center" style={{ zIndex: '1' }}>
              <span className="col-6">
                {/* <Link href="/ch/VideoBriifCreation" passHref> */}
                <span className="d-flex  align-items-center justify-content-start">
                  <Image
                    src="/assets/icons/arrow.png"
                    width="17px"
                    height="17px"
                    className="col-3 col-sm-3 col-md-2 col-lg-1"
                    alt="back"
                    onClick={() => {
                      setBackModal(true);
                    }}
                  />
                  <span style={{ fontSize: '17px' }} className="ms-2">
                    Recording
                  </span>
                </span>
                {/* </Link> */}
              </span>
              <span className="col-6 d-flex justify-content-end pe-0">
                <button
                  className="bg-transparent text-danger semibold me-2"
                  style={{
                    width: '130px',
                    height: '42px',
                    borderRadius: '10px',
                    border: '1px solid red',
                  }}
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                >
                  Delete
                </button>
                <button
                  className="main-background-color text-white semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace({
                      pathname: '/ch/RecordingForm',
                      query: {
                        name: screenBlobUrl,
                        type: `mp4`,
                        seconds: time,
                        recording: 'screen',
                      },
                    });
                  }}
                  style={{
                    width: '130px',
                    height: '42px',
                    borderRadius: '10px',
                    border: '2px solid #303548',
                  }}
                >
                  Done
                </button>
              </span>
            </div>
            <div className="mt-2">
              <PrimaryMediaPlayer link={screenBlobUrl} time={time} playing={playing} setPlaying={setPlaying} />
            </div>
          </Box>
        </Modal>
      )}

      {successModalOpen == true && (
        <SuccessModal
          modalOpen={successModalOpen}
          handleModalClose={() => {
            setSuccessModalOpen(false);
          }}
          image={successModalImage}
          title={successModalTitle}
          description={successModalDescription}
          button1={successModalButton}
        />
      )}
      {/* -----------------sidebar tabs starts---------------- */}
      <div>
        <div
          // ref={clickOutside}
          id="global_search_sidebar"
          className="ch_responsive_sidebar row pt-5"
          // style={{ width: props.sidebarMenuOpen == true ? '410px' : '0px' }}
          // style={{ width: '0px' }}
        >
          <div className="col-10 mx-auto">
            <div className="row"></div>
          </div>
        </div>
      </div>

      {/* <div className="d-block d-md-none">
      <Box sx={{ width: '100%' }} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        className="d-flex justify-content-center mx-auto"
      >
        <Tab value="one" label="Recived" />
        <Tab value="two" label="Sent" />
        <Tab value="three" label="Archived" />
      </Tabs>
    </Box>
      </div> */}

      {/* -----------------sidebar tabs ends---------------- */}
      <div
        className={
          props.sidebarMenuOpen == true
            ? 'sidebarLargeScreenlayout border-0 px-0 position-absolute'
            : 'sidebarSmallScreenHidelayout border-0 px-0 position-absolute'
        }
        style={{
          width: '215px',
          zIndex: '1',
          paddingRight: '0px',
          // height: "100%",
          backgroundColor: COLORS.mainColor,
          color: COLORS.white,
        }}
        ref={clickOutside}
      >
        <div id="sidebar-wrapper" style={{ height: '100%' }}>
          <Link href="/">
            <span
              className="position-fixed d-flex justify-content-center pt-3"
              style={{
                top: '0px',
                zIndex: '1',
                backgroundColor: COLORS.mainColor,
              }}
            >
              <div
                className="logo bg-white d-flex align-items-center justify-content-center ms-3 me-2 mt-0"
                style={{
                  zIndex: '1',
                  width: '40px',
                  height: '40px',
                  borderRadius: '14px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                }}
              >
                <Link href="/" passHref>
                  {getPlatData ? (
                    getPlatData == (null || {}) ? (
                      ''
                    ) : (
                      <>
                        <Image
                          width="23px"
                          src={`${awsLink}platforms/logos/${getPlatData.logo}`}
                          className="img-fluid sidelist mt-0"
                          alt="platforms Hub Logo"
                          height="23px"
                          onClick={() => {
                            setDashboardLoading(true);
                            dispatch(sidebar('receive'));
                          }}
                          style={{ borderRadius: '5px' }}
                        />
                      </>
                    )
                  ) : (
                    ''
                  )}
                </Link>
              </div>

              <div
                className="d-inline-flex p-0 justify-content-center align-items-center"
                onClick={() => {
                  setDashboardLoading(true);
                  dispatch(sidebar('receive'));
                }}
                style={{
                  // fontFamily: 'Gilroy',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '17px',
                  lineHeight: '30px',
                  /* identical to box height */
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                }}
              >
                {getPlatData?.name}
              </div>
            </span>
          </Link>

          <div className="list-group list-group-flush mx-2">
            <br></br>
            {/* <div className="d-flex justify-content-center "> */} {/* </div> */}
            <div className="overflow-auto" style={{ height: '90vh' }}>
              <span className="mb-3 d-flex justify-content-start" style={{ marginTop: '40px' }}>
                {/* <Link
                  className="d-flex justify-content-center sidebar-icon"
                  href="/"
                  passHref
                >
                  <Image
                    src="/assets/icons/new/homeIcon.svg"
                    className="img-fluid"
                    alt="Communication Hub"
                    height="28px"
                    width="28px" 
                  />
                </Link> */}
                {/* hidden home temporarily */}
                {/* <Link className="d-flex justify-content-start sidebar-icon" href="/home/Home" passHref>
                  {router.pathname === HomePage ? (
                    <div className="p-2 sidebar_active_gradient_bg d-flex w-100" style={{ cursor: 'pointer' }}>
                      <Image
                        src="/assets/icons/new/sidebar/home_new_inactive_icon.svg"
                        className="img-fluid"
                        alt="Communication Hub"
                        height="20px"
                        width="20px"
                      />
                      <span className="small-bold text-white mx-2">Home</span>
                    </div>
                  ) : (
                    <span className="d-flex px-2" style={{ cursor: 'pointer' }}>
                      <Image
                        src="/assets/icons/new/sidebar/home_new_inactive_icon.svg"
                        style={{ opacity: '0.5' }}
                        // onClick={(e)=>{localStorage.setItem("@sidebarCurrentTab", JSON.stringify("home"))}}
                        className="img-fluid"
                        alt="Communication Hub"
                        height="20px"
                        width="20px"
                      />
                      <span className="small-bold text-secondary mx-2">Home</span>
                    </span>
                  )}
                </Link> */}
                {/** hidden home temporarily */}
              </span>
              <center>
                {/* <hr
                  className="text-light"
                  style={{
                    width: "40%",
                    marginTop: "0px",
                    marginBottom: "14px",
                  }}
                /> */}
              </center>
              {/* ) : (
                ''
              )} */}
              {/* communication hub sub icons code ends */}
              {/* <center>
                <hr
                  className="text-light"
                  style={{
                    width: "40%",
                    marginTop: "14px",
                    marginBottom: "14px",
                  }}
                />
              </center> */}
              {/* <Popover
                isOpen={isKnowledgePopoverOpen}
                positions={["right"]} // preferred positions by priority
                align={["center"]}
                content={
                  <div className="react-tiny-popover-container">
                    <div
                      className="me-5 p-3"
                      style={{
                        zIndex: "99999",
                        borderRadius: "20px",
                        backgroundColor: COLORS.whiteColor,
                      }}
                    >
                      Hi! 😅 This service is under <br /> maintenance right now.
                    </div>
                  </div>
                }
              > */}
              <div
                onMouseEnter={() => setIsSettingPopoverOpen(true)}
                onMouseLeave={() => setIsSettingPopoverOpen(false)}
              >
                <center className="mb-2 d-flex align-items-center justify-content-start mt-3">
                  {router.pathname == MainPage ||
                  router.asPath == MainPage ||
                  router.asPath == TotalLivePage ||
                  router.asPath == TotalInteractionsPage ||
                  router.asPath == TotalBiifsPage ||
                  router.asPath == ChDashborderPage ||
                  router.asPath == TotalBriifUserPage ||
                  router.asPath == InteractionsDetail ||
                  router.asPath == AudioBriifCreationPage ||
                  router.asPath == VideoBriifCreationPage ||
                  router.pathname == RecordingFormPage ||
                  router.asPath == ChGeneralStats ||
                  router.query.dashboard == 'ch' ? (
                    <div
                      className="d-flex p-2 align-items-center justify-content-between sidebar_active_gradient_bg w-100"
                      style={{ cursor: 'pointer' }}
                    >
                      <Link className="d-flex justify-content-start align-items-center sidebar-icon" href="/">
                        <span className="d-flex align-items-center" onClick={() => handleChangeBriffTab('receive')}>
                          <span className="d-flex align-items-center" style={{ width: '20px' }}>
                            <Image
                              src="/assets/icons/new/sidebar/ic_communication_new_inactive_icon.svg"
                              className="img-fluid"
                              style={
                                data == 'receive' ||
                                data == 'sent' ||
                                data == 'archived' ||
                                data == 'draft' ||
                                data == 'ch' ||
                                router.asPath == TotalLivePage ||
                                router.asPath == TotalInteractionsPage ||
                                router.asPath == TotalBiifsPage ||
                                router.asPath == ChDashborderPage ||
                                router.asPath == InteractionsDetail ||
                                router.asPath == ChGeneralStats ||
                                router.asPath == TotalBriifUserPage
                                  ? { opacity: '0.5' }
                                  : {}
                              }
                              alt="Communication Hub"
                              height="20px"
                              width="20px"
                            />
                          </span>
                          <span className="small-bold text-white ms-2 me-2 text-nowrap" style={{ opacity: '0.9' }}>
                            Communication Hub
                          </span>
                        </span>
                      </Link>
                      {openCommunicationDropdown == true ? (
                        <Image
                          src="/assets/icons/new/sidebar/sidebar_up_arrow.svg"
                          // className="mx-4"
                          onClick={() => setOpenCommunicationDropdown(!openCommunicationDropdown)}
                          aria-controls="communication-tabs-collapse"
                          aria-expanded={openCommunicationDropdown}
                          alt="Communication Hub"
                          height="7px"
                          width="12px"
                        />
                      ) : (
                        <Image
                          onClick={() => setOpenCommunicationDropdown(!openCommunicationDropdown)}
                          aria-controls="communication-tabs-collapse"
                          aria-expanded={openCommunicationDropdown}
                          src="/assets/icons/new/sidebar/sidebar_down_arrow.svg"
                          // className="mx-4"
                          alt="Communication Hub"
                          height="7px"
                          width="12px"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className="d-flex px-2 align-items-center justify-content-between"
                      style={{ cursor: 'pointer' }}
                    >
                      <Link className="sidebar-icon" href="/">
                        <div
                          className="d-flex align-items-center justify-content-start"
                          onClick={() => handleChangeBriffTab('receive')}
                        >
                          <Image
                            src="/assets/icons/new/sidebar/ic_communication_new_inactive_icon.svg"
                            style={{ opacity: '0.5' }}
                            className="img-fluid"
                            alt="Communication Hub"
                            height="20px"
                            width="20px"
                          />
                          <span className="small-bold text-secondary ms-2 me-3 text-nowrap ">Communication Hub</span>
                        </div>
                      </Link>
                      <div className="d-flex align-items-center justify-content-end">
                        {openCommunicationDropdown ? (
                          <Image
                            src="/assets/icons/new/sidebar/sidebar_up_arrow.svg"
                            // className="mx-4"
                            onClick={() => setOpenCommunicationDropdown(!openCommunicationDropdown)}
                            aria-controls="communication-tabs-collapse"
                            aria-expanded={openCommunicationDropdown}
                            style={{ opacity: '0.5' }}
                            alt="Communication Hub"
                            height="7px"
                            width="12px"
                          />
                        ) : (
                          <Image
                            onClick={() => setOpenCommunicationDropdown(!openCommunicationDropdown)}
                            aria-controls="communication-tabs-collapse"
                            aria-expanded={openCommunicationDropdown}
                            src="/assets/icons/new/sidebar/sidebar_down_arrow.svg"
                            style={{ opacity: '0.5' }}
                            alt="Communication Hub"
                            height="7px"
                            width="12px"
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* </span> */}
                </center>
              </div>
              <Collapse in={openCommunicationDropdown}>
                <div id="communication-tabs-collapse" className="ps-5">
                  {(router.pathname === MainPage || router.asPath == MainPage || router.query.dashboard == 'ch') && (
                    <>
                      <div className="d-flex justify-content-start py-1 align-items-center position-relative">
                        {data == 'receive' && (
                          <Link href="/">
                            <span className="position-relative d-flex" style={{ cursor: 'pointer' }}>
                              <Image
                                src="/assets/icons/new/sidebar/recievedbriifs_new_inactive_icon.svg"
                                className="img-fluid sidelist "
                                alt="Picture of the author"
                                width="17px"
                                height="17px"
                              />
                              <span className="medium-large text-white mx-2">Received Briifs</span>
                            </span>
                          </Link>
                        )}
                        {data != 'receive' && (
                          <Link href="/">
                            <span
                              className=" position-relative d-flex align-items-center"
                              onClick={() => {
                                handleChangeBriffTab('receive');
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Image
                                src="/assets/icons/new/sidebar/recievedbriifs_new_inactive_icon.svg"
                                className="img-fluid sidelist"
                                style={{ opacity: '0.5' }}
                                alt="Picture of the author"
                                width="17px"
                                height="17px"
                              />
                              <span className="medium-large text-secondary mx-2">Received Briifs</span>
                            </span>
                          </Link>
                        )}
                        {activeButtonBriif == 'received' ? (
                          ''
                        ) : (
                          <span className="d-inline-flex align-items-center ">
                            <span
                              className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                              style={{
                                borderRadius: '100%',
                                backgroundColor: COLORS.orange,
                              }}
                            >
                              {props.socketReceivedBriifs}
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="d-flex justify-content-start align-items-center my-1 mt-3 position-relative">
                        {data == 'sent' && (
                          <span className="position-relative d-flex" style={{ cursor: 'pointer' }}>
                            <Image
                              src="/assets/icons/new/sidebar/sendbriifs_new_inactive_icon.svg"
                              className="img-fluid sidelist"
                              alt="Picture of the author"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-white mx-2">Sent Briifs</span>
                          </span>
                        )}
                        {data != 'sent' && (
                          <Link href="/">
                            <span
                              className="position-relative d-flex align-items-center"
                              onClick={() => {
                                handleChangeBriffTab('sent');
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Image
                                src="/assets/icons/new/sidebar/sendbriifs_new_inactive_icon.svg"
                                className="img-fluid sidelist"
                                style={{ opacity: '0.5' }}
                                alt="Picture of the author"
                                width="17px"
                                height="17px"
                              />
                              <span className="medium-large text-secondary mx-2">Sent Briifs</span>
                            </span>
                          </Link>
                        )}
                      </div>

                      <div className="d-flex align-items-center justify-content-start mt-2 position-relative">
                        {data == 'archived' && (
                          <span
                            className="position-relative d-flex align-items-center mt-2"
                            style={{ cursor: 'pointer' }}
                          >
                            <Image
                              src="/assets/icons/new/sidebar/archivedbriifs_new_inactive_icon.svg"
                              className="img-fluid sidelist"
                              alt="Archive Briif"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-white mx-2">Archived Briifs</span>
                          </span>
                        )}
                        {data != 'archived' && (
                          <Link href="/">
                            <span
                              className="position-relative d-flex align-items-center mt-2"
                              onClick={() => {
                                handleChangeBriffTab('archived');
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Image
                                src="/assets/icons/new/sidebar/archivedbriifs_new_inactive_icon.svg"
                                className="img-fluid sidelist"
                                style={{ opacity: '0.5' }}
                                alt="Archive Briif"
                                width="17px"
                                height="17px"
                              />
                              <span className="medium-large text-secondary mx-2">Archived Briifs</span>
                            </span>
                          </Link>
                        )}
                      </div>
                      <div className="d-flex justify-content-start align-items-center my-1 mt-3 position-relative">
                        {data == 'draft' && (
                          <span className="position-relative d-flex" style={{ cursor: 'pointer' }}>
                            <Image
                              src="/assets/icons/new/sidebar/draftActive.svg"
                              className="img-fluid sidelist"
                              alt="Picture of the author"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-white mx-2">Draft Briifs</span>
                          </span>
                        )}
                        {data != 'draft' && (
                          <Link href="/">
                            <span
                              className="position-relative d-flex align-items-center"
                              onClick={() => {
                                handleChangeBriffTab('draft');
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Image
                                src="/assets/icons/new/sidebar/draftActive.svg"
                                className="img-fluid sidelist"
                                style={{ opacity: '0.5' }}
                                alt="Picture of the author"
                                width="17px"
                                height="17px"
                              />
                              <span className="medium-large text-secondary mx-2">Draft Briifs</span>
                            </span>
                          </Link>
                        )}
                      </div>
                      <div className="d-flex justify-content-start align-items-center my-1 mt-3 position-relative">
                        {data == 'ch' ? (
                          <span className="position-relative d-flex" style={{ cursor: 'pointer' }}>
                            <Image
                              src="/assets/icons/new/new_dashboard_icon.svg"
                              className="img-fluid sidelist"
                              alt="Picture of the author"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-white mx-2">CH Dashboard</span>
                          </span>
                        ) : (
                          <Link href="/ch/dashboard/Statistics?dashboard=ch" passHref>
                            <span
                              className="position-relative d-flex align-items-center"
                              onClick={() => {
                                handleChangeBriffTab('ch');
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Image
                                src="/assets/icons/new/new_dashboard_icon.svg"
                                className="img-fluid sidelist"
                                style={{ opacity: '0.5' }}
                                alt="Picture of the author"
                                width="17px"
                                height="17px"
                              />
                              <span className="medium-large text-secondary mx-2">CH Dashboard</span>
                            </span>
                          </Link>
                        )}
                      </div>
                    </>
                  )}
                  {router.pathname !== MainPage && router.asPath !== MainPage && router.query.dashboard != 'ch' && (
                    <>
                      <div className="position-relative d-flex align-items-center">
                        <Link className="d-flex text-center justify-content-center" href="/">
                          <span
                            className="position-relative d-flex"
                            onClick={() => {
                              setReceiveClose(true);
                              dispatch(sidebar('receive'));
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Image
                              src="/assets/icons/new/sidebar/recievedbriifs_new_inactive_icon.svg"
                              className="img-fluid sidelist"
                              style={{ opacity: '0.5' }}
                              alt="Picture of the author"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-secondary mx-2">Received Briifs</span>
                          </span>
                        </Link>
                        {receiveClose == true ? (
                          ''
                        ) : (
                          <span className="d-inline-flex align-items-center mt-2">
                            <span
                              className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                              style={{
                                borderRadius: '100%',
                                backgroundColor: COLORS.orange,
                              }}
                            >
                              {props.socketReceivedBriifs}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="py-3 position-relative d-flex align-items-center">
                        <Link className="d-flex text-center justify-content-center my-1 position-relative" href="/">
                          <span
                            className="position-relative d-flex align-items-center"
                            onClick={() => {
                              setSendOpen(true);
                              dispatch(sidebar('sent'));
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Image
                              src="/assets/icons/new/sidebar/sendbriifs_new_inactive_icon.svg"
                              className="img-fluid sidelist"
                              style={{ opacity: '0.5' }}
                              alt="Picture of the author"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-secondary mx-2">Sent Briifs</span>
                          </span>
                        </Link>
                        {sendOpen == true ? (
                          ''
                        ) : (
                          <span className="d-inline-flex align-items-center">
                            <span
                              className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                              style={{
                                borderRadius: '100%',
                                backgroundColor: COLORS.orange,
                              }}
                            >
                              {props.sendBriifsData?.recive.length}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className=" position-relative d-flex align-items-center">
                        <Link className="d-flex text-center justify-content-center my-1 position-relative" href="/">
                          <span
                            className="position-relative d-flex align-items-center"
                            onClick={() => {
                              setArchiveOpen(true);
                              dispatch(sidebar('archived'));
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Image
                              src="/assets/icons/new/sidebar/archivedbriifs_new_inactive_icon.svg"
                              className="img-fluid sidelist"
                              style={{ opacity: '0.5' }}
                              alt="Archive Briif"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-secondary mx-2">Archived Briifs</span>
                          </span>
                        </Link>
                        {/* {archiveOpen == true ? (
                            ''
                          ) : (
                            <span className="d-inline-flex align-items-center">
                              <span
                                className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                                style={{
                                  borderRadius: '100%',
                                  backgroundColor: COLORS.orange,
                                }}
                              >
                                {props.archivedBriifsData?.archive.length}
                              </span>
                            </span>
                          )} */}
                      </div>
                      <div className=" py-3 position-relative d-flex align-items-center">
                        <Link href="/" className="d-flex text-center justify-content-center my-1 position-relative">
                          <span
                            className="position-relative d-flex align-items-center"
                            onClick={() => {
                              dispatch(sidebar('draft'));
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Image
                              src="/assets/icons/new/sidebar/draftActive.svg"
                              className="img-fluid sidelist"
                              style={{ opacity: '0.5' }}
                              alt="Draft Briifs"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-secondary mx-2">Draft Briifs</span>
                          </span>
                        </Link>
                        {/* {archiveOpen == true ? (
                            ''
                          ) : (
                            <span className="d-inline-flex align-items-center">
                              <span
                                className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                                style={{
                                  borderRadius: '100%',
                                  backgroundColor: COLORS.orange,
                                }}
                              >
                                {props.archivedBriifsData?.archive.length}
                              </span>
                            </span>
                          )} */}
                      </div>
                      <div className=" position-relative d-flex align-items-center">
                        <Link
                          className="d-flex text-center justify-content-center my-1 position-relative"
                          href="/ch/dashboard/Statistics?dashboard=ch"
                        >
                          <span
                            className="position-relative d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              dispatch(sidebar('ch'));
                            }}
                          >
                            <Image
                              src="/assets/icons/new/new_dashboard_icon.svg"
                              className="img-fluid sidelist"
                              style={{ opacity: '0.5' }}
                              alt="CH Dashbaord"
                              width="17px"
                              height="17px"
                            />
                            <span className="medium-large text-secondary mx-2">CH Dashboard</span>
                          </span>
                        </Link>
                        {/* {archiveOpen == true ? (
                            ''
                          ) : (
                            <span className="d-inline-flex align-items-center">
                              <span
                                className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                                style={{
                                  borderRadius: '100%',
                                  backgroundColor: COLORS.orange,
                                }}
                              >
                                {props.archivedBriifsData?.archive.length}
                              </span>
                            </span>
                          )} */}
                      </div>
                    </>
                  )}
                </div>
              </Collapse>
              <div
                onMouseEnter={() => setIsKnowledgePopoverOpen(true)}
                onMouseLeave={() => setIsKnowledgePopoverOpen(false)}
              >
                <center className="mb-2 mt-3 align-items-center d-flex justify-content-start">
                  {router.pathname == KnowledgeHomePage ||
                  router.pathname == ViewAllGiistsPage ||
                  router.pathname == PlayGiistsVideoPage ||
                  router.pathname == GiistCreationPage ||
                  router.pathname == SearchKnowledgePage ||
                  router.pathname == PublishedGiistsPage ||
                  router.asPath == UserProfilePage ||
                  router.asPath == TotalGiistUserPage ||
                  router.asPath == KhDashborderPage ||
                  router.asPath == TotalInteractionsGiistPage ||
                  router.asPath == TotalEngagementRatePage ||
                  router.pathname == TotalGiistPage ||
                  router.pathname == PreviewGiistPage ||
                  router.query.dashboard == 'kh' ? (
                    // || (router.pathname != MainPage && router.asPath != MainPage) )  ?
                    <span
                      className="d-flex align-items-center justify-content-between p-2 sidebar_active_gradient_bg w-100"
                      style={{ cursor: 'pointer' }}
                    >
                      <Link
                        className="d-flex align-items-center justify-content-start sidebar-icon"
                        // href="/kh/KnowledgeHome"
                        href={KnowledgeHomePage}
                        passHref
                      >
                        <span className="d-flex align-items-center">
                          <Image
                            src="/assets/icons/new/sidebar/knowledgehub_new_inactive_icon.svg"
                            className="img-fluid sidelist sidebar-icon"
                            alt="Knowledge Hub"
                            style={
                              router.pathname == PlayGiistsVideoPage ||
                              router.pathname == PublishedGiistsPage ||
                              router.pathname == UserProfilePage
                                ? { opacity: '0.5' }
                                : {}
                            }
                            width="16px"
                            height="16px"
                          />
                          <span className="small-bold text-white ms-2 me-3">Knowledge Hub</span>
                        </span>
                      </Link>
                      <div className="ms-4">
                        {openKnowledgeDropdown == true ? (
                          <Image
                            onClick={() => setOpenKnowledgeDropdown(!openKnowledgeDropdown)}
                            aria-controls="knowledge-tabs-collapse"
                            aria-expanded={openKnowledgeDropdown}
                            src="/assets/icons/new/sidebar/sidebar_up_arrow.svg"
                            alt="Communication Hub"
                            height="7px"
                            width="12px"
                          />
                        ) : (
                          <Image
                            onClick={() => setOpenKnowledgeDropdown(!openKnowledgeDropdown)}
                            aria-controls="knowledge-tabs-collapse"
                            aria-expanded={openKnowledgeDropdown}
                            src="/assets/icons/new/sidebar/sidebar_down_arrow.svg"
                            alt="Communication Hub"
                            height="7px"
                            width="12px"
                          />
                        )}
                      </div>
                    </span>
                  ) : (
                    <span
                      className="d-flex justify-content-between align-items-center px-2 w-100"
                      style={{ cursor: 'pointer' }}
                    >
                      <Link
                        className="d-flex align-items-center justify-content-start sidebar-icon"
                        // href="/kh/KnowledgeHome"
                        href={KnowledgeHomePage}
                        passHref
                      >
                        <span className="d-flex align-items-center">
                          <Image
                            src="/assets/icons/new/sidebar/knowledgehub_new_inactive_icon.svg"
                            style={{ opacity: '0.5' }}
                            // onClick={}
                            // onClick={(e)=>{localStorage.setItem("@sidebarCurrentTab", JSON.stringify("kh"))}}
                            className="img-fluid sidelist sidebar-icon"
                            alt="Knowledge Hub"
                            width="16px"
                            height="16px"
                          />
                          <span className="small-bold text-secondary ms-2 me-3">Knowledge Hub</span>
                        </span>
                      </Link>
                      <div className="ms-4">
                        {openKnowledgeDropdown == true ? (
                          <Image
                            onClick={() => setOpenKnowledgeDropdown(!openKnowledgeDropdown)}
                            aria-controls="knowledge-tabs-collapse"
                            aria-expanded={openKnowledgeDropdown}
                            style={{ opacity: '0.5' }}
                            src="/assets/icons/new/sidebar/sidebar_up_arrow.svg"
                            alt="Communication Hub"
                            height="7px"
                            width="12px"
                          />
                        ) : (
                          <Image
                            onClick={() => setOpenKnowledgeDropdown(!openKnowledgeDropdown)}
                            aria-controls="knowledge-tabs-collapse"
                            aria-expanded={openKnowledgeDropdown}
                            style={{ opacity: '0.5' }}
                            src="/assets/icons/new/sidebar/sidebar_down_arrow.svg"
                            alt="Communication Hub"
                            height="7px"
                            width="12px"
                          />
                        )}
                      </div>
                    </span>
                  )}
                  {/* </Link> */}
                </center>
              </div>
              {/* </Popover> */} {/* knowledge hub sub icons code starts */}
              {/* {router.pathname == KnowledgeHomePage ||
              router.pathname == ViewAllGiistsPage ||
              router.pathname == PlayGiistsVideoPage ||
              router.pathname == GiistCreationPage ||
              router.pathname == SearchKnowledgePage ||
              router.pathname == PublishedGiistsPage ||
              router.pathname == UserProfilePage ? ( */}
              <Collapse in={openKnowledgeDropdown}>
                <div id="knowledge-tabs-collapse">
                  <span>
                    {/* <center>
                      <Image
                            src="/assets/icons/new/dotted_line.svg"
                            className="img-fluid"
                            alt="dotted line"
                            height="16px"
                            width="8px"
                          />
                      </center> */}
                    <>
                      {/* <div className="d-flex text-center justify-content-center my-1 position-relative">
                    { router.pathname == UserProfilePage ?
                    <>
                    <span className="position-relative">
                      <Image
                        src="/assets/icons/new/active_profile.svg"
                        className="img-fluid sidelist "
                        alt="Picture of the author"
                        width="24px"
                        height="24px"
                      />
                    </span>
                  </> :
                      <>
                        <span className="position-relative">
                          <Image
                            onClick={() => {
                              router.push({pathname: '/combine/UserProfile', query: {user: id}});
                            }}
                            src="/assets/icons/new/profile.svg"
                            className="img-fluid sidelist "
                            alt="Picture of the author"
                            width="24px"
                            height="24px"
                          />
                        </span>
                      </>}
                    </div> */}
                      <div className="d-flex justify-content-start ms-5 py-1 align-items-center position-relative">
                        <>
                          <span className="position-relative d-flex">
                            {/* <Link href="/kh/published_giists/PublishedGiists" passHref> */}
                            <Link href={PublishedGiistsPage} passHref>
                              <span className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                <Image
                                  src="/assets/icons/new/sidebar/published_giist_new_icon.svg"
                                  className="img-fluid sidelist"
                                  style={{
                                    opacity:
                                      router.pathname == PublishedGiistsPage || router.pathname == PreviewGiistPage
                                        ? ''
                                        : '0.5',
                                  }}
                                  alt="Picture of the author"
                                  width="17px"
                                  height="17px"
                                />
                                <span
                                  className={`medium-large ${
                                    router.pathname == PublishedGiistsPage || router.pathname == PreviewGiistPage
                                      ? 'text-white'
                                      : 'text-secondary'
                                  }  mx-2 d-inline`}
                                >
                                  My Giists
                                </span>
                              </span>
                            </Link>
                          </span>
                        </>
                      </div>
                      <div className="mt-3 ps-5">
                        {router.query.dashboard == 'kh' ? (
                          // &&
                          // (router.asPath !== MainPage ||
                          //   router.pathname !== VideoBriifCreationPage ||
                          //   router.pathname !== RecordingFormPage ||
                          //   router.pathname !== AudioBriifCreationPage ||
                          //   router.pathname !== GlobalSearchPage ||
                          //   router.pathname !== UserProfilePage)
                          <>
                            <div className="d-flex justify-content-start mb-2" style={{ cursor: 'pointer' }}>
                              <Image
                                width="20px"
                                height="20px"
                                src="/assets/icons/new/new_dashboard_icon.svg"
                                className="img-fluid sidelist"
                                alt="Knowledge Hub"
                              />
                              <span className="medium-large text-white mx-2 d-inline">KH Dashboard</span>
                            </div>
                          </>
                        ) : (
                          // {(router.pathname !== StatisticsPage ||
                          //   router.pathname !== TotalBriifsPage ||
                          //   router.pathname !== BriifsInteractionsPage ||
                          //   router.pathname !== LiveSessionsPage ||
                          //   router.pathname !== GeneralStatsPage ||
                          //   router.pathname !== InteractionDetailPage ||
                          //   router.pathname !== ActiveUsersPage ||
                          //   dashboardLoading == false)
                          //   &&
                          //   (router.asPath === MainPage ||
                          //     router.pathname === VideoBriifCreationPage ||
                          //     router.pathname === RecordingFormPage ||
                          //     router.pathname === AudioBriifCreationPage ||
                          //     router.pathname === GlobalSearchPage ||
                          //     router.pathname === UserProfilePage)
                          <>
                            <Link href="/ch/dashboard/Statistics?dashboard=kh" passHref>
                              <div
                                className="d-flex justify-content-start mb-2"
                                onClick={() => {
                                  setDashboardLoading(true);
                                  // dispatch(sidebar('dashboard'));
                                  // localStorage.setItem("@sidebarCurrentTab", JSON.stringify("dashboard"))
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <Image
                                  width="18px"
                                  src="/assets/icons/new/new_dashboard_icon.svg"
                                  style={{ opacity: '0.5' }}
                                  className="img-fluid sidelist d-inline"
                                  alt="Knowledge Hub"
                                  height="18px"
                                />
                                <span className="medium-large text-secondary mx-2 d-inline">KH Dashboard</span>
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
                      {/* <div className="d-flex text-center justify-content-start my-1 position-relative">
                      <>
                        <span className="position-relative">
                          <Image
                            src="/assets/icons/new/documents.svg"
                            className="img-fluid sidelist "
                            alt="Picture of the author"
                            width="24px"
                            height="24px"
                          />
                        </span>
                      </>
                    </div> */}
                    </>
                  </span>
                </div>
              </Collapse>
              {/* ) : (
                ''
              )} */}
              {/* knowledge hub sub icons code ends */}
              {/* <center>
                <hr
                  className="text-light"
                  style={{
                    width: "40%",
                    marginTop: "14px",
                    marginBottom: "23px",
                  }}
                />
              </center> */}
              {/* hidden MediaLibrary temporarily */}
              {/* <div className="my-3 px-2 d-flex" style={{ cursor: 'pointer' }}>
                {router.pathname == MediaLibraryPage ? (
                  <span className="d-flex p-2 sidebar_active_gradient_bg w-100">
                    <Image
                      src="/assets/icons/new/sidebar/document_medialibrary_icon.svg"
                      className="img-fluid sidelist sidebar-icon"
                      alt="Search"
                      width="22px"
                      height="22px"
                    />
                    <span className="small-bold text-white mx-2">Media Library</span>
                  </span>
                ) : (
                  <Link href={MediaLibraryPage}>
                    <span className="d-flex ">
                      <Image
                        src="/assets/icons/new/sidebar/document_medialibrary_icon.svg"
                        className="img-fluid sidelist sidebar-icon"
                        style={{ opacity: '0.5' }}
                        alt="Search"
                        width="22px"
                        height="22px"
                      />
                      <span className="small-bold text-secondary mx-2">Media Library</span>
                    </span>
                  </Link>
                )}
              </div> */}
              {/* end hidden MediaLibrary temporarily */}
              {/**hidden Global Search Temporarily */}
              {/* <Popover
                isOpen={isGlobalSearchPopoverOpen}
                positions={['right']} // preferred positions by priority
                align={['center']}
                content={
                  <div className="react-tiny-popover-container">
                    <div
                      className="me-5 p-3"
                      style={{
                        zIndex: '1',
                        borderRadius: '20px',
                        backgroundColor: COLORS.whiteColor,
                      }}
                    >
                      Hi! 😅 This service is under <br /> maintenance right now.
                    </div>
                  </div>
                }
              >
                {router.pathname === GlobalSearchPage ? (
                  <div className="p-2 sidebar_active_gradient_bg d-flex w-100" style={{ cursor: 'pointer' }}>
                    <>
                      <Image
                        src="/assets/icons/new/sidebar/globalsearch_new_inactive_icon.svg"
                        className="img-fluid sidelist sidebar-icon"
                        alt="Global Search"
                        width="20px"
                        height="20px"
                      />
                      <span className="small-bold text-white mx-2">Search</span>
                    </>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      // localStorage.setItem("@sidebarCurrentTab", JSON.stringify("globalsearch"))
                      router.push({
                        pathname: '/combine/GlobalSearch',
                        // query: { handlePlayedBriif: props.handlePlayedBriif() }

                        // query:{
                        //   hello: "its me"
                        // }
                      });
                    }}
                  >
                    <div className="my-3 px-2 d-flex" style={{ cursor: 'pointer' }}>
                      <Image
                        src="/assets/icons/new/sidebar/globalsearch_new_inactive_icon.svg"
                        className="img-fluid sidelist sidebar-icon"
                        style={{ opacity: '0.5' }}
                        alt="Search"
                        width="20px"
                        height="20px"
                      />
                      <span className="small-bold text-secondary mx-2">Search</span>
                    </div>
                  </div>
                )}
              </Popover> */}
              {/**end hidden Global Search Temporarily */}
              {/* communication hub sub icons code start */}
              {/* {router.pathname === MainPage ||
              router.asPath == MainPage ||
              router.pathname === ActiveUsersPage ||
              router.pathname === BriifsInteractionsPage ||
              router.pathname === GeneralStatsPage ||
              router.pathname === InteractionDetailPage ||
              router.pathname === LiveSessionsPage ||
              router.pathname === StatisticsPage ||
              router.pathname === TotalBriifsPage ||
              router.pathname === AudioBriifCreationPage ||
              router.pathname === LiveMeetingsPage ||
              router.pathname === RecordingFormPage ||
              router.pathname === VideoBriifCreationPage ? ( */}
              {/**hidden Settings temporarily */}
              {/* <Popover
                isOpen={isSettingPopoverOpen}
                positions={['right']} // preferred positions by priority
                align={['center']}
                content={
                  <div className="react-tiny-popover-container shadow">
                    <div
                      className=" p-3"
                      style={{
                        zIndex: '1',
                        borderRadius: '20px',
                        backgroundColor: COLORS.whiteColor,
                      }}
                    >
                      Hi! 😅 This service is under maintenance right now.
                    </div>
                  </div>
                }
              > */}
              {(loginData?.role_id == '1' || loginData?.role_id == '6') && (
                <>
                  <div
                    onMouseEnter={() => setIsKnowledgePopoverOpen(true)}
                    onMouseLeave={() => setIsKnowledgePopoverOpen(false)}
                  >
                    <center className="mb-2 mt-3 align-items-center d-flex justify-content-start">
                      {router.pathname == SettingPage ||
                      router.pathname == GroupSetting ||
                      router.pathname == CategoriesPage ||
                      router.pathname == PlatformPage ||
                      router.pathname == UserPage ||
                      router.pathname == CreateGroup ? (
                        // || (router.pathname != MainPage && router.asPath != MainPage) )  ?
                        <span
                          className="d-flex align-items-center justify-content-between p-2 sidebar_active_gradient_bg w-100"
                          style={{ cursor: 'pointer' }}
                        >
                          <Link
                            className="d-flex align-items-center justify-content-start sidebar-icon"
                            href={GroupSetting}
                            passHref
                          >
                            <span className="d-flex align-items-center">
                              <Image
                                src="/assets/icons/new/sidebar/setting_new_inactive_icon.svg"
                                className="img-fluid sidelist sidebar-icon"
                                alt="Knowledge Hub"
                                width="16px"
                                height="16px"
                              />
                              <span className="small-bold text-white ms-2 me-3 text-nowrap">Settings</span>
                            </span>
                          </Link>
                          <div className="ms-4">
                            {openSettingDropdown == true ? (
                              <Image
                                onClick={() => setOpenSettingDropdown(!openSettingDropdown)}
                                aria-controls="knowledge-tabs-collapse"
                                aria-expanded={openSettingDropdown}
                                src="/assets/icons/new/sidebar/sidebar_up_arrow.svg"
                                alt="Communication Hub"
                                height="7px"
                                width="12px"
                              />
                            ) : (
                              <Image
                                onClick={() => setOpenSettingDropdown(!openSettingDropdown)}
                                aria-controls="knowledge-tabs-collapse"
                                aria-expanded={openSettingDropdown}
                                src="/assets/icons/new/sidebar/sidebar_down_arrow.svg"
                                alt="Communication Hub"
                                height="7px"
                                width="12px"
                              />
                            )}
                          </div>
                        </span>
                      ) : (
                        <span
                          className="d-flex align-items-center justify-content-between px-2 w-100"
                          style={{ cursor: 'pointer' }}
                        >
                          <Link
                            className="d-flex align-items-center justify-content-start sidebar-icon"
                            href={GroupSetting}
                            passHref
                          >
                            <span className="d-flex align-items-center">
                              <Image
                                src="/assets/icons/new/sidebar/setting_new_inactive_icon.svg"
                                style={{ opacity: '0.5' }}
                                className="img-fluid sidelist sidebar-icon"
                                alt="Knowledge Hub"
                                width="16px"
                                height="16px"
                              />
                              <span className="small-bold text-secondary ms-2 me-3 text-nowrap">Settings</span>
                            </span>
                          </Link>
                          <div className="ms-4">
                            {openSettingDropdown == true ? (
                              <Image
                                onClick={() => setOpenSettingDropdown(!openSettingDropdown)}
                                aria-controls="knowledge-tabs-collapse"
                                aria-expanded={openSettingDropdown}
                                style={{ opacity: '0.5' }}
                                src="/assets/icons/new/sidebar/sidebar_up_arrow.svg"
                                alt="Communication Hub"
                                height="7px"
                                width="12px"
                              />
                            ) : (
                              <Image
                                onClick={() => setOpenSettingDropdown(!openSettingDropdown)}
                                aria-controls="knowledge-tabs-collapse"
                                aria-expanded={openSettingDropdown}
                                style={{ opacity: '0.5' }}
                                src="/assets/icons/new/sidebar/sidebar_down_arrow.svg"
                                alt="Communication Hub"
                                height="7px"
                                width="12px"
                              />
                            )}
                          </div>
                        </span>
                      )}
                      {/* </Link> */}
                    </center>
                  </div>
                  <Collapse in={openSettingDropdown}>
                    <div id="setting-tabs-collapse">
                      <div className="d-flex justify-content-start ms-5 py-2 align-items-center position-relative">
                        <>
                          <span className="position-relative d-flex">
                            <Link href={GroupSetting} passHref>
                              <span className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                <Image
                                  src="/assets/images/groups.svg"
                                  className="img-fluid sidelist"
                                  style={{
                                    opacity: router.pathname == GroupSetting ? '' : '0.5',
                                  }}
                                  alt="Groups"
                                  width="24px"
                                  height="24px"
                                />
                                <span
                                  className={`medium-large ${
                                    router.pathname == GroupSetting ? 'text-white' : 'text-secondary'
                                  }  mx-1 d-inline`}
                                >
                                  Groups
                                </span>
                              </span>
                            </Link>
                          </span>
                        </>
                      </div>
                      <div className="d-flex justify-content-start ms-5 py-2 align-items-center position-relative">
                        <span className="position-relative d-flex">
                          <Link href={CategoriesPage} passHref>
                            <span className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                              <Image
                                src="/assets/images/categories.svg"
                                className="img-fluid sidelist"
                                style={{
                                  opacity: router.pathname == CategoriesPage ? '' : '0.5',
                                }}
                                alt="Categories"
                                width="24px"
                                height="24px"
                              />
                              <span
                                className={`medium-large ${
                                  router.pathname == CategoriesPage ? 'text-white' : 'text-secondary'
                                }  mx-1 d-inline`}
                              >
                                Categories
                              </span>
                            </span>
                          </Link>
                        </span>
                      </div>
                      {loginData?.role_id == '6' && (
                        <div className="d-flex justify-content-start ms-5 py-2 align-items-center position-relative">
                          <span className="position-relative d-flex">
                            <Link href={PlatformPage} passHref>
                              <span className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                <Image
                                  src="/assets/images/platform.svg"
                                  className="img-fluid sidelist"
                                  style={{
                                    opacity: router.pathname == PlatformPage ? '' : '0.5',
                                  }}
                                  alt="Platform"
                                  width="24px"
                                  height="24px"
                                />
                                <span
                                  className={`medium-large ${
                                    router.pathname == PlatformPage ? 'text-white' : 'text-secondary'
                                  }  mx-1 d-inline`}
                                >
                                  Platform
                                </span>
                              </span>
                            </Link>
                          </span>
                        </div>
                      )}
                      <div className="d-flex justify-content-start ms-5 py-2 align-items-center position-relative">
                        <>
                          <span className="position-relative d-flex">
                            <Link href={UserPage} passHref>
                              <span className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                <Image
                                  src="/assets/images/groups.svg"
                                  className="img-fluid sidelist"
                                  style={{
                                    opacity: router.pathname == UserPage ? '' : '0.5',
                                  }}
                                  alt="Groups"
                                  width="24px"
                                  height="24px"
                                />
                                <span
                                  className={`medium-large ${
                                    router.pathname == UserPage ? 'text-white' : 'text-secondary'
                                  }  mx-2 d-inline`}
                                >
                                  Users
                                </span>
                              </span>
                            </Link>
                          </span>
                        </>
                      </div>
                    </div>
                  </Collapse>
                </>
              )}
              {/**end hidden Settings temporarily */}
              {/* <center>
                <hr
                  className="text-light"
                  style={{
                    width: '40%',
                    marginTop: '0px',
                    marginBottom: '14px',
                  }}
                />
              </center> */}
              {/* <center>
                <hr
                  className="text-light"
                  style={{
                    width: '40%',
                    marginTop: '14px',
                    marginBottom: '23px',
                  }}
                />
              </center> */}
              {/* {(router.pathname == KnowledgeHomePage 
              || router.pathname == ViewAllGiistsPage 
              || router.pathname == PlayGiistsVideoPage
              || router.pathname == GiistCreationPage
              || router.pathname == SearchKnowledgePage
              || router.pathname == PublishedGiistsPage
              || router.pathname == UserProfilePage) ?
              <center>
              <div className="side_gradient_bg">
                
              </div>
            </center> 
            :
              ( */}
              {isMobile == 'Desktop' && (
                <Popover
                  isOpen={isAddPopoverOpen}
                  onClickOutside={() => setIsAddPopoverOpen(false)}
                  positions={['right']} // preferred positions by priority
                  align={['center']}
                  content={({ position, childRect, popoverRect }) => (
                    <ArrowContainer
                      position={'right'}
                      childRect={childRect.height}
                      popoverRect={popoverRect.height}
                      arrowColor={'blue'}
                      arrowSize={10}
                      arrowStyle={{
                        zIndex: '1',
                        borderRightColor: COLORS.tooltipColor,
                        marginTop: '280px',
                        opacity: 0.9,
                      }}
                      className="popover-arrow-container "
                      arrowClassName="popover-arrow"
                    >
                      <div className="react-tiny-popover-container mt-3" style={{ left: '30px' }}>
                        <div
                          className="me-5 p-2"
                          style={{
                            color: COLORS.whiteColor,
                            zIndex: '1',
                            borderRadius: '10px',
                            backgroundColor: COLORS.tooltipColor,
                          }}
                        >
                          <div className="border p-2 me-0 mb-2">
                            <p className="medium-large text-white">Create Briif </p>
                            <div className="row mt-2">
                              <div className="col-6 mx-auto text-center" onClick={() => setIsAddPopoverOpen(false)}>
                                <Link href="/ch/VideoBriifCreation" passHref>
                                  <Image src="/assets/icons/new/ic_video.svg" width="40px" height="40px" alt="Webcam" />
                                </Link>
                                <p className="text-white mb-0 light-small">Webcam</p>
                              </div>
                              <div className="col-6 mx-auto text-center" onClick={() => setIsAddPopoverOpen(false)}>
                                <Image
                                  src="/assets/icons/new/webcam.svg"
                                  width="40px"
                                  height="40px"
                                  alt="Screencast"
                                  onClick={() => setIsScreenRecordingModalOpen(true)}
                                />
                                <p className="text-white mb-0 light-small">Screencast</p>
                              </div>
                              <div className="col-6 mt-3 mx-3 text-start" onClick={() => setIsAddPopoverOpen(false)}>
                                <Link href="/ch/AudioBriifCreation" passHref as="/ch/AudioBriifCreation">
                                  <Image src="/assets/icons/new/ic_audio.svg" width="40px" height="40px" alt="audio" />
                                </Link>
                                <p className="text-white mb-0 light-small">Audio</p>
                              </div>

                              {/* <div
                                className="col-6 mt-4 mx-auto text-center"
                                onClick={() => setIsAddPopoverOpen(false)}
                              >
                                <Image
                                  src="/assets/icons/new/live-session.svg"
                                  width="40px"
                                  height="40px"
                                  alt="live"
                                  onClick={() => setModalOpen(true)}
                                />
                                <p className="text-white mb-0 light-small">Go Live</p>
                              </div> */}
                            </div>
                          </div>
                          <div className="border p-2 me-0 mb-2">
                            <p className="medium-large text-white">Create Giist </p>
                            <Link className="row mt-4" href="/kh/GiistCreation">
                              <div className="col ms-3 mt-2" onClick={() => setIsAddPopoverOpen(false)}>
                                <Image
                                  src="/assets/icons/new/sidebar/giistcreation_icon.svg"
                                  width="40px"
                                  height="40px"
                                  alt="video"
                                />
                                {/* </Link> */}
                                <p className="text-white mb-0 light-small"> Create</p>
                              </div>
                            </Link>
                          </div>
                          <div className="border p-2 me-0 ">
                            <p className="medium-large text-white">Meet Up </p>
                            {/* ===================================== >live conference code */}
                            <div className="col-6 mt-3 mx-3 text-start" onClick={() => setIsAddPopoverOpen(false)}>
                              {/* <Link
                                href={`/ch/liveconference/${channelToken}`}
                                passHref
                                as={`/ch/liveconference/${channelToken}`}
                              > */}
                              <Image
                                src="/assets/icons/new/ic_cam-bubble.svg"
                                width="40px"
                                height="40px"
                                alt="audio"
                                onClick={async () => {
                                  const tokenParam = { channel: channelToken };
                                  await dispatch(CreateConference(tokenParam, onTokenSuccess, onTokenError));
                                }}
                              />
                              {/* </Link> */}
                              <p className="text-white mb-0 light-small">Web Conference</p>
                            </div>
                            {/* live conference code end */}
                          </div>
                        </div>
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <div onClick={() => setIsAddPopoverOpen(!isAddPopoverOpen)}>
                    <center>
                      <div
                        className="mt-5 side_gradient_bg justify-content-center align-items-center d-flex mx-2"
                        style={{ borderRadius: '10px', height: '52px', cursor: 'pointer' }}
                      >
                        <Image
                          src="/assets/icons/new/sidebar/create_new_icon.svg"
                          width="24px"
                          className="img-fluid sidelist"
                          alt="Add Briif"
                          height="24px"
                        />
                        <p className="semibold d-inline text-white m-0 px-2">Create</p>
                      </div>
                      {/* <Image
                      src="/assets/img/add_icon.svg"
                      width="70px"
                      className="img-fluid sidelist"
                      alt="Add Briif"
                      height="47px"
                      // weight="47px"
                    /> */}
                    </center>
                  </div>
                </Popover>
              )}
              {isMobile == 'Mobile' && (
                <div onClick={() => setIsAddPopoverModalOpen(!isAddPopoverModalOpen)}>
                  <center>
                    <div
                      className="mt-5 side_gradient_bg justify-content-center align-items-center d-flex mx-2"
                      style={{ borderRadius: '10px', height: '52px', cursor: 'pointer' }}
                    >
                      <Image
                        src="/assets/icons/new/sidebar/create_new_icon.svg"
                        width="24px"
                        className="img-fluid sidelist"
                        alt="Add Briif"
                        height="24px"
                      />
                      <p className="semibold d-inline text-white m-0 px-2"> Create</p>
                    </div>
                  </center>
                </div>
              )}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      {startRecording == true || screenRecording == 'true' || isScreenRecordingModalOpen == true ? (
        <ScreenRecording
          setTime={setTime}
          setScreenBlobUrl={setScreenBlobUrl}
          screenModalOpen={screenModalOpen}
          setScreenModalOpen={setScreenModalOpen}
          startRecording={startRecording}
          setStartRecording={setStartRecording}
          modalOpen={isScreenRecordingModalOpen}
          handleModalClose={() => setIsScreenRecordingModalOpen(false)}
          setSetduration={setSetduration}
          image={<Image src="/assets/images/screencast-modal.svg" height={70} width={70} alt="trash" />}
          title={'Screen Recording'}
          description={'After clicking on “Start Recording”, your screen recording will be started'}
          button1={'Start Recording'}
        />
      ) : (
        ''
      )}
    </>
  );
};
export default Sidebar;
