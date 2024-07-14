import { Box, Button, Modal, Typography } from '@mui/material';
import ModalStyles from '../modalsStyles/ModalStyles';

import React, { useState, useRef } from 'react';
import {
  Cropper,
  CropperRef,
  Coordinates,
  CircleStencil,
  FixedCropper,
  ImageRestriction,
} from 'react-advanced-cropper';
import Image from 'next/image';
import 'react-advanced-cropper/dist/style.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 453,
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 2,
};

const ThumbnailCropModal = ({
  open,
  handleCloseModal,
  setThumbnail,
  setThumbnailData,
  setThumbnailFile,
  makeId,
  thumbnailLabelId,

  srcFile,
  imageSrc,
  onChange,
}) => {
  //advance-react-cropper library data start
  const cropperRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  // const [src, setSrc] = useState('');
  // const [imageSrc, setImageSrc] = useState('');

  // const [srcFile, setSrcFile] = useState('');
  const [blobFilecopy, setBlobFilecopy] = useState('');

  console.log('srcFile', srcFile);
  const onChangeCrop = (cropper) => {
    let randomName = makeId(20);
    let fileFormat = '.png';
    let keyPrefix = 'thumbnail';
    let dirName = 'giists/images/';
    setCoordinates(cropper.getCoordinates());
    cropper.getCanvas()?.toBlob(
      function (blob) {
        // setSrc(URL.createObjectURL(blob));
        setThumbnail(URL.createObjectURL(blob));
        const blobFile = new File([blob], keyPrefix + randomName + fileFormat, {
          type: 'image/jpeg',
        });
        // setBlobFilecopy(blobFile);
        setThumbnailFile(blobFile);
        let data = {
          url: blobFile,
          name: keyPrefix + randomName + fileFormat,
          type: fileFormat,
          link: dirName + keyPrefix + randomName + fileFormat,
        };
        console.log(data, 'data here 1');
        setThumbnailData(data);
      },
      'image/jpeg',
      0.75,
    );

    console.log(cropper.getCanvas(), 'ldl');
  };

  /**
   * this code is pasted in GiistDetails to open cropping modal after selecting image from desktop
   *  */

  // const onChange = (e) => {
  //   const file = e.target.files[0];
  //   let randomName = makeId(20);
  //   let fileFormat = '.png';
  //   let keyPrefix = 'thumbnail';
  //   let dirName = 'giists/images/';

  //   console.log(file, 'actual file');
  //   setSrcFile(file);
  //   const reader = new FileReader();
  //   console.log(reader, 'file uploaded reader');

  //   reader.onload = () => {
  //     const img = document.createElement('img');

  //     img.onload = () => {
  //       const height = img.naturalHeight;
  //       const width = img.naturalWidth;

  //       // console.log(reader.result, 'file uploaded img.onload'); gives base64
  //       const objectURL = URL.createObjectURL(file);
  //       // setSrc(objectURL);
  //       setImageSrc(reader.result);

  //       //
  //       setThumbnailFile(file);
  //       setThumbnail(objectURL);
  //       let data = {
  //         url: file,
  //         name: keyPrefix + randomName + fileFormat,
  //         type: fileFormat,
  //         link: dirName + keyPrefix + randomName + fileFormat,
  //       };
  //       console.log(data, 'data here');
  //       setThumbnailData(data);
  //     };
  //     img.src = event.target.result;
  //     // Set the src of the image element after defining the onload event listener
  //   };
  //   reader.readAsDataURL(file);
  // };
  // console.log('src', src);

  return (
    <div>
      <Modal
        style={{ zIndex: '999999' }}
        open={open}
        onClose={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center row border-0 bg-white">
          <Typography className="text-start col-6 semibold">Edit Photo</Typography>
          <div className="text-end col-6">
            <Image
              onClick={() => {
                handleCloseModal();
                setThumbnail(null);
                setThumbnailFile('');
                setThumbnailData('');
              }}
              src="/assets/icons/new/close-circle.svg"
              width={20}
              height={20}
              alt="close"
            />
          </div>

          <>
            <div>
              <button className="border-0 px-2 py-1 rounded  bg-primary mb-4" htmlFor={thumbnailLabelId}>
                <label className="text-white" htmlFor={thumbnailLabelId}>
                  Change Image
                </label>
              </button>
            </div>
            <div>
              <div className="row ">
                <div className="" style={{ height: '280px', width: '100%', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: '1',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        color: 'white',
                        width: '50%',
                      }}
                    >
                      Mouse wheel or two fingers can be used for zoomin & zoomout
                    </p>
                  </div>
                  <FixedCropper
                    ref={cropperRef}
                    src={imageSrc}
                    onChange={onChangeCrop}
                    className="advanced-cropper-canvas"
                    stencilSize={{
                      width: 250,
                      height: 150,
                    }}
                    stencilProps={{
                      handlers: false,
                      lines: false,
                      movable: true,
                      resizable: true,
                    }}
                    imageRestriction={ImageRestriction.stencil}
                  />
                </div>
                <div className="mt-4 ">
                  {/* {src && ( */}
                  <Button
                    variant="outline-primary"
                    onClick={(e) => {
                      // setThumbnail(src);
                      // setThumbnailFile(blobFilecopy);
                      handleCloseModal();
                    }}
                  >
                    Crop Image
                  </Button>
                  {/* )} */}
                </div>
              </div>
              <input
                className="input invisible"
                accept="image/png, image/jpeg"
                id={thumbnailLabelId}
                type="file"
                onChange={onChange}
              />
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default ThumbnailCropModal;
