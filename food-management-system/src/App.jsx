import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignInV2 from "./Pages/SignInV2";
import LoginLayout from "./Layout/LoginLayout";
import LandingLayout from "./Layout/LandingLayout";
import Home from "./Pages/Home/Home";
import ProfileLayout from "./Layout/ProfileLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DonationStatus from "./Pages/DonationStatus/DonationStatus";
import DonationHistory from "./Pages/DonationHistory/DonationHistory";
import MyProfile from "./Pages/MyProfile/MyProfile";
import JoinUs from "./Pages/JoinUs/JoinUs";
import RegistrationLayout from "./Layout/RegistrationLayout";
import AvailableDonations from "./Pages/AvailableDonations/AvailableDonations";
import RequestDonations from "./Pages/RequestDonations/RequestDonations";
import ActivityHistory from "./Pages/ActivityHistory/ActivityHistory";
import ActivePickups from "./Pages/ActivePickups/ActivePickups";
import RecepientSettings from "./Pages/RecepientSettings/RecepientSettings";
import Registration from "./Pages/JoinUs/Registration";
import DonateFood from "./Pages/Donations/DonateFood";
import FoodRequests from "./Pages/FoodRequests/FoodRequests";
import ActiveDonations from "./Pages/ActiveDonations/ActiveDonations";
import RecipientsApproval from "./Pages/Admin/RecipientsApproval";
import AboutUs from "./Pages/AboutUs/AboutUs";
import UserManagement from "./Pages/Admin/UserManagement";
import Analytics from "./Pages/Admin/Analytics";

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
            { path: "about-us", element: <AboutUs /> },
        ],
    },
    {
        path: "/",
        element: <LoginLayout />,
        children: [
            { path: "sign-in", element: <SignInV2 /> },

            { path: "register/donor", element: <Registration userType='donor' /> },
            { path: "register/recipient", element: <Registration userType='recipient' /> },
            // {
            //     path: "register",
            //     element: <RegistrationLayout />,
            //     children: [
            //         { path: "donor", element: <Registration userType='donor' /> },
            //         { path: "recipient", element: <Registration userType='recipient' /> },
            //     ],
            // },
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
            { path: "donate-food", element: <DonateFood /> },
            { path: "food-requests", element: <FoodRequests /> },
            { path: "active-donations", element: <ActiveDonations /> },
            { path: "donation-status", element: <DonationStatus /> },
            { path: "donation-history", element: <DonationHistory /> },
            { path: "my-profile", element: <MyProfile /> },
            { path: "available-donations", element: <AvailableDonations /> },
            { path: "request-donations", element: <RequestDonations /> },
            { path: "active-pickups", element: <ActivePickups /> },
            { path: "activity-history", element: <ActivityHistory /> },
            { path: "recepient-settings", element: <RecepientSettings /> },
            { path: "recipient-approvals", element: <RecipientsApproval /> },
            { path: "user-management", element: <UserManagement /> },
            { path: "analytics", element: <Analytics /> },
        ],
    },
], {
    basename: "/food-management-system",
    scrollBehavior: "auto" 
});


function App() {
    return <RouterProvider router={router} />;
}

export default App