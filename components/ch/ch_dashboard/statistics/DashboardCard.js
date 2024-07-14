import React from 'react';

const DashboardCard = (props) => {
  return (
    <div
      className="shadow mrgnlft1 hoveringstat"
      style={{
        borderRadius: '15px',
        cursor: 'pointer',
        padding: '10px',
      }}
      id="hoveringstat"
      onMouseOver={() => props.setHoverTextWhite(true)}
      onMouseOut={() => props.setHoverTextWhite(false)}
    >
      <div className="d-flex mt-1">
        <div className="col-lg-11 col-md-9 col-11 ">
          <div
            className={props.hoverTextWhite == true ? 'medium-extralarge  text-white' : 'medium-extralarge '}
            style={{ fontWeight: '900' }}
            id="hovertext"
          >
            {props.value}
          </div>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1">
          <div className={`${props.circledot} rounded-circle`} style={{ backgroundColor: props.color }}></div>
        </div>
      </div>
      <strong
        className={
          props.hoverTextWhite == true
            ? 'text-white regular-small dashboardStatisticCardnameActive'
            : 'dashboardStatisticCardname regular-small'
        }
      >
        {props.myresponse}
      </strong>
    </div>
  );
};

export default DashboardCard;
