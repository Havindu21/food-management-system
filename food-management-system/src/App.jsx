import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignInV2 from "./Pages/SignInV2";
import LoginLayout from "./Layout/LoginLayout";
import LandingLayout from "./Layout/LandingLayout";
import Home from "./Pages/Home/Home";
import ProfileLayout from "./Layout/ProfileLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Donations from "./Pages/Donations/Donations";
import DonationStatus from "./Pages/DonationStatus/DonationStatus";
import DonationHistory from "./Pages/DonationHistory/DonationHistory";
import MyProfile from "./Pages/MyProfile/MyProfile";
import JoinUs from "./Pages/JoinUs/JoinUs";
import RegistrationLayout from "./Layout/RegistrationLayout";
import AvailableDonations from "./Pages/AvailableDonations/AvailableDonations";
import RequestDonations from "./Pages/RequestDonations/RequestDonations";
import ActivePickups from "./Pages/ActivePickups/ActivePickups";
import PickupHistory from "./Pages/PickupHIstory/PickupHistory";
import RecepientSettings from "./Pages/RecepientSettings/RecepientSettings";
import Registration from "./Pages/JoinUs/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "insights", element: <Home /> },
            { path: "projects", element: <Home /> },
            { path: "donate-now", element: <Home /> },
        ],
    },
    {
        path: "/",
        element: <LoginLayout />,
        children: [
            { path: "sign-in", element: <SignInV2 /> },
            {
                path: "register",
                element: <RegistrationLayout />,
                children: [
                    { path: "donor", element: <Registration userType='donor' /> },
                    { path: "recipient", element: <Registration userType='recipient' /> },
                ],
            },
        ],
    },
    {
        path: "/join-us",
        element: <JoinUs />,
    },
    {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "donations", element: <Donations /> },
            { path: "donation-status", element: <DonationStatus /> },
            { path: "donation-history", element: <DonationHistory /> },
            { path: "my-profile", element: <MyProfile /> },
            { path: "available-donations", element: <AvailableDonations /> },
            { path: "request-donations", element: <RequestDonations /> },
            { path: "active-pickups", element: <ActivePickups /> },
            { path: "pickup-history", element: <PickupHistory /> },
            { path: "recepient-settings", element: <RecepientSettings /> },
        ],
    },
], {
    basename: "/food-management-system"
});


function App() {
    return <RouterProvider router={router} />;
}

export default App
