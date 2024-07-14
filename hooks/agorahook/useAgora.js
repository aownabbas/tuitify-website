import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const useAgora = ({ conferenceRemoteUserData, conferenceUserData, appId, appChannel, uid, uid2, token, token2 }) => {
  const agoraEngine = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  let globalParams = {
    video: null,
    audio: null,
    screen: null,
    pinned: null,
  };

  const [localAudioTrack, setlocalAudioTrack] = useState(null);
  const [localVideoTrack, setlocalVideoTrack] = useState(null);
  const [localScreenTrack, setlocalScreenTrack] = useState(null);
  const [micMuted, setmicMuted] = useState(false);
  const [videoMuted, setvideoMuted] = useState(false);
  const [pinned, setPinned] = useState(null);
  const [agoraEngine2, setAgoraEngine2] = useState(null);

  const [arrayObjectsPlayer, setarrayObjectsPlayer] = useState([]);
  const [joinedUser, setJoinedUser] = useState([]);

  const [dotProgressLoading, setDotProgressLoading] = useState(true);

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

  async function join() {
    await agoraEngine?.join(appId, appChannel, token, uid);
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

    await agoraEngine?.publish([laudio, lvideo]);
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
      // router.push('/');
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
    if (agoraEngine) {
      const userPublishedHandler = async (user, mediaType) => {
        await agoraEngine.subscribe(user, mediaType);
        setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
        console.log([...agoraEngine.remoteUsers], user, 'globalParams.published');
      };

      const userUnpublishedHandler = async (user, mediaType) => {
        await agoraEngine.unsubscribe(user, mediaType);
        setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
        console.log([...agoraEngine.remoteUsers], user, 'globalParams.unpublished');
      };
      const userJoinedHandler = (user) => {
        setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
        console.log([...agoraEngine.remoteUsers], user, 'globalParams.joined');
      };
      const userLeftHandler = (user) => {
        console.log('user left log');
        console.log(user, 'user left log 2');
        console.log(...agoraEngine.remoteUsers, 'user left log 3');
        setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
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
      };
      const connectionStateChangeHandler = async (user) => {
        setarrayObjectsPlayer([...agoraEngine.remoteUsers]);
        console.log([...agoraEngine.remoteUsers], user, 'globalParams.4');
      };
      agoraEngine.on('user-published', userPublishedHandler);
      agoraEngine.on('user-unpublished', userUnpublishedHandler);
      agoraEngine.on('user-joined', userJoinedHandler);
      agoraEngine.on('user-left', userLeftHandler);
      agoraEngine.on('connection-state-change', connectionStateChangeHandler);
    }

    return () => {
      agoraEngine?.off('user-published', userPublishedHandler);
      agoraEngine?.off('user-unpublished', userUnpublishedHandler);
      agoraEngine?.off('user-joined', userJoinedHandler);
      agoraEngine?.off('user-left', userLeftHandler);
      agoraEngine?.off('connection-state-change', connectionStateChangeHandler);
    };
  }, []);

  return {
    agoraEngine,
    globalParams,
    localAudioTrack,
    localVideoTrack,
    localScreenTrack,
    micMuted,
    videoMuted,
    pinned,
    agoraEngine2,
    arrayObjectsPlayer,
    joinedUser,
    setlocalAudioTrack,
    setlocalVideoTrack,
    setlocalScreenTrack,
    setmicMuted,
    setvideoMuted,
    setPinned,
    setAgoraEngine2,
    setarrayObjectsPlayer,
    setJoinedUser,
    join,
    screenSharingHandler,
    muteVideoHandler,
    muteAudioHandler,
    leaveHandler,
    leaveInRecordingCase,
    dotProgressLoading,
    setDotProgressLoading,
  };
};

export default useAgora;
