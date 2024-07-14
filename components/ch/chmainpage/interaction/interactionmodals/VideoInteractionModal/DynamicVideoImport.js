import React, { 
  // Suspense, 
  useState, useEffect  } from 'react'
import dynamic from 'next/dynamic';
const VideoInteractionModal = dynamic(() => import('./VideoInteractionModal'), {
  ssr: false
  // , suspense: true
}) 

const DynamicVideoImport = (props) => {

  let [loading,setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(!loading)
    return () => {}
  }, [])

  return (
    <> 
    {loading ? "" : 
    // <Suspense fallback={``}>
      <VideoInteractionModal 
      videoOpen={props.videoOpen} 
      setInteractionsLoading={props.setInteractionsLoading}
      interactionsLoading={props.interactionsLoading}
      uploadFileInput={props.uploadFileInput}
      handleVideoClose={props.handleVideoClose}
      handleInteractionData={props.handleInteractionData}
      playBriifId={props.playBriifId}
      handleInsertComment={props.handleInsertComment}/>
      // {/* </Suspense> */}
      }
    </>
  )
}

export default DynamicVideoImport