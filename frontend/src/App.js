import "./style.scss";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// axios.defaults.baseURL = "https://codedaily-production.up.railway.app/api/";
axios.defaults.baseURL = "http://localhost:6969/api/";
axios.defaults.withCredentials = true;

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/:page",
                element: <Home />,
            },
            {
                path: "/post/:id",
                element: <Single />,
            },
            {
                path: "/write",
                element: <Write />,
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    return (
        <div className="app">
            <ToastContainer theme="dark" />
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
