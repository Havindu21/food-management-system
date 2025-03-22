import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import Wallpaper from "../../assets/Home/wallpaper.jpeg";
import { useLocation } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { globalPx } from "../../Theme/Theme";

const HomeImage = () => {
    const location = useLocation();
    const isLogged = location?.state?.isLogged || false;

    const text = "Share Food, Share Hope";
    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.07, duration: 0.5 },
        }),
    };

    return (
        <Box sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden"
        }}>
            <Box
                component="img"
                src={Wallpaper}
                alt="Wallpaper"
                sx={{
                    width: "100%",
                    height: { xs: '50vh', sm: '70vh', md: "100vh" },
                    objectFit: "cover",
                    filter: "brightness(0.5)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translate(0%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    color: '#FFFFFF',
                    width: "100%",
                    maxWidth: "100%",
                    textAlign: "center",
                    ...globalPx,
                }}
            >
                <Typography sx={{
                    fontSize: { xs: 26, sm: 36, md: 46, lg: 50 },
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: 'left' },
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                    mt: 15,
                }}>
                    {text.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </Typography>

                {[
                    'Join our mission to reduce food waste and feed communities in need.',
                    'Every meal shared makes a difference.'
                ].map((text, index) => (
                    <Typography key={index} sx={{
                        fontSize: { xs: 14, sm: 20, md: 24, lg: 20 },
                        textAlign: { xs: "center", md: 'left' },
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "90%",
                        mx: { xs: "auto", md: '0' },
                    }}>
                        {text}
                    </Typography>
                ))}

                <Button
                    sx={{
                        mt: 5,
                        width: 160,
                        height: 40,
                        fontSize: 16,
                        textTransform: 'none',
                        color: '#FFFFFF',
                        bgcolor: '#059669',
                        borderRadius: '20px',
                        display: 'flex',
                        gap: 1,
                        mx: { xs: "auto", md: '0' },
                    }}
                >
                    {isLogged ? 'Donate Now' : 'Get Started'}
                    <ArrowForwardIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default HomeImage;
