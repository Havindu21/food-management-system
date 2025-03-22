import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Wallpaper from "../../assets/Home/wallpaper.jpeg";
import { useLocation } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { globalPx } from "../../Theme/Theme";

const HomeImage = () => {
    const location = useLocation();
    const isLogged = location?.state?.isLogged || false;
    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            <Box
                component="img"
                src={Wallpaper}
                alt="Wallpaper"
                sx={{
                    width: "100%",
                    height: { xs: '70vh', md: "93vh", },
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
                    ...globalPx,
                }}
            >
                <Typography sx={{
                    fontSize: { xs: 26, sm: 36, md: 46, lg: 50 },
                    fontWeight: 600,
                    mb: 2,
                }}>
                    Share Food, Share Hope
                </Typography>
                {[
                    'Join our mission to reduce food waste and feed communities in need.',
                    'Every meal shared makes a difference.'
                ].map((text, index) => (
                    <Typography key={index} sx={{
                        fontSize: { xs: 16, sm: 20, md: 24, lg: 20 },
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
                    }}
                >
                    {isLogged ? 'Donate Now' : 'Get Started'}
                    <ArrowForwardIcon />
                </Button>
            </Box>
        </Box>
    )
}

export default HomeImage