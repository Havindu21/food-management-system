import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import BasicCard from '../../Components/BasicCard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const handleContinue = () => {
        if (selectedOption === 'individual') navigate('/register/individual');
        if (selectedOption === 'business') navigate('/register/business');
        if (selectedOption === 'recepient') navigate('/register/recepient');
    }

    return (
        <Box sx={{
            bgcolor: { md: '#FFFFFF', sm: '#EEEEEE', xs: '#FFFFFF' },
            px: { xs: 0, sm: 4, md: 10, },
            py: { xs: 2, md: 4 },
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: { xs: 3, md: 6, },
                px: { xs: 2, sm: 4, md: 5, },
                bgcolor: '#FFFFFF',
                borderRadius: 1,
            }}>
                <Typography sx={{
                    fontSize: { xs: 20, sm: 30, md: 44 },
                    fontWeight: { xs: 500, md: 600 },
                    textAlign: 'center',
                }}>
                    Join Our Food Redistribution Platform
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, sm: 18, md: 20 },
                    textAlign: 'center',
                    color: '#686D76',
                    mt: { xs: 1, md: 1 },
                }}>
                    Help us reduce food waste and eliminate hunger in Sri Lanka
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 18, md: 30 },
                    textAlign: 'center',
                    mt: { xs: 5, md: 8 },
                }}>
                    Choose how you want to register
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 18 },
                    textAlign: 'center',
                    color: '#686D76',
                }}>
                    Select the option that best best describes you
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 3, md: 5 },
                    mt: 5,
                    width: '100%',
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                    {registerCards.map((card, index) => (
                        <BasicCard
                            setSelectedOption={setSelectedOption}
                            selectedOption={selectedOption}
                            key={index}
                            option={card.key}
                            icon={<card.icon
                                sx={{
                                    width: { xs: 55, md: 80, },
                                    height: { xs: 55, md: 80 },
                                    color: '#059669',
                                }}
                            />}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </Box>
                <Button onClick={handleContinue} sx={{
                    bgcolor: '#059669',
                    mt: 6,
                    width: 170,
                    height: 60,
                    borderRadius: 2,
                }} >
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: { xs: 16, md: 20 },
                        fontWeight: 600,
                        textTransform: 'none',
                    }}>
                        Continue
                    </Typography>
                </Button>
                <Typography sx={{
                    color: '#686D76',
                    fontSize: { xs: 16, md: 20 },
                    mt: 4,
                }}>
                    Already have an account? {' '}
                    <Box component={'span'} sx={{
                        color: '#059669',
                        cursor: 'pointer',
                    }}
                        onClick={() => navigate('/sign-in')}
                    >
                        Log in here
                    </Box>
                </Typography>
            </Box>
        </Box>
    )
}

export default JoinUs

const registerCards = [
    {
        key: 'individual',
        icon: AccountCircleIcon,
        title: 'Register as Individual',
        description: 'Perfect for individuals who want to donate food or volunteer',
    },
    {
        key: 'business',
        icon: BusinessIcon,
        title: 'Register as Businesss',
        description: 'For restaurants, hotels, grocery stores and food organizations',
    },
    {
        key: 'recepient',
        icon: RecentActorsIcon,
        title: 'Register as Recepient',
        description: 'Perfect for individuals who want to donate food or volunteer',
    },
]