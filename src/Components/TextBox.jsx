import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./textbox.css";

function TextBox() {
    const [query, setQuery] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && query.trim()) {

            window.location.href = `/YoutubeHomePage/SearchPage?query=${encodeURIComponent(query)}`;
        }
    };

    return (
        <div className="textbox-container">
            <input
                type="text"
                className="textbox"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Link to={`/YoutubeHomePage/SearchPage?query=${encodeURIComponent(query)}`} className="textbox-searchbutton">
                <img className="textbox-searchimg" src="../Photos/Search-icon.png" alt="Search" />
            </Link>
            <button className="textbox-micbutton">
                <img className="textbox-micimg" src="../Photos/Mic-icon.png" alt="Voice Search" />
            </button>
        </div>
    );
}

export default TextBox;
