import React, { useState, useEffect } from 'react';
// Components imports.
import Header from '../../components/layout/Header';
import Content from '../../components/ch/chmainpage/Content';
import Sidebar from '../../components/layout/Sidebar';
import receivedBriifs, { countNumbers } from '../../redux/actions/ReceivedBriifs';
import sendBriifs from '../../redux/actions/SendBriifs';
import archivedBriifs, { draftBriifs } from '../../redux/actions/ArchivedBriifs';
import playedBriif from '../../redux/actions/PlayedBriif';
import deleteReceivedBriif from '../../redux/actions/DeleteReceived';
import deleteSendBriif, { deleteDraftBriif } from '../../redux/actions/DeleteSend';
import readBriif from '../../redux/actions/ReadBriif';
import unReadBriif from '../../redux/actions/UnReadBriif';
import unArchived from '../../redux/actions/UnArchived';
import archived from '../../redux/actions/Archived';
import interactionData from '../../redux/actions/Interaction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/router';
// custom success modal.
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
// import for received briifs socket.
import io from 'socket.io-client';
import COLORS from '../../public/assets/colors/colors';
import Image from 'next/image';
import { URL } from '../../public/assets/path/path';
import BriifActivityBar from '../../components/ch/chmainpage/tooltip/BriifActivityBar';
import { Box, Modal, Typography } from '@mui/material';
import Link from 'next/link';
import playBriifFunction from '../../redux/actions/PlayBriifFunction';
import DotProgress from '../../components/DotProgress';
import Layout from '../../components/layout/Layout';
import useSocket from '../../hooks/useSocket';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const Main = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const socket = useSocket();
  // platform data state.
  const [id, setId] = useState('');
  // global search page state.
  const [globalSearchPage, setGlobalSearchPage] = useState(false);
  // get the data about which tab is open or clicked to open (receive, send, archive).
  const { data } = useSelector((state) => state.sidebar);

  const [socketReceivedBriifs, setSocketReceivedBriifs] = useState(null);

  // sidebar receive, send, archive icons state.
  const [receivedActiveIcon, setReceivedActiveIcon] = useState(false);
  const [sendActiveIcon, setSendActiveIcon] = useState(false);
  const [archivedActiveIcon, setArchivedActiveIcon] = useState(false);

  // detailed briif states (ch main page middle part).
  const [briifAction, setBriifAction] = useState('');
  const [playBriifId, setPlayBriifId] = useState('');
  const [playBriifAId, setPlayBriifAId] = useState('');
  const [playBriifCount, setPlayBriifCount] = useState('');
  const [playBriifTitle, setPlayBriifTitle] = useState('');

  //firstIds of receive, send and archived briifs
  const [receiveFirstBriif, setReceiveFirstBriif] = useState({});
  const [sendFirstBriif, setSendFirstBriif] = useState({});
  const [archivedFirstBriif, setArchivedFirstBriif] = useState({});

  // briifs states.
  const [briifId, setBriifId] = useState('');
  const [briifAId, setBriifAId] = useState('');
  const [briifCount, setBriifCount] = useState('');
  const [isRead, setIsRead] = useState('0');
  const [getPlatData, setGetPlatData] = useState({});

  const [contentType, setContentType] = useState('');
  const [handleAlertClose, setHandleAlertClose] = useState(false);
  // handles page loader
  const [loading, setLoading] = useState(false);

  // local search states
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState();
  const [searchSendData, setSearchSendData] = useState();
  const [searchArchiveData, setSearchArchiveData] = useState();
  const [searchDraftData, setSearchDraftData] = useState([]);

  // skeleton loading states.
  const [activeBarLoading, setActiveBarLoading] = useState(true);
  const [briifDetailsLoading, setBriifDetailsLoading] = useState(true);
  const [interactionsLoading, setInteractionsLoading] = useState(true);

  // APIs initial states.
  const [playedBriifData, setPlayedBriifData] = useState({
    status: '',
    briff: [],
    recipent: [],
    groups: [],
    message: '',
  });

  const [receivedBriifsData, setReceivedBriifsData] = useState({
    status: '',
    message: '',
    pin: [],
    recive: [],
  });

  const [archivedBriifsData, setArchivedBriifsData] = useState({
    status: '',
    message: '',
    archive: [],
  });

  const [sendBriifsData, setSendBriifsData] = useState({
    status: '',
    message: '',
    pin: [],
    recive: [],
  });

  const [draftBriifsData, setDraftBriifsData] = useState({
    status: '',
    message: '',
    briffs: [],
  });

  const [ForwardBriifData, setForwardBriifData] = useState({
    status: '',
    users: [],
  });

  const [interactionsData, setInteractionsData] = useState({
    status: '',
    interactions: [],
    message: [],
  });

  const { playBriifFunction } = useSelector((state) => state.play_briif_function);
  const [successErrorMessage, setSuccessErrorMessage] = useState('');
  // success error modal
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);
  const handleOpendModalPublish = ({ heading, message, buttonText, image, move }) => {
    setSuccessErrorMessage({ heading, message, buttonText, image, move });
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  const socketReceivedBriffsHandler = (msg) => {
    if (msg) {
      setReceivedBriifsData((prevState) => {
        const updatedRecive = [...prevState.recive]; // Create a copy of the recive array
        updatedRecive.unshift(msg); // Add the message object at index 0
        return { ...prevState, recive: updatedRecive }; // Update the state with the modified recive array
      });
      setSocketReceivedBriifs((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    socket?.on('socketReceivedBriffs' + id, socketReceivedBriffsHandler);

    return () => {
      socket?.off('socketReceivedBriffs' + id, socketReceivedBriffsHandler);
    };
  }, [socket]);

  // close modal after 2 sec
  useEffect(() => {
    const modaleColse = setTimeout(() => {
      setModalShowErrorSuccess(false);
    }, 2000);
    return () => clearTimeout(modaleColse);
  }, [modalShowErrorSuccess]);

  // get recived Briif
  const getSocketsReceivedBriif = async () => {
    const { access_token, id } = JSON.parse(localStorage.getItem('@LoginData')) || '';
    // let socket = io(URL.khbaseUrl, {
    //   extraHeaders: {
    //     Authorization: 'Bearer ' + access_token,
    //   },
    // });
    // socket?.on('socketReceivedBriffs' + id, (msg) => {
    //   if (msg) {
    //     setReceivedBriifsData((prevState) => {
    //       const updatedRecive = [...prevState.recive]; // Create a copy of the recive array
    //       updatedRecive.unshift(msg); // Add the message object at index 0
    //       return { ...prevState, recive: updatedRecive }; // Update the state with the modified recive array
    //     });
    //     setSocketReceivedBriifs((prevState) => prevState + 1);
    //   }
    // });
    // () => {
    //   socket?.on('socketReceivedBriffs' + id);
    // };
  };

  useEffect(() => {
    // getSocketsReceivedBriif();
    setActiveBarLoading(true);
    setBriifDetailsLoading(true);
    setInteractionsLoading(true);
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    handleResize();
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      // tooltip, detail briif, interaction loading start.
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        const params = `user_id=${id}&platform_id=${GetPlatData.platform_id}`;
        dispatch(countNumbers(params));
        setGetPlatData(getPlatObject);
        if (data == 'receive') {
          const params = `user_id=${id}&platform_id=${GetPlatData.platform_id}`;
          // get the data of received, send and archived briifs from redux.
          dispatch(receivedBriifs(params, onReceivedBriifsSuccess, onReceivedBriifsError));
        } else if (data == 'sent') {
          const params = `user_id=${id}&platform_id=${GetPlatData.platform_id}`;
          dispatch(sendBriifs(params, onSendBriifsSuccess, onSendBriifsError));
        } else if (data == 'archived') {
          const params = `user_id=${id}&platform_id=${GetPlatData.platform_id}`;
          dispatch(archivedBriifs(params, onArchivedBriifsSuccess, onArchivedBriifsError));
        } else if (data == 'draft') {
          const paramsD = `platform_id=${GetPlatData.platform_id}&user_id=${id}`;
          dispatch(draftBriifs(paramsD, onDraftBriifsSuccess, onDraftBriifsError));
        }
      }
    }
  }, [data]);

  // this function gets all the received briifs.
  // Handle received briifs based on the specified operation
  const handleReceivedBriifs = (operation) => {
    // Check if the operation requires updating the active icons
    if (
      ![
        'pinned',
        'unpinned',
        'receivedDelete',
        'sendDelete',
        'read',
        'unread',
        'forwardUsers',
        'forwardGroups',
        'archive',
        'unarchive',
      ].includes(operation)
    ) {
      // Update the active icons accordingly
      setReceivedActiveIcon(!receivedActiveIcon);
      setSendActiveIcon(false);
      setArchivedActiveIcon(false);
    }
    // Prepare the parameters for the API request
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}`;
    // Dispatch the receivedBriifs action with the appropriate parameters and callbacks
    dispatch(receivedBriifs(params, onReceivedBriifsSuccess, onReceivedBriifsError, operation));
  };

  // if the receive briif API returns true below function will render.
  const onReceivedBriifsSuccess = (res, operation) => {
    // Set received briifs data
    setReceivedBriifsData(res.data, operation);
    if (res.data.status == 'true') {
      // Check if the operation is not one of the specified cases
      if (
        ![
          'pinned',
          'unpinned',
          'receivedDelete',
          'sendDelete',
          'read',
          'unread',
          'forwardUsers',
          'forwardGroups',
          'archive',
          'unarchive',
        ].includes(operation)
      ) {
        // After the page renders, check if there are any briifs in the receive briifs.
        // If there is a briif, play it.
        if (!res.data.recive.length && !res.data.pin.length) {
          handlePlayedBriif(undefined);
          // No briifs in receive briifs or pin, handlePlayedBriif without arguments
        } else {
          if (!res.data.recive.length) {
            handlePlayedBriif(res.data.pin[0].id, res.data.pin[0].a_id, res.data.pin[0].count);
          }
          // Play the first briif from receive briifs
          handlePlayedBriif(res.data.recive[0].id, res.data.recive[0].a_id, res.data.recive[0].count);
        }
      }
    } else {
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
      handlePlayedBriif(undefined);
    }
  };

  // if the receive briif API returns false below function will render.
  const onReceivedBriifsError = (err) => {
    setBriifDetailsLoading(false);
    setInteractionsLoading(false);
    setActiveBarLoading(false);
  };

  // this function gets all the archived briifs.
  const handleArchivedBriifs = (operation) => {
    if (
      operation == 'archive' ||
      operation == 'unarchive' ||
      operation == 'forwardUsers' ||
      operation == 'forwardGroups'
    ) {
    } else {
      setArchivedActiveIcon(!archivedActiveIcon);
      setReceivedActiveIcon(false);
      setSendActiveIcon(false);
    }
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}`;
    dispatch(archivedBriifs(params, onArchivedBriifsSuccess, onArchivedBriifsError, operation));
  };

  // if the archived briif API returns true below function will render.
  const onArchivedBriifsSuccess = (res, operation) => {
    // Set the archived briifs data
    setArchivedBriifsData(res.data);
    if (res.data.status == 'true') {
      // Set the first archived briif if the archive array is not empty
      if (res.data.archive.length !== 0) {
        setArchivedFirstBriif(res.data.archive[0]);
      }
      // Check if the current open tab in the sidebar is archived
      // Check if the operation is not related to archiving, unarchiving, forwarding users, or forwarding groups
      if (!['archive', 'unarchive', 'forwardUsers', 'forwardGroups'].includes(operation)) {
        // If the archive array is empty, call handlePlayedBriif with or without playBriifFunction
        // Otherwise, call handlePlayedBriif with arguments extracted from the first element of the archive array
        if (!res.data.archive.length) {
          handlePlayedBriif(undefined);
        } else {
          const { id, a_id, count } = res.data.archive[0];
          handlePlayedBriif(id, a_id, count);
        }
      }
    } else {
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
      handlePlayedBriif(undefined);
    }
    // Set active bar loading state to false
  };

  // if the archived briif API returns false below function will render.
  const onArchivedBriifsError = (err) => {
    setBriifDetailsLoading(false);
    setInteractionsLoading(false);
    setActiveBarLoading(false);
  };

  const handleDraftBriffs = (operation) => {
    const paramsD = `platform_id=${getPlatData.platform_id}&user_id=${id}`;
    dispatch(draftBriifs(paramsD, onDraftBriifsSuccess, onDraftBriifsError));
  };

  const onDraftBriifsSuccess = (res) => {
    setDraftBriifsData(res.data);
    // Check if the operation is not one of the specified cases
    if (res.data.status == 'true') {
      if (!res.data.briffs.length) {
        setBriifDetailsLoading(false);
        setInteractionsLoading(false);
        setActiveBarLoading(false);
      } else {
        // Play the first briif from receive briifs
        handlePlayedBriif(res.data.briffs[0].id);
      }
    } else {
      handlePlayedBriif(undefined);
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
    }
  };

  const onDraftBriifsError = (error) => {
    console.log('error', error);
    setBriifDetailsLoading(false);
    setInteractionsLoading(false);
    setActiveBarLoading(false);
  };

  const handleSendBriifs = (operation) => {
    if (
      // operation param to know which operation is to be performed and what conditions to apply accordingly.
      operation == 'pinned' ||
      operation == 'unpinned' ||
      operation == 'receivedDelete' ||
      operation == 'sendDelete' ||
      operation == 'forwardUsers' ||
      operation == 'forwardGroups' ||
      operation == 'archive' ||
      operation == 'unarchive'
    ) {
    } else {
      setSendActiveIcon(!sendActiveIcon);
      setReceivedActiveIcon(false);
      setArchivedActiveIcon(false);
    }
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}`;
    dispatch(sendBriifs(params, onSendBriifsSuccess, onSendBriifsError, operation));
  };
  const onSendBriifsSuccess = (res, operation) => {
    setSendBriifsData(res.data);
    console.log('resskksl send', res.data.recive.length);
    if (res.data.status == 'true') {
      if (res.data.recive.length !== 0) {
        setSendFirstBriif(res.data.recive[0]);
      }
      if (
        operation === 'pinned' ||
        operation === 'unpinned' ||
        operation === 'receivedDelete' ||
        operation === 'sendDelete' ||
        operation === 'forwardUsers' ||
        operation === 'forwardGroups' ||
        operation === 'archive' ||
        operation === 'unarchive'
      ) {
        // No action required for specific operations
      } else {
        if (res.data.recive.length === 0 && res.data.pin.length === 0) {
          handlePlayedBriif(playBriifFunction);
        } else if (res.data.recive.length === 0 && res.data.pin.length > 0) {
          handlePlayedBriif(playBriifFunction || res.data.pin[0].id, res.data.pin[0].a_id, res.data.pin[0].count);
        } else if (res.data.recive.length > 0) {
          handlePlayedBriif(
            playBriifFunction || res.data.recive[0].id,
            res.data.recive[0].a_id,
            res.data.recive[0].count,
          );
        }
      }
    } else {
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
      handlePlayedBriif(undefined);
    }
  };

  const onSendBriifsError = (err) => {
    // skeleton loading in tooltip false.
    setBriifDetailsLoading(false);
    setInteractionsLoading(false);
    setActiveBarLoading(false);
  };

  // this function is used to play a briif in the middle section of the main page.
  const handlePlayedBriif = (briifId, briifAId, briifCount, briifTitle) => {
    // setting skeleton loading to true where the specific briif is playing and interactions on that briif is rendering.
    setInteractionsLoading(true);
    setBriifDetailsLoading(true);
    if (!briifId) {
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setLoading(false);
      setPlayedBriifData({
        status: '',
        briff: [],
        recipent: [],
        groups: [],
        message: '',
      });
      setInteractionsData({
        status: '',
        interactions: [],
        message: [],
      });
      return;
    }
    //setting playing briif data.
    setPlayBriifId(briifId);
    setPlayBriifAId(briifAId);
    setPlayBriifCount(briifCount);
    setPlayBriifTitle(briifTitle);
    // getting login and platform data from the local storage.
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (LoginData) {
      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
        const id = LoginData.id;
        setId(id);
        const params = `platform_id=${getPlatObject.platform_id}&briff_id=${briifId}&user_id=${id}`;
        dispatch(playedBriif(params, onPlayedBriifSuccess, onPlayedBriifError));
        const parameters = `platform_id=${getPlatObject.platform_id}&briff_id=${briifId}&user_id=${id}`;
        dispatch(interactionData(parameters, onInteractionsSuccess, onInteractionsError));
      }
    }
  };
  const onPlayedBriifSuccess = (res) => {
    setPlayedBriifData(res.data);
    if (res.data.status == 'true') {
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
    } else {
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
    }
  };
  const onPlayedBriifError = (err) => {
    setBriifDetailsLoading(false);
    setInteractionsLoading(false);
    setActiveBarLoading(false);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };

  const onInteractionsSuccess = (res) => {
    if (res.data.status == 'true') {
      setInteractionsData(res.data);
      setBriifDetailsLoading(false);
      setInteractionsLoading(false);
      setActiveBarLoading(false);
    }
  };

  const onInteractionsError = (err) => {
    setInteractionsLoading(false);
    setActiveBarLoading(false);
    setActiveBarLoading(false);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };

  const handleDeleteReceivedBriif = (briifId, briifAId, actionFrom) => {
    // Construct params for the delete request
    setLoading(true);
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${briifId}]&a_id=[${briifAId}]`;
    // Dispatch the delete request
    dispatch(deleteReceivedBriif(params, onDeleteReceivedBriifSuccess, onDeleteReceivedBriifError, briifId));
    setActiveBarLoading(true);
  };

  const onDeleteReceivedBriifSuccess = (res, briifId) => {
    if (res.data.status === 'true') {
      if (receivedBriifsData.pin.length > 0 || receivedBriifsData.recive.length > 0) {
        // Filter out items with a matching 'id' from 'pin' and 'recive' arrays
        const updatedPin = receivedBriifsData.pin.filter((item) => item.id !== briifId);
        const updatedRecive = receivedBriifsData.recive.filter((item) => item.id !== briifId);
        // Check if the deleted briif matches 'playBriifAId'
        if (playBriifId == briifId) {
          setBriifDetailsLoading(true);
          setInteractionsLoading(true);
          // Call 'handlePlayedBriif' function with appropriate arguments
          if (updatedRecive.length > 0) {
            handlePlayedBriif(updatedRecive[0].id, updatedRecive[0].a_id, updatedRecive[0].count);
          } else {
            handlePlayedBriif(updatedPin[0].id, updatedPin[0].a_id, updatedPin[0].count);
          }
        }
        // Update the state of 'receivedBriifsData' with the modified arrays
        setReceivedBriifsData((prevState) => ({
          ...prevState,
          pin: updatedPin,
          recive: updatedRecive,
        }));
      }
      // Show success modal notification
      setActiveBarLoading(false);
      setLoading(false);
      handleOpendModalPublish({
        heading: 'Success',
        message: `The received briif has been deleted successfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
      // Disable the active bar loading state
    }
  };

  const onDeleteReceivedBriifError = (err) => {
    setActiveBarLoading(false);
    setInteractionsLoading(false);
    setBriifDetailsLoading(false);
    setLoading(false);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };

  const handleDeleteSendBriif = (briifId, briifAId, actionFrom) => {
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${briifId}]&a_id=[${briifAId}]`;
    dispatch(deleteSendBriif(params, onDeleteSendBriifSuccess, onDeleteSendBriifError, briifId));
    setActiveBarLoading(true);
    setLoading(true);
  };

  const onDeleteSendBriifSuccess = (res, briifId) => {
    if (res.data.status === 'true') {
      if (sendBriifsData.pin.length > 0 || sendBriifsData.recive.length > 0) {
        // Filter out items with a matching 'id' from 'pin' and 'recive' arrays
        const updatedPin = sendBriifsData.pin.filter((item) => item.id !== briifId);
        const updatedSend = sendBriifsData.recive.filter((item) => item.id !== briifId);
        // Check if the deleted briif matches 'playBriifAId'
        if (playBriifId == briifId) {
          setBriifDetailsLoading(true);
          setInteractionsLoading(true);
          // Call 'handlePlayedBriif' function with appropriate arguments
          if (updatedSend.length > 0) {
            handlePlayedBriif(updatedSend[0].id, updatedSend[0].a_id, updatedSend[0].count);
          } else {
            handlePlayedBriif(updatedPin[0].id, updatedPin[0].a_id, updatedPin[0].count);
          }
        }
        // Update the state of 'receivedBriifsData' with the modified arrays
        setSendBriifsData((prevState) => ({
          ...prevState,
          pin: updatedPin,
          recive: updatedSend,
        }));
      }
      // Show success modal notification

      handleOpendModalPublish({
        heading: 'Success',
        message: `The send briif has been deleted successfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
      // Disable the active bar loading state
      setActiveBarLoading(false);
      setLoading(false);
    }
  };

  const onDeleteSendBriifError = (err) => {
    setActiveBarLoading(false);
    setInteractionsLoading(false);
    setBriifDetailsLoading(false);
    setLoading(false);

    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };

  const handleUnArchivedBriif = (briifId, briifAId) => {
    const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    const params = `date=${date}&platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${briifId}]&a_id=[${briifAId}]`;
    dispatch(unArchived(params, onUnArchivedBriifSuccess, onUnArchivedBriifError, briifId));
    setActiveBarLoading(true);
    setLoading(true);
  };
  const onUnArchivedBriifSuccess = (res, briifId) => {
    if (res.data.status == 'true') {
      let updateArchivedBriff = archivedBriifsData.archive.filter((item) => item.id !== briifId);
      if (playBriifId == briifId) {
        setBriifDetailsLoading(true);
        setInteractionsLoading(true);
        // Call 'handlePlayedBriif' function with appropriate arguments
        if (updateArchivedBriff.length > 0) {
          handlePlayedBriif(updateArchivedBriff[0].id, updateArchivedBriff[0].a_id, updateArchivedBriff[0].count);
        }
      }
      setArchivedBriifsData((prevState) => ({
        ...prevState,
        archive: updateArchivedBriff,
      }));
      handleOpendModalPublish({
        heading: 'Success',
        message: `The briif has been unarchived successfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
      setActiveBarLoading(false);
      setLoading(false);
    }
  };

  const onUnArchivedBriifError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setActiveBarLoading(false);
    setInteractionsLoading(false);
    setBriifDetailsLoading(false);
    setLoading(false);
  };

  const handleArchivedBriif = (briifId, briifAId, briifCount, actionFrom) => {
    const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    setLoading(true);
    setActiveBarLoading(true);
    const params = `key=${data == 'receive' ? 'recive' : 'send'}&platform_id=${getPlatData.platform_id
      }&notification_time=${date}&user_id=${id}&id=[${briifId}]&a_id=[${briifAId}]&date=${date}&count=[${briifCount}]`;
    dispatch(archived(params, onArchivedBriifSuccess, onArchivedBriifError, briifId, actionFrom));
  };

  const onArchivedBriifSuccess = (res, briifId, actionFrom) => {
    if (res.data.status == 'true') {
      console.log('actionFrom', actionFrom);
      if (actionFrom == 'recive') {
        const updatedReceived = receivedBriifsData?.recive.filter((item) => item.id != briifId);
        const updatedPin = receivedBriifsData?.pin.filter((item) => item.id != briifId);
        if (playBriifId == briifId) {
          setInteractionsLoading(true);
          setBriifDetailsLoading(true);
          if (updatedReceived.length > 0) {
            handlePlayedBriif(updatedReceived[0].id, updatedReceived[0].a_id, updatedReceived[0].count);
          } else {
            handlePlayedBriif(updatedPin[0].id, updatedPin[0].a_id, updatedPin[0].count);
          }
        }
        setReceivedBriifsData((prevState) => ({
          ...prevState,
          pin: updatedPin,
          recive: updatedReceived,
        }));
      } else {
        const updatedSend = sendBriifsData?.recive.filter((item) => item?.id != briifId);
        const updatedPin = sendBriifsData?.pin.filter((item) => item?.id != briifId);
        if (playBriifId == briifId) {
          setInteractionsLoading(true);
          setBriifDetailsLoading(true);
          if (updatedSend.length > 0) {
            handlePlayedBriif(updatedSend[0].id, updatedSend[0].a_id, updatedSend[0].count);
          } else {
            handlePlayedBriif(updatedPin[0].id, updatedPin[0].a_id, updatedPin[0].count);
          }
        }
        setSendBriifsData((prevState) => ({
          ...prevState,
          pin: updatedPin,
          recive: updatedSend,
        }));
      }
      handleOpendModalPublish({
        heading: 'Success',
        message: `The briif has been archived successfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
      setLoading(false);
      setActiveBarLoading(false);
    }
  };

  const onArchivedBriifError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setActiveBarLoading(false);
    setInteractionsLoading(false);
    setBriifDetailsLoading(false);
    setLoading(false);
  };

  const handleUnReadBriif = (briifId, briifAId, isRead) => {
    setIsRead(isRead);
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${briifId}]&sender_id=[${briifAId}]`;
    dispatch(unReadBriif(params, onUnReadBriifSuccess, onUnReadBriifError, briifId));
  };

  const onUnReadBriifSuccess = (res, briifId) => {
    if (res.data.status === 'true') {
      const updatedSend = [...receivedBriifsData.recive];
      const updatedPin = [...receivedBriifsData.pin];
      const sendItem = updatedSend.find((item) => item.id === briifId);
      if (sendItem) {
        sendItem.is_read = '0';
      }
      const pinItem = updatedPin.find((item) => item.id === briifId);
      if (pinItem) {
        pinItem.is_read = '0';
      }
      setReceivedBriifsData((prevState) => ({
        ...prevState,
        pin: updatedPin,
        recive: updatedSend,
      }));
    }
  };

  const onUnReadBriifError = (err) => {
    console.log('onUnReadBriifError', err);
  };

  const handleReadBriif = (briifId, briifAId, isRead) => {
    setIsRead(isRead);
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${briifId}]&sender_id=[${briifAId}]`;
    dispatch(readBriif(params, onReadBriifSuccess, onReadBriifError, briifId));
  };
  const onReadBriifSuccess = (res, briifId) => {
    if (res.data.status === 'true') {
      const updatedSend = [...receivedBriifsData.recive];
      const updatedPin = [...receivedBriifsData.pin];
      const sendItem = updatedSend.find((item) => item.id === briifId);
      if (sendItem) {
        sendItem.is_read = '1';
      }
      const pinItem = updatedPin.find((item) => item.id === briifId);
      if (pinItem) {
        pinItem.is_read = '1';
      }
      setReceivedBriifsData((prevState) => ({
        ...prevState,
        pin: updatedPin,
        recive: updatedSend,
      }));
    }
  };

  const onReadBriifError = (err) => {
    console.log('onReadBriifError', err);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlemobileclose = () => setOpen(true);
  const handleResize = () => {
    if (window.innerWidth <= 800) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  const handleDeleteDraftBriff = (briifId, briifAId) => {
    setLoading(true);
    setActiveBarLoading(true);
    const params = `platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${briifId}]&a_id=[${briifAId}]`;
    dispatch(deleteDraftBriif(params, onDeleteDraftBriifSuccess, onDeleteDraftBriifError, briifId));
  };

  const onDeleteDraftBriifSuccess = (res, briifId) => {
    if (res.data.status == 'true') {
      let updateDraftBriif = draftBriifsData.briffs.filter((item) => item.id !== briifId);
      if (playBriifId == briifId) {
        setInteractionsLoading(true);
        setBriifDetailsLoading(true);
        handlePlayedBriif(updateDraftBriif[0].id, updateDraftBriif[0].a_id, updateDraftBriif[0].count);
      }
      setDraftBriifsData((prevState) => ({
        ...prevState,
        briffs: updateDraftBriif,
      }));
      handleOpendModalPublish({
        heading: 'Success',
        message: `The briif has been archived successfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
      setLoading(false);
      setActiveBarLoading(false);
    }
  };

  const onDeleteDraftBriifError = (error) => {
    console.log('Delete Draft Briif error', error);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: ` Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setLoading(false);
    setInteractionsLoading(false);
    setBriifDetailsLoading(false);
  };

  const homeprops = router.pathname;

  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);

  return (
    <>
      <div>
        {/* modal will be shown on every page reload on first time */}
        <Modal
          open={open}
          onClose={handlemobileclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Get the App
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Download Giisty App on smartphone for better experience
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
              <Box sx={{ height: '60px', width: '250px' }}>
                <Link href="https://play.google.com/store/apps/details?id=com.tuitify&hl=en_US&gl=US">
                  <Image src="/assets/images/Google_Play.svg" height={70} width={250} alt="" />
                </Link>
              </Box>
              <Box sx={{ height: '60px', width: '250px' }}>
                <Link href="https://apps.apple.com/in/app/giisty/id1550116149">
                  <Image src="/assets/images/appstore.svg" height={70} width={230} alt="" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
      {homeprops == '/home/Home' && (
        <BriifActivityBar
          setInteractionsData={setInteractionsData}
          interactionsData={interactionsData}
          handlePlayedBriif={handlePlayedBriif}
          playedBriifData={playedBriifData}
          setForwardBriifData={setForwardBriifData}
          ForwardBriifData={ForwardBriifData}
          // handleForwardBriif={handleForwardBriif}
          handleDeleteReceivedBriif={handleDeleteReceivedBriif}
          handleDeleteSendBriif={handleDeleteSendBriif}
          handleUnArchivedBriif={handleUnArchivedBriif}
          handleDraftBriffs={handleDraftBriffs}
          handleArchivedBriif={handleArchivedBriif}
          handleUnReadBriif={handleUnReadBriif}
          handleReadBriif={handleReadBriif}
          handleReceivedBriifs={handleReceivedBriifs}
          handleArchivedBriifs={handleArchivedBriifs}
          handleSendBriifs={handleSendBriifs}
          sendBriifsData={sendBriifsData}
          receivedBriifsData={receivedBriifsData}
          archivedBriifsData={archivedBriifsData}
          draftBriifsData={draftBriifsData}
          receivedActiveIcon={receivedActiveIcon}
          setDraftBriifsData={setDraftBriifsData}
          setReceivedActiveIcon={setReceivedActiveIcon}
          sendActiveIcon={sendActiveIcon}
          setSendActiveIcon={setSendActiveIcon}
          archivedActiveIcon={archivedActiveIcon}
          setArchivedActiveIcon={setArchivedActiveIcon}
          setHandleAlertClose={setHandleAlertClose}
          briifAction={briifAction}
          playBriifId={playBriifId}
          playBriifAId={playBriifAId}
          playBriifCount={playBriifCount}
          playBriifTitle={playBriifTitle}
          briifId={briifId}
          briifAId={briifAId}
          briifCount={briifCount}
          setBriifId={setBriifId}
          setBriifAId={setBriifAId}
          setBriifCount={setBriifCount}
          setBriifAction={setBriifAction}
          setIsRead={setIsRead}
          isRead={isRead}
          // search
          searchValue={search}
          searchData={searchData}
          setSearchSendData={searchSendData}
          setSearchArchiveData={searchArchiveData}
          //loading
          setActiveBarLoading={setActiveBarLoading}
          activeBarLoading={activeBarLoading}
          setBriifDetailsLoading={setBriifDetailsLoading}
          briifDetailsLoading={briifDetailsLoading}
          setInteractionsLoading={setInteractionsLoading}
          interactionsLoading={interactionsLoading}
        />
      )}
      {homeprops == '/' && (
        <>
          {modalShowErrorSuccess == true && (
            <SuccessModal
              modalOpen={modalShowErrorSuccess}
              handleModalClose={handleCloseModalPublish}
              image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
              title={successErrorMessage.heading}
              description={successErrorMessage.message}
              button1={successErrorMessage.buttonText}
              setDotProgressLoading={loading}
              giistPublishMove={successErrorMessage.move}
            />
          )}
          <div id="wrapper" style={{ height: '100%', overflow: 'hidden' }}>
            {loading == true && <DotProgress />}
            <>
              <Layout
                Home={true}
                setSidebarMenuOpen={setSidebarMenuOpen}
                sidebarMenuOpen={sidebarMenuOpen}
                heading="Communication Hub"
                setSearch={setSearch}
                setReceivedBriifsData={setReceivedBriifsData}
                setSendBriifsData={setSendBriifsData}
                setArchivedBriifsData={setArchivedBriifsData}
                setGlobalSearchPage={setGlobalSearchPage}
                globalSearchPage={globalSearchPage}
                setDraftBriifsData={setDraftBriifsData}
                //open briif
                handlePlayedBriif={handlePlayedBriif}
                receivedBriifsData={receivedBriifsData}
                showBriffIcon={true}
              >
                {globalSearchPage == true ? (
                  <></>
                ) : (
                  <Content
                    setInteractionsData={setInteractionsData}
                    interactionsData={interactionsData}
                    handlePlayedBriif={handlePlayedBriif}
                    playedBriifData={playedBriifData}
                    setForwardBriifData={setForwardBriifData}
                    ForwardBriifData={ForwardBriifData}
                    handleDeleteReceivedBriif={handleDeleteReceivedBriif}
                    handleDeleteSendBriif={handleDeleteSendBriif}
                    handleUnArchivedBriif={handleUnArchivedBriif}
                    handleArchivedBriif={handleArchivedBriif}
                    handleUnReadBriif={handleUnReadBriif}
                    handleReadBriif={handleReadBriif}
                    handleReceivedBriifs={handleReceivedBriifs}
                    handleArchivedBriifs={handleArchivedBriifs}
                    handleSendBriifs={handleSendBriifs}
                    sendBriifsData={sendBriifsData}
                    receivedBriifsData={receivedBriifsData}
                    archivedBriifsData={archivedBriifsData}
                    receivedActiveIcon={receivedActiveIcon}
                    setReceivedActiveIcon={setReceivedActiveIcon}
                    sendActiveIcon={sendActiveIcon}
                    setSendActiveIcon={setSendActiveIcon}
                    archivedActiveIcon={archivedActiveIcon}
                    setArchivedActiveIcon={setArchivedActiveIcon}
                    setHandleAlertClose={setHandleAlertClose}
                    briifAction={briifAction}
                    playBriifId={playBriifId}
                    playBriifAId={playBriifAId}
                    playBriifCount={playBriifCount}
                    playBriifTitle={playBriifTitle}
                    briifId={briifId}
                    briifAId={briifAId}
                    briifCount={briifCount}
                    setBriifId={setBriifId}
                    setBriifAId={setBriifAId}
                    setBriifCount={setBriifCount}
                    setBriifAction={setBriifAction}
                    setIsRead={setIsRead}
                    isRead={isRead}
                    // search
                    searchValue={search}
                    searchData={searchData}
                    setSearchSendData={searchSendData}
                    setSearchArchiveData={searchArchiveData}
                    //loading
                    setActiveBarLoading={setActiveBarLoading}
                    activeBarLoading={activeBarLoading}
                    setBriifDetailsLoading={setBriifDetailsLoading}
                    briifDetailsLoading={briifDetailsLoading}
                    setInteractionsLoading={setInteractionsLoading}
                    interactionsLoading={interactionsLoading}
                    setLoading={setLoading}
                    setDraftBriifsData={setDraftBriifsData}
                    draftBriifsData={draftBriifsData}
                    handleDraftBriffs={handleDraftBriffs}
                    handleDeleteDraftBriff={handleDeleteDraftBriff}
                    searchDraftData={searchDraftData}
                    setSearchDraftData={setSearchDraftData}
                  />
                )}
              </Layout>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default Main;
