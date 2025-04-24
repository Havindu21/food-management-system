import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BasicCard from '../../Components/BasicCard';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import { useNavigate } from 'react-router-dom';

// Import images
import img1 from '../../assets/JoinUs/img1.jpg';
import img2 from '../../assets/JoinUs/img2.jpg';
import img3 from '../../assets/JoinUs/img3.jpg';

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

const backgroundImages = [img1, img2, img3];

const JoinUs = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [bgIndex, setBgIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, []);

    const handleContinue = () => {
        if (selectedOption === 'donor') navigate('/register/donor');
        if (selectedOption === 'recepient') navigate('/register/recipient');
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 3, md: 8 },
                px: { xs: 2, sm: 4, md: 0, lg: 5 },
                borderRadius: 1,
                height: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: { xs: 200, sm: 300, md: 400 },
                    height: { xs: 200, sm: 300, md: 400 },
                    background: 'rgba(5, 150, 105, 0.15)', // light greenish
                    clipPath: 'circle(100% at 100% 0%)',
                    zIndex: -1,
                }}
            />

            <Typography sx={{ fontSize: { xs: 24, sm: 36, md: 42, lg: 50 }, color: '#000000', fontWeight: { xs: 500, md: 600 }, textAlign: 'center' }}>
                Join Our Food Redistribution Platform
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, sm: 22, md: 25, lg: 50 }, color: '#000000', textAlign: 'center', mt: 1 }}>
                Help us reduce food waste and eliminate hunger in Sri Lanka
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 3, md: 6, lg: 10 },
                    mt: { xs: 5, sm: 10, md: 15, },
                    width: { xs: '100%', md: '85%', lg: '70%', },
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {registerCards.map((card, index) => (
                    <BasicCard
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                        key={index}
                        option={card.key}
                        icon={
                            <card.icon
                                sx={{
                                    width: { xs: 55, md: 90 },
                                    height: { xs: 55, md: 90 },
                                    color: '#059669',
                                }}
                            />
                        }
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </Box>
            <Button
                onClick={handleContinue}
                disabled={!selectedOption}
                sx={{
                    bgcolor: '#059669',
                    mt: { xs: 6, md: 8 },
                    width: 170,
                    height: 60,
                    borderRadius: 2,
                    '&:hover': {
                        bgcolor: '#047857',
                    },
                }}
            >
                <Typography sx={{ color: '#FFFFFF', fontSize: { xs: 16, md: 20 }, fontWeight: 600, textTransform: 'none' }}>
                    Continue
                </Typography>
            </Button>
            <Typography sx={{ color: '#000000', fontSize: { xs: 16, md: 20 }, mt: 4, fontWeight: 500, bgcolor: 'rgba(255, 255, 255, 0.4)', p: 1, borderRadius: 2, }}>
                Already have an account?
                <Box
                    component={'span'}
                    sx={{ color: '#000000', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => navigate('/sign-in')}
                >
                    {' '}Log in here
                </Box>
            </Typography>
        </Box>
    );
};

export default JoinUs;
