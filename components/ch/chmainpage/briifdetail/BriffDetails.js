import React, { useState, useRef, useEffect, useCallback } from 'react';
import Tag from './Tag';
import { useDispatch, useSelector } from 'react-redux';
import forwardBriif from '../../../../redux/actions/Forward';
import moment from 'moment';
import ForwardModal from '../../../modals/forwardmodal/ForwardModal';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import PlayMediaModal from '../../../modals/playmediamodal/PlayMediaModal';
import Link from 'next/link';
import ArrowTooltips from '../../../modals/tooltip/Tooltip';
import dynamic from 'next/dynamic';
const PrimaryMediaPlayer = dynamic(() => import('../../../combine/mediaPlayer/PrimaryMediaPlayer'), {
  ssr: false,
});

const BriffDetails = (props) => {
  const dispatch = useDispatch();

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [loginAccessToken, setLoginAccessToken] = useState('');

  const { data } = useSelector((state) => state.sidebar);

  const [getPlatData, setGetPlatData] = useState(null);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;

      const platform_id = LoginData.platform_id;

      setLoginAccessToken(LoginData.access_token);
    }

    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }

    return () => { };
  }, [props]);

  let RecipientsGorups = [];
  if (props.playedBriifData.briff.length !== 0) {
    RecipientsGorups = [...props.playedBriifData.recipent, ...props.playedBriifData.groups];
  }

  const [deletedBriifModal, setDeletedBriifModal] = useState(false);
  const [archivedBriifModal, setArchivedBriifModal] = useState(false);
  const [unArchivedBriifModal, setUnArchivedBriifModal] = useState(false);
  const [forwardBriifModal, setForwardBriifModal] = useState(false);

  const handleDeleteBriifModalOpen = () => setDeletedBriifModal(true);
  const handleArchivedBriifModalOpen = () => setArchivedBriifModal(true);
  const handleUnArchivedBriifModalOpen = () => setUnArchivedBriifModal(true);
  const handleForwardBriifModalOpen = () => {
    setForwardBriifModal(true);

    const params = `platform_id=${getPlatData.platform_id}`;
    dispatch(forwardBriif(params, loginAccessToken, onForwardBriifSuccess, onForwardBriifError));
  };
  const onForwardBriifSuccess = (res) => {
    props.setForwardBriifData(res.data);
  };

  const onForwardBriifError = (error) => {
    console.log('Error', error);
  };
  const handleDeleteBriifModalClose = () => setDeletedBriifModal(false);
  const handleArchivedBriifModalClose = () => setArchivedBriifModal(false);
  const handleUnArchivedBriifModalClose = () => setUnArchivedBriifModal(false);
  const handleForwardBriifModalClose = () => setForwardBriifModal(false);

  let tagsArray = [];
  let attachmentsArray = [];

  let attachmentsOriginalNames = props.playedBriifData.briff[0]?.attachments_names?.split(',');

  const fourDummyArray = [1, 2, 3, 4];
  const threeDummyArray = [1, 2, 3];

  let textDate = '';
  let noUTCdate = '';

  if (props.playedBriifData && props.playedBriifData.briff && props.playedBriifData.briff.length > 0) {
    const created = props.playedBriifData.briff[0].created;
    if (moment.utc(created).isValid()) {
      const formattedDate = moment.utc(created).format('YYYY-MM-DD HH:mm:ss');
      textDate = moment(formattedDate).fromNow();
      noUTCdate = formattedDate.split(' ')[0];
    }
  }

  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [TypeBriff, setTypeBriff] = useState('');

  const handleClickDoc = (item, type, name) => {
    setLink(item);
    setTypeBriff(type);
    setName(name);
    setShowModal(true);
  };

  return (
    <>
      <div className="overflow-auto" style={{ height: '100%' }}>
        {data != 'unsent' && data != 'unreceive' && data != 'unarchived' ? (
          <>
            {props.briifDetailsLoading == true ? (
              <>
                <div className="" style={{ padding: '14px' }}>
                  <Skeleton
                    variant="rectangular"
                    height={350}
                    animation="wave"
                    width="100%"
                    style={{ marginBottom: 20, borderRadius: '10px' }}
                  />
                  <div className="px-1 pe-0">
                    <div className="row">
                      <div className="col-md-6 col-lg-6 col-6">
                        <Skeleton animation="wave" height={25} width="80%" style={{ marginBottom: 15 }} />
                      </div>
                      <div className="col-md-6 col-lg-6 col-6 ps-4 w-50 text-end">
                        <div className="d-flex justify-content-end px-0" style={{ float: 'right' }}>
                          {fourDummyArray.map((item, index) => {
                            return (
                              <>
                                <div className="col-2 mx-2" key={index}>
                                  <Skeleton
                                    className="position-relative overflow-hidden text-center"
                                    animation="wave"
                                    style={{ borderRadius: '50% 50% 50% 50%' }}
                                    variant="circular"
                                    width={25}
                                    height={25}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-7 pe-0">
                        <div style={{ maxWidth: '100%' }}>
                          <div className="row">
                            <div className="col-md-2 pe-0 ps-2 d-flex align-items-center mb-2">
                              <div className="col-2 mx-1">
                                <Skeleton
                                  className="position-relative mt-2 overflow-hidden text-center"
                                  animation="wave"
                                  style={{ borderRadius: '50% 50% 50% 50%' }}
                                  variant="circular"
                                  width={34}
                                  height={34}
                                />
                              </div>
                            </div>
                            <div className="col-md-10">
                              <div>
                                <Skeleton
                                  className="mt-2"
                                  animation="wave"
                                  height={20}
                                  width="60%"
                                  style={{ marginBottom: 3 }}
                                />
                                <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 15 }} />
                              </div>
                            </div>
                          </div>
                          <div className="ms-1 mb-10 row">
                            <Skeleton
                              className="mt-3"
                              animation="wave"
                              height={20}
                              width="60%"
                              style={{ marginBottom: 10 }}
                            />
                            <Skeleton animation="wave" height={12} width="90%" style={{ marginBottom: 3 }} />
                            <Skeleton animation="wave" height={12} width="90%" style={{ marginBottom: 3 }} />
                            <Skeleton animation="wave" height={12} width="50%" style={{ marginBottom: 10 }} />
                          </div>
                          <div style={{ marginBottom: '10px', height: '50px' }} className="pb-0">
                            <div className="row">
                              {threeDummyArray.map((item, index) => {
                                return (
                                  <>
                                    <div className="col-3 d-inline-flex px-1 ms-2" key={index}>
                                      <Skeleton
                                        animation="wave"
                                        height={50}
                                        width="100%"
                                        className="position-relative overflow-hidden text-center"
                                        style={{
                                          marginBottom: 10,
                                          borderRadius: '20px',
                                        }}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="ms-1 mb-10">
                              <Skeleton
                                className="d-block"
                                animation="wave"
                                height={20}
                                width="60%"
                                style={{ marginBottom: 10 }}
                              />
                              <div className="row ms-3">
                                {fourDummyArray.map((item, index) => {
                                  return (
                                    <>
                                      <Skeleton
                                        className="recepient"
                                        animation="wave"
                                        height={24}
                                        width={24}
                                        style={{ marginBottom: 10 }}
                                        variant="circular"
                                        key={index}
                                      />
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-5">
                        <Skeleton
                          animation="wave"
                          height={25}
                          width="80%"
                          style={{ marginBottom: 15 }}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {props.playedBriifData.briff.length != 0 ? (
                  <>
                    <div style={{ padding: '14px' }}>
                      <div
                        style={{
                          background: 'linear-gradient(180deg, #F6F2F1,#F6F2F1, #ddd4d4,rgb(59 64 84))',
                          diplay: 'flex',
                          justifyContent: 'center',
                          aspectRatio: '16/9',
                          position: 'relative',
                          borderRadius: '10px',
                          marginBottom: '15px',
                        }}
                      >
                        <PrimaryMediaPlayer
                          link={props.playedBriifData.briff[0].link}
                          isCH={true}
                          type={props.playedBriifData.briff[0].type == 'mp4' ? 0 : 2}
                          setPlaying={setPlaying}
                          playing={playing}
                          time={props.playedBriifData?.briff[0].duration}
                          awsLink={awsLink}
                        />
                      </div>
                      <div className="px-1 pe-0 ">
                        <div className="row d-flex align-items-center gx-0">
                          <div className="col-12 d-block d-md-none">
                            <p className="mb-2 bold text-capitalize">{props.playedBriifData.briff[0].title}</p>
                          </div>
                          <div className="col-md-6 col-lg-6 col-6">
                            <p className="mb-2 bold text-capitalize d-none d-md-inline">
                              {props.playedBriifData.briff.length === 0 ? '' : props.playedBriifData.briff[0].title}
                            </p>
                          </div>
                          <div className="col-md-6 col-lg-6 col-sm-6 ps-4 w-50 text-end">
                            <div className="d-flex justify-content-end px-0" style={{ float: 'right' }}>
                              {props.briifAction !== 'archive' &&
                                (data == 'receive' || data == 'sent' || data == 'draft') ? (
                                props.playedBriifData.briff.length == 0 ? (
                                  ''
                                ) : (
                                  <>
                                    <ArrowTooltips title="Forward" placement="top">
                                      <span className="pe-2 pe-md-3">
                                        {/* <GenericTooltip
                                        placement="top"
                                        title="Forward"
                                        component={ */}
                                        <Image
                                          src="/assets/icons/new/ic_share.svg"
                                          className=""
                                          onClick={handleForwardBriifModalOpen}
                                          width="24px"
                                          height="24px"
                                          alt="share"
                                        />
                                        {/* }
                                      /> */}
                                      </span>
                                    </ArrowTooltips>
                                    {forwardBriifModal && (
                                      <ForwardModal
                                        alertOpen={forwardBriifModal}
                                        handleAlertClose={handleForwardBriifModalClose}
                                        ForwardBriifData={props.ForwardBriifData}
                                        briif_id={props.playBriifId}
                                        setLoading={props.setLoading}
                                        handleRefreshBriifsData={
                                          props.briifAction
                                            ? (props.briifAction === 'sent' && props.handleSendBriifs) ||
                                            (props.briifAction === 'recive' && props.handleReceivedBriifs) ||
                                            (props.briifAction === 'archive' && props.handleArchivedBriifs) ||
                                            (props.briifAction === 'draft' && props.handleDraftBriffs)
                                            : props.handleReceivedBriifs
                                        }
                                        image={
                                          <Image
                                            src="/assets/icons/ic-mail-forward.png"
                                            className=""
                                            width="40px"
                                            height="40%"
                                            alt="forward"
                                          />
                                        }
                                        title="Forward"
                                        description="Please enter the name of recipient(s)."
                                        button1="Forward"
                                      />
                                    )}
                                  </>
                                )
                              ) : (
                                ''
                              )}
                              {props.briifAction !== 'archive' &&
                                (data == 'receive' || data == 'sent' || data == 'draft') ? (
                                props.playedBriifData.briff.length === 0 || data == 'draft' ? (
                                  ''
                                ) : (
                                  <>
                                    <ArrowTooltips title="Archive" placement="top">
                                      <span className="pe-2 pe-md-3">
                                        {/* <GenericTooltip
                                        placement="top"
                                        title="Archive"
                                        component={ */}
                                        <Image
                                          src="/assets/icons/new/ic_archive.svg"
                                          className=""
                                          onClick={handleArchivedBriifModalOpen}
                                          width="24px"
                                          height="24px"
                                          alt="archive"
                                        />
                                        {/* // } // /> */}
                                      </span>
                                    </ArrowTooltips>

                                    {archivedBriifModal && (
                                      <DummyDeleteModal
                                        openModal={archivedBriifModal}
                                        handleCloseModal={handleArchivedBriifModalClose}
                                        image={'/assets/icons/ic-archive.png'}
                                        heading="Archived"
                                        text="Are you sure about archiving this Briif?"
                                        buttonText1="No"
                                        buttonText2="Yes"
                                        handleClick={() => {
                                          props.briifAction
                                            ? props.handleArchivedBriif(
                                              props.playBriifId,
                                              props.playBriifAId,
                                              data == 'receive' ? '0' : props.playBriifCount,
                                              props.briifAction,
                                            )
                                            : props.handleArchivedBriif(
                                              props.playBriifId,
                                              props.playBriifAId,
                                              data == 'receive' ? '0' : props.playBriifCount,
                                            );
                                        }}
                                      />
                                    )}
                                  </>
                                )
                              ) : (
                                <>
                                  <ArrowTooltips title="Un Archive" placement="top">
                                    <span className="pe-2 pe-md-3">
                                      {/* <GenericTooltip
                                        placement="top"
                                        title="Un Archive"
                                        component={ */}
                                      <Image
                                        src="/assets/icons/new/ic_unarchive.svg"
                                        className="briifdetail-icons "
                                        onClick={handleUnArchivedBriifModalOpen}
                                        width="24px"
                                        height="24px"
                                        alt="un archive"
                                      />
                                      {/* }
                                      /> */}
                                    </span>
                                  </ArrowTooltips>

                                  {unArchivedBriifModal && (
                                    <DummyDeleteModal
                                      openModal={unArchivedBriifModal}
                                      handleCloseModal={handleUnArchivedBriifModalClose}
                                      image={'/assets/icons/ic-archive.png'}
                                      heading="UnArchived"
                                      text="Are you sure about unarchiving this Briif?"
                                      buttonText1="No"
                                      buttonText2="Yes"
                                      handleClick={() => {
                                        props.handleUnArchivedBriif(
                                          props.playBriifId,
                                          props.playBriifAId,
                                          props.playBriifCount,
                                        );
                                      }}
                                    />
                                  )}
                                </>
                              )}
                              {props.briifAction != 'sent' &&
                                props.briifAction != 'archive' &&
                                data == 'receive' &&
                                (props.isRead == '1' ? (
                                  <ArrowTooltips title="Un Read" placement="top">
                                    <span className="pe-2 pe-md-3">
                                      {/* <GenericTooltip
                                      placement="top"
                                      title="Un Read"
                                      component={ */}
                                      <Image
                                        src="/assets/icons/new/ic_markasunread.svg"
                                        className="briifdetail-icons"
                                        onClick={() => {
                                          props.setIsRead(props.isRead);
                                          props.handleReadBriif(props.playBriifId, props.playBriifAId, '0');
                                        }}
                                        width="24px"
                                        height="24px"
                                        alt="un read"
                                      />
                                      {/* }
                                    /> */}
                                    </span>
                                  </ArrowTooltips>
                                ) : (
                                  <ArrowTooltips title="Read" placement="top">
                                    <span className="pe-2 pe-md-3">
                                      {/* <GenericTooltip
                                      placement="top"
                                      title="Read"
                                      component={ */}
                                      <Image
                                        src="/assets/icons/new/ic_markasread.svg"
                                        className="briifdetail-icons"
                                        onClick={() => {
                                          props.setIsRead(props.isRead);
                                          props.handleUnReadBriif(props.playBriifId, props.playBriifAId, '1');
                                        }}
                                        width="24px"
                                        height="24px"
                                        alt="read"
                                      />
                                      {/* }
                                    /> */}
                                    </span>
                                  </ArrowTooltips>
                                ))}

                              {props.briifAction != 'sent' && props.briifAction != 'archive' && data == 'receive' && (
                                <>
                                  <ArrowTooltips title="Delete" placement="top">
                                    <span className="">
                                      {/* <GenericTooltip
                                        placement="top"
                                        title="Delete"
                                        component={ */}
                                      <Image
                                        src="/assets/icons/ic_delete.png"
                                        className="briifdetail-icons"
                                        onClick={handleDeleteBriifModalOpen}
                                        width="24px"
                                        height="24px"
                                        alt="ic_delete"
                                      />
                                      {/* }
                                      /> */}
                                    </span>
                                  </ArrowTooltips>

                                  <DummyDeleteModal
                                    openModal={deletedBriifModal}
                                    handleCloseModal={handleDeleteBriifModalClose}
                                    image={'/assets/images/trash.svg'}
                                    heading="Delete"
                                    text="Are you sure about deleting this Briif?"
                                    buttonText1="No"
                                    buttonText2="Yes"
                                    handleClick={() =>
                                      props.handleDeleteReceivedBriif(props.playBriifId, props.playBriifAId)
                                    }
                                  />
                                </>
                              )}

                              {(props.briifAction === 'sent' || data == 'sent') && (
                                <>
                                  <ArrowTooltips title="Delete" placement="top">
                                    <span className="">
                                      {/* <GenericTooltip
                                      placement="top"
                                      title="Delete"
                                      component={ */}
                                      <Image
                                        src="/assets/icons/ic_delete.png"
                                        className="briifdetail-icons"
                                        onClick={handleDeleteBriifModalOpen}
                                        width="24px"
                                        height="24px"
                                        alt="delete"
                                      />
                                      {/* }
                                    /> */}
                                    </span>
                                  </ArrowTooltips>

                                  <DummyDeleteModal
                                    openModal={deletedBriifModal}
                                    handleCloseModal={handleDeleteBriifModalClose}
                                    image={'/assets/images/trash.svg'}
                                    heading="Delete"
                                    text="Are you sure about deleting this Briif?"
                                    buttonText1="No"
                                    buttonText2="Yes"
                                    handleClick={() =>
                                      props.handleDeleteSendBriif(props.playBriifId, props.playBriifAId)
                                    }
                                  />
                                </>
                              )}
                              {(props.briifAction === 'draft' || data == 'draft') && (
                                <>
                                  <ArrowTooltips title="Delete" placement="top">
                                    <span className="">
                                      {/* <GenericTooltip
                                      placement="top"
                                      title="Delete"
                                      component={ */}
                                      <Image
                                        src="/assets/icons/ic_delete.png"
                                        className="briifdetail-icons"
                                        onClick={handleDeleteBriifModalOpen}
                                        width="24px"
                                        height="24px"
                                        alt="delete"
                                      />
                                      {/* }
                                    /> */}
                                    </span>
                                  </ArrowTooltips>

                                  <DummyDeleteModal
                                    openModal={deletedBriifModal}
                                    handleCloseModal={handleDeleteBriifModalClose}
                                    image={'/assets/images/trash.svg'}
                                    heading="Delete"
                                    text="Are you sure about deleting this Briif?"
                                    buttonText1="No"
                                    buttonText2="Yes"
                                    handleClick={() =>
                                      props.handleDeleteDraftBriff(props.playBriifId, props.playBriifAId)
                                    }
                                  />
                                </>
                              )}
                            </div>
                          </div>
                          <div className="row gx-0 mt-2">
                            <div className="col-md-7 col-12 pe-0">
                              <div className=" d-flex align-items-center">
                                <Link href={`/combine/UserProfile?user=${props.playedBriifData.briff[0].user_id}`}>
                                  <Image
                                    className="border rounded-circle"
                                    src={
                                      props.playedBriifData.briff.length === 0
                                        ? ''
                                        : props.playedBriifData.briff[0].image == null
                                          ? '/assets/icons/new/user.svg'
                                          : getPlatData
                                            ? getPlatData == (null || {})
                                              ? ''
                                              : `${awsLink}users/profileImages/${props.playedBriifData.briff[0].image}`
                                            : '/assets/icons/new/user.svg'
                                    }
                                    height="34px"
                                    width="34px"
                                    alt="Briif Creator"
                                  />
                                </Link>
                                <div>
                                  <p className="small-bold ms-2">
                                    {`${(
                                      props.playedBriifData.briff[0].first_name +
                                      ' ' +
                                      props.playedBriifData.briff[0].last_name
                                    ).length > 14
                                      ? (
                                        props.playedBriifData.briff[0].first_name +
                                        ' ' +
                                        props.playedBriifData.briff[0].last_name
                                      ).slice(0, 14) + '...'
                                      : props.playedBriifData.briff[0].first_name +
                                      ' ' +
                                      props.playedBriifData.briff[0].last_name
                                      }`}
                                  </p>
                                  <p className="regular-xxsmall ms-2 ps-0 mb-0">
                                    {textDate.includes('a few seconds ago') || textDate.includes('in a few seconds')
                                      ? textDate.replace('in a few seconds', 'just now') || textDate.replace('a few seconds ago', 'just now')
                                      : textDate}
                                  </p>
                                </div>
                              </div>
                              {props.playedBriifData.briff.length === 0 ? (
                                ''
                              ) : props.playedBriifData.briff[0].description != '' ? (
                                <>
                                  <p className="m-0 light-bold mt-3">Description</p>
                                  <div
                                    className="mt-2 medium "
                                    style={{
                                      opacity: '0.6',
                                      scrollbarWidth: 'none',
                                      overflowY: 'scroll',
                                      overflowX: 'hidden',
                                      maxHeight: '80px',
                                    }}
                                  >
                                    {props.playedBriifData.briff[0].description.length > 200
                                      ? props.playedBriifData.briff[0].description.slice(0, 200) + '...'
                                      : props.playedBriifData.briff[0].description}
                                  </div>
                                </>
                              ) : (
                                ''
                              )}
                              <div
                                style={
                                  props.playedBriifData.briff[0]?.tags != ''
                                    ? {
                                      marginBottom: '10px',
                                      height: '50px',
                                      scrollbarWidth: 'none',
                                    }
                                    : {
                                      marginBottom: '0px',
                                      scrollbarWidth: 'none',
                                    }
                                }
                                className="pb-0"
                              >
                                <div
                                  style={{
                                    scrollbarWidth: 'none',
                                    maxHeight: '60px',
                                  }}
                                  className={props.playedBriifData.briff[0]?.tags != '' ? 'py-2' : ''}
                                >
                                  {props.playedBriifData.briff.length == 0
                                    ? ''
                                    : props.playedBriifData.briff[0].tags != ''
                                      ? ((tagsArray = props.playedBriifData.briff[0].tags.split(',')),
                                        tagsArray.map((item, index) => {
                                          return <Tag tag={item} key={index} />;
                                        }))
                                      : ''}
                                </div>
                              </div>
                              {props.playedBriifData.status == 'true' && RecipientsGorups.length != 0 && (
                                <>
                                  <div
                                    className={
                                      props.playedBriifData.briff[0]?.tags ? `mt-5 mb-0 semibold` : `mt-2 mb-0 semibold`
                                    }
                                  >
                                    Recipients
                                    {/* <span className="ps-2">
                                      <Image
                                        src="/assets/icons/new/downarrow.svg"
                                        alt="arrow"
                                        width="10px"
                                        height="10px"
                                      />
                                    </span> */}
                                  </div>
                                  <div className="m-0 ms-2">
                                    {props.playedBriifData?.groups.map((item, index) => (
                                      <ArrowTooltips title={item.name} placement="top" key={index}>
                                        <span className="recepient">
                                          <Link href={`/combine/UserProfile?user=${item.user_id}`}>
                                            <Image
                                              className="rounded-circle  border border-2 border-white me-0 p-0"
                                              src={
                                                item.image != null
                                                  ? `${awsLink}groups/${item.image}`
                                                  : '/assets/icons/new/user.svg'
                                              }
                                              width="24px"
                                              height="24px"
                                              alt="user"
                                              style={{ objectFit: 'fill' }}
                                            />
                                          </Link>
                                        </span>
                                      </ArrowTooltips>
                                    ))}
                                    {props.playedBriifData?.recipent.map((item, index) => {
                                      return (
                                        <ArrowTooltips title={item.first_name} placement="top">
                                          <span className="recepient">
                                            <Link href={`/combine/UserProfile?user=${item.user_id}`}>
                                              <Image
                                                key={index}
                                                className="rounded-circle  border border-2 border-white me-0 p-0"
                                                src={
                                                  item.image != null
                                                    ? `${awsLink}users/profileImages/${item.image}`
                                                    : '/assets/icons/new/user.svg'
                                                }
                                                width="24px"
                                                height="24px"
                                                alt="user"
                                                style={{ objectFit: 'fill' }}
                                              />
                                            </Link>
                                          </span>
                                        </ArrowTooltips>
                                      );
                                    })}
                                    {props.playedBriifData?.receiptCount ? (
                                      <label
                                        style={{
                                          width: '27px',
                                          height: '24px',
                                          zIndex: 1000,
                                          marginLeft: '0.2px',
                                        }}
                                        className="mb-1 recepient rounded-circle border-white fw-bold d-inline-flex justify-content-center align-items-center bg-primary text-white"
                                      >
                                        <small
                                          className="text-white  text-center"
                                          style={{ fontSize: '10px', letterSpacing: 1.3, zIndex: 1000 }}
                                        >
                                          +{props.playedBriifData?.receiptCount}
                                        </small>
                                      </label>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </>
                              )}

                              <PlayMediaModal
                                previewInteractionDoc={`${awsLink}briffs/documents/${link}`}
                                handleCloseMediaplay={() => setShowModal(false)}
                                mediaplayModal={showModal}
                                mediatabValue={'doc'}
                                name={name}
                                downloadlink={`briffs/documents/${link}`}
                              />
                            </div>

                            <div className="col-md-5 col-12">
                              {props.playedBriifData.status === 'true' && props.playedBriifData.briff.length !== 0 ? (
                                <>
                                  {props.playedBriifData.briff[0].attachments != ''
                                    ? ((attachmentsArray = props.playedBriifData.briff[0].attachments.split(',')),
                                      // attachmentsOriginalNames = props.playedBriifData.briff[0].attachments.lastIndexOf('%'),
                                      console.log(attachmentsArray, 'jjjjjjjjjjjjjjjjjjjj'),
                                      (
                                        <>
                                          <p className="mt-2 mb-2 semibold">Attachments</p>
                                          <div className="row gx-0 px-1 text-center">
                                            {attachmentsArray.map((item, index) => {
                                              let Type = item.substr(item.lastIndexOf('.') + 1);
                                              return (
                                                <>
                                                  <span className="col-4 py-3" key={index}>
                                                    {Type != 'pdf' && Type != 'mp3' ? (
                                                      <>
                                                        <ArrowTooltips
                                                          title={attachmentsOriginalNames?.map(
                                                            (item, i) => index == i && item,
                                                          )}
                                                          placement="top-start"
                                                        >
                                                          <div>
                                                            {/* <GenericTooltip
                                                              placement="top"
                                                              title={attachmentsOriginalNames?.map(
                                                                (item, i) =>
                                                                  index == i &&
                                                                  item
                                                              )}
                                                              component={ */}
                                                            <Image
                                                              className="files-icon d-flex align-items-end"
                                                              width="24px"
                                                              height="24px"
                                                              alt="attachment"
                                                              onClick={() => {
                                                                const title = attachmentsOriginalNames.find(
                                                                  (attachment, i) => index === i,
                                                                );
                                                                handleClickDoc(item, Type, title);
                                                              }}
                                                              src={
                                                                //icon for type pdf
                                                                Type == 'pdf' || Type === 'PDF'
                                                                  ? '/assets/icons/new/pdf_attachment.svg'
                                                                  : Type === 'doc' ||
                                                                    Type === 'docx' ||
                                                                    Type === 'DOC' ||
                                                                    Type === 'DOCX'
                                                                    ? '/assets/icons/new/doc_attachment.svg'
                                                                    : Type === 'xls' ||
                                                                      Type === 'xlsx' ||
                                                                      Type === 'XLS' ||
                                                                      Type === 'XLSX' ||
                                                                      Type === 'csv' ||
                                                                      Type === 'CSV'
                                                                      ? '/assets/icons/new/image_attachment.svg'
                                                                      : Type === 'JPG' ||
                                                                        Type === 'JPEG' ||
                                                                        Type === 'PNG' ||
                                                                        Type === 'PSD' ||
                                                                        Type === 'WEBP' ||
                                                                        Type === 'JPE' ||
                                                                        Type === 'GIF' ||
                                                                        Type === 'SVG' ||
                                                                        Type === 'PCD' ||
                                                                        Type === 'JIF' ||
                                                                        Type === 'BMP' ||
                                                                        Type === 'AVIF' ||
                                                                        Type === 'jpg' ||
                                                                        Type === 'jpeg' ||
                                                                        Type === 'png' ||
                                                                        Type === 'psd' ||
                                                                        Type === 'webp' ||
                                                                        Type === 'jpe' ||
                                                                        Type === 'gif' ||
                                                                        Type === 'svg' ||
                                                                        Type === 'pcd' ||
                                                                        Type === 'jif' ||
                                                                        Type === 'bmp' ||
                                                                        Type === 'avif'
                                                                        ? '/assets/icons/new/image_attachment.svg'
                                                                        : '/assets/icons/new/image_attachment.svg'
                                                              }
                                                            />
                                                            {/* }
                                                            /> */}
                                                          </div>
                                                        </ArrowTooltips>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <ArrowTooltips
                                                          title={attachmentsOriginalNames?.map(
                                                            (item, i) => index == i && item,
                                                          )}
                                                          placement="top-start"
                                                        >
                                                          <div>
                                                            {/* <GenericTooltip
                                                            placement="top"
                                                            title={attachmentsOriginalNames?.map(
                                                              (item, i) =>
                                                                index == i &&
                                                                item
                                                            )}
                                                            component={ */}
                                                            <Image
                                                              className="files-icon d-flex align-items-end"
                                                              width="24px"
                                                              height="24px"
                                                              alt="attachment"
                                                              onClick={() => {
                                                                const title = attachmentsOriginalNames.find(
                                                                  (attachment, i) => index === i,
                                                                );
                                                                handleClickDoc(item, Type, title);
                                                              }}
                                                              src={
                                                                //icon for type pdf
                                                                Type == 'pdf' || Type === 'PDF'
                                                                  ? '/assets/icons/new/pdf_attachment.svg'
                                                                  : // icon for types doc and docx
                                                                  Type === 'doc' ||
                                                                    Type === 'docx' ||
                                                                    Type === 'DOC' ||
                                                                    Type === 'DOCX'
                                                                    ? '/assets/icons/new/doc_attachment.svg'
                                                                    : Type === 'xls' ||
                                                                      Type === 'xlsx' ||
                                                                      Type === 'XLS' ||
                                                                      Type === 'XLSX' ||
                                                                      Type === 'CSV' ||
                                                                      Type === 'csv'
                                                                      ? '/assets/icons/new/image_attachment.svg'
                                                                      : Type === 'JPG' ||
                                                                        Type === 'JPEG' ||
                                                                        Type === 'PNG' ||
                                                                        Type === 'PSD' ||
                                                                        Type === 'WEBP' ||
                                                                        Type === 'JPE' ||
                                                                        Type === 'GIF' ||
                                                                        Type === 'SVG' ||
                                                                        Type === 'PCD' ||
                                                                        Type === 'JIF' ||
                                                                        Type === 'BMP' ||
                                                                        Type === 'AVIF' ||
                                                                        Type === 'jpg' ||
                                                                        Type === 'jpeg' ||
                                                                        Type === 'png' ||
                                                                        Type === 'psd' ||
                                                                        Type === 'webp' ||
                                                                        Type === 'jpe' ||
                                                                        Type === 'gif' ||
                                                                        Type === 'svg' ||
                                                                        Type === 'pcd' ||
                                                                        Type === 'jif' ||
                                                                        Type === 'bmp' ||
                                                                        Type === 'avif'
                                                                        ? '/assets/icons/new/image_attachment.svg'
                                                                        : '/assets/icons/new/image_attachment.svg'
                                                              }
                                                            />
                                                            {/* }
                                                            /> */}
                                                          </div>
                                                        </ArrowTooltips>
                                                      </>
                                                    )}
                                                    <p className="medium">
                                                      {attachmentsOriginalNames?.map(
                                                        (item, i) =>
                                                          index == i && (
                                                            <span>
                                                              {item.length > 5 ? item.slice(0, 5) + '...' + Type : item}
                                                            </span>
                                                          ),
                                                      )}
                                                    </p>
                                                  </span>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </>
                                      ))
                                    : ''}
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="text-center d-flex flex-column justify-content-center align-items-center"
                      style={{ height: '85%' }}
                    >
                      <Image
                        src="/assets/icons/new/thinking_girl.svg"
                        className="mx-auto"
                        width="200px"
                        height="300px"
                        alt="background"
                      />
                      <div className="px-5">
                        <p className="light-bold">No Briifs Available</p>
                        <p className="px-5">
                          There is no content available to show. If you want to create briif click on the Create button
                          on left side
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div
              className="text-center d-flex flex-column justify-content-center align-items-center"
              style={{ height: '85%' }}
            >
              <Image
                src="/assets/icons/new/thinking_girl.svg"
                className="mx-auto"
                width="200px"
                height="300px"
                alt="background"
              />
              <div className="px-5">
                <p className="light-bold">No Briifs Available</p>
                <p className="px-5">
                  There is no content available to show. If you want to create briif click on the add Create button on
                  left side
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <style>{`#tbody::-webkit-scrollbar{	width: 0px;}`}</style>
    </>
  );
};
export default BriffDetails;
