import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Image from 'next/image';
import classes from '../../modals/livemodal/AddPeopleModal.module.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import forwardBriif from '../../../redux/actions/Forward';
import { URL } from '../../../public/assets/path/path';
import useOnClickOutside from 'use-onclickoutside';
import ConferenceInvitation from '../../../redux/actions/ConferenceInvitation';
import { ConferenceUsers } from './drawercomponent/ConferenceUsers';
import CopyChannel from '../liveMeeting/component/CopyChannel';
import COLORS from '../../../public/assets/colors/colors';
import SuccessModal from '../../modals/simplemodal/SuccessModal';
import ConferenceUsersList, { UpdateJoinedUsersList } from '../../../redux/actions/ConferenceUsersList';
import ArrowTooltips from '../../modals/tooltip/Tooltip';
import { EventEmitter } from 'events';
import useSocket from '../../../hooks/useSocket';

const eventEmitter = new EventEmitter();

const LiveMeetingDrawerContent = ({
  drawerWidth,
  openDrawer,
  DrawerHeader,
  text,
  handleDrawerClose,
  meetingChannel,
  handleAllusersLists,
  superHost,
  invited_user_join,
  setJoinedUser,
  joinedUser,
  isHost,
  setIsHost,
  invitedUsers,
  joinedUsers,
  toastOpeningHandler,
  // removeUser,
  heightofWindow,
  setUserIdtobeRemoved,
  removeCall,
}) => {
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
  const dispatch = useDispatch();
  const publisherRef = useRef();
  const socket = useSocket();

  const [checked, setChecked] = useState(true);
  const [chat, setChat] = useState([]);
  const [searchPublisher, setSearchPublisher] = useState('');
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const [showUsers, setShowUsers] = useState(false); //   people drawer
  const [allUsers, setAllUsers] = useState([]); //   people drawerss\
  const [InvitePeople, setInvitePeople] = useState([]);

  const [dropdownMenu, setDropdownMenu] = useState(null);

  const openMenu = Boolean(dropdownMenu);
  const handleClick = (event) => {
    setDropdownMenu(event.currentTarget);
  };
  const handleClose = () => {
    setDropdownMenu(null);
  };

  const [addPeopleModal, setAddPeopleModal] = useState({
    message: '',
  });

  const [socketedHostUserid, setSocketedHostUserid] = useState(null);
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);

  useOnClickOutside(publisherRef, () => setShowUsers(false));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeInput = (e) => {
    setAddPeopleModal({ ...addPeopleModal, message: e.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevents the default behavior of the "Enter" key (form submission, new line)
      sendMessage(); // Call the function to send the message
    }
  };

  const add_host_conference = useSelector((state) => state.add_host_conference);

  const socketHandler = async (msg) => {
    toastOpeningHandler({ vertical: 'bottom', horizontal: 'right', commentObject: msg });
    setChat((mycomment) => [...mycomment, msg]);
  };

  const invitationSocketHanler = (invitedUser) => {
    console.log(invitedUser, 'dekho to socket me');
  };

  const joinedUserSocketHandler = (newUserjoined) => {
    let newArray = [...joinedUser];
    newArray.push(newUserjoined);
    setJoinedUser(newArray);
    dispatch(UpdateJoinedUsersList(newUserjoined));
    invited_user_join?.is_host == 0 ? setIsHost(false) : setIsHost(true);
    listRenderHandler();
  };

  const hostSocketHandler = (msg) => {
    const localUserId = LoginData?.id;
    localUserId == msg.user_id
      ? (setIsHost(true), setModalShowErrorSuccess(true))
      : (setModalShowErrorSuccess(false), setSocketedHostUserid(msg.user_id));
    listRenderHandler();
  };

  useEffect(() => {
    socket?.on(meetingChannel, socketHandler);
    socket?.on(meetingChannel + '_invited', invitationSocketHanler);
    socket?.on(meetingChannel + '_joined', joinedUserSocketHandler);
    socket?.on(meetingChannel + '_host', hostSocketHandler);

    return () => {
      socket?.off(meetingChannel, socketHandler);
      socket?.off(meetingChannel + '_invited', invitationSocketHanler);
      socket?.off(meetingChannel + '_joined', joinedUserSocketHandler);
      socket?.off(meetingChannel + '_host', hostSocketHandler);
    };
  }, [socket]);

  useEffect(async () => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    // const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    if (GetPlatData) {
      if (LoginData) {
        // get users data
        const params = `limit=30&platform_id=${GetPlatData.platform_id}&search=${searchPublisher}&keyword=`;
        dispatch(forwardBriif(params, LoginData.access_token, onForwardBriifSuccess, onForwardBriifError));

        const user_id = LoginData.id;
        setId(user_id);
        setToken(LoginData.access_token);

        const axios = require('axios');

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${URL.khbaseUrl}show_live_comment?token_id=${meetingChannel}&platform_id=18`,
          headers: {
            Authorization: `Bearer ${LoginData.access_token}`,
          },
        };

        axios
          .request(config)
          .then((response) => {
            setChat(response.data.comment);
          })
          .catch((error) => {
            console.log(error);
          });
        // socketHandler();
      }
    }
  }, [searchPublisher]);

  const listRenderHandler = () => {
    dispatch(ConferenceUsersList(meetingChannel, onFetchUsersSuccess, onFetchUsersError));
  };

  const onFetchUsersSuccess = (res) => {
    console.log(res, 'the response ');
  };
  const onFetchUsersError = (err) => {
    console.log(err);
  };

  const sendMessage = () => {
    if (!addPeopleModal.message.length == '') {
      const axios = require('axios');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${URL.khbaseUrl}add_liveComment?user_id=${id}&comment=${addPeopleModal.message}&platform_id=18&token_id=${meetingChannel}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data, 'the reposne message is here');
          setAddPeopleModal({ message: '' });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please type something to comment');
    }
  };

  const onForwardBriifSuccess = (res) => {
    setAllUsers(res.data.users?.items);
  };

  const onForwardBriifError = (err) => {
    console.log('rror =>', err);
  };

  const onInviteUsersSuccess = (res) => {
    console.log('success response for initation', res.data);
  };

  const onInviteUsersError = (err) => {
    console.log('error', err);
  };

  const handleSendToken = (user) => {
    setSearchPublisher('');
    console.log(user.id, 'user');
  };

  const [checkedArray, setCheckedArray] = useState([]);

  const handleUsersSelection = (e, id, user) => {
    const checked = e.target.checked;
    if (checked) {
      InvitePeople.push(id);
      setInvitePeople([...InvitePeople]);
      setCheckedArray([...checkedArray, user]);
    } else {
      const newInvidedPeopleList = InvitePeople.filter((catId) => catId != id);
      setInvitePeople(newInvidedPeopleList);
      setChecked(checkedArray.filter((myuser) => myuser != user));
    }
  };

  const sendInvitationHandler = async () => {
    const invitationParams = {
      channel: meetingChannel,
      user_ids: InvitePeople,
    };
    await dispatch(ConferenceInvitation(invitationParams, onInviteUsersSuccess, onInviteUsersError));
    setInvitePeople([]);
    await handleAllusersLists(meetingChannel);
    filteredUnselectedUser();
    setShowUsers(false);
  };

  const filteredUnselectedUser = () => {
    const array1 = allUsers;
    const array2 = checkedArray;

    const result = discardIndexWithSameId(array1, array2);
    setAllUsers(result);

    function discardIndexWithSameId(firstArray, secondArray) {
      return firstArray.filter((element) => !secondArray.some((item) => item.id === element.id));
    }
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, openDrawer]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          padding: 1,
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={openDrawer}
    >
      <SuccessModal
        modalOpen={modalShowErrorSuccess}
        handleModalClose={handleCloseModalPublish}
        image={<Image src="/assets/icons/new/checkedtick.svg" width="65px" height="70px" alt="alert" />}
        title={'You are a Host now'}
        description={'Congratulations, You are a Host now'}
        button1={'Okay'}
      />
      <DrawerHeader>
        <Box>
          <Typography style={{ fontFamily: 'Gilroy-Medium', fontStyle: 'normal', fontWeight: 600 }}>{text}</Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <Image src="/assets/icons/meetingIcons/cross.png" height={20} width={20} alt="AddPeople" />
        </IconButton>
      </DrawerHeader>
      {text == 'People' && (
        <>
          {(superHost?.is_host == 1 && !isHost) || superHost?.is_host == 1 || isHost ? (
            <div>
              <div className="d-flex mt-3">
                <div>
                  <Image src="/assets/icons/meetingIcons/profile-add.png" height={20} width={20} alt="AddPeople" />
                </div>
                <div className=" regular-xsmall ms-2">Add people</div>
              </div>

              <div className={`${classes.input_border} d-flex align-items-center mt-3 `}>
                <div className=" position-relative w-100">
                  <div className="pt-2 mx-3 position-absolute">
                    <Image src="/assets/icons/meetingIcons/search.png" height={20} width={20} alt="search" />
                  </div>
                  <input
                    className={`${classes.input} regular-xsmall w-100 ps-5`}
                    placeholder="Add people"
                    type="text"
                    style={{ background: 'transparent' }}
                    onChange={(e) => setSearchPublisher(e.target.value)}
                    onClick={(e) => {
                      showUsers == true ? '' : setShowUsers(true);
                    }}
                    value={searchPublisher}
                    autoComplete="off"
                  />
                  {showUsers == true ? (
                    <div ref={publisherRef} id="menuBox" className={`${classes.dropdownElement}`}>
                      <div style={{ height: '200px', overflowY: 'scroll' }}>
                        {allUsers != undefined
                          ? allUsers.map((user) => (
                              <div className="single-user-hover-effect w-100">
                                <div
                                  className="d-flex py-2 flex-row px-3 align-items-center justify-content-between"
                                  style={{ cursor: 'pointer' }}
                                  key={user.id}
                                  onClick={() => handleSendToken(user)}
                                >
                                  <div className="d-flex">
                                    <div className="gap-3 pt-1">
                                      <Image
                                        style={{ borderRadius: '15px' }}
                                        src={
                                          user.image == null
                                            ? '/assets/icons/new/user.svg'
                                            : `${awsLink}users/profileImages/${user.image}`
                                        }
                                        height={30}
                                        width={30}
                                        alt="avatar"
                                      />
                                    </div>
                                    <div className="ms-2 medium-large">
                                      {user.first_name} {user.last_name}
                                      <p className="medium-small text-secondary mb-0">{user.email}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <input
                                      // key={category.id}
                                      // id={category.id}
                                      type="checkbox"
                                      name="category"
                                      style={{ width: '18px', height: '18px', marginTop: '3px' }}
                                      onChange={(e) => {
                                        handleUsersSelection(e, user.id, user);
                                      }}
                                      checked={InvitePeople.includes(user.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          : ''}
                      </div>
                      <div
                        className="d-flex justify-content-center py-2"
                        style={{ position: 'sticky', top: 0, zIndex: '2' }}
                      >
                        <button
                          onClick={async () => await sendInvitationHandler()}
                          style={{
                            background: COLORS.mainColor,
                            color: '#FFFFFF',
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '10px',
                          }}
                        >
                          Send Invitation
                        </button>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <div style={{ height: '95%', overflow: 'scroll' }}>
            {!joinedUsers?.length ? (
              ''
            ) : (
              <>
                <div className="regular-mid-small mt-2 mx-2">In call</div>
                {joinedUsers?.map((items) => (
                  <ConferenceUsers
                    key={items.id}
                    userId={items.id}
                    items={items}
                    awsLink={awsLink}
                    handleClick={handleClick}
                    openMenu={openMenu}
                    dropdownMenu={dropdownMenu}
                    handleClose={handleClose}
                    setDropdownMenu={setDropdownMenu}
                    // addHostHandler={addHostHandler}
                    meetingChannel={meetingChannel}
                    superHost={superHost}
                    isHost={isHost}
                    // is_host={items.is_host}
                    status={'joined'}
                    socketedHostUserid={socketedHostUserid}
                    // removeUser={removeUser}
                    setUserIdtobeRemoved={setUserIdtobeRemoved}
                    removeCall={removeCall}
                  />
                ))}
              </>
            )}

            {!invitedUsers?.length ? (
              ''
            ) : (
              <>
                <div className="regular-mid-small mt-2 mx-2">Invited</div>
                {invitedUsers?.map((item) => (
                  <ConferenceUsers
                    key={item.id}
                    userId={item.id}
                    items={item}
                    awsLink={awsLink}
                    handleClick={handleClick}
                    openMenu={openMenu}
                    dropdownMenu={dropdownMenu}
                    setDropdownMenu={setDropdownMenu}
                    handleClose={handleClose}
                    meetingChannel={meetingChannel}
                    superHost={superHost}
                    invited_user_join={invited_user_join} // need more work through socket
                    // is_host={item.is_host}
                    isHost={isHost} // need more work through socket
                    status={'invited'}
                    setUserIdtobeRemoved={setUserIdtobeRemoved}
                    removeCall={removeCall}
                  />
                ))}
              </>
            )}
          </div>
        </>
      )}
      {text == 'In-Call Messages' && (
        <div className="px-3" style={{ height: '95%', position: 'relative', width: '100%', overflow: 'hidden' }}>
          {/* will be used in future */}
          {/* <div className={`${classes.input_border1} mt-3 d-flex justify-content-between`}>
            <div className=" mt-1">
              <input
                className={`${classes.input1} regular-xsmall w-100 `}
                placeholder="Send message to everyone"
                type="text"
                style={{ background: 'transparent' }}
              />
            </div>
            <div className=" mx-3">
              <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
            </div>
          </div> */}
          <div className="regular-xxsmall pt-2">
            Messages can only be seen by people in the call and are deleted when the call ends
          </div>
          <div
            style={{
              height: heightofWindow > 690 ? '75vh' : heightofWindow < 690 || heightofWindow >= 600 ? '70vh' : '75vh',
              overflowY: 'scroll',
            }}
            className={`${classes.commentsScroll} `}
          >
            {chat.length != 0 &&
              chat?.map((item, index) => (
                <div className="mt-2 " key={index} id={item?.id}>
                  <div className="d-flex">
                    <div className="mt-2 position-relative" style={{ height: '32px', width: '10%' }}>
                      <Image
                        // src="/assets/images/userProfile.png"
                        className="rounded-circle position-absolute"
                        src={
                          awsLink !== undefined && item.image !== null
                            ? awsLink + 'users/profileImages/' + item.image
                            : '/assets/icons/new/user.svg'
                        }
                        height={32}
                        width={32}
                        layout="fill"
                        alt="AddPeople"
                        // onClick={sendMessage}
                      />
                    </div>
                    <div className="ms-2" style={{ width: '90%' }}>
                      <div className="d-flex">
                        <div className={`semibold-small`}>{`${item.first_name} ${item.last_name}`} </div>
                        {/* <div className="regular-xxsmall ms-2 mt-1">12:15</div> */}
                      </div>
                      <div className="regular-small text-break">{item.comment}</div>
                    </div>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} className="d-flex" />
          </div>

          <div style={{ bottom: '15px', position: 'absolute', width: '90%' }}>
            <div className={`${classes.input_border1} d-flex justify-content-between mt-3`}>
              <div className="w-100">
                <input
                  className={`${classes.input1} regular-xsmall w-100 `}
                  placeholder="Send message to everyone"
                  type="text"
                  style={{ background: 'transparent' }}
                  value={addPeopleModal.message}
                  name="message"
                  onChange={handleChangeInput}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
              </div>
              <div className=" mt-1">
                <ArrowTooltips title="Sendcomment" placement="top">
                  <div className="float-end">
                    <Image
                      src="/assets/icons/meetingIcons/Sendcomment.svg"
                      height={16}
                      width={16}
                      alt="AddPeople"
                      onClick={sendMessage}
                    />
                  </div>
                </ArrowTooltips>
              </div>
            </div>
          </div>
        </div>
      )}
      {text == 'Meeting Details' && (
        <div className="px-3">
          <CopyChannel meetingChannel={meetingChannel} />
        </div>
      )}
    </Drawer>
  );
};

export default LiveMeetingDrawerContent;
