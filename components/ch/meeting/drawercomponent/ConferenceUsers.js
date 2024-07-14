import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddHostConference } from '../../../../redux/actions/AddHostConference';
import RemoveUserMeetAction from '../../../../redux/actions/RemoveUserMeetAction';

export const ConferenceUsers = ({
  items,
  // key,
  awsLink,
  handleClick,

  // addHostHandler,
  userId,
  meetingChannel,
  superHost,
  invited_user_join,
  isHost,
  is_host,
  status,
  setDropdownMenu,
  socketedHostUserid,
  // removeUser,
  setUserIdtobeRemoved,
  removeCall,
}) => {
  const [dropdownMenue, setdropdownMenue] = useState(null);
  const dispatch = useDispatch();

  const handleDropdownToggle = (dropdownId) => {
    setdropdownMenue((prevDropdownId) => (prevDropdownId === dropdownId ? null : dropdownId));
  };

  // add host
  const addHostHandler = async (user_id) => {
    const addhostParams = {
      channel: meetingChannel,
      user_id: String(user_id),
    };
    await dispatch(AddHostConference(addhostParams, onAddhostSuccess, onAddhostError));
  };

  const onAddhostSuccess = (res) => {
    console.log(res, 'add host response');
  };
  const onAddhostError = (err) => {
    console.log(err, 'add host response');
  };

  const RemoveUserFromMeet = (id) => {
    let param = { channel: meetingChannel, user_id: String(id) };
    setUserIdtobeRemoved(id);
    dispatch(RemoveUserMeetAction(param, onRemoveUsersSuccess, onRemoveUsersError));
    setDropdownMenu(null);
    removeCall();
  };
  const onRemoveUsersSuccess = (res) => {
    console.log(res, 'hhh');
  };
  const onRemoveUsersError = (err) => {
    console.log(err, 'hhh');
  };
  const { id } = JSON.parse(localStorage.getItem('@LoginData'));

  return (
    <div className="d-flex mt-2 mx-2 position-relative" key={userId}>
      <div className="mt-1 position-relative" style={{ height: '32px', borderRadius: '32px' }}>
        <Image
          src={items.image == null ? '/assets/icons/new/user.svg' : `${awsLink}users/profileImages/${items.image}`}
          height={32}
          width={32}
          alt="AddPeople"
          style={{ objectFit: 'cover', borderRadius: '30px' }}
        />
      </div>
      <div className="semibold ms-2">
        <div className="semibold-small">
          {items.first_name} {items.last_name}
        </div>
        {/* <div className="regular-xxsmall">{userId == id || items.is_host == 1 ? 'Host' : 'User'}</div> */}
        <div className="regular-xxsmall">
          {userId == id && items.is_host == 1 ? 'You (Host)' : userId != id && items.is_host == 1 ? 'Host' : 'User'}
        </div>
      </div>
      {userId == id ? (
        ''
      ) : isHost == true || superHost?.is_host == 1 || invited_user_join?.is_host == 1 ? (
        <div className="mt-1 position-relative" style={{ marginLeft: 'auto' }}>
          <Image
            src="/assets/icons/meetingIcons/3dots.png"
            height={24}
            width={24}
            alt="AddPeople"
            onClick={(e) => {
              handleClick(e);
              e.stopPropagation();
              handleDropdownToggle(userId);
            }}
          />
          {/* {dropdownMenue ? ( */}
          {dropdownMenue == userId ? (
            <div
              style={{
                marginTop: '5px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                background: '#FFFFFF',
                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.08)',
                borderRadius: '10px',
                width: '11rem',
                position: 'absolute',
                right: '20%',
                zIndex: '1',
              }}
            >
              {userId != id && items.is_host == 1 ? (
                ''
              ) : (
                <div
                  className="d-flex justify-content-start p-2"
                  onClick={async () => {
                    await addHostHandler(userId);
                    setdropdownMenue(false);
                  }}
                >
                  <Image src={'/assets/icons/new/add-menu-dropdown.svg'} height={24} width={24} alt="add" />
                  <p sx={{ display: 'flex', paddingLeft: '10px' }} className="mx-2 cursor-pointer">
                    Add as a host
                  </p>
                </div>
              )}
              <div
                className="d-flex justify-content-start p-2"
                onClick={async () => {
                  RemoveUserFromMeet(userId);
                  setdropdownMenue(false);
                }}
              >
                <Image src={'/assets/icons/new/trash-menu-dropdown.svg'} height={24} width={24} alt="add" />
                <p sx={{ display: 'flex', paddingLeft: '10px' }} className="mx-2 cursor-pointer">
                  Remove
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
