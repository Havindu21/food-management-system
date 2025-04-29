import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

// You'll need to import your images from the assets folder
import joinUsImage from '../../assets/JoinUs/img2.png';

const JoinUs = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const registerCards = [
        {
            key: 'donor',
            icon: VolunteerActivismOutlinedIcon,
            title: 'Register as Donor',
            description: 'For individuals or businesses who want to donate food or help distribute it.',
        },
        {
            key: 'recepient',
            icon: FoodBankOutlinedIcon,
            title: 'Register as Recipient',
            description: 'For charities, food banks, or NGOs that wish to request and receive food donations.',
        },
    ];

    const handleContinue = () => {
        if (selectedOption === 'donor') navigate('/register/donor');
        if (selectedOption === 'recepient') navigate('/register/recipient');
    };

    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            {/* Left Side - Image with Grid */}
            <Grid 
                item 
                xs={12} 
                md={6}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: { md: 450, lg: 550 },
                        height: { md: 450, lg: 550 },
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr 1fr",
                        gap: "10px",
                        backgroundColor: "transparent",
                        transition: "all 0.3s ease",
                    }}
                >
                    {/* Grid boxes */}
                    <Box sx={{ backgroundColor: "#A5D6A7", borderRadius: "20px", width: "100%", height: "100%" }} />
                    <Box sx={{ backgroundColor: "#A5D6A7", borderRadius: "50px", width: "100%", height: "100%" }} />
                    <Box sx={{ backgroundColor: "#A5D6A7", borderRadius: "10px", width: "100%", height: "100%" }} />
                    <Box sx={{ backgroundColor: "#A5D6A7", borderRadius: "30px", width: "100%", height: "100%" }} />

                    {/* Image on top - uncomment when you have the image */}
                    <Box
                        component="img"
                        alt="Join Us"
                        src={joinUsImage}
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
                        }}
                    />
                </Box>

                {/* Green circular decoration */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        background: 'rgba(5, 150, 105, 0.15)',
                        borderRadius: '50%',
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -100,
                        left: -100,
                        width: 250,
                        height: 250,
                        background: 'rgba(5, 150, 105, 0.1)',
                        borderRadius: '50%',
                        zIndex: 0,
                    }}
                />
            </Grid>

            {/* Right Side - Content */}
            <Grid 
                item 
                xs={12} 
                md={6} 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: { xs: 3, sm: 4, md: 6, lg: 8 },
                    py: { xs: 6, md: 4 },
                    bgcolor: '#f9fafb',
                    position: 'relative',
                    minHeight: { xs: '100vh', md: 'auto' },
                }}
            >
                {/* Mobile-only green decoration */}
                <Box
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 150,
                        height: 150,
                        background: 'rgba(5, 150, 105, 0.15)',
                        clipPath: 'circle(100% at 100% 0%)',
                        zIndex: 0,
                    }}
                />

                <Box
                    sx={{
                        maxWidth: { sm: '100%', md: '500px' },
                        mx: 'auto',
                        width: '100%',
                        zIndex: 1,
                    }}
                >
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontSize: { xs: 28, sm: 32, md: 36, lg: 42 },
                            fontWeight: 700,
                            color: '#111827',
                            textAlign: 'center',
                            mb: 1,
                        }}
                    >
                        Join Our Food Redistribution Platform
                    </Typography>
                    <Typography 
                        sx={{ 
                            fontSize: { xs: 16, sm: 18, md: 20 },
                            color: '#4B5563',
                            textAlign: 'center',
                            mb: { xs: 4, md: 6 },
                        }}
                    >
                        Help us reduce food waste and eliminate hunger in Sri Lanka
                    </Typography>

                    {/* Option Cards */}
                    <Grid container spacing={{xs:3,md:4}} sx={{ mb: { xs: 4, md: 6 } }}>
                        {registerCards.map((card) => (
                            <Grid item xs={12} sm={6} key={card.key}>
                                <Box
                                    onClick={() => setSelectedOption(card.key)}
                                    sx={{
                                        width: {xs:'none',md: '110%',},
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: { xs: 3, md: 1 },
                                        height: { xs: 220, md: 250 },
                                        borderRadius: 3,
                                        border: selectedOption === card.key ? '2px solid #059669' : '1px solid #E5E7EB',
                                        bgcolor: selectedOption === card.key ? '#F0FDF4' : 'white',
                                        boxShadow: selectedOption === card.key ? '0 4px 6px rgba(0, 0, 0, 0.05)' : '0 1px 3px rgba(0, 0, 0, 0.02)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.05)',
                                        },
                                    }}
                                >
                                    {selectedOption === card.key && (
                                        <CheckCircleOutlineRoundedIcon
                                            fontSize='medium'
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                color: '#059669',
                                            }}
                                        />
                                    )}
                                    <card.icon sx={{ fontSize: 56, color: '#059669', mb: 2 }} />
                                    <Typography 
                                        sx={{ 
                                            fontSize: { xs: 18, md: 20 }, 
                                            fontWeight: 600,
                                            color: '#111827', 
                                            textAlign: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        {card.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: 14, md: 16 },
                                            color: '#6B7280',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {card.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Action Buttons */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            mt: { xs: 2, md: 4 } 
                        }}
                    >
                        <Button
                            onClick={handleContinue}
                            disabled={!selectedOption}
                            sx={{
                                bgcolor: '#059669',
                                color: 'white',
                                width: { xs: '100%', sm: 200 },
                                height: 54,
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: { xs: 16, md: 18 },
                                textTransform: 'none',
                                mb: 3,
                                '&:hover': {
                                    bgcolor: '#047857',
                                },
                                '&.Mui-disabled': {
                                    bgcolor: '#E5E7EB',
                                    color: '#9CA3AF',
                                },
                                boxShadow: '0 4px 6px rgba(5, 150, 105, 0.15)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Continue
                        </Button>

                        <Box 
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 1,
                            }}
                        >
                            <Typography sx={{ color: '#6B7280', fontSize: 16 }}>
                                Already have an account?
                            </Typography>
                            <Typography
                                onClick={() => navigate('/sign-in')}
                                sx={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: '#059669',
                                    ml: 1,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Log in here
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default JoinUs;