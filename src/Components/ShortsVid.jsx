import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shortsvid.css'; 

const API_KEY = 'AIzaSyBvk7e1ynr7EIN3OF_kVM7R6YWEPzDYHNQ'; 
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const VIDEO_DETAILS_URL = `${BASE_URL}/videos`;

const fetchYouTubeShorts = async (query) => {
    try {

        const searchResponse = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 3,
                key: API_KEY,
            }
        });

        const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

        const videoDetailsResponse = await axios.get(VIDEO_DETAILS_URL, {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoIds,
                key: API_KEY,
            }
        });

        const shorts = videoDetailsResponse.data.items
            .filter(item => {
                const duration = item.contentDetails?.duration || '';
                const videoLength = parseDuration(duration);
                return videoLength <= 60;
            })
            .map(item => ({
                id: item.id,
                title: item.snippet.title,
                views: formatViews(item.statistics.viewCount),
                timeAgo: formatDate(item.snippet.publishedAt),
                channel: item.snippet.channelTitle,
                channelImage: item.snippet.thumbnails.default.url,
                thumbnail: item.snippet.thumbnails.medium.url
            }));

        return shorts;
    } catch (error) {
        console.error('Error fetching videos', error.message);
        return [];
    }
};

const parseDuration = (duration) => {
    const match = duration.match(/PT(?:([0-9]+)M)?(?:([0-9]+)S)?/);
    if (!match) return 0; 
    const minutes = match[1] ? parseInt(match[1], 10) : 0;
    const seconds = match[2] ? parseInt(match[2], 10) : 0;
    return minutes * 60 + seconds;
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

const formatDate = (date) => {
    const now = new Date();
    const publishedAt = new Date(date);
    const diffTime = Math.abs(now - publishedAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
};

const ShortsVid = () => {
    const [shorts, setShorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchYouTubeShorts('shorts').then(shorts => {
            setShorts(shorts);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data. Please try again later.</div>;

    return (
        <div className="shorts-container">
            {shorts.map(short => (
                <div key={short.id} className="short-card">
                    <a href={`https://www.youtube.com/watch?v=${short.id}`} target="_blank" rel="noopener noreferrer" className='help'>
                        <img className="short-thumbnail" src={short.thumbnail} alt={short.title} />
                        <div className="short-details">
                            <p className="short-title">{short.title}</p>
                            <p className="short-meta">{short.channel} • {short.views} • {short.timeAgo}</p>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ShortsVid;