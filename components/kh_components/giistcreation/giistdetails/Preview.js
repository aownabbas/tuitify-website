import React from 'react';
import classes from './Stepper.module.css';
import Image from 'next/image';

const Preview = (props) => {
  return (
    <>
      <p
        style={{
          fontFamily: 'Gilroy-Medium',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '20px',
          color: 'rgba(53, 52, 82, 0.78)',
          padding: '5px',
        }}
      >
        Preview
      </p>
      {props.title == '' ? (
        ''
      ) : (
        <div className={`${classes.backgroundShadow} p-4 `} style={{ borderRadius: '10px' }}>
          {!props.thumbnail ||
          props.thumbnail == `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/undefined` ||
          props.thumbnail == `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/null` ? (
            ''
          ) : (
            <div className="w-100 mx-auto text-center row d-block">
              <Image
                src={props.thumbnail}
                className="img-fluid col-9"
                alt="Thumbnail not Found"
                width="350px"
                style={{ objectFit: 'contain', borderRadius: '10px' }}
                height="210px"
              />
            </div>
          )}
          <div className="card-body col-12 p-0">
            <p
              className=" w-75 py-1"
              style={{
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '16px',
                lineHeight: '20px',
                color: '#303548',
              }}
            >
              {props.title}
            </p>
            <div className="d-flex align-items-center justify-content-start pt-2">
              <Image
                className="p-0 rounded-circle"
                src={
                  props.giistUserPic !== undefined
                    ? props.awsLink + 'users/profileImages/' + props.giistUserPic
                    : '/assets/icons/new/user.svg'
                }
                alt="User Photo"
                width="32px"
                height="32px"
              />
              <p
                className={`ps-2 m-0 text-capitalize d-flex align-items-center ${classes.userName} py-2`}
                style={{ fontWeight: '500', color: '#353452' }}
              >
                {`${props?.first_name} ${props?.last_name}`}
              </p>
            </div>
            <p
              className="card-text text-break pt-2"
              style={{
                fontFamily: 'Gilroy-Light',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#353452',
              }}
            >
              {props.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
