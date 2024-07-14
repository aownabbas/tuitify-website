import React from 'react';
import Image from 'next/image';

const GiistTextMessage = (props) => {
  const loadingHandler = () => {
    console.log(props.id, 'id  of comment');
  };
  return (
    <>
      {props.editTextMessage == false && (
        <div className="ps-5 mt-2 mb-2 text-break regular-xsmall " onClick={loadingHandler}>
          <p>{props.comment}</p>
        </div>
      )}
    </>
  );
};

export default GiistTextMessage;
