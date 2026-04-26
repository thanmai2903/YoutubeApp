import React, { useState, useEffect } from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics, id } = info;

  const {
    channelTitle,
    title,
    thumbnails,
    publishedAt,
    channelId,
  } = snippet;

  const videoId = id?.videoId || id;

  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [channelIcon, setChannelIcon] = useState("");

  // 🔥 Fetch channel icon
  useEffect(() => {
    const getChannelIcon = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=YOUR_API_KEY`
        );
        const data = await res.json();

        setChannelIcon(
          data?.items?.[0]?.snippet?.thumbnails?.default?.url
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (channelId) getChannelIcon();
  }, [channelId]);

  const formatViews = (views) => {
    const count = Number(views);

    if (!count) return "1.2M views";

    if (count >= 1000000)
      return (count / 1000000).toFixed(1) + "M views";

    if (count >= 1000)
      return (count / 1000).toFixed(1) + "K views";

    return count + " views";
  };

  const getUploadTime = () => {
    if (!publishedAt) return "2 days ago";

    const date = new Date(publishedAt);
    const now = new Date();

    const diff = Math.max(
      1,
      Math.floor((now - date) / (1000 * 60 * 60 * 24))
    );

    return `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  const hdThumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="w-full min-w-0 p-2 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:scale-[1.02]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
        {hovered ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
            title="preview"
            allow="autoplay"
          />
        ) : (
          <img
            className="w-full h-full object-cover rounded-xl"
            src={hdThumbnail}
            alt="thumbnail"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                thumbnails?.high?.url ||
                thumbnails?.medium?.url;
            }}
          />
        )}

        {/* Duration */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          12:45
        </span>
      </div>

      {/* Content */}
      <div className="mt-3 flex gap-3">
        {/* 🔥 Avatar (dynamic now) */}
        <img
          className="w-10 h-10 rounded-full"
          src={
            channelIcon ||
            `https://i.pravatar.cc/100?u=${channelId}`
          }
          alt="channel"
        />

        <div className="flex-1">
          <h2 className="font-semibold text-sm line-clamp-2 leading-5">
            {title}
          </h2>

          <p className="text-xs text-gray-600 mt-1">
            {channelTitle}
          </p>

          <p className="text-xs text-gray-500">
            {formatViews(statistics?.viewCount)} •{" "}
            {getUploadTime()}
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className={`px-3 py-1 rounded-full text-xs transition ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {liked ? "Liked ❤️" : "Like 👍"}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setSubscribed(!subscribed);
              }}
              className={`px-3 py-1 rounded-full text-xs transition ${
                subscribed
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;