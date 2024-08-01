import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import SideBarHome from '../Components/SideBarHome';
import Bdy from "../Components/Bdy";
import "./home.css";



function Home() 
{
  const [state, setState] = useState(false);

  const toggleSideBar = () => {
    setState(!state);
  };

  return (
    <div className="home">
      <NavBar onButtonClick={toggleSideBar}/>
      <div className="BigContainer">
      <SideBarHome state={state}/>
      <Bdy />
      </div>
    </div>
  );
}

export default Home;
