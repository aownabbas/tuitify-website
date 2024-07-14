import React, { useEffect, useState } from 'react';
// mui lib..
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// redux imports
import { useDispatch, useSelector } from 'react-redux';
import forwardBriif from '../../../redux/actions/Forward';
import Image from 'next/image';
import classes from '../livemodal/LiveModel.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  height: 'auto',
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 5,
};
const ForwardMeetingLink = (props) => {
  // all states
  const aws_link = process.env.NEXT_PUBLIC_AWS_LINK;
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [userdata, setUsersData] = useState();
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const [getPlatData, setGetPlatData] = useState(null);
  const checkedArray = [];

  useEffect(() => {
    // login and platform data geting
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const user_id = LoginData.id;
      const id = LoginData.platform_id;
      setId(id);
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
        const params = `name=${GetPlatData.name}&env=${GetPlatData.env}&platform_id=${GetPlatData.platform_id}&id=${id}&user_id=${user_id}`;
        dispatch(forwardBriif(params, LoginData.access_token, onForwardBriifSuccess, onForwardBriifError));
      }
    }
    //eslint-disable-next-line
  }, []);
  // forward user array get
  const onForwardBriifSuccess = (res) => {
    setUsersData(res.data.users);
  };
  const onForwardBriifError = (error) => {
    console.log(error);
  };
  // create live session
  const goLive = () => {
    props.setArraydata(checkedArray);
    props.handleModalClose();
  };
  // array of selected users
  const handleCheck = (e, id) => {
    const checked = e.target.checked;
    if (checked) {
      console.log(checkedArray, 'checked Array');
      checkedArray.push(id);
    } else {
      for (var i = 0; i < checkedArray.length; i++) {
        if (checkedArray[i] == id) {
          checkedArray.splice(i, 1);
        }
      }
    }
  };

  // local search (in modal) for online viewers in meeting
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const allData = userdata;
  console.log(userdata, 'users all data');
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = allData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(allData);
    }
  };

  // end local search (in modal) for online viewers in meeting

  return (
    <>
      {/* modal of users */}
      <Modal
        open={props.modalOpen}
        onClose={props.handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* all users design */}
        <Box sx={style} className="text-center border-0 bg-white">
          <div className="row">
            <div
              className="col-lg-2 col-md-1 col-sm-1 col-xs-1 d-flex justify-content-center align-items-center"
              onClick={props.handleModalClose}
            >
              <Image src="/assets/icons/arrow.png" alt="arrow" width={15} height={15} />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9" style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Select Group to Invite
            </div>
          </div>
          <div className="mrgntp2">
            <div className="row">
              <input
                placeholder="Search for user"
                name="user"
                value={searchInput}
                className={classes.inputStyle}
                onChange={(event) => searchItems(event.target.value)}
              />
            </div>

            <div className="mrgntp2">
              <div
                style={{
                  height: '360px',
                  overflow: 'scroll',
                }}
              >
                {searchInput.length > 1
                  ? filteredResults.map((item) => {
                      return (
                        <div className="mrgntp2" key={item.id}>
                          <label htmlFor={item.id} className="row">
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                              <Image
                                className="imgradius2"
                                src={
                                  aws_link
                                    ? aws_link == undefined
                                      ? '/assets/icons/new/user.svg'
                                      : aws_link + 'users/profileImages/' + item.image
                                    : '/assets/icons/new/user.svg'
                                }
                                alt="user"
                                width="30px"
                                height="30px"
                              />
                            </div>
                            <div
                              className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                              style={{
                                fontWeight: 'bold',
                                textAlign: 'left',
                                marginLeft: '5px',
                              }}
                            >
                              {item.first_name} <span>{item.last_name}</span>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 offset-lg-2 offset-md-2 offset-sm-2 offset-xs-2">
                              <input
                                type="checkbox"
                                id={item.id}
                                onClick={(e) => {
                                  handleCheck(e, item.id);
                                }}
                              />
                            </div>
                          </label>
                        </div>
                      );
                    })
                  : !userdata
                  ? ''
                  : userdata?.items?.map((item) => (
                      <div className="mrgntp2" key={item.id}>
                        <label htmlFor={item.id} className="row">
                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <Image
                              className="imgradius2"
                              src={
                                aws_link
                                  ? aws_link == undefined
                                    ? '/assets/icons/new/user.svg'
                                    : aws_link + 'users/profileImages/' + item.image
                                  : '/assets/icons/new/user.svg'
                              }
                              alt="user"
                              width="30px"
                              height="30px"
                            />
                          </div>
                          <div
                            className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                            style={{
                              fontWeight: 'bold',
                              textAlign: 'left',
                              marginLeft: '5px',
                            }}
                          >
                            {item.first_name} <span>{item.last_name}</span>
                          </div>
                          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 offset-lg-2 offset-md-2 offset-sm-2 offset-xs-2">
                            <input
                              type="checkbox"
                              id={item.id}
                              onClick={(e) => {
                                handleCheck(e, item.id);
                              }}
                            />
                          </div>
                        </label>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="mrgntp">
            <div className="row">
              <div className="d-flex justify-content-end">
                <div>
                  <button className={classes.modalCancelBtn} onClick={props.handleModalClose}>
                    Cancel
                  </button>
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  <button
                    onClick={goLive}
                    className="text-white"
                    style={{
                      border: 'none',
                      borderRadius: '10px',
                      width: '90.69px',
                      height: '40.38px',
                      backgroundColor: '#303548',
                    }}
                  >
                    Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ForwardMeetingLink;
