import { useRef } from "react";
import HomeImage from "./HomeImage";
import Insights from "./Insights";
import Projects from "./Projects";

const Home = () => {
    return (
        <>
            <HomeImage />
            <div id="insights-section" />
            <Insights />
            <div id="projects-section" />
            <Projects />
        </>
    );
};

export default Home;
