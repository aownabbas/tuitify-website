import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './dropzone.module.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

function PrimaryDragdrop(props) {
  console.log(
    props.files.map((item) => item.preview),
    'the file',
  );
  // {
  //   mediatabValue == 0 ? acceptImages : mediatabValue == 1 ? acceptVideos : mediatabValue == 2 ? acceptDocs : acceptAudios;
  // }
  // {
  //   'image/*': [],
  //   'video/*': [],
  //   'audio/*': [],
  // },
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept:
      props.mediatabValue == 0 || props.chapterTabIndex == 0
        ? props.acceptVideos
        : props.mediatabValue == 1 || props.chapterTabIndex == 1
        ? props.acceptAudios
        : props.mediatabValue == 2 || props.chapterTabIndex == 2
        ? props.acceptDocs
        : '(props.acceptVideos, props.acceptAudios, props.acceptDocs, props.acceptImages)',
    onDrop: (acceptedFiles) => {
      props.setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      if (props.chapterTabIndex == 2) {
        props.uploadDocInput(acceptedFiles, '0', '2', acceptedFiles[0].type);
      }
    },
  });

  //   image/png video/mp4 audio/mpeg
  //   const thumbs = props.files.map(
  //     (file) =>
  //       file.type == 'image/png' ? (
  //         <div style={thumb} key={file.name}>
  //           <div style={thumbInner}>
  //             <img
  //               src={file.preview}
  //               style={img}
  //               onLoad={() => {
  //                 URL.revokeObjectURL(file.preview);
  //               }}
  //             />
  //           </div>
  //         </div>
  //       ) : file.type == 'video/mp4' ? (
  //         <video
  //           width="320"
  //           height="240"
  //           autoplay
  //           muted
  //           onLoad={() => {
  //             URL.revokeObjectURL(file.preview);
  //           }}
  //         >
  //           <source src={file.preview} type="video/mp4" />
  //         </video>
  //       ) : file.type == 'audio/mpeg' ? (
  //         <audio
  //           controls
  //           onLoad={() => {
  //             URL.revokeObjectURL(file.preview);
  //           }}
  //         >
  //           <source src={file.preview} type="audio/mpeg" />
  //         </audio>
  //       ) : (
  //         'format not found'
  //       ),
  //   );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => props.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div
      {...getRootProps({ className: 'dropzone' })}
      className={`container  ${!isDragActive ? classes.mydropzone : classes.mydropzoneInner}`}
    >
      <input {...getInputProps()} />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {isDragActive ? (
          <>
            <p className="dropzone-content mb-4">Release to drop the files here</p>
          </>
        ) : (
          <>
            {props.mediatabValue == 0 || props.chapterTabIndex == 0 ? (
              <>
                <p className="dropzone-content">Drag and drop a new video</p>
                <p className="dropzone-content py-2">Or</p>
                <button type="button" onClick={props.open} className={classes.btn}>
                  Upload Video from Desktop
                </button>
                <div className="row py-4">
                  <p>
                    Supported Video Files <b>(MP4, MOV)</b>
                  </p>
                </div>
              </>
            ) : props.mediatabValue == 1 || props.chapterTabIndex == 1 ? (
              <>
                <p className="dropzone-content">Drag and drop a new Audio</p>
                <p className="dropzone-content py-2">Or</p>
                <button type="button" onClick={props.open} className={`${classes.btn}`}>
                  Upload Audio from Desktop
                </button>
                <div className="row py-4">
                  <p>
                    Supported Video Files <b>(MP3)</b>
                  </p>
                </div>
              </>
            ) : props.mediatabValue == 2 || props.chapterTabIndex == 2 ? (
              <div>
                <p className="dropzone-content">Drag and drop a new Document</p>
                <p className="dropzone-content py-2">Or</p>
                <button type="button" onClick={props.open} className={classes.btn}>
                  Upload a document from Desktop
                </button>
                <div className="row py-4">
                  <p>
                    Supported Files <b>(PDF,PPT,XLSX)</b>
                  </p>
                </div>
              </div>
            ) : (
              <button type="button" onClick={props.open} className={classes.btn}>
                Upload file
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PrimaryDragdrop;
