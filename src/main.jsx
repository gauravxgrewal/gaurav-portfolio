import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import './index.css'; // Aapki main CSS file

// Sabhi page components ko import karo
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';


// 1. Router configuration banayein
const router = createBrowserRouter([
  {

   
    path: '/',
    element: <App />, // Parent route, jo layout render karega (App.jsx)
    children: [
      // Yeh sabhi child routes hain jo <Outlet /> ke andar render honge
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'projects', // Dhyan dein, yahan '/' nahi hai
        element: <Projects />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

// 2. App ko RouterProvider ke saath render karein
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router={router} />
  </React.StrictMode>
);