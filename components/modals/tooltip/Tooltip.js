import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    top: 'auto',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#384047',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    top: 'initial',
    bottom: 'calc(100% + 8px)',
    left: 0,
    backgroundColor: '#384047',
    color: '#ffffff', // Set the text color to white
    border: 'none'
  },
}));

const ArrowTooltips = ({ title, children,placement }) => {
  return (
      <BootstrapTooltip
        title={title}
        placement={placement}
        arrow
      >
        {children}
      </BootstrapTooltip>
  );
};

export default ArrowTooltips;
