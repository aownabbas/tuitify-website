import React, { useState, useEffect } from 'react';
import Message from './Message';
import InteractionFooter from './InteractionFooter.js';
import EmptyInteraction from './EmptyInteraction';
import interactionData from '../../../../redux/actions/Interaction';
import interactionDelete from '../../../../redux/actions/InteractionDelete';
import interactionInsertComment from '../../../../redux/actions/InteractionInsertComment';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';
import moment from 'moment';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import styles from './message/VideoInteraction.module.css';
import CustomScrollbar from '../../../combine/CustomScrollbar.js/CustomScrollbar';
import { makeIdAWS } from '../../../../utils/constants/makeIdAWS';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';

const Interaction = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.sidebar);

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

  const [value, setValue] = useState('');

  const [briifId, setBriifId] = useState('');
  const [textField, setTextField] = useState(false);

  const [lastVideoFile, setLastVideoFile] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [button, setButton] = useState('');

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  //loading
  const [interactionsLoading, setInteractionsLoading] = useState(false);

  const [interactionDeleteData, setInteractionDeleteData] = useState({
    status: '',
    message: '',
  });

  const [insertCommentData, setInsertCommentData] = useState({
    status: '',
    message: '',
  });

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;
  var awsBucketPipelineId = process.env.NEXT_PUBLIC_AWS_BUCKET_TRANSCODE_PIPLINE_ID;
  var awsBucketPresetId = process.env.NEXT_PUBLIC_AWS_BUCKET_PRESET_ID;

  const filenameChanger = (file, type, doc_type) => {
    setInteractionsLoading(true);
    let randomName = makeIdAWS(20);
    setInteractionsLoading(true);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let api_extension = '';
    let platform_name = '';
    let quality = '';

    if (type == 'mp3') {
      fileFormat = '.mp3';
      keyPrefix = 'audio';
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
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = 'temp/';
      platform_name = getPlatData.name + '_';
      quality = '_720p';
      api_extension = '.mp4';
      setLastVideoFile(file);
    } else if (type == 'doc') {
      keyPrefix = 'doc';
      if (doc_type == 'image/png') {
        fileFormat = '.png';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.png';
      } else if (doc_type == 'image/jpg') {
        fileFormat = '.jpg';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.jpg';
      } else if (doc_type == 'image/jpeg') {
        fileFormat = '.jpeg';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.jpeg';
      } else if (doc_type == 'image/gif') {
        fileFormat = '.gif';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.gif';
      } else if (doc_type == 'application/pdf') {
        fileFormat = '.pdf';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.pdf';
      } else if (doc_type == 'text/plain') {
        fileFormat = '.txt';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.txt';
      } else if (doc_type == 'application/msword') {
        fileFormat = '.doc';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.doc';
      } else if (doc_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fileFormat = '.docx';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.docx';
      } else if (doc_type == 'application/vnd.ms-powerpoint') {
        fileFormat = '.ppt';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.ppt';
      } else if (doc_type == 'application/vnd.ms-excel') {
        fileFormat = '.xls';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.xls';
      } else if (doc_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        fileFormat = '.xlsx';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.xlsx';
      } else if (doc_type == "mp4" || doc_type == "video/mp4") {
        fileFormat = '.mp4';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.mp4';
      } else if (doc_type == "mp3" || doc_type == "wav" || doc_type == "audio/mpeg") {
        fileFormat = '.mp3';
        dirName = 'briffs/interactions/documents/';
        api_extension = '.mp3';
      } else {
        alert("file not support")
      }
    }

    let data = {
      url: file,
      name: keyPrefix + randomName + quality + fileFormat,
      recording: keyPrefix,
      type: fileFormat,
      link: dirName + keyPrefix + randomName + quality + api_extension,
      fileDBName: keyPrefix + randomName,
    };
    return data;
  };
  const uploadFileInput = (file, seconds, type) => {
    setInteractionsLoading(true);
    const data = filenameChanger(file, type);
    setInteractionsLoading(true);
    fetch(file)
      .then((response) => response.blob())
      .then((blob) => {
        const blobFile = new File([blob], data.name, {
          type: blob.type,
          size: blob.size,
        });
        setInteractionsLoading(true);
        uploadFile(blobFile, seconds, data, type);
        setInteractionsLoading(true);
      });
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files[0], "this testing audio")
    if (e.target.files[0]) {
      setInteractionsLoading(true);
    }
    const data = filenameChanger(e.target.files[0], "doc", e.target.files[0]?.type);
    if (e.target.files[0] && data) {
      uploadFile(e.target.files[0], "0", data, e.target.files[0]?.type, e.target.files[0]?.name);
    }
  };
  const uploadFile = (file, seconds, data, type, originName) => {
    // setInteractionsLoading(true);
    console.log('type', type);
    let target = {};
    if (data.recording != 'audio' && isSafari) {
      target = { Bucket: awsBucket, Key: data.link, Body: file };
    } else if (data.recording == 'doc') {
      target = { Bucket: awsBucket, Key: data.link, Body: file, ContentType: data.type };
    } else {
      target = {
        Bucket: awsBucket,
        Key: data.link,
        Body: file,
      };
    }
    try {
      setInteractionsLoading(true);
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: awsBucketRegion,
          credentials: {
            accessKeyId: awsBucketKey,
            secretAccessKey: awsBucketSeKey,
          },
        }),
        partSize: 1024 * 1024 * 5000,
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });
      setInteractionsLoading(true);
      parallelUploads3.on('httpUploadProgress', async (progress) => {
        setInteractionsLoading(true);

        const transcoder = new ElasticTranscoder({
          region: awsBucketRegion,
          credentials: {
            accessKeyId: awsBucketKey,
            secretAccessKey: awsBucketSeKey,
          },
        });
        if (type == 'mp3') {
          setInteractionsLoading(true);
          const input = {
            PipelineId: awsBucketPipelineId,
            OutputKeyPrefix: 'briffs/interactions/audio/',
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
                PresetId: awsBucketPresetId,
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
                handleInsertComment(data.name, null, seconds, 'mp3');
              }
            }, 1000);
          } else {
            console.log('transcoding failure');
          }
        } else if (data.recording == 'doc') {
          setInteractionsLoading(true);
          handleInsertComment(data.name, null, '0', 'doc', originName);
        } else {
          setInteractionsLoading(true);
          const input = {
            PipelineId: awsBucketPipelineId,
            OutputKeyPrefix: 'briffs/interactions/video/',
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
                handleInsertComment(data.name, null, seconds, 'mp4');
              }
            }, 1000);
          } else {
            console.log('transcoding failure');
          }
        }
      });
      parallelUploads3.done();
      setInteractionsLoading(false);
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
        setId(id);
        const platform_id = LoginData.platform_id;
        setPlatformId(platform_id);
        if (briifId != '') {
          const params = `platform_id=${GetPlatData.platform_id}&briff_id=${briifId}&user_id=${id}`;
          dispatch(interactionData(params, onInteractionsSuccess));
        }
      }
    }
    return () => { };
  }, [briifId]);

  const handleInteractionData = (briif_id) => {
    const params = `name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&briff_id=${briif_id}&user_id=${id}`;
    dispatch(interactionData(params, onInteractionsSuccess, onInteractionsError));
  };
  const onInteractionsSuccess = (res) => {
    setInteractionsLoading(false);
    props.setInteractionsData(res.data);
  };
  const onInteractionsError = (err) => {
    props.setInteractionsLoading(false);
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('There was some problem while showing interactions. Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="70%" alt="alert" />);
    setButton('Try again');
  };

  const handleInteractionDelete = (commentId, briif_id) => {
    setBriifId(briif_id);
    const params = `platform_id=${getPlatData.platform_id}&briff_id=${briif_id}&user_id=${id}&comment_id=${commentId}`;
    dispatch(interactionDelete(params, onInteractionDeleteSuccess, onInteractionDeleteError));
    handleInteractionData(briif_id);
  };
  const onInteractionDeleteSuccess = (res) => {
    handleInteractionData(props.playBriifId);
    setInteractionDeleteData(res.data);
  };
  const onInteractionDeleteError = (err) => {
    setInteractionsLoading(false);
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="70%" alt="alert" />);
    setButton('Try again');
  };

  const handleInsertComment = (link, message, duration, type, originName) => {

    setInteractionsLoading(true);

    const notification_time = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    const date = moment().format('YYYY MMM DD, hh:mm A');

    let params;

    switch (type) {
      case 'text':
        params = `user_id=${id}&platform_id=${getPlatData.platform_id}&link&message=${message}&parent_id&date=${date}&notification_time=${notification_time}&name=${getPlatData.name}&briff_id=${props.playBriifId}&type=${type}`;
        break;
      case 'mp4':
      case 'mp3':
      case 'doc':
        params = `user_id=${id}&platform_id=${getPlatData.platform_id}&link=${link}&audio_duration=${duration}&parent_id&date=${date}&notification_time=${notification_time}&name=${getPlatData.name}&briff_id=${props.playBriifId}&type=${type}&originalName=${originName}`;
        break;
      default:
        // Handle unknown type here (if needed)
        break;
    }

    dispatch(interactionInsertComment(params, onInteractionInsertCommentSuccess, onInteractionInsertCommentError));
  };

  const onInteractionInsertCommentSuccess = (res) => {
    if (res.data.status == "true") {
      setInsertCommentData(res.data);
      handleInteractionData(props.playBriifId);
    } else {
      setInteractionsLoading(false);
      setModalOpen(true);
      setTitle('Something went wrong');
      setDescription('Some problem has been occur while posting your Interaction. Let’s give it another try');
      setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="70%" alt="alert" />);
      setButton('Try again');
    }
  };
  const onInteractionInsertCommentError = (err) => {
    setInteractionsLoading(false);
    setModalOpen(true);
    setTitle('Something went wrong');
    setDescription('Some problem has been occur while posting your Interaction. Let’s give it another try');
    setImage(<Image src="/assets/icons/new/red_alert.svg" className="" width="65px" height="70%" alt="alert" />);
    setButton('Try again');
  };

  const threeDummyArray = [1, 2, 3];
  const fourDummyArray = [1, 2, 3, 4];

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

      <div className="linear-transparent position-relative" style={{ height: '100%' }}>
        <div className="py-3 row px-3 px-md-0 mx-md-0 px-0 border-bottom border-2">
          <p className="col-6 m-0 d-flex align-items-center semibold">Interactions</p>
          <p className="col-6 m-0 d-flex justify-content-end h-100 align-items-center medium text-nowrap">
            {data != 'unreceive' && data != 'unsent' && data != 'unarchived' && data != 'draft' ? (
              <>{props.interactionsData.interactions.length}</>
            ) : (
              'No'
            )}{' '}
            Interactions
          </p>
        </div>

        <div style={{ height: '100%' }} className={styles.hover_container} >
          <div className="p-0 m-0" style={{ zIndex: 20000 }}>
            <>
              {props.interactionsLoading == true || interactionsLoading == true ? (
                <div style={{ height: '70vh', overflow: 'scroll' }}>
                  {fourDummyArray.map((item, index) => {
                    return (
                      <div className="mt-3" key={index} style={{ overflow: 'scroll' }}>
                        <div className="row">
                          <div className="col-2 mx-1">
                            <Skeleton
                              className="ms-2 position-relative overflow-hidden text-center"
                              animation="wave"
                              style={{ borderRadius: '50% 50% 50% 50%' }}
                              variant="circular"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="col-9">
                            <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 3 }} />
                            <Skeleton animation="wave" height={15} width="30%" style={{ marginBottom: 10 }} />
                          </div>
                        </div>
                        <div className="text-center ">
                          <Skeleton
                            variant="rectangular"
                            height={70}
                            className="mx-auto"
                            animation="wave"
                            width="70%"
                            style={{ marginBottom: 20, borderRadius: '10px' }}
                          />
                        </div>
                        <div className="d-inline-flex ms-5">
                          {threeDummyArray.map((item, index) => {
                            return (
                              <>
                                <div className="col-2 mx-2" key={index}>
                                  <Skeleton
                                    className="position-relative overflow-hidden text-center"
                                    animation="wave"
                                    style={{
                                      borderRadius: '50% 50% 50% 50%',
                                    }}
                                    variant="circular"
                                    width={25}
                                    height={25}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <Skeleton
                          animation="wave"
                          height={5}
                          width="90%"
                          className="mx-auto"
                          style={{ marginBottom: 3 }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  {props.interactionsData.interactions.length == 0 ? (
                    <div className="align-items-center vh-100">
                      <EmptyInteraction
                        handleAudioClose={handleAudioClose}
                        handleVideoClose={handleVideoClose}
                        handleAudioOpen={handleAudioOpen}
                        handleVideoOpen={handleVideoOpen}
                        handleInsertComment={handleInsertComment}
                        audioOpen={audioOpen}
                        videoOpen={videoOpen}
                        uploadFileInput={uploadFileInput}
                        setInteractionsLoading={setInteractionsLoading}
                        interactionsLoading={interactionsLoading}
                        handleInteractionData={handleInteractionData}
                        playBriifId={props.playBriifId}
                        handleFileUpload={handleFileUpload}
                      />
                    </div>
                  ) : (
                    <CustomScrollbar height={textField ? '58vh' : "64vh"}>
                      {props.interactionsData.interactions.map((item, index) => {
                        return (
                          <Message
                            key={item.id}
                            lastVideoFile={index == 0 ? lastVideoFile : ''}
                            handleInteractionData={handleInteractionData}
                            handleInteractionDelete={handleInteractionDelete}
                            setBriifId={setBriifId}
                            briifId={briifId}
                            audio_duration={item.audio_duration}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            id={item.id}
                            briif_id={item.briff_id}
                            briif_user_id={item.briff_user_id}
                            celebration={item.celeberation}
                            celebrationByMe={item.celeberationbyme}
                            created={item.created}
                            idea={item.idea}
                            ideaByMe={item.ideabyme}
                            image={item.image}
                            likes={item.likes}
                            likedByMe={item.likedbyme}
                            link={item.link}
                            message={item.message}
                            myBriff={item.myBriff}
                            ownComment={item.ownComment}
                            thumbnail={item.thumbnail}
                            title={props.playBriifTitle}
                            type={item.type}
                            user_id={item.user_id}
                            handleAudioMessageClose={handleAudioMessageClose}
                            handleVideoMessageClose={handleVideoMessageClose}
                            handleAudioMessageOpen={handleAudioMessageOpen}
                            handleVideoMessageOpen={handleVideoMessageOpen}
                            audioMessageOpen={audioMessageOpen}
                            videoMessageOpen={videoMessageOpen}
                            setInteractionsData={props.setInteractionsData}
                            //loading
                            setInteractionsLoading={setInteractionsLoading}
                            interactionsLoading={interactionsLoading}
                            interactionsData={props.interactionsData}
                            originalName={item.originalName}
                          />
                        );
                      })}
                    </CustomScrollbar>
                  )}
                </>
              )}
            </>
          </div>
          <div
            className={value.trim() ? "" : `${styles['interaction-footer-wrapper']}`}
            style={{ position: 'absolute', bottom: 0, width: '100%' }}
          >
            {props.interactionsData.interactions.length > 0 && (
              <InteractionFooter
                handleInsertComment={handleInsertComment}
                handleInteractionData={handleInteractionData}
                playBriifId={props.playBriifId}
                setInteractionsLoading={setInteractionsLoading}
                interactionsLoading={interactionsLoading}
                uploadFileInput={uploadFileInput}
                handleAudioClose={handleAudioClose}
                handleVideoClose={handleVideoClose}
                handleAudioOpen={handleAudioOpen}
                handleVideoOpen={handleVideoOpen}
                audioOpen={audioOpen}
                videoOpen={videoOpen}
                value={value}
                setValue={setValue}
                textField={textField}
                setTextField={setTextField}
                handleFileUpload={handleFileUpload}
              />
            )}
          </div>

        </div>
      </div>
    </>
  );
};
export default Interaction;
