import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFireFlameCurved,
  faMusic,
  faTv,
  faHeadset,
  faNewspaper,
  faGear,
  faFlag,
  faLightbulb,
  faVolleyballBall,
  faQuestionCircle,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { toggleMenu } from "../utils/appSlice"; // adjust path if needed

const menuItems = [
  { name: "Home", icon: faHome, path: "/" },
  { name: "Trending", icon: faFireFlameCurved, path: "/results?search_query=trending" },
  { name: "Music", icon: faMusic, path: "/results?search_query=music" },
  { name: "Live", icon: faTv, path: "/results?search_query=live" },
  { name: "Gaming", icon: faHeadset, path: "/results?search_query=gaming" },
  { name: "News", icon: faNewspaper, path: "/results?search_query=news" },
  { name: "Sports", icon: faVolleyballBall, path: "/results?search_query=sports" },
  { name: "Learning", icon: faLightbulb, path: "/results?search_query=learning" },
];

const extraItems = [
  { name: "Settings", icon: faGear, path: "/settings" },
  { name: "History", icon: faFlag, path: "/history" },
  { name: "Help", icon: faQuestionCircle, path: "/help" },
  { name: "Feedback", icon: faMessage, path: "/feedback" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const location = useLocation();

  return (
    <>
      {/* Mobile / tablet overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch(toggleMenu())}
        ></div>
      )}

      <aside
        className={`fixed top-16 left-0 h-full z-50 bg-white transition-all duration-300 shadow-sm
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isMenuOpen ? "w-56" : "w-20"}
        block`}
      >
        <div className="overflow-y-auto h-full px-2 py-3">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              expanded={isMenuOpen}
            />
          ))}

          <hr className="my-4" />

          {extraItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link key={item.name} to={item.path}>
                <div
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer
                  ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {isMenuOpen && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ item, expanded }) => {
  const location = useLocation();

  const active =
    location.pathname + location.search === item.path;

  return (
    <Link to={item.path}>
      <div
        className={`flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer transition
        ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        <FontAwesomeIcon icon={item.icon} />
        {expanded && (
          <span className="text-sm font-medium">{item.name}</span>
        )}
      </div>
    </Link>
  );
};

export default Sidebar;