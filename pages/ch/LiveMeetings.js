import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { useSelector, useDispatch } from 'react-redux';
// socket libray
import io from 'socket.io-client';

// import Sidebar from "../../components/layout/Sidebar"
// import Header from "../../components/layout/Header"
// awais
import classes from '../../components/ch/meeting/LiveMeeting.module.css';
import LiveMeetUsers from '../../redux/actions/LiveMeetingUsers';
import LiveUsers from '../../components/ch/meeting/LiveUsers';
import useTimer from '../../components/ch/chmainpage/interaction/interactionmodals/timer/useTimer';
import moment from 'moment';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { Box, Button, Chip, Modal, Typography } from '@mui/material';
import { GlobalApiCall } from '../../redux/GlobalApiCall';
import useSocket from '../../hooks/useSocket';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
// var channel;
const LiveMeetings = (props) => {
  const socket = useSocket();
  // channel = props.router.query.channel;
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const { title, description, channel, tag } = props.router.query;
  console.log(tag, 'tag from redux');
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  console.log(token, 'token from redux');

  // timer
  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();
  const mytime = moment.utc(seconds * 1000).format('HH:mm:ss');

  // Live users response will be get
  const { get_allusers } = useSelector((state) => state.get_allusers);
  console.log('ResponseData', get_allusers);

  // end of live users response
  // local search (in modal) for online viewers in meeting
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = get_allusers.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(get_allusers);
    }
  };

  // end local search (in modal) for online viewers in meeting

  const [id, setId] = useState();
  const [loggedUser, setLoggedUser] = useState();
  const [getPlatData, setGetPlatData] = useState({});

  // agora id
  const appId = '8f017525a9964542b5a61477aea67c98';

  // all states of live
  const [AgoraUIKit, setAgoraUIkit] = useState();
  const [videocall, setVideocall] = useState(false);
  const [comment, setComment] = useState('');
  const [isHost, setHost] = useState(false);
  const [username, setUsername] = useState('');
  const [mycomment, setmyComment] = useState([]);
  const [status, setStatus] = useState();

  const setCoomentHandler = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  const [viewersLength, setViewersLength] = useState(0);
  console.log(viewersLength, 'all viewers');
  const params = `live_id=${token.goLiveId}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&name=${getPlatData.name}`;

  let flag = false;

  const totalnumberofuser = (msg) => {
    console.log(msg, 'channel msg');
    setViewersLength(msg);
  };
  const viewers = (msg) => {
    console.log(msg, 'channel msg 1');
    setViewersLength(msg);
  };

  const commentHandler = (msg) => {
    setmyComment((mycomment) => [...mycomment, msg]);
  };

  const disconnectHandler = async () => {
    console.log('Got disconnect!');
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    if (GetPlatData) {
      if (LoginData) {
        setVideocall(true);
        await GlobalApiCall(
          `${URL.khbaseUrl}end_live?name=${GetPlatData.name}&env=${GetPlatData.env}&platform_id=${GetPlatData.platform_id}&user_id=${LoginData.id}&channel_name=${channel}`,
          'post',
          {},
          (response) => {
            console.log(response, 'end');
          },
          (error) => {
            console.log(error, 'end');
          },
        );
      }
    }
  };

  useEffect(() => {
    socket?.on('totalnumberofuser' + channel, totalnumberofuser);
    socket?.on(channel + '_viewers', viewers);
    socket?.on(channel, commentHandler);
    socket?.on('disconnect', disconnectHandler);

    return () => {
      socket?.off('totalnumberofuser' + channel, totalnumberofuser);
      socket?.off(channel + '_viewers', viewers);
      socket?.off(channel, commentHandler);
      socket?.off('disconnect', disconnectHandler);
    };
  }, [socket]);

  useEffect(async () => {
    const getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    // channel = props.router.query.channel;
    console.log(channel, 'channel props');

    if (!flag) {
      if (channel != undefined) {
        startTime();
        // socket for live chat
        // const socket = io(URL.khbaseUrl, { headers: { Authorization: 'Bearer' + getLoginData?.access_token } });

        console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');

        window.addEventListener('online', () => console.log('Became online'));
        window.addEventListener('offline', () => {
          console.log('Became offline');
          isHost == true ? setVideocall(false) : '';
        });

        window.addEventListener('beforeunload', function (e) {
          var confirmationMessage = 'o/';

          (e || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        });
        window.addEventListener('unload', async function (e) {
          const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
          const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

          if (GetPlatData) {
            if (LoginData) {
              setVideocall(true);
              await GlobalApiCall(
                `${URL.khbaseUrl}end_live?name=${GetPlatData.name}&env=${GetPlatData.env}&platform_id=${GetPlatData.platform_id}&user_id=${LoginData.id}&channel_name=${channel}`,
                'post',
                {},
                (response) => {
                  console.log(response, 'end');
                },
                (error) => {
                  console.log(error, 'end');
                },
              );
            }
          }
        });

        // agora dynamic import
        try {
          const AgoraUIKit = dynamic(() => import('agora-react-uikit'));
          setAgoraUIkit(AgoraUIKit);
          setVideocall(true);
        } catch (err) {
          console.log(err, 'error');
        }

        // login and platform data getting
        const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
        const user_id = LoginData.id;
        const userName = LoginData.first_name + ' ' + LoginData.last_name;
        setLoggedUser(userName);
        console.log(loggedUser, 'logged in user');
        setId(user_id);
        const id = LoginData.platform_id;
        // setplatformId(id)

        const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

        if (GetPlatData) {
          const getPlatObject = GetPlatData;
          setGetPlatData(getPlatObject);
          // console.log(getPlatObject.name);

          // get live chat data
          // props.router.query.myswitch == true &&
          await GlobalApiCall(
            `${URL.khbaseUrl}show_live_comment?name=${GetPlatData.name}&env=${GetPlatData.env}&platform_id=${GetPlatData.platform_id}&token_id=${channel}`,
            'get',
            {},
            (response) => {
              setmyComment(response.data.comment);
              console.log(mycomment, 'response');
              setStatus(response.data.status);
            },
            (error) => {
              console.log(error, 'errorComments');
            },
          );

          // join Meeting
          await GlobalApiCall(
            `${URL.khbaseUrl}join_meeting?name=${GetPlatData.name}&env=${GetPlatData.env}&platform_id=${GetPlatData.platform_id}&channel_name=${channel}&user_id=${user_id}`,
            'get',
            {},
            (response) => {
              console.log(response, 'meeting');
            },
            (error) => {
              console.log(error);
            },
          );
        }

        // set host
        channel && setHost(true);
      }
    }
    flag = true;
    console.log(channel);
    return () => {};
  }, [channel]);

  const sendMessage = async () => {
    if (!comment.length == '') {
      await GlobalApiCall(
        `${URL.khbaseUrl}add_liveComment?name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&token_id=${channel}&user_id=${id}&comment=${comment}`,
        'post',
        {},
        (response) => {
          console.log(response, 'posted');
        },
      );

      setComment('');
    } else {
      window.alert('Please type something to comment');
    }
  };

  const FinishLive = async (e) => {
    stopTime();
    setVideocall(false);
    await GlobalApiCall(
      `${URL.khbaseUrl}end_live?name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&user_id=${id}&channel_name=${channel}`,
      'post',
      {},
      (response) => {
        console.log(response, 'end');
      },
      (error) => {
        console.log(error, 'end');
      },
    );

    router.replace('/');
  };
  console.log(status, 'mycomment');
  const [serachedUsers, setsearchedUsers] = useState([]);

  const getLiveUsers = async () => {
    const params = `live_id=${channel}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&name=${getPlatData.name}`;

    await GlobalApiCall(`${URL.khbaseUrl}live_meeting_users_list?${params}`, 'get', {}, (res) => {
      if (res.data.status === 'true') {
        console.log(res.data, 'okq');
        setsearchedUsers(res.data.users);

        console.log(serachedUsers, 'PPPPllllllllllll');
      } else {
        console.log(res.data, '**************');
      }
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Layout heading="Communication Hub">
      <div className="col-12">
        <div className="">
          <div className="row">
            {/* <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 mb-3">
              <div style={{ padding: '20px', height: 'auto' }} className="shadow"> */}
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 mb-3" style={{ height: '85vh' }}>
              <div style={{ padding: '20px' }} className="shadow">
                <div className="row ">
                  <div>
                    {/* agora live meeting */}
                    {videocall ? (
                      <>
                        {/* awais */}

                        <div className="mx-auto" style={{ position: 'relative' }}>
                          <Box
                            onClick={() => {
                              handleOpen();
                              // dispatch(LiveMeetUsers(params));  //==> it is not removed becaused we could need this in future
                              getLiveUsers();
                            }}
                            className={classes.modalButton}
                          >
                            <div className="d-flex justify-content-around align-items-center">
                              <div style={{ height: '15px', width: '20px' }}>
                                <Image src="/assets/img/live-eye.svg" alt="live Users" height={15} width={20} />
                              </div>
                              <span className="text-white">{viewersLength}</span>
                            </div>
                          </Box>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" mb={2} component="h2">
                                Live Viewers
                              </Typography>
                              <Box>
                                <input
                                  type="search"
                                  onChange={(event) => searchItems(event.target.value)}
                                  placeholder="Search Audience"
                                  className="mb-3"
                                  style={{ borderRadius: '12px', height: '36px', padding: '5px', width: '100%' }}
                                />
                                {searchInput.length > 1
                                  ? filteredResults.map((item) => {
                                      return (
                                        <LiveUsers
                                          key={item.id}
                                          id={item.id}
                                          firstName={item.first_name}
                                          lastName={item.last_name}
                                          image={item.image}
                                        />
                                      );
                                    })
                                  : serachedUsers.map((item) => {
                                      return (
                                        <LiveUsers
                                          key={item.id}
                                          id={item.id}
                                          firstName={item.first_name}
                                          lastName={item.last_name}
                                          image={item.image}
                                        />
                                      );
                                    })}
                              </Box>
                            </Box>
                          </Modal>
                          <div className="modalButton1">
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div
                                  className="bglive text-white text-center"
                                  style={{ marginLeft: '10px', marginTop: '12px' }}
                                >
                                  Live
                                </div>
                              </div>
                              <div className=" offset-lg-6 offset-md-7 offset-sm-7 offset-xs-7 col-lg-4 col-md-3 col-sm-3 col-xs-3">
                                <div className="row">
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 offset-lg-1 offset-md-1 offset-xs-1 offset-sm-1">
                                    <div className="text-white" style={{ marginTop: '12px' }}>
                                      {mytime}
                                    </div>
                                  </div>
                                  <div
                                    className="col-lg-2 col-md-2 col-sm-2 col-xs-2 offset-lg-1 offset-md-1 offset-xs-1 offset-sm-1"
                                    style={{ marginTop: '14px' }}
                                  >
                                    <Image src="/assets/img/ic_volume.svg" alt="volume" height="20px" width="20px" />
                                  </div>
                                  <div
                                    className="col-lg-3 col-md-3 col-sm-3 col-xs-3 offset-lg-1 offset-md-1 offset-xs-1 offset-sm-1"
                                    style={{ marginTop: '14px' }}
                                  >
                                    <Image src="/assets/img/ic_reverse.svg" alt="reverse" height="20" width="20" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* awais */}
                        <div className="mx-auto">
                          {channel ? (
                            <div className="agora">
                              <AgoraUIKit
                                className="mx-auto "
                                style={{ height: '200px' }}
                                rtcProps={{
                                  appId: appId,
                                  channel: channel,
                                  token: null, //add your token if using app in secured mode
                                  role: isHost ? 'host' : 'audience',
                                }}
                                rtmProps={{ username: username || 'user', displayUsername: true }}
                                callbacks={{
                                  EndCall: () => setVideocall(false),
                                }}
                              />
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="livebackground" style={styles.nav}></div>
                    )}
                  </div>
                </div>

                <div className="mrgntp2">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <h4 style={{ fontWeight: '700', fontSize: '20px' }}>{title}</h4>
                      <div className="mrgntp2">
                        <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <Image
                              className="imgradius2"
                              src={'/assets/icons/user.png'}
                              alt="user"
                              width={34}
                              height={34}
                            />
                          </div>
                          <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5" style={{ fontSize: '14px' }}>
                            <strong>{loggedUser}</strong>
                            <div style={{ fontSize: '10px' }}>Today</div>
                          </div>
                        </div>
                      </div>
                      {description && (
                        <div className="mrgntp1">
                          <strong style={{ fontSize: '16px', fontWeight: '600' }}>{description}</strong>
                        </div>
                      )}
                      {tag && (
                        <>
                          <div className="mrgntp1 mb-3" style={{ fontSize: '12px' }}>
                            Tags
                          </div>
                          <Box>
                            {tag.map((singleTag) => (
                              <Chip
                                label={singleTag}
                                sx={{
                                  marginLeft: '5px',
                                  marginBottom: '10px',
                                  '&:hover': { background: '#E8E8E8', color: '#FFFFFF' },
                                }}
                              />
                            ))}
                          </Box>
                        </>
                      )}
                    </div>
                    <div className=" offset-lg-5 offset-md-5 offset-sm-5 offset-xs-5 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                      <Image src="/assets/icons/ic_share.png" alt="shareLive" width="30px" height="30px" />
                    </div>
                  </div>
                </div>

                <div className="mrgntp2">
                  <div className="row ">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                      <h4>
                        <strong style={{ fontSize: '16px' }}>Groups</strong>
                        <span>
                          {' '}
                          <Image src="/assets/icons/group.png" alt="liveUser Group" width="10px" height="10px" />
                        </span>
                      </h4>

                      <div className="mrgntp3">
                        <Image
                          className="imgradius2"
                          src="/assets/icons/user.png"
                          alt="User Image"
                          width="34px"
                          height="34px"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2" style={{ marginTop: '14px' }}>
                      <div
                        className=" shadow text-center text-white"
                        style={{
                          backgroundColor: '#FF4B55',
                          padding: '17px',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => FinishLive(e)}
                      >
                        Finish Live
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12  ">
              <div className="shadow" style={{ height: '600px' }}>
                <div style={{ marginRight: '15px', marginLeft: '15px' }}>
                  <div className="d-flex justify-content-between" style={{ paddingTop: '20px' }}>
                    <strong>Comments</strong>
                    <span> {mycomment.length} comments</span>
                  </div>
                  <hr></hr>
                  {/* live chat */}
                  <div style={{ height: '470px' }}>
                    {
                      mycomment.length >= 1 ? (
                        <div style={{ overflowY: 'scroll', maxHeight: '450px' }}>
                          {mycomment.map((item) => (
                            <>
                              <div className="row ">
                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                  <Image
                                    className="imgradius2"
                                    src={`${awsLink}users/profileImages/` + item.image}
                                    alt="userImage"
                                    width="24px"
                                    height="24px"
                                  />
                                </div>
                                <div
                                  className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-start"
                                  style={{ marginRight: '140px', textAlign: 'left' }}
                                >
                                  <div style={{ fontSize: '12px', fontWeight: '600', textAlign: 'left' }}>
                                    {item.first_name} <span>{item.last_name}</span>
                                  </div>
                                  <div style={{ fontSize: '10px', textAlign: 'left' }}>Today</div>
                                </div>
                              </div>
                              <div
                                className="offset-lg-1 offset-md-1 offset-sm-1 offset-xs-1 col-lg-9 col-md-9 col-sm-9 col-xs-9 mt-1"
                                style={{ fontSize: '10px', fontWeight: '400' }}
                              >
                                {item.comment}
                              </div>
                              <hr></hr>
                            </>
                          ))}
                        </div>
                      ) : (
                        ''
                      )
                      //           <div className="nocomments text-center" style={{ height: "470px" }}>
                      //             <Image className="imgradius2" src="/assets/icons/nocomments.png" alt="user Comment" width="32px" height="32px" />
                      //             <div className="offset-lg-3 offset-md-3 offset-sm-3 offset-xs-3 col-lg-6 col-md-6
                      // col-sm-6 col-xs-6 text-center">
                      //               <div className="mrgntp">No comments to show! You can write your comment in below comment box</div>
                      //             </div>
                      //           </div>
                    }
                  </div>
                  <div
                    className="text-white "
                    style={{ backgroundColor: '#303548', padding: '10px', borderRadius: '34px' }}
                  >
                    <div className="d-flex justify-content-between ">
                      <input
                        className="text-white"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          marginLeft: '8px',
                          width: '100%',
                          paddingRight: '10px',
                        }}
                        placeholder="Type comment here..."
                        type="text"
                        value={comment}
                        onChange={setCoomentHandler}
                        autofocus="autofocus"
                      />

                      <Image
                        className="imgradius2 "
                        src="/assets/icons/sendmessage.png"
                        alt="Send messege"
                        width="20px"
                        height="20px"
                        style={{ marginLeft: '20px', marginTop: '3px' }}
                        onClick={() => sendMessage()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/*  */}
    </Layout>
  );
};

export default withRouter(LiveMeetings);
// agora styling
const styles = {
  container: { width: '100vw', height: '400vh', display: 'flex', flex: 1, backgroundColor: '#007bff22' },
  heading: { textAlign: 'center', marginBottom: 0 },
  videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 },
  nav: { display: 'flex', justifyContent: 'space-around', borderRadius: '10px', height: '465px' },
  btn: {
    backgroundColor: '#007bff',
    cursor: 'pointer',
    borderRadius: 5,
    padding: '4px 8px',
    color: '#ffffff',
    fontSize: 20,
  },
  input: { display: 'flex', height: 24, alignSelf: 'center' },
};
