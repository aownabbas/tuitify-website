import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
// import dynamic from "next/dynamic";
import Header from './Header';
import COLORS from '../../public/assets/colors/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const Layout = ({
  children,
  heading,
  dashboard,
  image,
  Home,
  KH,
  bgColor,
  showGiistIcon,
  showBriffIcon,
  showSettingIcon,
  showKHubIcon,
  inputforSearch,
  setSearchInput, // setSearchInput , searchInput and handleGiistSearch are added to make local local search active through header
  searchInput,
  handleGiistSearch,
  setGetPlatData,
  getPlatData,
  showdropdown,
  setSearch,
  setReceivedBriifsData,
  setSendBriifsData,
  setArchivedBriifsData,
  setGlobalSearchPage,
  globalSearchPage,
  setDraftBriifsData,
  //open briif
  handlePlayedBriif,
  receivedBriifsData,
}) => {
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState(null);

  let router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    setLoginData(LoginData);
    handleResize();
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 790 && window.innerWidth > 480) {
      handleOpen();
    } else {
      handleClose();
    }
    if (window.innerWidth <= 480 && window.innerWidth > 320) {
      handleOpen();
    } else {
      handleClose();
    }
    if (window.innerWidth <= 320) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  return (
    <>
      <div
        id="wrapper"
        style={{
          // height: '100vh',
          // overflow: 'scroll',
          backgroundColor: bgColor ? bgColor : '#F1F1F1',
        }}
      >
        <Sidebar
          setSidebarMenuOpen={setSidebarMenuOpen}
          sidebarMenuOpen={sidebarMenuOpen}
          showGiistIcon={showGiistIcon}
          showBriffIcon={showBriffIcon}
          showSettingIcon={showSettingIcon}
        />
        <div
          id="page-content-wrapper"
          className="content-wrapper"
          style={{
            height: '100vh',
            minHeight: '100vh',
            backgroundColor: bgColor ? bgColor : '#F1F1F1',
            position:router.pathname == '/kh/KnowledgeHome' ? "relative" :""
          }}
        >
          <Header
            heading={heading}
            dashboard={dashboard}
            image={image}
            setSidebarMenuOpen={setSidebarMenuOpen}
            sidebarMenuOpen={sidebarMenuOpen}
            loginData={loginData}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            handleGiistSearch={handleGiistSearch}
            setGetPlatData={setGetPlatData}
            getPlatData={getPlatData}
            showdropdown={showdropdown}
            setSearch={setSearch}
            setReceivedBriifsData={setReceivedBriifsData}
            setSendBriifsData={setSendBriifsData}
            setArchivedBriifsData={setArchivedBriifsData}
            setGlobalSearchPage={setGlobalSearchPage}
            globalSearchPage={globalSearchPage}
            setDraftBriifsData={setDraftBriifsData}
            //open briif
            handlePlayedBriif={handlePlayedBriif}
            receivedBriifsData={receivedBriifsData}
            showBriffIcon={true}
          />
          <div className="col-12  d-inline-flex justify-content-center" style={{ maxWidth: '100%', overflow: 'none' }}>
            <div
              className={`col-12 col-sm-12 col-md-12 row ${Home || KH ? 'px-0' : 'px-2'}`}
              // style={{ paddingLeft: '20px', paddingRight: '20px' }}
            >
              <div className="col-12 justify-content-center row w-100 mx-auto px-0">
                <div
                  className={
                    heading == 'My Home'
                      ? `position-relative d-flex justify-content-center px-0`
                      : `position-relative d-flex justify-content-center ${Home || KH ? 'px-0' : ' px-2'}`
                  }
                  style={{
                    overflowY: Home ? 'hidden' : 'scroll',
                    overflowX: 'hidden',
                    height: router.pathname == '/kh/KnowledgeHome' ? '100vh' : '89vh',
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* modal will be shown on every page reload on first time */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Get the App
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Download Giisty App on smartphone for better experience
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
              <Box sx={{ height: '60px', width: '250px' }}>
                <Link href="https://play.google.com/store/apps/details?id=com.tuitify&hl=en_US&gl=US">
                  <Image src="/assets/images/Google_Play.svg" height={70} width={250} alt="" />
                </Link>
              </Box>
              <Box sx={{ height: '60px', width: '250px' }}>
                <Link href="https://apps.apple.com/in/app/giisty/id1550116149">
                  <Image src="/assets/images/appstore.svg" height={70} width={230} alt="" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Layout;
