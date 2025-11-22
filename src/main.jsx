import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Closet from './pages/Closet.jsx';
import Add from './pages/Add.jsx';
import Builder from './pages/Builder.jsx';
import Outfit from './pages/Outfit.jsx';
import Planner from './pages/Planner.jsx';

// use the React app css (remove ../css/style.css)
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Closet /> },
      { path: 'add', element: <Add /> },
      { path: 'builder', element: <Builder /> },
      { path: 'outfit', element: <Outfit /> },
      { path: 'planner', element: <Planner /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
