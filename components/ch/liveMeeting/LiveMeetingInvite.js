import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AgoraRTC from 'agora-rtc-sdk-ng';
import MeetLinkModal from '../../modals/livemodal/MeetLinkModal';
import EndLiveMeetingModal from '../../modals/livemodal/EndLiveMeetingModal';
import ShareScreenPopup from '../../modals/livemodal/ShareScreenPopup';

// drawer imports
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LiveMeetingDrawerContent from '../meeting/LiveMeetingDrawerContent';
import UserContainer from './component/UserContainer';
import MainContainer from './component/MainContainer';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { EventEmitter } from 'events';
import ConferenceDetailModal from '../../modals/conferencemodal/ConferenceDetailModal';
import ConferenceUsersList from '../../../redux/actions/ConferenceUsersList';
import { URL } from '../../../public/assets/path/path';
import SuccessModal from '../../modals/simplemodal/SuccessModal';
import DotProgress from '../../DotProgress';
import { JoinMeeting } from '../../../redux/actions/JoinMeeting';
import { RecordConferenceStart } from '../../../redux/actions/RecordConferenceStart';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';
import ArrowTooltips from '../../modals/tooltip/Tooltip';
import CustomToast from '../../combine/customtoast/CustomToast';
import useSocket from '../../../hooks/useSocket';
import { useCallback } from 'react';

const eventEmitter = new EventEmitter();
// drawer styles and methods
const drawerWidth = 380;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'hidden',
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

function LiveMeetingInvite({ meetingChannel }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const socket = useSocket();

  const pinningRef = useRef([]);

  const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
  const conferenceUserData = JSON.parse(localStorage.getItem('@ConferenceUser'));
  const conferenceRemoteUserData = JSON.parse(localStorage.getItem('@ConferenceRemoteUser'));

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const get_conference_data = useSelector((state) => state.get_conference_data);
  const responseObject = get_conference_data?.get_conference_data;

  const conference_users = useSelector((state) => state.conference_users);
  let invitedUsers = conference_users?.fetching_conference_users?.data?.invited;
  let joinedUsers = conference_users?.fetching_conference_users?.data?.joined;

  const join_confernce_data = useSelector((state) => state.join_confernce_data);
  const invited_user_join = join_confernce_data?.join_confernce_data?.data;

  const [isHost, setIsHost] = useState(
    conferenceUserData?.is_host == 1 || (conferenceRemoteUserData && conferenceRemoteUserData?.is_host == 1)
      ? true
      : false,
  );

  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
  const appChannel = meetingChannel;

  let { first_name, last_name } = JSON.parse(localStorage.getItem('@LoginData'));

  const [iscallStarted, setIscallStarted] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openpplDrawer, setOpenpplDrawer] = useState(false);
  const [meetLinkDrawer, setMeetLinkDrawer] = useState(false);
  const [text, setText] = useState(false);
  const [dotProgressLoading, setDotProgressLoading] = useState(true);
  const [SuccessModalData, setSuccessModalData] = useState({
    image: '',
    title: '',
    description: '',
  });

  const [commentToast, setCommentToast] = useState({
    openToast: false,
    badge: false,
    vertical: 'top',
    horizontal: 'center',
    commentObject: null,
  });

  const handleDrawerOpen = () => {
    setMeetLinkDrawer(false);
    setOpenpplDrawer(false);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setMeetLinkDrawer(false);
    setOpenpplDrawer(false);
  };

  const handlepplDrawerOpen = () => {
    setOpenDrawer(false);
    setMeetLinkDrawer(false);
    setOpenpplDrawer(true);
  };

  const handlepplDrawerClose = () => {
    setOpenDrawer(false);
    setMeetLinkDrawer(false);
    setOpenpplDrawer(false);
  };

  const handlemeetLinkDrawerOpen = () => {
    setOpenDrawer(false);
    setOpenpplDrawer(false);
    setMeetLinkDrawer(true);
  };

  const handlemeetLinkDrawerClose = () => {
    setOpenDrawer(false);
    setMeetLinkDrawer(false);
    setOpenpplDrawer(false);
  };

  // original code

  const [openRecordedModal, setOpenRecordedModal] = useState(false);
  const handleRecordedModalOpen = () => setOpenRecordedModal(true);
  const handleRecordedModalClose = () => setOpenRecordedModal(false);

  const token = !conferenceRemoteUserData ? conferenceUserData?.token : conferenceRemoteUserData?.token;
  const token2 = !conferenceRemoteUserData ? conferenceUserData?.token2 : conferenceRemoteUserData?.token2;

  const [arrayObjectsPlayer, setarrayObjectsPlayer] = useState([]);
  const [joinedUser, setJoinedUser] = useState([]);
  const [uid, setUid] = useState(!conferenceRemoteUserData ? conferenceUserData?.uid : conferenceRemoteUserData?.uid);
  const [uid2, setUid2] = useState(
    !conferenceRemoteUserData ? conferenceUserData?.uid2 : conferenceRemoteUserData?.uid2,
  );

  const [localAudioTrack, setlocalAudioTrack] = useState(null);
  const [localVideoTrack, setlocalVideoTrack] = useState(null);
  const [localScreenTrack, setlocalScreenTrack] = useState(null);
  const [micMuted, setmicMuted] = useState(false);
  const [videoMuted, setvideoMuted] = useState(false);
  const [pinned, setPinned] = useState(null);
  const [agoraEngine2, setAgoraEngine2] = useState(null);

  let globalParams = {
    video: null,
    audio: null,
    screen: null,
    pinned: null,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openScreenPopup = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // end Live Meeting
  const [endLiveModal, setEndLiveModal] = useState(false);
  const endLiveMeeting = () => {
    setEndLiveModal(true);
  };

  AgoraRTC.setLogLevel(4);

  const agoraEngine = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  // Switch media input device
  AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
    // When plugging in a device, switch to a device that is newly plugged in.
    if (changedDevice.state === 'ACTIVE') {
      localAudioTrack.setDevice(changedDevice.device.deviceId);
      // Switch to an existing device when the current device is unplugged.
    } else if (changedDevice.device.label === localAudioTrack.getTrackLabel()) {
      const oldMicrophones = await AgoraRTC.getMicrophones();
      oldMicrophones[0] && localAudioTrack.setDevice(oldMicrophones[0].deviceId);
    }
  };
  AgoraRTC.onCameraChanged = async (changedDevice) => {
    // When plugging in a device, switch to a device that is newly plugged in.
    if (changedDevice.state === 'ACTIVE') {
      localVideoTrack.setDevice(changedDevice.device.deviceId);
      // Switch to an existing device when the current device is unplugged.
    } else if (changedDevice.device.label === localVideoTrack.getTrackLabel()) {
      const oldCameras = await AgoraRTC.getCameras();
      oldCameras[0] && localVideoTrack.setDevice(oldCameras[0].deviceId);
    }
  };

  agoraEngine.on('user-published', async (user, mediaType) => {
    await agoraEngine.subscribe(user, mediaType);
    setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
    console.log([...agoraEngine.remoteUsers], user, 'globalParams.published');
  });
  agoraEngine.on('user-unpublished', async (user, mediaType) => {
    await agoraEngine.unsubscribe(user, mediaType);
    setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
    console.log([...agoraEngine.remoteUsers], user, 'globalParams.unpublished');
  });

  agoraEngine.on('user-joined', (user) => {
    setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
    console.log([...agoraEngine.remoteUsers], user, 'globalParams.joined');
  });
  agoraEngine.on('user-left', (user) => {
    setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
    console.log([...agoraEngine.remoteUsers], user, 'globalParams.left');
    if (globalParams.pinned && globalParams.pinned.uid == user.uid) {
      if (agoraEngine.remoteUsers.length) {
        setPinned(agoraEngine.remoteUsers[0]);
        globalParams.pinned = agoraEngine.remoteUsers[0];
      } else {
        setPinned({
          videoTrack: globalParams.video,
          uid: uid,
        });
        globalParams.pinned = {
          videoTrack: globalParams.video,
          uid: uid,
        };
      }
    }
  });

  agoraEngine.on('connection-state-change', async (user) => {
    setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
    console.log([...agoraEngine.remoteUsers], user, 'globalParams.4');
  });

  async function join() {
    await agoraEngine.join(appId, appChannel, token, uid);
    setDotProgressLoading(false);
    let laudio = await AgoraRTC.createMicrophoneAudioTrack();
    let lvideo = await AgoraRTC.createCameraVideoTrack();
    setlocalAudioTrack(laudio);
    globalParams.audio = laudio;
    setlocalVideoTrack(lvideo);
    globalParams.video = lvideo;

    setPinned({
      videoTrack: lvideo,
      uid: uid,
    });

    globalParams.pinned = {
      videoTrack: lvideo,
      uid: uid,
    };

    await agoraEngine.publish([laudio, lvideo]);
    setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
  }

  const screenSharingHandler = async () => {
    try {
      if (!agoraEngine2) {
        let a2 = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
        setAgoraEngine2(a2);
        // await a2.join(appId, appChannel, token, uid2);
        await a2.join(appId, appChannel, token2, uid2);
        let lScreenTrack = await AgoraRTC.createScreenVideoTrack();
        setlocalScreenTrack(lScreenTrack);
        globalParams.screen = lScreenTrack;
        await a2.publish([lScreenTrack]);
      } else {
        try {
          localScreenTrack.close();
          await agoraEngine2.leave();
          setlocalScreenTrack(null);
          setAgoraEngine2(null);
        } catch (error) {
          console.error(error, 'error in screen sharing cancel');
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  const muteVideoHandler = async () => {
    if (!videoMuted) {
      // Mute the local video.
      if (pinned && pinned.uid == uid) {
        setPinned(null);
        globalParams.pinned = null;
      }
      localVideoTrack.setEnabled(false);
      setvideoMuted(true);
    } else {
      if ((pinned && pinned.uid == uid) || !pinned) {
        setTimeout(() => {
          setPinned({
            videoTrack: localVideoTrack,
            uid: uid,
          });
          globalParams.pinned = {
            videoTrack: localVideoTrack,
            uid: uid,
          };
          for (let index = 0; index < pinningRef.length; index++) {
            const element = pinningRef[index];

            if (globalParams.pinned && globalParams.uid == user?.uid) {
              const customData = element.current.dataset.uid;
            }
          }
        }, 1000);
      }
      localVideoTrack.setEnabled(true);
      setvideoMuted(false);
    }
  };

  const muteAudioHandler = async () => {
    if (!micMuted) {
      await localAudioTrack.setEnabled(false);
      setmicMuted(true);
    } else {
      await localAudioTrack.setEnabled(true);
      setmicMuted(false);
    }
  };

  const leaveHandler = async () => {
    try {
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
      }
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
      }
      if (agoraEngine) {
        await agoraEngine?.leave();
        if (agoraEngine2) {
          await agoraEngine2?.leave();
        }
      }
      router.replace('/').then(() => router.reload());
    } catch (error) {
      alert(error);
    }
  };

  const leaveInRecordingCase = async () => {
    try {
      if (localAudioTrack && localVideoTrack) {
        localAudioTrack.stop();
        localVideoTrack.stop();
        localAudioTrack.close();
        localVideoTrack.close();
        await agoraEngine?.leave();
      }

      return;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    eventEmitter.on('pinned', (data) => {
      globalParams.pinned = data;
      setPinned(data);
    });
    return () => {
      eventEmitter.off('pinned', () => {});
    };
  }, []);

  useEffect(async () => {
    if (!iscallStarted) {
      uid == conferenceUserData?.uid ? '' : await joinConference(meetingChannel);
      if (conferenceUserData) {
        await join();
      } else {
        localStorage.removeItem('@ConferenceUser');
        await join();
      }
      /**
       * the user that has link and is not loggedin, he should be redirected to login first [channel name should be sent to login page]
       * as he login, he will come to conference as a new joinee
       */
      // if (!LoginData && !conferenceUserData) {
      //   join()
      // }
      handleAllusersLists(meetingChannel);

      setIscallStarted(true);
    }
  }, []);

  // console.debug('arrayObjectsPlayer', arrayObjectsPlayer);

  const joinConference = async (meetingToken) => {
    await dispatch(JoinMeeting(meetingToken, onJoinPopleSuccess, onJoinPopleError));
  };
  const onJoinPopleSuccess = (res) => {
    localStorage.removeItem('@ConferenceUser');
    localStorage.setItem('@ConferenceRemoteUser', JSON.stringify(res?.data));
  };
  const onJoinPopleError = (err) => {
    console.log(err, 'error of joining');
    // setSuccessErrorMessage({
    //   heading: err && 'Blocked',
    //   message: err && 'Sorry, You have been blocked from this conference. You cannot join this conference again.',
    //   buttonText: 'Okay',
    //   image: '/assets/icons/danger.svg',
    // });
    // setModalShowErrorSuccess(true);
  };

  const handleAllusersLists = (channelName) => {
    dispatch(ConferenceUsersList(channelName, onFetchUsersSuccess, onFetchUsersError));
  };

  const onFetchUsersSuccess = (res) => {
    console.log(res);
    // alert("hyyyyy")
  };
  const onFetchUsersError = (err) => {
    console.log(err);
  };

  const [removedUserId, setRemovedUserId] = useState();
  const [modalInput, setmodalInput] = useState(false);

  const [heightofWindow, setHeightofWindow] = useState(window.innerHeight);
  const [widthofWindow, setWidthofWindow] = useState(window.innerWidth);

  const [isHovered, setIsHovered] = useState(false);
  const [userIdtobeRemoved, setUserIdtobeRemoved] = useState();

  const removeUserSocketHandler = (id) => {
    if (LoginData?.id == id.user_id) {
      setRemovedUserId(id.user_id);
      console.debug('arrayObjectsPlayer', arrayObjectsPlayer);
      setmodalInput(true);

      setSuccessModalData({
        image: '/assets/icons/danger.svg',
        title: 'Alert',
        description: 'Host removed you , Go to home sceen',
      });
      handleAllusersLists(meetingChannel);
      setTimeout(() => {
        setmodalInput(false);
        router.replace('/').then(() => router.reload());
      }, 4000);
    } else {
      handleAllusersLists(meetingChannel);
      console.debug('arrayObjectsPlayer 2', arrayObjectsPlayer);
    }
  };

  const leftUserSocketHanlder = async (leftuser) => {
    if (LoginData?.id == leftuser.user_id) {
      await leaveHandler();
      setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
    } else {
      const filteredJoinedUsers = joinedUsers?.find((user) => user.id == leftuser.user_id);

      const foundUser = arrayObjectsPlayer.filter((user) => user?.uid != filteredJoinedUsers?.uid && user.id != uid);

      console.log(foundUser, 'foundUser foundUser');

      // if (foundUser) {
      setarrayObjectsPlayer([foundUser]);
      // }
    }
  };

  useEffect(() => {
    socket?.on(meetingChannel + '_removed', removeUserSocketHandler);
    socket?.on(meetingChannel + '_left', leftUserSocketHanlder);

    return () => {
      socket?.off(meetingChannel + '_removed', removeUserSocketHandler);
      socket?.off(meetingChannel + '_left', leftUserSocketHanlder);
    };
  }, [socket]);

  useEffect(() => {
    function handleResize() {
      setHeightofWindow(window.innerHeight);
      setWidthofWindow(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthofWindow, heightofWindow]);

  const removeCall = useCallback(() => {
    if (removedUserId) {
      removeUser();
    }
  }, [removedUserId]);

  const removeUser = async () => {
    try {
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
      }
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
      }
      if (agoraEngine) {
        await agoraEngine?.leave();
        if (agoraEngine2) {
          await agoraEngine2?.leave();
        }
      }
    } catch (error) {
      console.log(error, 'Error Removing user ');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [showRecordingButton, setShowRecordingButton] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState(false);

  const handleRecording = () => {
    const recordingBody = {
      channel: meetingChannel,
    };
    dispatch(RecordConferenceStart(recordingBody, onRecordingStartSuccess, onRecordingStartError));
  };

  const onRecordingStartSuccess = (res) => {
    setRecordingStatus(true);
    setmodalInput(true);
    setSuccessModalData({
      image: '/assets/icons/new/checkedtick.svg',
      title: 'Recording Started',
      description: 'Your recording has been started',
    });
  };
  const onRecordingStartError = (err) => {
    setRecordingStatus(false);
    // setrecordingStatus(false);
    // setStartRecording(false);
  };

  const stopRecording = () => {
    let data = JSON.stringify({
      channel: meetingChannel,
    });

    GlobalApiCall(
      `${URL.khbaseUrl}conference/recording/end`,
      'put',
      data,
      (res) => {
        setRecordingStatus('disabled');
        setmodalInput(true);
        setShowRecordingButton(false);
        setSuccessModalData({
          image: '/assets/icons/new/checkedtick.svg',
          title: 'SuccessFully Recorded',
          description: 'Your Video has been recorded and uploaded',
        });
      },
      (err) => {
        setmodalInput(true);
        setSuccessModalData({
          image: '/assets/icons/danger.svg',
          title: 'Alert',
          description: 'Your Video is not recordedv due to some error',
        });
      },
    );
  };

  const { vertical, horizontal, openToast, badge, commentObject } = commentToast;

  const toastOpeningHandler = async (newState) => {
    setCommentToast({ ...newState, openToast: true, badge: true });
  };

  const handleCommentToastClose = () => {
    setCommentToast({ ...commentToast, openToast: false });
  };

  return (
    <>
      {dotProgressLoading == true && <DotProgress />}
      <Box sx={{ display: 'flex' }}>
        <Main
          open={openpplDrawer ? openpplDrawer : openDrawer ? openDrawer : meetLinkDrawer}
          sx={{ width: '100%', height: '100vh' }}
        >
          <div
            className={'p-3'}
            style={{
              position: 'relative',
              backgroundColor: '#303548',
              minHeight: '100vh',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div className=" d-flex align-items-center">
              <div className=" ms-1">
                <Image src="/assets/icons/backArrow.png" height={15} width={10} alt="backIcon" />
              </div>
              <div className="w-100" style={{ marginLeft: '37px' }}>
                <div className="regular-small mt-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  End-to-end Science Project
                </div>
                <div className="text-white regular-xsmall mt-1">QA Video session</div>
              </div>
            </div>
            <div
              className={!openDrawer && !openpplDrawer && !meetLinkDrawer ? 'px-5 py-2 ' : 'px-1 py-2 '}
              style={{
                display: 'block',
                margin: 'auto',
                width: openDrawer || openpplDrawer || meetLinkDrawer ? '70%' : '55%',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#444a60', borderRadius: '10px' }}>
                {pinned ? (
                  <MainContainer pinned={pinned} />
                ) : (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <Image
                      className="rounded-circle"
                      src="/assets/icons/new/user.svg"
                      height={150}
                      width={150}
                      alt="backIcon"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-2 ">
              <div
                className="scrollUserContainer"
                style={{
                  width: openpplDrawer || openDrawer || meetLinkDrawer ? `${widthofWindow - drawerWidth}px` : '100%',
                }}
              >
                {uid &&
                  arrayObjectsPlayer
                    .concat({
                      audioTrack: localAudioTrack,
                      videoTrack: localVideoTrack,
                      uid: uid,
                    })
                    .map((player, index) => {
                      const result = joinedUsers?.find((user) => user.uid == player.uid || user.uid2 == player.uid);

                      return (
                        <div
                          ref={(el) => (pinningRef.current[index] = el)}
                          data-uid={`${player.uid}`}
                          className="col-md-3 mx-2"
                          style={{
                            borderRadius: '12px',
                            position: 'relative',
                            height: '130px',
                            width: '245px',
                            background: 'black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          key={player.uid}
                          onMouseOver={handleMouseEnter}
                        >
                          <UserContainer
                            videoTrack={player?.videoTrack}
                            audioTrack={player.audioTrack}
                            uid={player.uid}
                            localUserUid={uid}
                            eventEmitter={eventEmitter}
                            videoMuted={videoMuted}
                          />
                          <Image
                            src={
                              result?.image == null
                                ? '/assets/icons/new/user.svg'
                                : `${awsLink}users/profileImages/${result?.image}`
                            }
                            height={70}
                            width={70}
                            alt=""
                            style={{
                              position: 'absolute',
                              borderRadius: '50%',
                              zIndex:
                                (conferenceUserData?.uid == uid || conferenceRemoteUserData?.uid == uid) &&
                                player?.uid == uid &&
                                videoMuted == true
                                  ? '1'
                                  : '0',
                            }}
                          />

                          {player?._audio_muted_ == true || (player?.uid == uid && micMuted == true) ? (
                            <div
                              style={{
                                position: 'absolute',
                                top: '10%',
                                right: '5%',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '12px',
                                lineHeight: '20px',
                                zIndex: '5',
                              }}
                            >
                              <Image src={'/assets/icons/meetingIcons/muted-icon.svg'} height={20} width={20} alt="" />
                            </div>
                          ) : null}

                          {isHovered && (
                            <div
                              className="position-absolute"
                              style={{ top: '5%', right: '2%' }}
                              onMouseOut={handleMouseLeave}
                            >
                              <Image src="/assets/icons/meetingIcons/pin.svg" height={24} width={24} alt="" />
                            </div>
                          )}

                          <div
                            style={{
                              position: 'absolute',
                              bottom: '5%',
                              left: '5%',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '12px',
                              lineHeight: '20px',
                              zIndex: '5',
                            }}
                          >
                            {player.uid == uid
                              ? '(You) ' + first_name + ' ' + last_name
                              : conference_users.status && result
                              ? result?.first_name + ' ' + result?.last_name
                              : ''}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>

            <div className="px-4 position-absolute" style={{ bottom: '1%', width: '100%' }}>
              <div className="d-flex align-items-center justify-content-center">
                {/* temporarily commented */}
                {/* <div className="px-2">
                  {meetLinkDrawer == true ? (
                    <ArrowTooltips title="Copylink" placement="top">
                      <Image
                        className="rounded-circle"
                        src="/assets/icons/new/active-3dots-menu.svg"
                        height={40}
                        width={40}
                        alt="threeDots"
                        onClick={() => {
                          handlemeetLinkDrawerClose();
                          setText('');
                        }}
                      />
                    </ArrowTooltips>
                  ) : (
                    <Image
                      className="rounded-circle"
                      src="/assets/icons/threeDots.png"
                      height={40}
                      width={40}
                      alt="threeDots"
                      onClick={() => {
                        setText('Meeting Details');
                        handlemeetLinkDrawerOpen();
                      }}
                      style={{ ...(meetLinkDrawer && { display: 'none' }) }}
                    />
                  )}
                </div> */}
                <ArrowTooltips title={!micMuted ? 'Mute' : 'Unmute'} placement="top">
                  <div className="px-2">
                    <Image
                      className="rounded-circle"
                      src={!micMuted ? '/assets/icons/meetingIcons/unMute.png' : '/assets/icons/muteAudio.png'}
                      height={40}
                      width={40}
                      alt="unMuteAudio/muteAudio"
                      onClick={() => muteAudioHandler()}
                    />
                  </div>
                </ArrowTooltips>
                <ArrowTooltips title={videoMuted ? 'Enable Video' : 'Disable Video'} placement="top">
                  <div className="px-2">
                    <Image
                      id="muteVideo"
                      className="rounded-circle"
                      src={!videoMuted ? '/assets/icons/meetingIcons/showVideo.png' : '/assets/icons/muteVideo.png'}
                      height={40}
                      width={40}
                      alt="showVideo/stopVideo"
                      onClick={() => muteVideoHandler()}
                    />
                  </div>
                </ArrowTooltips>
                <ArrowTooltips title={!openDrawer ? 'Open Messages Drawer' : 'Close Message Drawer'} placement="top">
                  <div className="px-2">
                    {openDrawer == true ? (
                      <Image
                        className="rounded-circle"
                        src="/assets/icons/meetingIcons/showMessage.png"
                        height={40}
                        width={40}
                        alt="stopChat"
                        onClick={() => {
                          handleDrawerClose();
                          setText('');
                        }}
                      />
                    ) : (
                      <div className="position-relative">
                        <Image
                          className="rounded-circle"
                          src="/assets/icons/chatIcon.png"
                          height={40}
                          width={40}
                          alt="showChat"
                          onClick={() => {
                            setText('In-Call Messages');
                            handleDrawerOpen();
                            setCommentToast({ ...commentToast, badge: false });
                          }}
                          style={{ ...(openDrawer && { display: 'none' }) }}
                        />
                        {badge && (
                          <span
                            class="position-absolute translate-middle bg-danger rounded-circle"
                            style={{ padding: '5px', top: '25%', right: '5%' }}
                          >
                            <span class="visually-hidden">New alerts</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </ArrowTooltips>
                <ArrowTooltips title={!openpplDrawer ? 'Open People Drawer' : 'Close People Drawer'} placement="top">
                  <div className="px-2">
                    {openpplDrawer == true ? (
                      <Image
                        className="rounded-circle"
                        src="/assets/icons/meetingIcons/showUsers.png"
                        height={40}
                        width={40}
                        alt="usersLength"
                        onClick={() => {
                          setText('');
                          handlepplDrawerClose();
                        }}
                      />
                    ) : (
                      <Image
                        className="rounded-circle"
                        src="/assets/icons/usersLength.png"
                        height={40}
                        width={40}
                        alt="usersLength"
                        onClick={() => {
                          handleAllusersLists(meetingChannel);
                          handlepplDrawerOpen();
                        }}
                      />
                    )}
                  </div>
                </ArrowTooltips>
                <ArrowTooltips
                  title={!agoraEngine2 && !localScreenTrack ? 'Share Screen' : 'Stop Sharing'}
                  placement="top"
                >
                  <div className="px-2">
                    {agoraEngine2 && localScreenTrack ? (
                      <Image
                        className="rounded-circle"
                        src={'/assets/icons/meetingIcons/stop_screen_sharing.png'}
                        height={40}
                        width={40}
                        alt="stopshare"
                        onClick={async () => {
                          await screenSharingHandler();
                        }}
                      />
                    ) : (
                      <Image
                        id="inItScreen"
                        className="rounded-circle"
                        src={'/assets/icons/screenShare.png'}
                        height={40}
                        width={40}
                        alt="screenShare"
                        // onClick={openScreenPopup}
                        onClick={async () => {
                          await screenSharingHandler();
                        }}
                      />
                    )}
                  </div>
                </ArrowTooltips>
                {conferenceUserData ? (
                  showRecordingButton == false ? (
                    recordingStatus == false ? (
                      <ArrowTooltips title="Start Recording" placement="top">
                        <div className="px-2">
                          <Image
                            className="rounded-circle"
                            src="/assets/icons/meetingIcons/startRecording.png"
                            height={40}
                            width={40}
                            alt="subtitles"
                            onClick={handleRecording}
                            // onClick={handleRecordedModalOpen}
                          />
                        </div>
                      </ArrowTooltips>
                    ) : recordingStatus == 'disabled' ? (
                      <ArrowTooltips title="Start Recording (disabled)" placement="top">
                        <div className="px-2 disabledDiv">
                          <Image
                            className="rounded-circle"
                            src="/assets/icons/meetingIcons/startRecording.png"
                            height={40}
                            width={40}
                            alt="subtitles"
                            onClick={stopRecording}
                          />
                        </div>
                      </ArrowTooltips>
                    ) : (
                      <ArrowTooltips title="Stop Recording" placement="top">
                        <div className="px-2">
                          <Image
                            className="rounded-circle"
                            src="/assets/icons/meetingIcons/stopRecording.png"
                            height={40}
                            width={40}
                            alt="subtitles"
                            onClick={stopRecording}
                          />
                        </div>
                      </ArrowTooltips>
                    )
                  ) : (
                    <ArrowTooltips title="Stop Recording" placement="top">
                      <div className="px-2">
                        <Image
                          className="rounded-circle"
                          src="/assets/icons/meetingIcons/stopRecording.png"
                          height={40}
                          width={40}
                          alt="subtitles"
                          onClick={stopRecording}
                        />
                      </div>
                    </ArrowTooltips>
                  )
                ) : (
                  ''
                )}
                <ArrowTooltips title="Leave Meeting" placement="top">
                  <div className="px-2">
                    <Image
                      id="leave"
                      className="rounded-circle"
                      src="/assets/icons/endMeeting.png"
                      height={40}
                      width={40}
                      alt="endMeeting"
                      onClick={() => {
                        endLiveMeeting();
                        // await leaveHandler();
                      }}
                    />
                  </div>
                </ArrowTooltips>
              </div>
            </div>
          </div>
          <CustomToast
            vertical={vertical}
            horizontal={horizontal}
            openToast={openToast}
            commentObject={commentObject}
            handleCommentToastClose={handleCommentToastClose}
          />
        </Main>
        <MeetLinkModal
          meetingChannel={meetingChannel}
          setOpenDrawer={setOpenDrawer}
          setOpenpplDrawer={setOpenpplDrawer}
          openDrawer={openDrawer}
          openpplDrawer={openpplDrawer}
          localAudioTrack={localAudioTrack}
          localVideoTrack={localVideoTrack}
          handleAllusersLists={handleAllusersLists}
          // invited_user_join={invited_user_join}
          invited_user_join={conferenceRemoteUserData}
          setShowRecordingButton={setShowRecordingButton}
        />
        <EndLiveMeetingModal
          endLiveModal={endLiveModal}
          setEndLiveModal={setEndLiveModal}
          endMeetText={'Are you sure, you want to disconnect this call?'}
          endMeetHeading={'Disconnecting Call'}
          image={'/assets/icons/meetingIcons/endMeetingIcon.png'}
          leaveHandler={leaveHandler}
          handleRecordedModalOpen={handleRecordedModalOpen}
          leaveInRecordingCase={leaveInRecordingCase}
          meetingChannel={meetingChannel}
        />
        <ShareScreenPopup openScreenPopup={openScreenPopup} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        <LiveMeetingDrawerContent
          DrawerHeader={DrawerHeader}
          drawerWidth={drawerWidth}
          openDrawer={openpplDrawer ? openpplDrawer : openDrawer ? openDrawer : meetLinkDrawer}
          text={openpplDrawer ? 'People' : openDrawer ? 'In-Call Messages' : 'Meeting Details'}
          handleDrawerClose={
            openpplDrawer ? handlepplDrawerClose : openDrawer ? handleDrawerClose : handlemeetLinkDrawerClose
          }
          meetingChannel={meetingChannel}
          handleAllusersLists={handleAllusersLists}
          // superHost={responseObject?.data}
          superHost={conferenceUserData}
          // invited_user_join={invited_user_join}
          invited_user_join={conferenceRemoteUserData}
          setJoinedUser={setJoinedUser}
          joinedUser={joinedUser}
          isHost={isHost}
          setIsHost={setIsHost}
          invitedUsers={invitedUsers}
          joinedUsers={joinedUsers}
          toastOpeningHandler={toastOpeningHandler}
          // removeUser={removeUser}
          heightofWindow={heightofWindow}
          setUserIdtobeRemoved={setUserIdtobeRemoved}
          removeCall={removeCall}
        />
        <ConferenceDetailModal
          openRecordedModal={openRecordedModal}
          handleRecordedModalClose={handleRecordedModalClose}
          meetingChannel={meetingChannel}
          leaveHandler={leaveHandler}
          setDotProgressLoading={setDotProgressLoading}
        />

        <SuccessModal
          modalOpen={modalInput}
          handleModalClose={() => {
            setmodalInput(false);
            router.replace('/').then(() => router.reload());
          }}
          image={<Image src={SuccessModalData.image} width="65px" height="70px" alt="alert" />}
          title={SuccessModalData.title}
          description={SuccessModalData.description}
          button1={'Okay'}
          recordingStatus={recordingStatus}
          setmodalInput={setmodalInput}
          // setDotProgressLoading={setLoading}
          // giistPublishMove={false}
        />
      </Box>
    </>
  );
}

export default LiveMeetingInvite;
