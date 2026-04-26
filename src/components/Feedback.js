import { useState } from "react";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;

    setShowSuccess(true);
    setMessage("");
  };

  return (
    <>
      {/* MAIN UI */}
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">💬 Feedback</h1>

        <div className="mt-6 bg-white shadow-md p-6 rounded-xl space-y-4">

          <div>
            <p className="font-medium">⭐ Rate your experience</p>
            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full"
            />
          </div>

          <textarea
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>

      {/* 🔥 CENTER SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          ></div>

          {/* MODAL */}
          <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 text-center animate-scaleIn">

            {/* ICON */}
            <div className="text-4xl mb-3">✅</div>

            {/* TITLE */}
            <h2 className="text-xl font-semibold">
              Feedback Submitted!
            </h2>

            {/* MESSAGE */}
            <p className="text-gray-500 mt-2 text-sm">
              Thank you for your feedback. We appreciate your time 🙌
            </p>

            {/* BUTTON */}
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;