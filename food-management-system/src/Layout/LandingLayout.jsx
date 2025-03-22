import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Box } from "@mui/material"


const LandingLayout = () => {
    return (
        <>
            <Navbar />
            {/* <Box sx={{ height: 64 }} /> */}
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingLayout