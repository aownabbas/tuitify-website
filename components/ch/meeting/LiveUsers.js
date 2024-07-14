import Image from 'next/image';

const LiveUsers = (props) => {
  return (
    <div className="row mb-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-around">
          <div>
            <Image src="/assets/images/liveuser.png" alt="live Users" width="40" height="40" />
          </div>
          <div className="" style={{ marginLeft: '15px' }}>
            <p
              style={{
                fontSize: '14px',
                fontFamily: 'Gilroy-Bold !important',
                fontWeight: '500',
              }}
              className="fw-bold"
            >
              {props.firstName}
            </p>
            <div style={{ fontSize: '12px', marginTop: '-15px' }} className="text-lowercase">
              @{props.firstName}
              {props.id}
            </div>
          </div>
        </div>
        <div>
          <button
            style={{
              width: '66px',
              height: '32px',
              background: 'black',
              border: 'none',
              borderRadius: '10px',
            }}
            className="text-white"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveUsers;
