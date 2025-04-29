import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaIcon from '@mui/icons-material/Spa';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Updated InsightTile component
const InsightTile = ({ title, IconComponent, count, unit }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Parse the count properly (removing commas)
  const parsedCount = parseInt(count.replace(/,/g, ''));

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'white',
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        height: '100%',
        minHeight: { xs: 180, md: 220 },
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {/* Decorative circle in the background */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(5, 150, 105, 0.07)',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'rgba(5, 150, 105, 0.1)',
          borderRadius: '50%',
          p: 1.5,
          mb: 2,
          zIndex: 1,
        }}
      >
        <IconComponent
          sx={{
            fontSize: { xs: 30, md: 40 },
            color: '#059669',
          }}
        />
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: 26, sm: 28, md: 32 },
          color: '#111827',
          textAlign: 'center',
          mb: 1,
          zIndex: 1,
        }}
      >
        {inView ? (
          <CountUp
            start={0}
            end={parsedCount}
            duration={parsedCount > 9999 ? 2.5 : 1.5}
            separator=","
          />
        ) : (
          '0'
        )}
        {unit && <Box component="span" sx={{ ml: 0.5 }}>{unit}</Box>}
      </Typography>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: { xs: 14, sm: 16, md: 18 },
          color: '#4B5563',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default InsightTile;