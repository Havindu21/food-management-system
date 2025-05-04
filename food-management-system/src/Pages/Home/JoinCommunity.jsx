import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Fade } from '@mui/material';
import { LocalDining, RestaurantMenu, EmojiNature, RemoveCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JoinCommunity = () => {
  const primaryColor = '#059669'; // Same primary color as HowItWorks
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <RemoveCircle sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Reduce Waste",
      description: "Help reduce the 260,000-275,000 tons of food wasted annually in Sri Lanka"
    },
    {
      icon: <LocalDining sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Feed Communities",
      description: "Support the 4.8 million Sri Lankans facing food insecurity with surplus food"
    },
    {
      icon: <EmojiNature sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Save Environment",
      description: "Reduce CO₂ emissions by preventing food waste from reaching landfills"
    },
    {
      icon: <RestaurantMenu sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Build Trust",
      description: "Create reliable connections between donors and recipients through our rating system"
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
              Join Sri Lanka's Food Redistribution Network
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
              Be part of the solution to food waste and hunger in Sri Lanka. 
              Together, we can ensure surplus food reaches those who need it while protecting our environment.
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
            Start Making a Difference Today
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Whether you're a business with surplus food, a charitable organization serving communities, 
            or someone passionate about reducing waste - your contribution matters. 
            Join our network and help build a more sustainable future for Sri Lanka.
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
              onClick={() => navigate('/sign-in')}
            >
              I'm a Business
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
              onClick={() => navigate('/sign-in')}
            >
              I'm a Charity
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinCommunity;