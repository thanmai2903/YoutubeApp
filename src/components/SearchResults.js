import React, { useEffect, useState } from "react"; 
import { useSearchParams, Link } from "react-router-dom"; 
import VideoCard from "./VideoCard"; 
import Shimmer from "./Shimmer"; 
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants"; 
const SearchResults = () => { const [searchParams] = useSearchParams(); 
  const query = searchParams.get("search_query"); 
  const [videos, setVideos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => { fetchSearchResults(); }, [query]); 
  const fetchSearchResults = async () => { setLoading(true); 
    try { 
      const data = await fetch( YOUTUBE_SEARCH_RESULTS_API + query ); 
      const json = await data.json(); setVideos(json.items || []); 
    } 
    catch (error) { 
      console.log(error); 
    }
    finally { setLoading(false); } 
  };
   if (loading) return <Shimmer />; 
   
   return ( <div className="p-4"> 
   <h2 className="text-xl font-semibold mb-5"> Search results for "{query}" </h2> 
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
    {videos.map((video) => ( 
      <Link key={video.id.videoId} to={"/watch?v=" + video.id.videoId} > 
      <VideoCard info={video} /> </Link> ))
      }
      </div> 
      </div> 
      ); 
    }; 
export default SearchResults;