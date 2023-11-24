import "../fontawesome";
import logoImage from "../assets/log.svg";
import registerImage from "../assets/register.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Bounce } from "react-awesome-reveal";
import Button from '@mui/material/Button';
import error from '../assets/error.png';
import errorConn from '../assets/lost-connection.png';

function LoginComponent({isTokenValid}) {
  const [isSignUpMode, setIsSignInUpMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPasssword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  //Error de credenciales
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCloseErrorModal = () => setShowErrorModal(false);

  //Error de conexión
  const [showErrorCModal, setShowCErrorModal] = useState(false);
  const [errorCMessage, setErrorCMessage] = useState('');
  const handleCloseCErrorModal = () => setShowCErrorModal(false);

  const toggleMode = () => {
    setIsSignInUpMode(!isSignUpMode);
  };

  const fnLogin = async (e) => {
    e.preventDefault();

    // Validar campos
    const validationErrors = {};

    // Validar el email con una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username.trim() || !emailRegex.test(username)) {
      setEmailError('El campo Usuario debe ser un email válido');
      return;
    }

      // Validar longitud mínima de la contraseña
  if (password.trim().length < 8) {
    setPasswordError('La contraseña debe tener al menos 8 caracteres');
    return;
  }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: username,
        password: password,
      });
  
      if (response.data.acceso === "ok") {
        localStorage.setItem("secure_token", response.data.token);
        isTokenValid();
        navigate("/home");
      } else {
        setError("Credenciales incorrectas. Por favor inténtelo de nuevo.");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
  
      if (error.response) {
        setErrorMessage("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
        setShowErrorModal(true);
      } else if (error.request) {
        setErrorCMessage("Error de conexión. Por favor, comprueba tu conexión a Internet.");
        setShowCErrorModal(true);
      } else {
        setErrorMessage("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
        setShowErrorModal(true);
      }
    }
  };
  

  return (
    <div>
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <div className="forms-container">
              <div className="signin-signup">
                  <form className="sign-in-form">
                  <h2 className="title">Inicia Sesión</h2>

                  <div className="input-field" style={{ position: 'relative' }}>
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Usuario" value={username} onChange={(e) => {setUsername(e.target.value);
                    setEmailError(''); }} />
                    {emailError && (
                      <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red' }}>
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => {setPasssword(e.target.value);
                      setPasswordError(''); }} />
                      {passwordError && (
                      <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red' }}>
                        {passwordError}
                      </p>
                    )}
                  </div>

                  <input type="submit" value="ingresar" className="btn solid" onClick={fnLogin} />
                  <p className="social-text">O ingresa con...</p>

                  <div className="social-media">
                      <a href="#" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon">
                      <i className="fab fa-twitter"></i>
                      </a>
                      <a className="social-icon">
                      <i className="fab fa-google"></i>
                      </a>

                      <a href="#" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                      </a>
                  </div>
                  </form>

                  <form className="sign-up-form">
                  <h2 className="title">Regístrate Gratis</h2>
                  <div className="input-field">
                      <i className="fas fa-user"></i>
                      <input type="text" placeholder="Usuario" />
                  </div>

                  <div className="input-field">
                      <i className="fas fa-envelope"></i>
                      <input type="email" placeholder="Correo electrónico" />
                  </div>

                  <div className="input-field">
                      <i className="fas fa-lock"></i>
                      <input type="password" placeholder="Contraseña" />
                  </div>

                  <input type="submit" className="btn" value="Registrate" />
                  <p className="social-text">O ingresa con...</p>

                  <div className="social-media">
                      <a href="#" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon">
                      <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="social-icon">
                      <i className="fab fa-google"></i>
                      </a>
                      <a href="#" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                      </a>
                  </div>
                  </form>
              </div>
          </div>

          <div className="panels-container">
              <div className="panel left-panel">
                  <div className="content">
                  <h3>¿Nuevo Aquí?</h3>
                  <p>
                      ¡Regístrate en la página y disfruta de nuestros beneficios además
                      de la posibilidad de ganar increíbles premios!
                  </p>
                  <button className="btn transparent" onClick={toggleMode}>Registrarse</button>
                  </div>
                  <img src={logoImage} className="image" alt="" />
              </div>

              <div className="panel right-panel">
                  <div className="content">
                  <h3>¿Ya eres uno de nosotros?</h3>
                  <p>
                      ¡Bienvenido de vuelta! Ingresa para continuar con tus sorteos
                      favoritos y consultar tus ganancias
                  </p>
                  <button className="btn transparent" onClick={toggleMode}>
                      Iniciar Sesión
                  </button>
                  </div>
                  <img src={registerImage} className="image" alt="" />
              </div>
          </div>
      </div>
      <Dialog open={showErrorModal} onClose={handleCloseErrorModal} TransitionComponent={Bounce}
      PaperProps={{
        style: {
        marginTop: '15.5%',
      }
    }}>
      <DialogContent style={{ textAlign: 'center', width: '450px', height: '320px'}}>
        <img src={error} alt="Error" style={{ width: '100px', height: '100px', marginTop: '20px' }} />
        <p style={{ fontSize: '20px', paddingTop: '20px', paddingBottom: '20px' }}>{errorMessage}</p>
        <Button variant="contained" color="primary" onClick={handleCloseErrorModal}>
          OK
        </Button>
      </DialogContent>
    </Dialog>

    <Dialog open={showErrorCModal} onClose={handleCloseCErrorModal} TransitionComponent={Bounce}
      PaperProps={{
        style: {
        marginTop: '15.5%',
      }
    }}>
      <DialogContent style={{ textAlign: 'center', width: '450px', height: '320px'}}>
        <img src={errorConn} alt="Error" style={{ width: '100px', height: '100px', marginTop: '20px' }} />
        <p style={{ fontSize: '20px', paddingTop: '20px', paddingBottom: '20px' }}>{errorCMessage}</p>
        <Button variant="contained" color="primary" onClick={handleCloseCErrorModal}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
   </div>
  );
}

export default LoginComponent;
