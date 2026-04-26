import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-start gap-2 sm:gap-3 p-2 hover:bg-gray-100 rounded-lg transition">
      
      {/* Avatar */}
      <img
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="user"
      />

      {/* Message Content */}
      <div className="flex flex-col text-xs sm:text-sm md:text-base">
        
        {/* Name */}
        <span className="font-semibold text-gray-800">
          {name}
        </span>

        {/* Message */}
        <span className="text-gray-700 break-words">
          {message}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;