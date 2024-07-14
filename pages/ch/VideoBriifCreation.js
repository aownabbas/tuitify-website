import dynamic from 'next/dynamic';
import {
  // Suspense,
  useState,
  useEffect,
} from 'react';
import DotProgress from '../../components/DotProgress';
const VideoCreation = dynamic(() => import('../../components/ch/briifrecording/videocreation/VideoCreation'), {
  ssr: false,
  // suspense: true
});
const VideoBriifCreation = () => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!loading);
    return () => {};
  }, []);

  return <>{loading ? <DotProgress /> : <VideoCreation />}</>;
};
export default VideoBriifCreation;
