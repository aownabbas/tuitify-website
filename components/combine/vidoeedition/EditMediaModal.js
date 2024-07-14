import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import styles from '../vidoeedition/EditMediaStyle.module.css';
import PrimaryMediaPlayer from '../mediaPlayer/PrimaryMediaPlayer';
import GenericTooltip from '../../ch/GenericTooltip';
import Slider from '@material-ui/core/Slider';
import { colors, backgroundColors, fontFamilies, fontSizes, emojis } from '../../../utils/constants/constants';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 1,
  },
  sidebar: {
    border: '1px solid rgba(53, 52, 82, 0.2)',
    backdropFilter: 'blur(10px)',
    /* Note: backdrop-filter has minimal browser support */
    borderRadius: '16px',
    backgroundColors: '#FFF !important',
  },
  sidebarIconInActive: {
    width: '32px',
    height: '32px',
    border: '1px solid rgba(53, 52, 82, 0.2)',
    borderRadius: '5px',
    textAlign: 'center',
    aligItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    opacity: 0.6,
  },
  sidebarIconActive: {
    backgroundColor: '#353452',
    width: '32px',
    height: '32px',
    border: '1px solid rgba(53, 52, 82, 0.2)',
    borderRadius: '5px',
    textAlign: 'center',
    aligItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  sidebarText: {
    width: '29px',
    height: '18px',
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    /* identical to box height */
    color: '#353452',
    opacity: 0.6,
    textTransform: 'capitalize',
  },
  tabStyleActive: {
    color: '#FFFFFF !important',
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    minHeight: '10px !important',
    fontSize: '14px',
    lineHeight: '18px',
    '&:hover': {
      textShadow: 'none',
    },
  },
  tabStyleInActive: {
    background: '#FFFFFF',
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    minHeight: '10px !important',
    fontSize: '14px',
    lineHeight: '18px',
    '&:hover': {
      textShadow: 'none',
    },
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const EditMediaModal = ({ handleCloseModal, openModal, file }) => {
  const { modalStyle, sidebar, sidebarIconActive, sidebarIconInActive, sidebarText, tabStyleActive, tabStyleInActive } =
    style;

  console.log('file =>', file);

  const [value, setValue] = useState(19);
  const [textInputs, setTextInputs] = useState([]);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showBgColorMenu, setShowBgColorMenu] = useState(false);
  const [text, setText] = useState('');
  const [state, setState] = useState({
    playing: false,
    played: 0,
    seeking: false,
    duration: 0,
  });
  const [fontAndColor, setFontAndColor] = useState({
    font: 'Arial',
    color: '#fff',
    backgroundColor: 'rgba(53, 52, 82, 0.48)',
  });
  const [filter, setFilter] = useState('');

  const handleColorMenuClick = () => {
    setShowColorMenu(true);
    setShowBgColorMenu(false);
  };

  const handleChangeValues = (e) => {
    const { value } = e.target;
    setText(value);
    setTextInputs([...textInputs, { id: textInputs.length + 1, text: value }]);
  };

  const handleBgColorMenuClick = () => {
    setShowColorMenu(false);
    setShowBgColorMenu(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleAddType(newValue);
  };
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const textareaRef = useRef(null);
  const videoRef = useRef(null);
  const skipTime = 10;

  const handleFontChange = (e) => {
    setFontAndColor({ ...fontAndColor, font: e.target.value });
  };

  const handlePlay = () => {
    videoRef.current.play();
    setState({ ...state, playing: true });
  };

  const handlePause = () => {
    videoRef.current.pause();
    setState({ ...state, playing: false });
  };

  const handleTimeUpdate = () => {
    setState({ ...state, played: videoRef.current.currentTime });
  };

  const handleLoadedMetadata = () => {
    setState({ ...state, duration: videoRef.current.duration });
  };

  const handleSeeking = () => {
    setState({ ...state, seeking: true });
  };

  const handleSeeked = () => {
    setState({ ...state, seeking: false });
  };

  const handleForward = () => {
    videoRef.current.currentTime += skipTime;
  };

  const handleRewind = () => {
    videoRef.current.currentTime -= skipTime;
  };

  function format(seconds) {
    if (isNaN(seconds)) {
      return '00:00';
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  function pad(string) {
    return ('0' + string).slice(-2);
  }

  const currentTime = videoRef.current ? videoRef.current.currentTime : '00:00';
  const duration = videoRef.current
    ? // state.duration for youtube vidoes and durations came form database duration
      state.duration
    : '00:00';

  const elapsedTime = format(currentTime);
  // format the total time
  const totalDuration = format(duration);

  const [elements, setElements] = useState([{ id: 1, text: '', type: 'image', posX: 0, posY: 0 }]);

  const [state2, setState2] = useState([]);
  const [saveCheck, setSaveCheck] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputText, setInputText] = useState('');

  console.log(text);

  const handleClick = (id) => {
    setSelectedIndex(id);
    let newArray = [...state2];
    const findInput = newArray.find((elem) => elem.id === id);
    setInputText(findInput.text);
  };

  const handleAddType = (value) => {
    setInputText('');
    let newElement;
    switch (value) {
      case 0:
        newElement = {
          text: '',
          type: 'text',
          posX: 0,
          posY: 0,
          backgroundColor: 'transparent',
          color: '#fff',
          fontSize: '',
          fontIndex: '',
          borderWidth: '0',
        };
        break;
      case 1:
        newElement = {
          endTime: '',
          startTime: '',
          type: 'trim',
        };
        break;
      case 2:
        newElement = {
          image: '',
          fileName: '',
          width: '',
          height: '',
          type: 'picture',
          posX: 0,
          posY: 0,
        };
        break;
      case 3:
        newElement = {
          filterIndex: '',
          type: 'filter',
        };
        break;
      case 4:
        newElement = {
          width: '',
          height: '',
          type: 'crop',
          posX: 0,
          posY: 0,
        };
        break;
      case 5:
        newElement = {
          width: '',
          height: '',
          type: 'sticker',
          stickerIndex: '😀',
          posX: 0,
          posY: 0,
        };
        break;
      default:
        return;
    }
    if (state2.length != 0) {
      if (!saveCheck) {
        handleSave();
      }
    }
    setState2((prevState) => [...prevState, { id: prevState.length + 1, ...newElement }]);
    setSaveCheck(false);
  };

  const handleSave = () => {
    setState2((prevState) => prevState.slice(0, -1));
  };

  const textArray = state2.filter((item) => item.type === 'text');
  const stickerArray = state2.filter((item) => item.type === 'sticker');

  const handleMouseDown = (event, id) => {
    event.preventDefault();
    const parent = document.getElementById('parent');
    const child = document.getElementById(`elem-${id}`);

    const diffX = event.clientX - child.offsetLeft;
    const diffY = event.clientY - child.offsetTop;

    const handleMouseMove = (event) => {
      const aX = event.clientX - diffX;
      const aY = event.clientY - diffY;
      const parentHeight = parent.offsetHeight;
      const elemHeight = child.offsetHeight;
      const parentWidth = parent.offsetWidth;
      const ChildWidth = child.offsetWidth;

      const boun = parentHeight - elemHeight;
      const bounW = parentWidth - ChildWidth;
      console.log('bounksdk =>', bounW);

      if (aX > 0 && aX < bounW && aY > 0 && aY < boun) {
        setState2((prevElements) =>
          prevElements.map((element, i) => {
            if (element.id === id) {
              return { ...element, posX: aX, posY: aY };
            }
            return element;
          }),
        );
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleItemChange = (value, property) => {
    if (property == 'text') {
      setInputText(value);
    }
    let updatevalue = state2.map((item) => {
      if (item.id === selectedIndex) {
        return {
          ...item,
          [property]: value,
        };
      }
      return item;
    });
    setState2(updatevalue);
  };

  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);

  // const handleSaveClick = () => {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //   context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

  //   const trimmedVideo = canvas.toDataURL('video/mp4');

  //   // Do something with the trimmed video, like uploading it to a server.
  //   console.log(trimmedVideo);
  // };
  console.log('state2 =>', state2);

  const handleSliderChange = (event, newValue, activeThumb) => {
    console.log('newValue', newValue, activeThumb);
    if (!Array.isArray(newValue)) {
      return;
    }
    setTrimStart(newValue[0]);
    setTrimEnd(newValue[1]);
  };

  const handlSelectEmoji = (stickerIndex) => {
    let newArray = [...state2];
  };

  const [filterIndex, setFilterIndex] = useState('');

  const filters = [
    'brightness(150%) contrast(150%) saturate(150%)',
    'grayscale(100%)',
    'hue-rotate(60deg)',
    'hue-rotate(120deg)',
    'hue-rotate(180deg)',
  ];
  const handleFilterChange = (index) => {
    setFilterIndex(index);
  };
  return (
    <Grid container mt={1} style={{ height: '84vh' }}>
      <Grid item lg={2} md={3} sm={12} xs={12} sx={sidebar} style={{ backgroundColor: '#fff', height: '84vh' }}>
        <div className="d-flex align-items-center justify-content-center m-2">
          <Image src="/assets/icons/arrow-left.svg" alt="back icon" height={22} width={22} />
          <p className="px-2">Edit Video</p>
        </div>
        <Box className="d-block align-items-center">
          <Tabs
            value={value}
            orientation={!isMobileScreen && 'vertical'}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: 'transparent' } }}
            elevation={0}
            aria-label="basic tabs example"
            className="d-md-flex"
          >
            <Tab
              disableRipple
              disableFocusRipple
              label={<span style={sidebarText}>Text</span>}
              {...a11yProps(0)}
              iconPosition="start"
              icon={
                <div style={value == 0 ? sidebarIconActive : sidebarIconInActive}>
                  <Image
                    src={value == 0 ? '/assets/icons/text-black.svg' : '/assets/icons/text.svg'}
                    alt="back icon"
                    height={22}
                    width={22}
                  />
                </div>
              }
              sx={value == 0 ? tabStyleActive : tabStyleInActive}
            />
            <Tab
              disableRipple
              disableFocusRipple
              label={<span style={sidebarText}>Crop</span>}
              elevation={0}
              {...a11yProps(1)}
              iconPosition="start"
              icon={
                <div style={value == 1 ? sidebarIconActive : sidebarIconInActive}>
                  <Image
                    src={value == 1 ? '/assets/icons/crop.svg' : '/assets/icons/crop-black.svg'}
                    alt="back icon"
                    height={22}
                    width={22}
                  />
                </div>
              }
              sx={value == 1 ? tabStyleActive : tabStyleInActive}
            />
            <Tab
              disableRipple
              disableFocusRipple
              label={<span style={sidebarText}>Trim</span>}
              elevation={0}
              {...a11yProps(2)}
              iconPosition="start"
              icon={
                <div style={value == 2 ? sidebarIconActive : sidebarIconInActive}>
                  <Image
                    src={value == 2 ? '/assets/icons/scissor-black.svg' : '/assets/icons/scissor.svg'}
                    alt="back icon"
                    height={22}
                    width={22}
                  />
                </div>
              }
              sx={value == 2 ? tabStyleActive : tabStyleInActive}
            />
            <Tab
              disableRipple
              disableFocusRipple
              label={<span style={sidebarText}>Picture</span>}
              {...a11yProps(3)}
              iconPosition="start"
              icon={
                <div style={value == 3 ? sidebarIconActive : sidebarIconInActive}>
                  <Image
                    src={value == 3 ? '/assets/icons/gallery-black.svg' : '/assets/icons/gallery.svg'}
                    alt="back icon"
                    height={22}
                    width={22}
                  />
                </div>
              }
              sx={value == 3 ? tabStyleActive : tabStyleInActive}
            />
            <Tab
              disableRipple
              disableFocusRipple
              label={<span style={sidebarText}>Filter</span>}
              {...a11yProps(4)}
              iconPosition="start"
              icon={
                <div style={value == 4 ? sidebarIconActive : sidebarIconInActive}>
                  <Image
                    src={value == 4 ? '/assets/icons/Group-back(1).svg' : '/assets/icons/Group.svg'}
                    alt="back icon"
                    height={22}
                    width={22}
                  />
                </div>
              }
              sx={value == 4 ? tabStyleActive : tabStyleInActive}
            />
            <Tab
              disableRipple
              disableFocusRipple
              label={<span style={sidebarText}>Stickers</span>}
              {...a11yProps(5)}
              iconPosition="start"
              icon={
                <div style={value == 5 ? sidebarIconActive : sidebarIconInActive}>
                  <Image
                    src={value == 5 ? '/assets/icons/Group-back(1).svg' : '/assets/icons/Group.svg'}
                    alt="back icon"
                    height={22}
                    width={22}
                  />
                </div>
              }
              sx={value == 5 ? tabStyleActive : tabStyleInActive}
            />
          </Tabs>
        </Box>
        <Box className="mt-4 text-center">
          <button
            style={{
              letterSpacing: '1.5px',
              color: 'white !important',
              borderRadius: '7px',
              fontWeight: '400',
            }}
            className="main-background-color text-white p-2 px-3 regular-mid border-0"
            sx={{ mr: 1 }}
          >
            Done
          </button>
        </Box>
      </Grid>
      <Grid
        container
        style={{ display: 'flex', alignItems: 'self-start', height: '84vh' }}
        item
        lg={10}
        md={9}
        sm={12}
        xs={12}
      >
        <div className={styles.videoContainer} style={{ position: 'relative', height: '84vh' }}>
          <div id="parent">
            <video
              ref={videoRef}
              onPlay={handlePlay}
              onPause={handlePause}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onSeeking={handleSeeking}
              onSeeked={handleSeeked}
              muted={state.muted}
              className={styles.media}
              style={{ filter: filterIndex }}
            >
              <source
                src={`https://giistyxelor.s3.amazonaws.com/giists/video/videoo4b3uLvwnZMNBadX2rJf_720p.mp4`}
                type="video/mp4"
              />
            </video>
            {value == 0 &&
              textArray.map((text) => (
                <input
                  ref={textareaRef}
                  readOnly
                  type="text"
                  value={text.text}
                  onClick={() => handleClick(text.id)}
                  style={{
                    position: 'absolute',
                    left: `${text.posX}px`,
                    top: `${text.posY}px`,
                    color: text.color,
                    backgroundColor: text.backgroundColor,
                    zIndex: 1000,
                    border: '1px solid #fff',
                    boxShadow: selectedIndex == text.id ? '0 0 0 0 red, 0 0 0 2px blue' : '',
                    borderRadius: '10px',
                    resize: 'none',
                    padding: '2px 6px',
                    cursor: 'pointer',
                    width: '200px',
                    height: '30px',
                    transition: 'linear 0.1s ',
                  }}
                  key={text.id}
                  id={`elem-${text.id}`}
                  onMouseDown={(event) => handleMouseDown(event, text.id)}
                />
              ))}
            {value == 5 &&
              stickerArray.map((sticker) => (
                <span
                  style={{
                    position: 'absolute',
                    left: `${sticker.posX}px`,
                    top: `${sticker.posY}px`,
                    color: sticker.color,
                    backgroundColor: sticker.backgroundColor,
                    zIndex: 1000,
                    border: '1px solid #fff',
                    boxShadow: selectedIndex == sticker.id ? '0 0 0 0 red, 0 0 0 2px blue' : '',
                    borderRadius: '10px',
                    resize: 'none',
                    padding: '2px 6px',
                    cursor: 'pointer',
                    fontSize: '30px',
                    transition: 'linear 0.1s',
                  }}
                  onClick={() => handleClick(sticker.id)}
                  key={sticker.id}
                  id={`elem-${sticker.id}`}
                  onMouseDown={(event) => handleMouseDown(event, sticker.id)}
                >
                  {sticker.stickerIndex}
                </span>
              ))}
            <div />
          </div>
          <div className="react-player mb-2 container d-flex justify-space-between mx-auto px-0">
            <div className="col-12 mt-4 px-0">
              <div
                className=" row align-items-center d-flex justify-content-center mx-2 text-white"
                style={{
                  padding: '15px 13px',
                  background: 'rgba(48, 53, 72, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                }}
              >
                <div className="position-absolute d-flex align-items-center container">
                  <span className="h4 mb-0 col-1 d-flex align-items-center">
                    {state.playing && elapsedTime != totalDuration && currentTime != 0.0 ? (
                      <Image
                        onClick={() => handlePause()}
                        src="/assets/icons/new/pause.png"
                        width="32px"
                        height="32px"
                        alt="pause"
                      />
                    ) : (
                      <Image
                        onMouseDownCapture={() => {
                          elapsedTime == totalDuration ? handlePlay() : console.log('good');
                        }}
                        onClick={() => {
                          elapsedTime == totalDuration ? handlePause() : handlePlay();
                        }}
                        src="/assets/icons/new/Group8435.svg"
                        width="32px"
                        height="32px"
                        alt="pause"
                      />
                    )}
                  </span>
                  <span className="fw-lighter light-xsmall col-3 col-lg-2 px-3">
                    <small className="text-white text-nowrap">
                      {elapsedTime} / {totalDuration}
                    </small>
                  </span>
                  <span className="h4 mb-0 px-2  align-items-center">
                    <GenericTooltip
                      placement="top"
                      title="Rewind"
                      component={
                        <Image
                          onClick={handleRewind}
                          src="/assets/icons/creationicons/ic_reverse.svg"
                          width="15px"
                          height="19px"
                          alt="reverse"
                        />
                      }
                    />
                  </span>
                  <span className="h4 mb-0 col-1 text-center align-items-center">
                    <GenericTooltip
                      placement="top"
                      title="Fast Forward"
                      component={
                        <Image
                          onClick={handleForward}
                          src="/assets/icons/creationicons/ic_forward.svg"
                          width="15px"
                          height="19px"
                          alt="forward"
                        />
                      }
                    />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <button className="border-0 bg-transparent mb-0 col-3 d-flex text-end align-items-center  justify-content-end">
                    <Image src="/assets/icons/new/red_circle_cross.svg" width="15px" height="19px" alt="cross" />
                    <span className="text-white ms-2" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Cancel
                    </span>
                  </button>
                  <button
                    onClick={() => setSaveCheck(true)}
                    className="border-0 bg-transparent mb-0 col-1 ms-3 d-flex text-end align-items-center  justify-content-end"
                  >
                    <Image src="/assets/icons/new/tick-circle.svg" width="15px" height="19px" alt="cross" />
                    <span className="text-white ms-2" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>{' '}
          </div>
          <div className={`${styles.mainStyle}`}>
            <TabPanel value={value} index={0}>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Type something here..."
                  value={inputText}
                  onChange={(e) => handleItemChange(e.target.value, 'text')}
                  className={styles.input}
                />
                <select onChange={handleFontChange} className={styles.selectFront}>
                  <option selected="selected" style={{ fontFamily: 'sans-serif' }}>
                    AB
                  </option>
                  {fontFamilies.map((item) => (
                    <option value={item} style={{ fontFamily: item }}>
                      AB
                    </option>
                  ))}
                </select>
                <div style={{ width: '40px', height: '40px' }} onClick={handleBgColorMenuClick}>
                  <GenericTooltip
                    placement="top"
                    title="text-color"
                    component={
                      <Image src={'/assets/icons/colors-square.svg'} alt="colors icon" height="40px" width="40px" />
                    }
                  />
                </div>
                {showBgColorMenu && (
                  <div
                    style={{
                      transition: 'all 0.3s ease-in-out',
                      opacity: showBgColorMenu ? 1 : 0,
                      transform: showBgColorMenu ? 'translateY(0)' : 'translateY(-10px)',
                      display: 'flex',
                    }}
                  >
                    {colors.map((item) => (
                      <div
                        onClick={() => handleItemChange(item, 'color')}
                        style={{
                          backgroundColor: item,
                          height: '25px',
                          width: '25px',
                          borderRadius: '50%',
                          display: 'inline-block',
                          margin: '0 5px',
                          cursor: 'pointer',
                          transition: 'ease-in-out 0.3s',
                        }}
                      />
                    ))}
                  </div>
                )}
                <div style={{ width: '40px', height: '40px' }} onClick={handleColorMenuClick}>
                  <GenericTooltip
                    placement="top"
                    title="Background-Color"
                    component={
                      <Image src={'/assets/icons/colors-square.svg'} alt="colors icon" height="40px" width="40px" />
                    }
                  />
                </div>
                <div>
                  {showColorMenu && (
                    <div
                      style={{
                        transition: 'all 0.3s ease-in-out',
                        opacity: showColorMenu ? 1 : 0,
                        transform: showColorMenu ? 'translateY(0)' : 'translateY(-10px)',
                        display: 'flex',
                      }}
                    >
                      {backgroundColors.map((item) => (
                        <div
                          onClick={() => handleItemChange(item, 'backgroundColor')}
                          style={{
                            backgroundColor: item,
                            height: '25px',
                            width: '25px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            margin: '0 5px',
                            cursor: 'pointer',
                            transition: 'ease-in-out 0.3s',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
            <TabPanel value={value} index={2}>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={[trimStart, trimEnd]}
                step={2}
                onChange={handleSliderChange}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => format((value / 100) * videoRef.current?.duration)}
                disableSwap
              />
            </TabPanel>
            <TabPanel value={value} index={3}></TabPanel>
            <TabPanel value={value} index={4}>
              <div className="d-flex align-items-center justify-content-around">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <Image
                    className={styles.BoxStyle}
                    src="/assets/images/unsplash__KaMTEmJnxY.png"
                    height={80}
                    width={100}
                    // onClick={() => handleFilterChange(filterIndex)}
                    style={{ filter: `hue-rotate(${(index - 1) * 60}deg)` }}
                    onClick={() => handleFilterChange(`hue-rotate(${(index - 1) * 60}deg)`)}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <div className="w-100 text-center">
                {emojis.map((item, index) => {
                  return (
                    <span
                      style={{ fontSize: '35px', cursor: 'pointer', padding: '0px 7px' }}
                      // onClick={() => handleItemChange(index,"")}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </TabPanel>
          </div>
        </div>
      </Grid>
    </Grid>

    //https://giistyxelor.s3.amazonaws.com/mediaLibrary/video/videoaWmyhh3HCqs4FzBXGSAf.mp4
  );
};

export default EditMediaModal;
