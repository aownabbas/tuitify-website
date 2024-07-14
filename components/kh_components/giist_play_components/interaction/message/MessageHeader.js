import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Item, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import AlertModal from '../../../../modals/alertmodal/AlertModal';
import { useDispatch } from 'react-redux';
import { editLoadComments } from '../../../../../redux/actions/giist_comments/LoadComments';
import { useRouter } from 'next/router';
import EditInteraction from '../../../../modals/editInteraction/EditInteraction';
import classes from './GiistsMessage.module.css';

const MessageHeader = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [deletedInteractionModal, setDeletedInteractionModal] = useState(false);

  const [comment, setComment] = useState(props.comment);

  const [getPlatData, setGetPlatData] = useState(null);
  const [loginData, setLoginData] = useState({});

  const [editIntraction, setEditIntraction] = useState(false);
  const openEditModal = () => setEditIntraction(true);
  const closeEditModal = () => setEditIntraction(false);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      setLoginData(LoginData);
      const id = LoginData.id;
      setUserId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);

      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
    }

    return () => { };
  }, []);

  const truncString = (props.firstName + ' ' + props.lastName).substring(0, 15);
  let textDate = '';
  let noUTCdate = '';


  const created = props.created;
  if (moment.utc(created).isValid()) {
    const formattedDate = moment.utc(created).format('YYYY-MM-DD HH:mm:ss');
    textDate = moment(formattedDate).fromNow();
    noUTCdate = formattedDate.split(' ')[0];

  }

  console.log("textDatedkkdk", textDate)

  const handleDeleteInteractionModalOpen = () => setDeletedInteractionModal(true);
  const handleDeleteInteractionModalClose = () => setDeletedInteractionModal(false);

  const handleDeleteInteraction = async () => {
    props.setInteractionsLoading(true);
    await props.handleInteractionDelete(props.id, props.giist_id);
  };

  const setComentHandler = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleEditApi = () => {
    let data = {
      id: props.id,
      comment: comment,
      type: '3',
      duration: '0',
    };
    dispatch(editLoadComments(data));
  };

  const handleEditComment = (id, editedComment) => {
    props.setEditedId(id);
    let data = {
      id: id,
      comment: editedComment,
      type: '3',
      duration: '0',
    };
    dispatch(editLoadComments(data));
  };
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    <>
      {deletedInteractionModal == true && (
        <AlertModal
          alertOpen={deletedInteractionModal}
          handleAlertClose={handleDeleteInteractionModalClose}
          handleAlertActionBriif={handleDeleteInteraction}
          briifId={props.id}
          briifAId={props.giist_id}
          image={<Image src="/assets/icons/new/trash.svg" className="" width="65px" height="90%" alt="delete" />}
          title="Delete"
          description="Are you sure you want to delete this comment"
          button1="Cancel"
          button2="Yes"
        />
      )}
      <div className="d-flex justify-content-between mt-2 mb-1 px-1">
        <span className="px-2 d-flex justify-content-center" style={{ height: '30px' }}>
          <Image
            className="p-0 rounded-circle position-absolute "
            src={
              props.image == null
                ? '/assets/icons/new/user.svg'
                : getPlatData
                  ? getPlatData == (null || {})
                    ? ''
                    : `${awsLink}users/profileImages/${props.image}`
                  : '/assets/icons/new/user.svg'
            }
            onClick={() => {
              router.push({ pathname: '/combine/UserProfile', query: { user: props.user_id } });
            }}
            alt="Alex Photo"
            width="30px"
            height="100%"
          />
        </span>
        {props.editTextMessage == true ? (
          <>
            <div className="col-11 ps-0 ">
              <div
                className="d-flex align-items-center"
                style={{
                  background: 'none',
                  border: '0.656338px solid #303548',
                  borderRadius: '16px',
                  padding: '11px',
                }}
              >
                <div className="w-100 ms-3 medium-large">
                  <input
                    className="w-100"
                    style={{
                      background: 'none',
                      border: 'none',
                    }}
                    placeholder="Add comment"
                    type="text"
                    value={comment}
                    onChange={setComentHandler}
                    autofocus="autofocus"
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-end pe-0">
              <div className="col-3 mt-2 ps-3 pe-0">
                {/* this button closes the modal */}
                <button
                  className="bg-white w-100 py-2 semibold"
                  onClick={() => {
                    props.setEditTextMessage(false);
                    setComment(props.comment);
                  }}
                  style={{ borderRadius: '7px', border: '1px solid #303548' }}
                >
                  Cancel
                </button>
              </div>
              <div className="col-3 mt-2 ps-3 pe-0">
                <button
                  className="main-background-color text-white w-100 py-2 semibold"
                  disabled={comment == '' ? true : false}
                  onClick={() => {
                    handleEditApi();
                    props.setEditTextMessage(false);
                  }}
                  style={
                    comment == ''
                      ? { opacity: '0.6', cursor: 'not-allowed', borderRadius: '7px', border: '1px solid #303548' }
                      : { borderRadius: '7px', border: '1px solid #303548' }
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-between w-100">
            <span className="px-2">
              <p className="p-0 text-black m-0 text-capitalize semibold-small">
                {(props.firstName + props.lastName)?.length > 15
                  ? truncString + ((props.firstName + props.lastName).length > 8 ? '...' : '')
                  : props.firstName + ' ' + props.lastName}
              </p>
              <p className="light-small mb-0">
                {textDate.includes('a few seconds ago') || textDate.includes('in a few seconds')
                  ? textDate.replace('in a few seconds', 'just now') || textDate.replace('a few seconds ago', 'just now')
                  : textDate}
              </p>
            </span>
            <span className="p-0 text-end px-3 d-flex justify-content-end ">
              {props.user_id == userId && (
                <NavDropdown
                  className="interactiondeletedropdown"
                  title={
                    <Image
                      width="18px"
                      height="14px"
                      alt="more"
                      style={{ opacity: '0.4' }}
                      className="p-0"
                      src={`/assets/icons/new/more.svg`}
                    />
                  }
                  id="basic-interaction-dropdown"
                  active={false}
                >
                  <NavDropdown.Item
                    className={`px-0 m-0 ${classes.customDropdownItem}`}
                    style={props.type == 3 ? { borderRadius: '8px 8px 0px 0px' } : { borderRadius: '8px 8px 8px 8px' }}
                  >
                    <div
                      className={`ps-3 regular-xsmall ${classes.customDropdownItem}`}
                      onClick={() => {
                        handleDeleteInteractionModalOpen();
                      }}
                    >
                      <span className="d-flex align-items-center  py-1">
                        <Image
                          width="16px"
                          height="16px"
                          alt="more"
                          className="p-0"
                          src={`/assets/icons/new/trash.svg`}
                        />
                        &nbsp; &nbsp; Delete
                      </span>
                    </div>
                  </NavDropdown.Item>
                  {props.type == 3 ? (
                    <NavDropdown.Item
                      className={`px-0 m-0 ${classes.customDropdownItem}`}
                      style={{ borderRadius: '0px 0px 8px 8px' }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div
                        className={`ps-3 regular-xsmall ${classes.customDropdownItem}`}
                        onClick={() => {
                          // props.setEditTextMessage(true);
                          openEditModal();
                        }}
                      >
                        <span className="d-flex align-items-center py-1">
                          <Image
                            width="16px"
                            height="16px"
                            alt="more"
                            className="p-0"
                            src={`/assets/images/edit-pencil.svg`}
                          />
                          &nbsp; &nbsp; Edit
                        </span>
                      </div>
                    </NavDropdown.Item>
                  ) : (
                    ''
                  )}
                </NavDropdown>
              )}
            </span>
          </div>
        )}
      </div>
      <EditInteraction
        openModal={editIntraction}
        handleCloseModal={closeEditModal}
        comment={comment}
        setComment={setComment}
        commentId={props.id}
        handleEditComment={handleEditComment}
      />
    </>
  );
};

export default MessageHeader;
