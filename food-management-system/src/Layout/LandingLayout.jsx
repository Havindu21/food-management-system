import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Box } from "@mui/material"


const LandingLayout = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ height: 76 }} /> {/*navbar height*/}
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingLayout