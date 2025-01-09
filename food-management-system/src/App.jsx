import {createBrowserRouter, RouterProvider} from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import LoginLayout from "./Layout/LoginLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginLayout/>,
        children: [
            {
                path: "/",
                element: <SignIn/>,
            },
            {
                path: "/sign-in",
                element: <SignIn/>,
            },
            {
                path: "/sign-up",
                element: <SignUp/>,
            },
        ]
    },
],{
     basename: "/food-management-system"
});

function App() {
    return <RouterProvider router={router}/>;
}

export default App
