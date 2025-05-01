import React, { useState } from 'react';
import { 
    Box, TextField, MenuItem, Select, Typography, Grid, Card, 
    CardContent, Avatar, Chip, Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, Alert, Divider, IconButton, Snackbar
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PersonIcon from '@mui/icons-material/Person';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

const AvailableDonations = () => {
    // State variables
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [requestQuantity, setRequestQuantity] = useState('');
    const [requestNotes, setRequestNotes] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [requestError, setRequestError] = useState('');

    // Filtered donations based on search and filters
    const filteredDonations = donationsCards.filter(donation => {
        const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = category === '' || donation.category.toLowerCase() === category.toLowerCase();
        
        return matchesSearch && matchesCategory;
    });

    // Sort donations based on selected sort option
    const sortedDonations = [...filteredDonations].sort((a, b) => {
        if (sort === 'newest') {
            return new Date(b.postDate) - new Date(a.postDate);
        } else if (sort === 'oldest') {
            return new Date(a.postDate) - new Date(b.postDate);
        } else if (sort === 'urgent') {
            return new Date(a.expiryDate) - new Date(b.expiryDate);
        }
        return 0;
    });

    // Handle opening the request dialog
    const handleRequestOpen = (donation) => {
        setSelectedDonation(donation);
        setRequestQuantity('');
        setRequestNotes('');
        setRequestError('');
        setOpenDialog(true);
    };

    // Handle closing the request dialog
    const handleRequestClose = () => {
        setOpenDialog(false);
    };

    // Handle submitting a request
    const handleRequestSubmit = () => {
        if (!requestQuantity.trim()) {
            setRequestError('Please specify the quantity you need');
            return;
        }

        // In a real app, this would call an API to send the request
        setSnackbarMessage(`Request for ${selectedDonation.title} has been sent to ${selectedDonation.name}`);
        setSnackbarOpen(true);
        setOpenDialog(false);

        // Update the donation to show requested status (this is just for demo, in real app would be handled via API)
        // This would typically be managed by the API and state management
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate days until expiry
    const getDaysUntilExpiry = (expiryDateString) => {
        const expiryDate = new Date(expiryDateString);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Render urgency badge based on expiry date
    const renderUrgencyBadge = (expiryDate) => {
        const daysLeft = getDaysUntilExpiry(expiryDate);
        
        if (daysLeft <= 1) {
            return (
                <Chip 
                    label="Urgent" 
                    size="small"
                    sx={{ 
                        bgcolor: '#FEE2E2', 
                        color: '#DC2626',
                        fontWeight: 'bold',
                        borderRadius: '4px'
                    }}
                />
            );
        } else if (daysLeft <= 3) {
            return (
                <Chip 
                    label="Soon Expiring" 
                    size="small"
                    sx={{ 
                        bgcolor: '#FEF3C7', 
                        color: '#D97706',
                        fontWeight: 'bold',
                        borderRadius: '4px'
                    }}
                />
            );
        }
        return null;
    };

    return (
        <Box
            sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 4,
                borderRadius: 2,
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography sx={{
                    fontSize: { xs: 24, md: 28 },
                    fontWeight: 700,
                    color: '#059669',
                    mb: 1,
                }}>
                    Available Donations
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                    mb: 2,
                }}>
                    Find and request available food donations from generous donors in your community
                </Typography>
                <Divider />
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    bgcolor: '#FFFFFF',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
            >
                <TextField
                    id="search-donations"
                    placeholder="Search by title, donor, or category..."
                    variant="outlined"
                    fullWidth
                    size='small'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ color: '#9CA3AF', mr: 1 }} />,
                    }}
                />
                <Box sx={{ display: 'flex', gap: 2, minWidth: { xs: '100%', md: '400px' } }}>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        size='small'
                        fullWidth
                        startAdornment={<FilterAltIcon sx={{ color: '#9CA3AF', mr: 1 }} />}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value="Meal packs">Meal Packs</MenuItem>
                        <MenuItem value="Food items">Food Items</MenuItem>
                        <MenuItem value="Groceries">Groceries</MenuItem>
                        <MenuItem value="Fruits">Fruits</MenuItem>
                        <MenuItem value="Vegetables">Vegetables</MenuItem>
                    </Select>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        displayEmpty
                        size='small'
                        fullWidth
                        startAdornment={<SortIcon sx={{ color: '#9CA3AF', mr: 1 }} />}
                    >
                        <MenuItem value="">Sort By</MenuItem>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                        <MenuItem value="urgent">Most Urgent</MenuItem>
                    </Select>
                </Box>
            </Box>

            {sortedDonations.length === 0 ? (
                <Box sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    bgcolor: '#f9fafb', 
                    borderRadius: 2,
                    mt: 2
                }}>
                    <Typography variant="h6" color="textSecondary">
                        No donations found matching your criteria.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3} mt={2}>
                    {sortedDonations.map((donation, index) => (
                        <Grid item key={index} xs={12} sm={6} lg={4}>
                            <Card sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                borderRadius: 2,
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                                },
                                position: 'relative',
                                overflow: 'hidden',
                                borderTop: `4px solid ${
                                    getDaysUntilExpiry(donation.expiryDate) <= 1 ? '#DC2626' : 
                                    getDaysUntilExpiry(donation.expiryDate) <= 3 ? '#D97706' : 
                                    '#059669'
                                }`,
                            }}>
                                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'flex-start' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Avatar sx={{ bgcolor: '#059669', mr: 2 }}>
                                                <FastfoodIcon />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                                    {donation.title}
                                                </Typography>
                                                <Chip 
                                                    label={donation.category} 
                                                    size="small"
                                                    sx={{ 
                                                        bgcolor: '#E6FFFA', 
                                                        color: '#059669',
                                                        mt: 0.5,
                                                        fontWeight: 500,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        {renderUrgencyBadge(donation.expiryDate)}
                                    </Box>

                                    <Divider sx={{ my: 1.5 }} />

                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <RestaurantIcon sx={{ color: '#059669', mr: 1, fontSize: '1rem' }} />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Quantity: {donation.quantity}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <PersonIcon sx={{ color: '#059669', mr: 1, fontSize: '1rem' }} />
                                            <Typography variant="body2">
                                                Donor: {donation.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                            <LocationOnIcon sx={{ color: '#059669', mr: 1, fontSize: '1rem' }} />
                                            <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
                                                {donation.address}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CalendarTodayIcon sx={{ 
                                                color: getDaysUntilExpiry(donation.expiryDate) <= 1 ? '#DC2626' : 
                                                       getDaysUntilExpiry(donation.expiryDate) <= 3 ? '#D97706' : 
                                                       '#059669', 
                                                mr: 1, 
                                                fontSize: '1rem' 
                                            }} />
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    fontWeight: 500,
                                                    color: getDaysUntilExpiry(donation.expiryDate) <= 1 ? '#DC2626' : 
                                                           getDaysUntilExpiry(donation.expiryDate) <= 3 ? '#D97706' : 
                                                           'inherit'
                                                }}
                                            >
                                                Expires: {formatDate(donation.expiryDate)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 'auto', pt: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<VolunteerActivismIcon />}
                                            onClick={() => handleRequestOpen(donation)}
                                            sx={{
                                                bgcolor: '#059669',
                                                '&:hover': {
                                                    bgcolor: '#047857',
                                                },
                                                py: 1,
                                                fontWeight: 500
                                            }}
                                        >
                                            Request Donation
                                        </Button>
                                    </Box>

                                    {donation.requested && (
                                        <Chip 
                                            label="REQUESTED" 
                                            sx={{ 
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                bgcolor: '#0284c710',
                                                color: '#0284c7',
                                                fontWeight: 600,
                                                border: '1px solid #0284c7'
                                            }}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Request Dialog */}
            <Dialog open={openDialog} onClose={handleRequestClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#F0FFF4', color: '#047857', fontWeight: 600 }}>
                    Request Donation
                </DialogTitle>
                <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
                    {selectedDonation && (
                        <>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                {selectedDonation.title}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
                                    <Typography variant="body2">
                                        {selectedDonation.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccessTimeIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
                                    <Typography variant="body2">
                                        Available: {selectedDonation.quantity}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarTodayIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
                                    <Typography variant="body2">
                                        Expires: {formatDate(selectedDonation.expiryDate)}
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <TextField
                                autoFocus
                                margin="dense"
                                label="How much do you need?"
                                fullWidth
                                variant="outlined"
                                value={requestQuantity}
                                onChange={(e) => setRequestQuantity(e.target.value)}
                                error={!!requestError}
                                helperText={requestError}
                                placeholder={`Example: 2kg, 3 meals, etc. (Available: ${selectedDonation.quantity})`}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                margin="dense"
                                label="Additional Notes (Optional)"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={3}
                                value={requestNotes}
                                onChange={(e) => setRequestNotes(e.target.value)}
                                placeholder="Add any specific requirements or arrangements for pickup"
                                sx={{ mb: 2 }}
                            />
                            
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Your request will be sent to the donor. They will review your request and contact you with pickup details.
                            </Alert>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleRequestClose} color="inherit">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleRequestSubmit}
                        variant="contained"
                        sx={{
                            bgcolor: '#059669',
                            '&:hover': {
                                bgcolor: '#047857',
                            }
                        }}
                    >
                        Send Request
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AvailableDonations;

// Enhanced mock data with more details relevant for recipients
const donationsCards = [
    {
        category: 'Meal packs',
        title: 'Chicken Fried rice',
        name: 'Hansana - Shanghai Terrace',
        quantity: '25 meals',
        expiryDate: '2025-03-15',
        postDate: '2025-02-25',
        address: '251/1 Kaduwela Road, Battaramulla',
        description: 'Freshly made chicken fried rice, suitable for immediate consumption.',
        contactNumber: '+94771234567',
        requested: false,
    },
    {
        category: 'Food items',
        title: 'Mixed Vegetables',
        name: 'Upul - Upul Traders',
        quantity: '20 kg',
        expiryDate: '2025-03-12',
        postDate: '2025-03-01',
        address: '251/1 Dematagoda Road, Dematagoda',
        description: 'Fresh mixed vegetables including carrots, beans, and potatoes.',
        contactNumber: '+94777654321',
        requested: false,
    },
    {
        category: 'Food Items',
        title: 'Yoghurt Cups',
        name: 'Harsha',
        quantity: '100 cups',
        expiryDate: '2025-03-14',
        postDate: '2025-02-28',
        address: '251 Dewman Palace, Battaramulla',
        description: 'Individual yoghurt cups, various flavors.',
        contactNumber: '+94712345678',
        requested: false,
    },
    {
        category: 'Groceries',
        title: 'Rice and Lentils',
        name: 'Food Supply Co.',
        quantity: '50 kg rice, 10 kg lentils',
        expiryDate: '2025-06-20',
        postDate: '2025-02-15',
        address: '45 Main Street, Colombo 03',
        description: 'Bulk rice and lentils for community kitchens.',
        contactNumber: '+94765432109',
        requested: true,
    },
    {
        category: 'Fruits',
        title: 'Fresh Bananas',
        name: 'Green Farms',
        quantity: '15 kg',
        expiryDate: '2025-03-10',
        postDate: '2025-03-05',
        address: '78 Fruit Market, Kandy',
        description: 'Fresh bananas, perfect for immediate distribution.',
        contactNumber: '+94701234567',
        requested: false,
    },
    {
        category: 'Vegetables',
        title: 'Organic Carrots',
        name: 'Organic Farms',
        quantity: '8 kg',
        expiryDate: '2025-03-20',
        postDate: '2025-03-02',
        address: '16 Green Lane, Gampaha',
        description: 'Organic carrots freshly harvested.',
        contactNumber: '+94723456789',
        requested: false,
    }
];
