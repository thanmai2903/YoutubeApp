import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    suggestionsCache: {},
    searchHistory: [],
  },

  reducers: {
    cacheResults: (state, action) => {
      state.suggestionsCache = {
        ...state.suggestionsCache,
        ...action.payload,
      };
    },

    addToHistory: (state, action) => {
      const query = action.payload.trim();

      if (!query) return;

      state.searchHistory = [
        query,
        ...state.searchHistory.filter((item) => item !== query),
      ].slice(0, 8);
    },

    clearHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { cacheResults, addToHistory, clearHistory } =
  searchSlice.actions;

export default searchSlice.reducer;