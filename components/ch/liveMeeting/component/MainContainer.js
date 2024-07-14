import React, { useEffect, useRef } from 'react';
function MainContainer({ pinned }) {
  const videoRef = useRef(null);
  const remainder = pinned.uid % 2;
  useEffect(() => {
    if (pinned.videoTrack && videoRef.current) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(pinned.videoTrack.getMediaStreamTrack());
      videoRef.current.srcObject = mediaStream;
    }
  }, [pinned]);

  return (
    <>
      <div>
        <video
          ref={videoRef}
          autoPlay
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            transform: !remainder == 0 ? 'rotateY(180deg)' : '',
          }}
        />
        {/* <span className="text-white position-absolute p-1 z-index-1">{pinned.uid}</span> */}
      </div>
    </>
  );
}
export default MainContainer;
