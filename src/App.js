import "./App.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./utils/store";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResults from "./components/SearchResults";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Feedback from "./components/Feedback";
import History from "./components/History";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        index: true,
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      
      {
  path: "results",
  element: <SearchResults />,
},
 { path: "settings", element: <Settings /> },
      { path: "help", element: <Help /> },
      { path: "feedback", element: <Feedback /> },
      { path: "history", element: <History /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;