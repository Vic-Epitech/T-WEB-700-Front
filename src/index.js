import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import axios from 'axios';
import { corisXUserToken } from './utils/utils';

import { GoogleOAuthProvider } from '@react-oauth/google';

// axios.interceptors.request.use(
//   config => {
//       console.log('config 222')
//       const token = localStorage.getItem(corisXUserToken);
//       if (token) {
//           config.headers['Authorization'] = 'Bearer ' + token;
//       }
//       config.headers['Content-Type'] = 'application/json';
//       return config;
//   },
//   error => {
//       Promise.reject(error)
// });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>

  <GoogleOAuthProvider clientId="636326459530-i0s9anous6vgcacfti52pu7ej743gurq.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
  </GoogleOAuthProvider>


    {/* <React.StrictMode>
      <App />
    </React.StrictMode> */}
      
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
