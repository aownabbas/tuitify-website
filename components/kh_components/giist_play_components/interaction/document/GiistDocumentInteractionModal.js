import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
// import

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // height: "460px",
  transform: 'translate(-50%, -50%)',
  width: 424,
  bgcolor: 'background.paper',
  border: '0px',
  borderRadius: '20px',
  boxShadow: 24,
  p: 2,
};

const GiistDocumentInteractionModal = (props) => {
  const [files, setFiles] = useState([]);
  const [docBlob, setDocBlob] = useState('');

  useEffect(() => {
    console.log(files, 'previewfile');
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => {
        setDocBlob(file.preview);
        URL.revokeObjectURL(file.preview);
      });
  }, [files]);

  const acceptDocs = {
    // 'audio/mpeg': [],
    // 'audio/mp3': [],
    // 'audio/avi': [],

    // 'video/mp4': [],
    // 'video/wmv': [],
    // 'video/avi': [],
    // 'video/ogg': [],

    'image/*': [],
    'text/*': [],
    'application/pdf': [],
    'application/powerpoint': [],
    'application/msword': [],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    'application/vnd.ms-powerpoint': [],
    'applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation': [],
    'application/vnd.ms-excel': [],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: acceptDocs,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const handleClearData = () => {};

  return (
    <>
      <Modal
        open={props.modalOpen}
        onClose={() => {
          handleClearData();
          props.handleModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center overflow-none">
          <div className="d-flex justify-content-end">
            <Image
              src="/assets/icons/new/x.png"
              id="record"
              width="26px"
              height="26px"
              alt="close"
              onClick={() => {
                handleClearData();
                props.handleModalClose();
              }}
            />
          </div>
          <Typography id="modal-modal-title" className="bold mb-2" variant="h6" component="h2">
            Document Replay
          </Typography>
          {/* docBlob */}
          {files.length != 0 ? (
            <>
              {/* <iframe src={files[0].preview} height="300" width="300" className='my-3' />  */}
              {files[0].type == 'image/png' ||
              files[0].type == 'image/jpg' ||
              files[0].type == 'image/jpeg' ||
              files[0].type == 'image/svg' ||
              files[0].type == 'image/gif' ||
              files[0].type == 'application/powerpoint' ||
              files[0].type == 'application/msword' ||
              files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
              files[0].type == 'application/vnd.ms-powerpoint' ||
              files[0].type == 'applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation' ||
              files[0].type == 'application/vnd.ms-excel' ||
              files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
                <div style={{ borderRadius: '12px' }} key={files[0].name}>
                  <Image
                    style={{ borderRadius: '10px' }}
                    src={files[0].preview}
                    height={200}
                    width={300}
                    fill
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                    onLoad={() => {
                      URL.revokeObjectURL(files[0].preview);
                    }}
                  />
                  <p className="regular-small py-2">{files[0].name}</p>
                </div>
              ) : files[0].type == 'video/mp4' ||
                files[0].type == 'video/wmv' ||
                files[0].type == 'video/avi' ||
                files[0].type == 'video/ogg' ? (
                <div style={{ borderRadius: '12px' }} key={files[0].name}>
                  <video
                    width="300"
                    height="300"
                    controls
                    muted
                    onLoad={() => {
                      URL.revokeObjectURL(files[0].preview);
                    }}
                  >
                    <source src={files[0].preview} type="video/mp4" />
                    <source src={files[0].preview} type="video/wmv" />
                    <source src={files[0].preview} type="video/avi" />
                    <source src={files[0].preview} type="video/ogg" />
                  </video>
                  <p className="regular-small py-2">{files[0].name}</p>
                </div>
              ) : files[0].type == 'audio/mpeg' || files[0].type == 'audio/mp3' || files[0].type == 'audio/avi' ? (
                <div className="row" style={{ borderRadius: '12px' }} key={files[0].name}>
                  <audio
                    controls
                    onLoad={() => {
                      URL.revokeObjectURL(files[0].preview);
                    }}
                  >
                    <source src={files[0].preview} type="audio/mpeg" />
                    <source src={files[0].preview} type="audio/mp3" />
                    <source src={files[0].preview} type="audio/avi" />
                  </audio>
                  <p className="regular-small py-2">{files[0].name}</p>
                </div>
              ) : files[0].type == 'application/pdf' ||
                files[0].type == 'text/plain' ||
                files[0].type == 'text/csv' ||
                files[0].type == 'application/msword' ||
                files[0].type == 'application/powerpoint' ||
                files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                files[0].type == 'application/vnd.ms-powerpoint' ||
                files[0].type == 'applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                files[0].type == 'application/vnd.ms-excel' ||
                files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                files[0].type == 'audio/wav' ? (
                <div className="row" style={{ borderRadius: '12px' }} key={files[0].name}>
                  <iframe src={files[0].preview} height="300" width="300" />
                  <p className="regular-small py-2">{files[0].name}</p>
                </div>
              ) : (
                <div className="text-center pt-5">
                  Please upload <b>mp4, mpeg, pdf or png</b>
                </div>
              )}

              <button
                type="button"
                onClick={() => setFiles([])}
                className="bg-white py-2 px-2 semibold"
                style={{ borderRadius: '7px', border: '2px solid #303548' }}
              >
                Change document
              </button>
              <button
                type="button"
                onClick={() => {
                  if (props.giistCreationDocument == 'giist document') {
                    console.log('ready to upload document');
                    props.setInteractionsLoading(true);
                    props.uploadDocInput(files, '0', '2', files[0].type);
                  } else {
                    props.setInteractionsLoading(true);
                    props.uploadDocInput(files, '0', '2', files[0].type);
                    props.handleModalClose();
                  }
                }}
                className="main-background-color text-white ms-3 py-2 px-4 semibold"
                style={{ borderRadius: '7px', border: '2px solid #303548' }}
              >
                {props.giistCreationDocument == 'giist document' ? 'Upload Document' : 'Post Comment'}
              </button>
            </>
          ) : (
            <span>
              <div
                {...getRootProps({ className: 'dropzone' })}
                //   className={`container ${classes.mydropzone}`}
              >
                <input {...getInputProps()} />
                <div className="text-center pt-5">
                  {isDragActive ? (
                    <>
                      <Image
                        src="/assets/icons/new/no_receivedbriifs_icon.svg"
                        width="150px"
                        height="150px"
                        //    style={{ opacity: '0.5' }}
                        alt="close"
                      />
                      <p className="dropzone-content mb-4 py-5">Release to drop the files here</p>
                    </>
                  ) : (
                    <>
                      <p
                        className="dropzone-content mb-4 semibold bg-light"
                        style={{
                          borderRadius: '9px',
                          border: '3px dashed #4E6AFE',
                          paddingTop: '80px',
                          paddingBottom: '80px',
                        }}
                      >
                        Drag and drop a file
                      </p>
                    </>
                  )}
                </div>
                {/* <div className="row pt-3 regular-small">
        <p>
          Supported Video Files <b>(MP4, AVI, MOV)</b>
        </p>
      </div> */}
              </div>
              {isDragActive ? (
                ''
              ) : (
                <>
                  <p className="dropzone-content mb-4">Or</p>

                  <div
                    {...getRootProps({ className: 'dropzone' })}
                    //   className={`container ${classes.mydropzone}`}
                  >
                    <input {...getInputProps()} />

                    <button
                      type="button"
                      //   onClick={open}
                      className="main-background-color text-white py-2 px-3 semibold"
                      style={{ borderRadius: '7px', border: '2px solid #303548' }}
                    >
                      Upload from desktop
                    </button>
                  </div>
                </>
              )}
            </span>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default GiistDocumentInteractionModal;
