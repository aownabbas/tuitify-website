import React, { useState, useEffect, useRef } from 'react';
import classes from '../../../../kh_components/giistcreation/assignpublisher/AssignPublisher.module.css';
import styles from './RecipientsFilterInput.module.css';
import useOnClickOutside from 'use-onclickoutside';
import Image from 'next/image';
import RecipientChip from './RecipientChip';

const RecipientsFilterInput = (props) => {
  const ref = useRef();
  const [showUsers, setShowUsers] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [allSelectedUsers, setAllSelectedUsers] = useState([]);

  const [getPlatData, setGetPlatData] = useState(null);

  useOnClickOutside(ref, () => setShowUsers(false));
  const handleGetSelectedUsers = (e, id, firstname, lastname, image) => {
    const updatedIds = [...props.usersId];
    const index = updatedIds.indexOf(id);

    if (index !== -1) {
      // If the id exists, remove it from the array
      updatedIds.splice(index, 1);
    } else {
      // If the id doesn't exist, add it to the array
      updatedIds.push(id);
    }

    props.setUsersId(updatedIds);

    const fullName = [...allSelectedUsers];
    const existingUserIndex = fullName.findIndex((user) => user.id === id);

    if (existingUserIndex !== -1) {
      // If the user exists, remove it from the array
      fullName.splice(existingUserIndex, 1);
    } else {
      // If the user doesn't exist, add it to the array
      fullName.push({ id: id, image: image, name: firstname + ' ' + lastname });
    }

    setAllSelectedUsers(fullName);
  };

  const deleteTag = (index) => {
    props.setUsersId((prevState) => prevState.filter((tag, i) => i !== index));
    setAllSelectedUsers((prevState) => prevState.filter((tag, i) => i !== index));
  };

  useEffect(() => {
    console.log(allSelectedUsers, props.forwardBriifData.users, 'users');
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    setAllUsers(props.forwardBriifData.users.items);
    return () => {};
  }, [props.forwardBriifData.users.items]);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    <div class="dropdown">
      <div id="myDropdown">
        <input
          type="text"
          placeholder="Recipient Names"
          onClick={(e) => {
            showUsers == true ? '' : setShowUsers(true);
          }}
          value={props.value}
          className={`regular-small w-100 border-bottom border-0`}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {showUsers == true ? (
          <div ref={ref} id="menuBox" className={`${styles.dropdownElement} shadow position-absolute`}>
            {allUsers != [] &&
              allUsers?.map((user) => (
                <div className="single-user-hover-effect">
                  <div
                    className="d-flex py-1 flex-row px-3 align-items-center"
                    style={{ cursor: 'pointer' }}
                    key={user.id}
                    onClick={
                      (e) => handleGetSelectedUsers(e, user.id, user.first_name, user.last_name, user.image)
                      // setShowUsers(false);
                    }
                  >
                    <div className="gap-3 pt-1 d-block">
                      <Image
                        style={{ borderRadius: '15px' }}
                        //   src='/assets/icons/new/user.svg'
                        className="d-block"
                        src={
                          user.image == null
                            ? '/assets/icons/new/user.svg'
                            : `${awsLink}users/profileImages/${user.image}`
                        }
                        height={22}
                        width={22}
                        alt="avatar"
                      />
                    </div>
                    <div
                      className="ms-2 "
                      style={{
                        fontSize: '14px',
                        lineHeight: '12px',
                        /* identical to box height */
                        color: '#141D19 !important',
                      }}
                    >
                      {`${
                        (user.first_name + ' ' + user.last_name).length > 14
                          ? (user.first_name + ' ' + user.last_name).slice(0, 14) + '...'
                          : user.first_name + ' ' + user.last_name
                      }`}
                      {/* <p className='medium-small text-secondary mb-0'>{user.email}</p> */}
                    </div>
                    {props.usersId.includes(user.id) ? (
                      <div className="d-flex flex-grow-1 justify-content-end">
                        <Image
                          style={{ borderRadius: '15px' }}
                          src="/assets/icons/new/gradient_check.svg"
                          className="d-block"
                          height={18}
                          width={18}
                          alt="avatar"
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="grey-view mt-2 d-flex justify-content-end w-100 mb-3" style={{ fontSize: '10px' }}>
        Individual / Multiple Users / Groups
      </div>
      <div className="mt-2">
        {allSelectedUsers?.map((user, index) => (
          // console.log(user))}
          <RecipientChip
            key={index}
            index={index}
            deleteTag={deleteTag}
            usersId={props.usersId}
            setUsersId={props.setUsersId}
            userid={user.id}
            userImage={user.image}
            username={user.name}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipientsFilterInput;
