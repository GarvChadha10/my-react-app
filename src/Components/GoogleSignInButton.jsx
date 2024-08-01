import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trySampleRequest, checkTokenScope } from '../YoutubeHomePage/oauth2Helper'; // Import helper functions
import './googleSignin.css';

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    trySampleRequest(); // Initiates OAuth flow if needed
  };

  const handleSuccess = (response) => {
    console.log(response);
    const token = response.credential;

    if (token) {
      localStorage.setItem('google_token', token);
      navigate('/'); // Redirect after successful sign-in
    }
  };

  const handleError = (error) => {
    console.error('Google login failed', error);
  };

  return (
    <button
      className="google-signin-button"
      type="button"
      onClick={handleSignIn}
    >
      <img className="google-signin-img" src="../Photos/Google-Signin-icon.svg" alt="Sign in with Google" />
      <p className="google-signin-text">Sign in with Google</p>
    </button>
  );
};

export default GoogleSignInButton;
