import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Divider,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Icons
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import SpaIcon from '@mui/icons-material/Spa';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import teamMemberImage from '../../assets/AboutUs/aboutus1.png.webp';
import heroImage from '../../assets/AboutUs/heroimage.jpg';
import communityImage from '../../assets/AboutUs/community.jpg';
import cinnamonLogo from '../../assets/AboutUs/cinnamon.png';
import keelsLogo from '../../assets/AboutUs/keels.jpg';
import kaemasutraLogo from '../../assets/AboutUs/kaemasutra.png';
import commonsLogo from '../../assets/AboutUs/commons.png';
import apiLogo from '../../assets/AboutUs/api.png';

// For now using placeholders
const teamMembers = [
    {
      name: 'Hansana Sandipa',
      position: 'Founder & CEO',
      image: teamMemberImage,
      bio: 'Hansana founded Food Share with a mission to reduce food waste and create a more equitable food system in Sri Lanka.',
    },
    {
      name: 'Hansana Sandipa',
      position: 'Head of Operations',
      image: teamMemberImage,
      bio: 'Hansana leads our day-to-day operations, ensuring food gets where it needs to go efficiently and safely.',
    },
    {
      name: 'Hansana Sandipa',
      position: 'Community Relations',
      image: teamMemberImage,
      bio: 'Hansana works closely with community organizations to understand their needs and maximize our positive impact.',
    },
  ];
  

const partners = [
  { name: 'Cinnamon Grand Hotel', logo: cinnamonLogo },
  { name: 'Keells Super', logo: keelsLogo },
  { name: 'Kaema Sutra Restaurant', logo: kaemasutraLogo },
  { name: 'Commons Coffee House', logo: commonsLogo },
  { name: 'Api Foundation', logo: apiLogo },
];

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box sx={{ bgcolor: '#FAFAFA', pb: 10 }}>
      {/* Hero Section with Background Image */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '60vh', md: '70vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(5, 150, 105, 0.7), rgba(10, 40, 50, 0.7))',
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Our Mission
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 400,
                fontSize: { xs: '1.125rem', md: '1.625rem' },
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.7,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              Connecting excess food with those who need it most, reducing waste, 
              and creating a more sustainable and equitable Sri Lanka.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" component={motion.div} sx={{ mb: 10 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: '#2D3748', mb: 3 }}>
                Our Story
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568', mb: 3, lineHeight: 1.8 }}>
                Food Share began in 2023 when a group of passionate individuals saw two problems in Sri Lanka: 
                restaurants and markets with excess food going to waste, and communities struggling with food 
                insecurity.
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568', mb: 3, lineHeight: 1.8 }}>
                What started as a small initiative connecting a few restaurants with local shelters has grown 
                into a nationwide platform that bridges the gap between food donors and recipients, creating 
                a more efficient and sustainable food distribution system.
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568', mb: 3, lineHeight: 1.8 }}>
                Today, we're proud to have saved over 100,000 meals from going to waste, while providing 
                nutritious food to thousands of people in need across the country.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                }}
              >
                <Box
                  component="img"
                  src={communityImage}
                  alt="Community food sharing"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Impact Stats */}
      <Box sx={{ bgcolor: '#059669', py: 8, mb: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: 'white', mb: 6 }}>
              Our Impact
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                { icon: <RestaurantIcon fontSize="large" />, stat: '125,000+', text: 'Meals Saved' },
                { icon: <PeopleIcon fontSize="large" />, stat: '45,000+', text: 'People Fed' },
                { icon: <SpaIcon fontSize="large" />, stat: '75', text: 'Tons of CO2 Prevented' },
                { icon: <HandshakeIcon fontSize="large" />, stat: '300+', text: 'Partner Organizations' },
              ].map((item, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        width: 70,
                        height: 70,
                        mb: 2,
                        color: 'white',
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1, fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                      {item.stat}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Our Values */}
      <Container maxWidth="lg" component={motion.div} sx={{ mb: 10 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: '#2D3748', mb: 6 }}>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Sustainability',
              description: 'We believe in creating systems that protect our environment by reducing food waste and its associated environmental impact.',
              icon: <SpaIcon fontSize="large" style={{ color: '#059669' }} />
            },
            {
              title: 'Equity',
              description: 'Everyone deserves access to nutritious food. We work to create more equitable food distribution systems in our communities.',
              icon: <VolunteerActivismIcon fontSize="large" style={{ color: '#059669' }} />
            },
            {
              title: 'Community',
              description: 'We foster connections between food donors, recipients, and volunteers, creating a network of mutual support and solidarity.',
              icon: <PeopleIcon fontSize="large" style={{ color: '#059669' }} />
            },
            {
              title: 'Collaboration',
              description: 'By working together with restaurants, businesses, NGOs, and individuals, we create solutions that benefit everyone.',
              icon: <HandshakeIcon fontSize="large" style={{ color: '#059669' }} />
            },
          ].map((value, index) => (
            <Grid item xs={12} sm={6} key={index} component={motion.div} variants={itemVariants}>
              <Card 
                sx={{ 
                  height: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'rgba(5, 150, 105, 0.1)', 
                        color: '#059669',
                        width: 56,
                        height: 56,
                        mr: 2
                      }}
                    >
                      {value.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#2D3748' }}>
                      {value.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#4A5568', lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Container maxWidth="lg" component={motion.div} sx={{ mb: 10 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: '#2D3748', mb: 2 }}>
          Meet Our Team
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: '#4A5568', mb: 6, maxWidth: 800, mx: 'auto' }}>
          Passionate individuals dedicated to creating a more sustainable and equitable food system
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index} component={motion.div} variants={itemVariants}>
              <Card 
                sx={{ 
                  height: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#2D3748', mb: 0.5 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#059669', fontWeight: 500, mb: 2 }}>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A5568' }}>
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Partners Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8, mb: 10 }}>
        <Container maxWidth="lg" component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: '#2D3748', mb: 2 }}>
            Our Partners
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: '#4A5568', mb: 6, maxWidth: 800, mx: 'auto' }}>
            We're proud to work with these organizations to reduce food waste and fight hunger
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {partners.map((partner, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index} component={motion.div} variants={itemVariants}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    bgcolor: 'white',
                    height: 150,
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: 80,
                      mb: 2,
                      objectFit: 'contain'
                    }}
                  />
                  <Typography variant="subtitle2" align="center" sx={{ fontWeight: 500, color: '#4A5568' }}>
                    {partner.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Join Us CTA */}
      <Container maxWidth="md" component={motion.div} sx={{ mb: 10 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <Box 
          sx={{
            bgcolor: '#059669',
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Join Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
            Whether you're a restaurant with excess food, an organization serving those in need, 
            or an individual looking to make a difference, there's a place for you in our community.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/register/donor')}
                sx={{
                  bgcolor: 'white',
                  color: '#059669',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Register as Donor
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/register/recipient')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Register as Recipient
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Contact Section */}
      <Container maxWidth="lg" component={motion.div} sx={{ mb: 10 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2D3748', mb: 3 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A5568', mb: 4, lineHeight: 1.8 }}>
              Have questions about our platform or want to learn more about how you can get involved? 
              We'd love to hear from you.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3748', mb: 1 }}>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568', mb: 1 }}>
                Email: info@foodshare.lk
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568', mb: 1 }}>
                Phone: +94 77 123 4567
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568' }}>
                Address: 123 Green Lane, Colombo 05, Sri Lanka
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3748', mb: 1 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    sx={{
                      borderColor: '#CBD5E0',
                      color: '#4A5568',
                      '&:hover': {
                        borderColor: '#059669',
                        color: '#059669',
                        bgcolor: 'transparent',
                      }
                    }}
                  >
                    {social}
                  </Button>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
            <Box
              sx={{
                height: '100%',
                minHeight: 400,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              }}
            >
              {/* Replace with an actual Google Map component in production */}
              <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.446395690506!2d79.861243!3d6.839083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25973609345e5%3A0x61df7b7e5b2b104d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1714556234589!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;