import { Box, Typography, Avatar, Chip, Paper, IconButton } from '@mui/material'
import React from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const RecipientSettings = () => {
  const userData = {
    name: 'Hansana Sandipa',
    organizationName: 'Hope Shelter Foundation',
    email: 'recipient@gmail.com',
    emailVerified: true,
    phone: '+947771234567',
    location: 'No 45, Nawala Road, Colombo 10',
    accountType: 'Recipient',
    rating: 4.8,
    isVerified: true, // Profile verification status
    achievements: [
      { title: 'Regular Receiver', icon: '📦', description: 'Received 20+ donations', color: '#10B981' },
      { title: 'Community Partner', icon: '🤝', description: 'Active partner for 6+ months', color: '#3B82F6' },
      { title: 'Impact Maker', icon: '💫', description: 'Served 500+ beneficiaries', color: '#8B5CF6' },
      { title: 'Zero Waste', icon: '♻️', description: 'No waste reported', color: '#22D3EE' },
    ],
    profileImage: null
  };

  const profileFields = [
    {
      key: 'Name',
      value: userData.name,
      icon: <PermIdentityOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Organization Name',
      value: userData.organizationName,
      icon: <BusinessIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Email',
      value: userData.email,
      icon: <EmailOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
      additionalInfo: userData.emailVerified ? (
        <Chip 
          icon={<VerifiedIcon />} 
          label="Verified" 
          size="small" 
          sx={{ 
            ml: 1, 
            backgroundColor: '#10B981', 
            color: 'white',
            '& .MuiChip-icon': { color: 'white' },
            height: '20px',
            fontSize: '0.75rem'
          }}
        />
      ) : null
    },
    {
      key: 'Phone',
      value: userData.phone,
      icon: <LocalPhoneOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Location',
      value: userData.location,
      icon: <LocationOnOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Account Type',
      value: userData.accountType,
      icon: <BusinessOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
      additionalInfo: (
        <Chip 
          label={userData.accountType} 
          size="small" 
          sx={{ 
            ml: 1,
            backgroundColor: userData.accountType === 'Donor' ? '#3B82F6' : '#8B5CF6',
            color: 'white',
            fontWeight: 600,
            height: '20px',
            fontSize: '0.75rem'
          }}
        />
      )
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2, mt: 3 }}>
      {/* Main Profile Card */}
      <Paper 
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Header Section */}
        <Box sx={{
          background: 'linear-gradient(45deg, #059669 30%, #10b981 90%)',
          p: 2.5,
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Profile Overview
            </Typography>
            <IconButton size="small" sx={{ color: 'white' }}>
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Profile Content */}
        <Box sx={{ p: 3 }}>
          {/* Top Section with Profile Image and Info */}
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
            {/* Profile Image Section */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={userData.profileImage}
                sx={{ 
                  width: 100, 
                  height: 100,
                  border: '4px solid white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  fontSize: '2rem',
                  backgroundColor: '#059669',
                  color: 'white'
                }}
              >
                {userData.name.charAt(0)}
              </Avatar>
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  backgroundColor: '#059669',
                  color: 'white',
                  '&:hover': { backgroundColor: '#047857' },
                  width: 28,
                  height: 28,
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
              {/* Verification Badge */}
              {userData.isVerified && (
                <Box sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: '#10B981',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                }}>
                  <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: '1rem' }} />
                </Box>
              )}
            </Box>

            {/* Name and Quick Stats */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1F2937', mb: 0.5 }}>
                  {userData.name}
                </Typography>
                {userData.isVerified && (
                  <Chip 
                    icon={<VerifiedIcon />} 
                    label="Verified Profile" 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#10B981', 
                      color: 'white',
                      '& .MuiChip-icon': { color: 'white' },
                      fontWeight: 600,
                      height: '24px',
                      fontSize: '0.75rem'
                    }}
                  />
                )}
              </Box>
              <Typography variant="body1" sx={{ color: '#6B7280', mb: 1 }}>
                <VolunteerActivismIcon sx={{ color: '#10B981', verticalAlign: 'middle', mr: 0.5, fontSize: '1.2rem' }} />
                {userData.organizationName}
              </Typography>
              <Typography variant="body1" sx={{ color: '#6B7280', mb: 1 }}>
                <StarRateOutlinedIcon sx={{ color: '#FFD700', verticalAlign: 'middle', mr: 0.5, fontSize: '1.2rem' }} />
                {userData.rating} Rating
              </Typography>
            </Box>
          </Box>

          {/* Information Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
            {profileFields.map((field, index) => (
              <Paper 
                key={index}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #F3F4F6',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{
                    width: 35,
                    height: 35,
                    borderRadius: 1.5,
                    backgroundColor: '#D1FAE5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {field.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#6B7280', fontSize: 11 }}>
                      {field.key}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 600, color: '#1F2937', fontSize: 13 }}>
                        {field.value}
                      </Typography>
                      {field.additionalInfo}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Achievements Section */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1F2937' }}>
              Achievements & Recognition
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
              {userData.achievements.map((achievement, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 1.5,
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 12px rgba(0,0,0,0.08)',
                      borderColor: achievement.color
                    }
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: achievement.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto',
                      fontSize: '1.4rem',
                      boxShadow: `0 2px 8px ${achievement.color}40`
                    }}>
                      {achievement.icon}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: '#1F2937', fontSize: 14 }}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 11 }}>
                      {achievement.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RecipientSettings;