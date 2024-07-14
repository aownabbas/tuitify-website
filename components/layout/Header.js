import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import COLORS from '../../public/assets/colors/colors';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// library used for notification popup.

import { Tooltip } from 'react-tippy';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Notifications, { ClearNotifications } from '../../redux/actions/Notifications';
import GenericTooltip from '../ch/GenericTooltip';
//client side socket library.
import io from 'socket.io-client';
import { URL } from '../../public/assets/path/path';
import axios from 'axios';
import globalSearch, { setSelectedPlatform } from '../../redux/actions/GlobalSearch';
import Notification from '../Notification';
import readAllNotifications from '../../redux/actions/ReadAllNotifications';
// global search filter sidebar component.
import GlobalSearchFilterSidebar from '../../components/combine/globalsearch/GlobalSearchFilterSidebar';
import globalSearchApplyFilter from '../../redux/actions/GlobalSearchApplyFilter';
import { Dropdown, Item, Toggle, Nav, Container, NavDropdown, Navbar, Brand, Collapse, NavItem } from 'react-bootstrap';
import actionSearchReceive, { actionSearchDraft } from '../../redux/actions/SearchReceive';
import actionSearchSend from '../../redux/actions/SearchSent';
import actionSearchArchive from '../../redux/actions/SearchArchive';
// library for detecting clicking outside a component.
import useOnClickOutside from 'use-onclickoutside';
import Link from 'next/link';
import { GlobalApiCall } from '../../redux/GlobalApiCall';
import getPlat from '../../redux/actions/GetPlat';
import { INCREMENT_NOTIFICATION_COUNT, MARK_NOTIFICATION_READ } from '../../redux/actions/types';
import { Calendar } from 'react-calendar';
import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import ArrowTooltips from '../modals/tooltip/Tooltip';
import useSocket from '../../hooks/useSocket';
// new code
import Popover from '@mui/material/Popover';
import SkeletonLoader from '../kh_components/kh_home/SkeletonLoader';
import NotificationSkeletonLoader from '../NotificationSkeletonLoader';
import { handleLogout } from '../../redux/actions/Login';
import SuccessModal from '../modals/simplemodal/SuccessModal';

const Header = (props) => {
  const socket = useSocket();
  const [privatePlatform, setPrivatePlatform] = useState([]);
  const [publicPlatform, setPublicPlatform] = useState([]);
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);
  const [successErrorMessage, setSuccessErrorMessage] = useState('');

  const [AllPlatform, setAllPlatform] = useState([]);
  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const [role_id, setRole_id] = useState(null);

  const handleLogoutWeb = async () => {
    let { email, access_token, id, platform_id } = await JSON.parse(localStorage.getItem('@LoginData'));
    let params = `id=${id}&email=${email}&platform_id=${platform_id}&token=${access_token}&type=0`;
    dispatch(handleLogout(params, onLogoutSuccess, onLogoutError));
  };

  const onLogoutSuccess = async (res) => {
    if (res.data.status == 'true') {
      window.localStorage.clear();
      await router.replace('/');
      router.reload('/');
    }
  };

  const onLogoutError = (error) => {
    console.log(error, 'error logout');
  };
  const SelectPlatformData = () => {
    var axios = require('axios');
    var config = {
      method: 'get',
      // maxBodyLength: Infinity,
      url: `${URL.khbaseUrl}getplat?`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        setPrivatePlatform(response.data.private_platforms);
        setPublicPlatform(response.data.public_platforms);
        setAllPlatform([...response.data.private_platforms, ...response.data.public_platforms]);
        if (selectedPlatform == null) {
          const mergedArray = [...response.data.private_platforms, ...response.data.public_platforms];
          dispatch(setSelectedPlatform(mergedArray[0]));
        }
      })
      .catch(function (error) {
        console.log(error, 'scascscs');
      });
  };

  useEffect(() => {
    SelectPlatformData();
  }, []);

  const dispatch = useDispatch();

  const handlePlatformChange = (event, index, option) => {
    dispatch(setSelectedPlatform(option));
    // dispatch the action to update selected platform value
    setAnchorEl(null);
  };

  const router = useRouter();

  //global search filter calender and categories for giist states
  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [applyFilter, setApplyFilter] = useState(false);

  // platform data and user info states.
  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState('');

  const [getPlatData, setGetPlatData] = useState(null);

  // global search input field value state.
  const [inputValue, setInputValue] = useState('');

  // global search getting api keyword parameter value. that is also global search tab value from redux.
  const { globalSearchKeyword } = useSelector((state) => state.global_search_tabs);
  const { filter } = useSelector((state) => state.global_search_apply_filter);
  const { indexNum } = useSelector((state) => state.global_search_apply_filter);

  //global search filter state. e.g by name or by date.
  const [keyword, setKeyword] = useState('');

  const [openNotification, setOpenNotification] = useState(false);

  //notification filter state
  // const [notificationFilterText, setNotificationFilterText] = useState('All');
  const [notiFilterMode, setNotiFilterMode] = useState('All');
  const PER_PAGE = 10;

  // search
  const [title, setTitle] = useState('');
  const [timeDate, setTimeDate] = useState(null);
  const [check, setCheck] = useState(true);

  // handle global search filter sidebar open case.
  const [sidebarOpen, setSidebarOpen] = useState('false');

  // main sidebar menu open state
  // const [mainSidebarMenuOpen, setMainSidebarMenuOpen] = useState(false)

  const [notification, setNotification] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState(false);

  const target = useRef(null);

  // notification badge number state.
  const { notifications } = useSelector((state) => state.all_notifications);
  const { notificationCount } = useSelector((state) => state.notificationReducer);
  const [type, setType] = useState('name');

  // Global Search Input Type.
  const [globalSearchInputType, setGlobalSearchInputType] = useState('text');
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [myid, setmyid] = useState(10);
  const [myid1, setmyid1] = useState(10);

  const listInnerRef = useRef();
  console.log(notifications, 'notifications');
  // Selected Platform
  // function that detects weather user scrolls to the bottom.
  const onScroll = () => {
    const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    const scrollTop = listInnerRef.current.scrollTop;
    const scrollHeight = listInnerRef.current.scrollHeight;
    const clientHeight = listInnerRef.current.clientHeight;

    if (scrollHeight - scrollTop === clientHeight) {
      const i = 10;
      let o = myid1 + 10;
      setmyid1(o);
      // setNotificationFilterText('All');
      setNotiFilterMode('All');
      dispatch(Notifications(`platform_id=${getPlatData.platform_id}&user_id=${id}&interval=All&offset=` + myid1));
    }
  };

  // function to get and show notifications.
  const handleNotifications = async () => {
    dispatch(ClearNotifications());
    // setNotificationFilterText('All');
    setNotiFilterMode('All');
    const params = `page=${'1'}&limit=${PER_PAGE}&interval=${notiFilterMode}`;
    dispatch(Notifications(params));

    await GlobalApiCall(
      `${URL.khbaseUrl}clear_notification?platform_id=${getPlatData.platform_id}&user_id=${id}`,
      'put',
      {},
      (response) => {
        if (response.data.status == true) {
          dispatch({ type: MARK_NOTIFICATION_READ });
          let LoginData = JSON.parse(localStorage.getItem('@LoginData'));
          LoginData.notification_count = '0';
          localStorage.setItem('@LoginData', JSON.stringify(LoginData));
        }
      },
    );
  };

  const [isInspire, setIsInspire] = useState(false);

  const notificationCountHandler = (msg) => {
    if (msg) {
      dispatch({ type: INCREMENT_NOTIFICATION_COUNT, payload: msg });
    }
  };

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('@LoginData')) || '';
    socket?.on('notification_count' + id, notificationCountHandler);

    return () => {
      socket?.off('notification_count' + id, notificationCountHandler);
    };
  }, [socket]);

  useEffect(() => {
    const params = '';

    // get full web url.
    var full = window.location.host;
    // separating full url by dot(.).
    var parts = full.split('.');
    // getting first part before first dot of the url.
    var sub = parts[0];
    if (sub == 'inspire') {
      setIsInspire(true);
    }

    // getting the login and platform data from the local storage.
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    setRole_id(LoginData?.role_id);
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
      if (LoginData) {
        const id = LoginData.id;
        setId(id);
        const platform_id = LoginData.platform_id;
        setPlatformId(platform_id);
        const first_name = LoginData.first_name;
        setFirstName(first_name);
        const image = LoginData.image;
        setImage(image);

        params = `page=${'1'}&limit=${PER_PAGE}&interval=${notiFilterMode}`;
        // get notification count from login data in local storage.

        dispatch(Notifications(params));
        setmyid(myid + 10);

        // if there is (all, users, giists or briifs) value in keyword param then run if condition.
        if (globalSearchKeyword != '') {
          const globalSearchParams = '';

          // if there is some filter on global search.
          if (filter == true)
            globalSearchParams = `platform_id=${getPlatObject.platform_id}&user_id=${id}&lastindex=${indexNum}&keyword=${globalSearchKeyword}&from_date=${fromDate}&to_date=${toDate}&category_id=${categoryId}&string=${inputValue}`;
          else
            globalSearchParams = `platform_id=${getPlatObject.platform_id}&user_id=${id}&lastindex=${indexNum}&keyword=${globalSearchKeyword}&from_date=&to_date=&category_id=&string=${inputValue}`;

          dispatch(globalSearch(globalSearchParams, onGlobalSearchSuccess, onGlobalSearchError));
        }
      }
    }

    return () => {};
  }, [globalSearchKeyword, filter, indexNum]);

  const { data } = useSelector((state) => state.sidebar);

  const handleFilterBriif = () => {
    let timerId;
    return (e) => {
      const searchData = e.target.value;
      props.setSearch(searchData);
      setTitle(searchData);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchBriifBySearch(searchData, data);
      }, 500);
    };
  };
  let searchitem = useMemo(() => handleFilterBriif(), [data]);

  const fetchBriffBYDate = () => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    var firstFormattedDate = fromDate == '' ? '' : moment(fromDate).format('YYYY-MM-DD');
    var secondFormattedDate = toDate == '' ? '' : moment(toDate).format('YYYY-MM-DD');
    let queryParameters = `platform_id=${GetPlatData.platform_id}&user_id=${LoginData.id}&string=&from_date=${firstFormattedDate}&to_date=${secondFormattedDate}`;
    if (data == 'draft') {
      dispatch(actionSearchDraft(queryParameters, onSuccessDraft, onErrorDraft));
    }
    if (data == 'sent') {
      dispatch(actionSearchSend(queryParameters, onSuccessSend, onErrorSend));
    }
    if (data == 'archived') {
      dispatch(actionSearchArchive(queryParameters, onSuccessArchive, onErrorArchive));
    }
    if (data == 'receive') {
      dispatch(actionSearchReceive(queryParameters, onSuccessRecived, onErrorRecived));
    }
    setFromDate('');
    setToDate('');
  };
  // local search in put change event handler function.
  const fetchBriifBySearch = (searchData, data) => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    let queryParameters = `platform_id=${GetPlatData.platform_id}&string=${searchData.trim()}&user_id=${LoginData.id}`;

    if (data == 'draft') {
      dispatch(actionSearchDraft(queryParameters, onSuccessDraft, onErrorDraft));
    }
    if (data == 'sent') {
      dispatch(actionSearchSend(queryParameters, onSuccessSend, onErrorSend));
    }
    if (data == 'archived') {
      dispatch(actionSearchArchive(queryParameters, onSuccessArchive, onErrorArchive));
    }
    if (data == 'receive') {
      dispatch(actionSearchReceive(queryParameters, onSuccessRecived, onErrorRecived));
    }
  };

  const onSuccessRecived = (res) => {
    props.setReceivedBriifsData((prevState) => ({
      ...prevState,
      recive: res.recive,
      pin: res.pin,
    }));
  };
  const onSuccessArchive = (res) => {
    props.setArchivedBriifsData((prevState) => ({
      ...prevState,
      archive: res.archive,
      pin: res.pin,
    }));
  };
  const onSuccessDraft = (res) => {
    props.setDraftBriifsData((prevState) => ({
      ...prevState,
      briffs: res.save,
    }));
  };
  const onSuccessSend = (res) => {
    props.setSendBriifsData((prevState) => ({
      ...prevState,
      recive: res.send,
    }));
  };
  const onErrorArchive = (error) => {
    console.log('error Archive', error);
  };
  const onErrorRecived = (error) => {
    console.log('error Recived', error);
  };
  const onErrorSend = (error) => {
    console.log('error Send', error);
  };
  const onErrorDraft = (error) => {
    console.log('error Draft', error);
  };

  const handleAllNotificationsRead = () => {
    const readallnotificationsparams = `platform_id=${getPlatData.platform_id}&user_id=${id}`;
    dispatch(
      readAllNotifications(readallnotificationsparams, onReadAllNotificationsSuccess, onReadAllNotificationsError),
    );
  };

  const onReadAllNotificationsSuccess = (res) => {
    // const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&offset=10&interval=All`;
    const params = `page=${notifications.nextPage}&limit=${PER_PAGE}&interval=${notiFilterMode}`;
    dispatch(Notifications(params));
  };

  const onReadAllNotificationsError = (err) => {
    console.log(err);
  };

  const handleNotificationFilter = (date) => {
    dispatch(ClearNotifications());
    // setNotificationFilterText(date);
    setNotiFilterMode(date);
    // const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&offset=0&interval=${date}`;
    const params = `page=${'1'}&limit=${PER_PAGE}&interval=${date}`;
    console.log(params, 'the params of filter');
    dispatch(Notifications(params));
  };

  // global search in put change event handler function.
  const handleGlobalSearchInputChange = (e, value, input) => {
    if (applyFilter == true)
      dispatch(
        globalSearchApplyFilter(
          e.target.value,
          filter,
          // indexNum
          0,
        ),
      );

    // condition runs if there is some filter applied.
    if (value == 'filter') {
      setInputValue(input);
      dispatch(
        globalSearchApplyFilter(
          input,
          filter,
          // indexNum
          0,
        ),
      );
    } else setInputValue(e.target.value);
    dispatch(
      globalSearchApplyFilter(
        e.target.value,
        filter,
        // indexNum
        0,
      ),
    );
    const params = '';
    if (value == 'filter' || filter == true)
      params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${
        getPlatData.platform_id
      }&user_id=${id}&lastindex=${
        // indexNum
        0
      }&keyword=${globalSearchKeyword}&from_date=${fromDate}&to_date=${toDate}&category_id=${categoryId}&string=${
        e.target.value
      }`;
    else
      params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${
        getPlatData.platform_id
      }&user_id=${id}&lastindex=${
        // indexNum
        0
      }&keyword=${globalSearchKeyword}&from_date=&to_date=&category_id=&string=${e.target.value}`;
    dispatch(globalSearch(params, onGlobalSearchSuccess, onGlobalSearchError));
  };
  const onGlobalSearchSuccess = (res) => {
    console.log(res.data);
  };
  const onGlobalSearchError = () => {};

  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));

  // function to clear global search input value.
  const handleClearInputValue = () => {
    dispatch(globalSearchApplyFilter('', applyFilter, 0));
    const params = '';

    if (applyFilter == true)
      params = `platform_id=${getPlatData.platform_id}&user_id=${id}&lastindex=${indexNum}&keyword=${globalSearchKeyword}&from_date=${fromDate}&to_date=${toDate}&category_id=${categoryId}&string=`;
    else
      params = `platform_id=${getPlatData.platform_id}&user_id=${id}&lastindex=${indexNum}&keyword=${globalSearchKeyword}&from_date=&to_date=&category_id=&string=`;

    // const params = `name=${getPlatData.name}&user_id=${id}&platform_id=${platformId}&lastindex=0&keyword=${globalSearchKeyword}&from_date=&to_date=&category_id=&string=`;
    dispatch(globalSearch(params, onGlobalSearchSuccess, onGlobalSearchError));
    setInputValue('');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [hideShowCal, setHideShowCal] = useState(false);
  const clickOutside = useRef(null);
  useOnClickOutside(clickOutside, () => setHideShowCal(false));

  const calenderShowHandler = () => {
    setHideShowCal(true);
  };
  const [inputClick, setInputClick] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [kHSearch, setKHSearch] = useState(true);
  // const [searchInput, setSearchInput] = useState('');

  // new code
  const [notificationState, setNotificationState] = React.useState(null);
  const handleOpenNotifications = (event) => {
    setNotificationState(event.currentTarget);
    handleNotifications();
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setNotificationState(null);
  };

  const openNotificationsItems = Boolean(notificationState);
  const NotificationId = openNotificationsItems ? 'simple-popover' : undefined;

  const notificationRef = useRef();
  const loadingTimes = new Array(!notifications?.items?.length ? 10 : notifications?.offset).fill(0);

  function nofiticationScroll(params) {
    const { clientHeight, scrollHeight, scrollTop } = notificationRef.current;
    const checkingSum = scrollTop + clientHeight;
    if (
      checkingSum.toFixed(0) == scrollHeight ||
      Math.ceil(checkingSum) == scrollHeight ||
      Math.round(checkingSum) == scrollHeight ||
      Math.floor(checkingSum) == scrollHeight
    ) {
      if (notifications.nextPage == null) {
        return;
      } else {
        const params = `page=${notifications.nextPage}&limit=${PER_PAGE}&interval=${notiFilterMode}`;
        dispatch(Notifications(params));
      }
    }
  }

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };
  return (
    <>
      {/*  global search filter sidebar */}
      <GlobalSearchFilterSidebar
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        setApplyFilter={setApplyFilter}
        handleGlobalSearchInputChange={handleGlobalSearchInputChange}
        inputValue={inputValue}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      {/* top navbar */}
      <SuccessModal
        modalOpen={modalShowErrorSuccess}
        handleModalClose={handleCloseModalPublish}
        image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
        title={successErrorMessage.heading}
        description={successErrorMessage.message}
        button1={successErrorMessage.buttonText}
      />
      <Navbar
        className={router.pathname == '/kh/KnowledgeHome' ? 'headStyle py-0 mb-3 px-1' : 'py-0 mb-3 px-1'}
        style={{
          height: '60px',
          // position:  'fixed',
        }}
      >
        <div
          className={
            router.pathname == '/kh/KnowledgeHome'
              ? 'transparencyhead px-0 mx-2 ps-0 align-items-center d-flex w-100 headerCard'
              : 'px-0 mx-2 ps-0 align-items-center d-flex w-100 headerCard'
          }
          style={{ marginTop: '10px', fontWeight: '1200' }}
        >
          <Navbar.Brand
            className={
              router.pathname === '/combine/GlobalSearch'
                ? 'bold py-0 d-flex row m-0 align-items-center text-white'
                : 'bold py-0 d-flex row ps-3 align-items-center text-white'
            }
            // href="/ch/dashboard/Statistics"
          >
            {/* {props.image && props.dashboard ? (
              <Link href={`/ch/dashboard/Statistics?${props.dashboard}`}>
                <span className="col-3">
                  <Image src={props.image} alt="arrow" width="17px" height="17px" />
                </span>
              </Link>
            ) : (
              ''
            )} */}
            <span className="col-sm-2 col-3 d-flex d-md-none px-0 ps-2">
              <Image
                src="/assets/icons/new/white-menu.svg"
                alt="menu"
                width="25px"
                height="25px"
                onClick={(e) => {
                  props.setSidebarMenuOpen(true);
                }}
              />
            </span>
            <span
              className={
                props.image
                  ? 'col-6 text-white bold '
                  : router.pathname === '/combine/GlobalSearch'
                  ? 'col-9 text-white bold d-lg-none d-inline'
                  : 'col-9 text-white bold '
              }
            >
              {props.heading ? props.heading : 'Communication Hub'}
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {role_id == 6 && (props.dashboard || props.showdropdown) && (
            <div>
              <List component="nav" className="medium-large" onClick={handleClickListItem}>
                <span className="medium-large text-secondary ms-2 me-2"> Choose Platform:</span>

                <span
                  style={{
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '15px',
                    /* identical to box height */
                    color: '#FFF',
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedPlatform?.name}
                </span>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                {AllPlatform?.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handlePlatformChange(event, index, option)}
                    style={{ width: '200px', textTransform: 'uppercase' }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          <div id="basic-navbar-nav" className={router.pathname === '/combine/GlobalSearch' ? 'w-100' : 'ms-auto'}>
            <Nav
              className={
                router.pathname === '/combine/GlobalSearch'
                  ? 'me-4 d-flex align-items-center'
                  : 'ms-auto me-4 d-flex align-items-center'
              }
            >
              {router.pathname === '/combine/GlobalSearch' ? (
                <div
                  className="d-none ms-0 col-9 d-lg-flex ms-1"
                  ref={ref}
                  style={{
                    // width: "900px",
                    borderRadius: '10px',
                    border: '1px solid grey',
                    backgroundColor: 'white',
                    height: '45px',
                    marginRight: '10px',
                    marginLeft: '0px',
                  }}
                >
                  <div className="col-lg-1 d-inline-flex justify-content-center align-items-center p-0">
                    <Image src="/assets/icons/new/search.svg" width="20px" height="20px" alt="search" className="p-0" />
                  </div>
                  <input
                    style={{
                      border: 'none',
                    }}
                    type="text"
                    placeholder="Global Search"
                    value={inputValue}
                    name="title"
                    className="col-9 p-0 d-inline-flex align-items-center h-100"
                    onChange={(e) => handleGlobalSearchInputChange(e, '', '')}
                  />
                  <div className="col-lg-2 d-flex justify-content-center align-items-center">
                    <Image
                      src="/assets/icons/new/search_cross.svg"
                      onClick={(e) => {
                        handleClearInputValue();
                      }}
                      width="15px"
                      height="15px"
                      alt="cross"
                    />
                    <hr style={{ transform: 'rotate(90deg)', width: '35px' }} />
                    <NavDropdown
                      title={
                        <GenericTooltip
                          placement="top"
                          title="Filter"
                          component={<Image src="/assets/icons/select.png" width="15px" height="15px" alt="select" />}
                        />
                      }
                      id="basic-nav-dropdown border-0"
                      className="extrabold text-capitalize notificationfilterdropdown d-flex align-items-center justify-content-center"
                    >
                      <NavDropdown.Item
                        className="px-0 pb-2 pt-3 border-0 m-0 dropdown-item"
                        style={{
                          backgroundColor: COLORS.mainColor,
                          borderRadius: '10px 10px 0px 0px',
                        }}
                      >
                        <div
                          onClick={() => {
                            setGlobalSearchInputType('text');
                            setKeyword('name');
                            dispatch(globalSearchApplyFilter(inputValue, false, 0));
                          }}
                          className="ps-3 d-flex align-items-center"
                        >
                          <Image
                            src="/assets/icons/new/white_outlined_user.svg"
                            width="15px"
                            height="16px"
                            alt="user"
                          />{' '}
                          <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center">
                            {' '}
                            Name{' '}
                          </span>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="px-0 pt-2 pb-3 border-0 m-0 dropdown-item"
                        style={{
                          backgroundColor: COLORS.mainColor,
                          borderRadius: '0px 0px 10px 10px',
                        }}
                      >
                        <div
                          onClick={(e) => {
                            setGlobalSearchInputType('date');
                            setSidebarOpen('true');
                            setKeyword('date');
                          }}
                          className="ps-3 d-flex align-items-center"
                        >
                          <Image
                            src="/assets/icons/new/date-outline-badged.svg"
                            width="16px"
                            height="16px"
                            alt="date"
                          />{' '}
                          <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center">
                            {' '}
                            Date{' '}
                          </span>
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              ) : isModalOpen || title.trim() ? (
                <div
                  className="d-none row d-lg-flex align-items-center border"
                  ref={ref}
                  style={{
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    height: '45px',
                    marginRight: '20px',
                    width: '360px',
                  }}
                >
                  <div className="col-lg-10 d-flex">
                    {type == 'name' ? (
                      <input
                        style={{
                          border: 'none',
                        }}
                        type={'text'}
                        placeholder="Search Briifs"
                        name="title"
                        value={title}
                        className="regular-xsmall w-100"
                        onChange={searchitem}
                        autoFocus
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <input
                          style={{
                            border: 'none',
                            marginTop: hideShowCal ? '7px' : '0px',
                          }}
                          type={'text'}
                          onClick={() => {
                            setInputClick('date1');
                            calenderShowHandler();
                            setFromDate(new Date());
                          }}
                          value={fromDate == '' ? 'Start Date' : moment(fromDate).format('YYYY-MM-DD')}
                          placeholder="Start date"
                          className="regular-xsmall w-100"
                        />
                        <input
                          style={{
                            border: 'none',
                            marginTop: hideShowCal ? '7px' : '0px',
                          }}
                          onClick={() => {
                            setInputClick('date2');
                            calenderShowHandler();
                            setToDate(new Date());
                          }}
                          value={toDate == '' ? 'End Date' : moment(toDate).format('YYYY-MM-DD')}
                          type={'text'}
                          placeholder="End date"
                          className="regular-xsmall w-100"
                        />
                        <div
                          style={{
                            border: 'none',
                            marginTop: hideShowCal ? '7px' : '0px',
                            opacity: '0.5',
                          }}
                          onClick={() => fetchBriffBYDate()}
                        >
                          <Image src="/assets/icons/submitDate.svg" width="45px" height="45px" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="col-lg-2 p-0 d-flex align-items-center justify-content-end pe-3 "
                    style={{ marginTop: hideShowCal ? '7px' : '0px' }}
                  >
                    <div className="bg-white d-flex align-self-center">
                      <NavDropdown
                        title={
                          <GenericTooltip
                            placement="top"
                            title="Filter"
                            component={<Image src="/assets/icons/select.png" width="13px" height="13px" alt="select" />}
                          />
                        }
                        id="basic-nav-dropdown border-0"
                        className="extrabold text-capitalize notificationfilterdropdown d-flex align-items-center justify-content-center"
                      >
                        <NavDropdown.Item
                          onClick={() => {
                            setType('name');
                          }}
                          className="px-0 pb-2 pt-3 border-0 m-0 dropdown-item"
                          style={{
                            backgroundColor: COLORS.mainColor,
                            borderRadius: '10px 10px 0px 0px',
                          }}
                        >
                          <div className="ps-3 d-flex align-items-center">
                            <Image
                              src="/assets/icons/new/white_outlined_user.svg"
                              width="15px"
                              height="16px"
                              alt="user"
                            />
                            <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center">
                              Name
                            </span>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="px-0 pt-2 pb-3 border-0 m-0 dropdown-item"
                          onClick={() => {
                            setType('date');
                          }}
                          style={{
                            backgroundColor: COLORS.mainColor,
                            borderRadius: '0px 0px 10px 10px',
                          }}
                        >
                          <div className="ps-3 d-flex align-items-center">
                            <Image
                              src="/assets/icons/new/date-outline-badged.svg"
                              width="16px"
                              height="16px"
                              alt="date"
                            />
                            <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center">
                              Date
                            </span>
                          </div>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>

                  {type == 'date' && hideShowCal && (
                    <Box ref={clickOutside} mb={3} style={{ zIndex: 20000, marginTop: '10px' }}>
                      {inputClick == 'date1' && (
                        <Calendar
                          onChange={inputClick == 'date1' && setFromDate}
                          value={fromDate}
                          prev2Label={null}
                          next2Label={null}
                          nextLabel={
                            <Image src="/assets/icons/new/next_main_color.svg" width="15px" height="15px" alt="back" />
                          }
                          prevLabel={
                            <Image
                              src="/assets/icons/new/previous_main_color.svg"
                              width="15px"
                              height="15px"
                              alt="back"
                            />
                          }
                          className={`text-light filter-calender mt-3 p-3`}
                        />
                      )}
                      {inputClick == 'date2' && (
                        <Calendar
                          onChange={inputClick == 'date2' && setToDate}
                          value={toDate}
                          prev2Label={null}
                          next2Label={null}
                          nextLabel={
                            <Image src="/assets/icons/new/next_main_color.svg" width="15px" height="15px" alt="down" />
                          }
                          prevLabel={
                            <Image
                              src="/assets/icons/new/previous_main_color.svg"
                              width="15px"
                              height="15px"
                              alt="back"
                            />
                          }
                          className="text-light filter-calender mt-3 p-2"
                        />
                      )}
                    </Box>
                  )}
                </div>
              ) : kHSearch == true &&
                router.pathname == '/kh/SearchKnowledge' &&
                router.query.name !== 'selected Giists' ? (
                <div
                  className="d-none d-lg-flex border row position-relative"
                  ref={ref}
                  style={{
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    height: '45px',
                    marginRight: '20px',
                    width: '360px',
                  }}
                >
                  <div className="col-lg-10">
                    <input
                      style={{
                        border: 'none',
                        height: '100%',
                      }}
                      type={type}
                      placeholder="Search Giists"
                      name="title"
                      value={props.searchInput}
                      className="regular-xsmall w-100"
                      onChange={props.setSearchInput}
                      autoFocus
                    />
                    <button
                      type="submit"
                      style={{
                        position: 'absolute',
                        right: '1em',
                        background: 'none',
                        border: 'none',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <Image src="/assets/img/dropdownSearch.svg" alt="dropdown search" height={20} width={20} />
                    </button>
                  </div>
                </div>
              ) : (props.heading && props.heading == 'Knowledge Hub') || props.dashboard == 'dashboard=kh' ? (
                <ArrowTooltips title="Search" placement="top">
                  <span className={'pe-3 d-flex align-items-center d-none d-lg-flex'}>
                    <Image
                      src="/assets/icons/new/SearchIcon.svg"
                      width="20px"
                      alt="search"
                      height="20px"
                      className="ms-auto"
                      style={{ marginRight: '20px', marginBottom: '5px' }}
                      onClick={() => {
                        router.push('/kh/SearchKnowledge');
                        setKHSearch(true);
                        setType('name');
                      }}
                    />
                  </span>
                </ArrowTooltips>
              ) : (props.heading && props.heading == 'Communication Hub') || props.dashboard == 'dashboard=ch' ? (
                <span
                  className={
                    router.pathname === '/'
                      ? 'pe-3 d-flex align-items-center d-none d-lg-flex'
                      : 'pe-3 d-flex align-items-center d-none d-lg-flex ch_local-search-icon_disabled'
                  }
                >
                  <ArrowTooltips title="Search" placement="top">
                    <span className="d-flex">
                      <Image
                        src="/assets/icons/new/SearchIcon.svg"
                        width="20px"
                        alt="search"
                        height="20px"
                        className="ms-auto"
                        style={{ marginRight: '20px', marginBottom: '5px' }}
                        onClick={() => setModalOpen(true)}
                      />
                    </span>
                  </ArrowTooltips>
                </span>
              ) : (
                ''
              )}
              {router.pathname === '/combine/GlobalSearch'
                ? ''
                : dashboardSearch == true && (
                    <Nav.Item href="#" className="mx-1 header-item">
                      <Image
                        src="/assets/img/SearchIcon.svg"
                        className="img-fluid headerlist header-icon"
                        width="35px"
                        height="35px"
                        alt="Picture of the author"
                        style={{ width: '35px' }}
                      />
                    </Nav.Item>
                  )}
              {/* {router.pathname === "/combine/GlobalSearch" ? (
                <div
                  className="row col-9"
                  ref={ref}
                  style={{
                    width: "100%",
                    borderRadius: "18px",
                    border: "1px solid grey",
                    backgroundColor: "white",
                    height: "50px",
                    marginRight: "20px",
                  }}
                >
                  <div className="col-lg-1 d-flex justify-content-center align-items-center p-0">
                    <Image
                      src="/assets/icons/new/search.svg"
                      width="25px"
                      height="25px"
                      alt="search"
                      className="p-0"
                    />
                  </div>
                  <input
                    style={{
                      border: "none",
                    }}
                    type="text"
                    placeholder="Global Search"
                    value={inputValue}
                    name="title"
                    className="col-lg-9 p-0 d-flex align-items-center h-100"
                    onChange={(e) => handleGlobalSearchInputChange(e, "", "")}
                  ></input>
                  <div className="col-lg-2 d-flex justify-content-center align-items-center">
                    <Image
                      src="/assets/icons/new/search_cross.svg"
                      onClick={(e) => {
                        handleClearInputValue();
                      }}
                      width="20px"
                      height="20px"
                      alt="cross"
                    />
                    <hr style={{ transform: "rotate(90deg)", width: "35px" }} />
                    <NavDropdown
                      title={
                        <Image
                          src="/assets/icons/select.png"
                          width="20px"
                          height="20px"
                          alt="select"
                        />
                      }
                      id="basic-nav-dropdown border-0"
                      className="extrabold text-capitalize"
                    >
                      <NavDropdown.Item
                        className="px-0 pb-2 pt-3 border-0 m-0 dropdown-item"
                        style={{
                          backgroundColor: COLORS.mainColor,
                          borderRadius: "10px 10px 0px 0px",
                        }}
                      >
                        <div
                          onClick={() => {
                            setGlobalSearchInputType("text");
                            setKeyword("name");
                            dispatch(
                              globalSearchApplyFilter(inputValue, false, 0)
                            );
                          }}
                          className="ps-3 d-flex align-items-center"
                        >
                          <Image
                            src="/assets/icons/new/white_outlined_user.svg"
                            width="20px"
                            height="20px"
                            alt="user"
                          />{" "}
                          <span className="dropdown-text text-white ms-2 d-flex align-items-center">
                            {" "}
                            Name{" "}
                          </span>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="px-0 pt-2 pb-3 border-0 m-0 dropdown-item"
                        style={{
                          backgroundColor: COLORS.mainColor,
                          borderRadius: "0px 0px 10px 10px",
                        }}
                      >
                        <div
                          onClick={(e) => {
                            setGlobalSearchInputType("date");
                            setSidebarOpen("true");
                            setKeyword("date");
                          }}
                          className="ps-3 d-flex align-items-center"
                        >
                          <Image
                            src="/assets/icons/new/date-outline-badged.svg"
                            width="20px"
                            height="20px"
                            alt="date"
                          />{" "}
                          <span className="dropdown-text text-white ms-2 d-flex align-items-center">
                            {" "}
                            Date{" "}
                          </span>
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              ) : isModalOpen ? (
                <div
                  className="border row"
                  ref={ref}
                  style={{
                    backgroundColor: "white",
                    height: "50px",
                    marginRight: "20px",
                    width: "260px",
                  }}
                >
                  <div className="col-lg-10">
                    <input
                      style={{
                        border: "none",
                        width: "200px",
                        marginTop: "5px",
                        marginTop: "9px",
                      }}
                      type={type}
                      placeholder=""
                      name="title"
                      value={title}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="col-lg-1" style={{ marginTop: "8px" }}>
                    <div className="dropdown">
                      <Image
                        src="/assets/icons/select.png"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        width="20px"
                        height="20px"
                        alt="select"
                      />
                      <div className="dropdown-menu">
                        <div style={{ padding: "10px", margin: "10px" }}>
                          <div onClick={() => setType("name")}>By Name</div>
                          <div
                            style={{ marginTop: "10px" }}
                            onClick={() => setType("date")}
                          >
                            By Date
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src="/assets/icons/search1.png"
                  width="27px"
                  alt="search"
                  height="27px"
                  style={{ marginRight: "20px", marginBottom: "5px" }}
                  onClick={() => setModalOpen(true)}
                />
              )} */}
              <span
                className={
                  router.pathname === '/combine/GlobalSearch'
                    ? 'col-3 d-flex align-items-center justify-content-end'
                    : 'd-flex align-items-center'
                }
              >
                <Nav.Item className="mx-1 header-item d-inline-flex align-items-center justify-content-center">
                  <div className="position-relative d-block notification-tooltip">
                    <a
                      aria-describedby={NotificationId}
                      className="position-relative"
                      onClick={handleOpenNotifications}
                    >
                      {notificationCount > 0 ? (
                        <ArrowTooltips title="Notifications" placement="top">
                          <span className="position-relative d-flex justify-content-center">
                            <Image
                              src="/assets/icons/new/notificationIcon.svg"
                              className="img-fluid"
                              alt="Your Notifications"
                              width="20px"
                              height="20px"
                            />
                          </span>
                        </ArrowTooltips>
                      ) : (
                        <ArrowTooltips title="Notifications" placement="top">
                          <span className="position-relative d-flex justify-content-center">
                            <Image
                              src="/assets/icons/new/full_notification.svg"
                              className="img-fluid"
                              alt="Your Notifications full icon"
                              width="20px"
                              height="20px"
                            />
                          </span>
                        </ArrowTooltips>
                      )}

                      <badge
                        className="rounded-circle position-absolute medium px-1 whitecolor"
                        style={{
                          left: '9px',
                          bottom: '9px',
                          backgroundColor: COLORS.orange,
                        }}
                      >
                        {notificationCount > 0 && <span className="whitecolor">{notificationCount}+</span>}
                      </badge>
                    </a>
                    <Popover
                      style={{ top: '5%', left: '-10%' }}
                      id={NotificationId}
                      open={openNotificationsItems}
                      anchorEl={notificationState}
                      onClose={handleCloseNotification}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <Fragment>
                        <div
                          className=""
                          style={{
                            backgroundColor: COLORS.white,
                            borderRadius: '12px',
                            width: '400px',
                            height: '550px',
                          }}
                        >
                          <div
                            className="d-flex justify-content-between align-items-center px-3 py-2 "
                            style={{
                              backgroundColor: COLORS.white,
                              borderRadius: '7px 7px 0px 0px',
                            }}
                          >
                            <div className="d-flex align-items-center mt-1">
                              <div className="semibold-mid-small d-inline-flex mb-0 align-items-center">
                                <span className=" semibold">Notifications</span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <p className="semibold-mid-small d-inline align-middle">
                                {notiFilterMode}
                                <span className="ps-3">
                                  <NavDropdown
                                    data-toggle="dropdown"
                                    title={
                                      <GenericTooltip
                                        placement="top"
                                        title="Filter"
                                        component={
                                          <Image
                                            src="/assets/icons/new/notification-filter.svg"
                                            className="img-fluid"
                                            alt="Your Notifications"
                                            width="10px"
                                            height="10px"
                                          />
                                        }
                                      />
                                    }
                                    id="border-0"
                                    className="d-inline-flex px-0 notificationfilterdropdown"
                                  >
                                    <NavDropdown.Item
                                      className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 text-center semibold-xsmall text-white"
                                      style={{
                                        backgroundColor: COLORS.mainColor,
                                        borderRadius: '10px 10px 0px 0px',
                                        borderBottom: '0px solid black',
                                      }}
                                      onClick={() => {
                                        handleNotificationFilter('last hour');
                                      }}
                                    >
                                      Last hour
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                      className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 dropdown-item semibold-xsmall text-white text-center"
                                      style={{
                                        backgroundColor: COLORS.mainColor,
                                        borderBottom: '0px solid black',
                                      }}
                                      onClick={() => {
                                        handleNotificationFilter('24hours');
                                      }}
                                    >
                                      Last 24 hours
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                      className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 dropdown-item semibold-xsmall text-white text-center"
                                      style={{
                                        backgroundColor: COLORS.mainColor,
                                        borderBottom: '0px solid black',
                                      }}
                                      onClick={() => {
                                        handleNotificationFilter('7days');
                                      }}
                                    >
                                      Last 7 days
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                      className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 dropdown-item semibold-xsmall text-white text-center"
                                      style={{
                                        backgroundColor: COLORS.mainColor,
                                        borderRadius: '0px 0px 10px 10px',
                                        borderBottom: '0px solid black',
                                      }}
                                      onClick={() => {
                                        handleNotificationFilter('All');
                                      }}
                                    >
                                      All
                                    </NavDropdown.Item>
                                  </NavDropdown>
                                </span>
                              </p>
                            </div>
                          </div>

                          <div
                            ref={notificationRef}
                            onScroll={async (e) => await nofiticationScroll(e)}
                            style={{
                              scrollbarWidth: 'none',
                              height: '92%',
                              overflowY: 'scroll',
                            }}
                          >
                            {!notifications.items?.length && notifications.loading == true ? (
                              loadingTimes.map((_, index) => <NotificationSkeletonLoader index={index} />)
                            ) : notifications.items?.length != [] ? (
                              <>
                                {notifications.items?.map((items, index) => (
                                  <Notification
                                    key={index}
                                    action={items.action}
                                    firstName={items.first_name}
                                    lastName={items.last_name}
                                    title={items.briff_title}
                                    message={items.message_title}
                                    image={items.image}
                                    thumbnail={items.briff_thumbnail}
                                    time={items.created}
                                    handlePlayedBriif={props.handlePlayedBriif}
                                    briifId={items.briff_id}
                                    GiistId={items.tutorial_id}
                                    type={items.type}
                                    meetingToken={items.meeting_token}
                                    goLiveId={items.go_live_id}
                                    setReceivedBriifsData={props.setReceivedBriifsData}
                                    receivedBriifsData={props.receivedBriifsData}
                                    handleNotificationTray={handleCloseNotification}
                                    modalShowErrorSuccess={modalShowErrorSuccess}
                                    setModalShowErrorSuccess={setModalShowErrorSuccess}
                                    successErrorMessage={successErrorMessage}
                                    setSuccessErrorMessage={setSuccessErrorMessage}
                                  />
                                ))}

                                {notifications.loading &&
                                  loadingTimes.map((_, index) => <NotificationSkeletonLoader index={index} />)}
                              </>
                            ) : (
                              <div className="d-flex justify-content-center align-items-center flex-column h-100">
                                <Image
                                  src="/assets/images/no-result-found.svg"
                                  height={117}
                                  width={102}
                                  alt="no result found"
                                />
                                <p
                                  sx={{
                                    pt: 2,
                                    fontFamily: 'Gilroy-Medium',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontSize: '20px',
                                    lineHeight: '25px',
                                  }}
                                >
                                  Currently, no notifications to display.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    </Popover>

                    {/* <Tooltip
                      // className='shadow'
                      html={
                        <Fragment>
                          <div
                            className=""
                            style={{
                              backgroundColor: COLORS.white,
                              borderRadius: '12px',
                              width: '400px',
                              height: '550px',
                            }}
                          >
                            <div
                              className="row mx-0"
                              style={{
                                backgroundColor: COLORS.white,
                                borderRadius: '7px 7px 0px 0px',
                              }}
                            >
                              <div
                                className="col-6 text-start d-flex align-items-center mt-1"
                                // style={{ marginTop: "3px" }}
                              >
                                <div className="semibold-mid-small d-inline-flex mb-0 align-items-center">
                                  
                                  <span className=" semibold">Notifications</span>
                                </div>
                              </div>
                            </div>
                            <div className="row mx-0 pt-2 pb-1" style={{ backgroundColor: COLORS.white }}>
                              <div className="col-6 text-start">
                                <p className="semibold-mid-small d-inline align-middle">
                                  {notificationFilterText == 'All'
                                    ? notifications.new?.length == []
                                      ? 'Earlier'
                                      : 'New'
                                    : 'Notificalions'}
                                </p>
                              </div>
                              <div className="col-6 text-end">
                                <p className="semibold-mid-small d-inline align-middle">
                                  {notificationFilterText}
                                  <span className="ps-3">
                                    <NavDropdown
                                      data-toggle="dropdown"
                                      title={
                                        <GenericTooltip
                                          placement="top"
                                          title="Filter"
                                          component={
                                            <Image
                                              src="/assets/icons/new/notification-filter.svg"
                                              className="img-fluid"
                                              alt="Your Notifications"
                                              width="9px"
                                              height="9px"
                                            />
                                          }
                                        />
                                      }
                                      id="border-0"
                                      className="d-inline-flex px-0 notificationfilterdropdown"
                                    >
                                      <NavDropdown.Item
                                        className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0"
                                        style={{
                                          backgroundColor: COLORS.mainColor,
                                          borderRadius: '10px 10px 0px 0px',
                                          borderBottom: '0px solid black',
                                        }}
                                      >
                                        <div
                                          onClick={() => {
                                            handleNotificationFilter('Last hour');
                                          }}
                                          className="ps-1 d-flex align-items-center"
                                        >
                                          <span className="dropdown-text semibold-xsmall text-white ms-2 d-flex align-items-center">
                                            {' '}
                                            Last hour{' '}
                                          </span>
                                        </div>
                                      </NavDropdown.Item>
                                      <NavDropdown.Item
                                        className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 dropdown-item"
                                        style={{
                                          backgroundColor: COLORS.mainColor,
                                          borderBottom: '0px solid black',
                                        }}
                                      >
                                        <div
                                          onClick={() => {
                                            handleNotificationFilter('24hours');
                                          }}
                                          className="ps-1 d-flex align-items-center"
                                        >
                                          <span className="dropdown-text semibold-xsmall text-white ms-2 d-flex align-items-center">
                                            {' '}
                                            Last 24 hours{' '}
                                          </span>
                                        </div>
                                      </NavDropdown.Item>

                                      <NavDropdown.Item
                                        className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 dropdown-item"
                                        style={{
                                          backgroundColor: COLORS.mainColor,
                                          borderBottom: '0px solid black',
                                        }}
                                      >
                                        <div
                                          onClick={() => {
                                            handleNotificationFilter('7days');
                                          }}
                                          className="ps-1 d-flex align-items-center"
                                        >
                                          <span className="dropdown-text semibold-xsmall text-white ms-2 d-flex align-items-center">
                                            {' '}
                                            Last 7 days{' '}
                                          </span>
                                        </div>
                                      </NavDropdown.Item>

                                      <NavDropdown.Item
                                        className="px-0 pb-2 pt-3 border-0 m-0 border-bottom-0 dropdown-item"
                                        style={{
                                          backgroundColor: COLORS.mainColor,
                                          borderRadius: '0px 0px 10px 10px',
                                          borderBottom: '0px solid black',
                                        }}
                                      >
                                        <div
                                          onClick={() => {
                                            handleNotificationFilter('All');
                                          }}
                                          className="ps-1 d-flex align-items-center"
                                        >
                                          <span className="dropdown-text semibold-xsmall text-white ms-2 d-flex align-items-center">
                                            {' '}
                                            All{' '}
                                          </span>
                                        </div>
                                      </NavDropdown.Item>
                                    </NavDropdown>
                                  </span>
                                </p>
                              </div>
                            </div>
                            {notificationFilterText == 'All' ? (
                              notifications.new?.length == [] ? (
                                ''
                              ) : (
                                <>
                                  <div
                                    style={{
                                      scrollbarWidth: 'none',
                                      // height: '160px',
                                      height: '250px',
                                      overflow: 'scroll',
                                    }}
                                  >
                                    {
                                      notifications.new?.length != []
                                        ? notifications.new?.map((items, index) => (
                                            <Notification
                                              key={index}
                                              action={items.action}
                                              firstName={items.first_name}
                                              lastName={items.last_name}
                                              message={items.message_title}
                                              image={items.image}
                                              thumbnail={items.briff_thumbnail}
                                              time={items.created}
                                              // play brif
                                              handlePlayedBriif={props.handlePlayedBriif}
                                              briifId={items.briff_id}
                                              GiistId={items.tutorial_id}
                                              type={items.type}
                                              meetingToken={items.meeting_token}
                                              goLiveId={items.go_live_id}
                                              setReceivedBriifsData={props.setReceivedBriifsData}
                                              receivedBriifsData={props.receivedBriifsData}
                                            />
                                          ))
                                        : ''
                                      // <p className="row h-100 col-11 p-0 my-2 py-1 mx-auto d-flex justify-content-center align-items-center medium">
                                      //   There is no notification in this section
                                      // </p>
                                    }
                                  </div>
                                  {notifications.new?.length == [] ? (
                                    ''
                                  ) : (
                                    <div className="row mx-0 pb-1" style={{ backgroundColor: COLORS.white }}>
                                      <div className="col-12 text-start">
                                        <p className="semibold-mid-small d-inline align-middle">Earlier</p>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )
                            ) : (
                              ''
                            )}

                            <div className="list">
                              <div>
                                <div
                                  className="pb-2"
                                  onScroll={onScroll}
                                  ref={listInnerRef}
                                  style={{
                                    // height: notificationFilterText == 'All' ? '115px' : '280px',
                                    height:
                                      notificationFilterText == 'All'
                                        ? notifications.new?.length == []
                                          ? '330px'
                                          : '220px'
                                        : '330px',
                                    overflow: 'scroll',
                                  }}
                                >
                                  {notifications.early?.length != [] ? (
                                    notifications.early?.map((items, index) => (
                                      <Notification
                                        key={index}
                                        action={items.action}
                                        firstName={items.first_name}
                                        lastName={items.last_name}
                                        message={items.message_title}
                                        image={items.image}
                                        thumbnail={items.briff_thumbnail}
                                        time={items.created}
                                        // play brif
                                        handlePlayedBriif={props.handlePlayedBriif}
                                        briifId={items.briff_id}
                                        GiistId={items.tutorial_id}
                                        type={items.type}
                                        meetingToken={items.meeting_token}
                                        goLiveId={items.go_live_id}
                                      />
                                    ))
                                  ) : (
                                    <p className="row h-100 col-11 p-0 my-2 py-1 mx-auto d-flex justify-content-center align-items-center medium">
                                      There is no notification in this section
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      }
                      arrow="true"
                      animation="shift"
                      distance="500"
                      arrowSize="big"
                      // arrow="true"
                      animateFill="true"
                      size="big"
                      interactive="true"
                      // position="top-end"
                      position="right"
                      trigger="click"
                      theme="light"
                      useContext="true"
                      open={openNotification}
                      onRequestClose={() => {
                        setOpenNotification(false);
                      }}
                      hideDelay="0"
                    >
                      <a
                        className="position-relative"
                        onClick={() => {
                          handleNotifications();
                          setOpenNotification(true);
                        }}
                      >
                        {notificationCount > 0 ? (
                          <ArrowTooltips title="Notifications" placement="top">
                            <span className="position-relative">
                              <Image
                                src="/assets/icons/new/notificationIcon.svg"
                                className="img-fluid"
                                alt="Your Notifications"
                                width="20px"
                                height="20px"
                              />
                            </span>
                          </ArrowTooltips>
                        ) : (
                          <ArrowTooltips title="Notifications" placement="top">
                            <span className="position-relative">
                              <Image
                                src="/assets/icons/new/full_notification.svg"
                                className="img-fluid"
                                alt="Your Notifications full icon"
                                width="20px"
                                height="20px"
                              />
                            </span>
                          </ArrowTooltips>
                        )}
                        <badge
                          className="rounded-circle position-absolute medium px-1 whitecolor"
                          style={{
                            left: '9px',
                            bottom: '9px',
                            backgroundColor: COLORS.orange,
                          }}
                        >
                          {notificationCount > 0 && <span className="whitecolor">{notificationCount}+</span>}
                        </badge>
                      </a>
                    </Tooltip> */}
                  </div>
                </Nav.Item>

                <NavDropdown
                  title={
                    <>
                      <span className="text-white d-lg-inline d-none">
                        Hi, {`${firstName.length > 8 ? firstName.slice(0, 8) + '...' : firstName}`}! 👋{' '}
                      </span>
                      <ArrowTooltips title="LogOut" placement="bottom">
                        <span className="d-flex">
                          <Image
                            src="/assets/icons/new/whitedropdownarrow.svg"
                            width="7px"
                            height="6px"
                            alt="dropdown icon"
                          />
                        </span>
                      </ArrowTooltips>
                    </>
                  }
                  id="basic-nav-dropdown headerUserName"
                  className="extrabold text-white ms-1 d-inline-flex text-capitalize p-0"
                >
                  <NavDropdown.Item
                    className="px-0 m-0 py-0 dropdown-item"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid gray',
                      shadow: '2px 0px 0px 3px 0px rgba(0,0,0,0.75)',
                      borderRadius: '10px',
                    }}
                  >
                    <div
                      // className="ps-3 py-2 dropdown-text regular-small"
                      className="ps-3 py-2 logout-dropdown regular-small"
                      onClick={() => {
                        handleLogoutWeb();
                      }}
                    >
                      Logout
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item
                  href="#"
                  className="d-inline-flex"
                  onClick={() => {
                    router.push({
                      pathname: '/combine/UserProfile',
                      query: { user: id },
                    });
                  }}
                >
                  {image == null ? (
                    <Image
                      src={`/assets/icons/new/user_profile.svg`}
                      style={{
                        borderRadius: '9px',
                      }}
                      // onClick={(e)=>{localStorage.setItem("@sidebarCurrentTab", JSON.stringify("kh"))}}
                      width="32px"
                      height="32px"
                      className="img-fluid border-white"
                      alt="Picture of the author"
                    />
                  ) : (
                    <Image
                      src={image ? `${awsLink}users/profileImages/${image}` : '/assets/icons/new/user_profile.svg'}
                      style={{
                        borderRadius: '9px',
                      }}
                      // onClick={(e)=>{localStorage.setItem("@sidebarCurrentTab", JSON.stringify("kh"))}}
                      width="32px"
                      height="32px"
                      className="img-fluid border-white"
                      alt="Picture of the author"
                    />
                  )}
                </Nav.Item>
              </span>
            </Nav>
          </div>
        </div>
      </Navbar>
      {router.pathname === '/combine/GlobalSearch' ? (
        <div
          className="mx-3 justify-content-center mb-3 d-flex bg-white d-lg-none"
          ref={ref}
          style={{
            // width: "900px",
            // cursor: "not-allowed",
            borderRadius: '10px',
            // border: "1px solid grey",
            backgroundColor: '#e5e5e5',
            height: '45px',
            marginRight: '10px',
            marginLeft: '0px',
          }}
        >
          <div className="col-2 d-inline-flex ms-sm-0 ms-3 justify-content-center align-items-center p-0">
            <Image src="/assets/icons/new/search.svg" width="12px" height="12px" alt="search" className="p-0" />
          </div>
          <input
            style={{
              border: 'none',
              // background: '#e5e5e5',
            }}
            type="text"
            placeholder="Global Search"
            value={inputValue}
            name="title"
            // disabled={router.pathname === '/' ? false : true}
            className={'col-7 p-0 d-inline-flex align-items-center h-100'}
            onChange={(e) => handleGlobalSearchInputChange(e, '', '')}
          ></input>
          <div className="col-3 d-flex justify-content-end align-items-center me-5">
            <Image
              src="/assets/icons/new/search_cross.svg"
              onClick={(e) => {
                handleClearInputValue();
              }}
              width="12px"
              height="12px"
              alt="cross"
            />
            <hr style={{ transform: 'rotate(90deg)', width: '35px' }} />
            <NavDropdown
              title={
                <GenericTooltip
                  placement="top"
                  title="Filter"
                  component={<Image src="/assets/icons/select.png" width="12px" height="12px" alt="select" />}
                />
              }
              id="basic-nav-dropdown border-0"
              className="extrabold text-capitalize notificationfilterdropdown d-flex align-items-center justify-content-center"
            >
              <NavDropdown.Item
                className="px-0 pb-2 pt-3 border-0 m-0 dropdown-item"
                style={{
                  backgroundColor: COLORS.mainColor,
                  borderRadius: '10px 10px 0px 0px',
                }}
              >
                <div
                  onClick={() => {
                    setGlobalSearchInputType('text');
                    setKeyword('name');
                    dispatch(globalSearchApplyFilter(inputValue, false, 0));
                  }}
                  // onClick={()=>{setType("text")}}
                  className="ps-3 d-flex align-items-center"
                >
                  <Image src="/assets/icons/new/white_outlined_user.svg" width="15px" height="16px" alt="user" />{' '}
                  <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center"> Name </span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item
                className="px-0 pt-2 pb-3 border-0 m-0 dropdown-item"
                style={{
                  backgroundColor: COLORS.mainColor,
                  borderRadius: '0px 0px 10px 10px',
                }}
              >
                <div
                  // onClick={()=>{setType("date")}}
                  onClick={(e) => {
                    setGlobalSearchInputType('date');
                    setSidebarOpen('true');
                    setKeyword('date');
                  }}
                  className="ps-3 d-flex align-items-center"
                >
                  <Image src="/assets/icons/new/date-outline-badged.svg" width="16px" height="16px" alt="date" />{' '}
                  <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center"> Date </span>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      ) : (
        router.pathname === '/' && (
          <div
            className="mx-3 justify-content-center mb-3 d-flex  d-lg-none"
            ref={ref}
            style={{
              // width: "900px",
              // cursor: "not-allowed",
              borderRadius: '10px',
              // border: "1px solid grey",
              backgroundColor: router.pathname === '/' || router.asPath === '/' ? 'white' : '#e5e5e5',
              height: '45px',
              marginRight: '10px',
              marginLeft: '0px',
            }}
          >
            <div className="col-2 d-inline-flex ms-sm-0 ms-3 justify-content-center align-items-center p-0">
              <Image src="/assets/icons/new/search.svg" width="12px" height="12px" alt="search" className="p-0" />
            </div>
            {type == 'name' ? (
              <input
                style={{
                  border: 'none',
                }}
                type={'text'}
                placeholder="Search Briifs"
                name="title"
                value={title}
                className="regular-xsmall w-100"
                onChange={searchitem}
                autoFocus
              />
            ) : (
              <div className="d-flex align-items-center">
                <input
                  style={{
                    border: 'none',
                    marginTop: hideShowCal ? '7px' : '0px',
                  }}
                  type={'text'}
                  onClick={() => {
                    setInputClick('date1');
                    calenderShowHandler();
                    setFromDate(new Date());
                  }}
                  value={fromDate == '' ? 'Start Date' : moment(fromDate).format('YYYY-MM-DD')}
                  placeholder="Start date"
                  className="regular-xsmall w-100"
                />
                <input
                  style={{
                    border: 'none',
                    marginTop: hideShowCal ? '7px' : '0px',
                  }}
                  onClick={() => {
                    setInputClick('date2');
                    calenderShowHandler();
                    setToDate(new Date());
                  }}
                  value={toDate == '' ? 'End Date' : moment(toDate).format('YYYY-MM-DD')}
                  type={'text'}
                  placeholder="End date"
                  className="regular-xsmall w-100"
                />
                <div
                  style={{
                    border: 'none',
                    marginTop: hideShowCal ? '7px' : '0px',
                    opacity: '0.5',
                  }}
                  onClick={() => fetchBriffBYDate()}
                >
                  <Image src="/assets/icons/submitDate.svg" width="45px" height="45px" />
                </div>
              </div>
            )}
            <div
              className="col-lg-2 p-0 d-flex align-items-center justify-content-end pe-3 "
              style={{ marginTop: hideShowCal ? '7px' : '0px' }}
            >
              <div className="bg-white d-flex align-self-center">
                <NavDropdown
                  title={
                    <GenericTooltip
                      placement="top"
                      title="Filter"
                      component={<Image src="/assets/icons/select.png" width="13px" height="13px" alt="select" />}
                    />
                  }
                  id="basic-nav-dropdown border-0"
                  className="extrabold text-capitalize notificationfilterdropdown d-flex align-items-center justify-content-center"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      setType('name');
                    }}
                    className="px-0 pb-2 pt-3 border-0 m-0 dropdown-item"
                    style={{
                      backgroundColor: COLORS.mainColor,
                      borderRadius: '10px 10px 0px 0px',
                    }}
                  >
                    <div className="ps-3 d-flex align-items-center">
                      <Image src="/assets/icons/new/white_outlined_user.svg" width="15px" height="16px" alt="user" />
                      <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center">Name</span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="px-0 pt-2 pb-3 border-0 m-0 dropdown-item"
                    onClick={() => {
                      setType('date');
                    }}
                    style={{
                      backgroundColor: COLORS.mainColor,
                      borderRadius: '0px 0px 10px 10px',
                    }}
                  >
                    <div className="ps-3 d-flex align-items-center">
                      <Image src="/assets/icons/new/date-outline-badged.svg" width="16px" height="16px" alt="date" />
                      <span className="dropdown-text medium-large text-white ms-2 d-flex align-items-center">Date</span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>

            {type == 'date' && (
              <Box ref={clickOutside} mb={3} style={{ zIndex: 20000, marginTop: '10px' }}>
                {inputClick == 'date1' && (
                  <Calendar
                    onChange={inputClick == 'date1' && setFromDate}
                    value={fromDate}
                    prev2Label={null}
                    next2Label={null}
                    nextLabel={
                      <Image src="/assets/icons/new/next_main_color.svg" width="15px" height="15px" alt="back" />
                    }
                    prevLabel={
                      <Image src="/assets/icons/new/previous_main_color.svg" width="15px" height="15px" alt="back" />
                    }
                    className={`text-light filter-calender mt-3 p-3`}
                  />
                )}
                {inputClick == 'date2' && (
                  <Calendar
                    onChange={inputClick == 'date2' && setToDate}
                    value={toDate}
                    prev2Label={null}
                    next2Label={null}
                    nextLabel={
                      <Image src="/assets/icons/new/next_main_color.svg" width="15px" height="15px" alt="down" />
                    }
                    prevLabel={
                      <Image src="/assets/icons/new/previous_main_color.svg" width="15px" height="15px" alt="back" />
                    }
                    className="text-light filter-calender mt-3 p-2"
                  />
                )}
              </Box>
            )}
          </div>
          // ''
        )
      )}
    </>
  );
};

export default Header;
