import React, { useState } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel, Grid, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/auth';
import 'leaflet/dist/leaflet.css';
import Logo from '../../assets/logo-remove-bg.png'; // You'll need to add your logo here

// Custom components
import MapSelector from '../../Components/MapSelector';
import CustomTextField from '../../Components/GreenTextField';

const Registration = ({ userType }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setSelectedFile(file);
        } else {
            alert('File size exceeds 5MB or invalid format.');
        }
    };

    const newPassword = watch('password');

    const onSubmit = async (data) => {
        const userData = userType === 'recipient' ? {
            name: data.recipientName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: selectedLocation?.address,
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
            userType: 'recipient',
            verificationDocument: selectedFile,
        } : userType === 'donor' ? {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: selectedLocation?.address,
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
            businessName: data.businessName,
            userType: 'donor',
        } : {};

        try {
            console.log('UserData:', userData);
            const response = await registerUser(userData);
            alert('Registration Successful');
            navigate('/home');
        } catch (error) {
            console.error('Registration Error:', error.response?.data || error.message);
            alert('Registration Failed');
        }
    };

    return (
        // <Box sx={{ 
        //     bgcolor: '#EEEEEE', 
        //     minHeight: '100vh',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     py: { xs: 4, md: 6 },
        //     px: { xs: 2, md: 4 }
        // }}>
        //     <Box maxWidth={700} width="100%" sx={{ bgcolor: '#FFFFFF', p: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center">
                    <Typography sx={{ fontSize: { xs: 22, sm: 26, md: 30 }, fontWeight: 600 }}>
                        Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, md: 18 }, textAlign: 'center', color: '#686D76',mb:{xs:3,md:0} }}>
                    Join our food redistribution platform
                </Typography>
                </Grid>

                {/* <Grid item xs={12} display="flex" justifyContent="center" mt={-2}>
                            <Box
                                component="img"
                                alt="Logo"
                                src={Logo}
                                sx={{
                                    maxWidth: {
                                        xs: 115,
                                        sm: 145,
                                        lg: 190,
                                    },
                                }}
                            />
                        </Grid> */}

                {userType === 'donor' && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">
                                First Name<span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <CustomTextField
                                fullWidth
                                size="small"
                                error={!!errors.firstName}
                                {...register('firstName', {
                                    required: 'First name is required.',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Invalid First Name"
                                    }
                                })}
                            />
                            <Typography sx={{
                                fontSize: '12px',
                                color: 'red',
                                textAlign: 'right',
                            }}>
                                {errors.firstName && errors.firstName.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">
                                Last Name<span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <CustomTextField
                                fullWidth
                                size="small"
                                error={!!errors.lastName}
                                {...register('lastName', {
                                    required: 'Last name is required.',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Invalid Last Name"
                                    }
                                })}
                            />
                            <Typography sx={{
                                fontSize: '12px',
                                color: 'red',
                                textAlign: 'right',
                            }}>
                                {errors.lastName && errors.lastName.message}
                            </Typography>
                        </Grid>
                    </>
                )}

                {userType === 'recipient' && (
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Recipient Name<span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <CustomTextField
                            fullWidth
                            size="small"
                            error={!!errors.recipientName}
                            {...register('recipientName', { required: 'Recipient name is required' })}
                        />
                        <Typography sx={{
                            fontSize: '12px',
                            color: 'red',
                            textAlign: 'right',
                        }}>
                            {errors.recipientName && errors.recipientName.message}
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Typography variant="h6">
                        Email Address<span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <CustomTextField
                        fullWidth
                        size="small"
                        error={!!errors.email}
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    <Typography sx={{
                        fontSize: '12px',
                        color: 'red',
                        textAlign: 'right',
                    }}>
                        {errors.email && errors.email.message}
                    </Typography>
                </Grid>

                {userType === 'donor' && (
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Business Name
                        </Typography>
                        <CustomTextField
                            fullWidth
                            size="small"
                            error={!!errors.businessName}
                            {...register('businessName')}
                        />
                        <Typography sx={{
                            fontSize: '12px',
                            color: 'red',
                            textAlign: 'right',
                        }}>
                            {errors.businessName && errors.businessName.message}
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                        New Password<span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <CustomTextField
                        fullWidth
                        size="small"
                        type="password"
                        error={!!errors.password}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                    />
                    <Typography sx={{
                        fontSize: '12px',
                        color: 'red',
                        textAlign: 'right',
                    }}>
                        {errors.password && errors.password.message}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                        Confirm Password<span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <CustomTextField
                        fullWidth
                        size="small"
                        type="password"
                        error={!!errors.confirmPassword}
                        {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: value => value === newPassword || 'Passwords do not match'
                        })}
                    />
                    <Typography sx={{
                        fontSize: '12px',
                        color: 'red',
                        textAlign: 'right',
                    }}>
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography  variant="h6">
                        Mobile Number<span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <CustomTextField
                        fullWidth
                        size="small"
                        error={!!errors.phone}
                        {...register('phone', { required: 'Phone number is required' })}
                    />
                    <Typography sx={{
                        fontSize: '12px',
                        color: 'red',
                        textAlign: 'right',
                    }}>
                        {errors.phone && errors.phone.message}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography  variant="h6" mb={1}>
                        Select Your Location<span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                        <MapSelector value={selectedLocation} onChange={setSelectedLocation} />
                    </Box>
                </Grid>

                {userType === 'recipient' && (
                    <Grid item xs={12}>
                        <Typography  variant="h6">
                            Verification Document
                        </Typography>
                        <Box
                            sx={{
                                border: '2px dashed #C8E6C9',
                                borderRadius: 2,
                                textAlign: 'center',
                                padding: 3,
                                mt: 1,
                                bgcolor: '#F5F5F5',
                                cursor: 'pointer'
                            }}
                        >
                            <input
                                type="file"
                                accept=".pdf,.jpg,.png"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Typography
                                    sx={{
                                        color: '#059669',
                                        fontSize: { xs: 14, md: 16 },
                                        cursor: 'pointer'
                                    }}
                                >
                                    {selectedFile ? selectedFile.name : "Upload a file or drag and drop"}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: { xs: 12, md: 14 },
                                        color: '#686D76'
                                    }}
                                >
                                    Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                                </Typography>
                            </label>
                        </Box>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register('terms', { required: 'You must agree to the Terms' })}
                                sx={{ color: '#059669', '&.Mui-checked': { color: '#059669' } }}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: 14, color: '#686D76' }}>
                                I agree to the Terms and Privacy Policy<span style={{ color: 'red' }}> *</span>
                            </Typography>
                        }
                    />
                    <Typography sx={{
                        fontSize: '12px',
                        color: 'red',
                        textAlign: 'right',
                    }}>
                        {errors.terms && errors.terms.message}
                    </Typography>
                </Grid>

                <Grid
                    item
                    size={{ xs: 12 }}
                    display="flex"
                    justifyContent="center"
                    sx={{
                        mt: { xs: 0, md: 2 },
                        mx:'auto',
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: 228, height: 50,
                            bgcolor: '#059669',
                        }}
                    >
                        <Typography fontSize={20} >
                            Sign Up
                        </Typography>
                    </Button>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sx={{
                        mt: 1,
                    }}
                    display="flex"
                    justifyContent="center"
                >
                    <Typography
                        sx={{
                            // fontWeight: 600,
                            fontSize: { xs: 14, sm: 16 },
                            color: "#808080",
                        }}
                    >
                        Already have an account?
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: 14, sm: 16 },
                            color: "#059669",
                            display: "inline",
                            ml: 1,
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/sign-in')} 
                    >
                        Log in here
                    </Typography>
                </Grid>
            </Grid>
        </form>
        //     </Box>
        // </Box>
    );
};

export default Registration;