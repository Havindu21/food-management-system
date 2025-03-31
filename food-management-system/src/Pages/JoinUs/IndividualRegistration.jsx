import { Box, Button, Typography } from '@mui/material'
import CustomTextfield from '../../Components/CustomTextfield'
import PasswordField from '../../Components/PasswordField'
import { CheckBox } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const IndividualRegistration = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            bgcolor: '#EEEEEE',
            px: { xs: 0, sm: 4, md: 10, },
            py: { xs: 2, md: 4 },
        }}>
            <Box sx={{
                minHeight: '95vh',
                px: { xs: 3, md: 5 },
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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 4,
                    gap: 4,
                    flexDirection: { xs: 'column', sm: 'row' },
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}>
                        <Typography sx={{
                            fontSize: { xs: 14, md: 18 },
                        }}>
                            First Name
                        </Typography>
                        <CustomTextfield

                            placeholder="Confirm your password"
                            sx={{
                                width: '100%',
                                mt: 1,
                            }}
                        />

                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}>
                        <Typography sx={{
                            fontSize: { xs: 14, md: 18 },
                        }}>
                            Last Name
                        </Typography>
                        <CustomTextfield

                            placeholder='Enter your last name'
                            sx={{
                                width: '100%',
                                mt: 1,
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        Email Address
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your email address'
                        sx={{
                            width: '100%',
                            mt: 1,
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        New Password
                    </Typography>
                    <PasswordField
                        placeholder='Enter your new password'
                        sx={{
                            width: '100%',
                            mt: 1,
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        Confirm Password
                    </Typography>
                    <PasswordField
                        placeholder='Confirm your password'
                        sx={{
                            width: '100%',
                            mt: 1,
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        Mobile Number
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your Mobile Number'
                        type='email'
                        sx={{
                            width: '100%',
                            mt: 1,
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        Address
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your full address'
                        sx={{
                            width: '100%',
                            mt: 1,
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 3,
                    gap: 1,
                }}>
                    <CheckBox />
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                        color: '#686D76',
                    }}>
                        I agree to the Terms and Privacy Policy
                    </Typography>
                </Box>
                <Button onClick={() => navigate('/home')} sx={{
                    bgcolor: '#059669',
                    mt: 4,
                    width: '100%',
                    height: 50,
                    borderRadius: 2,
                    mx: 'auto',
                }} >
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: { xs: 16, md: 20 },
                        fontWeight: 600,
                        textTransform: 'none',
                    }}>
                        Create Account
                    </Typography>
                </Button>
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
    )
}

export default IndividualRegistration