import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { URL } from '../../../public/assets/path/path';
// toggle button lib..
import ToggleButton from 'react-toggle-button';
import { useRouter } from 'next/router';
import ForwardMeetingLink from '../../../components/modals/forwardmodal/forwardMeetingLink';
// redux lib..
import { useDispatch } from 'react-redux';
import sendToken from '../../../redux/actions/SendToken';
import Image from 'next/image';
import Link from 'next/link';
import classes from './LiveModel.module.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';

// modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: 'auto',
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 5,
};

const LiveModal = (props) => {
  // all states and variables
  const dispatch = useDispatch();
  const router = useRouter();

  const [on, seton] = useState(true);
  const [chat, setChat] = useState(true);
  const [title, setTitle] = useState();
  const [description, setdiscription] = useState();
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState('');
  const [arraydata, setArraydata] = useState([]);
  const [channel, setChannel] = useState();
  const [platformId, setplatformId] = useState();
  const [id, setId] = useState();
  const [videoCall, setVideoCall] = useState(true);
  const [goLiveId, setgoLiveId] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [getPlatData, setGetPlatData] = useState({});
  const [getloginData, setGetloginData] = useState(null);

  const item = { channel: channel, goLiveId: goLiveId };

  console.log('getloginData =>', getloginData);

  let flag = false;

  useEffect(() => {
    if (!flag) {
      // login and platform data
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      const user_id = LoginData.id;
      setGetloginData(LoginData);
      setId(user_id);
      const id = LoginData.platform_id;
      setplatformId(id);

      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
      // random string for channel name
      let length = 10;
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      setChannel(result);
      console.log(result, 'result for channel');
      // return result
    }
    flag = true;
  }, []);

  // create live session button
  const goLive = async (e) => {
    e.preventDefault();
    setVideoCall(true);
    router.push({
      pathname: '/ch/LiveMeetings',
      query: {
        title: title,
        description: description,
        tag: tags,
        videoCall: videoCall,
        channel: channel,
      },
      shallow: true,
    });
    // by selecting user or group of users
    arraydata.length >= 1
      ? await GlobalApiCall(
          `${URL.khbaseUrl}create_live_meeting?name=${getPlatData.name}&tags=[document,new]&host_ids=[${id}]&user_id=${id}&date=2018-02-02 07:18:42&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&title=${title}&description=""&is_public=0&token=${channel}&allow_chat=1&groups=[]&notification_time&recordAndSave=${chat}&users=[${arraydata}]`,
          'post',
          {},
          (response) => {
            console.log(channel, 'in response 2');
            console.log(response, 'my api response');
            dispatch(sendToken({ token: channel, goLiveId: response.data.go_live_id }));
            setgoLiveId(response.data.go_live_id);
          },
          (err) => {
            console.log(err, 'nnn');
          },
        )
      : // axios
        //     .post(
        //       `${URL.khbaseUrl}create_live_meeting?name=${getPlatData.name}&tags=[document,new]&host_ids=[${id}]&user_id=${id}&date=2018-02-02 07:18:42&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&title=${title}&description=""&is_public=0&token=${channel}&allow_chat=1&groups=[]&notification_time&recordAndSave=${chat}&users=[${arraydata}]`,
        //     )
        //     .then((response) => {
        //       console.log(channel, 'in response 2');
        //       console.log(response, 'my api response');
        //       dispatch(sendToken({ token: channel, goLiveId: response.data.go_live_id }));
        //       setgoLiveId(response.data.go_live_id);
        //     })
        //     .catch((err) => {
        //       console.log(err, 'nnn');
        //     })
        // for all users live session

        await GlobalApiCall(
          `${URL.khbaseUrl}create_live_meeting?name=${getPlatData.name}&env=${getPlatData.env}&tags=[document,new]&host_ids=[${id}]&user_id=${id}&date=2018-02-02 07:18:42&platform_id=${getPlatData.platform_id}&title=${title}&description=""&is_public=1&token=${channel}&allow_chat=0&groups=[]&notification_time&recordAndSave=${chat}&users=[]`,
          'post',
          {},
          (response) => {
            console.log(channel, 'in response 2');
            dispatch(
              sendToken({
                channel: channel,
                goLiveId: response.data.go_live_id,
              }),
            );
            setgoLiveId(response.data.go_live_id);
          },
          (err) => {
            console.log(err, 'nnn');
          },
        );
    // axios
    //   .post(
    //     `${URL.khbaseUrl}create_live_meeting?name=${getPlatData.name}&env=${getPlatData.env}&tags=[document,new]&host_ids=[${id}]&user_id=${id}&date=2018-02-02 07:18:42&platform_id=${getPlatData.platform_id}&title=${title}&description=""&is_public=1&token=${channel}&allow_chat=0&groups=[]&notification_time&recordAndSave=${chat}&users=[]`,
    //   )
    //   .then((response) => {
    //     console.log(channel, 'in response 2');
    //     dispatch(
    //       sendToken({
    //         channel: channel,
    //         goLiveId: response.data.go_live_id,
    //       }),
    //     );
    //     setgoLiveId(response.data.go_live_id);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  // mandatory title button
  const validate = () => {
    title == '' ? setErrorMessage('This is mandatory') : setErrorMessage();
  };

  const callUsers = (e) => {
    setModalOpen(true);
  };

  const toggleHandler = () => {
    if (on == true) {
      seton(false);
      setModalOpen(true);
    } else {
      seton(true);
    }
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = tagsInput.trim();

    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setTagsInput('');
    }
  };
  const onChange = (e) => {
    const { value } = e.target;
    setTagsInput(value);
  };
  // const handleDelete = () => {
  //   console.info('You clicked the delete icon.');
  // };
  const handleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  return (
    <>
      {/* live modal */}
      {modalOpen == true && (
        <ForwardMeetingLink
          modalOpen={modalOpen}
          handleModalClose={() => setModalOpen(false)}
          setArraydata={setArraydata}
        />
      )}
      <Modal
        open={props.modalOpen}
        onClose={props.handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center border-0 bg-white">
          <Typography id="modal-modal-title" mb={2} className="bold" variant="h6" component="h2">
            Go Live
          </Typography>

          <input
            className={`${classes.inputStyle}`}
            placeholder="Title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className=" colour row">{errorMessage}</div>

          <div className="mrgntp2">
            <input
              className={`${classes.inputStyle}`}
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setdiscription(e.target.value)}
              type="text"
              required
            />
          </div>

          <div className="mrgntp2 mb-4">
            <input
              className={`${classes.inputStyle}`}
              placeholder="Tags"
              name="tags"
              value={tagsInput}
              onKeyDown={onKeyDown}
              onChange={onChange}
              type="text"
              disabled={tags.length > 4 ? true : false}
            />
          </div>
          <Grid container spacing={2} mb={2}>
            <Grid md={12}>
              {tags.map((tag) => (
                <Chip
                  // color="primary"
                  sx={{
                    marginLeft: '5px',
                    marginBottom: '10px',
                    '&:hover': { background: '#E8E8E8', color: '#FFFFFF' },
                  }}
                  label={tag}
                  variant="outlined"
                  // onDelete={handleDelete}
                  onDelete={tag === 'React' ? undefined : handleDelete(tag)}
                />
              ))}
            </Grid>
          </Grid>

          <div className="d-flex justify-content-between mb-5">
            <div className="d-flex justify-content-between">
              <div>
                <Image src="/assets/icons/public.png" alt="public" width="30px" height="30px" />
              </div>
              <div style={{ marginLeft: '5px' }}>Public</div>
            </div>
            <div>
              <ToggleButton sx={{ marginLeft: '20px' }} value={on} onToggle={toggleHandler} />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p>Record and Save</p>
            </div>
            <div>
              <ToggleButton
                value={chat}
                onToggle={(value) => {
                  setChat(false);
                }}
              />
            </div>
          </div>
          <div onClick={(e) => validate(e)}>
            <div
              className={(on && title) || arraydata.length >= 1 ? 'mrgntp' : 'mrgntp unclick'}
              onClick={(e) => validate(e)}
            >
              <button onClick={(e) => goLive(e)} className={classes.goLiveBtn}>
                Go Live
              </button>
              {/* </Link> */}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default LiveModal;
