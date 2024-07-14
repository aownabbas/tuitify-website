import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Image from 'next/image';
const defaultSrc = '/assets/icons/new/user.svg';
import Button from 'react-bootstrap/Button';
import { CircleStencil, Cropper, CropperRef, Coordinates } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import updateUserProfile from '../../../../../redux/actions/UpdateUserProfile';
import { useDispatch } from 'react-redux';

//uploading ki imports
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';

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

const EditImageCropModal = (props) => {
  const dispatch = useDispatch();
  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  const { getPlatData } = props;
  const [image, setImage] = useState(defaultSrc);

  const [show, setShow] = useState(false);
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();

  //advance-react-cropper library data start
  const cropperRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [file, setFile] = useState('');

  const flip = (horizontal, vertical) => {
    if (cropperRef.current) {
      cropperRef.current.flip(horizontal, vertical);
    }
  };
  const rotate = (angle) => {
    if (cropperRef.current) {
      cropperRef.current.rotate(angle);
    }
  };
  const onChangeCrop = (cropper) => {
    let randomName = makeId(20);
    let keyPrefix = 'profilepic';
    setCoordinates(cropper.getCoordinates());
    cropper.getCanvas()?.toBlob(
      function (blob) {
        props.setSrc(URL.createObjectURL(blob));
        console.log(blob);
        const blobSrc = URL.createObjectURL(blob);
        let blobFile = new File([blob], keyPrefix + randomName + '.' + props.type, {
          type: 'image/jpeg',
        });
        props.setSrcFile(blobFile);
        console.log('blobSrc', blobFile);
      },
      'image/jpeg',
      0.75,
    );
  };

  const blob = new Blob(cropData, { type: 'image/*' });
  const blobUrl = URL.createObjectURL(blob);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setShow(false);
      props.setUploadedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[400],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  // upload video
  const inputRef = useRef();

  const [source, setSource] = useState();
  props.setVideo(source);

  const handleFileChange = (event) => {
    props.setUploadImage(true);
    props.setcheckImage('');
    props.setSrc('');
    const file = event.target.files[0];
    props.setSrcFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    props.setEditImageModalOpen(true);
    reader.onload = () => {
      const img = document.createElement('img');
      img.onload = () => {
        let height = img.naturalHeight;
        let width = img.naturalWidth;
        if (height !== width) {
          // Display an alert with a custom message
          setcheckImage('You need to upload an image with equal width and height.');
          return;
        }
        props.setSrc(URL.createObjectURL(file));
        props.setImageSrc(reader.result);
        const url = URL.createObjectURL(file);
        setSource(url);
        props.setSrc(url);
      };

      // Set the src of the image element after defining the onload event listener
      img.src = event.target.result;
    };
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const uploadThumbnail = async (e) => {
    var result = /[^/]*$/.exec(file.type)[0];
    let randomName = makeId(20);
    let keyPrefix = 'profilepic';
    let dirName = 'users/profileImages/';
    let getlocalStorge = JSON.parse(localStorage.getItem('@LoginData'));
    props.setUploadedImage(props.src);
    let data = {
      name: keyPrefix + randomName + '.' + 'png',
      type: '.' + 'png',
      link: dirName + keyPrefix + randomName + '.' + 'png',
    };
    const target = { Bucket: awsBucket, Key: data.link, Body: props.srcFile };
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
      parallelUploads3.on('httpUploadProgress', (progress) => {
        var params = JSON.stringify({
          firstName: props.fname,
          lastName: props.lname,
          image: data.name,
          company: props.companyName,
          department: props.department,
          position: props.position,
          phone: props.phoneNumber,
          linkedin: props.linkedinUrl,
          description: props.description,
          'publisher Id': 4,
        });

        dispatch(updateUserProfile(props.mybearerToken, params, onUpdateUserProfileSuccess, onUpdateUserProfileError));
        getlocalStorge.image = data.name;
        // Store the updated object back into local storage
        localStorage.setItem('@LoginData', JSON.stringify(getlocalStorge));
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdateUserProfileSuccess = (res) => {
    console.log(res);
  };
  const onUpdateUserProfileError = (err) => {
    console.log(err);
  };
  const makeId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleClick = (props) => {
    props.setUploadImage(false);
    props.setEditImageModalOpen(false);
  };

  return (
    <>
      <div>
        {props.modalOpen == true ? (
          <Modal
            style={{ zIndex: '999999' }}
            open={props.modalOpen}
            onClose={() => {
              props.setEditImageModalOpen(false);
              props.setUploadImage(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="text-center row border-0 bg-white">
              <Typography className="text-start col-6 semibold">Edit Photo</Typography>
              <div className="text-end col-6">
                <Image
                  onClick={() => handleClick(props)}
                  src="/assets/icons/new/close-circle.svg"
                  width={20}
                  height={20}
                  alt="close"
                />
              </div>

              {props.uploadImage == true ? (
                <>
                  <div>
                    {/* {show == true ? ( */}
                    <div className="row">
                      <div className="" style={{ height: 250, width: '100%' }}>
                        {props.checkImage ? (
                          <p className="text-danger">{props.checkImage}</p>
                        ) : (
                          <Cropper
                            ref={cropperRef}
                            src={props.imageSrc}
                            stencilComponent={CircleStencil}
                            onChange={onChangeCrop}
                            className="advanced-cropper-canvas"
                            width="32px"
                            height="32px"
                          />
                        )}
                      </div>
                      <div className="mt-4 ">
                        {props.src && (
                          <Button
                            variant="outline-primary"
                            onClick={(e) => {
                              uploadThumbnail(e);
                              props.setEditImageModalOpen(false);
                              props.setUploadImage(false);
                            }}
                          >
                            Crop Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="VideoInput ">
                  <input
                    ref={inputRef}
                    className="VideoInput_input invisible"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                  />
                  <Button variant="outline-primary" onClick={handleChoose}>
                    Upload Video
                  </Button>
                  {/* {!source && <Button variant="outline-primary" onClick={handleChoose}>
                Upload Video
              </Button>} */}
                  {/* {source && (
                  <video
                    className="VideoInput_video"
                    width="100px"
                    height={150}
                    controls
                    src={source}
                    style={{borderRadius:"30%"}}
                  />
                )} */}
                  {/* <div className="VideoInput_footer">{source || "Nothing selectd"}</div> */}
                </div>
              )}
            </Box>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default EditImageCropModal;
