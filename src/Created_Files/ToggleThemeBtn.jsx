import React, { useContext } from 'react';
import { ColorModeContext } from './ThemeContext';
import { Fab } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ToggleThemeButton = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  return (
    <Fab
      color="primary"
      onClick={toggleColorMode}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </Fab>
  );
};

export default ToggleThemeButton;
