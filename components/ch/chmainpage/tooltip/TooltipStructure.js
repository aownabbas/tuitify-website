import React, { useEffect, useState } from 'react';
import ReceviedBriifs from './ReceviedBriifs';
import COLORS from '../../../../public/assets/colors/colors';
import pinnedBriif from '../../../../redux/actions/PinnedBriif';
import unPinnedBriif from '../../../../redux/actions/UnPinnedBriif';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';
import Image from 'next/image';
import CustomScrollbar from '../../../combine/CustomScrollbar.js/CustomScrollbar';
const TooltipStructure = (props) => {
  const dispatch = useDispatch();
  const [successErrorMessage, setSuccessErrorMessage] = useState('');
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);

  const handleOpendModalPublish = ({ heading, message, buttonText, image, move }) => {
    setSuccessErrorMessage({ heading, message, buttonText, image, move });
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  const [getPlatData, setGetPlatData] = useState({});

  const [id, setId] = useState('');

  const [PinnedBriifData, setPinnedBriifData] = useState({
    status: '',
    message: '',
  });

  const [UnPinnedBriifData, setUnPinnedBriifData] = useState({
    status: '',
    message: '',
  });

  useEffect(() => {
    const modaleColse = setTimeout(() => {
      setModalShowErrorSuccess(false);
    }, 2000);
    return () => clearTimeout(modaleColse);
  }, [modalShowErrorSuccess]);

  const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');

  const handlePinnedBriif = (briifId, briifAId) => {
    props.setLoading(true);
    const params = `platform_id=${getPlatData.platform_id}&id=[${briifId}]&a_id=[${briifAId}]&user_id=${id}&status=${props.action}&date=${date}`;
    dispatch(pinnedBriif(params, onPinnedBriifSuccess, onPinnedBriifError));
  };
  const onPinnedBriifSuccess = (res) => {
    setPinnedBriifData(res.data);
    if (props.action == 'recive') {
      props.handleReceivedBriifs('pinned');
    }
    if (props.action == 'sent') {
      props.handleSendBriifs('pinned');
    }
    handleOpendModalPublish({
      heading: 'Success!',
      message: `The briif has been pinned Successfully.`,
      buttonText: 'Okay',
      image: '/assets/icons/new/checkedtick.svg',
      move: false,
    });
    props.setLoading(false);
  };

  const onPinnedBriifError = (err) => {
    props.setLoading(false);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };

  const handleUnPinnedBriif = (briifId, briifAId) => {
    props.setLoading(true);
    const params = `platform_id=${getPlatData.platform_id}&id=[${briifId}]&a_id=[${briifAId}]&user_id=${id}`;
    dispatch(unPinnedBriif(params, onUnPinnedBriifSuccess, onUnPinnedBriifError));
  };
  const onUnPinnedBriifSuccess = (res) => {
    if (res.data.status == 'true') {
      setUnPinnedBriifData(res.data);
      props.setLoading(false);
      if (props.action == 'recive') {
        props.handleReceivedBriifs('unpinned');
      }
      if (props.action == 'sent') {
        props.handleSendBriifs('unpinned');
      }
      handleOpendModalPublish({
        heading: 'Success',
        message: `The briif has been unpinned successfully.`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
    }
  };

  const onUnPinnedBriifError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    props.setLoading(false);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    props.receivedBriifsData;
    props.is_read;
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
    }
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
  }, [props]);

  return (
    <>
      {modalShowErrorSuccess == true && (
        <SuccessModal
          modalOpen={modalShowErrorSuccess}
          handleModalClose={handleCloseModalPublish}
          image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
          title={successErrorMessage.heading}
          description={successErrorMessage.message}
          button1={successErrorMessage.buttonText}
          setDotProgressLoading={setLoading}
          giistPublishMove={successErrorMessage.move}
        />
      )}
      <div
        className="py-1"
        style={{
          borderRadius: '25px',
          background: 'rgb(48, 53, 72, 0.6)',
        }}
      >
        <div
          className={
            (props.action === 'recive' && props.receivedBriifsData?.pin?.length > 0) ||
            (props.action === 'sent' && props.sendBriifsData.pin.length > 0)
              ? ''
              : ''
          }
        >
          <div className="row text-start overflow-hidden">
            {props.action === 'recive' && props.receivedBriifsData?.pin?.length > 0 && (
              <>
                <span className="fw-normal ps-0 pb-1 col-12 ms-4">
                  <span
                    className={
                      props.receivedBriifsData.pin.length > 99
                        ? 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                        : 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                    }
                    style={{ padding: '3px', display: 'table-cell' }}
                  >
                    <span className="ps-2 pe-3 d-inline semibold-mid-small text-nowrap">Pinned Briifs</span>
                    <span className="d-inline-flex align-items-center">
                      <span
                        className="px-2 py-1 semibold-xsmall badge text-white text-nowrap"
                        style={{
                          borderRadius: '100%',
                          backgroundColor: COLORS.newColor,
                        }}
                      >
                        {props.receivedBriifsData.pin.length}
                      </span>
                    </span>
                  </span>
                </span>
              </>
            )}
            {props.action === 'sent' && props.sendBriifsData.pin.length > 0 && (
              <>
                <span className="fw-normal ps-0 pb-1 col-12 ms-4">
                  <span
                    className={
                      props.sendBriifsData.pin.length > 199
                        ? 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                        : 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                    }
                    style={{ padding: '3px', display: 'table-cell' }}
                  >
                    <span className="ps-2 pe-3 d-inline semibold-mid-small text-nowrap">Pinned Briifs</span>
                    <span className="d-inline-flex align-items-center">
                      <span
                        className="px-2 py-1 semibold-xsmall py-0 badge text-white text-nowrap"
                        style={{
                          borderRadius: '100px',
                          backgroundColor: COLORS.newColor,
                        }}
                      >
                        {props.sendBriifsData.pin.length}
                      </span>
                    </span>
                  </span>
                </span>
              </>
            )}
            {(props.action == 'recive' || props.action == 'sent') && (
              <div className="position-relative  w-100 ">
                <CustomScrollbar
                  height={
                    props.action === 'sent' && props.sendBriifsData.pin.length > 0
                      ? '30vh'
                      : '0px' || (props.action === 'recive' && props.receivedBriifsData.pin.length > 0)
                      ? '30vh'
                      : '0px'
                  }
                >
                  {props.action === 'recive'
                    ? props.receivedBriifsData?.pin?.length == 0
                      ? ''
                      : props.receivedBriifsData.pin.map((item, index) => {
                          return (
                            <ReceviedBriifs
                              key={index}
                              handlePlayedBriif={props.handlePlayedBriif}
                              handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                              handleDeleteSendBriif={props.handleDeleteSendBriif}
                              handleUnArchivedBriif={props.handleUnArchivedBriif}
                              handleArchivedBriif={props.handleArchivedBriif}
                              handleUnReadBriif={props.handleUnReadBriif}
                              handleReadBriif={props.handleReadBriif}
                              handleForwardBriif={props.handleForwardBriif}
                              setForwardBriifData={props.setForwardBriifData}
                              ForwardBriifData={props.ForwardBriifData}
                              briifId={props.briifId}
                              briifAId={props.briifAId}
                              briifCount={props.briifCount}
                              setBriifId={props.setBriifId}
                              setBriifAId={props.setBriifAId}
                              setBriifCount={props.setBriifCount}
                              receivedBriifsData={props.receivedBriifsData}
                              handleReceivedBriifs={props.handleReceivedBriifs}
                              setReceivedBriifsData={props.setReceivedBriifsData}
                              handleUnPinnedBriif={handleUnPinnedBriif}
                              firstName={item.first_name}
                              lastName={item.last_name}
                              description={item.description}
                              title={item.title}
                              created={item.created}
                              type={item.type}
                              thumbnail={item.thumbnail}
                              setBriifAction={props.setBriifAction}
                              briifAction={props.briifAction}
                              action={props.action}
                              pin_id={item.pin_id}
                              id={item.id}
                              a_id={item.a_id}
                              setIsRead={props.setIsRead}
                              isRead={props.isRead}
                              is_read={item.is_read}
                              count={item.count}
                              status={item.status}
                              attechmentimg={item.attachments}
                              setLoading={props.setLoading}
                            />
                          );
                        })
                    : ''}
                  {props.action === 'sent'
                    ? props.sendBriifsData.pin.length == 0
                      ? ''
                      : props.sendBriifsData.pin.map((item, index) => {
                          return (
                            <ReceviedBriifs
                              key={index}
                              handlePlayedBriif={props.handlePlayedBriif}
                              handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                              handleDeleteSendBriif={props.handleDeleteSendBriif}
                              handleUnArchivedBriif={props.handleUnArchivedBriif}
                              handleArchivedBriif={props.handleArchivedBriif}
                              handleUnReadBriif={props.handleUnReadBriif}
                              handleReadBriif={props.handleReadBriif}
                              handleForwardBriif={props.handleForwardBriif}
                              setForwardBriifData={props.setForwardBriifData}
                              ForwardBriifData={props.ForwardBriifData}
                              briifId={props.briifId}
                              briifAId={props.briifAId}
                              briifCount={props.briifCount}
                              setBriifId={props.setBriifId}
                              setBriifAId={props.setBriifAId}
                              setBriifCount={props.setBriifCount}
                              sendBriifsData={props.sendBriifsData}
                              handleSendBriifs={props.handleSendBriifs}
                              handleUnPinnedBriif={handleUnPinnedBriif}
                              firstName={item.first_name}
                              lastName={item.last_name}
                              description={item.description}
                              title={item.title}
                              created={item.created}
                              type={item.type}
                              thumbnail={item.thumbnail}
                              setBriifAction={props.setBriifAction}
                              briifAction={props.briifAction}
                              action={props.action}
                              pin_id={item.pin_id}
                              id={item.id}
                              count={item.count}
                              a_id={item.a_id}
                              status={item.status}
                              //playbriif id
                              playBriifId={props.playBriifId}
                              attechmentimg={item.attachments}
                              setLoading={props.setLoading}
                            />
                          );
                        })
                    : ''}
                </CustomScrollbar>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="row  text-start">
            <span className="fw-normal pb-2 pt-2 ps-0 col-12 ms-4">
              {props.action === 'recive' && (
                <span
                  className={
                    props.receivedBriifsData.recive.length > 999
                      ? 'bg-white align-items-center rounded-pill d-inline-flex pe-2 px-0'
                      : props.receivedBriifsData.recive.length < 10
                      ? 'bg-white align-items-center rounded-pill d-inline-flex pe-2 px-0'
                      : 'bg-white align-items-center rounded-pill d-inline-flex pe-2 px-0'
                  }
                  style={{ padding: '3px', display: 'table-cell' }}
                >
                  {props.searchValue ? (
                    <h5 className={'ps-2 pe-3 mb-0 d-inline semibold-mid-small text-nowrap'}>Search Receive Result</h5>
                  ) : (
                    <h5
                      className={
                        props.receivedBriifsData.recive.length < 10
                          ? 'ps-2 pe-2 mb-0 d-inline  semibold-mid-small text-nowrap'
                          : 'ps-2 pe-3 mb-0 d-inline  semibold-mid-small text-nowrap'
                      }
                    >
                      All Received Briifs
                    </h5>
                  )}
                  {/* <span> */}
                  {props.receivedBriifsData.recive.length >= 0 && (
                    <span
                      className="px-2 py-1 py-0 badge text-white text-nowrap semibold-xsmall"
                      style={{
                        borderRadius: '100px',
                        backgroundColor: COLORS.newColor,
                      }}
                    >
                      {props.receivedBriifsData.recive.length}
                    </span>
                  )}
                </span>
              )}
              {props.action === 'sent' && (
                <span
                  className={
                    props.sendBriifsData?.recive?.length > 999
                      ? 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                      : props.sendBriifsData?.recive?.length < 100
                      ? 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                      : 'bg-white align-items-center rounded-pill d-inline-flex pe-2 px-0'
                  }
                  style={{ padding: '3px', display: 'table-cell' }}
                >
                  {props.searchValue ? (
                    <span className={'ps-2 pe-3 mb-0 d-inline-flex semibold-mid-small text-nowrap'}>
                      Search Sent Result
                    </span>
                  ) : (
                    <span
                      className={
                        props.sendBriifsData.recive?.length < 100
                          ? 'ps-2 pe-2 mb-0 d-inline-flex semibold-mid-small text-nowrap'
                          : 'ps-2 pe-3 mb-0 d-inline-flex semibold-mid-small text-nowrap'
                      }
                    >
                      All Sent Briifs
                    </span>
                  )}
                  {props.sendBriifsData.recive?.length >= 0 && (
                    <span
                      className="px-2 py-1 py-0 badge text-white text-nowrap semibold-xsmall"
                      style={{
                        borderRadius: '100px',
                        backgroundColor: COLORS.newColor,
                      }}
                    >
                      {props.sendBriifsData.recive.length}
                    </span>
                  )}
                </span>
              )}
              {props.action === 'archive' && (
                <span
                  className={
                    props.archivedBriifsData.archive.length > 999
                      ? 'bg-white rounded-pill d-inline-flex align-items-center px-0'
                      : props.archivedBriifsData.archive.length < 100
                      ? 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                      : 'bg-white align-items-center rounded-pill d-inline-flex pe-2 px-0'
                  }
                  style={{ padding: '3px', display: 'table-cell' }}
                >
                  {props.searchValue ? (
                    <span className="px-3 pe-2 d-inline semibold-mid-small">Search Archive Result</span>
                  ) : (
                    <span
                      style={{ padding: '3px' }}
                      className={
                        props.archivedBriifsData.archive.length > 9
                          ? 'ps-2 pe-2 mb-0 d-inline-flex semibold-mid-small text-nowrap'
                          : 'ps-2 pe-3 mb-0 d-inline-flex semibold-mid-small text-nowrap'
                      }
                    >
                      All Archive Briifs
                    </span>
                  )}
                  {props.archivedBriifsData.archive.length >= 0 && (
                    <span
                      className="px-2 py-1 semibold-xsmall py-0 badge text-white text-nowrap"
                      style={{
                        borderRadius: '100px',
                        backgroundColor: COLORS.newColor,
                      }}
                    >
                      {props.archivedBriifsData.archive?.length}
                    </span>
                  )}
                </span>
              )}
              {props.action === 'draft' && (
                <span
                  className={
                    props.draftBriifsData.briffs.length > 999
                      ? 'bg-white rounded-pill d-inline-flex align-items-center px-0'
                      : props.draftBriifsData.briffs.length < 100
                      ? 'bg-white align-items-center rounded-pill d-inline-flex px-0 pe-2'
                      : 'bg-white align-items-center rounded-pill d-inline-flex pe-2 px-0'
                  }
                  style={{ padding: '3px', display: 'table-cell' }}
                >
                  {props.searchValue ? (
                    <span className="px-3 pe-2 d-inline semibold-mid-small">Search Save Result</span>
                  ) : (
                    <span
                      style={{ padding: '3px' }}
                      className={
                        props.draftBriifsData.briffs.length > 9
                          ? 'ps-2 pe-2 mb-0 d-inline-flex semibold-mid-small text-nowrap'
                          : 'ps-2 pe-3 mb-0 d-inline-flex semibold-mid-small text-nowrap'
                      }
                    >
                      All Save Briifs
                    </span>
                  )}
                  {props.draftBriifsData.briffs.length >= 0 && (
                    <span
                      className="px-2 py-1 semibold-xsmall py-0 badge text-white text-nowrap"
                      style={{
                        borderRadius: '100px',
                        backgroundColor: COLORS.newColor,
                      }}
                    >
                      {props.draftBriifsData.briffs.length}
                    </span>
                  )}
                </span>
              )}
            </span>
            {(props.action == 'recive' || props.action == 'sent') && (
              <div>
                <CustomScrollbar
                  height={
                    (props.action === 'recive' && props.receivedBriifsData.pin.length > 1) ||
                    (props.action === 'sent' && props.sendBriifsData.pin.length > 1)
                      ? '55vh'
                      : '78vh'
                  }
                >
                  {props.action === 'recive' ? (
                    props.receivedBriifsData.recive.length == 0 ? (
                      <>
                        <div className="d-flex align-items-end justify-content-center" style={{ height: '250px' }}>
                          <Image
                            src="/assets/icons/new/no_receivedbriifs_icon.svg"
                            width="200px"
                            className="d-block"
                            height="200px"
                            alt="no_receivedbriifs_icon"
                          />
                        </div>
                        <br />
                        <br />
                        <br />
                        <p className="text-white text-center ultralight">There are no received briifs </p>
                      </>
                    ) : (
                      props.receivedBriifsData.recive.map((item, index) => {
                        return (
                          <ReceviedBriifs
                            key={index}
                            handlePlayedBriif={props.handlePlayedBriif}
                            handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                            handleDeleteSendBriif={props.handleDeleteSendBriif}
                            handleUnArchivedBriif={props.handleUnArchivedBriif}
                            handleArchivedBriif={props.handleArchivedBriif}
                            handleUnReadBriif={props.handleUnReadBriif}
                            handleReadBriif={props.handleReadBriif}
                            handleForwardBriif={props.handleForwardBriif}
                            setForwardBriifData={props.setForwardBriifData}
                            ForwardBriifData={props.ForwardBriifData}
                            setHandleAlertClose={props.setHandleAlertClose}
                            handleReceivedBriifs={props.handleReceivedBriifs}
                            briifId={props.briifId}
                            briifAId={props.briifAId}
                            briifCreated={props.briifCreated}
                            briifCount={props.briifCount}
                            setBriifId={props.setBriifId}
                            setBriifAId={props.setBriifAId}
                            setBriifCreated={props.setBriifCreated}
                            setBriifCount={props.setBriifCount}
                            handlePinnedBriif={handlePinnedBriif}
                            receivedBriifsData={props.receivedBriifsData}
                            setReceivedBriifsData={props.setReceivedBriifsData}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            description={item.description}
                            title={item.title}
                            created={item.created}
                            type={item.type}
                            thumbnail={item.thumbnail}
                            setBriifAction={props.setBriifAction}
                            briifAction={props.briifAction}
                            action={props.action}
                            id={item.id}
                            a_id={item.a_id}
                            setIsRead={props.setIsRead}
                            isRead={props.isRead}
                            is_read={item.is_read}
                            count={item.count}
                            status={item.status}
                            //playbriif id
                            playBriifId={props.playBriifId}
                            attechmentimg={item.attachments}
                            setLoading={props.setLoading}
                          />
                        );
                      })
                    )
                  ) : (
                    ''
                  )}

                  {props.action === 'sent' ? (
                    props.sendBriifsData.recive.length == 0 ? (
                      <>
                        <div className="d-flex align-items-end justify-content-center" style={{ height: '250px' }}>
                          <Image
                            src="/assets/icons/new/no_receivedbriifs_icon.svg"
                            width="200px"
                            className="d-block"
                            height="200px"
                            alt="no_receivedbriifs_icon"
                          />
                        </div>
                        <br />
                        <br />
                        <br />
                        <p className="text-white text-center ultralight">There are no send briifs </p>
                      </>
                    ) : (
                      props.sendBriifsData.recive.map((item, index) => {
                        return (
                          <ReceviedBriifs
                            key={index}
                            handlePlayedBriif={props.handlePlayedBriif}
                            handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                            handleDeleteSendBriif={props.handleDeleteSendBriif}
                            handleUnArchivedBriif={props.handleUnArchivedBriif}
                            handleArchivedBriif={props.handleArchivedBriif}
                            handleUnReadBriif={props.handleUnReadBriif}
                            handleReadBriif={props.handleReadBriif}
                            handleForwardBriif={props.handleForwardBriif}
                            setForwardBriifData={props.setForwardBriifData}
                            ForwardBriifData={props.ForwardBriifData}
                            handleSendBriifs={props.handleSendBriifs}
                            briifId={props.briifId}
                            briifAId={props.briifAId}
                            briifCreated={props.briifCreated}
                            briifCount={props.briifCount}
                            setBriifId={props.setBriifId}
                            setBriifAId={props.setBriifAId}
                            setBriifCreated={props.setBriifCreated}
                            setBriifCount={props.setBriifCount}
                            handlePinnedBriif={handlePinnedBriif}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            description={item.description}
                            title={item.title}
                            created={item.created}
                            type={item.type}
                            thumbnail={item.thumbnail}
                            setBriifAction={props.setBriifAction}
                            briifAction={props.briifAction}
                            action={props.action}
                            id={item.id}
                            count={item.count}
                            a_id={item.a_id}
                            status={item.status}
                            playBriifId={props.playBriifId}
                            attechmentimg={item.attachments}
                            setLoading={props.setLoading}
                          />
                        );
                      })
                    )
                  ) : (
                    ''
                  )}
                </CustomScrollbar>
              </div>
            )}
            {(props.action === 'archive' || props.action === 'draft') && (
              <div className=" position-relative ">
                <CustomScrollbar height={'78vh'}>
                  {props.action === 'archive' ? (
                    props.archivedBriifsData.archive.length == 0 ? (
                      <>
                        <div className="d-flex align-items-end justify-content-center" style={{ height: '250px' }}>
                          <Image
                            src="/assets/icons/new/no_receivedbriifs_icon.svg"
                            width="200px"
                            className="d-block"
                            height="200px"
                            alt="no_receivedbriifs_icon"
                          />
                        </div>
                        <br />
                        <br />
                        <br />
                        <p className="text-white text-center ultralight">There are no archive briifs </p>
                      </>
                    ) : (
                      props.archivedBriifsData.archive.map((item, index) => {
                        return (
                          <ReceviedBriifs
                            key={index}
                            handlePlayedBriif={props.handlePlayedBriif}
                            handleUnArchivedBriif={props.handleUnArchivedBriif}
                            handleArchivedBriifs={props.handleArchivedBriifs}
                            handleForwardBriif={props.handleForwardBriif}
                            setForwardBriifData={props.setForwardBriifData}
                            ForwardBriifData={props.ForwardBriifData}
                            briifId={props.briifId}
                            briifAId={props.briifAId}
                            briifCount={props.briifCount}
                            setBriifId={props.setBriifId}
                            setBriifAId={props.setBriifAId}
                            setBriifCount={props.setBriifCount}
                            archivedBriifsData={props.archivedBriifsData}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            description={item.description}
                            title={item.title}
                            created={item.created}
                            type={item.type}
                            thumbnail={item.thumbnail}
                            setBriifAction={props.setBriifAction}
                            briifAction={props.briifAction}
                            action={props.action}
                            id={item.id}
                            a_id={item.a_id}
                            count={item.count}
                            status={item.status}
                            //playbriif id
                            playBriifId={props.playBriifId}
                            attechmentimg={item.attachments}
                            setLoading={props.setLoading}
                          />
                        );
                      })
                    )
                  ) : (
                    ''
                  )}
                  {props.action === 'draft' ? (
                    props.draftBriifsData.briffs.length == 0 ? (
                      <>
                        <div className="d-flex align-items-end justify-content-center" style={{ height: '250px' }}>
                          <Image
                            src="/assets/icons/new/no_receivedbriifs_icon.svg"
                            width="200px"
                            className="d-block"
                            height="200px"
                            alt="no_receivedbriifs_icon"
                          />
                        </div>
                        <br />
                        <br />
                        <br />
                        <p className="text-white text-center ultralight">There are no draft briifs </p>
                      </>
                    ) : (
                      props.draftBriifsData.briffs.map((item, index) => {
                        return (
                          <ReceviedBriifs
                            key={index}
                            handlePlayedBriif={props.handlePlayedBriif}
                            handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                            handleDeleteSendBriif={props.handleDeleteSendBriif}
                            handleUnArchivedBriif={props.handleUnArchivedBriif}
                            handleArchivedBriif={props.handleArchivedBriif}
                            handleUnReadBriif={props.handleUnReadBriif}
                            handleReadBriif={props.handleReadBriif}
                            handleForwardBriif={props.handleForwardBriif}
                            setForwardBriifData={props.setForwardBriifData}
                            ForwardBriifData={props.ForwardBriifData}
                            handleSendBriifs={props.handleSendBriifs}
                            briifId={props.briifId}
                            briifAId={props.briifAId}
                            briifCreated={props.briifCreated}
                            briifCount={props.briifCount}
                            setBriifId={props.setBriifId}
                            setBriifAId={props.setBriifAId}
                            setBriifCreated={props.setBriifCreated}
                            setBriifCount={props.setBriifCount}
                            handlePinnedBriif={handlePinnedBriif}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            description={item.description}
                            title={item.title}
                            created={item.created}
                            type={item.type}
                            thumbnail={item.thumbnail}
                            setBriifAction={props.setBriifAction}
                            briifAction={props.briifAction}
                            action={props.action}
                            id={item.id}
                            count={item.count}
                            a_id={item.a_id}
                            status={item.status}
                            playBriifId={props.playBriifId}
                            attechmentimg={item.attachments}
                            handleDraftBriffs={props.handleDraftBriffs}
                            setLoading={props.setLoading}
                            handleDeleteDraftBriff={props.handleDeleteDraftBriff}
                          />
                        );
                      })
                    )
                  ) : (
                    ''
                  )}
                </CustomScrollbar>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`#tbody::-webkit-scrollbar{	width: 0px;}`}</style>
    </>
  );
};
export default TooltipStructure;
