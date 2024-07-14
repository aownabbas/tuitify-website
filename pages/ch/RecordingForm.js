import React, { useState, useEffect } from 'react';
import RecordingFormInputs from '../../components/ch/briifrecording/recordingform/RecordingFormInputs';
// whole web Colors file.
import COLORS from '../../public/assets/colors/colors';
import { useDispatch } from 'react-redux';
// success and faild modals.
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
import AlertModal from '../../components/modals/alertmodal/AlertModal';
//imports from redux.
import createBriif from '../../redux/actions/CreateBriif';
// forward ki imports
import forwardSelectedUsersBriif from '../../redux/actions/ForwardSelectedUsers';
import forwardSelectedGroupsBriif from '../../redux/actions/ForwardSelectedGroups';
import { withRouter, useRouter } from 'next/router';
import moment from 'moment';
//uploading ki imports
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
//image resize ki imports
import Resizer from 'react-image-file-resizer';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import DotProgress from '../../components/DotProgress';
import { makeIdAWS } from '../../utils/constants/makeIdAWS';
import TagInput from '../../components/ch/briifrecording/recordingform/TagInput';
import DummyDeleteModal from '../../components/modals/deletemodal/DummyDeleteModal';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';
import CustomScrollbar from '../../components/combine/CustomScrollbar.js/CustomScrollbar.js';

const isSafari =
  typeof window != 'undefined' &&
  (/constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)));

const RecordingForm = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let [clickButton, setClickButton] = useState('');

  // get platform data state.
  const [getPlatData, setGetPlatData] = useState({});

  // modal managing states.

  const [successErrorAlert, setSuccessErrorAlert] = useState(false);

  const [succErrorMessage, setSuccErrorMessage] = useState(null);

  const handleOpenAlert = ({ heading, message, buttonText, image, link, move }) => {
    setSuccErrorMessage({ heading, message, buttonText, image, link, move });
    setSuccessErrorAlert(true);
  };

  const handleColseAlert = () => {
    setSuccessErrorAlert(false);
  };

  // handle loader
  const [loading, setLoading] = useState(false);

  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkedGroups, setCheckedGroups] = useState([]);

  const [loginData, setLoginData] = useState(null);

  const checkedUserIds = checkedUsers?.map((user) => user.id);
  const checkedGroupsIds = checkedGroups?.map((group) => group.id);
  // .env aws credentials.

  // thumbnail data states.
  const [thumbnail, setThumbnail] = useState('/assets/icons/creationicons/addthumbnail.svg');
  const [thumbnailName, setThumbnailName] = useState('Upload Thumbnail');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailData, setThumbnailData] = useState({});

  //attachments states
  const [attachmentName, setAttachmentName] = useState([]);
  const [attachmentFile, setAttachmentFile] = useState([]);
  const [attachmentData, setAttachmentData] = useState([]);
  const [attachmentArray, setAttachmentArray] = useState([]);

  //sending loader loading state
  const [sendLoading, setSendLoading] = useState(false);

  // input handling states.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [titleError, setTitleError] = useState('');
  const [backModal, setBackModal] = useState(false);

  // forward selected users/ groups data states.
  const [usersId, setUsersId] = useState([]);
  const [groupsId, setGroupsId] = useState([]);
  const [value, setValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [attachmentItem, setAttachmentItem] = useState('');

  const [createBriifData, setCreateBriifData] = useState({
    briff_id: '',
    status: '',
    message: '',
  });

  // current date
  const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');

  // function for forwarding briif to the users.
  const handleForwardSelectedUsersBriif = (briff_id, checkedUserIds, checkedGroupsIds) => {
    let params = {
      briff_id: [briff_id.toString()],
    };
    if (selectedCheckbox == 1) {
      params.public = selectedCheckbox;
    } else {
      if (checkedUserIds.length) {
        params.id = checkedUserIds;
      }
      if (checkedGroupsIds.length) {
        params.group_id = checkedGroupsIds;
      }
    }
    // Dispatching action.
    dispatch(forwardSelectedUsersBriif(params, onForwardSelectedUsersBriifSuccess, onForwardSelectedUsersBriifError));
  };

  // this functions run if Forward to users Api response is true.
  const onForwardSelectedUsersBriifSuccess = (res) => {
    if (res.data.status == 'true') {
      // success modal open.
      handleOpenAlert({
        heading: 'SENT!',
        message: `The briif has been sent\nSuccessfully.`,
        buttonText: 'Okay',
        image: <Image src="/assets/icons/new/tick-circle.svg" className="" alt="tick" width="65px" height="70%" />,
        link: '/',
        // move: false,
      });
    }
  };

  // this functions run if Forward to users Api response is false.
  const onForwardSelectedUsersBriifError = (err) => {
    // error modal open.
    handleOpenAlert({
      heading: 'Something went wrong!',
      message: 'Let’s give it another try',
      buttonText: 'Try again',
      image: <Image src="/assets/icons/new/red_alert.svg" className="" alt="alert" width="65px" height="70%" />,
      move: false,
    });
  };

  // function for forwarding briif to the groups.
  const handleForwardSelectedGroupsBriif = (briff_id, groupsId) => {
    const params = `platform_id=${getPlatData.platform_id}&briff_id=[${createBriifData.briff_id}]&id=[${groupsId}]&user_id=${checkedUserIds}&date=${date}`;
    // dispatching Action.
    dispatch(
      forwardSelectedGroupsBriif(params, onForwardSelectedGroupsBriifSuccess, onForwardSelectedGroupsBriifError),
    );
  };

  // this functions run if Forward to groups Api response is true.
  const onForwardSelectedGroupsBriifSuccess = (res) => {
    handleOpenAlert({
      heading: 'SENT!',
      message: 'The briif has been sent\nSuccessfully.',
      buttonText: 'Okay',
      image: <Image src="/assets/icons/new/tick-circle.svg" className="" alt="tick" width="65px" height="70%" />,
      link: '/',
      // move: false
    });
  };

  // this functions run if Forward to groups Api response is false.
  const onForwardSelectedGroupsBriifError = (err) => {
    handleOpenAlert({
      heading: 'Something went wrong!',
      message: 'Let’s give it another try',
      buttonText: 'Try again',
      image: <Image src="/assets/icons/new/red_alert.svg" className="" alt="alert" width="65px" height="70%" />,
      move: false,
    });
  };

  var userids;
  const handleId = (ids) => {
    userids = ids;
  };

  const handleCreateBriifData = (link, buttonType) => {
    const params = {
      platform_id: getPlatData.platform_id,
      user_id: loginData?.id,
      title: title,
      description: description,
      thumbnail: thumbnailData.name,
      links: link,
      tags: String(tags),
      duration: props.router.query.seconds,
      type: props.router.query.type,
      attachments: String(attachmentName),
      attachments_names: String(attachmentFile),
    };
    if (buttonType == 'save') {
      if (selectedCheckbox == 1) {
        params.public = selectedCheckbox;
      } else {
        if (checkedUserIds.length) {
          params.receipt_users = checkedUserIds;
        }
        if (checkedGroupsIds.length) {
          params.receipt_groups = checkedGroupsIds;
        }
      }
    }
    dispatch(createBriif(params, onCreateBriifSuccess, onCreateBriifError, buttonType));
  };

  const onCreateBriifSuccess = (res, buttonType) => {
    setCreateBriifData(res.data);
    setSendLoading(false);
    setLoading(false);
    if (res.data.status == 'true') {
      console.log('buttonType', buttonType);
      if (buttonType == 'send') {
        handleForwardSelectedUsersBriif(res.data.briff_id, checkedUserIds, checkedGroupsIds);
      } else {
        handleOpenAlert({
          heading: 'Briif Save',
          message: 'The briif has been saved Successfully.',
          buttonText: 'Okay',
          image: <Image src="/assets/icons/new/tick-circle.svg" alt="tick" width="65px" height="70%" />,
          link: '/',
          // move: false,
        });
      }
    }
  };

  const onCreateBriifError = (err) => {
    setSendLoading(false);
    setLoading(false);
    handleOpenAlert({
      heading: 'Something went wrong!',
      message: 'Let’s give it another try',
      buttonText: 'Try again',
      image: <Image src="/assets/icons/new/red_alert.svg" className="" alt="alert" width="65px" height="70%" />,
      move: false,
    });
  };

  const filenameChanger = (file) => {
    let randomName = makeIdAWS(20);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let platform_name = '';
    let quality = '';
    let api_extension = '';

    if (props.router.query.type == 'mp3') {
      fileFormat = '.mp3';
      keyPrefix = 'audio';
      dirName = 'temp/';
      quality = '';
      platform_name = getPlatData.name + '_';
      api_extension = '.mp3';
    } else if (props.router.query.type == 'mp4' && isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = 'temp/';
      quality = '_720p';
      api_extension = '.mp4';
    } else if (props.router.query.type == 'mp4' && !isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'video';
      dirName = 'temp/';
      quality = '_720p';
      platform_name = getPlatData.name + '_';
      api_extension = '.mp4';
    }
    let data = {
      url: props.router.query.name,
      name: keyPrefix + randomName + quality + fileFormat,
      recording: keyPrefix,
      type: fileFormat,
      link: dirName + keyPrefix + randomName + quality + api_extension,
      fileDBName: keyPrefix + randomName,
    };
    return data;
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailName(e.target.files[0].name);
      let randomName = makeIdAWS(20);
      let fileFormat = '.png';
      let keyPrefix = 'thumbnail';
      let dirName = 'briffs/images/';
      let fileImage = '';
      if (e.target.files[0].size > 200000) {
        if (e.target.files[0].size < 500000) {
          e.target.files[0].name;
          Resizer.imageFileResizer(
            e.target.files[0], // Is the file of the image which will resized.
            1000,
            900,
            'PNG',
            100,
            0,
            (uri) => {
              console.log(uri);
              setThumbnail(uri);
              let file = fetch(uri)
                .then((r) => r.blob())
                .then(
                  (blobFile) => (
                    (fileImage = new File([blobFile], e.target.files[0].name, { type: 'image/png' })),
                    setThumbnailFile(fileImage)
                  ),
                );
              let data = {
                url: file,
                name: keyPrefix + randomName + fileFormat,
                type: fileFormat,
                link: dirName + keyPrefix + randomName + fileFormat,
              };
              setThumbnailData(data);
            },
            'base64',
          );
        } else {
          e.target.files[0].name;
          Resizer.imageFileResizer(
            e.target.files[0], // Is the file of the image which will resized.
            500,
            450,
            'PNG',
            100,
            0,
            (uri) => {
              setThumbnail(uri);
              let file = fetch(uri)
                .then((r) => r.blob())
                .then(
                  (blobFile) => (
                    (fileImage = new File([blobFile], e.target.files[0].name, { type: 'image/png' })),
                    setThumbnailFile(fileImage)
                  ),
                );
              let data = {
                url: file,
                name: keyPrefix + randomName + fileFormat,
                type: fileFormat,
                link: dirName + keyPrefix + randomName + fileFormat,
              };
              setThumbnailData(data);
            },
            'base64',
          );
        }
      } else {
        setThumbnail(URL.createObjectURL(e.target.files[0]));

        setThumbnailFile(e.target.files[0]);
        let data = {
          url: e.target.files[0],
          name: keyPrefix + randomName + fileFormat,
          type: fileFormat,
          link: dirName + keyPrefix + randomName + fileFormat,
        };
        setThumbnailData(data);
      }
    }
  };

  const onAttachmentChange = (e) => {
    let array = [...attachmentName]; // Copy the attachmentName array
    let arrayofattachments = [...attachmentData]; // Copy the attachmentData array
    const fileList = Array.from(e.target.files);
    let arrayfileName = [...attachmentFile];
    const newFiles = fileList.map((item) => {
      const randomName = makeIdAWS(10);
      const name = item.name.substr(item.name.lastIndexOf('.') + 1);
      const fullname = randomName + '.' + name;
      const keyPrefix = 'attachments';
      const dirName = 'briffs/documents/';
      array.push(keyPrefix + fullname);
      arrayofattachments.push({
        url: item,
        name: dirName + keyPrefix + fullname,
        link: keyPrefix + fullname,
      });
      arrayfileName.push(item.name);

      return item;
    });
    setAttachmentItem(URL.createObjectURL(newFiles[0])); // Assuming only one new file is added
    setAttachmentFile(arrayfileName);
    setAttachmentArray((s) => [...s, ...newFiles]);
    setAttachmentName(array);
    setAttachmentData(arrayofattachments);
  };

  const [selectedCheckbox, setSelectedCheckbox] = useState(2);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    setLoginData(getLoginData);
    setGetPlatData(GetPlatData);

    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;
  var awsBucketPipelineId = process.env.NEXT_PUBLIC_AWS_BUCKET_TRANSCODE_PIPLINE_ID;
  var awsBucketPresetId = process.env.NEXT_PUBLIC_AWS_BUCKET_PRESET_ID;

  const uploadAttachment = async (file, data) => {
    if (file != null && data != {}) {
      data.map((item) => {
        const part = data[0].link.split('.');
        const type = part[1];
        const target = {};

        if (type == 'pdf')
          target = {
            Bucket: awsBucket,
            Key: item.name,
            Body: item.url,
            ContentDisposition: 'inline',
            ContentType: 'application/pdf',
          };
        else target = { Bucket: awsBucket, Key: item.name, Body: item.url };
        try {
          const parallelUploads3 = new Upload({
            client: new S3Client({
              region: awsBucketRegion,
              credentials: { accessKeyId: awsBucketKey, secretAccessKey: awsBucketSeKey },
            }),
            partSize: 1024 * 1024 * 5000,
            leavePartsOnError: false, // optional manually handle dropped parts
            params: target,
          });
          parallelUploads3.on('httpUploadProgress', (progress) => {
            console.log(progress, 'sklgsk');
          });

          let data = parallelUploads3.done();
          return data;
        } catch (e) {
          console.log(e);
        }
      });
    } else {
    }
  };

  const uploadThumbnail = (file, data) => {
    if (file != null && data != {}) {
      const target = { Bucket: awsBucket, Key: data.link, Body: file };

      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({
            region: awsBucketRegion,
            credentials: { accessKeyId: awsBucketKey, secretAccessKey: awsBucketSeKey },
          }),
          partSize: 1024 * 1024 * 5000,
          leavePartsOnError: false, // optional manually handle dropped parts
          params: target,
        });
        parallelUploads3.on('httpUploadProgress', (progress) => {
          console.log(progress);
        });

        let data = parallelUploads3.done();
        return data;
      } catch (e) {
        console.log(e);
      }
    } else {
      ('');
    }
  };

  const handleMoveBack = async () => {
    setSendLoading(true);
    await router.push('/');
    setSendLoading(false);
  };

  const uploadFileInput = (buttonType) => {
    const data = filenameChanger(props.router.query.name);
    fetch(props.router.query.name)
      .then((response) => response.blob())
      .then((blob) => {
        const blobFile = new File([blob], data.name, {
          type: blob.type,
          size: blob.size,
        });
        uploadFile(blobFile, props.router.query.seconds, data, buttonType);
      })
      .catch((e) => {
        setSendLoading(false);
        setLoading(false);
        handleOpenAlert({
          heading: 'Something went wrong!',
          message: 'Let’s give it another try',
          buttonText: 'Try again',
          image: <Image src="/assets/icons/new/red_alert.svg" className="" alt="alert" width="65px" height="70%" />,
          move: false,
        });
      });
  };

  const uploadFile = async (file, seconds, data, buttonType) => {
    console.log(file);
    let target = {};
    console.log(data, 'data upload');

    if (data.recording != 'audio' && isSafari) {
      target = { Bucket: awsBucket, Key: data.link, Body: file, contentType: data.type };
    } else {
      target = {
        Bucket: awsBucket,
        Key: data.link,
        Body: file,
        contentType: data.type,
      };
    }

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: awsBucketRegion,
          credentials: { accessKeyId: awsBucketKey, secretAccessKey: awsBucketSeKey },
        }),
        partSize: 1024 * 1024 * 5000,
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on('httpUploadProgress', async (progress) => {
        const transcoder = new ElasticTranscoder({
          region: awsBucketRegion,
          credentials: {
            accessKeyId: awsBucketKey,
            secretAccessKey: awsBucketSeKey,
          },
        });
        if (data.recording == 'audio') {
          const input = {
            PipelineId: awsBucketPipelineId, // should be placed into env file
            OutputKeyPrefix: 'briffs/audio/',
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
                handleCreateBriifData(data.name, buttonType);
              }
            }, 1000);
          } else {
            console.log('transcoding failure');
          }
        } else {
          const input = {
            PipelineId: awsBucketPipelineId,
            OutputKeyPrefix: 'briffs/video/',
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
                handleCreateBriifData(data.name, buttonType);
              }
            }, 1000);
          } else {
            console.log('transcoding failure');
          }
        }
      });
      parallelUploads3.done();
    } catch (e) {
      setSendLoading(false);
      setLoading(false);
      handleOpenAlert({
        heading: 'Something went wrong!',
        message: 'Let’s give it another try',
        buttonText: 'Try again',
        image: <Image src="/assets/icons/new/red_alert.svg" className="" alt="alert" width="65px" height="70%" />,
        move: false,
      });
    }
  };

  const handleButtonClick = async (buttonType) => {
    // Prevent default behavior

    // Set the clickButton state based on the buttonType ('save' or 'send')

    // Check if the title is empty
    if (title == '') {
      setTitleError('Please fill the title first.');
      return;
    }

    // If the title is not empty, proceed further
    setSendLoading(true);
    // Check if thumbnailFile and thumbnailData are not null/empty
    if (thumbnailData) {
      await uploadThumbnail(thumbnailFile, thumbnailData);
    }
    // Check if attachmentFile and attachmentData are not null/empty
    if (attachmentData) {
      await uploadAttachment(attachmentFile, attachmentData);
    }
    uploadFileInput(buttonType);
    // Perform additional actions if needed (uploadFileInput function)
  };

  const onInputClick = (event) => {
    event.target.value = '';
  };

  return (
    <>
      {successErrorAlert == true && (
        <SuccessModal
          modalOpen={successErrorAlert}
          handleModalClose={handleColseAlert}
          image={succErrorMessage.image}
          title={succErrorMessage.heading}
          description={succErrorMessage.message}
          button1={succErrorMessage.buttonText}
          link={succErrorMessage.link}
          setDotProgressLoading={setLoading}
          giistPublishMove={succErrorMessage.move}
        />
      )}
      <>
        <Layout heading="Communication Hub">
          {(sendLoading || loading) && <DotProgress />}
          <div
            className="container-fluid col-12 row px-0 mt-0"
            style={{ backgroundColor: COLORS.white, borderRadius: '20px' }}
          >
            <div className="h3  d-flex align-items-center mb-0 px-4 d-inline-flex">
              <Image
                src="/assets/icons/new/back_arrow.svg"
                alt="back"
                width="17px"
                height="17px"
                className=""
                onClick={() => {
                  setBackModal(true);
                }}
              />
              {backModal == true && (
                <DummyDeleteModal
                  openModal={backModal}
                  handleCloseModal={() => {
                    setBackModal(false);
                  }}
                  image={'/assets/icons/danger.svg'}
                  heading="Alert"
                  text="Are you sure, you want to discard the briif?"
                  buttonText1="No"
                  buttonText2="Yes"
                  handleClick={() => handleMoveBack()}
                />
              )}
              <span className="semibold-large ps-4">Recording</span>
            </div>
            <CustomScrollbar height={'85vh'}>
              <div className=" row   mx-auto">
                <div className="d-flex col-12 col-lg-3 col-xl-2 flex-column justify-content-start align-items-center">
                  <div className="img-container d-flex align-items-end">
                    <div className="image-upload position-relative">
                      <label
                        htmlFor="file-input"
                        className={
                          thumbnail == '/assets/icons/creationicons/addthumbnail.svg'
                            ? 'rounded-circle position-relative'
                            : 'thumbnail-gradient-border rounded-circle mb-3 mt-3 position-relative'
                        }
                      >
                        <div className="module-gradient-border d-flex">
                          <Image
                            src={thumbnail}
                            width={thumbnail == '/assets/icons/creationicons/addthumbnail.svg' ? '155px' : '120px'}
                            height={thumbnail == '/assets/icons/creationicons/addthumbnail.svg' ? '155px' : '120px'}
                            alt="upload thumbnail"
                            className="rounded-circle upload-thumbnail-icon"
                          />
                        </div>
                      </label>
                      {thumbnail == '/assets/icons/creationicons/addthumbnail.svg' ? (
                        ''
                      ) : (
                        <span
                          className="position-absolute rounded-circle shadow"
                          style={{ width: '40px', height: '40px', bottom: '20px', right: '0px' }}
                        >
                          <Image
                            src="/assets/icons/new/circle_plus.svg"
                            width={40}
                            height={40}
                            className="rounded-circle"
                            alt="plus icon"
                          />
                        </span>
                      )}

                      <input
                        id="file-input"
                        accept="image/png, image/jpeg"
                        type="file"
                        className="d-none"
                        onChange={onImageChange}
                      />
                    </div>
                  </div>
                  <div className="text-secondary medium-large text-truncate" style={{ maxWidth: '170px' }}>
                    {thumbnailName}
                  </div>
                </div>
                <div className="row gx-0 d-flex col-12 col-xl-6 flex-column justify-content-start mx-auto p-0 align-items-center my-1">
                  <div className="col-12 col-md-10 col-lg-6 col-xl-8 recording-form-container">
                    <RecordingFormInputs
                      setDescription={setDescription}
                      description={description}
                      setTitle={setTitle}
                      title={title}
                      tags={tags}
                      setTags={setTags}
                      titleError={titleError}
                      setSearchInput={setSearchInput}
                      setValue={setValue}
                      value={value}
                      setUsersId={setUsersId}
                      usersId={usersId}
                      setGroupsId={setGroupsId}
                      groupsId={groupsId}
                      handleId={handleId}
                      checkedUsers={checkedUsers}
                      checkedGroups={checkedGroups}
                      setCheckedGroups={setCheckedGroups}
                      setCheckedUsers={setCheckedUsers}
                      setTitleError={setTitleError}
                      selectedCheckbox={selectedCheckbox}
                      setSelectedCheckbox={setSelectedCheckbox}
                    />
                  </div>
                </div>
                <div className="row gx-0 d-flex col-12 col-xl-4 flex-column   p-0 justify-content-start align-items-center align-items-xl-start  my-2">
                  <div className="col-12 col-md-10 col-lg-6 col-xl-8 recording-form-container">
                    <div className="row gx-0">
                      <div className="col-6">
                        <input
                          id="attachment-input"
                          type="file"
                          name="attachment-input"
                          className="d-none"
                          multiple
                          onClick={onInputClick}
                          onChange={(e) => {
                            onAttachmentChange(e);
                          }}
                          accept=".png, .jpeg, .jpg, .pdf, .xlsx, .xls, .ppt, .doc, .docx,"
                        />
                        <p className="medium-large">Attachments</p>
                        <p className="medium grey-view text-nowrap">Upload Your Attachments</p>
                      </div>
                      <div className="col-3 me-auto text-end">
                        <label htmlFor="attachment-input">
                          <Image
                            src="/assets/icons/new/gradient_upload.svg"
                            alt="upload"
                            width="32px"
                            height="32px"
                            className="upload-thumbnail-icon"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="row mt-5 gx-0">
                      {attachmentArray != null &&
                        attachmentArray.map((item, index) => {
                          const string = item.name?.substring(item.name.indexOf('@') + 1);

                          // item.name.slice(0, item.name.lastIndexOf("."));
                          const truncString = string.substring(0, 7);
                          let Type = item.name.substr(item.name.lastIndexOf('.') + 1);
                          // get full web url.
                          var full = window.location.host;
                          // separating full url by dot(.).
                          var parts = full.split('.');
                          console.log(full, parts);
                          // getting first part before first dot of the url.
                          var sub = parts[0];

                          return (
                            <div className="d-inline text-center mb-5 col-4 img-container mx-auto">
                              {Type != 'pdf' && Type != 'mp3' ? (
                                <>
                                  <Image
                                    src={
                                      //icon for type pdf
                                      Type == 'pdf'
                                        ? '/assets/icons/new/pdf_attachment.svg'
                                        : // icon for types doc and docx
                                        Type === 'doc' || Type === 'docx'
                                        ? '/assets/icons/new/doc_attachment.svg'
                                        : Type === 'xls' || Type === 'xlsx'
                                        ? // ? "/assets/icons/new/excel.svg"
                                          '/assets/icons/new/image_attachment.svg'
                                        : item.type.includes('image')
                                        ? '/assets/icons/new/image_attachment.svg'
                                        : // : "/assets/icons/new/other_attachments.png"
                                          '/assets/icons/new/image_attachment.svg'
                                    }
                                    width="30px"
                                    height="30px"
                                    className="text-center"
                                    alt="attachment"
                                  />
                                </>
                              ) : (
                                <Image
                                  src={
                                    //icon for type pdf
                                    Type == 'pdf'
                                      ? '/assets/icons/new/pdf_attachment.svg'
                                      : // icon for types doc and docx
                                      Type === 'doc' || Type === 'docx'
                                      ? '/assets/icons/new/doc_attachment.svg'
                                      : Type === 'xls' || Type === 'xlsx'
                                      ? // ? "/assets/icons/new/excel.svg"
                                        '/assets/icons/new/image_attachment.svg'
                                      : item.type.includes('image')
                                      ? '/assets/icons/new/image_attachment.svg'
                                      : // : "/assets/icons/new/other_attachments.png"
                                        '/assets/icons/new/image_attachment.svg'
                                  }
                                  width="30px"
                                  height="30px"
                                  className="text-center"
                                  alt="attachment"
                                />
                              )}
                              <span
                                className="rounded-circle text-dark  bg-white  shadow-sm badge"
                                style={{ position: 'absolute', top: 0 }}
                              >
                                <Image
                                  src="/assets/icons/creationicons/cross.svg"
                                  width="8px"
                                  height="8px"
                                  alt="cross"
                                  onClick={() => {
                                    let objattachmentArray = [...attachmentArray];
                                    objattachmentArray.splice(index, 1);
                                    setAttachmentArray(objattachmentArray);

                                    let objattachmentData = [...attachmentData];
                                    objattachmentData.splice(index, 1);
                                    setAttachmentData(objattachmentData);

                                    let objattachmentFile = [...attachmentFile];
                                    objattachmentFile.splice(index, 1);
                                    setAttachmentFile(objattachmentFile);

                                    let objattachmentName = [...attachmentName];
                                    objattachmentName.splice(index, 1);
                                    setAttachmentName(objattachmentName);

                                    // setAttachmentArray(attachmentArray.filter((items) => items.name !== item.name));
                                    // setAttachmentData(attachmentData.filter((items) => items.url.name !== item.name));
                                    // console.log(attachmentArray, attachmentData, 'attachmentArray, attachmentData');
                                  }}
                                />
                              </span>
                              <p className="medium text-nowrap">
                                {truncString + (string.length > 6 ? '...' : '.') + Type}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                    <TagInput tags={tags} setTags={setTags} />
                  </div>
                </div>
                <div className="row d-flex flex-column justify-content-start align-items-center mb-5 ">
                  <div className="col-12 col-md-10 col-lg-6 col-xl-4 px-5 recording-form-container">
                    <div className="row text-start d-flex align-items-start justify-content-start">
                      <div className="row text-start d-flex align-items-start justify-content-start">
                        {/* Save Button */}
                        <button
                          onClick={() => handleButtonClick('save')}
                          className="col-5 text-white border-0 save-button small-bold mt-2 me-3"
                        >
                          Save
                        </button>

                        {/* Send Button */}
                        <button
                          onClick={() => handleButtonClick('send')}
                          className="col-5 text-white border-0 send-button small-bold mt-2"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CustomScrollbar>
          </div>
        </Layout>
      </>
    </>
  );
};

export default withRouter(RecordingForm);
