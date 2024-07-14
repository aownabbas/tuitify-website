//dynamic import because not rendering to the page with ssr.
import dynamic from 'next/dynamic';
const AudioCreation = dynamic(() => import('../../components/ch/briifrecording/audiocreation/AudioCreation'), {
  ssr: false,
})

const AudioBriifCreation = () => {
  
  return (
    <>
      <AudioCreation />
    </>
  );
};

export default AudioBriifCreation;
