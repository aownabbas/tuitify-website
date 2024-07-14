import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import WaveSurfer from 'wavesurfer.js';

const AudioInteraction = ({ link }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState('');

  useEffect(() => {
    let wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'white',
      progressColor: '#8cd3ff',
      backgroundColor: 'transparent',
      barWidth: 1.7,
      autoCenter: false,
      partialRender: true,
      barHeight: 20,
      cursorWidth: 0,
      cursorColor: '#FFF',
    });

    const awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
    const songUrl = new URL(`briffs/interactions/audio/${link}`, awsLink);
    wavesurfer.load(songUrl.href);

    wavesurfer.on('ready', () => {
      const formattedDuration = moment.utc(wavesurfer.getDuration() * 1000).format('m:ss');
      setDuration(formattedDuration);
    });

    wavesurfer.on('play', () => {
      setIsPlaying(true);
    });

    wavesurfer.on('pause', () => {
      setIsPlaying(false);
    });

    wavesurfer.on('audioprocess', () => {
      if (!wavesurfer.seeking) {
        const currentTime = wavesurfer.getCurrentTime();
        const formattedTime = moment.utc(currentTime * 1000).format('m:ss');
        setDuration(formattedTime);
      }
    });

    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [link]);

  const handlePlay = () => {
    const wavesurfer = wavesurferRef.current;
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div
      className="d-flex row align-items-center color-gradient gx-0"
      style={{ borderRadius: '14px', margin: '0px 30px 0px 47px', height: '49px', width: '160px' }}
    >
      <div className="col-2 ms-1 mt-2">
        <Image
          src={`/assets/icons/new/${isPlaying ? 'audio_pause.svg' : 'activeplay.png'}`}
          width="24px"
          height="24px"
          alt={isPlaying ? 'pause' : 'play'}
          onClick={handlePlay}
        />
      </div>
      <div className="waveform p-0 col-7 border-0 shadow-0" ref={waveformRef}></div>
      <div className="text-white col-2 ms-2 semibold-xsmall">{duration}</div>
    </div>
  );
};

export default AudioInteraction;
