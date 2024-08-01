import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SideBarVideo from '../Components/SideBarVideo';
import SearchPageVid from "../Components/SearchPageVid";
import axios from 'axios';
import "./searchpage.css";

const API_KEY = 'AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ';


const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const VIDEO_DETAILS_URL = `${BASE_URL}/videos`;

const fetchVideos = async (query) => {
    try {
        // Step 1: Search for videos
        const searchResponse = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10,
                key: API_KEY,
            }
        });

        // Extract video IDs
        const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

        // Step 2: Get detailed video information
        const videoDetailsResponse = await axios.get(VIDEO_DETAILS_URL, {
            params: {
                part: 'snippet,statistics',
                id: videoIds,
                key: API_KEY,
            }
        });

        return videoDetailsResponse.data.items.map(item => ({
            id: item.id,
            title: item.snippet.title,
            views: formatViews(item.statistics.viewCount),
            timeAgo: formatDate(item.snippet.publishedAt),
            channel: item.snippet.channelTitle,
            channelImage: item.snippet.thumbnails.default.url,
            thumbnail: item.snippet.thumbnails.medium.url
        }));
    } catch (error) {
        console.error('Error fetching videos', error.message);
        // Provide more detailed error information
        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('General error:', error.message);
        }
        return [];
    }
};

const formatDate = (date) => {
    const now = new Date();
    const publishedAt = new Date(date);
    const diffTime = Math.abs(now - publishedAt);
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


function SearchPage() {
    const [videos, setVideos] = useState([]);
    const [state, setState] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    const toggleSideBar = () => {
        setState(!state);
    };

    useEffect(() => {
        if (query) {
            fetchVideos(query).then(setVideos);
        }
    }, [query]);

    return (
        <div className="SearchPageContainer">
            <NavBar onButtonClick={toggleSideBar} />
            <div className="PageContainer">
                <SideBarVideo state={state} />
                <div className="vids">
                    {videos.map(video => (
                        <SearchPageVid key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
