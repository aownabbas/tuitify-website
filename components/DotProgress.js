import React, { useEffect, useState } from 'react';

const DotProgress = ({ dotColor }) => {
  function DotItem({ isActive }) {
    return (
      <div
        style={{
          width: isActive ? 16 : 10,
          height: isActive ? 16 : 10,
          borderRadius: isActive ? 8 : 5,
          backgroundColor: dotColor ? dotColor : '#303548',
          margin: '5px',
        }}
      />
    );
  }
  const [item, setItem] = useState(1);
  const tick = () => {
    let nextItem = item === 3 ? 1 : item + 1;
    setItem(nextItem);
  };

  useEffect(() => {
    const interval = setInterval(tick, 500);
    return () => {
      clearInterval(interval);
    };
  }, [item]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: '#B8B8B8',
        // background: 'transparent',
        color: '#fff !important',
        backgroundColor: 'rgba(0, 12, 46, 0.5)' /* Black background with opacity */,
      }}
    >
      <div
        style={{
          width: 80,
          justifyContent: 'space-around',
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DotItem isActive={item === 1} />
        <DotItem isActive={item === 2} />
        <DotItem isActive={item === 3} />
      </div>
    </div>
  );
};

export default DotProgress;
