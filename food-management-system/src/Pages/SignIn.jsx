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
        fontSize: 13,
    },
    '& .MuiOutlinedInput-root': {
        height: 32,
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
                <Box sx={{ width: { xs: '90%', sm: '70%', md: '80%', lg: '60%' } }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 32, mb: 6 }}>
                        Welcome Back !!
                    </Typography>
                    <Box>
                        <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                            Email address
                        </Typography>
                        <FormField
                            size='small'
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
                            size='small'
                            fullWidth
                            placeholder="Name"
                            type="password"
                            variant="outlined"
                        />
                    </Box>
                    <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="Remember Password"
                        slotProps={{
                            typography: {
                                fontWeight: 500,
                                fontSize: 14,
                            }
                        }}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate('/home', { state: { isLogged: true } })}
                        sx={{ mt: 5, height: 35, backgroundColor: '#F3CC2F', color: '#000000', fontWeight: 500, fontSize: 14, }}
                    >
                        Sign In
                    </Button>
                    <Divider sx={{ mt: 5, mb: 3 }}>or</Divider>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        maxHeight: 30,
                    }}>
                        <Button
                            size="small"
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderColor: '#D9D9D9',
                                color: '#000000',
                                fontWeight: 500,
                                fontSize: 12,
                                textTransform: 'none',
                                gap: 1,
                            }}
                        >
                            <Box
                                component="img"
                                src={GoogleIcon}
                                alt="Google logo"
                                sx={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                            Sign in with Google
                        </Button>
                        <Button
                            size="small"
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderColor: '#D9D9D9',
                                color: '#000000',
                                fontWeight: 500,
                                fontSize: 12,
                                textTransform: 'none',
                                gap: 1,
                            }}
                        >
                            <Box
                                component="img"
                                src={AppleIcon}
                                alt="Google logo"
                                sx={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                            Sign in with Apple
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid size={{ xs: 0, md: 6 }} sx={{
                backgroundImage: `url(${SignInImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: '100%',
            }}>

            </Grid>
        </Grid >
    );
};

export default SignIn;