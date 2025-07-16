import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Cargar logo como base64 y guardar en localStorage si no existe
const logoPath = process.env.PUBLIC_URL + '/assets/Logo_Vertical.png';
if (!localStorage.getItem('logoImg')) {
  fetch(logoPath)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = function () {
        localStorage.setItem('logoImg', reader.result); // reader.result es base64
      };
      reader.readAsDataURL(blob);
    });
}

const logoLoginPath = process.env.PUBLIC_URL + '/assets/Logo.png';
if (!localStorage.getItem('logoLogin')) {
  fetch(logoLoginPath)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = function () {
        localStorage.setItem('logoLogin', reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

const logoPerfilPath = process.env.PUBLIC_URL + '/assets/356349.webp';
if (!localStorage.getItem('logoLogin')) {
  fetch(logoLoginPath)
    .then(res => res.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = function () {
        localStorage.setItem('logoPerfil', reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
