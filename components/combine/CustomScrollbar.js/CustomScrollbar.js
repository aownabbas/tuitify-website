import React, { useState, useCallback, useRef } from 'react';
import styles from './customScrollbar.module.css';

const CustomScrollbar = ({ height, width, children }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  const handleMouseEnter = () => {
    setShowScrollbar(true);
  };

  const handleMouseLeave = () => {
    setShowScrollbar(false);
  };

  return (
    <div
      className={`${styles.scrollable_container} ${showScrollbar ? styles.show_scrollbar : ''}`}
      style={{ maxHeight: height, width: width ? width : '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default CustomScrollbar;
