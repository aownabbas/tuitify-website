import React from 'React';
import { useDropzone } from 'React-dropzone';
import classes from './dropzone.module.css';
function Dropzone({ onDrop, open, accept }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    // 'image/*': [],
    // 'video/*': [],
    // 'text/*': [],
    accept,
  });

  const files = acceptedFiles.map(
    (file) => (
      console.log(file, 'mapped'),
      (
        <div className="row pt-2" key={file.path}>
          <div className="text-center">
            {file.path} - {file.size} bytes
          </div>
        </div>
      )
    ),
  );

  console.log(files, 'files');

  return (
    <div {...getRootProps({ className: 'dropzone' })} className={classes.mydropzone}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content mb-4">Release to drop the files here</p>
        ) : (
          <>
            <p className="dropzone-content mb-4">Drag and drop a new video</p>
            <p className="dropzone-content mb-4">Or</p>
            <button type="button" onClick={open} className={classes.btn}>
              Upload Video
            </button>
          </>
        )}
      </div>
      <aside>{files}</aside>
      <div className="row pt-3">
        <p>
          Supported Video Files <b>(MP4, MOV)</b>
        </p>
      </div>
    </div>
  );
}
export default Dropzone;
