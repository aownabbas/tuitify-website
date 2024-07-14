import React, { useState, useRef, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Message from './Message';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import Skeleton from '@mui/material/Skeleton';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';
import giistPostComment from '../../../../redux/actions/GiistPostComment';
import giistDeleteComment from '../../../../redux/actions/GiistDeleteComment';
import GiistDocumentInteractionModal from './document/GiistDocumentInteractionModal';
import AudioInteractionModal from '../../../ch/chmainpage/interaction/interactionmodals/AudioInteractionModal';
import dynamic from 'next/dynamic';
import {
  CearComments,
  deleteLoadComments,
  InsertLoadComments,
  LoadComments,
} from '../../../../redux/actions/giist_comments/LoadComments';
import classes from '../../../../components/kh_components/mygiists/PlayGiistsVideo.module.css';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';
import InteractionSkeletonLoader from '../InteractionSkeletonLoader';
const DynamicVideoImport = dynamic(
  () => import('../../../ch/chmainpage/interaction/interactionmodals/VideoInteractionModal/DynamicVideoImport'),
  { ssr: false },
);

const Interaction = (props) => {
  const dispatch = useDispatch();
  const fetchedDatahere = useSelector((state) => state.interaction_comments);

  console.log(fetchedDatahere, 'fetched all data');

  const [comment, setComment] = useState('');
  const [openCommentsType, setOpenCommentsType] = useState(false);
  const [commentType, setCommentType] = useState(null);

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

  const [getPlatData, setGetPlatData] = useState({});

  const [videoOpen, setVideoOpen] = useState(false);
  const handleVideoOpen = () => setVideoOpen(true);
  const handleVideoClose = () => setVideoOpen(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const handleAudioOpen = () => setAudioOpen(true);
  const handleAudioClose = () => setAudioOpen(false);
  const [videoMessageOpen, setVideoMessageOpen] = useState(false);
  const handleVideoMessageOpen = () => setVideoMessageOpen(true);
  const handleVideoMessageClose = () => setVideoMessageOpen(false);
  const [audioMessageOpen, setAudioMessageOpen] = useState(false);
  const handleAudioMessageOpen = () => setAudioMessageOpen(true);
  const handleAudioMessageClose = () => setAudioMessageOpen(false);

  const [giistId, setGiistId] = useState('');

  const [lastVideoFile, setLastVideoFile] = useState('');

  const [documentModalOpen, setDocumentModalOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [button, setButton] = useState('');

  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  // .env aws credentials.

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [bearerToken, setBearerToken] = useState('');

  //loading
  const [interactionsLoading, setInteractionsLoading] = useState(false);
  const PER_PAGE = 4;

  const handleCommentSelect = (event) => {
    setCommentType(event.currentTarget);
  };

  const commentonEnterHandler = (event) => {
    if (event.key == 'Enter') {
      setComentHandler(event);
      handleInsertComment(comment, '0', '3');
      setComment('');
    }
  };
  const setComentHandler = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleInsertComment = (message, duration, comment_type, originName) => {
    // link, message, duration, type
    let data = {
      t_id: props.giist_id,
      comment: message,
      type: comment_type,
      duration: duration,
      originalName: originName,
    };

    setInteractionsLoading(true);
    dispatch(InsertLoadComments(data));
    setInteractionsLoading(false);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const closeCommentSelection = () => {
  //   setCommentType(null);
  // };

  const makeId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const filenameChanger = (file, type, doc_type) => {
    let randomName = makeId(20);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let platform_name = ' ';
    let quality = '';
    let api_extension = '';
    if (type == '2') {
      keyPrefix = 'document';

      if (doc_type == 'image/png') {
        fileFormat = '.png';
        dirName = 'giists/interactions/documents/';
        api_extension = '.png';
      } else if (doc_type == 'image/jpg') {
        fileFormat = '.jpg';
        dirName = 'giists/interactions/documents/';
        api_extension = '.jpg';
      } else if (doc_type == 'image/jpeg') {
        fileFormat = '.jpeg';
        dirName = 'giists/interactions/documents/';
        api_extension = '.jpeg';
      } else if (doc_type == 'image/svg') {
        fileFormat = '.svg';
        dirName = 'giists/interactions/documents/';
        api_extension = '.svg';
      } else if (doc_type == 'image/gif') {
        fileFormat = '.gif';
        dirName = 'giists/interactions/documents/';
        api_extension = '.gif';
      } else if (doc_type == 'application/pdf') {
        fileFormat = '.pdf';
        dirName = 'giists/interactions/documents/';
        api_extension = '.pdf';
      } else if (doc_type == 'text/plain') {
        fileFormat = '.txt';
        dirName = 'giists/interactions/documents/';
        api_extension = '.txt';
      } else if (doc_type == 'text/csv') {
        fileFormat = '.wav';
        dirName = 'giists/interactions/documents/';
        api_extension = '.csv';
      } else if (doc_type == 'application/msword') {
        fileFormat = '.doc';
        dirName = 'giists/interactions/documents/';
        api_extension = '.doc';
      } else if (doc_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fileFormat = '.docx';
        dirName = 'giists/interactions/documents/';
        api_extension = '.docx';
      } else if (doc_type == 'application/vnd.ms-powerpoint') {
        fileFormat = '.ppt';
        dirName = 'giists/interactions/documents/';
        api_extension = '.ppt';
      } else if (doc_type == 'application/vnd.ms-excel') {
        fileFormat = '.xls';
        dirName = 'giists/interactions/documents/';
        api_extension = '.xls';
      } else if (doc_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        fileFormat = '.xlsx';
        dirName = 'giists/interactions/documents/';
        api_extension = '.xlsx';
      } else if (doc_type == 'mp4' || doc_type == 'video/mp4') {
        fileFormat = '.mp4';
        dirName = 'giists/interactions/documents/';
        api_extension = '.mp4';
      } else if (doc_type == 'mp3' || doc_type == 'wav' || doc_type == 'audio/mpeg') {
        fileFormat = '.mp3';
        dirName = 'giists/interactions/documents/';
        api_extension = '.mp3';
      } else {
        console.log('file not supported');
      }
    }
    if (type == 'mp3') {
      fileFormat = '.mp3';
      keyPrefix = 'audio';
      // dirName = 'giists/interactions/audio/';
      dirName = 'temp/';
      platform_name = getPlatData.name + '_';
      quality = '';
      api_extension = '.mp3';
    } else if (type == 'mov' && isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = 'temp/';
      quality = '_720p';
      api_extension = '.mp4';
    } else if (type == 'mov' && !isSafari) {
      // fileFormat = ".webm";
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = 'temp/';
      platform_name = getPlatData.name + '_';
      quality = '_720p';
      api_extension = '.mp4';
      setLastVideoFile(file);
    }

    let data = {
      url: file,
      // name: keyPrefix + randomName + fileFormat,
      name: keyPrefix + randomName + quality + api_extension, // modified for transcoding
      dirName: dirName,
      newDirectory: 'giists/interactions/video/',
      fileDBName: keyPrefix + randomName,
      recording: keyPrefix,
      // type: fileFormat,
      type: doc_type !== undefined ? doc_type : fileFormat,
      // link: dirName + keyPrefix + randomName + api_extension,
      api_extension: api_extension,
      link: dirName + keyPrefix + randomName + quality + api_extension,
    };
    return data;
  };

  const uploadDocInput = (file, seconds, type, doc_type) => {
    if (file) {
      setInteractionsLoading(true);
    }
    const data = filenameChanger(file[0], type, doc_type);
    if (file[0] && data) {
      uploadFile(file[0], seconds, data, type, file[0]?.name);
    }
  };

  const uploadFileInput = (file, seconds, type) => {
    const data = filenameChanger(file, type);
    fetch(file)
      .then((response) => response.blob())
      .then((blob) => {
        const blobFile = new File([blob], data.name, {
          type: blob.type,
          size: blob.size,
        });

        uploadFile(blobFile, seconds, data, type);
      });
  };

  const uploadFile = (file, seconds, data, type, originName) => {
    let target = {};

    if (data.recording != 'audio' && isSafari) {
      target = { Bucket: awsBucket, Key: data.link, Body: file, contentType: data.type };
    } else {
      if (data.recording == 'document') {
        target = { Bucket: awsBucket, Key: data.link, Body: file, ContentType: data.type };
      } else {
        target = {
          Bucket: awsBucket,
          Key: data.link,
          Body: file,
          contentType: data.type,
        };
      }
    }
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: awsBucketRegion,
          credentials: {
            accessKeyId: awsBucketKey,
            secretAccessKey: awsBucketSeKey,
          },
        }),
        partSize: 1024 * 1024 * 5000,
        leavePartsOnError: false,
        params: target,
      });
      parallelUploads3.on('httpUploadProgress', async (progress) => {
        console.log(progress, 'this progress');
        const transcoder = new ElasticTranscoder({
          region: awsBucketRegion,
          credentials: {
            accessKeyId: awsBucketKey,
            secretAccessKey: awsBucketSeKey,
          },
        });
        if (type == 'mp3') {
          const input = {
            PipelineId: '1648287878784-pg0k02', // should be placed into env file
            OutputKeyPrefix: 'giists/interactions/audio/',
            Input: {
              Key: `temp/${data.name}`,
              FrameRate: 'auto',
              Resolution: 'auto',
              AspectRatio: 'auto',
              Interlaced: 'auto',
              Container: 'auto',
            },
            Outputs: [
              {
                Key: `${data.fileDBName}.mp3`,
                PresetId: '1351620000001-300020',
              },
            ],
          };
          const command = new CreateJobCommand(input);
          const response = await transcoder.send(command);
          //
          if (response.Job.Status == 'Submitted') {
            console.log(response, 'response job complete');
            const readJOb = new ReadJobCommand({
              Id: response.Job.Id,
            });

            let intervalId = setInterval(async () => {
              let readResponse = await transcoder.send(readJOb);
              console.log(readResponse, 'audio interaction response here');
              if (readResponse.Job.Status == 'Complete') {
                clearInterval(intervalId);
                console.log(readResponse, 'audio interaction read');
                handleInsertComment(data.name, seconds, '1', originName);
              }
            }, 1000);
          } else {
            console.log('transcoding failure');
          }
          //
        } else {
          if (data.recording == 'document') {
            handleInsertComment(data.name, '0', '2', originName);
          } else {
            const input = {
              PipelineId: '1648287878784-pg0k02', // should be placed into env file
              OutputKeyPrefix: data.newDirectory,
              Input: {
                Key: `temp/${data.name}`,
                FrameRate: 'auto',
                Resolution: 'auto',
                AspectRatio: 'auto',
                Interlaced: 'auto',
                Container: 'auto',
              },
              Outputs: [
                {
                  Key: `${data.fileDBName}_720p.mp4`,
                  Rotate: 'auto',
                  PresetId: '1642435993031-pywc5v', //720p 1351620000001-000010
                },
                {
                  Key: `${data.fileDBName}_480p.mp4`,
                  Rotate: 'auto',
                  PresetId: '1642436508504-uwtrsm', //480p 16:91351620000001-000020
                },
                {
                  Key: `${data.fileDBName}_360p.mp4`,
                  Rotate: 'auto',
                  PresetId: '1642436559045-lpenoo', //360 16:91351620000001-000040
                },
              ],
            };

            const command = new CreateJobCommand(input);
            const response = await transcoder.send(command);
            if (response.Job.Status == 'Submitted') {
              const readJOb = new ReadJobCommand({
                Id: response.Job.Id,
              });
              let intervalId = setInterval(async () => {
                let readResponse = await transcoder.send(readJOb);
                console.log(readResponse, 'response transcoding');
                if (readResponse.Job.Status == 'Complete') {
                  clearInterval(intervalId);
                  handleInsertComment(data.name, seconds, '0', originName);
                }
              }, 1000);
            }
          }
        }
      });
      parallelUploads3.done();
    } catch (e) {
      setInteractionsLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      // get full web url.
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
      if (LoginData) {
        const id = LoginData.id;
        setBearerToken(LoginData.access_token);
        setId(id);
        const platform_id = LoginData.platform_id;
        setPlatformId(platform_id);
      }
    }
    return () => {};
  }, [giistId]);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    dispatch(CearComments());
    // const params = `platform_id=${GetPlatData.platform_id}&id=${props.giist_id}&limit=${PER_PAGE}&page=${fetchedDatahere.page}`;
    const params = `platform_id=${GetPlatData.platform_id}&id=${props.giist_id}&limit=${PER_PAGE}&page=${'1'}`;
    dispatch(LoadComments(params));
  }, []);

  const handleInteractionData = () => {
    const params = `platform_id=${platformId}&id=${props.giist_id}&page=${fetchedDatahere.page}&limit=${PER_PAGE}`;
    dispatch(LoadComments(params));
  };

  const handleInteractionDelete = async (commentId, briif_id) => {
    setGiistId(props.giist_id);

    const varable = fetchedDatahere.items?.length;
    const lastCommentId = fetchedDatahere.items[fetchedDatahere.items?.length - 1]?.comment_id;
    const params = { commentId: commentId, last_comment_id: lastCommentId };

    await dispatch(deleteLoadComments(params));

    if (varable <= 4 && fetchedDatahere.page !== null) {
      const paramsComments = `platform_id=${getPlatData.platform_id}&id=${props.giist_id}&limit=4&page=${fetchedDatahere.page}`;
      await dispatch(LoadComments(paramsComments));
    }

    setInteractionsLoading(false);
  };

  const threeDummyArray = [1, 2, 3];
  const fourDummyArray = [1, 2, 3, 4];

  const listInnerRef = useRef(null);

  const handleScroll = async (e, pg) => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // const checkingSum = Math.floor(scrollTop) + clientHeight;
      const checkingSum = scrollTop + clientHeight;
      console.log(Math.ceil(checkingSum), scrollHeight, 'scrolling');
      if (
        checkingSum.toFixed(0) == scrollHeight ||
        Math.ceil(checkingSum) == scrollHeight ||
        Math.round(checkingSum) == scrollHeight ||
        Math.floor(checkingSum) == scrollHeight
      ) {
        // TO SOMETHING HERE
        if (fetchedDatahere.page == null) {
          return;
        } else {
          const params = `platform_id=${getPlatData.platform_id}&id=${props.giist_id}&limit=${PER_PAGE}&page=${fetchedDatahere.page}`;
          setInteractionsLoading(true);
          dispatch(LoadComments(params));
          setInteractionsLoading(false);
        }
      }
    }
  };

  const handleFileUpload = (event) => {
    uploadDocInput(event.target.files, '0', '2', event.target.files[0]?.type);
  };

  return (
    <>
      {documentModalOpen == true && (
        <GiistDocumentInteractionModal
          modalOpen={documentModalOpen}
          handleModalClose={() => {
            setDocumentModalOpen(false);
          }}
          setInteractionsLoading={setInteractionsLoading}
          interactionsLoading={interactionsLoading}
          handleInteractionData={handleInteractionData}
          handleInsertComment={handleInsertComment}
          uploadDocInput={uploadDocInput}
        />
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
      {videoOpen == true ? (
        <DynamicVideoImport
          videoOpen={videoOpen}
          setInteractionsLoading={setInteractionsLoading}
          interactionsLoading={interactionsLoading}
          uploadFileInput={uploadFileInput}
          handleVideoClose={handleVideoClose}
          handleInteractionData={handleInteractionData}
          handleInsertComment={handleInsertComment}
        />
      ) : (
        ''
      )}
      <AudioInteractionModal
        audioOpen={audioOpen}
        handleAudioClose={handleAudioClose}
        setInteractionsLoading={setInteractionsLoading}
        uploadFileInput={uploadFileInput}
        handleInsertComment={handleInsertComment}
      />
      <div className="d-flex mt-2 ">
        <div className="small-bold">Comments</div>
        <div className="regular-small ms-1">{fetchedDatahere?.totalItems}</div>
      </div>
      <div className={fetchedDatahere.loading == true ? `${classes.disabledbutton} row mt-3` : 'row mt-3'}>
        <div className="d-flex justify-content-between">
          <div style={{ width: '92%' }}>
            <div
              className={'d-flex align-items-center'}
              style={{
                background: 'none',
                border: '0.656338px solid #303548',
                borderRadius: '40px',
                padding: '11px',
              }}
            >
              <div className="w-100 ms-3 medium-large">
                <input
                  className="w-100"
                  style={{
                    background: 'none',
                    border: 'none',
                  }}
                  placeholder="Add comment"
                  type="text"
                  value={comment}
                  onChange={setComentHandler}
                  onKeyDown={(e) => commentonEnterHandler(e)}
                  onFocus={() => {
                    props.setPlaying(false);
                  }}
                  onBlur={() => {
                    props.setPlaying(true);
                  }}
                  // autofocus="autofocus"
                />
              </div>
              <div className="d-flex float-sm-end px-sm-1">
                <Image
                  src="/assets/icons/selectCommentype.png"
                  alt="Send messege"
                  width="24px"
                  height="24px"
                  onClick={(e) => {
                    setOpenCommentsType(!openCommentsType);
                    handleCommentSelect(e);
                  }}
                />
                <Popper open={openCommentsType} anchorEl={commentType} placement="top-end" transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper style={{ borderRadius: '50px 50px 4px 50px' }}>
                        <Box className="p-3">
                          <span className="d-flex">
                            <div
                              className="d-flex align-items-center pt-1"
                              onClick={() => {
                                setComment('');
                                // setDocumentModalOpen(true);
                                setOpenCommentsType(false);
                              }}
                            >
                              <label htmlFor="uploadDoc">
                                <Image
                                  src="/assets/icons/textImage.png"
                                  alt="Send messege"
                                  width="35px"
                                  height="35px"
                                />
                              </label>
                            </div>
                            <div
                              className="ms-3 d-flex align-items-center"
                              onClick={() => {
                                setComment('');
                                setVideoOpen(true);
                                setOpenCommentsType(false);
                              }}
                            >
                              <Image src="/assets/icons/ic_video.svg" alt="Send messege" width="35px" height="35px" />
                            </div>
                            <div
                              className="ms-3 d-flex align-items-center"
                              onClick={() => {
                                setComment('');
                                setAudioOpen(true);
                                setOpenCommentsType(false);
                              }}
                            >
                              <Image src="/assets/icons/ic_audio.svg" alt="Send messege" width="35px" height="35px" />
                            </div>
                          </span>
                        </Box>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <input
                  id="uploadDoc"
                  type="file"
                  name="file_upload"
                  accept="image/png, image/jpeg, image/jpg, image/gif, .pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.mp4,.webm"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center px-0">
            <Image
              src="/assets/icons/sendMessege.png"
              alt="Send messege"
              width="44px"
              height="44px"
              onClick={() => {
                handleInsertComment(comment, '0', '3');
                setComment('');
              }}
            />
          </div>
        </div>
      </div>
      {fetchedDatahere.items.length === 0 && !interactionsLoading && !fetchedDatahere.loading ? (
        <div
          className="mt-3"
          style={{
            height: '10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Gilroy-Medium',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '18px',
          }}
        >
          No Comments
        </div>
      ) : (
        <div
          className="mt-3"
          style={{
            height: '350px',
            overflowY: fetchedDatahere.items?.length >= 4 && 'scroll',
            overflowX: 'hidden',
          }}
        >
          {fetchedDatahere.loading == true || interactionsLoading == true ? (
            <>
              {fetchedDatahere.items.length === 0 ? (
                <InteractionSkeletonLoader skeletonObjArr={threeDummyArray} />
              ) : (
                fetchedDatahere.items.map((item, index) => (
                  <InteractionSkeletonLoader skeletonObjArr={threeDummyArray} index={index} />
                ))
              )}
            </>
          ) : (
            <div
              ref={listInnerRef}
              onScroll={async (e) => {
                console.log('scrolling');
                await handleScroll(e);
              }}
              style={{
                height: '350px',
                overflowY: fetchedDatahere.items?.length >= 4 && 'scroll',
                overflowX: 'hidden',
              }}
              className={classes.commentsSection}
            >
              {fetchedDatahere?.items?.map((item, index) => (
                <Message
                  key={index}
                  index={index}
                  lastVideoFile={index == 0 ? lastVideoFile : ''}
                  setComentHandler={setComentHandler}
                  handleInteractionData={handleInteractionData} // using
                  handleInteractionDelete={handleInteractionDelete}
                  firstName={item?.first_name}
                  lastName={item?.last_name}
                  id={item?.comment_id}
                  giist_id={props.giist_id}
                  celebration={item?.celebrations}
                  celebrationByMe={item?.likedbycelebration}
                  created={item?.created}
                  duration={item?.duration}
                  idea={item?.ideas}
                  ideaByMe={item?.likedbyidea}
                  image={item?.image}
                  likes={item?.likes}
                  likedByMe={item?.likedbyme}
                  comment={item?.comment}
                  link={item?.comment}
                  myBriff={item?.myBriff}
                  ownComment={item?.ownComment}
                  thumbnail={item?.thumbnail}
                  title={props.playBriifTitle}
                  type={item?.type}
                  user_id={item?.user_id}
                  handleAudioMessageClose={handleAudioMessageClose}
                  handleVideoMessageClose={handleVideoMessageClose}
                  handleAudioMessageOpen={handleAudioMessageOpen}
                  handleVideoMessageOpen={handleVideoMessageOpen}
                  audioMessageOpen={audioMessageOpen}
                  videoMessageOpen={videoMessageOpen}
                  setInteractionsLoading={setInteractionsLoading}
                  interactionsLoading={interactionsLoading}
                  fetchedDatahere={fetchedDatahere}
                  originalName={item?.originalName}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Interaction;
