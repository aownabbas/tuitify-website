import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import sendToken from '../redux/actions/SendToken';
import axios from 'axios';
import Image from 'next/image';
import { URL } from '../public/assets/path/path';
import sidebar from '../redux/actions/Sidebar';
import { GlobalApiCall } from '../redux/GlobalApiCall';
import { JoinMeeting } from '../redux/actions/JoinMeeting';
import SuccessModal from './modals/simplemodal/SuccessModal';

const Notification = (props) => {
  console.log('props', props.image);
  console.log(props, 'meeting token');
  const router = useRouter();
  const dispatch = useDispatch();
  const [getPlatData, setGetPlatData] = useState();
  console.log(getPlatData, 'getPlatData');
  const [getLoginData, setGetLoginData] = useState('');
  const [id, setId] = useState();

  // open Giist

  const handleGiist = async (id, type) => {
    if (type == 'in_review' || type == 'rejected') {
      await router.push(`/kh/PlayReviewGiist?id=${id}`);
    } else {
      await router.push(`/kh/published_giists/PlayGiistsVideo?id=${id}`);
    }
  };
  // open briff

  const handleBriifs = async (id) => {
    if (router.pathname == '/' || router.asPath == '/') {
      dispatch(sidebar('receive'));
      const receiveIndex = props.receivedBriifsData?.recive.findIndex((item) => item.id == id);
      const pinIndex = props.receivedBriifsData?.pin.findIndex((item) => item.id == id);
      const findingData = props.receivedBriifsData?.recive?.find((item) => item.id == id);

      if (!findingData) {
        props.setSuccessErrorMessage({
          heading: 'Briif Deleted',
          message: 'Selected Giist has been deleted',
          buttonText: 'Okay',
          image: '/assets/icons/danger.svg',
        });
        props.setModalShowErrorSuccess(true);
      }

      if (receiveIndex != -1) {
        const updatedRecive = [
          props.receivedBriifsData.recive[receiveIndex],
          ...props.receivedBriifsData.recive.slice(0, receiveIndex),
          ...props.receivedBriifsData.recive.slice(receiveIndex + 1),
        ];
        props.setReceivedBriifsData((prev) => ({
          ...prev,
          recive: updatedRecive,
        }));
        props.handlePlayedBriif(id);
      }
      if (pinIndex != -1) {
        const updatedPin = [
          props.receivedBriifsData.pin[pinIndex],
          ...props.receivedBriifsData.pin.slice(0, pinIndex),
          ...props.receivedBriifsData.pin.slice(pinIndex + 1),
        ];
        props.setReceivedBriifsData((prev) => ({
          ...prev,
          pin: updatedPin,
        }));
        props.handlePlayedBriif(id);
      }
    } else {
      await router.replace('/');
      if (router.pathname == '/' || router.asPath == '/') {
        dispatch(sidebar('receive'));
        const receiveIndex = props.receivedBriifsData.recive.findIndex((item) => item.id == id);
        const pinIndex = props.receivedBriifsData.pin.findIndex((item) => item.id == id);
        const findingData = props.receivedBriifsData?.recive?.find((item) => item.id == id);

        if (!findingData) {
          props.setSuccessErrorMessage({
            heading: 'Briif Deleted',
            message: 'Selected Giist has been deleted',
            buttonText: 'Okay',
            image: '/assets/icons/danger.svg',
          });
          props.setModalShowErrorSuccess(true);
        }

        console.log('handleBriifs', pinIndex, receiveIndex);
        if (receiveIndex != -1) {
          const updatedRecive = [
            props.receivedBriifsData.recive[receiveIndex],
            ...props.receivedBriifsData.recive.slice(0, receiveIndex),
            ...props.receivedBriifsData.recive.slice(receiveIndex + 1),
          ];
          props.setReceivedBriifsData((prev) => ({
            ...prev,
            recive: updatedRecive,
          }));
          props.handlePlayedBriif(id);
        }
        if (pinIndex != -1) {
          const updatedPin = [
            props.receivedBriifsData.pin[pinIndex],
            ...props.receivedBriifsData.pin.slice(0, pinIndex),
            ...props.receivedBriifsData.pin.slice(pinIndex + 1),
          ];
          props.setReceivedBriifsData((prev) => ({
            ...prev,
            pin: updatedPin,
          }));
          props.handlePlayedBriif(id);
        }
      }
    }
  };

  const [channel, setChannel] = useState();
  useEffect(() => {
    // login data
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const user_id = LoginData.id;
    setGetLoginData(LoginData);
    setId(user_id);
    // get plat data
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setChannel(props.meetingToken);
    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    return () => {};
    //eslint-disable-next-line
  }, []);
  const joinMeeting = async (event) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}join_meeting?name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&channel_name=${props.meetingToken}&user_id=${id}`,
      'get',
      {},
      (response) => {
        console.log(response);
        dispatch(sendToken({ token: props.meetingToken, goLiveId: props.goLiveId }));
      },
      (error) => {
        console.log(error);
      },
    );
    // console.log('sklfklsf =>', res);
    event.preventDefault();
    router.push({
      pathname: '/ch/LiveMeetings',
      query: {
        videoCall: 'true',
        channel: props.meetingToken,
        myswitch: 'true',
      },
    });
  };

  const joinConference = async (meetingToken) => {
    await dispatch(JoinMeeting(meetingToken, onJoinPopleSuccess, onJoinPopleError));
  };

  const onJoinPopleSuccess = (res) => {
    const channelRes = res.data.channel;
    localStorage.setItem('@ConferenceRemoteUser', JSON.stringify(res?.data));
    router.push(`/ch/liveconference/${channelRes}`);
  };
  const onJoinPopleError = (err) => {
    console.log(err, 'invitatation has been sent error');
    props.setSuccessErrorMessage({
      heading: err && 'Blocked',
      message: err && 'Sorry, You have been blocked from this conference. You cannot join this conference again.',
      buttonText: 'Okay',
      image: '/assets/icons/danger.svg',
    });
    props.setModalShowErrorSuccess(true);
  };

  let time = moment(props.time).fromNow();

  const truncString = (props.firstName + ' ' + props.lastName).substring(0, 23);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    // all notification data design map
    <div
      className="row bg-white hover-bg-lightgrey usercard-shadow col-11 p-0 my-2 py-1 mx-auto d-flex align-items-center"
      style={{ borderRadius: '7px', minHeight: '38px' }}
    >
      <div className="col-2 d-flex">
        <Image
          className=""
          style={{ borderRadius: '50%' }}
          width="35px"
          height="35px"
          alt="userImage"
          src={props.image ? `${awsLink}users/profileImages/${props.image}` : '/assets/icons/new/user.svg'}
        />
      </div>
      <div className="col-7 text-start lh-1 px-0">
        <span className="semibold-mid-small text-start text-nowrap">
          {truncString + ((props.firstName + ' ' + props.lastName).length > 22 ? '...' : '')}
          <span className="medium d-inline text-secondary text-wrap text-truncate" style={{ opacity: '0.6' }}>
            {props.action == 1 && ' ' + props.message + ' ' + props.title}
            {props.action == 2 && ' ' + props.message + ' ' + props.title}
            {props.action == 3 && ' ' + props.message}
            {props.action == 4 && ' ' + props.message}
            {props.action == 5 && ' ' + props.message}
          </span>
          <span className="medium" style={{ marginLeft: '10px' }}>
            {time}
            {/* <Moment fromNow ago>
                                {props.time}
                            </Moment><span> ago</span> */}
          </span>
        </span>
      </div>
      <div className="col-3 px-2">
        {props.action == 1 && (
          <button
            onClick={async () => {
              await handleBriifs(props.briifId);
              props.handleNotificationTray();
            }}
            className="ripple main-background-color w-100 semibold-xsmall d-flex justify-content-center align-items-center"
            style={{
              borderRadius: '3px',
              border: '2px solid #303548',
              padding: '3px',
            }}
          >
            <small className="white text-white">Open Briif</small>
          </button>
        )}
        {props.action == 2 && (
          <button
            onClick={() => {
              handleGiist(props.GiistId, props.type);
              props.handleNotificationTray();
            }}
            className="ripple main-background-color text-white w-100 semibold-xsmall"
            style={{
              borderRadius: '3px',
              border: '2px solid #303548',
              padding: '3px',
            }}
          >
            <small className="white">Open Giist</small>
          </button>
        )}
        {props.action == 3 && (
          <button
            onClick={(event) => {
              handleProfile(event);
              props.handleNotificationTray();
            }}
            className="ripple main-background-color w-100 semibold-xsmall"
            style={{
              borderRadius: '3px',
              border: '2px solid #303548',
              paddingRight: '2px',
              paddingLeft: '2px',
            }}
          >
            <small className="white text-white">Profile</small>
          </button>
        )}
        {props.action == 4 && (
          <button
            onClick={(event) => {
              joinMeeting(event);
              props.handleNotificationTray();
            }}
            className="ripple main-background-color text-white w-100 semibold-xsmall"
            style={{
              borderRadius: '3px',
              border: '2px solid #303548',
              padding: '3px',
            }}
          >
            <small className="white">Join Meet</small>
          </button>
        )}
        {props.action == 5 && (
          <button
            onClick={async () => {
              await joinConference(props.meetingToken);
              // props.handleNotificationTray();
            }}
            className="ripple main-background-color text-white w-100 semibold-xsmall"
            style={{
              borderRadius: '3px',
              border: '2px solid #303548',
              padding: '3px',
            }}
          >
            <small className="white">Join Conference</small>
          </button>
        )}
      </div>
    </div>
  );
};
export default Notification;
