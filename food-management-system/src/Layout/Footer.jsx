import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material'
import React from 'react'
import Logo from '../assets/logo-remove-bg.png'
import { useNavigate } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleSocialLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        color: '#FFFFFF',
        pt: 6,
        pb: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 3 }}>
              <Box
                component={'img'}
                src={Logo}
                alt='Food Redistribution Sri Lanka Logo'
                sx={{
                  width: 120,
                  objectFit: 'cover',
                  mb: 2,
                  cursor: 'pointer',
                }}
                onClick={() => handleNavigation('/')}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.6,
                  mb: 2
                }}
              >
                Connecting surplus food with communities in need across Sri Lanka, reducing waste and fighting hunger.
              </Typography>
              
              {/* Social Media Icons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  sx={{ 
                    color: '#FFFFFF',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { 
                      bgcolor: '#059669',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleSocialLink('https://facebook.com')}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: '#FFFFFF',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { 
                      bgcolor: '#059669',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleSocialLink('https://instagram.com')}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: '#FFFFFF',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { 
                      bgcolor: '#059669',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleSocialLink('https://linkedin.com')}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                onClick={() => handleNavigation('/')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Home
              </Link>
              <Link
                onClick={() => handleNavigation('/about-us')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                About Us
              </Link>
              <Link
                onClick={() => handleNavigation('/insights')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Insights
              </Link>
              <Link
                onClick={() => handleNavigation('/faq')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* For Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              For
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                onClick={() => handleNavigation('/sign-in')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Restaurants
              </Link>
              <Link
                onClick={() => handleNavigation('/sign-in')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Food Banks
              </Link>
              <Link
                onClick={() => handleNavigation('/sign-in')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                NGOs
              </Link>
              <Link
                onClick={() => handleNavigation('/sign-in')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#059669',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Charities
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={5}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#059669', fontSize: 20 }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  123 Main Road, Colombo 07, Sri Lanka
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#059669', fontSize: 20 }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  info@foodshare.lk
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#059669', fontSize: 20 }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  +94 11 234 5678
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Copyright Section */}
        <Box 
          sx={{ 
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            mt: 4,
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © 2025 Food Redistribution Sri Lanka. All rights reserved.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#059669',
              textAlign: { xs: 'center', sm: 'right' }
            }}
          >
            Fighting food insecurity, one meal at a time 🌿
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer