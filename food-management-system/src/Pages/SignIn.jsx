import React from 'react';
import { Box, Button, Checkbox, Divider, FormControlLabel, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";
import SignInImage from '../assets/SignInImage.png';
import { styled } from '@mui/system';
import GoogleIcon from '../assets/google-icon.png';
import AppleIcon from '../assets/apple-icon.png';

const FormField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontSize: 15,
    },
    '& .MuiOutlinedInput-root': {
        height: 42,
        borderRadius: '5px',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B0B0B0', // Border color on hover
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000', // Border color on focus
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#D9D9D9', // Default border color
    },
}));

const SignIn = () => {
    const navigate = useNavigate();

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{
                    width: { xs: '90%', sm: '70%', md: '80%', lg: '60%' },
                    boxShadow: 3, // You can adjust the shadow intensity (1-24 in MUI)
                    borderRadius: 2, // Adjust for rounded corners
                    bgcolor: '#FFFFFF', // Background color for better visibility
                    p: 3 // Padding for spacing
                }}>

                    <Typography sx={{ fontWeight: 600, fontSize: { xs: 26, md: 36 }, textAlign: 'center' }}>
                        Log In
                    </Typography>
                    <Typography sx={{ fontSize: 18, mt: 1, mb: 6, textAlign: 'center', color: '#686D76', letterSpacing: 1.1, }}>
                        Access your food redistribution account
                    </Typography>
                    <Box>
                        <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                            Email address
                        </Typography>
                        <FormField
                            // size='small'
                            fullWidth
                            placeholder="Enter your email"
                            type="email"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{ mt: 3, }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                            Password
                        </Typography>
                        <FormField
                            // size='small'
                            fullWidth
                            placeholder="Enter your password"
                            type="password"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: '#059669',
                                        '&.Mui-checked': { color: '#059669' },
                                        '& .MuiTypography-root': { // Targets the label text
                                            fontWeight: 500,
                                            fontSize: 14,
                                        }
                                    }}
                                />
                            }
                            label="Remember Me"
                        />
                        <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#059669', cursor: 'pointer' }}>
                            Forgot Password ?
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate('/home', { state: { isLogged: true } })}
                        sx={{ mt: 5, height: { xs: 35, md: 45 }, backgroundColor: '#059669', borderRadius: 1, }}
                    >
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: { xs: 16, md: 20 }, textTransform: 'none' }}>
                            Log In
                        </Typography>
                    </Button>
                    <Typography sx={{
                        color: '#686D76',
                        fontSize: { xs: 16, md: 18, },
                        mt: 4,
                        textAlign: 'center',
                    }}>
                        Don't have an account? {' '}
                        <Box component={'span'} sx={{
                            color: '#059669',
                            cursor: 'pointer',
                        }}
                            onClick={() => navigate('/join-us')}
                        >
                            Register here
                        </Box>
                    </Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 0, md: 6 }} sx={{
                backgroundImage: `url(${SignInImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: '100%',
            }}
            />
        </Grid>
    );
};

export default SignIn;