import { useState } from "react";

const faqs = [
  {
    q: "How to watch videos?",
    a: "Click on any video thumbnail to start watching instantly.",
  },
  {
    q: "How to subscribe a channel?",
    a: "Click on the subscribe button below the video.",
  },
  {
    q: "How to manage history?",
    a: "Go to History section from sidebar to view and clear history.",
  },
  {
    q: "How to report content?",
    a: "Click the 3 dots on video and choose report option.",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold">❓ Help Center</h1>

      <div className="mt-6 space-y-3">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <p className="font-medium">{item.q}</p>

            {openIndex === index && (
              <p className="text-gray-600 mt-2 text-sm">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;