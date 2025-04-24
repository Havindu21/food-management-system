import React, { useState } from 'react';
import {
    Box, Button, Checkbox, Divider, FormControlLabel,
    TextField, Typography
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import SignInImage from '../assets/SignInImage.png';
import { loginUser } from '../Services/auth';

const FormField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontSize: 15,
    },
    '& .MuiOutlinedInput-root': {
        height: 42,
        borderRadius: '5px',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B0B0B0',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#D9D9D9',
    },
}));

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          const res = await loginUser({ email, password });
          
          // Only reached if response is 2xx
          console.log("Logged in:", res);
          //   localStorage.setItem('userRole', 'Don');
          navigate('/home', { state: { isLogged: true } });
        } catch (err) {
            // localStorage.setItem('userRole', 'Rec');
            // navigate('/home', { state: { isLogged: true } });
          // Handle different error types
          let errorMessage = 'Login failed. Please try again.';
      
          if (err.response) {
            // The request was made and server responded with 4xx/5xx
            errorMessage = err.response.data.msg || errorMessage; // Note: your backend uses 'msg' not 'message'
          } else if (err.request) {
            // The request was made but no response received
            errorMessage = 'No response from server. Check your connection.';
          }
      
          setError(errorMessage);
          console.error('Login error:', errorMessage);
        }
      };

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
                }}
            >
                <Box sx={{
                    width: { xs: '90%', sm: '70%', md: '80%', lg: '60%' },
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF',
                    p: 3
                }}>
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: 26, md: 36 }, textAlign: 'center' }}>
                        Log In
                    </Typography>
                    <Typography sx={{
                        fontSize: 18, mt: 1, mb: 6, textAlign: 'center',
                        color: '#686D76', letterSpacing: 1.1
                    }}>
                        Access your food redistribution account
                    </Typography>

                    <Box>
                        <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                            Email address
                        </Typography>
                        <FormField
                            fullWidth
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                            Password
                        </Typography>
                        <FormField
                            fullWidth
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                                    }}
                                />
                            }
                            label="Remember Me"
                        />
                        <Typography sx={{
                            fontWeight: 500, fontSize: 16,
                            color: '#059669', cursor: 'pointer'
                        }}>
                            Forgot Password ?
                        </Typography>
                    </Box>

                    {error && (
                        <Typography sx={{ mt: 2, color: 'red', fontSize: 14 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleLogin}
                        sx={{
                            mt: 5,
                            height: { xs: 35, md: 45 },
                            backgroundColor: '#059669',
                            borderRadius: 1,
                        }}
                    >
                        <Typography sx={{
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: { xs: 16, md: 20 },
                            textTransform: 'none'
                        }}>
                            Log In
                        </Typography>
                    </Button>

                    <Typography sx={{
                        color: '#686D76',
                        fontSize: { xs: 16, md: 18 },
                        mt: 4,
                        textAlign: 'center',
                    }}>
                        Don't have an account?{' '}
                        <Box
                            component={'span'}
                            sx={{ color: '#059669', cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/home', { state: { isLogged: true } })
                                localStorage.setItem('userRole', 'Don')
                                }}
                            // onClick={() => navigate('/join-us')}
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
            }} />
        </Grid>
    );
};

export default SignIn;
