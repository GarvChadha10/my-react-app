import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import SideBarVideo from '../Components/SideBarVideo';
import NavBar from '../Components/NavBar';
import UnderVid from '../Components/UnderVid';
import "./videoplayer.css";
import SideVid from '../Components/SideVid';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [state, setState] = useState(false);

  const toggleSideBar = () => {
    setState(!state);
  };

  return (
    <div className="video-player-page">
      <NavBar onButtonClick={toggleSideBar}/>
      <div className="BigContainer">
          <SideBarVideo state = {state}/>  
          <div className="smallcontainer">
            
                <div className="VidSection">
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} width="1200px" height="650px" controls playing />
                <UnderVid videoId={videoId}/>
                </div>

                <div>
                  <SideVid />
                </div>
          </div>
      </div>

    </div>
  );
};

export default VideoPlayer;
