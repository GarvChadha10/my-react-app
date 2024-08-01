import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import "./sidevid.css";
import useAuth from "./useAuth";

const API_KEY = "AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ";
const MAX_RESULTS_PER_REQUEST = 5;
const TOTAL_VIDEOS_TO_FETCH = 50; // You can set this to whatever total number you need

function SideVid() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      
      // Initialize URL and params
      let url = "https://www.googleapis.com/youtube/v3/videos";
      let params = {
        key: API_KEY,
        part: "snippet,statistics",
        maxResults: MAX_RESULTS_PER_REQUEST,
        pageToken: pageToken || undefined,
        regionCode: "IN",
      };

      // Handle authentication
      const token = isAuthenticated ? localStorage.getItem('google_token') : null;
      const headers = isAuthenticated ? { Authorization: `Bearer ${token}` } : {};

      if (isAuthenticated) {
        params = {
          key: API_KEY,
          part: "snippet",
          mine: true,
          maxResults: MAX_RESULTS_PER_REQUEST,
          pageToken: pageToken || undefined,
        };
        url = "https://www.googleapis.com/youtube/v3/videos";
      } else {
        params.chart = "mostPopular";
        url = "https://www.googleapis.com/youtube/v3/videos";
      }

      const response = await axios.get(url, { params, headers });

      console.log('API Response:', response.data); // Debugging API response

      const fetchedVideos = (response.data.items || [])
        .filter(item => item.snippet)
        .map((video) => ({
          id: video.id,
          thumbnail: video.snippet.thumbnails?.medium?.url || "",
          channelId: video.snippet.channelId,
          title: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          publishedAt: video.snippet.publishedAt,
          viewCount: video.statistics?.viewCount || 0,
        }));

      const channelIds = fetchedVideos.map(video => video.channelId);
      let updatedVideos = fetchedVideos;

      if (channelIds.length > 0) {
        const channelDetailsResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/channels",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              id: channelIds.join(","),
            },
          }
        );

        console.log('Channel Details Response:', channelDetailsResponse.data); // Debugging channel details response

        updatedVideos = fetchedVideos.map((video) => {
          const channelDetails = channelDetailsResponse.data.items.find(channel => channel.id === video.channelId);
          return {
            ...video,
            channelProfilePic: channelDetails?.snippet?.thumbnails?.medium?.url || "",
          };
        });
      }

      setVideos((prevVideos) => [...prevVideos, ...updatedVideos]);
      setPageToken(response.data.nextPageToken || null);
      setHasMore(!!response.data.nextPageToken);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // Initial fetch
  }, [isAuthenticated]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchVideos();
    }
  };

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

  if (loading && videos.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<h4 className="loader">Loading more videos...</h4>}
      useWindow={true} // Adjust based on your layout needs
    >
      <div className="sidevid-allvids">
        {videos.map(video => (
          <Link key={video.id} to={{ pathname: `/video/${video.id}`, state: { videoData: video } }} className="sidevid-container">
            <div className="sidevid-imgbox">
              <img className="sidevid-img" src={video.thumbnail} alt={video.title} />
            </div>
            <div className="sidevid-text">
              <p className="sidevid-text1">{video.title}</p>
              <p className="sidevid-text2">{video.channelTitle}</p>
              <p className="sidevid-text3">{`${formatViews(video.viewCount)} views • ${formatDate(video.publishedAt)}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default SideVid;
