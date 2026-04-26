import React, { useState } from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <div className="w-full">
      {/* Sticky category tabs */}
      <div className="sticky top-16 z-30 bg-white border-b shadow-sm">
        <ButtonList
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Video content */}
      <div className="pt-4">
        <VideoContainer
          category={selectedCategory}
        />
      </div>
    </div>
  );
};

export default MainContainer;