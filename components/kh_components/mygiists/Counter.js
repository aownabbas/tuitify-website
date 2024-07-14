import React, { useEffect, useState } from 'react';
import classes from './PlayGiistsVideo.module.css';

const Counter = ({
  min,
  seconds,
  handleModalOpen,
  score,
  setCurrentTime,
  handleTimeUp,
  quizId,
  timeStop,
  ReviewGiist,
}) => {
  let value = min + seconds;
  const [countdown, setCountdown] = useState(value);

  useEffect(() => {
    if (ReviewGiist == true) {
      return;
    }
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);
    setCurrentTime(countdown);
    if (timeStop == true) {
      clearInterval(interval);
    }
    if (countdown == 0) {
      clearInterval(interval);
      handleModalOpen({
        heading: 'Sorry, Time is Up',
        text: `${`Your time is up for this quiz, Thank you for your time`} `,
        buttonText: 'Okay',
        image: '/assets/img/quizfinal.svg',
      });
      handleTimeUp(quizId);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown, value]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${seconds < 10 ? '0' : ''}${seconds} Sec / ${minutes < 10 ? '0' : ''}${minutes} min`;
  };
  return (
    <div className={` d-flex justify-content-center ${classes.timer}`}>
      {ReviewGiist == true ? (
        <span
          className="text-white"
          style={{ letterSpacing: '0.9px', fontWeight: '600', fontSize: '12px', lineHeight: '15px' }}
        >
          {formatTime(value)}
        </span>
      ) : (
        <span
          className="text-white"
          style={{ letterSpacing: '0.9px', fontWeight: '600', fontSize: '12px', lineHeight: '15px' }}
        >
          {formatTime(countdown)}
        </span>
      )}
    </div>
  );
};

export default Counter;
