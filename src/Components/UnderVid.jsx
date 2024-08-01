import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './undervid.css';
import VidBar from './VidBar';

function UnderVid({ videoId }) {
  const formatDate = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  const formatViews = (viewCount) => {
    const views = Number(viewCount); // Ensure viewCount is a number

    if (views >= 1_000_000) {
      return `${(views / 1_000_000).toFixed(1)}M`;
    } else if (views >= 1_000) {
      return `${(views / 1_000).toFixed(1)}K`;
    } else {
      return views.toString();
    }
  };

  const [videoData, setVideoData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            key: 'AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ',
            part: 'snippet,statistics',
            id: videoId,
          },
        });

        setVideoData(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
        // Handle error as needed
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!videoData) {
    return null; // Or render a loading indicator here
  }

  // Convert newlines to <br /> tags for HTML rendering
  const formatDescription = (description) => {
    return description.replace(/\n/g, '<br />');
  };

  // Get the initial part of the description
  const getInitialDescription = (description) => {
    const lines = description.split('\n');
    return lines.slice(0, 2).join('\n');
  };

  return (
    <div className="Box">
      <div className="Vid-title">
        <p>{videoData.snippet.title}</p>
      </div>

      <div className="Vid-bar">
        <VidBar videoData={videoData} /> 
      </div>

      <div className="Vid-description">
        <p className="desc-title">
          {formatViews(videoData.statistics.viewCount)} views &nbsp; Premiered {formatDate(videoData.snippet.publishedAt)}
        </p>
        <p 
          className="desc-content"
          dangerouslySetInnerHTML={{ __html: showFullDescription ? formatDescription(videoData.snippet.description) : formatDescription(getInitialDescription(videoData.snippet.description)) }} 
        />
        <button 
          className="desc-toggle" 
          onClick={() => setShowFullDescription(prev => !prev)}
        >
          {showFullDescription ? 'Show less' : '...more'}
        </button>
      </div>
    </div>
  );
}

export default UnderVid;
