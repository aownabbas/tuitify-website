import classes from './Setting.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Group = ({ name, setName, srcFile, handleUploadGroupImage, error, handleMoveStep, upload }) => {
  const router = useRouter();
  const handleUploadClick = () => {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  };

  return (
    <div className="col-md-12 col-12 col-sm-12  d-flex flex-wrap w-100">
      <div className={classes.group_box}>
        <div className="col-md-12 d-flex p-3 row">
          <div className="col-md-6 px-2 mt-3">
            <h2 className={classes.group_heading}>Create Group</h2>
          </div>
        </div>
        <div className="col-12 col-md-12 col-sm-12 p-3">
          <div className="col-md-12">
            <div className="d-flex">
              <div>
                {upload ? (
                  <img
                    className={`${classes.imgFrame} img-fluid mt-0 text-center`}
                    src={upload ? upload : '/assets/images/export.svg'}
                    style={{
                      width: '70px',
                      height: '70px',
                      border: '1px solid grey',
                      borderRadius: '50%',
                    }}
                    onClick={handleUploadClick}
                  />
                ) : (
                  <img
                    src="/assets/images/export.svg"
                    style={{
                      width: '70px',
                      height: '70px',
                      border: '1px solid grey',
                      borderRadius: '50%',
                    }}
                    onClick={handleUploadClick}
                  />
                )}
                <input
                  type="file"
                  id="file-input"
                  name="file"
                  style={{ display: 'none' }}
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    handleUploadGroupImage(e);
                  }}
                />
              </div>
              <div className={classes.chnge_logo}>
                <h4>
                  Upload Logo
                  <span className="danger" style={{ color: 'red' }}>
                    *
                  </span>
                </h4>
                <p>max size: 10Mb</p>
              </div>
              <div className={classes.edt}>
                <Image src="/assets/images/edit.svg" width="24px" height="24px" onClick={() => handleUploadClick()} />
              </div>
            </div>
            <div className={`${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2 mt-5 row`}>
              <div className="col-md-5 col-sm-5 col-lg-5">
                <div className="col-12 d-flex flex-column">
                  <label className={`mb-1 ${classes.myfont}`}>
                    Group title
                    <span className="danger" style={{ color: 'red' }}>
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Inspire team A"
                    onChange={(e) => setName(e.target.value)}
                    className="inputfont mainborder  ps-3 mt-1"
                    value={name}
                  />
                  <span
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '14px',
                      textAlign: 'right',
                      color: '#FF4B55',
                    }}
                    className="m-2"
                  >
                    {error}
                  </span>
                </div>
              </div>
              <div className="col-md-12 d-flex p-0 align-items-end position-absolute" style={{ bottom: '20px' }}>
                <div className={classes.btn}>
                  <button
                    className={classes.btn1}
                    onClick={() => {
                      router.push('/setting/GroupSetting');
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={classes.btn2}
                    disabled={!name || !srcFile ? true : false}
                    onClick={() => {
                      handleMoveStep();
                    }}
                    style={{ opacity: !name || !srcFile ? '0.5' : '' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
