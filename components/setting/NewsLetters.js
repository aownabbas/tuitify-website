import classes from './Setting.module.css';
import React from 'react';
import Image from 'next/image';

const NewsLetters = () => {
  return (
    <div className="col-md-12 col-12 col-sm-12 w-100">
      <div className={classes.whiteBox2}>
        <div className="col-md-12 d-flex">
          <div className="col-md-7 p-2">
            <h2 className="p-2">NewsLetters</h2>
            <p className="p-2" style={{ minWidth: '450px' }}>
              create newsletters to get audience engaged
            </p>
          </div>
          <div className="col-md-5 p-2 px-4 ">
            <div className="d-flex justify-content-end mt-3">
              <span className="regular-small pe-2">Create NewsLetters</span>
              <Image
                src="/assets/icons/new/Vector-squre.svg"
                alt="add"
                width={20}
                height={20}
                //   onClick={() => {
                //     if (detailCreationRes !== null) {
                //       AddNewChapter();
                //       setChanngeInputToTxt(false);
                //     }
                //   }}
                // style={{ opacity: detailCreationRes !== null ? '' : 0.5 }}
              />
            </div>
          </div>
        </div>
        <div style={{ opacity: '0.1', border: '1px solid #000000' }}></div>
        <div className="col-md-12 col-sm-12 col-12 mt-4">
          <div className="d-flex  align-items-center" style={{ flexDirection: 'column' }}>
            <Image src="/assets/icons/undraw_newsletter_re_wrob 1.svg" width="100px" height="100px" />
            <p className="mt-2">no social links added yet in the platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetters;
