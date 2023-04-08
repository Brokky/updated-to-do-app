import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./AppContext";
import App from "./App";
import ActiveTasks from "./routes/ActiveTasks";
import CompletedTasks from "./routes/CompletedTasks";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/active-tasks",
        element: <ActiveTasks />,
      },
      {
        path: "/completed-tasks",
        element: <CompletedTasks />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  </React.StrictMode>
);
