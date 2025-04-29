import { useRef } from "react";
import HomeImage from "./HomeImage";
import Insights from "./Insights";
import Projects from "./Projects";
import { Height } from "@mui/icons-material";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <>
            <HomeImage />
            <div id="insights-section" />
            <Insights />
            <div id="projects-section" />
            <Projects />
            <Box sx={{height:100}}>more content</Box>
        </>
    );
};

export default Home;
