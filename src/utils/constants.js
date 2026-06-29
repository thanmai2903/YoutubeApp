const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const OFFSET_LIVE_CHAT = 25;

export const YOUTUBE_VIDEO_API =
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_RESULTS_API =
  `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&key=${GOOGLE_API_KEY}&q=`;

export const YOUTUBE_SEARCH_API =
  `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&key=${GOOGLE_API_KEY}&q=`;

export const YOUTUBE_CHANNEL_API =
  `https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${GOOGLE_API_KEY}&id=`;

export const YOUTUBE_VIDEO_BY_ID_API =
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${GOOGLE_API_KEY}&id=`;