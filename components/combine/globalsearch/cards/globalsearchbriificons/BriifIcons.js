import React, { useEffect, useState } from 'react';
import readBriif from '../../../../../redux/actions/ReadBriif';
import unReadBriif from '../../../../../redux/actions/UnReadBriif';
import unArchived from '../../../../../redux/actions/UnArchived';
import archived from '../../../../../redux/actions/Archived';
import forwardBriif from '../../../../../redux/actions/Forward';
import pinnedBriif from '../../../../../redux/actions/PinnedBriif';
import unPinnedBriif from '../../../../../redux/actions/UnPinnedBriif';
import SuccessModal from '../../../../modals/simplemodal/SuccessModal';
import ForwardModal from './../../../../modals/forwardmodal/ForwardModal';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Image from 'next/image';
import GenericTooltip from '../../../../ch/GenericTooltip';

const BriifIcons = (props) => {
  const dispatch = useDispatch();

  const [getPlatData, setGetPlatData] = useState({});

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [button, setButton] = useState('');

  const [isRead, setIsRead] = useState(props.is_read);
  const [isArchived, setIsArchived] = useState(props.briff_status);
  const [isPinned, setIsPinned] = useState(props.briff_status);

  const [forwardBriifModal, setForwardBriifModal] = useState(false);

  const [loginAccessToken, setLoginAccessToken] = useState('');

  const handleForwardBriifModalClose = () => setForwardBriifModal(false);

  const [PinnedBriifData, setPinnedBriifData] = useState({
    status: '',
    message: '',
  });

  const [UnPinnedBriifData, setUnPinnedBriifData] = useState({
    status: '',
    message: '',
  });
  const [ReadBriifData, setReadBriifData] = useState({
    status: '',
    message: '',
  });

  const [UnReadBriifData, setUnReadBriifData] = useState({
    status: '',
    message: '',
  });

  const [UnArchivedBriifData, setUnArchivedBriifData] = useState({
    status: '',
    message: '',
  });

  const [ArchivedBriifData, setArchivedBriifData] = useState({
    status: '',
    message: '',
  });

  const [ForwardBriifData, setForwardBriifData] = useState({
    status: '',
    users: [],
  });

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);
      setLoginAccessToken(LoginData.access_token);
    }
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
  }, []);

  const handleForwardBriifModalOpen = () => {
    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&id=${platformId}&user_id=${id}`;
    dispatch(forwardBriif(params, loginAccessToken, onForwardBriifSuccess));
  };
  const onForwardBriifSuccess = (res) => {
    setForwardBriifData(res.data);
  };

  const handlePinnedBriif = () => {
    const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    let status = '';
    if (props.briff_status == 'pin_recive' || props.briff_status == 'recive') {
      status = 'recive';
    }
    if (props.briff_status == 'pin_send' || props.briff_status == 'send') {
      status = 'send';
    }
    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&id=[${props.id}]&a_id=[${props.a_id}]&user_id=${id}&status=${status}&date=${date}`;
    dispatch(pinnedBriif(params, onPinnedBriifSuccess, onPinnedBriifError));
  };

  const onPinnedBriifSuccess = (res) => {
    setPinnedBriifData(res.data);
    if (res.data.status == 'true') {
      setModalOpen(true);
      setTitle('Success');
      setDescription('The briif has been pinned successfully.');
      setImage(<Image src="/assets/icons/new/tick-circle.svg" className="" width="65px" height="100%" alt="tick" />);
      setButton('continue');
    }
  };
  const onPinnedBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="100%" alt="alert" />);
    setButton('Try again');
  };

  const handleUnPinnedBriif = () => {
    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&id=[${props.id}]&a_id=[${props.a_id}]&user_id=${id}`;
    dispatch(unPinnedBriif(params, onUnPinnedBriifSuccess, onUnPinnedBriifError));
  };
  const onUnPinnedBriifSuccess = (res) => {
    setUnPinnedBriifData(res.data);
    if (res.data.status == 'true') {
      setModalOpen(true);
      setTitle('Success');
      setDescription('The briif has been unpinned successfully.');
      setImage(<Image src="/assets/icons/new/tick-circle.svg" className="" width="65px" height="100%" alt="tick" />);
      setButton('continue');
    }
  };

  const onUnPinnedBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="100%" alt="alert" />);
    setButton('Try again');
  };

  const handleUnArchivedBriif = () => {
    const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');

    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${props.id}]&a_id=[${props.a_id}]&date=${date}`;
    dispatch(unArchived(params, onUnArchivedBriifSuccess, onUnArchivedBriifError));
  };
  // console.log(params);
  const onUnArchivedBriifSuccess = (res) => {
    setUnArchivedBriifData(res.data);
    if (res.data.status == 'true') {
      setModalOpen(true);
      setTitle('Success');
      setDescription('The briif has been unarchived successfully.');
      setImage(<Image src="/assets/icons/new/tick-circle.svg" className="" width="65px" height="100%" alt="tick" />);
      setButton('continue');
    }
  };

  const onUnArchivedBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="100%" alt="alert" />);
    setButton('Try again');
  };

  const handleArchivedBriif = () => {
    const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    let count = '';
    if (props.briff_status == 'pin_recive' || props.briff_status == 'recive' || props.briff_status == 'archived') {
      count = '0';
    }
    if (props.briff_status == 'pin_send' || props.briff_status == 'send') {
      count = props.count;
    }
    const notidata = new Date().toISOString().slice(0, 19).replace('');
    const params = `name=${getPlatData.name}&key=${
      props.briff_status == 'pin_send' || props.briff_status == 'send' ? 'send' : 'recive'
    }&notification_time=${date}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${
      props.id
    }]&a_id=[${props.a_id}]&date=${date}&count=[${count}]`;
    console.log(params);
    dispatch(archived(params, onArchivedBriifSuccess, onArchivedBriifError));
  };
  const onArchivedBriifSuccess = (res) => {
    setArchivedBriifData(res.data);
    setModalOpen(true);
    setTitle('Success');
    setDescription('The briif has been archived successfully.');
    setImage(<Image src="/assets/icons/new/tick-circle.svg" className="" width="65px" height="100%" alt="tick" />);
    setButton('continue');
  };

  const onArchivedBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="100%" alt="tick" />);
    setButton('Try again');
  };

  const handleUnReadBriif = () => {
    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${props.id}]&sender_id=[${props.a_id}]`;
    dispatch(unReadBriif(params, onUnReadBriifSuccess, onUnReadBriifError));
  };

  const onUnReadBriifSuccess = (res) => {
    setUnReadBriifData(res.data);
    if (res.data.status == 'true') {
      setModalOpen(true);
      setTitle('Success');
      setDescription('The briif has been unread successfully.');
      setImage(<Image src="/assets/icons/new/tick-circle.svg" className="" width="65px" height="100%" alt="tick" />);
      setButton('continue');
    }
  };

  const onUnReadBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="100%" alt="alert" />);
    setButton('Try again');
  };

  const handleReadBriif = () => {
    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&user_id=${id}&id=[${props.id}]&sender_id=[${props.a_id}]`;
    dispatch(readBriif(params, onReadBriifSuccess, onReadBriifError));
  };
  const onReadBriifSuccess = (res) => {
    setReadBriifData(res.data);
    if (res.data.status == 'true') {
      setModalOpen(true);
      setTitle('Success');
      setDescription('The briif has been read successfully.');
      setImage(<Image src="/assets/icons/new/tick-circle.svg" className="" width="65px" height="100%" alt="tick" />);
      setButton('continue');
    }
  };

  const onReadBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="100%" alt="alert" />);
    setButton('Try again');
  };

  return (
    <>
      {forwardBriifModal == true ? (
        <ForwardModal
          alertOpen={forwardBriifModal}
          handleAlertClose={handleForwardBriifModalClose}
          ForwardBriifData={ForwardBriifData}
          briif_id={props.id}
          image={<Image src="/assets/icons/ic-mail-forward.png" className="" width="65px" height="70%" alt="forward" />}
          title="Forward"
          description="Please enter the name of recipient(s)."
          button1="Forward"
        />
      ) : (
        ''
      )}
      {modalOpen == true && (
        <SuccessModal
          modalOpen={modalOpen}
          handleModalClose={() => {
            setModalOpen(false);
          }}
          image={image}
          title={title}
          description={description}
          button1={button}
        />
      )}

      {(props.briff_status == 'recive' || props.briff_status == 'pin_recive') && (
        <>
          {isRead == '1' ? (
            <span className="me-2">
              <GenericTooltip
                placement="top"
                title="Read"
                component={
                  <Image
                    src="/assets/icons/new/ic_markalreadyread.svg"
                    className=""
                    width="11px"
                    height="11px"
                    alt="read"
                    onClick={(e) => {
                      setIsRead('0');
                      handleUnReadBriif(e);
                    }}
                  />
                }
              />
            </span>
          ) : (
            <span className="me-2">
              <GenericTooltip
                placement="top"
                title="Un Read"
                component={
                  <Image
                    src="/assets/icons/new/gs_read.svg"
                    className=""
                    width="11px"
                    height="11px"
                    alt="un read"
                    onClick={(e) => {
                      setIsRead('1');
                      handleReadBriif(e);
                    }}
                  />
                }
              />
            </span>
          )}
        </>
      )}
      {props.briff_status != 'recive' && props.briff_status != 'pin_recive' && (
        <span className="me-2">
          <GenericTooltip
            placement="top"
            title="Read"
            component={
              <Image
                src="/assets/icons/new/ic_markalreadyread.svg"
                className=""
                width="11px"
                height="11px"
                alt="read"
                style={{ opacity: '0.4' }}
              />
            }
          />
        </span>
      )}
      {isArchived != 'archived' && (
        <span className="me-2">
          <GenericTooltip
            placement="top"
            title="Archive"
            component={
              <Image
                src="/assets/icons/new/archiveicon.svg"
                className=""
                width="11px"
                height="9px"
                alt="archive"
                onClick={(e) => {
                  setIsArchived('archived');
                  handleArchivedBriif(e);
                }}
              />
            }
          />
        </span>
      )}
      {isArchived == 'archived' && (
        <span className="me-2">
          <GenericTooltip
            placement="top"
            title="Un Archive"
            component={
              <Image
                src="/assets/icons/new/gs_unarchive.svg"
                width="11px"
                height="9px"
                alt="un archive"
                onClick={(e) => {
                  setIsArchived('unarchived');
                  handleUnArchivedBriif(e);
                }}
              />
            }
          />
        </span>
      )}
      {props.briff_status != 'archived' && (
        <span className="me-2">
          <GenericTooltip
            placement="top"
            title="Forward"
            component={
              <Image
                src="/assets/icons/new/ic_forward.svg"
                width="11px"
                height="10px"
                alt="forward"
                onClick={(e) => {
                  setForwardBriifModal(true);
                  handleForwardBriifModalOpen(e);
                }}
              />
            }
          />
        </span>
      )}
      {props.briff_status == 'archived' && (
        <span className="me-2">
          <GenericTooltip
            placement="top"
            title="Forward"
            component={
              <Image
                src="/assets/icons/new/ic_forward.svg"
                style={{ opacity: '0.4' }}
                className=""
                width="11px"
                height="10px"
                alt="forward"
              />
            }
          />
        </span>
      )}
      {props.briff_status != 'archived' && (
        <>
          {(isPinned == 'recive' || isPinned == 'send') && (
            <span>
              <GenericTooltip
                placement="top"
                title="Pin"
                component={
                  <Image
                    src="/assets/icons/new/pin.svg"
                    className=""
                    width="11px"
                    height="10px"
                    alt="pin"
                    onClick={(e) => {
                      setIsPinned('pin_recive');
                      handlePinnedBriif(e);
                    }}
                  />
                }
              />
            </span>
          )}
          {(isPinned == 'pin_recive' || isPinned == 'pin_send') && (
            <span>
              <GenericTooltip
                placement="top"
                title="Un Pin"
                component={
                  <Image
                    src="/assets/icons/new/gs_unpin.svg"
                    className=""
                    width="11px"
                    height="10px"
                    alt="un pin"
                    onClick={(e) => {
                      setIsPinned('recive');
                      handleUnPinnedBriif(e);
                    }}
                  />
                }
              />
            </span>
          )}
        </>
      )}
      {props.briff_status == 'archived' && (
        <span>
          <GenericTooltip
            placement="top"
            title="Pin"
            component={
              <Image
                src="/assets/icons/new/pin.svg"
                className=""
                width="11px"
                height="10px"
                alt="pin"
                style={{ opacity: '0.4' }}
              />
            }
          />
        </span>
      )}
    </>
  );
};

export default BriifIcons;
