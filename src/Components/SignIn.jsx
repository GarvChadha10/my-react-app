// import React from "react";
// import "./signin.css";

// function SignIn()
// {
//     return(
        
//         <button className= "signin-button" >
            
//             <img className="signin-img" src="../Photos/Signin-icon.svg" />

//             <p className="signin-text">
//                 Sign in 
//             </p>
//         </button>
//     );
// }

// export default SignIn;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css'; // Ensure this CSS file is available

const SignIn = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('../YoutubeHomePage/SignInPage'); // Navigate to the sign-in page
  };

  return (
    <button className="signin-button" onClick={handleClick}>
      <img className="signin-img" src="../Photos/Signin-icon.svg" alt="Sign In" />
      <p className="signin-text">Sign in</p>
    </button>
  );
};

export default SignIn;
