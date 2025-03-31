import { Box, Button, Typography } from '@mui/material'
import CustomTextfield from '../../Components/CustomTextfield'
import PasswordField from '../../Components/PasswordField'
import { CheckBox } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const BusinessRegistration = () => {
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
                pt: 4,
            }}>
                <Typography sx={{
                    fontSize: { xs: 18, md: 30 },
                    textAlign: 'center',
                    fontWeight: 600,
                }}>
                    Register as Business
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
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        Business Name
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your business name'
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
                        Business Type
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your business type'
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
                        Contact Person
                    </Typography>
                    <CustomTextfield
                        placeholder='Full name of contact person'
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
                        Business Address
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your business address'
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
                        City
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your city'
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
                        Register Business
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

export default BusinessRegistration