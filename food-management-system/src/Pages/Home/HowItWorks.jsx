import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme, useMediaQuery, Button, Fade, Grow } from '@mui/material';
import { RestaurantMenu, LocalShipping, ThumbUp, Search } from '@mui/icons-material';

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const sectionRef = useRef(null);
  
  const primaryColor = '#059669'; // Updated primary color

  // Animation for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elements = document.querySelectorAll('.step-item');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate');
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      icon: <RestaurantMenu sx={{ fontSize: 40, color: primaryColor }} />,
      title: "List or Request",
      description: "Restaurants, hotels, and grocery stores list surplus food while recipients can browse or request specific food items.",
      additionalDetail: "Donors provide detailed descriptions including quantity, expiration date, and pickup location.",
      color: '#E2F8F0' // Lighter shade of the primary color
    },
    {
      icon: <Search sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Match & Connect",
      description: "Recipients find suitable donations through search filters and accept food listings via our real-time matching system.",
      additionalDetail: "View donation details, location maps, and coordinate pickup times instantly.",
      color: '#C8F5E2' // Another shade of the primary color
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Pickup & Track",
      description: "Track order status from acceptance to pickup completion. Navigate to donation locations using integrated map directions.",
      additionalDetail: "Update order status through each stage: accepted, in-transit, and completed.",
      color: '#A7F0D1' // Another shade of the primary color
    },
    {
      icon: <ThumbUp sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Rate & Impact",
      description: "Rate your experience and track environmental impact. See meals saved and CO2 emissions reduced through redistribution.",
      additionalDetail: "Build trust through the rating system and earn achievements for your contributions.",
      color: '#8FEDD5' // Another shade of the primary color
    },
  ];

  return (
    <Box 
      ref={sectionRef}
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
      id="how-it-works-section"
    >
      {/* Triangle 1 - Darker triangle from top left to bottom right */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '150%',
            height: '150%',
            top: '-70%',
            left: '-70%',
            backgroundColor: `${primaryColor}1A`, // 10% opacity
            transform: 'rotate(45deg)',
            zIndex: 0
          }
        }}
      />

      {/* Triangle 2 - Medium darker triangle from top right */}
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
            width: '80%',
            height: '80%',
            top: '-40%',
            right: '-40%',
            backgroundColor: `${primaryColor}0D`, // 5% opacity
            transform: 'rotate(45deg)',
            zIndex: 0
          }
        }}
      />

      {/* Triangle 3 - White triangle filling the rest */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          bottom: 0,
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
            bottom: '-70%',
            right: '-70%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
              Food Redistribution Made Simple
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="textSecondary"
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 8,
                px: 2,
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6
              }}
            >
              Connect surplus food with those in need while reducing waste and environmental impact. Join our community in fighting food insecurity and saving our planet.
            </Typography>
          </Box>
        </Fade>
        
        <Box sx={{ position: 'relative' }}>
          {/* Timeline stem for desktop */}
          {!isMobile && (
            <Box sx={{
              position: 'absolute',
              top: 60,
              left: '50%',
              height: 'calc(100% - 120px)',
              width: '4px',
              backgroundColor: primaryColor,
              opacity: 0.6,
              transform: 'translateX(-50%)',
              zIndex: 1,
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: primaryColor,
                left: '-8px',
              },
              '&::before': {
                top: '-10px',
              },
              '&::after': {
                bottom: '-10px',
              }
            }} />
          )}
          
          <Grid container spacing={4} direction="column">
            {steps.map((step, index) => (
              <Grid item key={index}>
                <Box
                  className="step-item"
                  sx={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    '&.animate': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: '16px',
                      position: 'relative',
                      backgroundColor: 'white',
                      overflow: 'hidden',
                      ml: index % 2 !== 0 && !isMobile ? '50%' : 0,
                      mr: index % 2 === 0 && !isMobile ? '50%' : 0,
                      transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '0' : '0'}deg)`,
                      transition: 'all 0.5s ease',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      border: `1px solid rgba(0,0,0,0.05)`,
                      '&:hover': {
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        transform: 'translateY(-5px)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '8px',
                        height: '100%',
                        backgroundColor: step.color,
                      }
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3} md={2}>
                        <Box
                          sx={{
                            width: { xs: 60, md: 80 },
                            height: { xs: 60, md: 80 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: step.color,
                            margin: isMobile ? '0 auto 20px' : '0 auto',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              border: `2px solid ${primaryColor}`,
                              animation: 'pulse 2s infinite',
                            },
                          }}
                        >
                          {step.icon}
                          <Typography
                            sx={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              width: 30,
                              height: 30,
                              borderRadius: '50%',
                              backgroundColor: primaryColor,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold'
                            }}
                          >
                            {index + 1}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={9} md={10}>
                        <Box>
                          <Typography variant="h5" component="h3" gutterBottom sx={{ 
                            fontWeight: '600',
                            position: 'relative',
                            display: 'inline-block',
                          }}>
                            {step.title}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', fontSize: '1rem' }}>
                            {step.description}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                            {step.additionalDetail}
                          </Typography>
                          {index === steps.length - 1 && (
                            <Button
                              variant="contained"
                              sx={{
                                mt: 3,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                backgroundColor: primaryColor,
                                boxShadow: `0 4px 10px rgba(5, 150, 105, 0.3)`,
                                '&:hover': {
                                  backgroundColor: '#047857',
                                  boxShadow: `0 6px 15px rgba(5, 150, 105, 0.4)`,
                                },
                              }}
                            >
                              Join Our Community
                            </Button>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Add keyframes for pulse animation */}
        <Box
          sx={{
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '50%': {
                transform: 'scale(1.1)',
                opacity: 0.7,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
          component="span"
        />
      </Container>
    </Box>
  );
};

export default HowItWorks;