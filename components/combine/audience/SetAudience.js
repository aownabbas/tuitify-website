import React, { useMemo } from 'react';
import classes from '../../kh_components/giistcreation/assignpublisher/AssignPublisher.module.css';
import styles from '../../kh_components/giistcreation/giistdetails/Stepper.module.css';

import { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import forwardBriif, { FirstTimeCallGroups, FirstTimeCallUser, getGorupData, searchGroups, searchUsers } from '../../../redux/actions/Forward';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import CustomScrollbar from '../CustomScrollbar.js/CustomScrollbar';
import { forwardDraftUserBriif } from '../../../redux/actions/ForwardSelectedUsers';
import { Skeleton } from '@mui/material';
import SetAudienceDropDown from './SetAudienceDropDown';
import useInfiniteScroll from '../../../utils/constants/useInfiniteScroll';
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();


const SetAudience = ({
  setShowAudience,
  setAudienceUser,
  setAllGroups,
  setCheckedGroups,
  allGroups,
  platformData,
  selectedCheckbox,
  showAudience,
  checkedUsers,
  checkedGroups,
  audienceUser,
  setCheckedUsers,
  Recipient,
  briif_id,
  setSelectedCheckbox,
  loadingRecipents,
  setLoadingRecipents,
  handleCheckboxChange
}) => {
  const audienceRef = useRef();
  useOnClickOutside(audienceRef, () => setShowAudience(false));
  var [searchAudienceValue, setSearchAudienceValue] = useState('');

  const dispatch = useDispatch();
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [currentPage, setCurrentPage] = useState(0);




  const handleApiOnClick = async () => {
    if (!showAudience) {
      setShowAudience(true)
      const GetPlatData = await JSON.parse(localStorage.getItem('@GetPlatData'));
      if (GetPlatData) {
        setCurrentPage(1)
        let paramsAudience = `page=${1}&limit=9&string=${searchAudienceValue}`;
        dispatch(FirstTimeCallGroups(paramsAudience));
        // get users data
        let params = `page=${1}&limit=9&platform_id=${GetPlatData.platform_id}&keyword=&search=${searchAudienceValue}`;
        dispatch(FirstTimeCallUser(params));
      }
    }
  }

  const fetchUsers = async (search, currentPage) => {
    const GetPlatData = await JSON.parse(localStorage.getItem('@GetPlatData'));
    // get showAudience group data
    let paramsAudience, params;
    paramsAudience = `page=${currentPage}&limit=9&string=${search}`;
    dispatch(searchGroups(paramsAudience));
    // get users data
    params = `page=${currentPage}&limit=9&platform_id=${GetPlatData.platform_id}&search=${search}&keyword=`;
    dispatch(searchUsers(params));

  }

  const searchItems = () => {
    let timerId;
    return (e) => {
      const searchItem = e.target.value;
      setSearchAudienceValue(e.target.value);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        setCurrentPage(1)
        fetchUsers(searchItem, 1);
      }, 500);
    };
  };

  const searchitem = useMemo(() => searchItems(), []);

  const handleRemoveUser = (id) => {
    const newUsers = checkedUsers.filter((item) => item.id !== id);
    setCheckedUsers(newUsers);
  };

  const handleRemoveGroup = (id) => {
    const newGroups = checkedGroups.filter((item) => item.id !== id);
    setCheckedGroups(newGroups);
  };



  // for Selected Group
  const handleGroupClick = (group) => {
    const index = checkedGroups.findIndex((u) => u.id === group.id);
    if (index > -1) {
      // If the user is already checked, remove them from the checkedUsers array
      setCheckedGroups((prevState) => {
        const newState = [...prevState];
        newState.splice(index, 1);
        return newState;
      });
    } else {
      // If the user is not checked, add them to the checkedUsers array
      setCheckedGroups((prevState) => [...prevState, group]);
    }
  };
  // for selected User
  const handleUserClick = (user) => {
    const index = checkedUsers.findIndex((u) => u.id === user.id);
    if (index > -1) {
      // If the user is already checked, remove them from the checkedUsers array
      setCheckedUsers((prevState) => {
        const newState = [...prevState];
        newState.splice(index, 1);
        return newState;
      });
    } else {
      // If the user is not checked, add them to the checkedUsers array
      setCheckedUsers((prevState) => [...prevState, user]);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center mt-3">
        <div className={`d-flex align-items-center ${Recipient ? 'col-3' : 'col-2'}`}>
          <input
            className="align-text-top rounded-checkbox"
            id="2"
            type="checkbox"
            style={{
              width: '16px',
              height: '16px',
              accentColor: ' #4E6AFE',
              cursor: 'pointer',
              backgroundColor: 'red',
              color: 'red',
            }}
            checked={selectedCheckbox == '2'}
            onChange={handleCheckboxChange}
            onClick={() => handleApiOnClick()}
          />
          <label className="medium-mid-large px-2" htmlFor="2" style={{ opacity: '0.8', cursor: 'pointer' }}>
            Private
          </label>
        </div>
        <div className="d-flex align-items-center">
          <input
            className="align-text-top rounded-checkbox"
            id="1"
            type="checkbox"
            style={{
              width: '16px',
              height: '16px',
              accentColor: '#4E6AFE',
              cursor: 'pointer',
              backgroundColor: 'red',
              color: 'red',
            }}
            checked={selectedCheckbox == '1'}
            onChange={handleCheckboxChange}
          />
          <label className="medium-mid-large px-2" htmlFor="1" style={{ opacity: '0.8', cursor: 'pointer' }}>
            Public
          </label>
        </div>
      </div>
      <section className="d-flex align-items-center">
        <div className={Recipient ? 'col-12' : `col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-3 mt-3`}>
          <div className="position-relative" ref={audienceRef} style={{ width: '100%' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchAudienceValue}
              onChange={searchitem}
              className={Recipient ? `${styles.inputStyle} mb-2 mt-1` : `${classes.myInput} `}
              onClick={() => handleApiOnClick()}
              disabled={selectedCheckbox == '1'}
              style={{ opacity: selectedCheckbox == '1' && 0.4 }}
            />
            {showAudience ? (
              <SetAudienceDropDown
                audienceUser={audienceUser}
                allGroups={allGroups}
                checkedUsers={checkedUsers}
                checkedGroups={checkedGroups}
                handleUserClick={handleUserClick}
                handleGroupClick={handleGroupClick}
                eventEmitter={eventEmitter}
                searchAudienceValue={searchAudienceValue}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

              />
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
      {loadingRecipents ? (
        [1, 2, 3].map(() => (
          <div className="d-flex align-items-center mx-3">
            <Skeleton variant="rectangular" width={210} height={55} style={{ margin: 3, borderRadius: '25px' }} />
            <Skeleton variant="rectangular" width={210} height={55} style={{ margin: 3, borderRadius: '25px' }} />
          </div>
        ))
      ) : (
        <div
          style={{ display: 'inline-block' }}
          className={Recipient ? 'col-12' : 'col-lg-6 col-md-6 col-sm-5 row gx-0 col-xs-12'}
        >
          <CustomScrollbar height={Recipient ? '27vh' : '30vh'}>
            {checkedUsers?.map((item) => (
              <div className={`${classes.tag} px-2 mb-3 `} style={{ display: 'inline-block' }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ cursor: 'pointer', width: '160px' }}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <Image
                      style={{ borderRadius: '50%' }}
                      src={
                        item.image == null
                          ? '/assets/icons/new/user.svg'
                          : `${awsLink}users/profileImages/${item.image}`
                      }
                      height={30}
                      width={30}
                      alt="avatar"
                    />
                    <div className="semibold-mid-small text-nowrap p-2 ">
                      {`${(item.first_name + ' ' + item.last_name).length > 14
                        ? (item.first_name + ' ' + item.last_name).slice(0, 14) + '...'
                        : item.first_name + ' ' + item.last_name
                        }`}
                      <p className="medium-small text-secondary mb-0">
                        {item.email.length > 12 ? item.email.slice(0, 14) + '...' : item.email}
                      </p>
                    </div>
                  </div>
                  <div className="px-0 d-flex justify-content-end">
                    <Image
                      src="/assets/icons/new/whitecirclecross.svg"
                      onClick={() => {
                        handleRemoveUser(item.id);
                      }}
                      width="21px"
                      height="21px"
                      alt="cross"
                    />
                  </div>
                </div>
              </div>
            ))}
            {checkedGroups?.map((item) => (
              <div className={`${classes.tag} px-2 mb-3 `} style={{ display: 'inline-block' }}>
                <div
                  className="d-flex align-items-center justify-content-between "
                  style={{ cursor: 'pointer', width: '160px' }}
                >
                  <div className="d-flex  align-items-center justify-content-start">
                    <Image
                      style={{ borderRadius: '15px' }}
                      src={item.image == null ? '/assets/icons/new/user.svg' : `${awsLink}groups/${item.image}`}
                      height={30}
                      width={30}
                      alt="avatar"
                    />
                    <div className="semibold-mid-small text-nowrap p-2 ">
                      {item.name.length > 12 ? item.name.slice(0, 14) + '...' : item.name}
                      <p className="medium-small text-secondary mb-0">Group</p>
                    </div>
                  </div>
                  <div className=" px-0 d-flex justify-content-center">
                    <Image
                      src="/assets/icons/new/whitecirclecross.svg"
                      onClick={(e) => {
                        handleRemoveGroup(item.id);
                      }}
                      width="21px"
                      height="21px"
                      alt="cross"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CustomScrollbar>
        </div>
      )}
    </>
  );
};

export default SetAudience;
