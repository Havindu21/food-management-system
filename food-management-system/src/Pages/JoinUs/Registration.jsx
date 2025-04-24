import { Box, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import CustomTextfield from '../../Components/CustomTextfield';
import PasswordField from '../../Components/PasswordField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/auth';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import MapSelector from '../../Components/MapSelector';

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
        } : userType === 'donor' ?  {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: selectedLocation?.address,
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
            businessName: data.businessName,
            userType: 'donor',
        }:{};

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
        <Box sx={{ bgcolor: '#EEEEEE', px: { xs: 0, sm: 4, lg: 10 }, py: { xs: 2, md: 4 } }}>
            <Box sx={{ minHeight: '95vh', px: { xs: 3, lg: 5 }, py: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF', borderRadius: 2, pt: 2 }}>
                <Typography sx={{ fontSize: { xs: 18, md: 30 }, textAlign: 'center', fontWeight: 600 }}>
                    Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, md: 18 }, textAlign: 'center', color: '#686D76' }}>
                    Join our food redistribution platform
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {userType === 'donor' && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Box sx={{ width: '100%' }}>
                                <Typography>First Name <span style={{ color: 'red' }}>*</span></Typography>
                                <CustomTextfield placeholder="Enter your first name" {...register('firstName', { required: 'First Name is required' })} sx={{ width: '100%', mt: 1 }} />
                                {errors.firstName && <Typography color="error">{errors.firstName.message}</Typography>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography>Last Name <span style={{ color: 'red' }}>*</span></Typography>
                                <CustomTextfield placeholder="Enter your last name" {...register('lastName', { required: 'Last Name is required' })} sx={{ width: '100%', mt: 1 }} />
                                {errors.lastName && <Typography color="error">{errors.lastName.message}</Typography>}
                            </Box>
                        </Box>
                    )}

                    {userType === 'recipient' && (
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Typography>Recipient Name <span style={{ color: 'red' }}>*</span></Typography>
                            <CustomTextfield placeholder="Enter your organization name" {...register('recipientName', { required: 'Recipient name is required' })} sx={{ width: '100%', mt: 1 }} />
                            {errors.recipientName && <Typography color="error">{errors.recipientName.message}</Typography>}
                        </Box>
                    )}

                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography>Email Address <span style={{ color: 'red' }}>*</span></Typography>
                        <CustomTextfield placeholder="Enter your email address" {...register('email', { required: 'Email is required' })} sx={{ width: '100%', mt: 1 }} />
                        {errors.email && <Typography color="error">{errors.email.message}</Typography>}
                    </Box>

                    {userType === 'donor' && (
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Typography>Business Name</Typography>
                            <CustomTextfield placeholder="Enter your business name" {...register('businessName')} sx={{ width: '100%', mt: 1 }} />
                        </Box>
                    )}

                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography>New Password <span style={{ color: 'red' }}>*</span></Typography>
                        <PasswordField placeholder="Enter your new password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} sx={{ width: '100%', mt: 1 }} />
                        {errors.password && <Typography color="error">{errors.password.message}</Typography>}
                    </Box>

                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography>Confirm Password <span style={{ color: 'red' }}>*</span></Typography>
                        <PasswordField placeholder="Confirm your password" {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: value => value === newPassword || 'Passwords do not match'
                        })} sx={{ width: '100%', mt: 1 }} />
                        {errors.confirmPassword && <Typography color="error">{errors.confirmPassword.message}</Typography>}
                    </Box>

                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography>Mobile Number <span style={{ color: 'red' }}>*</span></Typography>
                        <CustomTextfield placeholder="Enter your Mobile Number" {...register('phone', { required: 'Phone number is required' })} sx={{ width: '100%', mt: 1 }} />
                        {errors.phone && <Typography color="error">{errors.phone.message}</Typography>}
                    </Box>

                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography sx={{mb:1,}}>Select Your Location <span style={{ color: 'red' }}>*</span></Typography>
                        <MapSelector value={selectedLocation} onChange={setSelectedLocation} />
                    </Box>

                    {userType === 'recipient' && (
                        <Box sx={{ flexDirection: 'column', mt: 3, display: 'flex' }}>
                            <Typography>Verification Document</Typography>
                            <Box sx={{ border: '2px dashed #B0BEC5', borderRadius: 2, textAlign: 'center', padding: 3, mt: 1, bgcolor: '#F5F5F5', cursor: 'pointer' }}>
                                <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
                                <label htmlFor="file-upload">
                                    <Typography sx={{ color: '#059669', fontSize: { xs: 14, md: 16 }, cursor: 'pointer' }}>
                                        {selectedFile ? selectedFile.name : "Upload a file or drag and drop"}
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: '#686D76' }}>
                                        Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                                    </Typography>
                                </label>
                            </Box>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                        <FormControlLabel control={<Checkbox {...register('terms', { required: 'You must agree to the Terms' })} />} label={<Typography sx={{ fontSize: { xs: 14, md: 18 }, color: '#686D76' }}>I agree to the Terms and Privacy Policy <span style={{ color: 'red' }}>*</span></Typography>} />
                    </Box>
                    {errors.terms && <Typography color="error">{errors.terms.message}</Typography>}

                    <Button type="submit" sx={{ bgcolor: '#059669', mt: 4, width: '100%', height: 50, borderRadius: 2, mx: 'auto' }}>
                        <Typography sx={{ color: '#FFFFFF', fontSize: { xs: 16, md: 20 }, fontWeight: 600, textTransform: 'none' }}>
                            Create Account
                        </Typography>
                    </Button>
                </form>

                <Typography sx={{ color: '#686D76', fontSize: { xs: 16, md: 20 }, mt: 4, textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Box component={'span'} sx={{ color: '#059669', cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>
                        Log in here
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default Registration;