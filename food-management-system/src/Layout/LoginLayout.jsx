import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoginImage3 from "../assets/JoinUs/img5.png";
import LoginImage2 from "../assets/JoinUs/img2.png";
import { useEffect, useState } from "react";

const LoginLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isResizing, setIsResizing] = useState(false);
    
    // Handle resize events with debounce
    useEffect(() => {
        let resizeTimer;
        
        const handleResize = () => {
            setIsResizing(true);
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setIsResizing(false);
            }, 300);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease", // Smooth transition for all changes
                backgroundColor: "#f9fafb",
            }}
        >
            <Grid container sx={{ 
                flexGrow: 1,
                transition: "all 0.3s ease"
            }}>
                {/* Left Section: Image with grid */}
                <Grid 
                    item 
                    xs={12} 
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: { xs: 2, md: 4 },
                        // order: { xs: 2, md: 1 }, // Change order on mobile
                        transition: "all 0.3s ease",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: 250, sm: 320, md: 450, lg: 550 },
                            height: { xs: 250, sm: 320, md: 450, lg: 550 },
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "1fr 1fr",
                            gap: "10px",
                            backgroundColor: "transparent",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {/* 4 squares */}
                        <Box
                            sx={{
                                backgroundColor: "#A5D6A7",
                                borderRadius: "20px",
                                width: "100%",
                                height: "100%",
                                transition: "all 0.3s ease",
                            }}
                        />
                        <Box
                            sx={{
                                backgroundColor: "#A5D6A7",
                                borderRadius: "50px",
                                width: "100%",
                                height: "100%",
                                transition: "all 0.3s ease",
                            }}
                        />
                        <Box
                            sx={{
                                backgroundColor: "#A5D6A7",
                                borderRadius: "10px",
                                width: "100%",
                                height: "100%",
                                transition: "all 0.3s ease",
                            }}
                        />
                        <Box
                            sx={{
                                backgroundColor: "#A5D6A7",
                                borderRadius: "30px",
                                width: "100%",
                                height: "100%",
                                transition: "all 0.3s ease",
                            }}
                        />

                        {/* Image on top */}
                        <Box
                            component="img"
                            alt="Login Image"
                            src={LoginImage3}
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "90%",
                                height: "100%",
                                objectFit: "contain",
                                borderRadius: "10px",
                                zIndex: 1,
                                transition: "all 0.3s ease",
                            }}
                        />
                    </Box>
                </Grid>
                
                {/* Right Section: Form (Outlet) */}
                <Grid 
                    item 
                    xs={12} 
                    md={6} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: { xs: 2, sm: 4, md: 6, lg: 8 },
                        py: { xs: 4, md: 2 },
                        order: { xs: 1, md: 2 },
                        transition: "all 0.3s ease",
                    }}
                >
                    <Box 
                        sx={{ 
                            maxWidth: { sm: '100%', md: '500px' }, 
                            mx: 'auto',
                            width: '100%',
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginLayout;