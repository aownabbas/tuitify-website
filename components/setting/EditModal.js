import React, { useEffect, useRef, useState } from 'react';
import { Box, Checkbox, Modal, Popover, Tabs, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Image from 'next/image';
import classes from './Setting.module.css';
import { useDispatch, useSelector } from 'react-redux';
import forwardBriif from '../../redux/actions/Forward';
import { EditGroup } from '../../redux/actions/PlatformGroupAction';
import classes2 from '../kh_components/giistcreation/assignpublisher/AssignPublisher.module.css';
import useOnClickOutside from 'use-onclickoutside';
import SkeletonLoader from '../kh_components/kh_home/SkeletonLoader';
import groupMemberAction from '../../redux/actions/GroupMemberAction';
import WebPagination from '../pagination/WebPagination';
import usePagination from '../pagination/Pagination';
import deleteGroupMemberAction from '../../redux/actions/DeleteGroupMemberAction';

const style = {
  modalStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '370px',
    bgcolor: 'background.paper',
    // borderRadius: "12px",
    // borderRadius: "12px",
    boxShadow: 24,
    // p: 4,
    border: 'none',
    minHeight: '100vh',
  },
  centeringContent: {
    textAlign: 'center',
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    paddingTop: '5vh',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid #353452',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #353452',
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
};

const EditModal = ({
  setEditModals,
  editModals,
  setConfirmGroup,
  confirmGroup,
  setSuccessModal,
  selected,
  name,
  setName,
  image,
  handleUpdateGroup,
  groupId,
  setImage,
  handleImageUpload,
  error,
  group,
  setSelected,
  setDotLoading,
  setCheckedUsers,
  checkedUsers,
  usersEidtShow,
  setUsersEidtShow,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const dispatch = useDispatch();

  const router = useRouter();

  const [getPlatData, setGetPlatData] = useState('');

  const [users, setUsers] = useState([]);
  console.log(users, 'users');
  const [search, setSearch] = useState('');
  const [keywords, setKeywords] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [userImage, setUserImage] = useState(null);
  const [limit, setLimit] = useState(5);
  console.log(userImage, 'userImage');

  const [finalUsersIds, setFinalUsersIds] = useState([]);
  console.log(groupId, 'groupId');

  const PER_PAGE = limit;

  useEffect(() => {
    const getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const getPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(getPlatData);
    const params = `group_id=${groupId}&platform_id=${selectedPlatform?.platform_id}&page=${pages}&limit=${limit}`;
    dispatch(groupMemberAction(params, onGroupMembersSuccess, onGroupMembersError));
  }, [selectedPlatform?.platform_id, groupId, pages, limit]);

  const onGroupMembersSuccess = (res) => {
    setUserImage(res);
    console.log(res.items, 'member');
  };

  const onGroupMembersError = (err) => {
    console.log(err, 'member errpo');
  };

  useEffect(() => {
    const getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const getPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(getPlatData);
    const params = `limit=20&platform_id=${selectedPlatform?.platform_id}&search=${search}&keyword=${keywords}&page=${page}`;
    dispatch(forwardBriif(params, getLoginData?.token, onForwardBriifSuccess, onForwardBriifError));
  }, [selectedPlatform?.platform_id, search]);

  const onForwardBriifSuccess = (res) => {
    setUsers(res.data.users.items);
  };
  const [filter, setFilter] = useState([]);
  const filterUsers = (ids, users) => {
    // Initialize arrays to store filtered user objects and user IDs
    const filteredUserObjects = [];
    const filteredUserIds = [];
    // Loop through the array of user objects
    for (const user of users) {
      // Check if the user's ID is included in the array of all IDs
      if (ids?.includes(user.id)) {
        // If so, push the user object to the filtered user objects array
        filteredUserObjects.push(user);
        // Also push the user ID to the filtered user IDs array
        filteredUserIds.push(user.id);
      }
    }
    setFilter(filteredUserObjects);
    setFinalUsersIds(filteredUserIds);
  };

  const handleUpDateGroup = () => {
    setDotLoading(true);
    let params = JSON.stringify({
      platform_id: selectedPlatform?.platform_id,
      status: 1,
      user_ids: finalUsersIds,
      group_id: group?.id,
    });
    dispatch(EditGroup(params, onEditGroupSuccess, onEditGroupError));
  };

  const onEditGroupSuccess = (res) => {
    if (res.status == true) {
      setSuccessModal(true);
      setDotLoading(false);
    }
  };

  const onEditGroupError = (error) => {
    console.log('error', error);
    setDotLoading(false);
  };

  const handleRemoveUser = (id) => {
    const removeUser = filter.filter((item) => item.id != id);
    const unChecked = selected.filter((item) => item != id);
    const filterIds = finalUsersIds.filter((item) => item != id);
    setSelected(unChecked);
    setFilter(removeUser);
    setFinalUsersIds(filterIds);
  };

  useEffect(() => {
    filterUsers(selected, users);
  }, [selected?.length]);

  // Call the filterUsers function and pass in the array of all IDs and the array of user objects
  const onForwardBriifError = (err) => {
    console.log('rror =>', err);
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  const [showAllusers, setShowAllusers] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setShowUsers(false));

  const handleUserClick = (userId) => {
    const index = checkedUsers.indexOf(userId);
    if (index > -1) {
      // If the user is already checked, remove them from the checkedUsers array
      setCheckedUsers(checkedUsers.filter((id) => id !== userId));
    } else {
      // If the user is not checked, add them to the checkedUsers array
      setCheckedUsers([...checkedUsers, userId]);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = PER_PAGE;
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const removeUser = (id) => {
    console.log(showAllusers, 'idddd');
    const updatedUsers = userImage?.items?.filter((user) => user.id !== id);
    setUserImage({ ...userImage, items: updatedUsers });
    setDeletedUserIds([...deletedUserIds, id]);

    // Check if the current page is out of bounds after removing a user
    const totalPages = Math.ceil(updatedUsers.length / usersPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages); // Adjust the current page to the last page
      cardData.jump(totalPages); // Update the pagination data to the last page
    }
    let params = JSON.stringify({
      platform_id: selectedPlatform?.platform_id,
      member_ids: [id],
      group_id: groupId,
    });

    dispatch(deleteGroupMemberAction(params, onDeleteGroupMemberSuccess, onDeleteGroupMemberError));
  };
  const onDeleteGroupMemberSuccess = (res) => {
    console.log(res, 'delete member');
  };

  const onDeleteGroupMemberError = (err) => {
    console.log(err, 'delete member error');
  };

  var count = Math.ceil(userImage?.totalItems / PER_PAGE);
  const cardData = usePagination(userImage?.items, userImage?.totalItems, PER_PAGE);
  const handlePagination = (e, p) => {
    setPages(p);
    cardData.jump(p);
  };
  console.log(pages, 'cardData');

  return (
    <div>
      <Modal open={editModals} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box>
          <Box sx={modalStyle}>
            <Box sx={{ p: 2, mt: 4 }}>
              <div className="px-2 d-flex justify-content-between">
                <h1 className={classes.platHead}>{`Editing “${name}”`}</h1>
                <span className={classes.cancelBox}>
                  <Image
                    src="/assets/images/X.svg"
                    height="24px"
                    width="24px"
                    onClick={() => {
                      setEditModals(false);
                    }}
                  />
                </span>
              </div>
            </Box>

            <div className="d-flex justify-content-between px-3">
              <span className={classes.profile}>
                <Image
                  style={{ borderRadius: '50%' }}
                  height={'72px'}
                  width={'72px'}
                  src={image}
                  onClick={() => handleUploadClick()}
                />
                <span className={classes.plusSign}>
                  <Image
                    src="/assets/images/add.svg"
                    height="11.98px"
                    width="12.16px"
                    onClick={() => handleUploadClick()}
                  />
                </span>
                <input
                  type="file"
                  id="file-input"
                  name="file"
                  style={{ display: 'none' }}
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    handleImageUpload(e);
                  }}
                />
              </span>
              <p className={classes.changes} onClick={() => handleUpdateGroup(groupId)}>
                Save Changes
              </p>
            </div>
            <div className="mt-3 px-3 d-flex flex-column">
              <label className={`${classes.myfont}`}>Group title</label>
              <input
                type="text"
                placeholder="Inspire Team A"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={` mt-1 ${classes.inp}`}
              />
              <div
                className="ps-3 mt-2"
                style={{
                  opacity: '0.1',
                  border: '1px solid #000000',
                }}
              ></div>
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '14px',
                  textAlign: 'left',
                  marginBottom: '20px',
                  color: '#FF4B55',
                }}
                className="m-2"
              >
                {error}
              </p>
            </div>

            <div className="mt-3 px-3 d-flex flex-column">
              <label className={`${classes.myfont} mb-3`}>Want’s to add new members?</label>
              <div className=" col-12  mb-3">
                <div className="position-relative" style={{ width: '100%' }}>
                  <input
                    type="text"
                    placeholder="Search by name..."
                    onClick={(e) => {
                      showUsers == true ? '' : setShowUsers(true);
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`${classes2.myInput} regular-small rounded-pill`}
                    // onKeyUp={(e) => {
                    //   filterFunction(e);
                    // }}
                  />
                  {showUsers && (
                    <div ref={ref} id="menuBox" className={`${classes2.dropdownElement}`}>
                      {users?.map((user) => (
                        <div
                          className="single-user-hover-effect"
                          key={user.id}
                          onClick={() => handleUserClick(user.id)}
                        >
                          <div
                            className="d-flex py-2 flex-row px-3 align-items-center justify-content-between"
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="d-flex py-2 flex-row align-items-center ">
                              <div className="gap-3 pt-1">
                                <Image
                                  style={{ borderRadius: '15px' }}
                                  src={
                                    user.image
                                      ? `${awsLink}users/profileImages/${user.image}`
                                      : '/assets/icons/new/user.svg'
                                  }
                                  height={30}
                                  width={30}
                                  alt="avatar"
                                />
                              </div>
                              <div className="ms-2 medium-large">
                                {user.first_name} {user.last_name}
                                {/* usama Ijaz */}
                                <p className="medium-small text-secondary mb-0">{user.position}</p>
                              </div>
                            </div>
                            <div>
                              <input type="checkbox" checked={checkedUsers.includes(user.id)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="d-flex align-items-center pt-3 justify-content-between "
                  style={{ overflowY: 'scroll' }}
                >
                  <div
                    style={{
                      overflow: 'scroll',
                      maxHeight: '256px',
                      // paddingLeft: "19px",
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {userImage?.items?.map((user) =>
                      showAllusers == true ? (
                        <div className="d-flex  p-2  align-items-center justify-content-between">
                          <div className="d-flex  p-2   align-items-center justify-content-between">
                            {user.image ? (
                              <Image
                                className={`${classes.imgFrame} img-fluid mt-0 text-center`}
                                src={`${awsLink}users/profileImages/${user.image}`}
                                alt="groupsPic"
                                height={40}
                                width={40}
                                style={{ borderRadius: '50%' }}
                              />
                            ) : (
                              <Image
                                src="/assets/icons/new/user.svg"
                                width="40px"
                                height="40px"
                                style={{ borderRadius: '50%' }}
                              />
                            )}
                            <span>
                              <span className="px-2 d-flex">
                                {user.first_name}
                                <p className="px-2">{user.last_name}</p>
                              </span>
                              <p className="text-truncate d-flex px-2" style={{ color: '#979797' }}>
                                {user.email?.length > 10 ? user.email.substring(0, 10) + '...' : user.email}
                              </p>
                            </span>
                          </div>
                          <p
                            className="regular-xsmall"
                            style={{ color: '#FF4B55', cursor: 'pointer' }}
                            onClick={() => removeUser(user.id)}
                          >
                            Remove
                          </p>
                        </div>
                      ) : (
                        <Tooltip placement="top" title={user.first_name + ' ' + user.last_name}>
                          <span className={classes.imge}>
                            {user.image ? (
                              <Image
                                className={`${classes.imgFrame} img-fluid mt-0 text-center`}
                                src={`${awsLink}users/profileImages/${user.image}`}
                                alt="groupsPic"
                                height={40}
                                width={40}
                                style={{ borderRadius: '50%' }}
                              />
                            ) : (
                              <Image
                                src="/assets/icons/new/user.svg"
                                width="40px"
                                height="40px"
                                style={{ borderRadius: '50%' }}
                              />
                            )}
                          </span>
                        </Tooltip>
                      ),
                    )}
                  </div>
                  <>
                    {showAllusers == false && userImage?.items?.length != 0 && (
                      <div
                        style={{
                          fontStyle: 'normal',
                          fontWeight: 600,
                          fontSize: '12px',
                          lineHeight: '15px',
                          textAlign: 'right',
                          color: '#4E6AFE ',
                          cursor: 'pointer',
                          width: '59px',
                        }}
                        onClick={() => setShowAllusers(true)}
                      >
                        View All
                      </div>
                    )}
                  </>
                </div>
                {showAllusers == true ? (
                  <div className="d-flex justify-content-center">
                    <WebPagination
                      handleChange={handlePagination}
                      count={count}
                      page={pages}
                      size="small"
                      shape="rounded"
                      color="primary"
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={confirmGroup}
        onClose={() => setConfirmGroup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box sx={{ p: 2, mt: 1 }}>
              <div className="col-md-12 col-sm-12 d-flex justify-content-end">
                <span>
                  <Image
                    src="/assets/images/X.svg"
                    height="24px"
                    width="24px"
                    onClick={() => {
                      setConfirmGroup(false);
                    }}
                  />
                </span>
              </div>
              <div className="px-2 ">
                <h1 className={classes.platHead}>Last step!</h1>
                <p className="regular-small">Here is the final list</p>
              </div>
            </Box>
            <div className="px-4" style={{ maxHeight: '70vh', overflow: 'scroll' }}>
              {filter?.map((item) => {
                return (
                  <div className="d-flex align-items-center justify-content-between mb-4" key={item.id}>
                    <section className="d-flex align-items-center">
                      <div className={classes.groupCircle}>
                        <Image
                          src={
                            item.image
                              ? awsLink + 'users/profileImages/' + item.image
                              : '/assets/images/userProfile.png'
                          }
                          height="32px"
                          width="32px"
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                      <div>
                        <h2 className={classes.groupName}>
                          {item.first_name} {''}
                          {item.last_name}
                        </h2>
                        <p className="regular-xsmall" style={{ color: '#979797' }}>
                          {item.position}
                        </p>
                      </div>
                    </section>
                    <Image
                      src="/assets/images/X.svg"
                      height="24px"
                      width="24px"
                      onClick={() => handleRemoveUser(item.id)}
                    />
                  </div>
                );
              })}
            </div>
            <Box sx={{ p: 2 }}>
              <div
                className="col-md-12 d-flex p-0 align-items-end position-absolute"
                style={{ bottom: '5px', left: '5rem' }}
              >
                <button
                  className={classes.btn3}
                  onClick={() => {
                    handleUpDateGroup();
                  }}
                >
                  Create Group
                </button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
