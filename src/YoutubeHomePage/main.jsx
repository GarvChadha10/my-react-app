import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './app';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  
  <GoogleOAuthProvider clientId="288950244855-qivl0vi990dlcj5lg8h7k2r1mhmfqid2.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
