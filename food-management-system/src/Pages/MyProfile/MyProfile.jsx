import { Box, Typography, Avatar, Chip, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Snackbar, Alert } from '@mui/material'
import React, { useState, useEffect } from 'react'
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
import profileService from '../../Services/profileService';
import CustomTextfield from '../../Components/CustomTextfield';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    userType: '',
    isVerified: false,
    profileImage: null
  });

  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileInput, setFileInput] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Calculated fields
  const rating = 4.5; // This would come from the backend in a real implementation
  const achievements = [
    { title: 'First Donation', icon: '🎉', description: 'Made your first donation', color: '#FF6B6B' },
    { title: 'Frequent Donor', icon: '⭐', description: 'Made 10+ donations', color: '#4ECDC4' },
    { title: 'CO2 Saver', icon: '🌱', description: 'Saved 100+ kg of CO2', color: '#95E1D3' },
    { title: 'Community Hero', icon: '🏆', description: 'High community impact', color: '#FFE66D' },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await profileService.getCurrentUserProfile();
      if (response.success && response.data) {
        const profile = response.data;
        setUserData({
          _id: profile._id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone || '',
          address: profile.address || '',
          businessName: profile.businessName || '',
          userType: profile.userType || 'donor',
          isVerified: profile.isVerified || false,
          profileImage: profile.profileImage || null
        });
        setFormData({
          name: profile.name,
          phone: profile.phone || '',
          address: profile.address || '',
          businessName: profile.businessName || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      handleSnackbar('Error loading profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await profileService.updateUserProfile(userData._id, formData);
      if (response.success) {
        setUserData(prev => ({
          ...prev,
          ...formData
        }));
        handleSnackbar('Profile updated successfully', 'success');
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      handleSnackbar('Error updating profile', 'error');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileInput(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!fileInput) return;

    try {
      setImageUploading(true);
      const response = await profileService.uploadProfileImage(fileInput);
      if (response.success) {
        setUserData(prev => ({
          ...prev,
          profileImage: response.data.imageUrl
        }));
        handleSnackbar('Profile image updated successfully', 'success');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      handleSnackbar('Error uploading image', 'error');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  // Create profile fields from user data
  const profileFields = [
    {
      key: 'Name',
      value: userData.name,
      icon: <PermIdentityOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Business Name',
      value: userData.businessName,
      icon: <BusinessIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Email',
      value: userData.email,
      icon: <EmailOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
      additionalInfo: userData.isVerified ? (
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
      value: userData.address,
      icon: <LocationOnOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
    },
    {
      key: 'Account Type',
      value: userData.userType === 'donor' ? 'Donor' : 
             userData.userType === 'recipient' ? 'Recipient' : 
             userData.userType === 'admin' ? 'Administrator' : 'User',
      icon: <BusinessOutlinedIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />,
      additionalInfo: (
        <Chip 
          label={userData.userType === 'donor' ? 'Donor' : 
                userData.userType === 'recipient' ? 'Recipient' : 
                userData.userType === 'admin' ? 'Administrator' : 'User'} 
          size="small" 
          sx={{ 
            ml: 1,
            backgroundColor: userData.userType === 'donor' ? '#3B82F6' : 
                            userData.userType === 'recipient' ? '#8B5CF6' : 
                            userData.userType === 'admin' ? '#F59E0B' : '#6B7280',
            color: 'white',
            fontWeight: 600,
            height: '20px',
            fontSize: '0.75rem'
          }}
        />
      )
    },
  ];

  // Conditionally render a loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#059669' }} />
      </Box>
    );
  }

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
            <IconButton size="small" sx={{ color: 'white' }} onClick={handleEditClick}>
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
                onClick={() => document.getElementById('profile-image-upload').click()}
                disabled={imageUploading}
              >
                {imageUploading ? 
                  <CircularProgress size={16} sx={{ color: 'white' }} /> : 
                  <PhotoCameraIcon sx={{ fontSize: '1rem' }} />
                }
              </IconButton>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                onClick={(e) => {
                  if (fileInput) {
                    e.target.value = null;
                    setFileInput(null);
                  }
                }}
              />
            </Box>

            {/* Name and Quick Stats */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#1F2937', mb: 0.5 }}>
                {userData.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#6B7280', mb: 1 }}>
                <StarRateOutlinedIcon sx={{ color: '#FFD700', verticalAlign: 'middle', mr: 0.5, fontSize: '1.2rem' }} />
                {rating} Rating
              </Typography>
              {fileInput && (
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#059669', 
                    '&:hover': { backgroundColor: '#047857' },
                    textTransform: 'none',
                    mt: 1
                  }}
                  onClick={handleImageUpload}
                  disabled={imageUploading}
                >
                  Upload Image
                </Button>
              )}
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
              Achievements & Badges
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
              {achievements.map((achievement, index) => (
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

      {/* Edit Profile Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #059669 30%, #10b981 90%)',
          color: 'white',
          fontWeight: 600
        }}>
          Edit Profile Information
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <CustomTextfield 
              label="Full Name"
              name="name"
              value={formData.name || ''}
              onChange={handleFormChange}
              fullWidth
            />
            <CustomTextfield 
              label="Business Name"
              name="businessName"
              value={formData.businessName || ''}
              onChange={handleFormChange}
              fullWidth
            />
            <CustomTextfield 
              label="Phone Number"
              name="phone"
              value={formData.phone || ''}
              onChange={handleFormChange}
              fullWidth
            />
            <CustomTextfield 
              label="Address"
              name="address"
              value={formData.address || ''}
              onChange={handleFormChange}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={handleDialogClose}
            sx={{ 
              color: '#4B5563',
              '&:hover': { backgroundColor: '#F3F4F6' } 
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveProfile}
            variant="contained"
            sx={{ 
              backgroundColor: '#059669', 
              '&:hover': { backgroundColor: '#047857' },
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.2)'
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyProfile;