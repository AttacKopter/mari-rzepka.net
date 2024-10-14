import './App.css'
import ActionBar from './ActionBar/ActionBar.tsx'

import Home from "./Pages/Home/Home.tsx";
import Projects from "./Pages/Projects.tsx";
import Goals from "./Pages/Goals.tsx";
import About from "./Pages/About.tsx";
import Games from "./Pages/Games.tsx";

import {
    createBrowserRouter, Router,
    RouterProvider, useLocation,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <div>
                <ActionBar />
                <Home />
            </div>,
    },
    {
        path: "/Projects",
        element:
            <div>
                <ActionBar />
                <Projects />
            </div>,
    },
    {
        path: "/Goals",
        element:
            <div>
                <ActionBar />
                <Goals />
            </div>,
    },
    {
        path: "/About",
        element:
            <div>
                <ActionBar />
                <About />
            </div>,
    },
    {
        path: "/Games",
        element:
            <div>
                <ActionBar />
                <Games />
            </div>,
    },
]);



function App() {


    return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
