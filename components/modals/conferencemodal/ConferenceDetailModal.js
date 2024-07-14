import { Box, Modal, Typography } from '@mui/material';
import ModalStyles from '../modalsStyles/ModalStyles';
import Image from 'next/image';
import { makeIdAWS } from '../../../utils/constants/makeIdAWS';
import { useState } from 'react';
import { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import FilterCategories from '../../../redux/actions/FilterCategories';
import SkeletonLoader from '../../kh_components/kh_home/SkeletonLoader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './ConferenceDetailModal.module.css';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import EndConference from '../../../redux/actions/EndConference';

const ConferenceDetailModal = ({
  openRecordedModal,
  handleRecordedModalClose,
  meetingChannel,
  leaveHandler,
  setDotProgressLoading,
}) => {
  const { conferenceModalStyle, centeringContent, ConferenceModalHeading } = ModalStyles;
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = useState(null); // to preview
  const [thumbnailFile, setThumbnailFile] = useState('');
  const [thumbnailData, setThumbnailData] = useState(''); // this will be uploaded

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [showPane, setShowPane] = useState(false);
  const [category, setCategory] = useState({ id: null, title: '' });

  const [giistCategories, setGiistCategories] = useState(null);
  const allGiistCats = giistCategories?.categories;

  const hideCategoryPane = useRef();
  useOnClickOutside(hideCategoryPane, () => setShowPane(false));

  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  useEffect(() => {
    const getPlatformData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (getPlatformData) {
      const catsParam = `platform_id=${getPlatformData?.platform_id}`;
      dispatch(FilterCategories(catsParam, onCategoriesSuccess, onCategoriesError));
    }
  }, []);

  const onCategoriesSuccess = (res) => {
    setGiistCategories(res);
  };
  const onCategoriesError = (err) => {
    setGiistCategories(err);
  };

  function onChange(e) {
    const file = e.target.files[0];
    if (file) {
      let randomName = makeIdAWS(20);
      let fileFormat = '.png';
      let keyPrefix = 'thumbnail';
      let dirName = 'giists/images/';
      let fileImage = '';
      setThumbnailFile(file);
      setThumbnail(URL.createObjectURL(file)); // to preview
      let data = {
        url: file,
        name: keyPrefix + randomName + fileFormat,
        type: fileFormat,
        link: dirName + keyPrefix + randomName + fileFormat,
      };
      setThumbnailData(data);
    }
  }

  const DropDownImage = () => {
    return <Image src="/assets/icons/drop-down-icon.svg" height={10} width={10} alt="drop-down-icon" />;
  };

  const uploadThumbnail = async (file, data) => {
    setDotProgressLoading(true);
    if (file != '' && data != {}) {
      const target = { Bucket: awsBucket, Key: data.link, Body: file };
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
          leavePartsOnError: false, // optional manually handle dropped parts
          params: target,
        });

        parallelUploads3.on('httpUploadProgress', async (progress) => {
          console.log(progress, 'file uploaded');
          const paramsBody = {
            channel: meetingChannel,
            recording: {
              title: title,
              thumbnail: data?.name ? data?.name : null,
              description: description,
              category_id: String(category?.id),
            },
          };
          await dispatch(EndConference(paramsBody, onEndMeetingSuccess, onEndMeetingError));
        });
        parallelUploads3.done();
      } catch (e) {
        console.log(e, 'error hai uploading main');
      }
    } else {
      alert('Something wrong with preparing to upload thumbnail');
    }
  };

  const saveDetailhandler = async () => {
    setDotProgressLoading(true);
    await uploadThumbnail(thumbnailFile, thumbnailData);
  };

  const onEndMeetingSuccess = async (res) => {
    console.log(res, 'eng meeting response');
    if (res) {
      setTimeout(async () => {
        await leaveHandler();
      }, 3000);
    }
  };
  const onEndMeetingError = (err) => {
    console.log(err, 'eng meeting response');
  };

  return (
    <Modal
      open={openRecordedModal}
      onClose={handleRecordedModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={conferenceModalStyle}>
        <Box sx={centeringContent}>
          <Typography sx={ConferenceModalHeading}>Recording completed</Typography>
          <Typography sx={{ pt: 2 }}>
            Your recording will be saved as a unpublished giist, please enter the details below.
          </Typography>
        </Box>
        <div className="row py-2">
          <div className="py-2">
            <lable htmlFor="titlerecording">Title</lable>
            <input
              id="titlerecording"
              type="text"
              placeholder="Enter title..."
              style={{
                width: '100%',
                height: '48px',
                background: '#FFFFFF',
                border: '1px solid #353452',
                borderRadius: '10px',
                padding: '0 10px',
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {/*  */}
          <div className={`${classes.select_container} position-relative w-100 `}>
            <label className={` py-1 `}>
              Select Category <span className="text-danger">*</span>
            </label>
            <div className={`p-2 w-100 ${classes.inputStyle}`} onClick={() => setShowPane(true)}>
              <span className="d-flex justify-content-between">
                {!category.title == '' ? category.title : 'Select Category'}
                {showPane == true ? (
                  <div style={{ transform: 'rotate(180deg)' }}>
                    <DropDownImage />
                  </div>
                ) : (
                  <div>
                    <DropDownImage />
                  </div>
                )}
              </span>
            </div>
            {showPane == true && (
              <div
                ref={hideCategoryPane}
                className="mt-2 p-2 "
                style={{
                  height: '300px',
                  width: '95%',
                  overflowY: 'scroll',
                  position: 'absolute',
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '10px 20px 50px grey',
                  zIndex: '1',
                }}
              >
                {allGiistCats ? (
                  allGiistCats?.map((cat) => (
                    <div
                      className={`py-1 px-2 cursor-pointer ${classes.listGiist}`}
                      key={cat.id}
                      id={cat.id}
                      onClick={(e) => {
                        setCategory({ id: cat.id, title: cat.title });
                        setShowPane(false);
                      }}
                    >
                      {cat.title}
                    </div>
                  ))
                ) : (
                  <div className="gap-4 " onClick={() => setShowPane(false)}>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                    <div className="p-1">
                      <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/*  */}

          <div className="py-2">
            <lable htmlFor="Descriptionrecording">Description</lable>
            <textarea
              id="Descriptionrecording"
              type="text"
              placeholder="Type here ..."
              style={{
                width: '100%',
                height: '82px',
                resize: 'none',
                background: '#FFFFFF',
                border: '1px solid #353452',
                borderRadius: '10px',
                padding: '10px 10px',
              }}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="py-2">
            <div style={{ display: 'block' }}>
              <label>Thumbnail</label>
            </div>
            <div className="d-flex justify-content-between">
              <div
                style={{
                  width: '48%',
                  height: '120px',
                  background: '#353452',
                  borderRadius: '10px',
                  position: 'relative',
                }}
              >
                <label htmlFor="old-file-input">
                  <div
                    className="w-100"
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  >
                    <div className="w-100" style={{ display: 'flex', flexDirection: 'column', opacity: 0.6 }}>
                      <Image
                        src="/assets/images/thumbnail-upload-icon.svg"
                        alt="upload giist"
                        width="30px"
                        height="30px"
                      />
                      <p
                        className="text-white text-center pt-2"
                        style={{ fontWeight: '400', fontSize: '13px', lineHeight: '18px', opacity: 0.6 }}
                      >
                        Upload Thumbnail
                      </p>
                    </div>
                  </div>
                  <input
                    id="old-file-input"
                    style={{ display: 'none' }}
                    accept="image/png, image/gif, image/jpg, image/jpeg"
                    type="file"
                    onChange={onChange}
                  />
                </label>
              </div>
              <div
                style={{
                  width: '48%',
                  height: '120px',
                  background: 'grey',
                  borderRadius: '10px',
                  position: 'relative',
                }}
              >
                <img
                  src={thumbnail}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '10px',
                    position: 'absolute',
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="text-center py-3">
            <button
              style={{
                width: '200px',
                height: '48px',
                borderRadius: '10px',
                border: 'none',
                background: '#353452',
                color: '#FFFFFF',
                opacity: !title.length || !category.title ? 0.2 : '',
                cursor: !title.length || !category.title ? 'not-allowed' : '',
              }}
              disabled={!title.length || !category.title ? true : ''}
              onClick={async () => {
                await saveDetailhandler();
                handleRecordedModalClose();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ConferenceDetailModal;
