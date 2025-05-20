import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Divider, Card, CardContent, Chip, Grid,
    Avatar, Button, Tab, Tabs, CircularProgress, Stack, Tooltip, Alert,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
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
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import donationService from '../../Services/donationService';

const ActiveDonations = () => {
    const [tabValue, setTabValue] = useState(0);
    const [myDonations, setMyDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: '',
        message: '',
        action: null,
        itemId: null
    });

    useEffect(() => {
        fetchActiveItems();
    }, []);

    const fetchActiveItems = async () => {
        try {
            setLoading(true);
            const response = await donationService.getUserActiveItems();
            if (response.success) {
                const donations = response.data.donations || [];
                const contributions = response.data.contributions || [];
                setMyDonations([...donations, ...contributions]);
            } else {
                throw new Error('Failed to fetch active items');
            }
        } catch (err) {
            console.error('Error fetching active items:', err);
            setError('Failed to load your active donations and contributions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCancelDonation = async (id) => {
        setConfirmDialog({
            open: true,
            title: 'Cancel Donation',
            message: 'Are you sure you want to cancel this donation? This action cannot be undone.',
            action: async () => {
                try {
                    setActionLoading(true);
                    const response = await donationService.cancelDonation(id);
                    if (response.success) {
                        setSuccessMessage('Donation canceled successfully');
                        await fetchActiveItems();
                    } else {
                        setError('Failed to cancel donation');
                    }
                } catch (err) {
                    console.error('Error canceling donation:', err);
                    setError('An error occurred while canceling the donation');
                } finally {
                    setActionLoading(false);
                }
            },
            itemId: id
        });
    };

    const handleFulfillDonation = async (id) => {
        setConfirmDialog({
            open: true,
            title: 'Fulfill Donation',
            message: 'Mark this donation as fulfilled? This confirms that the recipient has received the donation.',
            action: async () => {
                try {
                    setActionLoading(true);
                    const response = await donationService.fulfillDonation(id);
                    if (response.success) {
                        setSuccessMessage('Donation marked as fulfilled');
                        await fetchActiveItems();
                    } else {
                        setError('Failed to fulfill donation');
                    }
                } catch (err) {
                    console.error('Error fulfilling donation:', err);
                    setError('An error occurred while fulfilling the donation');
                } finally {
                    setActionLoading(false);
                }
            },
            itemId: id
        });
    };

    const handleCancelContribution = async (id) => {
        setConfirmDialog({
            open: true,
            title: 'Cancel Contribution',
            message: 'Are you sure you want to cancel this contribution? This action cannot be undone.',
            action: async () => {
                try {
                    setActionLoading(true);
                    const response = await donationService.cancelContribution(id);
                    if (response.success) {
                        setSuccessMessage('Contribution canceled successfully');
                        await fetchActiveItems();
                    } else {
                        setError('Failed to cancel contribution');
                    }
                } catch (err) {
                    console.error('Error canceling contribution:', err);
                    setError('An error occurred while canceling the contribution');
                } finally {
                    setActionLoading(false);
                }
            },
            itemId: id
        });
    };

    const handleConfirmAction = async () => {
        closeConfirmDialog();
        if (confirmDialog.action) {
            await confirmDialog.action();
        }
    };

    const closeConfirmDialog = () => {
        setConfirmDialog(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const renderStatusChip = (status) => {
        let color, icon;

        switch (status) {
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

    const renderDonationCard = (donation) => {
        const isDonation = donation.type === 'donation';
        const canCancel = isDonation ?
            ['pending', 'confirmed'].includes(donation.status) :
            ['pending'].includes(donation.status);
        const canFulfill = isDonation && donation.status === 'not picked up';

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
                            {donation.location && <LocationOnIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />}
                            <Typography variant="body2">
                                {donation.location}
                            </Typography>
                        </Box>
                        {isDonation && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ color: '#ef4444', mr: 1 }} fontSize="small" />
                                <Typography variant="body2" color="error.main">
                                    Expires: {formatDateV2(donation.expiryDate)} at {donation.expiryTime}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={() => isDonation ? handleCancelDonation(donation.id) : handleCancelContribution(donation.id)}
                            disabled={actionLoading}
                        >
                            Cancel {isDonation ? 'Donation' : 'Contribution'}
                        </Button>
                        {canFulfill && (
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<DoneAllIcon />}
                                onClick={() => handleFulfillDonation(donation.id)}
                                disabled={actionLoading}
                            >
                                Mark as Fulfilled
                            </Button>
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

    const formatDateV2 = (dateString) => {
        // Handle dates in format DD-MM-YYYY
        if (!dateString) return '';
        
        const [day, month, year] = dateString.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        
        if (isNaN(date.getTime())) {
            // Return the original string if parsing fails
            return dateString;
        }
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
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

            {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {successMessage}
                </Alert>
            )}

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

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            ) : (
                <>
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
                </>
            )}

            <Dialog
                open={confirmDialog.open}
                onClose={closeConfirmDialog}
            >
                <DialogTitle>{confirmDialog.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {confirmDialog.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialog} disabled={actionLoading}>Cancel</Button>
                    <Button
                        onClick={handleConfirmAction}
                        color={confirmDialog.title.includes('Cancel') ? 'error' : 'primary'}
                        variant="contained"
                        disabled={actionLoading}
                        autoFocus
                    >
                        {actionLoading ? <CircularProgress size={24} /> : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ActiveDonations;
