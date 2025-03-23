import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import LoginLayout from "./Layout/LoginLayout";
import LandingLayout from "./Layout/LandingLayout";
import Home from "./Pages/Home/Home";
import ProfileLayout from "./Layout/ProfileLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Donations from "./Pages/Donations/Donations";
import DonationStatus from "./Pages/DonationStatus/DonationStatus";
import DonationHistory from "./Pages/DonationHistory/DonationHistory";
import MyProfile from "./Pages/MyProfile/MyProfile";

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
    {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "donations",
                element: <Donations />,
            },
            {
                path: "donation-status",
                element: <DonationStatus />,
            },
            {
                path: "donation-history",
                element: <DonationHistory />,
            },
            {
                path: "my-profile",
                element: <MyProfile />,
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
