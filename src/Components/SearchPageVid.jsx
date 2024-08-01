import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./searchpagevid.css";

function SearchPageVid({ video }) {
    return (
        <Link to={{ pathname: `/video/${video.id}`, state: { videoData: video } }} className="sidevid-containers">
            <div className="sidevid-imgboxs">
                <img
                    className="sidevid-imgs"
                    src={video.thumbnail}
                    alt={video.title}
                />
            </div>
            <div className="sidevid-texts">
                <p className="sidevid-text1s">{video.title}</p>
                <p className="sidevid-text3s">{video.views} views• {video.timeAgo}</p>
                <div className="imgtexts">
                    <img
                        src={video.channelImage}
                        className="text2imgs"
                        alt={video.channel}
                    />
                    <p className="sidevid-text2s">{video.channel}</p>
                </div>
            </div>
        </Link>
    );
}

SearchPageVid.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        views: PropTypes.string,
        timeAgo: PropTypes.string,
        channel: PropTypes.string.isRequired,
        channelImage: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired
};

export default SearchPageVid;
