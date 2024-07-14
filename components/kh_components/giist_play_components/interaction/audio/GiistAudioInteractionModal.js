import  React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import moment from "moment";
import useTimer from "../../../../ch/chmainpage/interaction/interactionmodals/timer/useTimer";
import Image from 'next/image'
import styles from "../../../../ch/chmainpage/interaction/interactionmodals/AudioInteractionModal.module.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // height: "460px",
  transform: 'translate(-50%, -50%)',
  width: 424,
  bgcolor: 'background.paper',
  border: '0px',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

const GiistAudioInteractionModal = () => {
    

  const { seconds, startTime, stopTime, pauseTime, resetTime } = useTimer();

  const [media, setMedia] = useState({});
  const [data, setData] = useState(null)

  // async function handleLibraryLoad() {
  //   const AudioRecorder = (await import("audio-recorder-polyfill")).default;
  //   window.MediaRecorder = AudioRecorder

  // }

  const [recordState, setState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [show, setshow] = useState(false);
  const start = () => {
    // setState(RecordState.START);
    setshow(true);
  }
  // const pause = () => {
  //   // setState(RecordState.PAUSE);
  // }
  const stop = () => {
    setshow(false);
    // setState(RecordState.STOP);
  }
  const onStop = (data) => {
    setshow(false);
    setAudioData(data.url);
  }

  useEffect(()=>{
    // handleLibraryLoad();
    // if (navigator.mediaDevices.getUserMedia) {
    //   console.log('getUserMedia supported.');
    // }
  },[])    

  
  const handleStartRecording = (e) => {
    setshow(true);
    const constraints = { audio: true};
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const m = mediaRecorder;
        setMedia(m);
        
        m.start();
      })
      .catch((error) => {
        console.error(error.message);
      });    
  }
  
  const handleStop = (e) => {
      media.stop();
      media.stream.getTracks().forEach(i => i.stop());
      media.addEventListener('dataavailable', e => {
        let blob =  URL.createObjectURL(e.data);
        console.log(blob);
        setshow(false);
        setAudioData(blob);
      });  
  }
  const handleClearData = (audioData) =>{
    setAudioData(null);
  }
  const formatted = moment.utc(seconds*1000).format('mm:ss');
  return (
    <>
    <Modal
        open={props.audioOpen}
        onClose={()=>{props.handleAudioClose();stopTime();handleClearData(audioData)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center overflow-none">
          <div className='d-flex justify-content-end'>
          <Image src="/assets/icons/new/x.png" id='record' 
           width="26px" 
           height="26px"
           alt="close" 
           onClick={()=>{stopTime(); props.handleAudioClose(); handleClearData(audioData)}}
           />
          </div>
          <Typography id="modal-modal-title" sx={{ mt: 2 }} className="bold" variant="h6" component="h2">
            Audio Reply
          </Typography>
          <Typography id="modal-modal-description" className="light" sx={{ mt: 2, mb: 3 }}>
            Record your reply
          </Typography>
          {(show == false) ?
           (seconds == 0) ? 
           <Image src="/assets/icons/new/voice.png" id='record' 
          onClick={(e)=>{
            // start(); 
            handleStartRecording(e);
            startTime()
          }}
           width="42px" 
           height="55px"
           alt="voice" /> :
           <Image src="/assets/icons/new/voice.png" id='record' 
           width="42px" 
           height="55px"
           alt="voice" />
          :
          <div className='position-relative mx-auto d-flex align-items-center justify-content-center' style={{ width: "117px", height: "117px" }}>
          <Image src="/assets/icons/new/onLongPressAudioInteraction.svg" id='stop' 
            onClick={(e)=>{
              // stop(); 
              handleStop(e);
              pauseTime();
            }}
            style={{ zIndex: "9999" }}
            width="31px" height="40px" className="" alt="long press" 
          />
          <div className={`${styles.waves} waves position-absolute`}>
            {/* <span className="wave" className={styles.wave}></span> */}
            <span className={`${styles.wave} wave`}></span>
            <span className={`${styles.wave} wave`}></span>
          </div>
          
           </div>}
          {/* <Typography id="counter" className="light" sx={{ mt: 1 }}>
            {formatted}
          </Typography> */}
          <Typography id="modal-modal-description" onClick={()=>{handleClearData(audioData)}} className="light" sx={{ mt: 3 }}>
            { seconds == "0" && 
            (
            <div className="row d-block">
              <div className="mt-2 mx-auto row col">
              <p className="semibold active-color">Click on audio to start recording</p>
                {/* <button className="main-background-color text-white px-0 w-100 py-2 semibold" 
                onClick={props.handleAudioClose}
                 style={{ borderRadius:"7px", border:"2px solid #303548" }} >
                   Cancel
                   </button> */}
              </div>
            </div>)}

            { seconds != "0" && audioData == null && 
            (
            <div className="row d-block">
              <div className="mt-2 mx-auto row col">
              <p className="semibold stop-color">Click on audio to stop recording</p>
                {/* <button className="main-background-color text-white px-0 w-100 py-2 semibold" 
                onClick={props.handleAudioClose}
                 style={{ borderRadius:"7px", border:"2px solid #303548" }} >
                   Cancel
                   </button> */}
              </div>
            </div>)}
            
          <Typography id="counter" className="semibold-large" >
            {formatted}
          </Typography>

            { seconds != "0" 
            // && recordState == RecordState.STOP
            // && media.state == "recording"
             && audioData != null &&
            (
              <div className="row d-flex justify-content-center">
              <div className="col-6 mt-4 mb-2">
              <button className="main-background-color text-white w-100 py-2 semibold" 
                onClick={()=>{props.setInteractionsLoading(true); props.uploadFileInput(audioData, seconds, "mp3"); stopTime(); props.handleAudioClose(); handleClearData(audioData); 
              }}
                style={{ borderRadius:"7px", border:"2px solid #303548" }}>
                  Post Comment
                  </button>
              </div>
              {/* <div className="col-6 mt-5">
                <button className="bg-white w-100 py-2 semibold" 
                onClick={()=>{stopTime(); props.handleAudioClose(); handleClearData(audioData)}}
                 style={{ borderRadius:"7px", border:"2px solid #303548" }} >
                   Discard
                   </button>
              </div> 
              <div className="col-6 mt-5">
                <button className="main-background-color text-white w-100 py-2 semibold" 
                onClick={()=>{props.setInteractionsLoading(true); props.uploadFileInput(audioData, seconds, "mp3"); stopTime(); props.handleAudioClose(); handleClearData(audioData); 
              }}
                style={{ borderRadius:"7px", border:"2px solid #303548" }}>
                  Comment
                  </button>
              </div> */}
            </div>
          )}
          
          </Typography>
          
          <div>
            {/* <AudioReactRecorder
              state={recordState}
              onStop={onStop}
              backgroundColor='rgb(255,255,255)'
              canvasWidth="0px"
              canvasHeight="0px"

              style={{display:'none',width:'0px'}}
            /> */}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default GiistAudioInteractionModal