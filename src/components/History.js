import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromHistory } from "../utils/historySlice";

const History = () => {
  const history = useSelector(
    (store) => store.history?.videos || []
  );

  const dispatch = useDispatch();

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        📜 Watch History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500">
          No videos watched yet
        </p>
      ) : (
        <div className="flex flex-col gap-4">

          {history.map((video) => (
            <Link key={video.id} to={`/watch?v=${video.id}`}>
              
              {/* 🔥 SINGLE CARD */}
              <div className="relative flex gap-4 bg-white p-3 rounded-lg hover:bg-gray-100 transition group">

                {/* ❌ DELETE BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeFromHistory(video.id));
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg opacity-0 group-hover:opacity-100 transition"
                >
                  ❌
                </button>

                <img
                  src={video.thumbnail}
                  alt="thumb"
                  className="w-44 h-24 object-cover rounded-lg"
                />

                <div className="flex flex-col">
                  <p className="font-semibold line-clamp-2">
                    {video.title}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Watched recently
                  </p>
                </div>

              </div>

            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default History;