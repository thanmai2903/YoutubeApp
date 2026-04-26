
import React, { useEffect, useState, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import {
  cacheResults,
  addToHistory,
} from "../utils/searchSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import {
  faVideo,
  faBell,
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] =
    useState("");
  const [suggestions, setSuggestions] =
    useState([]);
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchCache = useSelector(
    (store) =>
      store.search.suggestionsCache
  );

  const searchHistory = useSelector(
    (store) =>
      store.search.searchHistory
  );


  const getSearchSuggestions =
    useCallback(async () => {
      try {
        const data = await fetch(
          YOUTUBE_SEARCH_API +
            searchQuery
        );

        const json =
          await data.json();

        setSuggestions(json[1] || []);

        dispatch(
          cacheResults({
            [searchQuery]:
              json[1] || [],
          })
        );
      } catch (error) {
        console.log(error);
      }
    }, [searchQuery, dispatch]);
      useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions(searchHistory || []);
      return;
    }

    const timer = setTimeout(() => {
      if (
        searchCache &&
        searchCache[searchQuery]
      ) {
        setSuggestions(
          searchCache[searchQuery]
        );
      } else {
        getSearchSuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
}, [searchQuery, searchCache, searchHistory, getSearchSuggestions]);


  const handleSearch = (
    query = searchQuery
  ) => {
    if (!query.trim()) return;

    dispatch(addToHistory(query));

    navigate(
      `/results?search_query=${query}`
    );

    setShowSuggestions(false);
  };

  const startVoiceSearch = () => {
    if (
      !window.webkitSpeechRecognition
    ) {
      alert(
        "Voice search not supported"
      );
      return;
    }

    const recognition =
      new window.webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

      setSearchQuery(transcript);
      handleSearch(transcript);
    };

    recognition.start();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white shadow-sm flex items-center justify-between px-4">
      {/* LEFT */}
      <div className="flex items-center min-w-fit">
        <img
          onClick={() =>
            dispatch(toggleMenu())
          }
          className="h-6 w-6 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
          alt="menu"
        />

        <img
          className="h-6 ml-4 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="logo"
          onClick={() =>
            navigate("/")
          }
        />
      </div>

      {/* CENTER */}
      <div className="relative flex flex-1 max-w-2xl mx-8">
        <input
          className="w-full px-5 py-2 border border-gray-300 rounded-l-full outline-none"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onFocus={() =>
            setShowSuggestions(true)
          }
          onChange={(e) =>
            setSearchQuery(
              e.target.value
            )
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSearch(
              searchQuery
            )
          }
        />

        <button
          onClick={() =>
            handleSearch()
          }
          className="px-6 border border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200"
        >
          <FontAwesomeIcon
            icon={
              faMagnifyingGlass
            }
          />
        </button>

        <button
          onClick={
            startVoiceSearch
          }
          className="ml-3 px-4 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FontAwesomeIcon
            icon={faMicrophone}
          />
        </button>

        {showSuggestions && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl z-[60]">
            <ul>
              {suggestions.map(
                (
                  s,
                  index
                ) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSearch(
                        s
                      )
                    }
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    🔍 {s}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 text-lg min-w-fit">
        <FontAwesomeIcon
          icon={faVideo}
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faBell}
          className="cursor-pointer"
        />

        <img
          className="rounded-full h-8 w-8"
          src="https://i.pravatar.cc/150?img=12"
          alt="profile"
        />
      </div>
    </header>
  );
};

export default Head;

