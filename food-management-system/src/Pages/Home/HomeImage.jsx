import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import HeroImage from "../../assets/JoinUs/img5.png";
import { useLocation } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const HomeImage = () => {
    const location = useLocation();
    const isLogged = location?.state?.isLogged || false;
    const [isVisible, setIsVisible] = useState(false);

    // Intersection observer to trigger animations when section is visible
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('hero-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    const title = "Share Food, Share Hope";
    
    // Animation variants for text and elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.07, duration: 0.5 },
        }),
    };

    const features = [
        {
            icon: VolunteerActivismOutlinedIcon,
            title: "Donate Surplus",
            description: "Share your extra food with those in need"
        },
        {
            icon: LocalShippingOutlinedIcon,
            title: "Fast Distribution",
            description: "We ensure food reaches recipients quickly"
        },
        {
            icon: PeopleAltOutlinedIcon,
            title: "Community Impact",
            description: "Join thousands making a difference"
        }
    ];

    return (
        <Box 
            id="hero-section"
            sx={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden",
                background: "linear-gradient(135deg, #1e293b, #0f172a)", // Deep blue gradient background
            }}
        >
            {/* Animated background elements */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 0.7 : 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                sx={{
                    position: "absolute",
                    top: { xs: "10%", md: "5%" },
                    right: { xs: "5%", md: "10%" },
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    background: "radial-gradient(circle, rgba(5, 150, 105, 0.2) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 0.5 : 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                sx={{
                    position: "absolute",
                    bottom: { xs: "15%", md: "10%" },
                    left: { xs: "5%", md: "15%" },
                    width: { xs: 150, md: 250 },
                    height: { xs: 150, md: 250 },
                    background: "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />

            {/* Hero content */}
            <Container 
                maxWidth="xl" 
                sx={{ 
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    pt: { xs: 10, md: 0 }
                }}
            >
                <Grid 
                    container 
                    spacing={4} 
                    sx={{ 
                        minHeight: "100vh",
                        alignItems: "center",
                    }}
                >
                    {/* Text content - Left side */}
                    <Grid 
                        item 
                        xs={12} 
                        md={6} 
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        <Box sx={{ maxWidth: {xs:600,md:800}, mb: { xs: 6, md: 0 } }}>
                            {/* Animated title */}
                            <Typography 
                                component="h1"
                                sx={{
                                    fontSize: { xs: 42, sm: 52, md: 58, lg: 64 },
                                    fontWeight: 800,
                                    color: "white",
                                    mb: 3,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    lineHeight: 1.1,
                                }}
                            >
                                {title.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </Typography>

                            {/* Subtitle with animation */}
                            <motion.div variants={itemVariants}>
                                <Typography 
                                    sx={{
                                        fontSize: { xs: 18, sm: 20, md: 22 },
                                        lineHeight: 1.5,
                                        color: "rgba(255, 255, 255, 0.9)",
                                        mb: 2,
                                        maxWidth: "90%",
                                    }}
                                >
                                    Join our mission to reduce food waste and feed communities in need.
                                </Typography>
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <Typography 
                                    sx={{
                                        fontSize: { xs: 16, sm: 18, md: 18 },
                                        lineHeight: 1.5,
                                        color: "rgba(255, 255, 255, 0.8)",
                                        mb: 5,
                                        maxWidth: "85%",
                                    }}
                                >
                                    Every meal shared makes a difference. Together, we can create a world where good food is never wasted.
                                </Typography>
                            </motion.div>

                            {/* Action button with animation */}
                            <motion.div variants={itemVariants}>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        mt: 1,
                                        width: { xs: "100%", sm: "auto" },
                                        minWidth: 180,
                                        height: 54,
                                        fontSize: 17,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        color: '#FFFFFF',
                                        bgcolor: '#059669',
                                        borderRadius: '10px',
                                        boxShadow: '0 10px 25px rgba(5, 150, 105, 0.4)',
                                        '&:hover': {
                                            bgcolor: '#047857',
                                            boxShadow: '0 15px 30px rgba(5, 150, 105, 0.6)',
                                            transform: 'translateY(-3px)'
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {isLogged ? 'Donate Now' : 'Get Started'}
                                </Button>
                            </motion.div>

                            {/* Feature cards */}
                            <Box 
                                sx={{ 
                                    mt: 8,
                                    display: { xs: "none", md: "flex" },
                                    gap: 3
                                }}
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        custom={index + 3}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: 160,
                                                height: 160,
                                                p: 2,
                                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                                backdropFilter: "blur(10px)",
                                                borderRadius: 3,
                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                "&:hover": {
                                                    transform: "translateY(-5px)",
                                                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
                                                }
                                            }}
                                        >
                                            <Box 
                                                sx={{ 
                                                    bgcolor: "rgba(5, 150, 105, 0.2)",
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mb: 1.5
                                                }}
                                            >
                                                <feature.icon sx={{ color: "#10b981", fontSize: 28 }} />
                                            </Box>
                                            <Typography 
                                                sx={{ 
                                                    color: "white", 
                                                    fontWeight: 600,
                                                    fontSize: 15,
                                                    mb: 0.5,
                                                    textAlign: "center"
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography 
                                                sx={{ 
                                                    color: "rgba(255, 255, 255, 0.7)", 
                                                    fontSize: 13,
                                                    textAlign: "center"
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Image - Right side */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: { xs: 350, md: 550 },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            {/* Decorative circle behind image */}
                            <Box
                                component={motion.div}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                sx={{
                                    position: "absolute",
                                    width: { xs: 280, md: 400 },
                                    height: { xs: 280, md: 400 },
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
                                    filter: "blur(20px)",
                                }}
                            />
                            
                            {/* Image with animation */}
                            <Box
                                component={motion.img}
                                src={HeroImage}
                                alt="Food Sharing Initiative"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: isVisible ? 0 : 30, opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                sx={{
                                    width: { xs: "90%", sm: "80%", md: "85%" },
                                    maxHeight: { xs: "90%", md: "90%" },
                                    objectFit: "contain",
                                    zIndex: 1,
                                    filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.25))"
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Mobile feature cards */}
            <Container 
                maxWidth="xl" 
                sx={{ 
                    display: { xs: "block", md: "none" },
                    pb: 8,
                    zIndex: 1,
                    position: "relative"
                }}
            >
                <Grid container spacing={2}>
                    {features.map((feature, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                component={motion.div}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: isVisible ? 0 : 20, opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    p: 1.5,
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: 2,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    height: "100%"
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        bgcolor: "rgba(5, 150, 105, 0.2)",
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 1
                                    }}
                                >
                                    <feature.icon sx={{ color: "#10b981", fontSize: 20 }} />
                                </Box>
                                <Typography 
                                    sx={{ 
                                        color: "white", 
                                        fontWeight: 600,
                                        fontSize: 14,
                                        mb: 0.5,
                                        textAlign: "center"
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography 
                                    sx={{ 
                                        color: "rgba(255, 255, 255, 0.7)", 
                                        fontSize: 12,
                                        textAlign: "center",
                                        display: { xs: "none", sm: "block" }
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Decorative gradient overlay at bottom */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "15%",
                    background: "linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)",
                    zIndex: 0,
                }}
            />
        </Box>
    );
};

export default HomeImage;