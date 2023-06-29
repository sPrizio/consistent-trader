import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';
import 'bulma/css/bulma.min.css'
import './css/main.css'
import "react-datepicker/dist/react-datepicker.css";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./pages/Error/ErrorPage";
import ContentPage from "./pages/Base/ContentPage";
import LoginPage from "./pages/Security/LoginPage";
import RegisterPage from "./pages/Security/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ContentPage pageId={'overview'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/overview",
        element: <ContentPage pageId={'overview'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/about",
        element: <ContentPage pageId={'about'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/contact",
        element: <ContentPage pageId={'contact'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/help",
        element: <ContentPage pageId={'help'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/report",
        element: <ContentPage pageId={'report'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/profile",
        element: <ContentPage pageId={'profile'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/history",
        element: <ContentPage pageId={'history'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/analysis",
        element: <ContentPage pageId={'analysis'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/retrospectives",
        element: <ContentPage pageId={'retrospectives'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/dashboard",
        element: <ContentPage pageId={'dashboard'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/news",
        element: <ContentPage pageId={'news'} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <ErrorPage />
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
