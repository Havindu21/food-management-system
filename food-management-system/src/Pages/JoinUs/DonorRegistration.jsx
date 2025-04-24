import { Box, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import CustomTextfield from '../../Components/CustomTextfield';
import PasswordField from '../../Components/PasswordField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/auth';

const DonorRegistration = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Watch new password field to validate confirm password
    const newPassword = watch('password');

    // Submit Handler
    const onSubmit = async (data) => {
        const userData = {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address,
            role: 'recipient',
        };

        try {
            const response = await registerUser(userData);
            console.log('Registration Success:', response);
            alert('Registration Successful');
            navigate('/home');
        } catch (error) {
            console.error('Registration Error:', error.response?.data || error.message);
            alert('Registration Failed');
        }
    };

    return (
        <Box sx={{
            bgcolor: '#EEEEEE',
            px: { xs: 0, sm: 4, lg: 10 },
            py: { xs: 2, md: 4 },
        }}>
            <Box sx={{
                minHeight: '95vh',
                px: { xs: 3, lg: 5 },
                py: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#FFFFFF',
                borderRadius: 2,
                pt: 2,
            }}>
                <Typography sx={{
                    fontSize: { xs: 18, md: 30 },
                    textAlign: 'center',
                    fontWeight: 600,
                }}>
                    Register as Individual
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 18 },
                    textAlign: 'center',
                    color: '#686D76',
                }}>
                    Join our food redistribution platform
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 4,
                        gap: 4,
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}>
                        {/* First Name */}
                        <Box sx={{ width: '100%' }}>
                            <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>First Name</Typography>
                            <CustomTextfield
                                placeholder="Enter your first name"
                                {...register('firstName', { required: 'First Name is required' })}
                                sx={{ width: '100%', mt: 1 }}
                            />
                            {errors.firstName && <Typography color="error">{errors.firstName.message}</Typography>}
                        </Box>

                        {/* Last Name */}
                        <Box sx={{ width: '100%' }}>
                            <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>Last Name</Typography>
                            <CustomTextfield
                                placeholder="Enter your last name"
                                {...register('lastName', { required: 'Last Name is required' })}
                                sx={{ width: '100%', mt: 1 }}
                            />
                            {errors.lastName && <Typography color="error">{errors.lastName.message}</Typography>}
                        </Box>
                    </Box>

                    {/* Email */}
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>Email Address</Typography>
                        <CustomTextfield
                            placeholder="Enter your email address"
                            {...register('email', { required: 'Email is required' })}
                            sx={{ width: '100%', mt: 1 }}
                        />
                        {errors.email && <Typography color="error">{errors.email.message}</Typography>}
                    </Box>

                    {/* Password */}
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>New Password</Typography>
                        <PasswordField
                            placeholder="Enter your new password"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                            sx={{ width: '100%', mt: 1 }}
                        />
                        {errors.password && <Typography color="error">{errors.password.message}</Typography>}
                    </Box>

                    {/* Confirm Password */}
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>Confirm Password</Typography>
                        <PasswordField
                            placeholder="Confirm your password"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: value => value === newPassword || 'Passwords do not match'
                            })}
                            sx={{ width: '100%', mt: 1 }}
                        />
                        {errors.confirmPassword && <Typography color="error">{errors.confirmPassword.message}</Typography>}
                    </Box>

                    {/* Mobile Number */}
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>Mobile Number</Typography>
                        <CustomTextfield
                            placeholder="Enter your Mobile Number"
                            {...register('phone', { required: 'Phone number is required' })}
                            sx={{ width: '100%', mt: 1 }}
                        />
                        {errors.phone && <Typography color="error">{errors.phone.message}</Typography>}
                    </Box>

                    {/* Address */}
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>Address</Typography>
                        <CustomTextfield
                            placeholder="Enter your full address"
                            {...register('address', { required: 'Address is required' })}
                            sx={{ width: '100%', mt: 1 }}
                        />
                        {errors.address && <Typography color="error">{errors.address.message}</Typography>}
                    </Box>

                    {/* Terms and Conditions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                        <FormControlLabel
                            control={<Checkbox {...register('terms', { required: 'You must agree to the Terms' })} />}
                            label={<Typography sx={{ fontSize: { xs: 14, md: 18 }, color: '#686D76' }}>I agree to the Terms and Privacy Policy</Typography>}
                        />
                    </Box>
                    {errors.terms && <Typography color="error">{errors.terms.message}</Typography>}

                    {/* Submit Button */}
                    <Button type="submit" sx={{
                        bgcolor: '#059669',
                        mt: 4,
                        width: '100%',
                        height: 50,
                        borderRadius: 2,
                        mx: 'auto',
                    }}>
                        <Typography sx={{
                            color: '#FFFFFF',
                            fontSize: { xs: 16, md: 20 },
                            fontWeight: 600,
                            textTransform: 'none',
                        }}>
                            Create Account
                        </Typography>
                    </Button>
                </form>
                <Typography sx={{
                    color: '#686D76',
                    fontSize: { xs: 16, md: 20 },
                    mt: 4,
                    textAlign: 'center',
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
    );
};

export default DonorRegistration;
