import React from "react";
import "./vidbar.css";

function VidBar({ videoData }) {
  if (!videoData) {
    return null; // Or render a loading indicator here if needed
  }

  const profilePicUrl = videoData.snippet.thumbnails.default.url;

  return (
    <div className="bar">
      <div className="bar-left">
        <div className="bar-profile">
          <div className="bar-pfp">
            <img src={profilePicUrl} className="pfp" alt="Profile Pic" />
          </div>

          <div className="bar-textbox">
            <div className="bar-text1">
              {videoData.snippet.channelTitle}
            </div>

            <div className="bar-text2">
              {videoData.statistics.subscriberCount} Subscribers
            </div>
          </div>
        </div>

        <button className="bar-join">
          Join
        </button>

        <div className="bar-subscribe">
          Subscribe
        </div>
      </div>

      <div className="bar-right">
        <div className="bar-likebuttons">
          <button className="likebutton">
            <img src="../Photos/barlikeicon.svg" className="like" alt="Like" />
            <p className="para">
              {/* You can add like count or other info here */}
            </p>
          </button>

          <button className="dislikebutton">
            <img src="../Photos/bardislikeicon.svg" className="dislike" alt="Dislike" />
            <p className="para">
              {/* You can add dislike count or other info here */}
            </p>
          </button>
        </div>

        <button className="bar-btn">
          <img src="../Photos/barshareicon.svg" className="icon" alt="Share Icon" />
          <p className="para">
            Share
          </p>
        </button>

        <button className="bar-btn">
          <img src="../Photos/bardownloadicon.svg" className="icon" alt="Download Icon" />
          <p className="para">
            Download
          </p>
        </button>

        <button className="bar-btn">
          <img src="../Photos/barsaveicon.svg" className="icon" alt="Save Icon" />
          <p className="para">
            Save
          </p>
        </button>

        <button className="bar-reportbtn">
          <img src="../Photos/barreporticon.svg" className="icon" alt="Report Icon" />
        </button>
      </div>
    </div>
  );
}

export default VidBar;
