import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Divider, Card, CardContent, Chip, 
  Grid, Avatar, Button, Stack, Tooltip, IconButton,
  CircularProgress
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
import donationService from '../../Services/donationService';

const DonationHistory = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donation and contribution history when component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // Fetch both donation and contribution histories
        const [donationResponse, contributionResponse] = await Promise.all([
          donationService.getDonationHistory(),
          donationService.getContributionHistory()
        ]);

        // Format donation data for display
        const formattedDonations = donationResponse.data.map(donation => ({
          id: donation.id,
          type: 'donation',
          title: donation.foodItems[0]?.name || 'Food Donation', // Use first food item name as title
          date: donation.donatedAt,
          recipient: donation.recipient ? donation.recipient.name : 'Unknown',
          location: donation.location,
          status: donation.status,
          foodItems: donation.foodItems.map(item => ({
            name: item.name,
            quantity: item.quantity
          })),
          pickupDate: donation.completedAt,
          pickupTime: '(Time not specified)'
        }));

        // Format contribution data for display
        const formattedContributions = contributionResponse.data.map(contribution => ({
          id: contribution.id,
          type: 'contribution',
          title: contribution.title,
          date: contribution.contributedAt,
          recipient: contribution.recipient ? contribution.recipient.name : 'Unknown',
          location: 'Location not specified',
          status: contribution.status,
          foodItems: contribution.foodItems.map(item => ({
            name: item.name,
            quantity: item.quantityOffered,
            requestedQuantity: item.quantityRequested
          })),
          pickupDate: contribution.completedAt,
          pickupTime: '(Time not specified)',
          reason: contribution.message
        }));

        // Combine both histories and sort by date (newest first)
        const combinedHistory = [...formattedDonations, ...formattedContributions]
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setDonationHistory(combinedHistory);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load donation history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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
            <Box sx={{ display: 'none', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                {donation.location}
              </Typography>
            </Box>
          </Box>

          {donation.status === 'completed' && (
            <Box sx={{ 
              display: 'none', 
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#fef2f2', borderRadius: 2, color: '#dc2626' }}>
            <Typography variant="h6">{error}</Typography>
          </Box>
        ) : donationHistory.length === 0 ? (
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
