import React, { useState, useEffect } from 'react';
import COLORS from '../../../../public/assets/colors/colors';
import moment from 'moment';
import forwardBriif from '../../../../redux/actions/Forward';
import { useDispatch } from 'react-redux';
import ForwardModal from '../../../modals/forwardmodal/ForwardModal';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';
import Image from 'next/image';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import CustomScrollbar from '../../../combine/CustomScrollbar.js/CustomScrollbar';
import ArrowTooltips from '../../../modals/tooltip/Tooltip';
import { Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
const ReceviedBriifs = (props) => {
  const useStyles = makeStyles({
    menu: {
      borderRadius: '10px',
      boxShadow: `rgba(149, 157, 165, 0.4) 0px 8px 24px !important`,
      zIndex: 100,
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [button, setButton] = useState('');

  const [getPlatData, setGetPlatData] = useState(null);

  const [loginAccessToken, setLoginAccessToken] = useState('');
  const [attechmentcheck, setAttachmentcheck] = useState(false);
  useEffect(() => {
    props.receivedBriifsData;
    {
      props.attechmentimg == '' ? setAttachmentcheck(false) : setAttachmentcheck(true);
    }
    props.is_read;
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
  }, [props]);

  let type = props.type;

  const [archive, setArchive] = useState(false);
  const [deletedBriifModal, setDeletedBriifModal] = useState(false);
  const [archivedBriifModal, setArchivedBriifModal] = useState(false);
  const [unArchivedBriifModal, setUnArchivedBriifModal] = useState(false);
  const [forwardBriifModal, setForwardBriifModal] = useState(false);

  const handleDeleteBriifModalOpen = () => setDeletedBriifModal(true);
  const handleArchivedBriifModalOpen = () => setArchivedBriifModal(true);
  const handleUnArchivedBriifModalOpen = () => setUnArchivedBriifModal(true);
  const handleForwardBriifModalOpen = () => {
    const params = `platform_id=${getPlatData.platform_id}&id=${platformId}&user_id=${id}`;
    dispatch(forwardBriif(params, loginAccessToken, onForwardBriifSuccess, onForwardBriifError));
    setForwardBriifModal(true);
  };
  const onForwardBriifSuccess = (res) => {
    props.setForwardBriifData(res.data);
  };

  const onForwardBriifError = (err) => {
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" width="65px" alt="alert" height="70%" />);
    setButton('Try again');
  };

  const handleDeleteBriifModalClose = () => setDeletedBriifModal(false);
  const handleArchivedBriifModalClose = () => setArchivedBriifModal(false);
  const handleUnArchivedBriifModalClose = () => setUnArchivedBriifModal(false);
  const handleForwardBriifModalClose = () => setForwardBriifModal(false);

  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L',
  };

  let textDate = '';
  let noUTCdate = '';

  if (moment.utc(props.created).isValid()) {
    if (moment.utc(props.created).fromNow().includes('ago')) {
      textDate = moment.utc(props.created).fromNow();
    } else {
      const formattedDate = moment.utc(props.created).format('YYYY-MM-DD HH:mm:ss');
      textDate = moment(formattedDate).fromNow();
      noUTCdate = formattedDate.split(' ')[0];
    }
  }

  console.log('textDate', textDate);
  let ok = moment.utc('2022-04-07T10:36:32').fromNow();

  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleIconClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget); // Set anchorEl to the icon element
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setHovered(false);
  };

  const hideMenuShow = useRef();
  useOnClickOutside(hideMenuShow, () => handleCloseMenu());

  return (
    <>
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
      <div className={props.playBriifId == props.id ? 'bg-briif-play' : 'bg-briif-hover'}>
        <div className="row col-12  gx-0 px-1 d-flex align-items-center text-white py-3 parent-div">
          <div
            className="col-xxl-3 col-lg-3 col-md-2 col-sm-2 col-3 px-2"
            onClick={() => {
              props.setBriifId(props.id);
              props.setBriifAId(props.a_id);
              props.setBriifCount(props.count);
              props.setBriifAction(props.action);
              props.handlePlayedBriif(props.id, props.a_id, props.count, props.title);
              {
                props.action === 'recive' &&
                  props.is_read == '0' &&
                  (props.setIsRead(props.is_read), props.handleReadBriif(props.id, props.a_id, props.is_read));
              }
            }}
          >
            {type == 'mp3' || type == 'audio' ? (
              <>
                {props.thumbnail == 'undefined.png' || props.thumbnail == 'undefined' || !props.thumbnail ? (
                  <div
                    className="position-relative  me-2 bg-white d-flex justify-content-center align-items-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50% 50% 0% 50%',
                    }}
                  >
                    {getPlatData ? getPlatData == (null || {}) ? '' : <div className="position-relative"></div> : ''}
                    {/*Aown: In received briifs there is changes about styling of icons of video and audio */}
                    <div className="position-absolute start-50 translate-middle" style={{ marginTop: '30px' }}>
                      <Image src="/assets/icons/new/voice.svg" width="10px" height="15px" alt="ic_mic" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="position-relative me-2 d-flex justify-content-center align-items-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50% 50% 0% 50%',
                    }}
                  >
                    {props.thumbnail ? (
                      <div className="position-relative">
                        <Image
                          className="overflow-hidden text-center"
                          style={{ borderRadius: '50% 50% 0% 50%' }}
                          width="40px"
                          height="40px"
                          src={`${awsLink}briffs/images/${props.thumbnail}`}
                          alt="Received Briif"
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    {/*Aown: In received briifs there is changes about styling of icons of video and audio */}
                    <div className="position-absolute start-50 translate-middle" style={{ marginTop: '19px' }}>
                      <Image src="/assets/icons/creationicons/ic_mic.png" width="10px" height="15px" alt="mic" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {props.thumbnail == 'undefined.png' || props.thumbnail == 'undefined' || !props.thumbnail ? (
                  <div
                    className="position-relative me-2 bg-white d-flex justify-content-center align-items-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50% 50% 0% 50%',
                    }}
                  >
                    {/*Aown: In received briifs there is changes about styling of icons of video and audio */}
                    {getPlatData ? getPlatData == (null || {}) ? '' : <div className="position-relative"></div> : ''}
                    <div className="position-absolute start-50 translate-middle" style={{ marginTop: '30px' }}>
                      <Image src="/assets/icons/new/Video.svg" width="16px" height="16px" alt="mic" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="position-relative me-2 d-flex justify-content-center align-items-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50% 50% 0% 50%',
                    }}
                  >
                    {props.thumbnail ? (
                      <div className="position-relative">
                        <Image
                          className=""
                          style={{ borderRadius: '50% 50% 0% 50%' }}
                          width="40px"
                          height="40px"
                          src={`${awsLink}briffs/images/${props.thumbnail}`}
                          alt="Received Briif"
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    {/*Aown: In received briifs there is changes about styling of icons of video and audio */}
                    <div className="position-absolute start-50 translate-middle" style={{ marginTop: '19px' }}>
                      <Image src="/assets/icons/creationicons/videocam.png" width="16px" height="11px" alt="videocam" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div
            className="col-xxl-9 col-xl-9 col-lg-9 col-sm-10 col-9 row gx-0 ps-xl-2 pe-0 "
            style={{ cursor: 'pointer' }}
          >
            <span
              className="col-12 text-start row p-0"
              onClick={() => {
                props.setBriifId(props.id);
                props.setBriifAId(props.a_id);
                props.setBriifCount(props.count);
                props.setBriifAction(props.action);
                props.handlePlayedBriif(props.id, props.a_id, props.count, props.title);

                {
                  props.action === 'recive' &&
                    props.is_read == '0' &&
                    (props.setIsRead(props.is_read), props.handleReadBriif(props.id, props.a_id, props.is_read));
                }
              }}
            >
              <div
                className={
                  props.action === 'recive'
                    ? 'd-flex align-items-center col-11 pe-0 ps-0 text-capitalize text-white medium-large '
                    : 'd-flex align-items-center col-11 pe-0 ps-0 text-capitalize text-white medium-large mb-1'
                }
              >
                {props.firstName != null ? (
                  <span className="medium-large text-white pe-1 d-flex align-items-center">
                    {`${
                      (props.firstName + ' ' + props.lastName).length > 9
                        ? (props.firstName + ' ' + props.lastName).slice(0, 8) + '...'
                        : props.firstName + ' ' + props.lastName
                    }`}
                    {props.action === 'recive' &&
                      (props.is_read ? (
                        props.is_read == '0' ? (
                          <span
                            className="d-flex position-relative ms-1 me-2 align-items-center"
                            style={{ height: '13px' }}
                          >
                            <i
                              className="rounded-circle p-1 position-absolute"
                              style={{
                                fontSize: '8px',
                                backgroundColor: COLORS.newColor,
                                bottom: '1.5px',
                              }}
                            ></i>
                          </span>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      ))}
                    {props.action != 'recive' &&
                      props.action != 'draft' &&
                      props.action != 'archive' &&
                      props.count != '0' &&
                      props.count != 'undefined' && (
                        <span
                          className="ps-1 pe-2 ms-1 text-white text-nowrap  badge medium-xlarge text-truncate"
                          style={{
                            borderRadius: '9px',
                            backgroundColor: COLORS.newColor,
                            fontSize: '10px',
                            padding: '2.2px 0px',
                          }}
                        >
                          + {props.count}
                        </span>
                      )}
                    <div className="mx-1  text-nowrap d-flex align-items-center  text-white regular-xxsmall">
                      <span className="text-white regular-xxsmall me-1" style={{ textTransform: 'none' }}>
                        {textDate.includes('a few seconds ago')
                          ? textDate.replace('a few seconds ago', 'just now')
                          : textDate.includes(' seconds')
                          ? textDate.replace(' seconds', ' s')
                          : textDate.includes('a minute')
                          ? textDate.replace('a minute', ' 1 m')
                          : textDate.includes(' minutes')
                          ? textDate.replace(' minutes', ' m')
                          : textDate.includes('an hour')
                          ? textDate.replace('an hour', ' 1 h')
                          : textDate.includes(' hours')
                          ? textDate.replace(' hours', ' h')
                          : textDate.includes('a day')
                          ? textDate.replace('a day', ' 1 d')
                          : textDate.includes(' days')
                          ? textDate.replace(' days', ' d')
                          : textDate.includes('a week')
                          ? textDate.replace('a week', ' 1 w')
                          : textDate.includes(' weeks')
                          ? textDate.replace(' weeks', ' w')
                          : textDate.includes('a month')
                          ? textDate.replace('a month', '1 mo')
                          : textDate.includes(' months')
                          ? textDate.replace(' months', ' mo')
                          : textDate.includes('a year')
                          ? textDate.replace('a year', '1y')
                          : textDate.includes(' years')
                          ? textDate.replace(' years', ' y')
                          : ''}
                      </span>
                      {attechmentcheck ? (
                        <Image src="/assets/icons/attementsIcons.svg" alt="attements" width="14px" height="14px" />
                      ) : (
                        ''
                      )}
                    </div>
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className="col-1 p-0 d-flex justify-content-end text-white regular-xxsmall">
                <div className="hover-icon">
                  <Image
                    src="/assets/images/Group 1171281365.svg"
                    alt="add"
                    width={18}
                    height={18}
                    onClick={(event) => handleIconClick(event)}
                  />
                </div>
              </div>

              <h6 className="pe-0 ps-0 medium text-white mb-1 text-truncate">{props.title}</h6>
              <span className="text-white ps-0 pe-0 light-small text-truncate" style={{ maxWidth: '200px' }}>
                {props.description}
              </span>
            </span>
            <span className="d-flex justify-content-end mt-0 mb-0 ps-4">
              {props.action == 'recive' && (
                <DummyDeleteModal
                  openModal={deletedBriifModal}
                  handleCloseModal={handleDeleteBriifModalClose}
                  image={'/assets/images/trash.svg'}
                  heading="Delete"
                  text="Are you sure about delete this Briif?"
                  buttonText1="No"
                  buttonText2="Yes"
                  handleClick={() => props.handleDeleteReceivedBriif(props.id, props.a_id, props.action)}
                />
              )}
              {props.action == 'sent' && (
                <DummyDeleteModal
                  openModal={deletedBriifModal}
                  handleCloseModal={handleDeleteBriifModalClose}
                  image={'/assets/images/trash.svg'}
                  heading="Delete"
                  text="Are you sure about delete this Briif?"
                  buttonText1="No"
                  buttonText2="Yes"
                  handleClick={() => props.handleDeleteSendBriif(props.id, props.a_id, props.action)}
                />
              )}
              {props.action == 'draft' && (
                <DummyDeleteModal
                  openModal={deletedBriifModal}
                  handleCloseModal={handleDeleteBriifModalClose}
                  image={'/assets/images/trash.svg'}
                  heading="Delete"
                  text="Are you sure about delete this Briif?"
                  buttonText1="No"
                  buttonText2="Yes"
                  handleClick={() => props.handleDeleteDraftBriff(props.id, props.a_id, props.action)}
                />
              )}
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
                    props.action
                      ? props.handleArchivedBriif(
                          props.id,
                          props.a_id,
                          props.action === 'recive' ? '0' : props.count,
                          props.action,
                        )
                      : props.handleArchivedBriif(props.id, props.a_id, props.action === 'recive' ? '0' : props.count);
                  }}
                />
              )}
              {unArchivedBriifModal && (
                <DummyDeleteModal
                  openModal={unArchivedBriifModal}
                  handleCloseModal={handleUnArchivedBriifModalClose}
                  image={'/assets/icons/ic-archive.png'}
                  heading="Un Archived"
                  text="Are you sure about unarchiving this Briif?"
                  buttonText1="No"
                  buttonText2="Yes"
                  handleClick={() => props.handleUnArchivedBriif(props.id, props.a_id, props.action)}
                />
              )}
              {forwardBriifModal && (
                <ForwardModal
                  alertOpen={forwardBriifModal}
                  handleAlertClose={handleForwardBriifModalClose}
                  ForwardBriifData={props.ForwardBriifData}
                  briif_id={props.id}
                  handleRefreshBriifsData={
                    (props.action === 'sent' && props.handleSendBriifs) ||
                    (props.action === 'recive' && props.handleReceivedBriifs) ||
                    (props.action === 'archive' && props.handleArchivedBriifs) ||
                    (props.action === 'draft' && props.handleDraftBriffs)
                  }
                  setLoading={props.setLoading}
                  image={
                    <Image
                      src="/assets/icons/ic-mail-forward.png"
                      className=""
                      width="40px"
                      height="40px"
                      alt="forward"
                    />
                  }
                  title="Forward"
                  description="Please enter the name of recipient(s)."
                  button1="Forward"
                />
              )}
            </span>
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          classes={{ paper: classes.menu }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {props.action != 'archive' && (
            <ul
              onClick={() => {
                handleForwardBriifModalOpen();
                handleCloseMenu();
              }}
              style={{ cursor: 'pointer' }}
              className="px-1 m-0"
            >
              <li className="d-flex align-items-start py-1 px-2">
                <Image src="/assets/images/Group 1000002897.svg" alt="add" width={25} height={25} />
                <p className="d-flex align-items-center px-2 m-0 text-dark small-bold">Forward</p>
              </li>
            </ul>
          )}
          {props.action === 'recive' &&
            (props.is_read == '1' ? (
              <ul
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  props.setBriifId(props.id);
                  props.setIsRead(props.is_read);
                  props.setBriifAId(props.a_id);
                  props.handleUnReadBriif(props.id, props.a_id, props.is_read);
                  handleCloseMenu();
                }}
                className="px-1 m-0"
              >
                <li className="d-flex align-items-center py-1 px-2">
                  <Image src="/assets/images/unread-icon.svg" alt="add" width={25} height={25} />
                  <p className="d-flex align-items-center px-2  m-0 text-dark small-bold">Mark as Unread</p>
                </li>
              </ul>
            ) : (
              <ul
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  props.setBriifId(props.id);
                  props.setIsRead(props.is_read);
                  props.setBriifAId(props.a_id);
                  props.handleReadBriif(props.id, props.a_id, props.is_read);
                  handleCloseMenu();
                }}
                className="px-1 m-0"
              >
                <li className="d-flex align-items-center py-1 px-2">
                  <Image src="/assets/images/read.svg" alt="add" width={25} height={25} />
                  <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Mark as Read</p>
                </li>
              </ul>
            ))}
          {(props.action === 'recive' || props.action === 'sent') &&
            (props.pin_id ? (
              <ul
                onClick={() => {
                  props.setBriifId(props.id);
                  props.setBriifAId(props.a_id);
                  props.handleUnPinnedBriif(props.id, props.a_id);
                  handleCloseMenu();
                }}
                style={{ cursor: 'pointer' }}
                className="px-1 m-0"
              >
                <li className="d-flex align-items-center py-1 px-2 ">
                  <Image src="/assets/images/unpin-icon.svg" alt="add" width={25} height={25} />
                  <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Unpin</p>
                </li>
              </ul>
            ) : (
              <ul
                onClick={() => {
                  props.setBriifId(props.id);
                  props.setBriifAId(props.a_id);
                  props.handlePinnedBriif(props.id, props.a_id);
                  handleCloseMenu();
                }}
                style={{ cursor: 'pointer' }}
                className="px-1 m-0"
              >
                <li className="d-flex align-items-center py-1 px-2 ">
                  <Image src="/assets/images/pin icon.svg" alt="add" width={25} height={25} />
                  <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Pin</p>
                </li>
              </ul>
            ))}

          {(props.action === 'recive' || props.action === 'sent') && (
            <>
              <ul
                onClick={() => {
                  props.setBriifId(props.id);
                  props.action === 'recive' ? props.setBriifCount('0') : props.setBriifCount(props.count);
                  props.setBriifAId(props.a_id);
                  handleArchivedBriifModalOpen();
                  handleCloseMenu();
                }}
                style={{ cursor: 'pointer' }}
                className="px-1 m-0"
              >
                <li className="d-flex align-items-center py-1 px-2 ">
                  <Image src="/assets/images/archive.svg" alt="add" width={25} height={25} />
                  <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Archive</p>
                </li>
              </ul>
            </>
          )}

          {props.action === 'archive' && (
            <ul
              onClick={() => {
                props.setBriifId(props.id);
                props.setBriifAId(props.a_id);
                handleUnArchivedBriifModalOpen();
                handleCloseMenu();
              }}
              style={{ cursor: 'pointer' }}
              className="px-1 m-0"
            >
              <li className="d-flex align-items-center py-1 px-2 ">
                <Image src="/assets/images/unarchived-icon.svg" alt="add" width={25} height={25} />
                <p className="d-flex align-items-center px-2 m-0 text-dark small-bold">Unarchive</p>
              </li>
            </ul>
          )}

          {props.action == 'recive' && (
            <ul
              onClick={() => {
                props.setBriifId(props.id);
                props.setBriifAId(props.a_id);
                handleDeleteBriifModalOpen();
                handleCloseMenu();
              }}
              style={{ cursor: 'pointer' }}
              className="px-1 m-0"
            >
              <li className="d-flex align-items-center py-1 px-2 ">
                <Image src="/assets/images/delete.svg" alt="add" width={25} height={25} />
                <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Delete</p>
              </li>
            </ul>
          )}
          {props.action == 'sent' && (
            <ul
              onClick={() => {
                props.setBriifId(props.id);
                handleDeleteBriifModalOpen();
                handleCloseMenu();
              }}
              style={{ cursor: 'pointer' }}
              className="px-1 m-0"
            >
              <li className="d-flex align-items-center py-1 px-2 ">
                <Image src="/assets/images/delete.svg" alt="add" width={25} height={25} />
                <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Delete</p>
              </li>
            </ul>
          )}
          {props.action == 'draft' && (
            <ul
              onClick={() => {
                props.setBriifId(props.id);
                handleDeleteBriifModalOpen();
                handleCloseMenu();
              }}
              style={{ cursor: 'pointer' }}
              className="px-1 m-0"
            >
              <li className="d-flex align-items-center py-1 px-2 ">
                <Image src="/assets/images/delete.svg" alt="add" width={25} height={25} />
                <p className="d-flex align-items-center  px-2 m-0 text-dark small-bold">Delete</p>
              </li>
            </ul>
          )}
        </Menu>
        <hr className="text-light my-0 mx-auto" style={{ width: '85%' }} />
      </div>
    </>
  );
};

export default ReceviedBriifs;
