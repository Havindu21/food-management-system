import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Fade } from '@mui/material';
import { PeopleAlt, FavoriteBorder, Restaurant, Public } from '@mui/icons-material';

const JoinCommunity = () => {
  const primaryColor = '#059669'; // Same primary color as HowItWorks

  const benefits = [
    {
      icon: <PeopleAlt sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Connect",
      description: "Connect with food enthusiasts and share your culinary experiences"
    },
    {
      icon: <Restaurant sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Share",
      description: "Share your surplus food and reduce waste while helping others"
    },
    {
      icon: <FavoriteBorder sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Support",
      description: "Support local communities through sustainable food practices"
    },
    {
      icon: <Public sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Impact",
      description: "Make a positive environmental impact by minimizing food waste"
    }
  ];

  return (
    <Box 
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#FAFAFA',
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.95) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          zIndex: 0
        }
      }}
      id="join-community-section"
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '120%',
            height: '120%',
            top: '-60%',
            right: '-60%',
            backgroundColor: `${primaryColor}0D`, // 5% opacity
            transform: 'rotate(45deg)',
            zIndex: 0
          }
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                mb: { xs: 4, md: 6 },
                fontWeight: '800',
                fontSize: { xs: '2.2rem', md: '3rem' },
                background: `linear-gradient(45deg, ${primaryColor} 30%, #34D399 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100px',
                  height: '5px',
                  bottom: '-15px',
                  left: 'calc(50% - 50px)',
                  background: `linear-gradient(90deg, ${primaryColor} 30%, #34D399 90%)`,
                  borderRadius: '10px'
                }
              }}
            >
              Join Our Food Sharing Community
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="textSecondary"
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 6,
                px: 2,
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6
              }}
            >
              Be part of a growing movement that's transforming how we think about food. 
              Together, we can reduce waste, support local communities, and create a more sustainable food system.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: '16px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: `1px solid rgba(0,0,0,0.05)`,
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${primaryColor}1A`,
                    mb: 2
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="600">
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box 
          sx={{
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(52, 211, 153, 0.12) 100%)',
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: `${primaryColor}0A`,
              top: '-75px',
              right: '-75px'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `${primaryColor}0A`,
              bottom: '-50px',
              left: '-50px'
            }
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="700">
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Join thousands of food enthusiasts who are already making a difference. 
            Whether you're looking to share your food, discover new local options, or just connect with like-minded people, 
            our community welcomes you with open arms.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1,
                borderRadius: '8px',
                borderColor: primaryColor,
                color: primaryColor,
                fontWeight: 600,
                '&:hover': {
                  borderColor: primaryColor,
                  backgroundColor: 'rgba(5, 150, 105, 0.08)'
                }
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1,
                borderRadius: '8px',
                backgroundColor: primaryColor,
                fontWeight: 600,
                boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)',
                '&:hover': {
                  backgroundColor: '#047857',
                  boxShadow: '0 6px 15px rgba(5, 150, 105, 0.4)'
                }
              }}
            >
              Join Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinCommunity;
