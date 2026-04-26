import React, { useState } from "react";
import Button from "./Button";

const items = [
  "All",
  "Narasimha swamy songs",
  "Devotional songs",
  "Songs",
  "Cooking",
  "Live",
  "nature",
  "Cartoons",
  "Cricket",
  "Doremon",
  "Horror Movies",
  "Serials",
  "Home Decor",
];

const ButtonList = ({
  onCategoryChange,
}) => {
  const [active, setActive] =
    useState("All");

  const handleClick = (item) => {
    setActive(item);
    onCategoryChange(item);
  };

  return (
  <div className="w-full overflow-x-auto px-3 py-2 scrollbar-hide">
    <div className="flex gap-3 whitespace-nowrap">
      {items.map((item) => (
        <Button
          key={item}
          name={item}
          isActive={active === item}
          onClick={() =>
            handleClick(item)
          }
        />
      ))}
    </div>
  </div>
  );
};

export default ButtonList;
