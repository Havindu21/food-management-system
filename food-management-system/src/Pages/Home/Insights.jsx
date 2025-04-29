import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { globalMt, globalPx } from '../../Theme/Theme';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaIcon from '@mui/icons-material/Spa';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InsightTile from '../../Components/InsightTile';

const Insights = () => {
    // Only keep the first 6 insights from your original array
    const displayedInsights = [
      {
        title: 'Meals Saved',
        IconComponent: RestaurantIcon,
        count: '125,000',
      },
      {
        title: 'People Fed',
        IconComponent: GroupsIcon,
        count: '45,000',
      },
      {
        title: 'CO2 Emissions Prevented',
        IconComponent: SpaIcon,
        count: '75',
        unit: 'tons',
      },
      {
        title: 'Total Donors',
        IconComponent: CardMembershipIcon,
        count: '15,000',
      },
      {
        title: 'Volunteers Engaged',
        IconComponent: VolunteerActivismIcon,
        count: '5,000',
      },
      {
        title: 'Food Rescued',
        IconComponent: ShoppingCartIcon,
        count: '2,000',
        unit: 'kg',
      },
    ];
  
    return (
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 3, sm: 4, md: 6 },
          backgroundColor: '#f9fafb',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(5, 150, 105, 0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(5, 150, 105, 0.07)',
            zIndex: 0,
          }}
        />
  
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 28, sm: 32, md: 36 },
              color: '#111827',
              textAlign: { xs: 'left', md: 'center' },
              mb: { xs: 3, md: 5 },
            }}
          >
            Our Impact
          </Typography>
          
          <Typography
            sx={{
              fontSize: { xs: 16, sm: 18 },
              color: '#4B5563',
              textAlign: { xs: 'left', md: 'center' },
              mb: { xs: 4, md: 6 },
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Together we're making a difference in reducing food waste and fighting hunger in Sri Lanka
          </Typography>
  
          <Grid container spacing={3}>
            {displayedInsights.map((insight, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <InsightTile
                  title={insight.title}
                  IconComponent={insight.IconComponent}
                  count={insight.count}
                  unit={insight.unit}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default Insights;