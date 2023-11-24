import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../assets/it_logo_black.png';

function LoadingScreenComponent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src={logo} alt="Logo" style={{ marginBottom: '20px' }} />
      <CircularProgress />
    </div>
  );
}

export default LoadingScreenComponent;
