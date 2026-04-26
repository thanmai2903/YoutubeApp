import { useState, useEffect } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // 🌙 DARK MODE APPLY
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [darkMode]);

  return (
    <div className="p-6 max-w-4xl mx-auto relative">

      <h1 className="text-3xl font-bold">⚙️ Settings</h1>

      <div className="mt-6 bg-white shadow-md rounded-xl p-6 space-y-6">

        {/* DARK MODE */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold">🌙 Dark Mode</h2>
            <p className="text-sm text-gray-500">
              Toggle dark theme
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-7 flex items-center rounded-full p-1 ${
              darkMode ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full transition ${
                darkMode ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div
          onClick={() => setShowNotification(true)}
          className="cursor-pointer"
        >
          <h2 className="font-semibold">🔔 Notifications</h2>
          <p className="text-sm text-gray-500">
            Click to view notifications
          </p>
        </div>

        {/* PRIVACY */}
        <div
          onClick={() => setShowPrivacy(true)}
          className="cursor-pointer"
        >
          <h2 className="font-semibold">🔐 Privacy</h2>
          <p className="text-sm text-gray-500">
            View privacy policy
          </p>
        </div>
      </div>

      {showNotification && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* 🔥 BACKDROP */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setShowNotification(false)}
    ></div>

    {/* 🔥 MODAL */}
    <div className="relative bg-white w-[90%] max-w-sm rounded-2xl shadow-2xl p-6 animate-fadeIn">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowNotification(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
      >
        ✖
      </button>

      {/* ICON */}
      <div className="flex justify-center text-3xl mb-3">
        🔔
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-center">
        Notifications
      </h2>

      {/* MESSAGE */}
      <p className="text-gray-500 text-center mt-2 text-sm">
        You're all caught up 🎉
      </p>

      {/* ACTION */}
      <button
        onClick={() => setShowNotification(false)}
        className="mt-5 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Got it
      </button>
    </div>
  </div>
)}

      {/* 🔐 PRIVACY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="font-bold text-lg">Privacy Policy</h2>
            <p className="mt-2 text-sm">
              We respect your data and privacy. Your history is stored locally.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;