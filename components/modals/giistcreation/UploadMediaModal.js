/** 
this modal is being used in the giistsGreation and mediaLibrary on basis of conditions  
**/
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UserGiists from '../../combine/user_profile/publishedgiists/UserGiists';
import { useRef, useState } from 'react';
import PrimaryDragdrop from '../../kh_components/drag&drop/PrimaryDragdrop';
import ModalMediaForm from './ModalMediaForm';
import { URL } from '../../../public/assets/path/path';
import { useEffect } from 'react';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import MediaCollection from '../../../redux/actions/MediaCollection';
import { useDispatch } from 'react-redux';
import MediaSkeleton from '../../kh_components/medialibrary/MediaSkeleton';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';
import EditMediaModal from '../../combine/vidoeedition/EditMediaModal';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
  },
  centeringContent: {
    textAlign: 'center',
  },
  flexSpaceBtwn: {
    display: 'flex',
    justifyContent: 'space-between',
    aligItems: 'center',
  },
  btnTabActive: {
    width: 'auto',
    height: '44px',
    background: '#353452',
    borderRadius: '12px',
    color: '#FFFFFF !important',
    m: 1,
    fontFamily: 'Gilroy-Regular !important',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#353452',
      textShadow: 'none',
    },
  },
  btnTabInactive: {
    width: 'auto',
    height: '44px',
    background: 'rgba(53, 52, 82, 0.2)',
    borderRadius: '12px',
    color: '#00000 !important',
    m: 1,
    fontFamily: 'Gilroy-Regular !important',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    textTransform: 'capitalize',
    '&:hover': {
      background: 'rgba(53, 52, 82, 0.2)',
      textShadow: 'none',
    },
  },
  modHeading: {
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '25px',
  },
  cardStyle: {
    border: '1px solid #C0C0C0',
    borderRadius: '12px',
    height: '60vh',
    // overflow: 'hidden',
    // overflowY: 'scroll',
    boxShadow: 'none',
  },
  firstTabPane: { border: '2px dashed #4E6AFE', boxShadow: 'none', height: '50vh', borderRadius: '12px' },
  flexColumn: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: 7 },
  buttonUpdateVideo: {
    width: '226px',
    height: '44px',
    background: '#353452',
    borderRadius: '12px',
    color: '#FFFFFF !important',
    '&:hover': {
      background: '#353452',
    },
  },
  previewSection: {
    border: '1px solid rgba(53, 52, 82, 0.3)',
    height: '100%',
    borderRadius: '12px',
    p: 1,
    position: 'relative',
  },
  activeTabsStyles: {
    alignItems: 'self-start !important',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    pt: 3,
    pb: 3,
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '25px',
    fontSize: 18,
    textShadow: 'none',
    display: 'flex',
    color: 'blue !important',
    justifyContent: 'center',
    '&:hover': {
      textShadow: 'none',
    },
  },
  inactiveTabsStyles: {
    alignItems: 'self-start !important',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    pt: 3,
    pb: 3,
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '25px',
    fontSize: 18,
    textShadow: 'none',
    display: 'flex',
    color: '#000000 !important',
    justifyContent: 'center',
    '&:hover': {
      textShadow: 'none',
    },
  },
  tabHeading: {
    fontFamily: 'Gilroy-Regular !important',
    fontStyle: 'normal',
    fontWeight: '550',
    fontSize: '24px',
    lineHeight: '30px',
  },
  tabSubheading: {
    fontFamily: 'Gilroy-Regular !important',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: '18px',
    opacity: 0.6,
  },
  emptyStyleBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pt: 10,
  },
  emptyBoxTypo: { fontWeight: '600', fontSize: '20px', lineHeight: '25px', textAlign: 'center' },
  emptyBoxSubTypo: {
    pt: 2,
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'center',
    width: '30%',
  },
  modalButton: {
    background: '#353452',
    color: '#FFFFFF !important',
    textTransform: 'capitalize',
    height: '30px',
    width: '30%',
    borderRadius: '10px',
    '&:hover': {
      background: '#353452',
    },
  },
  disabledModalButton: {
    background: 'grey',
    color: '#FFFFFF !important',
    textTransform: 'capitalize',
    height: '48px',
    width: '30%',
    borderRadius: '10px',
    '&:hover': {
      background: 'grey',
    },
  },
};

const UploadMediaModal = ({
  openModal,
  handleCloseModal,
  mediatabValue,
  accessToken,
  refreshMedias,
  S3_BUCKET,
  REGION,
  AccessKeyId,
  SecretAccessKey,
  setErrorinModal,
  handleOpenSuccessErrorModal,
  chapterTabIndex,
  giistSubChapMediaCreate,
  giistChapMediaCreate,
  indexForMedia,
  subindexForMedia,
  setDotProgressLoading,
  DotProgressLoading,
  platformData,
  chaptersCreateRes,
  awsLink,
  setDimensions,
}) => {
  const {
    modalStyle,
    flexSpaceBtwn,
    btnTabActive,
    btnTabInactive,
    modHeading,
    cardStyle,
    previewSection,
    tabHeading,
    tabSubheading,
    emptyStyleBox,
    emptyBoxTypo,
    emptyBoxSubTypo,
    modalButton,
    disabledModalButton,
  } = style;
  // console.log(S3_BUCKET, REGION, AccessKeyId, SecretAccessKey, 'chapter tab index');
  const theme = useTheme();
  const videoRef = useRef(null);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const matches = useMediaQuery('min-width:400px');

  const [parentFirstTab, setParentFirstTab] = useState('a');
  const [parentSecondTab, setParentSecondTab] = useState('');

  const [modalMediatabValue, setModalMediatabValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [uploadForm, setUploadForm] = useState(0);

  // uploading file progress bar code
  // ===============> https://codesandbox.io/s/7r85h?file=/src/App.js:192-228 use this link to upload progress
  // end uploading file progress bar code

  // form states, will be set on modalmediaform
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');

  // thumbnail states and thumbnail uploading states
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState('');
  const [thumbnailData, setThumbnailData] = useState({});

  const [thumnailUploadStatus, setThumnailUploadStatus] = useState('');
  // console.log(thumbnailData?.name, 'thumbnail file is here');

  const isSafari =
    typeof window != 'undefined' &&
    (/constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)));

  const mediaLibraryTabHandler = (event, newValue) => {
    setModalMediatabValue(newValue);
  };

  const acceptImages = {
    'image/png': [],
    'image/jpg': [],
    'image/jpeg': [],
    'image/svg': [],
    'image/gif': [],
  };
  const acceptVideos = {
    'video/mp4': [],
    'video/wmv': [],
    // 'video/avi': [],
    'video/ogg': [],
  };
  const acceptAudios = {
    'audio/mpeg': [],
    'audio/mp3': [],
    // 'audio/webm': [],
    // 'audio/avi': [],
  };
  const acceptDocs = {
    'text/*': [],
    'application/pdf': [],
    'application/powerpoint': [],
    'application/msword': [],
    'application/docx': [],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    'application/msexcel': [],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    'application/vnd.ms-powerpoint': [],
    'applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation': [],
    'application/vnd.ms-excel': [],
  };

  // to process and draga n drop files
  const thumbs = files.map((file) =>
    file.type == 'image/png' ||
    file.type == 'image/jpg' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/svg' ||
    file.type == 'image/gif' ? (
      <div style={{ borderRadius: '12px' }} key={file.name}>
        <Image
          style={{ borderRadius: '10px' }}
          src={file.preview}
          height={200}
          width={300}
          fill
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <p className="fw-bold">{file.name}</p>
      </div>
    ) : file.type == 'video/mp4' || file.type == 'video/wmv' || file.type == 'video/ogg' ? (
      <div
        style={{
          position: 'absolute',
          aspectRatio: '16/10',
          // height: '100%',
          // width: '100%',
        }}
        key={file.name}
      >
        <video
          width="100%"
          height="90%"
          controls
          muted
          ref={videoRef}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          onLoadedData={() => {
            setDimensions({ height: videoRef.current?.videoHeight, width: videoRef.current?.videoWidth });
          }}
          style={{ borderRadius: '12px' }}
        >
          <source src={file.preview} type="video/mp4" />
          <source src={file.preview} type="video/wmv" />
          {/* <source src={file.preview} type="video/avi" /> */}
          <source src={file.preview} type="video/ogg" />
          <source src={file.preview} type="video/webm" />
        </video>
        <p className="fw-bold">{file.name}</p>
      </div>
    ) : file.type == 'audio/mpeg' ||
      file.type == 'audio/mp3' ||
      file.type == 'audio/acc' ||
      file.type == 'audio/avi' ? (
      <div className="row" style={{ borderRadius: '12px' }} key={file.name}>
        <audio
          controls
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        >
          <source src={file.preview} type="audio/mpeg" />
          <source src={file.preview} type="audio/mp3" />
          <source src={file.preview} type="audio/aac" />
          {/* <source src={file.preview} type="audio/avi" /> */}
          {/* <source src={file.preview} type="audio/webm" /> */}
        </audio>
        <p className="fw-bold">{file.name}</p>
      </div>
    ) : file.type == 'application/pdf' ||
      file.type == 'text/plain' ||
      file.type == 'text/csv' ||
      file.type == 'application/msword' ||
      file.type == 'application/docx' ||
      file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type == 'application/msexcel' ||
      file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
      <div className="row" style={{ borderRadius: '12px' }} key={file.name}>
        <iframe src={file.preview} height="200" width="300" />
        <p className="fw-bold">{file.name}</p>
      </div>
    ) : (
      <div className="text-center pt-5">
        Please upload <b>video/mp4, audio/mpeg or image/png</b>
      </div>
    ),
  );

  const gettingFileFileHandler = () => {
    files[0].name;
    // console.log(files[0].name, 'files[0].name;');
  };

  // upload media (video, audio and document functions)
  const makeId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const filenameChanger = (file) => {
    // const audioPathName = !chapterTabIndex ? 'mediaLibrary/audio/' : 'giists/audio/';
    const audioPathName = !chapterTabIndex ? 'mediaLibrary/audio/' : 'giists/audio/';
    const videoPathName = !chapterTabIndex ? 'mediaLibrary/video/' : 'temp/';
    const docPathName = !chapterTabIndex ? 'mediaLibrary/documents/' : 'giists/documents/';
    // console.log(file, 'file in filenamechanger');
    const filesTypes = files[0].type;
    // console.log(filesTypes, ' filesTypes');
    let randomName = makeId(20);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let platform_name = '';
    let quality = '';
    let api_extension = '';
    if (filesTypes == 'audio/mpeg') {
      // fileFormat = '.mpeg';
      fileFormat = '.aac';
      keyPrefix = 'audio';
      dirName = audioPathName;
      // platform_name = platformData.name + '_';
      // api_extension = '.mpeg';
      api_extension = '.aac';
    } else if (filesTypes == 'audio/mp3') {
      // fileFormat = '.mp3';
      fileFormat = '.aac';
      keyPrefix = 'audio';
      dirName = audioPathName;
      // platform_name = platformData.name + '_';
      // api_extension = '.mp3';
      api_extension = '.aac';
    } else if (filesTypes == 'audio/avi') {
      fileFormat = '.aac';
      keyPrefix = 'audio';
      dirName = audioPathName;
      // platform_name = platformData.name + '_';
      api_extension = '.aac';
    } else if (filesTypes == 'video/mp4' && isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = videoPathName;
      quality = '_720p';
      api_extension = '.mp4';
    } else if (filesTypes == 'video/wmv') {
      fileFormat = '.wmv';
      keyPrefix = 'video';
      dirName = videoPathName;
      quality = '_720p';
      api_extension = '.wmv';
    } else if (filesTypes == 'video/avi') {
      fileFormat = '.avi';
      keyPrefix = 'video';
      dirName = videoPathName;
      quality = '_720p';
      api_extension = '.avi';
    } else if (filesTypes == 'video/ogg') {
      fileFormat = '.ogg';
      keyPrefix = 'video';
      dirName = videoPathName;
      quality = '_720p';
      api_extension = '.ogg';
    } else if (filesTypes == 'video/mp4' && !isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = videoPathName;
      quality = '_720p';
      // platform_name = platformData.name + '_';
      api_extension = '.mp4';
    } else if (filesTypes == 'text/plain') {
      fileFormat = '.txt';
      keyPrefix = 'txt';
      dirName = docPathName;
      api_extension = '.txt';
    } else if (filesTypes == 'application/pdf') {
      fileFormat = '.pdf';
      keyPrefix = 'pdf';
      dirName = docPathName;
      api_extension = '.txt';
    }

    let data = {
      url: file,
      // name: keyPrefix + randomName + fileFormat,
      name: keyPrefix + randomName + quality + api_extension, // modified for transcoding
      dirName: dirName,
      newDirectory: videoPathName ? 'giists/video/' : 'giists/audio/',
      fileDBName: keyPrefix + randomName,
      extName: keyPrefix,
      type: fileFormat,
      filesTypes: filesTypes,
      // link: dirName + keyPrefix + randomName + api_extension,
      link: dirName + keyPrefix + randomName + quality + api_extension,
    };
    return data;
  };

  const uploadFileInput = () => {
    const data = filenameChanger(files[0]?.preview);
    if (data) {
      if (!chapterTabIndex) {
        console.log(data, 'data response in uploadfileinput');
        uploadThumbnail(thumbnailFile, thumbnailData);
        uploadFile(files[0], data);
      } else {
        uploadFile(files[0], data);
      }
    }
  };

  const uploadThumbnail = (file, data) => {
    if (file != null && data != {}) {
      const target = { Bucket: S3_BUCKET, Key: data.link, Body: file };
      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({
            region: REGION,
            credentials: {
              accessKeyId: AccessKeyId,
              secretAccessKey: SecretAccessKey,
            },
          }),
          partSize: 1024 * 1024 * 5000,
          leavePartsOnError: false, // optional manually handle dropped parts
          params: target,
        });

        parallelUploads3.on('httpUploadProgress', (progress) => {
          setThumnailUploadStatus('Uploaded thumbnail Successfully');
        });
        parallelUploads3.done();
      } catch (e) {
        setErrorinModal(e);
      }
    } else {
      ('');
    }
  };

  const uploadFile = async (file, data) => {
    // setDotProgressLoading(true);
    let target = {};

    target = { Bucket: S3_BUCKET, Key: data.link, Body: file, contentType: data.filesTypes };
    console.log(data.filesTypes, 'data.filesTypes');
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: REGION,
          credentials: { accessKeyId: AccessKeyId, secretAccessKey: SecretAccessKey },
        }),
        partSize: 1024 * 1024 * 10000,
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on('httpUploadProgress', async (progress) => {
        if (!chapterTabIndex) {
          addDataToMedia(data.name);
          handleOpenSuccessErrorModal();
          // handleCloseModal();
          console.log(progress, 'progressed file');
        } else {
          console.log('not for audio outside');
          if (
            data.filesTypes == 'video/mp4' ||
            data.filesTypes == 'video/wmv' ||
            data.filesTypes == 'video/avi' ||
            data.filesTypes == 'video/ogg'
          ) {
            console.log('not for audio');
            const transcoder = new ElasticTranscoder({
              region: REGION,
              credentials: {
                accessKeyId: AccessKeyId,
                secretAccessKey: SecretAccessKey,
              },
            });

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
                if (readResponse.Job.Status == 'Complete') {
                  clearInterval(intervalId);
                  if (!chaptersCreateRes?.data?.chapters[indexForMedia].subChapters.length) {
                    giistChapMediaCreate(indexForMedia, data.name, null, null, 1, 0);
                    // handleCloseModal();
                  } else {
                    giistSubChapMediaCreate(indexForMedia, subindexForMedia, data.name, null, null, 1, 0);
                    // handleCloseModal();
                  }
                }
              }, 1000);
            }
          } else {
            console.log('not for video');
            if (progress) {
              if (!chaptersCreateRes?.data?.chapters[indexForMedia].subChapters.length) {
                giistChapMediaCreate(indexForMedia, data.name, null, null, 5, 2);
              } else {
                giistSubChapMediaCreate(indexForMedia, subindexForMedia, data.name, null, null, 5, 2);
              }
            }
          }
        }
      });
      setDimensions({ height: 0, width: 0 });
      parallelUploads3.done();
    } catch (e) {
      // must make a modal to show error
      setErrorinModal(e);
      handleOpenSuccessErrorModal();
      console.log(e, 'catch statement');
    }
  };

  //
  console.log('thumbnailData =>', thumbnailData);
  const addDataToMedia = async (nameFile) => {
    var axios = require('axios');
    var data = JSON.stringify({
      title: uploadTitle,
      description: uploadDescription,
      imagename: thumbnailData?.name, // this image name will be thumbnail
      file_name: nameFile,
      type: String(mediatabValue),
    });
    console.log(data, 'my response data');
    await GlobalApiCall(
      `${URL.khbaseUrl}addMedia`,
      'post',
      data,
      function (response) {
        console.log(JSON.stringify(response.data), 'api name');
      },
      function (error) {
        console.log(error, 'this error in uploading media to db');
      },
    );
  };

  // All media library tab's code for giist creation
  const dispatch = useDispatch();
  const PER_PAGE = 6;
  const [videopage, setVideopage] = useState(1);
  const [audiopage, setAudiopage] = useState(1);
  const [documentpage, setDocumentpage] = useState(1);

  const [videoMedia, setVideoMedia] = useState(null);
  const [audioItems, setAudioItems] = useState(null);
  const [documentItems, setDocumentItems] = useState(null);

  const videonumberItems = videoMedia?.totalItems;
  const videoResponseItems = videoMedia?.items;

  const audionumberItems = audioItems?.totalItems;
  const audioResponseItems = audioItems?.items;

  const docnumberItems = documentItems?.totalItems;
  const docResponseItems = documentItems?.items;

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const params = `limit=${PER_PAGE}&page=${videopage}&type=0`;
    dispatch(MediaCollection(params, LoginData?.access_token, onMediaActionSuccess, onMediaActionError));

    const audioParams = `limit=${PER_PAGE}&page=${audiopage}&type=1`;
    dispatch(MediaCollection(audioParams, LoginData?.access_token, onAudioActionSuccess, onAudioActionError));

    const documentParams = `limit=${PER_PAGE}&page=${documentpage}&type=2`;
    dispatch(MediaCollection(documentParams, LoginData?.access_token, onDocumentActionSuccess, onDocumentActionError));
  }, [videopage]);

  const showingAllHandler = () => {
    const params = `limit=${PER_PAGE}&page=${videopage}&type=0`;
    dispatch(MediaCollection(params, accessToken, onMediaActionSuccess, onMediaActionError));
  };

  const dipatchAudioHandler = () => {
    const audioParams = `limit=${PER_PAGE}&page=${audiopage}&type=1`;
    dispatch(MediaCollection(audioParams, accessToken, onAudioActionSuccess, onAudioActionError));
  };

  const dipatchDocumentHandler = () => {
    const documentParams = `limit=${PER_PAGE}&page=${videopage}&type=2`;
    dispatch(MediaCollection(documentParams, accessToken, onDocumentActionSuccess, onDocumentActionError));
  };

  const onMediaActionSuccess = (res) => {
    setVideoMedia(res);
  };
  const onMediaActionError = (err) => {
    setVideoMedia(err);
  };

  const onAudioActionSuccess = (res) => {
    setAudioItems(res);
  };
  const onAudioActionError = (err) => {
    setAudioItems(err);
  };

  const onDocumentActionSuccess = (res) => {
    setDocumentItems(res);
  };
  const onDocumentActionError = (err) => {
    setDocumentItems(err);
  };

  const refreshGiistMediaRefresh = () => {
    showingAllHandler();
    dipatchAudioHandler();
    dipatchDocumentHandler();
  };

  const mediaToGiistAdditionHandler = (id, previewMediaTitle) => {
    console.log(id, previewMediaTitle, 'previewmedia title');
    if (subindexForMedia > 0 || subindexForMedia == 0) {
      console.log(indexForMedia, subindexForMedia, 'media library subchapter');
      giistSubChapMediaCreate(indexForMedia, subindexForMedia, previewMediaTitle, null, id);
    } else {
      console.log(indexForMedia, previewMediaTitle, null, id, 'else for all media');
      giistChapMediaCreate(indexForMedia, previewMediaTitle, null, id);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexSpaceBtwn} pb={2}>
          <Typography sx={modHeading}>
            {mediatabValue == 0
              ? 'Upload Video'
              : mediatabValue == 1
              ? 'Upload Audio'
              : mediatabValue == 2
              ? 'Upload Document'
              : 'Upload Media'}
          </Typography>
          <CloseIcon onClick={handleCloseModal} />
        </Box>
        <Divider />
        {/* {(!mediatabValue == 0 || !mediatabValue == 1 || !mediatabValue == 2) && ( */}
        {/* To hide Desktop and mediaLibrary buttons, !mediatabValue is added, to show just remove (!) */}
        {!mediatabValue == undefined && chapterTabIndex && (
          <Box pt={2} pb={2}>
            <Button
              variant="contained"
              onClick={() => {
                setParentFirstTab('a');
                setParentSecondTab('');
              }}
              sx={parentFirstTab == 'a' ? btnTabActive : btnTabInactive}
            >
              Desktop
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setParentFirstTab('');
                setParentSecondTab('b');
              }}
              sx={parentSecondTab == 'b' ? btnTabActive : btnTabInactive}
            >
              Media Library
            </Button>
          </Box>
        )}
        {/* above, To hide Desktop and mediaLibrary buttons, !mediatabValue is added, to show just remove (!) */}
        {mediatabValue == 0 || mediatabValue == 1 || mediatabValue == 2 ? (
          <Grid container spacing={2} mt={3} sx={{ height: '70vh', overflowY: 'scroll' }}>
            <Grid item lg={9} md={9} sm={6} xs={12}>
              {uploadForm == 0 && (
                <PrimaryDragdrop
                  files={files}
                  setFiles={setFiles}
                  mediatabValue={mediatabValue}
                  acceptImages={acceptImages}
                  acceptVideos={acceptVideos}
                  acceptAudios={acceptAudios}
                  acceptDocs={acceptDocs}
                />
              )}
              {uploadForm == 1 && (
                <ModalMediaForm
                  gettingFileFileHandler={gettingFileFileHandler}
                  setUploadForm={setUploadForm}
                  uploadTitle={uploadTitle}
                  setUploadTitle={setUploadTitle}
                  uploadDescription={uploadDescription}
                  setUploadDescription={setUploadDescription}
                  makeId={makeId}
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                  thumbnailFile={thumbnailFile}
                  setThumbnailFile={setThumbnailFile}
                  thumbnailData={thumbnailData}
                  setThumbnailData={setThumbnailData}
                  thumnailUploadStatus={thumnailUploadStatus}
                />
              )}
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              {thumbs.length == 0 ? (
                <Box sx={previewSection}>
                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {matches ? (
                      'No Files Uploaded Yet!'
                    ) : (
                      <Image
                        src="/assets/images/no-result-found.svg"
                        height={100}
                        width={100}
                        className="img-fluid"
                        alt="No Files Uploaded Yet!"
                      />
                    )}
                  </Box>
                </Box>
              ) : (
                <Box sx={previewSection}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: 'inherit',
                    }}
                  >
                    <Box>{thumbs}</Box>
                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        variant="text"
                        sx={{
                          color: 'red !important',
                          textTransform: 'capitalize',
                          '&:hover': { color: 'red', background: '#FFFFFF', textShadow: 'none' },
                        }}
                        onClick={() => {
                          setUploadForm(0);
                          setFiles([]);
                          setUploadTitle('');
                          setUploadDescription('');
                          setThumbnail(null);
                          setThumnailUploadStatus('');
                          filenameChanger();
                        }}
                      >
                        Delete
                      </Button>
                      {uploadForm == 0 && (
                        <Button sx={modalButton} onClick={() => setUploadForm(1)}>
                          Next
                        </Button>
                      )}
                      {uploadForm == 1 && (
                        <Button
                          sx={
                            uploadTitle.length > 5 && uploadDescription.length > 5 ? modalButton : disabledModalButton
                          }
                          disabled={uploadTitle.length > 5 && uploadDescription.length > 5 ? '' : true}
                          onClick={() => {
                            setUploadForm(1);
                            uploadFileInput();
                            refreshMedias();
                            // handleCloseModal();
                          }}
                        >
                          Finish
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        ) : (
          <>
            {/* Else case for Giists Creation modal in which buttons are activated */}
            {parentFirstTab == 'a' && (
              <Grid container spacing={2} sx={{ height: '100%', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <Grid item lg={9} md={9} sm={6} xs={12}>
                  <PrimaryDragdrop
                    files={files}
                    setFiles={setFiles}
                    chapterTabIndex={chapterTabIndex}
                    acceptImages={acceptImages}
                    acceptVideos={acceptVideos}
                    acceptAudios={acceptAudios}
                    acceptDocs={acceptDocs}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  {thumbs.length == 0 ? (
                    <Box sx={previewSection}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        No Files Uploaded Yet!
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={previewSection}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: 'inherit',
                        }}
                      >
                        <Box
                          sx={{
                            height: '300px',
                            overflow: 'scroll',
                            position: 'relative',
                            borderRadius: '12px',
                          }}
                        >
                          {thumbs}
                        </Box>
                        <Box sx={{ px: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Button
                              variant="text"
                              sx={{
                                color: 'red !important',
                                textTransform: 'capitalize',
                                '&:hover': { color: 'red', background: '#FFFFFF', textShadow: 'none' },
                              }}
                              onClick={() => {
                                setFiles([]);
                                filenameChanger();
                              }}
                            >
                              Delete
                            </Button>
                            {/* <Button
                              onClick={() => handleOpen()}
                              variant="text"
                              sx={{
                                color: '#222',
                                textTransform: 'capitalize',
                                '&:hover': { color: 'blue', background: '#FFFFFF', textShadow: 'none' },
                              }}
                            >
                              Edit
                            </Button> */}
                          </Box>
                          <Button
                            sx={modalButton}
                            onClick={() => {
                              setDotProgressLoading(true);
                              handleCloseModal();
                              uploadFileInput();
                            }}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            )}
            {parentSecondTab == 'b' && (
              <Card sx={cardStyle}>
                <CardContent>
                  <Box sx={{ flexGrow: 1, display: 'flex', height: '60vh', overflowY: isMobileScreen ? 'scroll' : '' }}>
                    <Grid container spacing={1} sx={{ height: 'inherit' }}>
                      {/* <Grid item md={2} sm={3} xs={12} mb={2} sx={{ height: '82%' }}>
                        <Tabs
                          orientation="vertical"
                          variant="scrollable"
                          value={modalMediatabValue}
                          onChange={mediaLibraryTabHandler}
                          aria-label="Vertical mediaLibrary tabs"
                          sx={{
                            background: '#F4FAFF',
                            borderRadius: '12px',
                            height: 'inherit',
                            pt: 2,
                            pb: 2,
                          }}
                          TabIndicatorProps={{ style: { background: 'transparent' } }}
                        >
                          <Tab
                            label="Videos"
                            {...mediaTabsProps(0)}
                            sx={modalMediatabValue == 0 ? activeTabsStyles : inactiveTabsStyles}
                            onClick={() => {
                              refreshGiistMediaRefresh();
                            }}
                          />
                          <Tab
                            label="Audios"
                            {...mediaTabsProps(1)}
                            sx={modalMediatabValue == 1 ? activeTabsStyles : inactiveTabsStyles}
                            onClick={() => {
                              refreshGiistMediaRefresh();
                            }}
                          />
                          <Tab
                            label="Documents"
                            {...mediaTabsProps(2)}
                            sx={modalMediatabValue == 2 ? activeTabsStyles : inactiveTabsStyles}
                            onClick={() => {
                              refreshGiistMediaRefresh();
                            }}
                          />
                        </Tabs>
                      </Grid> */}
                      {/* <Grid item md={10} sm={9} xs={12} mb={2} sx={{ height: 'inherit' }}> */}
                      <Grid item md={12} sm={12} xs={12} mb={2} sx={{ height: 'inherit' }}>
                        {/* <MediaTabPanel modalMediatabValue={modalMediatabValue} index={0}> */}
                        {chapterTabIndex == 0 && (
                          <>
                            {videoResponseItems == 0 ? (
                              <Box sx={emptyStyleBox}>
                                <Image
                                  src="/assets/images/video-play-icon.svg"
                                  height={55}
                                  width={55}
                                  alt="video play icon"
                                />
                                <Typography pt={3} sx={emptyBoxTypo}>
                                  Your Video Library is Empty
                                </Typography>
                                <Typography sx={emptyBoxSubTypo}>
                                  Upload Video to your media library by drag & drop or upload from your desktop
                                </Typography>
                              </Box>
                            ) : videoResponseItems !== undefined ? (
                              <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography mb={2} sx={tabHeading}>
                                    Media Library
                                    <Typography sx={tabSubheading}>(MP4, MOV) files are accepted</Typography>
                                  </Typography>
                                </Box>
                                <Grid
                                  container
                                  spacing={2}
                                  sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}
                                >
                                  {videoResponseItems.length > 0 &&
                                    videoResponseItems.map((item) => (
                                      <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
                                        <UserGiists
                                          id={item.id}
                                          title={item.title}
                                          chapterTabIndex={chapterTabIndex}
                                          previewMedia={item.file_name}
                                          thumbnail={awsLink + 'mediaLibrary/images/' + item.imagename}
                                          mediaToGiistAdditionHandler={mediaToGiistAdditionHandler}
                                          image=""
                                        />
                                      </Grid>
                                    ))}
                                </Grid>
                              </Box>
                            ) : (
                              <MediaSkeleton tabHeading={tabHeading} tabSubheading={tabSubheading} />
                            )}
                          </>
                        )}
                        {/* </MediaTabPanel> */}
                        {/* <MediaTabPanel modalMediatabValue={modalMediatabValue} index={1}> */}
                        {chapterTabIndex == 1 && (
                          <>
                            <Typography sx={tabHeading}>
                              Media Library 2<Typography sx={tabSubheading}>(MP3) files are accepted</Typography>
                            </Typography>

                            {audionumberItems == 0 ? (
                              <Box sx={emptyStyleBox}>
                                <Image
                                  src="/assets/images/microphone.svg"
                                  height={55}
                                  width={55}
                                  alt="video play icon"
                                />
                                <Typography pt={3} sx={emptyBoxTypo}>
                                  Your Audio Library is Empty
                                </Typography>
                                <Typography sx={emptyBoxSubTypo}>
                                  Upload audios to your media library by drag & drop or upload from your desktop
                                </Typography>
                              </Box>
                            ) : audioResponseItems !== undefined ? (
                              <Box pt={3}>
                                <Grid
                                  container
                                  spacing={2}
                                  sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}
                                >
                                  {audioResponseItems.length > 0 &&
                                    audioResponseItems.map((item) => (
                                      <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
                                        <UserGiists
                                          id={item.id}
                                          title={item.title}
                                          chapterTabIndex={chapterTabIndex}
                                          previewMedia={item.file_name}
                                          thumbnail={awsLink + 'mediaLibrary/images/' + item.imagename}
                                          mediaToGiistAdditionHandler={mediaToGiistAdditionHandler}
                                          image=""
                                        />
                                      </Grid>
                                    ))}
                                </Grid>
                              </Box>
                            ) : (
                              <MediaSkeleton tabHeading={tabHeading} tabSubheading={tabSubheading} />
                            )}
                          </>
                        )}
                        {/* </MediaTabPanel> */}
                        {/* <MediaTabPanel modalMediatabValue={modalMediatabValue} index={2}> */}
                        {chapterTabIndex == 2 && (
                          <>
                            <Typography sx={tabHeading}>
                              Media Library
                              <Typography sx={tabSubheading} mb={2}>
                                (PDF, Docx, txt) files are accepted
                              </Typography>
                            </Typography>

                            {docnumberItems == 0 ? (
                              <Box sx={emptyStyleBox}>
                                <Image
                                  src="/assets/images/document-text.svg"
                                  height={55}
                                  width={55}
                                  alt="video play icon"
                                />
                                <Typography pt={3} sx={emptyBoxTypo}>
                                  Your Document Library is Empty
                                </Typography>
                                <Typography sx={emptyBoxSubTypo}>
                                  Upload documents (.pdf / .ppt / .xlsx) to your media library by drag & drop or upload
                                  from your desktop
                                </Typography>
                              </Box>
                            ) : docResponseItems !== undefined ? (
                              <Grid
                                container
                                spacing={2}
                                sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}
                              >
                                {docResponseItems.length > 0 &&
                                  docResponseItems.map((item) => (
                                    <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
                                      <UserGiists
                                        id={item.id}
                                        title={item.title}
                                        chapterTabIndex={chapterTabIndex}
                                        previewMedia={item.file_name}
                                        thumbnail={awsLink + 'mediaLibrary/images/' + item.imagename}
                                        mediaToGiistAdditionHandler={mediaToGiistAdditionHandler}
                                        image=""
                                      />
                                    </Grid>
                                  ))}
                              </Grid>
                            ) : (
                              <MediaSkeleton tabHeading={tabHeading} tabSubheading={tabSubheading} />
                            )}
                          </>
                        )}

                        {/* </MediaTabPanel> */}
                      </Grid>
                    </Grid>
                  </Box>
                  {/*  */}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Box>
    </Modal>

    //
  );
};

export default UploadMediaModal;
