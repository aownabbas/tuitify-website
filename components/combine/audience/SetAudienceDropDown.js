import React, { useEffect, useRef } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import classes from '../../kh_components/giistcreation/assignpublisher/AssignPublisher.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import forwardBriif, { getGorupData, searchGroups, searchUsers } from '../../../redux/actions/Forward';
import CustomScrollbar from '../CustomScrollbar.js/CustomScrollbar.js';


const SetAudienceDropDown = ({ checkedUsers, currentPage, setCurrentPage, searchAudienceValue, eventEmitter, checkedGroups, handleUserClick, handleGroupClick, }) => {
  const [activeTab, setActiveTab] = useState(0);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const dispatch = useDispatch();
  const { usersData, groupsData } = useSelector(state => state.forward_briif)
  const notificationRef = useRef();

  const [isAnimating, setIsAnimating] = useState(false);

  const loadMoreRef = useRef(null);

  const callApisFirstTime = async (currentPage) => {
    const GetPlatData = await JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      if (searchAudienceValue) {
        var paramsAudience = `page=${currentPage}&limit=9&string=${searchAudienceValue}`;
        var params = `page=${currentPage}&limit=9&platform_id=${GetPlatData.platform_id}&keyword=&search=${searchAudienceValue}`;
        dispatch(getGorupData(paramsAudience, onGetGroupSuccess, onGetGroupError));
        // get users data
        dispatch(forwardBriif(params, '', onAudienicSuccess, onAudienicError));
      } else {
        var paramsAudience = `page=${currentPage}&limit=9`;
        var params = `page=${currentPage}&limit=9&platform_id=${GetPlatData.platform_id}&keyword=`;
        dispatch(getGorupData(paramsAudience, onGetGroupSuccess, onGetGroupError));
        // get users data
        dispatch(forwardBriif(params, '', onAudienicSuccess, onAudienicError));
      }
    }
  }

  const onAudienicSuccess = (res) => {
  };

  const onAudienicError = (eror) => {
  };

  const onGetGroupSuccess = (res) => {

  };
  const onGetGroupError = (error) => {
  };

  async function notificationScroll() {
    const { clientHeight, scrollHeight, scrollTop } = notificationRef.current;
    const checkingSum = scrollTop + clientHeight;

    const isScrolledToEnd =
      Math.abs(checkingSum.toFixed() - scrollHeight) <= 1; // Allowing a small tolerance for precision issues

    if (isScrolledToEnd) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        callApisFirstTime(nextPage, searchAudienceValue);
        return nextPage;
      });
    }
  }




  return (
    <div id="menuBox" className={`${classes.dropdownElement}`}>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginTop: '10px' }}
        className="w-100"
      >
        <Tab label="User" style={{ width: '50%' }} />
        <Tab label="Group" style={{ width: '50%' }} />
      </Tabs>
      <CustomScrollbar height={'30vh'}
      >
        <div ref={notificationRef} onScroll={async (e) => await notificationScroll(e)} style={{
          maxHeight: '30vh',
          overflowY: 'scroll',
        }}>
          {activeTab === 0
            ? usersData.length ? usersData.map((user) => (
              <div
                className={`${classes.singleUserHoverEffect} ${isAnimating ? classes.userDropdownExit : classes.userDropdownEnter
                  }`}
                onAnimationEnd={() => setIsAnimating(false)}

              >
                <div
                  className="d-flex py-1 flex-row px-3 align-items-center justify-content-between"
                  style={{ cursor: 'pointer' }}

                  onClick={() => handleUserClick(user)}
                >
                  <div className="d-flex py-2 flex-row align-items-center ">
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
                    <div className="ms-2 medium-large text-start">
                      {`${(user.first_name + ' ' + user.last_name).length > 14
                        ? (user.first_name + ' ' + user.last_name).slice(0, 14) + '...'
                        : user.first_name + ' ' + user.last_name
                        }`}
                      <p className="medium-small text-secondary mb-0">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    {checkedUsers?.some((u) => u.id === user.id) && (
                      <Image
                        style={{ borderRadius: '5px' }}
                        src="/assets/icons/new/gradient_check.svg"
                        className="d-block"
                        height={20}
                        width={20}
                        alt="avatar"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
              :
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "20vh" }}>No user found
              </div>
            : activeTab === 1 ? groupsData.length ? groupsData.map((group) => (
              <div
                // className="single-user-hover-effect"
                className={`${classes.singleUserHoverEffect} ${isAnimating ? classes.userDropdownExit : classes.userDropdownEnter
                  }`}
                onAnimationEnd={() => setIsAnimating(false)}
              >
                <div
                  className="d-flex py-1 flex-row px-3 align-items-center justify-content-between"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleGroupClick(group)}
                >
                  <div className="d-flex py-2 flex-row align-items-center ">
                    <div className="gap-3 pt-1">
                      <Image
                        style={{ borderRadius: '15px' }}
                        src={group.image == null ? '/assets/icons/new/user.svg' : `${awsLink}groups/${group.image}`}
                        height={30}
                        width={30}
                        alt="avatar"
                      />
                    </div>
                    <div className="ms-2 medium-large text-start">
                      {group.name}
                      <p className="medium-small text-secondary mb-0">{group.memberCount}</p>
                    </div>
                  </div>
                  <div>
                    {checkedGroups?.some((u) => u.id === group.id) && (
                      <Image
                        style={{ borderRadius: '5px' }}
                        src="/assets/icons/new/gradient_check.svg"
                        className="d-block"
                        height={20}
                        width={20}
                        alt="avatar"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
              : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "20vh" }}>No group found
              </div>
              : ""
          }

        </div>
      </CustomScrollbar>
    </div >
  );
};

export default SetAudienceDropDown;
