import React from "react";
import SignIn from "./SignIn";
import { Link } from 'react-router-dom';
import "./sidebarhome.css";

function SideBarHome({ state }) {
  const sidebarWidth = state ? 200 : 55;

  return (
    <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
      {state ? <SideBarOpen /> : <SideBarClosed />}
    </div>
  );
}

function SideBarOpen() {
  return(
    <div className="sidebaropen-container">

      <Link to = "/" className="sidebaropen-buttonhome">
        <img className="sidebaropen-image" src = "../Photos/sidebarhomeicon.svg"/>
        <p className="sidebaropen-texthome">
          Home
        </p>
      </Link>

      <Link to = "../YoutubeHomePage/Shorts" className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarshortsicon.svg"/>
        <p className="sidebaropen-text">
          Shorts
        </p>
      </Link>

      <Link to = "../YoutubeHomePage/Subscriptions" className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarsubscriptionsicon.svg"/>
        <p className="sidebaropen-text">
          Subscriptions
        </p>
      </Link>

      <hr />

      <Link to = "../YoutubeHomePage/You" className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarlibraryicon.svg"/>
        <p className="sidebaropen-text">
          You
        </p>
      </Link>

      <Link to = "../YoutubeHomePage/History" className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarhistoryicon.svg"/>
        <p className="sidebaropen-text">
          History
        </p>
      </Link>

      <hr />
      <div className="sidebaropen-midcontainer">
      <p className="sidebaropen-text"> 
        Sign in to like videos, comment and subscribe
      </p>

      <SignIn />
      </div>

      <hr />

      <h2>
        Explore
      </h2>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebartrendingicon.svg"/>
        <p className="sidebaropen-text">
          Trending
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarshoppingicon.svg"/>
        <p className="sidebaropen-text">
          Shopping
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarmusicicon.svg"/>
        <p className="sidebaropen-text">
          Music
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarmovieicon.svg"/>
        <p className="sidebaropen-text">
          Movies
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarliveicon.svg"/>
        <p className="sidebaropen-text">
          Live
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebargamingicon.svg"/>
        <p className="sidebaropen-text">
          Gaming
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarnewsicon.svg"/>
        <p className="sidebaropen-text">
          News
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebartrophyicon.svg"/>
        <p className="sidebaropen-text">
          Sports
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarcoursesicon.svg"/>
        <p className="sidebaropen-text">
          Courses
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarfashionicon.svg"/>
        <p className="sidebaropen-text">
          Fashion & Beauty
        </p>
      </button>

      <button className="sidebaropen-button">
        <img className="sidebaropen-image" src = "../Photos/sidebarpodcasticon.svg"/>
        <p className="sidebaropen-text">
          Podcasts
        </p>
      </button>

      <hr />

    </div>
  );
}

function SideBarClosed() 
{
    return(
      <div className="sidebarclosed-container">
      
      <Link to = "../" className="sidebarclosed-button">
        <img className="sidebarclosed-image" src = "../Photos/sidebarhomeicon.svg" />
        <p>Home</p>
      </Link>

      <Link to = "../YoutubeHomePage/Shorts" className="sidebarclosed-button">
        <img className="sidebarclosed-image" src = "../Photos/sidebarshortsicon.svg" />
        <p>Shorts</p>
      </Link>

      <Link to = "../YoutubeHomePage/Subscriptions" className="sidebarclosed-button">
        <img className="sidebarclosed-image" src = "../Photos/sidebarsubscriptionsicon.svg" />
        <p>Subscriptions</p>
      </Link>

      <Link to = "../YoutubeHomePage/You" className="sidebarclosed-button">
        <img className="sidebarclosed-image" src = "../Photos/sidebarlibraryicon.svg" />
        <p>You</p>
      </Link>

      <Link to = "../YoutubeHomePage/History" className="sidebarclosed-button">
        <img className="sidebarclosed-image" src = "../Photos/sidebarhistoryicon.svg" />
        <p>History</p>
      </Link>

    </div>
    );
}

export default SideBarHome;
