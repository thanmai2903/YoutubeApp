import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    videos: [],
  },
  reducers: {
    addToHistory: (state, action) => {
      state.videos = [
        action.payload,
        ...state.videos.filter(
          (v) => v.id !== action.payload.id
        ),
      ];
    },

    removeFromHistory: (state, action) => {
      state.videos = state.videos.filter(
        (v) => v.id !== action.payload
      );
    },
  },
});

export const { addToHistory, removeFromHistory } = historySlice.actions;

export default historySlice.reducer;