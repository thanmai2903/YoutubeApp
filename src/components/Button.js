import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/results?search_query=${name}`);
  };

  return (
    <button
      onClick={handleClick}
      className="
        whitespace-nowrap
        px-3 sm:px-4 
        py-1.5 sm:py-2
        text-xs sm:text-sm md:text-base
        bg-gray-100 
        rounded-full 
        hover:bg-gray-200 
        font-medium 
        transition
      "
    >
      {name}
    </button>
  );
};

export default Button;