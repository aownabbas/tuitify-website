import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import Image from 'next/image';

const RecipientChip = (props) => {
  const [getPlatData, setGetPlatData] = useState(null);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    //   console.log(props.forwardBriifData.users, "its userrs");
    return () => {};
  }, []);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    <span className="me-3 img-container">
      <div className="rounded-pill py-1 mb-3 text-secondary medium-small bg-light d-inline-block ps-2 pe-3">
        <span className="d-flex align-items-center">
          {props.userImage != null ? (
            <Image
              className="rounded-circle me-0 p-0"
              src={
                getPlatData
                  ? getPlatData == (null || {})
                    ? ''
                    : `${awsLink}users/profileImages/${props.userImage}`
                  : '/assets/icons/new/user.svg'
              }
              width="20px"
              height="20px"
              alt="user"
              style={{ objectFit: 'fill' }}
            />
          ) : (
            <Image
              className="rounded-circle recepient me-0 p-0"
              src="/assets/icons/new/user.svg"
              width="20px"
              height="20px"
              alt="user"
            />
          )}
          <span className="ps-1 ">
            {' '}
            {`${props.username.length > 14 ? props.username.slice(0, 14) + '...' : props.username}`}
          </span>
        </span>
        <Badge
          bg="white"
          className="rounded-circle text-dark tag-cancel me-2 bg-white px-2 py-1 shadow-sm"
          onClick={() => {
            props.deleteTag(props.index);
          }}
        >
          <Image src="/assets/icons/creationicons/cross.svg" width="8px" alt="cross" height="11px" />
        </Badge>
      </div>
    </span>
  );
};

export default RecipientChip;
