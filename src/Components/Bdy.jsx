import React, { useState } from "react";
import Chips from "./Chips";
import Videos from "./Videos";
import "./bdy.css";

function Bdy() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="MainBdy">
      <Chips onCategorySelect={handleCategorySelect} />
      <Videos selectedCategory={selectedCategory} />
    </div>
  );
}

export default Bdy;
