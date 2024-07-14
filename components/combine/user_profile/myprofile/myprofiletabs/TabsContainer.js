import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rank from './profile_tabs/Rank';
import MyGroups from './profile_tabs/MyGroups';
import MyActivity from './profile_tabs/MyActivity';
import classes from '../MyProfile.module.css';
import CustomScrollbar from '../../../CustomScrollbar.js/CustomScrollbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsContainer = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab
            className={`w-33 regular-xsmall text-capitalize ${value === 0 ? 'active' : ''}`}
            label={<span className={`${value === 0 ? classes.tab_label : classes.tab_label_active}`}>My Groups</span>}
            {...a11yProps(0)}
          />
          <Tab
            className={`w-33 regular-xsmall text-capitalize ${value === 1 ? 'active' : ''}`}
            label={<span className={`${value === 1 ? classes.tab_label : classes.tab_label_active}`}>My Activity</span>}
            {...a11yProps(1)}
          />
          <Tab
            className={`w-33 regular-xsmall text-capitalize ${value === 2 ? 'active' : ''}`}
            label={<span className={`${value === 2 ? classes.tab_label : classes.tab_label_active}`}>Rank</span>}
            {...a11yProps(2)}
          />

          <Box
            className="active-indicator"
            sx={{
              height: 2.4,
              backgroundColor: '#303548',
              width: 'calc(33% - 10px)',
              position: 'absolute',
              bottom: 0,
              left: 'calc(33% * ' + value + ' + 10px)',
              transition: 'left 0.3s ease-in-out',
            }}
          />
        </Tabs>
        <Box sx={{ borderBottom: 2, borderColor: 'divider', width: '95%', margin: 'auto' }}></Box>
      </Box>
      <Box className="mt-3">
        <CustomScrollbar height={'40vh'}>
          <TabPanel value={value} index={0}>
            <MyGroups userGroups={props.userGroups} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyActivity userProfileDetails={props.userProfileDetails} userActivity={props.userActivity} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Rank userProfileDetails={props.userProfileDetails} />
          </TabPanel>
        </CustomScrollbar>
      </Box>
    </Box>
  );
};

export default TabsContainer;
