import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import LoginLayout from "./Layout/LoginLayout";
import LandingLayout from "./Layout/LandingLayout";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/insights",
                element: <Home />,
            },
            {
                path: "/projects",
                element: <Home />,
            },
            {
                path: "/donate-now",
                element: <Home />,
            },
        ]
    },
    {
        path: "/",
        element: <LoginLayout />,
        children: [
            {
                path: "/sign-in",
                element: <SignIn />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
        ]
    },
], {
    basename: "/food-management-system"
});

function App() {
    return <RouterProvider router={router} />;
}

export default App
