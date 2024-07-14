import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import WaveSurfer from 'wavesurfer.js';

const GiistAudioMessage = (props) => {
  let { link } = props;
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const myDuration = moment.utc(props.duration * 1000).format('mm:ss');
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState('');
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let context = new AudioContext();
  let processor = context.createScriptProcessor(1024, 1, 1);

  useEffect(() => {
    let wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4E6AFE',
      backgroundColor: 'transparent',
      barWidth: 1.7,
      partialRender: true,
      barHeight: 50,
      cursorWidth: 0,
      autoCenter: false,
      cursorColor: 'white',
      audioContext: context || null,
      audioScriptProcessor: processor || null,
      //  maxCanvasWidth: 128,
      maxCanvasWidth: 100,
      progressColor: '#D51AFF',
      mediaControls: true,
    });

    const awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
    const songUrl = new URL(`giists/interactions/audio/${link}`, awsLink);
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
      className="d-flex row align-items-center gx-0"
      style={{ borderRadius: '14px', margin: '0px 30px 0px 47px', height: '49px', width: '250px' }}
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
      <div className="waveform p-0 col-7 border-0 shadow-0 " ref={waveformRef}></div>
      <div className="text-white col-2 ms-1 rounded-pill main-background-color px-2 py-1 regular-xsmall">
        {duration}
      </div>
    </div>
  );
};

export default GiistAudioMessage;
