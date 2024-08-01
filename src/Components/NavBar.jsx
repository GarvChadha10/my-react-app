import React, { useState } from "react";
import SideBarButton from "./SideBarButton";
import YoutubeIcon from "./YoutubeIcon";
import TextBox from "./TextBox";
import "./navbar.css";
import SignIn from "./SignIn";
import Settings from "./Settings";


function NavBar({onButtonClick}) 
{
  return (
    <div className="Container">
      <div className="TopLeft">
        <SideBarButton onlick={onButtonClick} />
        <YoutubeIcon />
      </div>

      <div className="TopMid">
        <TextBox />
      </div>

      <div className="TopRight">
        <Settings />
        <SignIn />
      </div>
    </div>
  );
}

export default NavBar;
