import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  // Suspense,
  useState,
  useEffect,
} from 'react';
const VideoGBCreation = dynamic(() => import('../../components/combine/videocreation/VideoGBCreation'), {
  ssr: false,
  // suspense: true
});
const VideoGiistCreation = () => {
  let [loading, setLoading] = useState(true);
  const router = useRouter();

  const { giistcreationRec } = router.query;

  console.log(giistcreationRec, 'this is video');
  useEffect(() => {
    setLoading(!loading);
    return () => {};
  }, []);

  return (
    <>
      {
        loading ? (
          ''
        ) : (
          // <Suspense fallback={``}>
          <VideoGBCreation giistcreationRec={giistcreationRec} />
        )
        // </Suspense>
      }
    </>
  );
};
export default VideoGiistCreation;
