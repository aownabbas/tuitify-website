import React, { useEffect, useMemo, useRef } from 'react';
import classes from './AssignPublisher.module.css';
import useInfiniteScroll from '../../../../utils/constants/useInfiniteScroll';
import { useState } from 'react';
import forwardBriif from '../../../../redux/actions/Forward';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import CustomScrollbar from '../../../combine/CustomScrollbar.js/CustomScrollbar.js';

function SetPublihser({
  platformData,
  loginData,
  setPublisher,
  setShowUsers,
  searchPublisher,
  setSearchPublisher,
  showUsers,
  isModal,
}) {
  const [allUsers, setAllUsers] = useState([]);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const loadMoreRef = useRef(null);

  const dispatch = useDispatch();

  async function fetchUsers(currentPage, searchPublisher) {
    try {
      // Get users data
      let params;
      if (!searchPublisher) {
        params = `limit=${10}&page=${currentPage}&platform_id=${platformData.platform_id}&keyword=`;
      } else {
        params = `&platform_id=${platformData.platform_id}&search=${searchPublisher}&keyword=`;
      }
      // Assuming dispatch is coming from Redux or other state management library
      dispatch(forwardBriif(params, loginData?.token, onForwardBriifSuccess, onForwardBriifError));
    } catch (error) {
      // Handle error gracefully
      console.log('Error fetching users:', error);
    }
  }

  useEffect(() => {
    const handleObserver = async (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prevPage) => {
          const nextPage = prevPage + 1;
          fetchUsers(nextPage, searchPublisher);
          return nextPage;
        });
      }
    };

    if (searchPublisher) {
      setCurrentPage(1);
      fetchUsers(1, searchPublisher);
      setIsAnimating(true);
    } else {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      });

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [searchPublisher]);

  const onForwardBriifSuccess = (res) => {
    if (!searchPublisher) {
      setAllUsers((prevUsers) => [...prevUsers, ...res.data.users.items]);
    } else {
      setAllUsers(res.data.users.items);
    }
  };

  const onForwardBriifError = (err) => {
    console.log('rror =>', err);
  };

  return (
    <div id="menuBox" className={`${classes.dropdownElement} `}>
      <CustomScrollbar height={isModal ? '30vh' : '40vh'}>
        {allUsers ? (
          allUsers.map((user) => (
            <div
              className={`${classes.singleUserHoverEffect} ${
                isAnimating ? classes.userDropdownExit : classes.userDropdownEnter
              }`}
              onAnimationEnd={() => setIsAnimating(false)}
              key={user.id}
            >
              <div
                className="d-flex py-2 flex-row px-3 align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setPublisher(user);
                  setShowUsers(false);
                  setSearchPublisher('');
                }}
              >
                <div className="gap-3 pt-1">
                  <Image
                    style={{ borderRadius: '15px' }}
                    src={user.image ? `${awsLink}users/profileImages/${user.image}` : '/assets/icons/new/user.svg'}
                    height={30}
                    width={30}
                    alt="avatar"
                  />
                </div>
                <div className="ms-2 medium-large text-start">
                  {`${
                    (user.first_name + ' ' + user.last_name).length > 14
                      ? (user.first_name + ' ' + user.last_name).slice(0, 14) + '...'
                      : user.first_name + ' ' + user.last_name
                  }`}
                  <p className="medium-small text-secondary mb-0">{user.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users to display.</p>
        )}
        <div className="mb-4" id="id" ref={loadMoreRef} />
      </CustomScrollbar>
    </div>
  );
}

export default SetPublihser;
