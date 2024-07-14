import React from 'react';

const TextInteraction = (props) => {
  return (
    <div className="ps-5 ms-0 me-2 mt-2 mb-2 regular-xsmall">
      {props.message.length > 34 ? (
        <p className="me-2">
          {props.message.substring(0, 34)}
          <br />
          {props.message.substring(34)}
        </p>
      ) : (
        <p className="me-2">{props.message}</p>
      )}
    </div>
  );
};

export default TextInteraction;
