// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Settings from "./Settings";
// import { Link } from "react-router-dom";
// import "./Videos.css";
// import useAuth from "./useAuth";

// const API_KEY = "AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ"; 
// const MAX_RESULTS_PER_REQUEST = 5;
// const TOTAL_VIDEOS_TO_FETCH = 50;

// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const numRequests = Math.ceil(TOTAL_VIDEOS_TO_FETCH / MAX_RESULTS_PER_REQUEST);
//         const requests = [];
//         const token = localStorage.getItem('google_token');
//         let url = "https://www.googleapis.com/youtube/v3/videos";
//         let params = {
//           key: API_KEY,
//           part: "snippet,statistics",
//           chart: "mostPopular",
//           maxResults: MAX_RESULTS_PER_REQUEST,
//           regionCode: "IN"
//         };

//         if (isAuthenticated) {
//           url = "https://www.googleapis.com/youtube/v3/videos";
//           params = {
//             key: API_KEY,
//             part: "snippet",
//             mine: true
//           };
//           for (let i = 0; i < numRequests; i++) {
//             const response = await axios.get(url, {
//               params: {
//                 ...params,
//                 maxResults: MAX_RESULTS_PER_REQUEST,
//                 pageToken: i > 0 ? requests[i - 1].data.nextPageToken : undefined,
//               },
//               headers: { Authorization: `Bearer ${token}` }
//             });
//             requests.push(response);
//           }
//         } else {
//           for (let i = 0; i < numRequests; i++) {
//             const response = await axios.get(url, {
//               params: {
//                 ...params,
//                 pageToken: i > 0 ? requests[i - 1].data.nextPageToken : undefined,
//               }
//             });
//             requests.push(response);
//           }
//         }

//         // Flatten the responses and check for undefined properties
//         const fetchedVideos = requests.flatMap(response => 
//           response.data.items
//             .filter(item => item.snippet) // Ensure snippet exists
//             .map((video) => ({
//               id: video.id,
//               thumbnail: video.snippet.thumbnails.medium.url,
//               channelId: video.snippet.channelId,
//               title: video.snippet.title,
//               channelTitle: video.snippet.channelTitle,
//               publishedAt: video.snippet.publishedAt,
//               subscriberCount: video.statistics ? video.statistics.subscriberCount : 0,
//             }))
//         );

//         const channelIds = fetchedVideos.map((video) => video.channelId);
//         const channelDetailsResponse = await axios.get(
//           "https://www.googleapis.com/youtube/v3/channels",
//           {
//             params: {
//               key: API_KEY,
//               part: "snippet",
//               id: channelIds.join(","),
//             },
//           }
//         );

//         const updatedVideos = fetchedVideos.map((video, index) => ({
//           ...video,
//           channelProfilePic: channelDetailsResponse.data.items[index]?.snippet?.thumbnails?.medium?.url || "", // Safe access
//         }));

//         setVideos(updatedVideos);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [isAuthenticated]);

//   const formatDate = (date) => {
//     const diffTime = Math.abs(new Date() - new Date(date));
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return `${diffDays} days ago`;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data. Please try again later.</div>;
//   }

//   return (
//     <div className="videos-container">
//       {videos.map((video) => (
//         <Link key={video.id} to={{ pathname: `/video/${video.id}`, state: { videoData: video } }} className="videos-videobox">
//           <img
//             className="videos-image"
//             src={video.thumbnail}
//             alt="Video Thumbnail"
//           />
//           <div className="videos-textcontainer">
//             <div className="pfp">
//               <img
//                 src={video.channelProfilePic} 
//                 className="pfp-image"
//                 alt="Channel Profile Pic"
//               />
//             </div>
//             <div className="text">
//               <div className="text1">{video.title}</div>
//               <div className="text2">
//                 <div className="text21">{video.channelTitle}</div>
//                 <div className="text22">
//                   {video.subscriberCount} &nbsp; • {formatDate(video.publishedAt)}
//                 </div>
//               </div>
//             </div>
//             <div className="set">
//               <Settings />
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Videos;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Settings from "./Settings";
// import { Link } from "react-router-dom";
// import "./Videos.css";
// import useAuth from "./useAuth";
// import { checkTokenScope } from '../YoutubeHomePage/oauth2Helper'; // Import helper functions

// const API_KEY = "YOUR_API_KEY_HERE";
// const MAX_RESULTS_PER_REQUEST = 5;
// const TOTAL_VIDEOS_TO_FETCH = 10;

// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     checkTokenScope(); // Ensure token scope is valid
//     const fetchVideos = async () => {
//       try {
//         const numRequests = Math.ceil(TOTAL_VIDEOS_TO_FETCH / MAX_RESULTS_PER_REQUEST);
//         const requests = [];
//         let url = "https://www.googleapis.com/youtube/v3/videos";
//         let params = {
//           key: API_KEY,
//           part: "snippet,statistics",
//           chart: "mostPopular",
//           maxResults: MAX_RESULTS_PER_REQUEST,
//           regionCode: "IN"
//         };

//         if (isAuthenticated) {
//           const token = localStorage.getItem('google_token');
//           url = "https://www.googleapis.com/youtube/v3/videos";
//           params = {
//             key: API_KEY,
//             part: "snippet",
//             mine: true
//           };
//           for (let i = 0; i < numRequests; i++) {
//             const response = await axios.get(url, {
//               params: {
//                 ...params,
//                 maxResults: MAX_RESULTS_PER_REQUEST,
//                 pageToken: i > 0 ? requests[i - 1].data.nextPageToken : undefined,
//               },
//               headers: { Authorization: `Bearer ${token}` }
//             });
//             requests.push(response);
//           }
//         } else {
//           for (let i = 0; i < numRequests; i++) {
//             const response = await axios.get(url, {
//               params: {
//                 ...params,
//                 pageToken: i > 0 ? requests[i - 1].data.nextPageToken : undefined,
//               }
//             });
//             requests.push(response);
//           }
//         }

//         const fetchedVideos = requests.flatMap(response => response.data.items.map((video) => ({
//           id: video.id,
//           thumbnail: video.snippet.thumbnails.medium.url,
//           channelId: video.snippet.channelId,
//           title: video.snippet.title,
//           channelTitle: video.snippet.channelTitle,
//           publishedAt: video.snippet.publishedAt,
//           subscriberCount: video.statistics?.subscriberCount || 0,
//         })));

//         const channelIds = fetchedVideos.map((video) => video.channelId);
//         const channelDetailsResponse = await axios.get(
//           "https://www.googleapis.com/youtube/v3/channels",
//           {
//             params: {
//               key: API_KEY,
//               part: "snippet",
//               id: channelIds.join(","),
//             },
//           }
//         );

//         const updatedVideos = fetchedVideos.map((video, index) => ({
//           ...video,
//           channelProfilePic: channelDetailsResponse.data.items[index].snippet.thumbnails.medium.url,
//         }));

//         setVideos(updatedVideos);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [isAuthenticated]);

//   const formatDate = (date) => {
//     const diffTime = Math.abs(new Date() - new Date(date));
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return `${diffDays} days ago`;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data. Please try again later.</div>;
//   }

//   return (
//     <div className="videos-container">
//       <div className="videos-header">
//         <h1>Trending Videos</h1>
//       </div>
//       <div className="videos-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <img
//               src={video.thumbnail}
//               alt={video.title}
//               className="video-thumbnail"
//             />
//             <div className="video-details">
//               <h3 className="video-title">{video.title}</h3>
//               <p className="video-channel">
//                 <img
//                   src={video.channelProfilePic}
//                   alt={video.channelTitle}
//                   className="channel-profile-pic"
//                 />
//                 <span>{video.channelTitle}</span>
//               </p>
//               <p className="video-published">
//                 Published {formatDate(video.publishedAt)}
//               </p>
//               <p className="video-subscribers">
//                 {video.subscriberCount} Subscribers
//               </p>
//               <Link to={`/video/${video.id}`} className="video-link">Watch</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Videos;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Settings from "./Settings";
// import { Link } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroller";
// import "./Videos.css";
// import useAuth from "./useAuth";

// const API_KEY = "AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ";
// const INITIAL_RESULTS = 25;
// const MAX_RESULTS_PER_REQUEST = 5;

// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [pageToken, setPageToken] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const { isAuthenticated } = useAuth();

//   const fetchVideos = async () => {
//     try {
//       setLoading(true);

//       let url = isAuthenticated
//         ? "https://www.googleapis.com/youtube/v3/subscriptions"
//         : "https://www.googleapis.com/youtube/v3/videos";

//       let params = {
//         key: API_KEY,
//         part: "snippet,statistics",
//         chart: isAuthenticated ? undefined : "mostPopular",
//         maxResults: MAX_RESULTS_PER_REQUEST,
//         regionCode: "IN",
//         pageToken: pageToken || undefined,
//       };

//       const response = await axios.get(url, {
//         params,
//         headers: isAuthenticated ? { Authorization: `Bearer ${localStorage.getItem('google_token')}` } : {},
//       });

//       console.log('API Response:', response.data); // Debugging API response

//       const fetchedVideos = (response.data.items || [])
//         .filter(item => item.snippet)
//         .map((video) => ({
//           id: video.id,
//           thumbnail: video.snippet.thumbnails?.medium?.url || "",
//           channelId: video.snippet.channelId,
//           title: video.snippet.title,
//           channelTitle: video.snippet.channelTitle,
//           publishedAt: video.snippet.publishedAt,
//           subscriberCount: video.statistics?.subscriberCount || 0,
//         }));

//       const channelIds = fetchedVideos.map((video) => video.channelId);
//       let updatedVideos = fetchedVideos;
//       if (channelIds.length > 0) {
//         const channelDetailsResponse = await axios.get(
//           "https://www.googleapis.com/youtube/v3/channels",
//           {
//             params: {
//               key: API_KEY,
//               part: "snippet",
//               id: channelIds.join(","),
//             },
//           }
//         );

//         console.log('Channel Details Response:', channelDetailsResponse.data); // Debugging channel details response

//         updatedVideos = fetchedVideos.map((video) => {
//           const channelDetails = channelDetailsResponse.data.items.find(channel => channel.id === video.channelId);
//           return {
//             ...video,
//             channelProfilePic: channelDetails?.snippet?.thumbnails?.medium?.url || "",
//           };
//         });
//       }

//       setVideos((prevVideos) => [...prevVideos, ...updatedVideos]);
//       setPageToken(response.data.nextPageToken || null);
//       setHasMore(!!response.data.nextPageToken);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideos(); // Initial fetch with the first batch of videos
//   }, [isAuthenticated]);

//   const loadMore = () => {
//     if (hasMore && !loading) {
//       fetchVideos();
//     }
//   };

//   const formatDate = (date) => {
//     const diffTime = Math.abs(new Date() - new Date(date));
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return `${diffDays} days ago`;
//   };

//   if (loading && videos.length === 0) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data. Please try again later.</div>;
//   }

//   return (
//     <InfiniteScroll
//       pageStart={0}
//       loadMore={loadMore}
//       hasMore={hasMore}
//       loader={<h4 className="loader">Loading more videos...</h4>}
//       useWindow={true} // Adjust based on your layout needs
//     >
//       <div className="videos-container">
//         {videos.map((video) => (
//           <Link key={video.id} to={{ pathname: `/video/${video.id}`, state: { videoData: video } }} className="videos-videobox">
//             <img
//               className="videos-image"
//               src={video.thumbnail}
//               alt="Video Thumbnail"
//             />
//             <div className="videos-textcontainer">
//               <div className="pfp">
//                 <img
//                   src={video.channelProfilePic}
//                   className="pfp-image"
//                   alt="Channel Profile Pic"
//                 />
//               </div>
//               <div className="text">
//                 <div className="text1">{video.title}</div>
//                 <div className="text2">
//                   <div className="text21">{video.channelTitle}</div>
//                   <div className="text22">
//                     {video.subscriberCount} &nbsp; • {formatDate(video.publishedAt)}
//                   </div>
//                 </div>
//               </div>
//               <div className="set">
//                 <Settings />
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </InfiniteScroll>
//   );
// };

// export default Videos;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Settings from "./Settings";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Optional: Import default styles
import "./Videos.css";
import useAuth from "./useAuth";

const API_KEY = "AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ"; // Replace with your actual API key
const MAX_RESULTS_PER_REQUEST = 5;
const TOTAL_VIDEOS_TO_FETCH = 50; // Total number of videos to fetch

const Videos = ({ selectedCategory }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated } = useAuth(); // Custom hook for authentication

  const fetchVideos = async () => {
    try {
      setLoading(true);

      let url = "https://www.googleapis.com/youtube/v3/videos";
      let params = {
        key: API_KEY,
        part: "snippet,statistics",
        maxResults: MAX_RESULTS_PER_REQUEST,
        pageToken: pageToken || undefined,
        regionCode: "IN",
      };

      if (isAuthenticated) {
        params = {
          key: API_KEY,
          part: "snippet",
          mine: true,
          maxResults: MAX_RESULTS_PER_REQUEST,
          pageToken: pageToken || undefined,
        };
        url = "https://www.googleapis.com/youtube/v3/videos";
      } else if (selectedCategory === "All") {
        params.chart = "mostPopular";
        url = "https://www.googleapis.com/youtube/v3/videos";
      } else {
        url = "https://www.googleapis.com/youtube/v3/search";
        params.q = selectedCategory;
        params.type = "video";
        params.part = "snippet";
      }

      const token = isAuthenticated ? localStorage.getItem('google_token') : null;
      const headers = isAuthenticated ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(url, { params, headers });

      const fetchedVideos = (response.data.items || [])
        .filter(item => item.snippet)
        .map((video) => ({
          id: video.id.videoId || video.id,
          thumbnail: video.snippet.thumbnails?.medium?.url || "",
          channelId: video.snippet.channelId,
          title: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          publishedAt: video.snippet.publishedAt,
          subscriberCount: video.statistics?.subscriberCount || 0,
          viewCount: video.statistics?.viewCount || 0,
        }));

      const channelIds = fetchedVideos.map((video) => video.channelId);

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
    setVideos([]); // Clear previous videos
    fetchVideos(); // Fetch videos based on the selected category
  }, [selectedCategory, isAuthenticated]);

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
    const views = Number(viewCount);

    if (views >= 1_000_000) {
      return `${(views / 1_000_000).toFixed(1)}M`;
    } else if (views >= 1_000) {
      return `${(views / 1_000).toFixed(1)}K`;
    } else {
      return views.toString();
    }
  };

  if (loading && videos.length === 0) {
    return (
      <div className="videos-container">
        {Array.from({ length: MAX_RESULTS_PER_REQUEST }).map((_, index) => (
          <div key={index} className="videos-videobox">
            <Skeleton height={193} width={343} />
            <div className="videos-textcontainer">
              <div className="pfp">
                <Skeleton circle height={30} width={30} />
              </div>
              <div className="text">
                <Skeleton height={35} width={200} />
                <Skeleton height={20} width={150} />
              </div>
              <div className="set">
                <Skeleton circle height={21} width={21} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<h4 className="loader" key={0}>Loading more videos...</h4>}
      useWindow={true} // Adjust based on your layout needs
    >
      <div className="videos-container">
        {videos.map((video) => (
          <Link key={video.id} to={{ pathname: `/video/${video.id}`, state: { videoData: video } }} className="videos-videobox">
            <img
              className="videos-image"
              src={video.thumbnail}
              alt="Video Thumbnail"
            />
            <div className="videos-textcontainer">
              <div className="pfp">
                <img
                  src={video.channelProfilePic}
                  className="pfp-image"
                  alt="Channel Thumbnail"
                />
              </div>
              <div className="text">
                <div className="text1">{video.title}</div>
                <div className="text2">
                  <div className="text21">{video.channelTitle}</div>
                  <div className="text22">
                    {formatViews(video.viewCount)} views &nbsp; • {formatDate(video.publishedAt)}
                  </div>
                </div>
              </div>
              <div className="set">
                <Settings />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Videos;
