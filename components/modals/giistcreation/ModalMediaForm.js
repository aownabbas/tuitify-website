/**
 * it is component of uploadMediaModal.js providing a form
 * for uploaded video or file in media library and
 * giistcreation media library
 **/
import { Card, CardContent, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import classes from './MediaModal.module.css';
import Image from 'next/image';
import { useState } from 'react';

const formStyle = {
  detailArr: {
    fontFamily: 'Gilroy-Medium !important',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '25px',
  },
  cardStyle: {
    border: '1px solid #C0C0C0',
    borderRadius: '12px',
    height: '67.5vh',
    boxShadow: 'none',
  },
};
const ModalMediaForm = ({
  gettingFileFileHandler,
  setUploadForm,
  uploadTitle,
  setUploadTitle,
  uploadDescription,
  setUploadDescription,
  makeId,
  thumbnail,
  setThumbnail,
  setThumbnailFile,
  setThumbnailData,
  thumnailUploadStatus,
}) => {
  const { detailArr, cardStyle } = formStyle;

  const onChangePicture = (e) => {
    if (e.target.files && e.target.files[0]) {
      let randomName = makeId(20);
      let fileFormat = '.png';
      let keyPrefix = 'thumbnail';
      // let dirName = 'briffs/';
      let dirName = 'mediaLibrary/images/';
      let fileImage = '';
      setThumbnailFile(e.target.files[0]);
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      let data = {
        url: e.target.files[0],
        name:  keyPrefix + randomName + fileFormat,
        type: fileFormat,
        link: dirName + keyPrefix + randomName + fileFormat,
      };
      setThumbnailData(data);
    }
  };


  return (
    <Card sx={cardStyle} pb={2}>
      <CardContent>
        <div className="container">
          <div className="row mb-3 pt-1">
            <div className="d-flex justify-content-start">
              <div onClick={() => setUploadForm(0)}>
                <WestIcon sx={{ height: 24, width: 24, cursor: 'pointer' }} />
              </div>
              <div className="px-2 ">
                <Typography style={detailArr}>Details</Typography>
              </div>
            </div>
          </div>
          <div className="row pt-1 pb-2">
            <label htmlFor="titleInput" className="mb-2">
              Title
            </label>
            <input
              id="titleInput"
              type="text"
              name="title"
              placeholder="Enter Giist Title"
              className={`${classes.inputTitle} w-100`}
              onChange={(e) => {
                setUploadTitle(e.target.value);
                gettingFileFileHandler();
              }}
              value={uploadTitle}
              autoFocus
            />
          </div>
          <div className="row pt-1 pb-2">
            <label htmlFor="descriptionInput" className="mb-2">
              Description
            </label>
            <textarea
              id="descriptionInput"
              type="text"
              name="title"
              placeholder="Enter Giist Title"
              maxLength="500"
              className={`${classes.inputDescription} w-100`}
              onChange={(e) => {
                setUploadDescription(e.target.value);
              }}
              value={uploadDescription}
            />
          </div>
          <div className="row pt-1 pb-2">
            <div className="mb-2" style={{ display: 'block' }}>
              <label className={`${classes.myfont}`}>Thumbnail</label>
            </div>
            <div className="d-flex justify-content-start">
              <label htmlFor="file-input">
                <div className={classes.miniUploadReviewbox}>
                  <span>
                    <Image
                      src="/assets/icons/new/cloud-white.svg"
                      alt="upload giist"
                      width={30}
                      height={30}
                      style={{ objectFit: 'cover' }}
                    />
                    <input id="file-input" style={{ display: 'none' }} type="file" onChange={onChangePicture} />
                  </span>
                  <Typography
                    sx={{
                      fontWeight: '400',
                      fontSize: '12px',
                      lineHeight: '15px',
                      pt: 1,
                    }}
                  >
                    Upload thumbnail
                  </Typography>
                </div>
              </label>
              <div className={`${classes.miniUploadReviewbox} mx-3 position-relative`}>
                <img
                  src={!thumbnail ? '/assets/images/small-preview.png' : thumbnail}
                  alt="upload thumbnail"
                  style={{ borderRadius: '10px', height: '100%' }}
                  className="img-fluid"
                />
              </div>
              <div className="d-flex justify-content-center align-items-center">{thumnailUploadStatus}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModalMediaForm;
