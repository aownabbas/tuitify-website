import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import classes from './AddPeopleModal.module.css';
import { useEffect } from 'react';
import GlobalApiCall from '../../../redux/GlobalApiCall';
import { URL } from '../../../public/assets/path/path';
import axios from 'axios';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import forwardBriif from '../../../redux/actions/Forward';
import useSocket from '../../../hooks/useSocket';

const style = {
  position: 'absolute',
  top: '0%',
  right: '0%',
  height: '100%',
  // transform: "translate(-50%, -50%)",
  width: '22.5%',
  bgcolor: 'background.paper',
  borderStyle: 'none !Important',
  // boxShadow: 24,
  p: 2,
  outline: 'none',
  // boxShadow: "none !Important",
  // borderRadius: "5px",
};

function AddPeopleModal({ open, handleOpenAddPeopleModel, handleCloseAddPeopleModel, text, meetingToken }) {
  const socket = useSocket();
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const dispatch = useDispatch();

  const chatArr = ['assd'];
  const [chat, setChat] = useState([]);
  const [addPeopleModal, setAddPeopleModal] = useState({
    message: '',
  });

  const handleChangeInput = (e) => {
    setAddPeopleModal({ ...addPeopleModal, message: e.target.value });
  };

  const [getPlatData, setGetPlatData] = useState({});
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const [searchPublisher, setSearchPublisher] = useState('');

  const socketHandler = (msg) => {
    setChat((mycomment) => [...mycomment, msg]);
    console.log('hlw', msg);
  };

  useEffect(() => {
    socket?.on('lhWfTBxQv0', socketHandler);

    return () => {
      socket?.off('lhWfTBxQv0', socketHandler);
    };
  }, [socket]);

  useEffect(async () => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    if (GetPlatData) {
      if (LoginData) {
        // get users data
        const params = `limit=10&platform_id=${GetPlatData.platform_id}&search=${searchPublisher}&keyword=`;
        dispatch(forwardBriif(params, LoginData.access_token, onForwardBriifSuccess, onForwardBriifError));

        // const socket = io.connect(
        //   URL.khbaseUrl,
        //   {
        //     extraHeaders: { Authorization: `Bearer ${LoginData.access_token}` },
        //   },
        //   { reconnect: true },
        // );
        console.log(socket, '0000');
        setGetPlatData(GetPlatData);
        const user_id = LoginData.id;
        setId(user_id);
        setToken(LoginData.access_token);

        const axios = require('axios');

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${URL.khbaseUrl}show_live_comment?token_id=lhWfTBxQv0&platform_id=18`,
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
      }
    }
    return () => {};
  }, [searchPublisher]);

  const sendMessage = () => {
    // console.log(getPlatData,"getPlatDAta",id,meetingToken.channel);
    if (!addPeopleModal.message.length == '') {
      console.log(token, 'token');
      const axios = require('axios');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${URL.khbaseUrl}add_liveComment?user_id=${id}&comment=${addPeopleModal.message}&platform_id=18&token_id=lhWfTBxQv0`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please type something to comment');
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevents the default behavior of the "Enter" key (form submission, new line)
      sendMessage(); // Call the function to send the message
    }
  };

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  // add users
  const [showUsers, setShowUsers] = useState(false);
  const publisherRef = useRef();
  const [allUsers, setAllUsers] = useState([]);

  const onForwardBriifSuccess = (res) => {
    setAllUsers(res.data.users);
    if (router.query.mode == 'edit') {
      let user = res.data.users.items.filter((item) => {
        return item.id == props.chaptersCreateRes.data.publisher_id;
      });
      props.setPublisher(user[0]);
    }
  };

  const onForwardBriifError = (err) => {
    console.log('rror =>', err);
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <div className="d-flex">
            <div className="semibold">{text}</div>

            <div className="float-end" onClick={handleCloseAddPeopleModel} style={{ marginLeft: 'auto' }}>
              <Image
                src="/assets/icons/meetingIcons/cross.png"
                height={20}
                width={20}
                alt="AddPeople"
                onClick={handleCloseAddPeopleModel}
              />
            </div>
          </div>

          {text == 'People' ? (
            <>
              <div className="d-flex mt-3">
                <div>
                  <Image src="/assets/icons/meetingIcons/profile-add.png" height={20} width={20} alt="AddPeople" />
                </div>
                <div className=" regular-xsmall ms-2">Add people</div>
              </div>
              <div className={`${classes.input_border} d-flex align-items-center mt-3`}>
                <div className="mt-1 mx-3">
                  <Image src="/assets/icons/meetingIcons/search.png" height={20} width={20} alt="search" />
                </div>
                <div className="position-relative w-100">
                  <input
                    className={`${classes.input} regular-xsmall w-100`}
                    placeholder="Add people"
                    type="text"
                    style={{ background: 'transparent' }}
                    onChange={(e) => setSearchPublisher(e.target.value)}
                    onClick={(e) => {
                      showUsers == true ? '' : setShowUsers(true);
                    }}
                    value={searchPublisher}
                  />

                  {showUsers == true ? (
                    <div ref={publisherRef} id="menuBox" className={`${classes.dropdownElement} `}>
                      {allUsers?.items != undefined
                        ? allUsers?.items.map((user) => (
                            <div className="single-user-hover-effect w-100">
                              <div
                                className="d-flex py-2 flex-row px-3 align-items-center"
                                style={{ cursor: 'pointer' }}
                                key={user.id}
                                onClick={(e) => {
                                  // props.setPublisher(user);
                                  setShowUsers(false);
                                  setSearchPublisher('');
                                }}
                              >
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
                            </div>
                          ))
                        : ''}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="regular-mid-small mt-2">In call</div>
              <div className="d-flex mt-2">
                <div className="mt-1" onClick={handleCloseAddPeopleModel}>
                  <Image
                    src="/assets/icons/meetingIcons/user.png"
                    height={32}
                    width={32}
                    alt="AddPeople"
                    onClick={handleCloseAddPeopleModel}
                  />
                </div>
                <div className="semibold ms-2">
                  <div className="semibold-small">Iyana Xuel (You)</div>
                  <div className="regular-xxsmall">Meeting Host</div>
                </div>
                <div className="mt-1 " style={{ marginLeft: 'auto' }}>
                  <Image
                    src="/assets/icons/meetingIcons/3dots.png"
                    height={24}
                    width={24}
                    alt="AddPeople"
                    // onClick={handleCloseAddPeopleModel}
                  />
                </div>
              </div>
            </>
          ) : (
            <div style={{ height: '95%', position: 'relative' }}>
              <div className={`${classes.input_border1} d-flex mt-3`}>
                <div className="col-9 mt-1">
                  <input
                    className={`${classes.input1} regular-xsmall w-100 `}
                    placeholder="Send message to everyone"
                    type="text"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <div className="col-3 mx-3">
                  <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                </div>
              </div>
              <div className="regular-xxsmall mt-3">
                Messages can only be seen by people in the call and are deleted when the call ends
              </div>
              <div style={{ height: '72%', overflowY: 'scroll' }}>
                {chat.length != 0 &&
                  chat?.map((item) => (
                    <div className="mt-2 ">
                      <div className="d-flex">
                        <div className="mt-2">
                          <Image
                            // src="/assets/images/userProfile.png"
                            className="rounded-circle"
                            src={
                              awsLink !== undefined && item.image !== null
                                ? awsLink + 'users/profileImages/' + item.image
                                : '/assets/icons/new/user.svg'
                            }
                            height={26}
                            width={26}
                            alt="AddPeople"
                            // onClick={sendMessage}
                          />
                        </div>
                        <div className="ms-2">
                          <div className="d-flex">
                            <div className={`semibold-small`}>{`${item.first_name} ${item.last_name}`} </div>
                            <div className="regular-xxsmall ms-2 mt-1">12:15</div>
                          </div>
                          <div className="regular-small">{item.comment}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className=" w-100" style={{ bottom: '15px', position: 'absolute' }}>
                <div className={`${classes.input_border1} d-flex mt-3`}>
                  <div className="col-10 ">
                    <input
                      className={`${classes.input1} regular-xsmall w-100 `}
                      placeholder="Send message to everyone"
                      type="text"
                      style={{ background: 'transparent' }}
                      value={addPeopleModal.message}
                      name="message"
                      onChange={handleChangeInput}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="col-2 mt-1">
                    <div className=" float-end">
                      <Image
                        src="/assets/icons/meetingIcons/Send.png"
                        height={16}
                        width={16}
                        alt="AddPeople"
                        onClick={sendMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
export default AddPeopleModal;
