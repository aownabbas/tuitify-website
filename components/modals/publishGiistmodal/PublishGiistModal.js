import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import classes from './PublishGiistModal.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import Image from 'next/image';
import { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserProfileAction from '../../../redux/actions/UserProfileAction';
import forwardBriif from '../../../redux/actions/Forward';
import Kh_RejectGiistAction from '../../../redux/actions/Kh_RejectGiistAction';
import styles from '../../kh_components/giistcreation/assignpublisher/AssignPublisher.module.css';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import updateGiist from '../../../redux/actions/UpdateGiist';
import { URL } from '../../../public/assets/path/path';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';
import { useMemo } from 'react';
import SetPublihser from '../../kh_components/giistcreation/assignpublisher/SetPublihser';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
  },
  centeringContent: {
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0px',
    paddingTop: '2vh',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid #353452',
    color: '#353452',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #353452',
    },
  },
  unpublishButtonStyle: {
    // width: '132px',
    height: '32px',
    borderRadius: '50px',
    textTransform: 'capitalize',
    border: '1px solid grey',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid grey',
    },
  },
  yesButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize',
    backgroundColor: '#353452',
    '&:hover': {
      backgroundColor: '#353452',
      textShadow: 'none',
    },
  },
  RadioButton: {
    color: pink[800],
    '& .MuiSvgIcon-root': {
      fontSize: 28,
    },
    '&.Mui-checked': {
      color: pink[600],
    },
  },
  usersListPane: {
    marginTop: '1rem !important',
    position: 'absolute',
    borderRadius: '12px',
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid grey',
    height: '150px',
    position: 'absolute',
    zIndex: '1',
    overflowY: 'scroll',
    boxShadow: '5px 5px 5px 5px grey',
    p: 2,
  },
};

const PublishGiistModal = ({
  openPublishModal,
  handleCloseModal,
  giistId,
  publisherFirstName,
  publisherLastName,
  publisherImage,
  publisherId,
  setDotProgressLoading,
  handleOpendModalPublish,
  handleGiistApiCall,
  // Aown: In publishGiistModal i have added onclick event.
  stopClickingEvent
}) => {
  const {
    modalStyle,
    centeringContent,
    modalHeading,
    buttonGroup,
    noButton,
    yesButton,
    RadioButton,
    usersListPane,
    unpublishButtonStyle,
  } = style;

  const [selectedValue, setSelectedValue] = useState();
  const [showUsers, setShowUsers] = useState(false);
  const [val, setVal] = useState([]);
  const [chipVal, setChipVal] = useState();
  const [publisher, setPublisher] = useState(null);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const [searchPublisher, setSearchPublisher] = useState('');

  const ref = useRef();
  useOnClickOutside(ref, () => setShowUsers(false));

  const [platformData, setPlatformData] = useState(null);
  const [loginData, setLoginData] = useState();
  const [token, setToken] = useState();
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState();
  const [userProfileDetails, setUserProfileDetails] = useState([]);

  useEffect(() => {
    publisherId === null || publisherId === userId ? setSelectedValue('a') : setSelectedValue('b');
  }, []);
  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (GetPlatData) {
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      setUserId(LoginData.id);
      setPlatformData(GetPlatData);
      setLoginData(LoginData);
      setToken(LoginData.access_token);
    }
  }, []);

  console.log(userProfileDetails, 'all users here');

  const dispatch = useDispatch();

  const onForwardBriifSuccess = (res) => {
    setUserProfileDetails(res.data.users.items);
  };

  const onForwardBriifError = (err) => {
    console.log(err, 'err');
  };

  function handleAdd() {
    var add = [...val, []];
    setVal(add);
    setFilter('');
  }
  const handleDelete = (id) => {
    setVal('');
    setChipVal('');
    editifnormation(null);
  };

  const FilterUser = () => {
    setShowUsers(true);
    const params = `limit=10&platform_id=${platformData?.platform_id}&search=&keyword=`;
    dispatch(forwardBriif(params, '', onForwardBriifSuccess, onForwardBriifError));
  };
  const fetchUsers = (searchItem) => {
    const params = `limit=10&platform_id=${platformData?.platform_id}&search=${searchItem}&keyword=`;
    dispatch(forwardBriif(params, '', onForwardBriifSuccess, onForwardBriifError));
  };

  const handleFilterUser = () => {
    let timerId;
    return (e) => {
      const searchItem = e.target.value;
      setFilter(searchItem);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchUsers(searchItem);
      }, 1000);
    };
  };

  const searchitem = useMemo(() => handleFilterUser(), []);

  const removePublisher = () => {
    setPublisher_firstNAme();
    setPublisher_lastName();
    setPublisher_image();
    var unpublishgiistParams = JSON.stringify({
      id: giistId,
      publisher_id: null,
    });
    dispatch(updateGiist(unpublishgiistParams, token, onUpdateGiistSuccess, onUpdateGiistError));
    FilterUser();
  };
  const onUpdateGiistSuccess = (res) => {
    console.log(res, 'resp');
  };
  const onUpdateGiistError = (err) => {
    console.log(err, 'err');
  };

  const [publisher_id, setPublisher_id] = useState(publisherId);
  const [publisher_firstName, setPublisher_firstNAme] = useState(publisherFirstName);
  const [publisher_lastName, setPublisher_lastName] = useState(publisherLastName);
  const [publisher_image, setPublisher_image] = useState(publisherImage);
  const [reason, setReason] = useState('');

  const publishGiist = async () => {
    handleCloseModal(false);
    setDotProgressLoading(true);
    var data;
    selectedValue == 'a'
      ? (data = JSON.stringify({ id: giistId }))
      : (data = JSON.stringify({ id: giistId, publisher_id: publisher.id, message: reason }));
    setDotProgressLoading(true);
    await GlobalApiCall(
      `${URL.khbaseUrl}publishGiist`,
      'put',
      data,
      function (response) {
        setDotProgressLoading(false);
        if (response.data.status == true) {
          handleOpendModalPublish({
            heading: 'Giist Published',
            message: `Congratulations, ${response.data.message}`,
            buttonText: 'Okay',
            image: '/assets/icons/new/checkedtick.svg',
          });
          handleGiistApiCall();
        } else {
          handleOpendModalPublish({
            heading: 'Something Wrong',
            message: response.message,
            buttonText: 'Try Again',
            image: '/assets/icons/danger.svg',
          });
        }
      },
      function (error) {
        setDotProgressLoading(false);
        handleOpendModalPublish({
          heading: 'Something Wrong',
          message: error.response.data.message[0],
          buttonText: 'Try Again',
          image: '/assets/icons/danger.svg',
        });
      },
    );
  };

  return (
    <Modal
      open={openPublishModal}
      onClose={handleCloseModal}
      aria-labelledby="publish-giist-modal-title"
      aria-describedby="publish-giist-modal-description"
      // Aown: In publishGiistModal i have added onclick event.
      onClick={stopClickingEvent}
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Typography id="publish-giist-modal-title" sx={modalHeading}>
            Publish Giist
          </Typography>
          <Typography id="publish-giist-modal-description" sx={{ mt: 2 }}>
            select a publisher who can publish your giists
          </Typography>
          <div className="row">
            <FormControlLabel
              value="best"
              control={<Radio {...controlProps('a')} color="primary" sx={RadioButton} />}
              label="Myself"
            />
          </div>
          <div className="row">
            <FormControlLabel
              value="best"
              control={<Radio {...controlProps('b')} color="primary" sx={RadioButton} />}
              label="Another Publisher"
            />
          </div>
          {giistId === null || publisherId === userId || selectedValue == 'a' ? (
            ''
          ) : (
            <>
              <Box pt={1} sx={{ position: 'relative' }}>
                {publisher == null ? (
                  ''
                ) : (
                  <div
                    className={`${styles.tag} col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 mb-3`}
                    style={{ width: '200px' }}
                  >
                    <div className="d-flex align-items-center justify-content-between " style={{ cursor: 'pointer' }}>
                      <div className="gap-3 pt-1 px-0 d-flex  align-items-center justify-content-center">
                        <Image
                          style={{ borderRadius: '15px' }}
                          src={
                            publisher.image == null
                              ? '/assets/icons/new/user.svg'
                              : `${awsLink}users/profileImages/${publisher.image}`
                          }
                          height={30}
                          width={30}
                          alt="avatar"
                        />
                      </div>
                      <div className="semibold-mid-small text-start text-nowrap p-2 ">
                        {`${
                          (publisher.first_name + ' ' + publisher.last_name).length > 14
                            ? (publisher.first_name + ' ' + publisher.last_name).slice(0, 14) + '...'
                            : publisher.first_name + ' ' + publisher.last_name
                        }`}
                        <p className="medium-small text-secondary text-start mb-0">{publisher.email}</p>
                      </div>
                      <div className=" px-0 d-flex justify-content-center">
                        <Image
                          src="/assets/icons/new/whitecirclecross.svg"
                          onClick={(e) => {
                            setPublisher(null);
                          }}
                          width="21px"
                          height="21px"
                          alt="cross"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  onClick={(e) => {
                    showUsers == true ? '' : setShowUsers(true);
                  }}
                  placeholder="Search publisher by name..."
                  className={`${styles.myInput}`}
                  disabled={publisher != null ? true : false}
                  value={searchPublisher}
                  onChange={(e) => setSearchPublisher(e.target.value)}
                />
                {showUsers && (
                  <SetPublihser
                    platformData={platformData}
                    loginData={loginData}
                    searchPublisher={searchPublisher}
                    setSearchPublisher={setSearchPublisher}
                    showUsers={showUsers}
                    setShowUsers={setShowUsers}
                    isModal={true}
                    setPublisher={setPublisher}
                    publisher={publisher}
                  />
                )}
              </Box>

              <Box pt={2}>
                <textarea
                  rows="5"
                  name="description"
                  placeholder="Enter details here..."
                  className={classes.multilineTxtField}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Box>
            </>
          )}
          <Box sx={buttonGroup}>
            <Button variant="outlined" onClick={handleCloseModal} sx={noButton}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={yesButton}
              onClick={() => {
                publishGiist();
                handleCloseModal();
              }}
            >
              {selectedValue == 'a' ? 'Publish' : 'Change Publisher'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PublishGiistModal;
