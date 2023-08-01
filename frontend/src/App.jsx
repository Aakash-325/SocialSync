/* eslint-disable react/prop-types */
import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Search from "./Pages/Search";
import { Home } from "./Pages/Home";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";
import { Sidebar } from "./components/Sidebar";
import ErrorPage from "./Pages/Error";
import { AuthContext } from "./context/AuthContext";
import Saved from "./Pages/Saved";
import Profile from "./Pages/Profile";

const App = () => {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/auth" />;
    }

    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Sidebar />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/search/:query",
          element: <Search />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
};

export default App;
