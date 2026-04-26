import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import VideoCard from "./VideoCard";
import {
  YOUTUBE_VIDEO_API,
  YOUTUBE_SEARCH_RESULTS_API,
} from "../utils/constants";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const VideoContainer = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const pageRef = useRef(1);
  const isFetchingRef = useRef(false); 

  const getVideos = useCallback(async () => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      let apiUrl = "";

      if (category && category !== "All") {
        apiUrl =
          YOUTUBE_SEARCH_RESULTS_API +
          encodeURIComponent(category);
      } else {
        apiUrl = YOUTUBE_VIDEO_API;
      }

      const data = await fetch(apiUrl);
      const json = await data.json();

      setVideos((prev) => [
        ...prev,
        ...(json.items || []),
      ]);

      pageRef.current += 1;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsFetching(false);
      isFetchingRef.current = false; // ✅ reset
    }
  }, [category]);

  // 🔁 Initial load / category change
  useEffect(() => {
    setVideos([]);
    setLoading(true);
    pageRef.current = 1;

    getVideos();
  }, [category, getVideos]);

  // 🔁 Infinite Scroll
  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + window.scrollY;

    const threshold =
      document.body.offsetHeight - 300;

    if (
      scrollPosition >= threshold &&
      !isFetchingRef.current
    ) {
      getVideos();
    }
  }, [getVideos]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [handleScroll]);

  // ⏳ Loader
  if (loading && videos.length === 0)
    return <Shimmer />;

  return (
    <div className="px-6 mx-auto">
      
      {/* 🔥 FIRST ROW */}
      <div className="grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {videos.slice(0, 8).map((video) => (
          <Link
            key={video.id?.videoId || video.id}
            to={
              "/watch?v=" +
              (video.id?.videoId || video.id)
            }
          >
            <VideoCard info={video} />
          </Link>
        ))}
      </div>

      

      {/* 🔥 REMAINING VIDEOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {videos.slice(8).map((video) => (
          <Link
            key={video.id?.videoId || video.id}
            to={
              "/watch?v=" +
              (video.id?.videoId || video.id)
            }
          >
            <VideoCard info={video} />
          </Link>
        ))}
      </div>

      {/* 🔄 Loader */}
      {isFetching && (
        <div className="text-center py-6 text-gray-500">
          Loading more videos...
        </div>
      )}
    </div>
  );
};

export default VideoContainer;