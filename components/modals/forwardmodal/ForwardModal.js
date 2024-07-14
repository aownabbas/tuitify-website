import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import forwardSelectedUsersBriif, { forwardDraftUserBriif } from '../../../redux/actions/ForwardSelectedUsers';
// custom success modal
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';
import SetAudience from '../../combine/audience/SetAudience';
import Image from 'next/image';

// modal styles.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 424,
  height: 470,
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  pt: 4,
  pb: 4,
  pl: 2,
  pr: 2,
};

const ForwardModal = (props) => {
  const dispatch = useDispatch();
  const [getPlatData, setGetPlatData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkedGroups, setCheckedGroups] = useState([]);
  const checkedUserIds = checkedUsers?.map((user) => user.id);
  const checkedGroupsIds = checkedGroups?.map((group) => group.id);
  const { data } = useSelector((state) => state.sidebar);

  const [successErrorAlert, setSuccessErrorAlert] = useState(false);

  const [succErrorMessage, setSuccErrorMessage] = useState(null);

  const handleOpenAlert = ({ heading, message, buttonText, image, link, move }) => {
    setSuccErrorMessage({ heading, message, buttonText, image, link, move });
    setSuccessErrorAlert(true);
  };

  const handleColseAlert = () => {
    setSuccessErrorAlert(false);
  };

  const [audienceUser, setAudienceUser] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [platformData, setPlatformData] = useState('');

  const [error, setError] = useState('');
  const [setShowAudience, setSetShowAudience] = useState(false);

  // function for forwarding briif to the users.
  const handleForwardSelectedUsersBriif = (briff_id, checkedUserIds, checkedGroupsIds) => {
    if (selectedCheckbox != 1) {
      if (!checkedUserIds.length && !checkedGroupsIds.length) {
        setError('Please enter recipient(s);');
        return;
      }
    }
    props.setLoading(true);
    props.handleAlertClose();
    let params = {
      briff_id: [briff_id.toString()],
    };
    if (selectedCheckbox == 1) {
      params.public = selectedCheckbox;
    } else {
      if (checkedUserIds.length) {
        params.id = checkedUserIds;
      }
      if (checkedGroupsIds.length) {
        params.group_id = checkedGroupsIds;
      }
    }
    // Dispatching action.
    dispatch(forwardSelectedUsersBriif(params, onForwardSelectedUsersBriifSuccess, onForwardSelectedUsersBriifError));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);
  // this functions run if Forward to users Api response is true.
  const onForwardSelectedUsersBriifSuccess = (res) => {
    if (res.data.status == 'true') {
      props.handleRefreshBriifsData();
      props.setLoading(false);
      handleOpenAlert({
        heading: 'SENT!',
        message: `The briif has been sent\nSuccessfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/tick-circle.svg',
        move: false,
      });
      setCheckedGroups([]);
      setCheckedUsers([]);
    }
  };

  // this functions run if Forward to users Api response is false.
  const onForwardSelectedUsersBriifError = (err) => {
    // error modal open.
    props.setLoading(false);
    handleOpenAlert({
      heading: 'Something went wrong!',
      message: 'Let’s give it another try',
      buttonText: 'Try again',
      image: '/assets/icons/new/red_alert.svg',
      move: false,
    });
  };

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (LoginData) {
      const id = LoginData.id;
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    return () => { };
  }, []);

  const handleCheckboxChange = (event) => {
    if (event.target.id == '1') {
      setCheckedGroups([]);
      setCheckedUsers([]);
    }
    setSelectedCheckbox(event.target.id);
  };
  const [loadingRecipents, setLoadingRecipents] = useState(false);

  useEffect(() => {
    let params = `briff_draft_receipts?briff_id=${props?.briif_id}`;
    if (data == 'draft') {
      setLoadingRecipents(true);
      dispatch(forwardDraftUserBriif(params, onForwardDraftUsersBriifSuccess, onForwardDraftUsersBriifError));
    }
    return () => { };
  }, []);

  const onForwardDraftUsersBriifSuccess = (res) => {
    if (res.status == true) {
      setLoadingRecipents(false);
      if (res.data.public == 1) {
        setSelectedCheckbox(res.data.public);
        setCheckedGroups(res.data.receipt_groups);
        setCheckedUsers(res.data.receipt_users);
      } else {
        if (res.data.receipt_groups.length || res.data.receipt_users.length) {
          setSelectedCheckbox('2');
          setCheckedGroups(res.data.receipt_groups);
          setCheckedUsers(res.data.receipt_users);
        }
      }
    }
  };

  const onForwardDraftUsersBriifError = (err) => {
    console.log('err', err);
    setLoadingRecipents(false);
  };

  return (
    <>
      <Modal style={{ zIndex: 100000 }} open={props.alertOpen} onClose={props.handleAlertClose}>
        <Box sx={style} className="text-center border-0 bg-white">
          <Typography id="modal-modal-title" sx={{ mt: 1 }} className="fs-4 bold ms-0">
            {props.title}
          </Typography>
          <Typography className="medium-large px-1 text-start text-secondary" sx={{ mt: 1, mb: 1 }}>
            {props.description}
          </Typography>
          <div className="w-100">
            <SetAudience
              Recipient={true}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              audienceUser={audienceUser}
              setAudienceUser={setAudienceUser}
              allGroups={allGroups}
              platformData={platformData}
              setShowAudience={setSetShowAudience}
              showAudience={setShowAudience}
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              checkedGroups={checkedGroups}
              setAllGroups={setAllGroups}
              setCheckedGroups={setCheckedGroups}
              briif_id={props?.briif_id}
              selectedCheckbox={selectedCheckbox}
              setSelectedCheckbox={setSelectedCheckbox}
              setLoadingRecipents={setLoadingRecipents}
              loadingRecipents={loadingRecipents}
              handleCheckboxChange={handleCheckboxChange}
            />

            <p className="text-danger">{error}</p>
            <div
              style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', borderRadius: '7px' }}
              className="py-2 px-4 "
            >
              <button
                className="main-background-color text-white w-100 py-2 mb-2 semibold  "
                style={{ borderRadius: '7px', border: '2px solid #303548' }}
                onClick={() => handleForwardSelectedUsersBriif(props.briif_id, checkedUserIds, checkedGroupsIds)}
              >
                {props.button1}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      {successErrorAlert && (
        <SuccessModal
          modalOpen={successErrorAlert}
          handleModalClose={handleColseAlert}
          image={<Image src={succErrorMessage.image} width="65px" height="70px" alt="alert" />}
          title={succErrorMessage.heading}
          description={succErrorMessage.message}
          button1={succErrorMessage.buttonText}
        />
      )}
    </>
  );
};

export default ForwardModal;
