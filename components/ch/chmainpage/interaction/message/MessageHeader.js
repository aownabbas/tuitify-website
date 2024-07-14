import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Item, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import AlertModal from '../../../../modals/alertmodal/AlertModal';
import DummyDeleteModal from '../../../../modals/deletemodal/DummyDeleteModal';

const MessageHeader = (props) => {
  const [userId, setUserId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [deletedInteractionModal, setDeletedInteractionModal] = useState(false);

  const [getPlatData, setGetPlatData] = useState(null);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
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

    console.log((props.firstName + ' ' + props.lastName)?.length, 'helloheader');
    return () => { };
  }, []);

  const truncString = (props.firstName + ' ' + props.lastName).substring(0, 15);
  let textDate = '';
  const created = props.created;
  if (moment.utc(created).isValid()) {
    const formattedDate = moment.utc(created).format('YYYY-MM-DD HH:mm:ss');
    textDate = moment(formattedDate).fromNow();
  }


  const handleDeleteInteractionModalOpen = () => setDeletedInteractionModal(true);
  const handleDeleteInteractionModalClose = () => setDeletedInteractionModal(false);

  const handleDeleteInteraction = (commentId, briifId) => {
    props.setInteractionsLoading(true);
    props.handleInteractionDelete(commentId, briifId);
  };
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    <>
      {deletedInteractionModal == true && (
        <DummyDeleteModal
          openModal={deletedInteractionModal}
          handleCloseModal={handleDeleteInteractionModalClose}
          image={'/assets/images/trash.svg'}
          heading="Delete"
          text="Are you sure you want to delete this Interaction?"
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => handleDeleteInteraction(props.id, props.briif_id)}
        />
      )}
      <div className="row mt-2 mb-1 px-3">
        <span className="p-0 col-2 col-sm-1 col-lg-2">
          <Image
            className="p-0 rounded-circle"
            src={
              props.image == null
                ? '/assets/icons/new/user.svg'
                : getPlatData
                  ? getPlatData == (null || {})
                    ? ''
                    : `${awsLink}users/profileImages/${props.image}`
                  : '/assets/icons/new/user.svg'
            }
            alt="Alex Photo"
            width="30px"
            height="30px"
          />
        </span>
        <span className="col-8 ps-0">
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
        <span className="col-2 p-0 text-end ps-3 d-flex justify-content-end">
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
            >
              <NavDropdown.Item className="px-0 bg-white border m-0 py-0" style={{ backgroundColor: 'red' }}>
                <div
                  className="ps-3 dropdown-text regular-xsmall"
                  onClick={() => {
                    handleDeleteInteractionModalOpen();
                  }}
                >
                  <span className="d-flex align-items-center dropdown-text py-2">
                    <Image width="16px" height="16px" alt="more" className="p-0" src={`/assets/icons/new/trash.svg`} />
                    &nbsp; &nbsp; Delete
                  </span>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </span>
      </div>
    </>
  );
};

export default MessageHeader;
