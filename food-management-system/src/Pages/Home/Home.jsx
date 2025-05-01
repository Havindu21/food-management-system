import { useRef } from "react";
import HomeImage from "./HomeImage";
import Insights from "./Insights";
import Projects from "./Projects";
import HowItWorks from "./HowItWorks";
import { Height } from "@mui/icons-material";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <>
            <HomeImage />
            <div id="how-it-works-section" />
            <HowItWorks />
            <div id="insights-section" />
            <Insights />
            <div id="projects-section" />
            <Projects />
        </>
    );
};

export default Home;
