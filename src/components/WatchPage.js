import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { closeMenu } from "../utils/appSlice";
import { YOUTUBE_VIDEO_BY_ID_API } from "../utils/constants";
import { addToHistory } from "../utils/historySlice";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const dispatch = useDispatch();

  const [videoData, setVideoData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // ✅ 1. FETCH VIDEO
  useEffect(() => {
    dispatch(closeMenu());

    const getVideoDetails = async () => {
      try {
        const res = await fetch(
          YOUTUBE_VIDEO_BY_ID_API + videoId
        );
        const json = await res.json();
        setVideoData(json.items?.[0]);
      } catch (e) {
        console.log(e);
      }
    };

    if (videoId) getVideoDetails();
  }, [videoId, dispatch]);

  // ✅ 2. ADD TO HISTORY (AFTER DATA LOADS)
  useEffect(() => {
    if (videoData) {
      dispatch(
        addToHistory({
          id: videoData.id,
          title: videoData.snippet.title,
          thumbnail:
            videoData.snippet.thumbnails.medium.url,
        })
      );
    }
  }, [videoData, dispatch]);

  const snippet = videoData?.snippet;
  const statistics = videoData?.statistics;

  return (
    <div className="flex flex-col w-full px-4 py-4">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1">

          {/* VIDEO */}
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>

          {/* TITLE */}
          <h1 className="text-lg font-semibold mt-4">
            {snippet?.title}
          </h1>

          {/* VIEWS */}
          <p className="text-sm text-gray-500">
            {statistics?.viewCount} views
          </p>

          {/* CHANNEL */}
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <img
                className="w-10 h-10 rounded-full"
                src={`https://i.pravatar.cc/100?u=${snippet?.channelId}`}
                alt="channel"
              />
              <div>
                <p className="font-semibold">
                  {snippet?.channelTitle}
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`px-4 py-2 rounded-full ${
                  liked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                👍 Like
              </button>

              <button
                onClick={() =>
                  setSubscribed(!subscribed)
                }
                className="px-4 py-2 rounded-full bg-black text-white"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* COMMENTS */}
          <CommentsContainer />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[350px]">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;