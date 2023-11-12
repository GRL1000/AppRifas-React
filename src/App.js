import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import NuevaRifaComponent from './components/rifa/NuevaRifaComponent';
import React, { useEffect } from 'react';

function App() {

  const [token, setToken] = React.useState(null);

  const isTokenValid = () => {
    setToken(localStorage.getItem('secure_token'));
    return token !== null && token !== undefined;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent isTokenValid={isTokenValid}/>} />
        <Route path="/home" element={ token ? (<HomeComponent />) : (<Navigate to="/" />)} />
        <Route path="/rifa/nueva" element={<NuevaRifaComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App;
