import React, { useState } from 'react';
import {
  Box, Typography, Divider, Card, CardContent, Chip, 
  Grid, Avatar, Button, Stack, Tooltip, IconButton
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InfoIcon from '@mui/icons-material/Info';

const DonationHistory = () => {
  // Mock data for donation history
  const donationHistory = [
    {
      id: 1,
      type: 'donation',
      title: 'Lunch Meal Packs',
      date: '2023-10-15',
      recipient: 'Api Foundation',
      location: 'Shantha Villa, 588 10th Mile Post Rd, Malabe',
      status: 'completed',
      foodItems: [
        { name: 'Rice', quantity: '10kg' },
        { name: 'Chicken Curry', quantity: '5kg' },
        { name: 'Vegetable Curry', quantity: '3kg' }
      ],
      pickupDate: '2023-10-16',
      pickupTime: '11:30 - 12:30'
    },
    {
      id: 2,
      type: 'contribution',
      title: 'Weekly Meals for Community Center',
      date: '2023-10-10',
      recipient: 'Caritas Sri Lanka',
      location: '133 Kynsey Road, Colombo 08',
      status: 'expired',
      foodItems: [
        { name: 'Rice', quantity: '5kg', requestedQuantity: '20kg' }
      ],
      pickupDate: '2023-10-12',
      pickupTime: '09:00 - 10:00',
      reason: 'Food not picked up within the scheduled time'
    },
    {
      id: 3,
      type: 'contribution',
      title: 'School Lunch Program',
      date: '2023-09-28',
      recipient: 'Happy Kids Foundation',
      location: '45 Main Street, Kandy',
      status: 'completed',
      foodItems: [
        { name: 'Bread', quantity: '20 loaves', requestedQuantity: '100 loaves' },
        { name: 'Jam', quantity: '10 jars', requestedQuantity: '30 jars' }
      ],
      pickupDate: '2023-09-30',
      pickupTime: '08:30 - 09:30'
    },
    {
      id: 4,
      type: 'donation',
      title: 'Fresh Vegetables',
      date: '2023-09-15',
      recipient: 'Local Soup Kitchen',
      location: '22 Temple Road, Galle',
      status: 'completed',
      foodItems: [
        { name: 'Carrots', quantity: '5kg' },
        { name: 'Potatoes', quantity: '10kg' },
        { name: 'Beans', quantity: '3kg' },
        { name: 'Cabbage', quantity: '4kg' }
      ],
      pickupDate: '2023-09-17',
      pickupTime: '13:00 - 14:00'
    },
    {
      id: 5,
      type: 'donation',
      title: 'Canned Food Items',
      date: '2023-09-05',
      recipient: 'Elderly Care Home',
      location: '78 Lake Drive, Negombo',
      status: 'cancelled',
      foodItems: [
        { name: 'Canned Beans', quantity: '24 cans' },
        { name: 'Canned Fish', quantity: '36 cans' },
        { name: 'Canned Fruits', quantity: '18 cans' }
      ],
      reason: 'Donor canceled due to quality concerns'
    }
  ];

  // Function to render status chip with appropriate color
  const renderStatusChip = (status) => {
    let color, icon, label;
    
    switch(status) {
      case 'completed':
        color = '#059669';
        icon = <CheckCircleIcon fontSize="small" />;
        label = 'COMPLETED';
        break;
      case 'expired':
        color = '#dc2626';
        icon = <HourglassEmptyIcon fontSize="small" />;
        label = 'EXPIRED';
        break;
      case 'cancelled':
        color = '#9ca3af';
        icon = <CancelIcon fontSize="small" />;
        label = 'CANCELLED';
        break;
      default:
        color = '#6b7280';
        icon = <HourglassEmptyIcon fontSize="small" />;
        label = status.toUpperCase();
    }
    
    return (
      <Chip 
        icon={icon}
        label={label}
        sx={{ 
          bgcolor: `${color}10`, 
          color: color,
          fontWeight: 600,
          border: `1px solid ${color}`
        }}
      />
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render donation cards
  const renderDonationCard = (donation) => {
    const isDonation = donation.type === 'donation';
    
    return (
      <Card
        key={donation.id}
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          opacity: donation.status === 'cancelled' || donation.status === 'expired' ? 0.8 : 1,
          borderLeft: `5px solid ${isDonation ? '#059669' : '#0284c7'}`
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: isDonation ? '#059669' : '#0284c7', mr: 1.5 }}>
                  {isDonation ? <FastfoodIcon /> : <VolunteerActivismIcon />}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {donation.title}
                </Typography>
              </Box>
              <Chip 
                icon={isDonation ? <FastfoodIcon fontSize="small" /> : <VolunteerActivismIcon fontSize="small" />} 
                label={isDonation ? "Donation" : "Contribution"}
                size="small"
                sx={{ 
                  mb: 1,
                  bgcolor: isDonation ? '#f0fdf4' : '#e0f2fe', 
                  color: isDonation ? '#059669' : '#0284c7',
                  mr: 1
                }}
              />
              <Chip 
                icon={<CalendarTodayIcon fontSize="small" />}
                label={`Date: ${formatDate(donation.date)}`}
                size="small"
                sx={{ mb: 1, bgcolor: '#f3f4f6', color: '#4b5563' }}
              />
            </Box>
            {renderStatusChip(donation.status)}
          </Box>

          <Divider sx={{ my: 2 }} />
          
          <Typography sx={{ fontWeight: 600, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon sx={{ color: '#059669' }} fontSize="small" />
            Food Items
          </Typography>
          
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {donation.foodItems.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.quantity}
                      </Typography>
                    </Box>
                    {donation.type === 'contribution' && item.requestedQuantity && (
                      <Tooltip title="Requested quantity">
                        <Chip 
                          label={item.requestedQuantity} 
                          size="small"
                          sx={{ bgcolor: '#e0f2fe', color: '#0284c7' }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                Recipient: {donation.recipient}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                {donation.location}
              </Typography>
            </Box>
          </Box>

          {donation.status === 'completed' && (
            <Box sx={{ 
              display: 'flex', 
              p: 1.5, 
              bgcolor: '#f0fdf4', 
              borderRadius: 1,
              alignItems: 'center',
              mb: 2
            }}>
              <CheckCircleIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="#059669">
                Picked up on {formatDate(donation.pickupDate)} between {donation.pickupTime}
              </Typography>
            </Box>
          )}

          {(donation.status === 'cancelled' || donation.status === 'expired') && donation.reason && (
            <Box sx={{ 
              display: 'flex', 
              p: 1.5, 
              bgcolor: '#fef2f2', 
              borderRadius: 1,
              alignItems: 'center'
            }}>
              <InfoIcon sx={{ color: '#dc2626', mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="#dc2626">
                {donation.reason}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontSize: { xs: 24, md: 28 },
          fontWeight: 700,
          color: '#059669',
          mb: 1,
        }}>
          Donation History
        </Typography>
        <Typography sx={{
          fontSize: { xs: 14, md: 16 },
          color: '#686D76',
          mb: 2,
        }}>
          Review your past donations and contributions
        </Typography>
        <Divider sx={{ mb: 4 }} />
      </Box>

      <Box>
        {donationHistory.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f9fafb', borderRadius: 2 }}>
            <Typography variant="h6" color="textSecondary">
              No donation history found.
            </Typography>
          </Box>
        ) : (
          donationHistory.map(donation => renderDonationCard(donation))
        )}
      </Box>
    </Box>
  );
};

export default DonationHistory;
