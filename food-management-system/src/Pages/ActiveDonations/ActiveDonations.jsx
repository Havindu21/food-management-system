import React, { useState } from 'react';
import {
    Box, Typography, Divider, Card, CardContent, Chip, Grid,
    Avatar, Button, Tab, Tabs, CircularProgress, Stack, Tooltip
} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const ActiveDonations = () => {
    const [tabValue, setTabValue] = useState(0);

    // Mock data - in a real app this would come from an API
    const myDonations = [
        {
            id: 1,
            type: 'donation',
            title: 'Lunch Meal Pack',
            foodItems: [
                { name: 'Rice', quantity: '2kg' },
                { name: 'Chicken Curry', quantity: '1kg' },
                { name: 'Vegetable Curry', quantity: '500g' }
            ],
            recipient: 'Community Center',
            recipientPhone: '+94771234567',
            location: 'Colombo 05, Sri Lanka',
            donationDate: '2023-10-25',
            expiryDate: '2023-10-26',
            expiryTime: '14:00',
            status: 'confirmed',
            pickupSlot: '12:00 - 13:00'
        },
        {
            id: 2,
            type: 'donation',
            title: 'Breakfast Items',
            foodItems: [
                { name: 'Bread', quantity: '10 loaves' },
                { name: 'Eggs', quantity: '20 pieces' },
                { name: 'Milk', quantity: '5 liters' }
            ],
            recipient: 'Happy Kids Foundation',
            recipientPhone: '+94777654321',
            location: 'Kandy, Sri Lanka',
            donationDate: '2023-10-26',
            expiryDate: '2023-10-27',
            expiryTime: '08:00',
            status: 'pending',
            pickupSlot: 'Not set'
        },
        {
            id: 3,
            type: 'contribution',
            title: 'Weekly Meals for Community Center',
            foodItems: [
                { name: 'Rice', quantity: '5kg', requestedQuantity: '20kg' }
            ],
            requester: 'Community Welfare Center',
            requesterPhone: '+94771234567',
            location: 'Colombo 07, Sri Lanka',
            contributionDate: '2023-10-23',
            status: 'approved',
            pickupDate: '2023-10-28',
            pickupSlot: '10:00 - 11:00'
        },
        {
            id: 4,
            type: 'contribution',
            title: 'School Lunch Program',
            foodItems: [
                { name: 'Sandwiches', quantity: '30 pcs', requestedQuantity: '100 pcs' }
            ],
            requester: 'Happy Kids Foundation',
            requesterPhone: '+94777654321',
            location: 'Galle, Sri Lanka',
            contributionDate: '2023-10-24',
            status: 'not picked up',
            pickupDate: '2023-10-27',
            pickupSlot: '11:30 - 12:30'
        }
    ];

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Function to render the status chip with appropriate color
    const renderStatusChip = (status) => {
        let color, icon;
        
        switch(status) {
            case 'confirmed':
                color = '#059669';
                icon = <CheckCircleIcon fontSize="small" />;
                break;
            case 'approved':
                color = '#059669';
                icon = <CheckCircleIcon fontSize="small" />;
                break;
            case 'not picked up':
                color = '#0284c7';
                icon = <LocalShippingIcon fontSize="small" />;
                break;
            case 'pending':
                color = '#d97706';
                icon = <PendingIcon fontSize="small" />;
                break;
            default:
                color = '#6b7280';
                icon = <PendingIcon fontSize="small" />;
        }
        
        return (
            <Chip 
                icon={icon}
                label={status.toUpperCase()}
                sx={{ 
                    bgcolor: `${color}10`, 
                    color: color,
                    fontWeight: 600,
                    border: `1px solid ${color}`
                }}
            />
        );
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
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                    },
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
                                label={isDonation ? `Donated: ${formatDate(donation.donationDate)}` : `Contributed: ${formatDate(donation.contributionDate)}`}
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
                                        {donation.type === 'contribution' && (
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
                                {isDonation ? `Recipient: ${donation.recipient}` : `Requester: ${donation.requester}`}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
                            <Typography variant="body2">
                                {isDonation ? donation.recipientPhone : donation.requesterPhone}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
                            <Typography variant="body2">
                                {donation.location}
                            </Typography>
                        </Box>
                        {isDonation && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ color: '#ef4444', mr: 1 }} fontSize="small" />
                                <Typography variant="body2" color="error.main">
                                    Expires: {formatDate(donation.expiryDate)} at {donation.expiryTime}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        );
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
                    Active Donations
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                    mb: 2,
                }}>
                    Manage your current donations and contributions that are in progress
                </Typography>
                <Divider sx={{ mb: 4 }} />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            py: 1.5,
                        },
                        '& .Mui-selected': {
                            color: '#059669 !important',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#059669',
                        }
                    }}
                >
                    <Tab label="All Donations" />
                    <Tab label="My Donations" />
                    <Tab label="My Contributions" />
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <Box>
                    {myDonations.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f9fafb', borderRadius: 2 }}>
                            <Typography variant="h6" color="textSecondary">
                                No active donations found.
                            </Typography>
                        </Box>
                    ) : (
                        myDonations.map(donation => renderDonationCard(donation))
                    )}
                </Box>
            )}

            {tabValue === 1 && (
                <Box>
                    {myDonations.filter(d => d.type === 'donation').length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f9fafb', borderRadius: 2 }}>
                            <Typography variant="h6" color="textSecondary">
                                You don't have any active donations.
                            </Typography>
                        </Box>
                    ) : (
                        myDonations.filter(d => d.type === 'donation').map(donation => renderDonationCard(donation))
                    )}
                </Box>
            )}

            {tabValue === 2 && (
                <Box>
                    {myDonations.filter(d => d.type === 'contribution').length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f9fafb', borderRadius: 2 }}>
                            <Typography variant="h6" color="textSecondary">
                                You don't have any active contributions.
                            </Typography>
                        </Box>
                    ) : (
                        myDonations.filter(d => d.type === 'contribution').map(donation => renderDonationCard(donation))
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ActiveDonations;
