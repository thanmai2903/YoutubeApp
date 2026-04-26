# 🎥 YouTube Clone – Modern Responsive Video Streaming App

A fully responsive **YouTube-inspired video streaming web application** built using **React.js, Redux, Tailwind CSS, and React Router**.

This project replicates the core user experience of YouTube, including **video browsing, search functionality, responsive sidebar navigation, video watch page, search suggestions, category filters, and mobile-friendly UI**.

Designed with **clean architecture, reusable components, state management, and production-ready responsiveness**, this project demonstrates strong frontend development skills.

---

## 🚀 Live Features

- 🔍 **Smart Search Functionality**
  - Search videos dynamically
  - Displays real-time search results
  - Search suggestions / history dropdown

- 🎬 **Video Feed**
  - Popular and trending videos
  - Responsive video grid layout
  - Clear thumbnails with fallback handling

- 📱 **Fully Responsive Design**
  - Mobile
  - Tablet
  - Desktop
  - YouTube-like sidebar experience

- 📂 **Sidebar Navigation**
  - Home
  - Trending
  - Music
  - Live
  - Gaming
  - News
  - Sports
  - Learning

- 🎥 **Watch Page**
  - Individual video playback
  - Recommended videos
  - Responsive layout

- ⚡ **Redux State Management**
  - Sidebar open / close state
  - Search suggestion caching
  - Global app state handling

- 🎨 **Modern UI**
  - Tailwind CSS styling
  - Smooth transitions
  - Professional card layouts

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit**
- **React Router DOM**
- **Tailwind CSS**
- **Font Awesome Icons**

### APIs
- **YouTube Data API v3**

### State Management
- **Redux Store**
- **Slices**
- **Search cache**
- **Sidebar state**

- 📸 Core Functionalities Implemented
Search
Dynamic API-based search
Query-based routing
Search results rendering
Routing
Home page
Search results page
Watch page
Responsive Sidebar
Collapsible menu
Mobile overlay
Outside click close functionality
UI Enhancements
Loading shimmer effect
Hover animations
Active route highlighting
💡 What I Learned

Through this project, I strengthened my skills in:

React component design
Redux state flow
API handling with async fetch
Responsive layouts
Routing logic
UI debugging
Production-level frontend structure

---

## 🏗️ Project Architecture

```bash
src/
│
├── components/
│   ├── Header.js
│   ├── Sidebar.js
│   ├── VideoCard.js
│   ├── SearchResults.js
│   ├── Shimmer.js
│
├── utils/
│   ├── constants.js
│   ├── appSlice.js
│   ├── searchSlice.js
│   └── store.js
│
├── App.js
└── index.js

