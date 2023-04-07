import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppProvider } from './AppContext';
import App from './App'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <AppProvider>
        <App />
      </AppProvider>,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
