import { useRef } from "react";
import HomeImage from "./HomeImage";
import Insights from "./Insights";
import Projects from "./Projects";
import HowItWorks from "./HowItWorks";
import JoinCommunity from "./JoinCommunity";
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
            <div id="join-community-section" />
            <JoinCommunity />
        </>
    );
};

export default Home;
