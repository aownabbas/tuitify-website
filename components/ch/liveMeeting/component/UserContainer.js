import { useRef } from 'react';
import { useEffect } from 'react';
import { EventEmitter } from 'events';

const UserContainer = (props) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);

    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);

  useEffect(() => {
    if (props.audioTrack && props.localUserUid != props.uid) {
      props.audioTrack?.play();
      return () => {
        props.audioTrack?.stop();
      };
    }
  }, [props.audioTrack]);

  return (
    <div
      ref={container}
      id={props.uid}
      className="webagora"
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: '1',
      }}
      onClick={() => {
        props.eventEmitter.emit('pinned', {
          videoTrack: props.videoTrack,
          uid: props.uid,
        });
      }}
    />
  );
};

export default UserContainer;
