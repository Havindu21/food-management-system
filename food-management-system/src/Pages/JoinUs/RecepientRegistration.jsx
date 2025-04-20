import { Box, Button, Typography } from '@mui/material'
import CustomTextfield from '../../Components/CustomTextfield'
import PasswordField from '../../Components/PasswordField'
import { CheckBox } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RecepientRegistration = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
            setSelectedFile(file);
        } else {
            alert('File size exceeds 5MB or invalid format.');
        }
    };

    return (
        <Box sx={{
            bgcolor: '#EEEEEE',
            px: { xs: 0, sm: 4, lg: 10, },
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
                pt: 4,
            }}>
                <Typography sx={{
                    fontSize: { xs: 18, md: 30 },
                    textAlign: 'center',
                    fontWeight: 600,
                }}>
                    Register as Recepient Organization
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 18 },
                    textAlign: 'center',
                    color: '#686D76',
                }}>
                    For charities food banks, and other recepient organizations
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
                        Organization Name
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your organization name'
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
                        Organization Type
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your organization type'
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
                        Address
                    </Typography>
                    <CustomTextfield
                        placeholder='Enter your address'
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
                    flexDirection: 'column',
                    width: '100%',
                    mt: 2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 18 },
                    }}>
                        Organization Description
                    </Typography>
                    <CustomTextfield
                        placeholder='Briefly describe your organization and who you serve'
                        sx={{
                            width: '100%',
                            mt: 1,
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
                    <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 600 }}>
                        Verification Document
                    </Typography>
                    <Box sx={{
                        border: '2px dashed #B0BEC5',
                        borderRadius: 2,
                        textAlign: 'center',
                        padding: 3,
                        mt: 1,
                        bgcolor: '#F5F5F5',
                        cursor: 'pointer',
                    }}>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.png"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
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
                        Register Organization
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

export default RecepientRegistration