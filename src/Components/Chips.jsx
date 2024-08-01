import React, { useState } from "react";
import "./chips.css";


const CATEGORY_LIST = [
  "Music",
  "Gaming",
  "News",
  "Entertainment",
  "Sports",
  "Technology",
  "Education",
  "Science",
  "Travel",
  "Lifestyle",
  "Health",
  "Comedy",
  "Movies",
  "Live",
  "How-to & Style",
  "Autos & Vehicles",
  "Pets & Animals",
  "People & Blogs",
  "Nonprofits & Activism",
  "Religion & Spirituality",

];


const getRandomCategories = (categories, num) => {
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

function Chips({ onCategorySelect }) {

  const [categories] = useState(["All", ...getRandomCategories(CATEGORY_LIST, 10 + Math.floor(Math.random() * 6))]);


  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); 
  };

  return (
    <div className="chip-row">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`chip-button ${selectedCategory === category ? "selected" : ""}`}
          onClick={() => handleClick(category)}
        >
          <p>{category}</p>
        </button>
      ))}
    </div>
  );
}

export default Chips;
