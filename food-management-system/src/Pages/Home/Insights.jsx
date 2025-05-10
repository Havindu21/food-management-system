import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { globalMt, globalPx } from '../../Theme/Theme';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaIcon from '@mui/icons-material/Spa';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import InsightTile from '../../Components/InsightTile';

const Insights = () => {
    const [insightsData, setInsightsData] = useState({
      mealsSaved: { title: 'Meals Saved', count: '0' },
      peopleFed: { title: 'People Fed', count: '0' },
      co2EmissionsPrevented: { title: 'CO2 Emissions Prevented', count: '0', unit: 'tons' },
      totalDonors: { title: 'Total Donors', count: '0' },
      volunteersEngaged: { title: 'Volunteers Engaged', count: '0' },
      foodRescued: { title: 'Food Rescued', count: '0', unit: 'kg' }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchInsights = async () => {
        try {
          const response = await fetch('http://localhost:5001/api/insights');
          const result = await response.json();
          
          if (result.success) {
            setInsightsData(result.data);
          }
        } catch (error) {
          console.error('Error fetching insights data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchInsights();
    }, []);

    // Map insights data to components with appropriate icons
    const displayedInsights = [
      {
        title: insightsData.mealsSaved.title,
        IconComponent: RestaurantIcon,
        count: insightsData.mealsSaved.count,
      },
      {
        title: insightsData.peopleFed.title,
        IconComponent: GroupsIcon,
        count: insightsData.peopleFed.count,
      },
      {
        title: insightsData.co2EmissionsPrevented.title,
        IconComponent: SpaIcon,
        count: insightsData.co2EmissionsPrevented.count,
        unit: insightsData.co2EmissionsPrevented.unit,
      },
      {
        title: insightsData.totalDonors.title,
        IconComponent: CardMembershipIcon,
        count: insightsData.totalDonors.count,
      },
      {
        title: insightsData.volunteersEngaged.title,
        IconComponent: VolunteerActivismIcon,
        count: insightsData.volunteersEngaged.count,
      },
      {
        title: insightsData.foodRescued.title,
        IconComponent: ShoppingCartIcon,
        count: insightsData.foodRescued.count,
        unit: insightsData.foodRescued.unit,
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
            {!loading && displayedInsights.map((insight, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <InsightTile
                  title={insight.title}
                  IconComponent={insight.IconComponent}
                  count={insight.count}
                  unit={insight.unit}
                />
              </Grid>
            ))}
            {loading && <Typography>Loading impact data...</Typography>}
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default Insights;