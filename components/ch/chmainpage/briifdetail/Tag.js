import React from 'react';

const Tag = (props) => {
  return (
    <>
      <p
        className="tag medium bg-light px-3 mt-2 rounded-pill d-inline-flex me-2 mb-2"
        style={{ paddingTop: '4px', paddingBottom: '4px' }}
      >
        {props.tag.length > 8 ? props.tag.slice(0, 8) + '...' : props.tag}
      </p>
    </>
  );
};

export default Tag;
