import React, { useState } from 'react';
import { 
    Box, TextField, MenuItem, Select, Typography, Grid, Card, 
    CardContent, Avatar, Chip, Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, Alert, Divider, IconButton, Snackbar,
    Tabs, Tab, Paper
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

// TabPanel component to handle tab content
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

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
    const [activeTab, setActiveTab] = useState(0);
    
    // Dialogs for contribution actions
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openIgnoreDialog, setOpenIgnoreDialog] = useState(false);
    const [selectedContribution, setSelectedContribution] = useState(null);
    
    // State for my contributions
    const [myContributions, setMyContributions] = useState(contributionsToMyRequests);

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

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

    // Handle opening confirm contribution dialog
    const handleConfirmOpen = (contribution) => {
        setSelectedContribution(contribution);
        setOpenConfirmDialog(true);
    };

    // Handle opening ignore contribution dialog
    const handleIgnoreOpen = (contribution) => {
        setSelectedContribution(contribution);
        setOpenIgnoreDialog(true);
    };

    // Handle confirming a contribution
    const handleConfirmContribution = () => {
        // In a real app, this would call an API to update the contribution status
        const updatedContributions = myContributions.map(contribution => {
            if (contribution.id === selectedContribution.id) {
                return { ...contribution, status: 'confirmed' };
            }
            return contribution;
        });
        
        setMyContributions(updatedContributions);
        setSnackbarMessage(`Contribution from ${selectedContribution.donorName} has been confirmed!`);
        setSnackbarOpen(true);
        setOpenConfirmDialog(false);
    };

    // Handle ignoring a contribution
    const handleIgnoreContribution = () => {
        // In a real app, this would call an API to update the contribution status
        const updatedContributions = myContributions.map(contribution => {
            if (contribution.id === selectedContribution.id) {
                return { ...contribution, status: 'ignored' };
            }
            return contribution;
        });
        
        setMyContributions(updatedContributions);
        setSnackbarMessage(`Contribution from ${selectedContribution.donorName} has been ignored`);
        setSnackbarOpen(true);
        setOpenIgnoreDialog(false);
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
                    Food Management
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                    mb: 2,
                }}>
                    Find available donations and manage contributions to your food requests
                </Typography>
                <Divider />
            </Box>

            {/* Tabs */}
            <Paper sx={{ width: '100%' }}>
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    variant="fullWidth"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#059669',
                        },
                        '& .MuiTab-root.Mui-selected': {
                            color: '#059669',
                            fontWeight: 600,
                        },
                    }}
                >
                    <Tab 
                        icon={<FastfoodIcon />} 
                        iconPosition="start" 
                        label="Available Donations" 
                    />
                    <Tab 
                        icon={<RestaurantMenuIcon />} 
                        iconPosition="start" 
                        label="My Request Contributions" 
                    />
                </Tabs>
            </Paper>
            
            {/* Tab Content - Available Donations */}
            <TabPanel value={activeTab} index={0}>
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
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <PhoneIcon sx={{ color: '#059669', mr: 1, fontSize: '1rem' }} />
                                                <Typography variant="body2">
                                                    {donation.contactNumber}
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
            </TabPanel>
            
            {/* Tab Content - My Request Contributions */}
            <TabPanel value={activeTab} index={1}>
                {myContributions.length === 0 ? (
                    <Box sx={{ 
                        p: 4, 
                        textAlign: 'center', 
                        bgcolor: '#f9fafb', 
                        borderRadius: 2,
                        mt: 2
                    }}>
                        <Typography variant="h6" color="textSecondary">
                            No contributions to your requests yet.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {myContributions.map((contribution) => (
                            <Grid item key={contribution.id} xs={12} md={6} lg={4}>
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
                                        contribution.status === 'confirmed' ? '#10B981' : 
                                        contribution.status === 'ignored' ? '#6B7280' : 
                                        '#3B82F6'
                                    }`,
                                }}>
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'flex-start' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Avatar sx={{ bgcolor: '#3B82F6', mr: 2 }}>
                                                    <RestaurantMenuIcon />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                                        {contribution.foodItemName}
                                                    </Typography>
                                                    <Chip 
                                                        label={contribution.requestTitle} 
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: '#EFF6FF', 
                                                            color: '#3B82F6',
                                                            mt: 0.5,
                                                            fontWeight: 500,
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            {contribution.status === 'pending' ? (
                                                <Chip 
                                                    label="PENDING" 
                                                    size="small"
                                                    sx={{ 
                                                        bgcolor: '#EFF6FF',
                                                        color: '#3B82F6',
                                                        fontWeight: 'bold',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            ) : contribution.status === 'confirmed' ? (
                                                <Chip 
                                                    label="CONFIRMED" 
                                                    size="small"
                                                    sx={{ 
                                                        bgcolor: '#D1FAE5',
                                                        color: '#10B981',
                                                        fontWeight: 'bold',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            ) : (
                                                <Chip 
                                                    label="IGNORED" 
                                                    size="small"
                                                    sx={{ 
                                                        bgcolor: '#F3F4F6',
                                                        color: '#6B7280',
                                                        fontWeight: 'bold',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        <Divider sx={{ my: 1.5 }} />

                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <RestaurantIcon sx={{ color: '#3B82F6', mr: 1, fontSize: '1rem' }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    Contribution: {contribution.contributionAmount}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <PersonIcon sx={{ color: '#3B82F6', mr: 1, fontSize: '1rem' }} />
                                                <Typography variant="body2">
                                                    Donor: {contribution.donorName}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <PhoneIcon sx={{ color: '#3B82F6', mr: 1, fontSize: '1rem' }} />
                                                <Typography variant="body2">
                                                    Contact: {contribution.donorContact}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CalendarTodayIcon sx={{ color: '#3B82F6', mr: 1, fontSize: '1rem' }} />
                                                <Typography variant="body2">
                                                    Date: {formatDate(contribution.dateContributed)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ mt: 'auto', pt: 2 }}>
                                            {contribution.status === 'pending' && (
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        startIcon={<CheckCircleIcon />}
                                                        onClick={() => handleConfirmOpen(contribution)}
                                                        sx={{
                                                            bgcolor: '#10B981',
                                                            '&:hover': {
                                                                bgcolor: '#059669',
                                                            },
                                                            py: 1,
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        startIcon={<CancelIcon />}
                                                        onClick={() => handleIgnoreOpen(contribution)}
                                                        sx={{
                                                            borderColor: '#6B7280',
                                                            color: '#6B7280',
                                                            py: 1,
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        Ignore
                                                    </Button>
                                                </Box>
                                            )}
                                            {contribution.status === 'confirmed' && (
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography sx={{ color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <CheckCircleIcon sx={{ mr: 1 }} /> Contribution confirmed
                                                    </Typography>
                                                </Box>
                                            )}
                                            {contribution.status === 'ignored' && (
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography sx={{ color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <CancelIcon sx={{ mr: 1 }} /> Contribution ignored
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </TabPanel>

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

            {/* Confirm Contribution Dialog */}
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ bgcolor: '#F0FFF4', color: '#047857', fontWeight: 600 }}>
                    Confirm Contribution
                </DialogTitle>
                <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
                    {selectedContribution && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Are you sure you want to confirm this contribution of <strong>{selectedContribution.contributionAmount}</strong> for <strong>{selectedContribution.foodItemName}</strong> from <strong>{selectedContribution.donorName}</strong>?
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: '#4B5563' }}>
                                By confirming, you'll be able to coordinate with the donor for the handover.
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirmContribution}
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        sx={{
                            bgcolor: '#10B981',
                            '&:hover': {
                                bgcolor: '#059669',
                            }
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Ignore Contribution Dialog */}
            <Dialog open={openIgnoreDialog} onClose={() => setOpenIgnoreDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ bgcolor: '#F9FAFB', color: '#4B5563', fontWeight: 600 }}>
                    Ignore Contribution
                </DialogTitle>
                <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
                    {selectedContribution && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Are you sure you want to ignore this contribution of <strong>{selectedContribution.contributionAmount}</strong> from <strong>{selectedContribution.donorName}</strong>?
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: '#4B5563' }}>
                                This action will remove this contribution from your active list.
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenIgnoreDialog(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleIgnoreContribution}
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        sx={{
                            borderColor: '#6B7280',
                            color: '#6B7280',
                        }}
                    >
                        Ignore
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

// Mock data for contributions to user's requests
const contributionsToMyRequests = [
    {
        id: 1,
        requestId: 101,
        requestTitle: 'Weekly Meals for Community Center',
        foodItemName: 'Rice',
        contributionAmount: '10 kg',
        donorName: 'Nimal Food Supply',
        donorContact: '+94771234567',
        dateContributed: '2025-03-05',
        status: 'pending', // can be 'pending', 'confirmed', or 'ignored'
        notes: 'Can deliver to your location on Wednesday afternoon'
    },
    {
        id: 2,
        requestId: 101,
        requestTitle: 'Weekly Meals for Community Center',
        foodItemName: 'Vegetable Curry',
        contributionAmount: '8 portions',
        donorName: 'Gourmet Restaurant',
        donorContact: '+94777654321',
        dateContributed: '2025-03-06',
        status: 'confirmed',
        notes: 'Freshly made vegetable curry'
    },
    {
        id: 3,
        requestId: 102,
        requestTitle: 'School Lunch Program',
        foodItemName: 'Sandwiches',
        contributionAmount: '50 pieces',
        donorName: 'Star Bakery',
        donorContact: '+94712345678',
        dateContributed: '2025-03-04',
        status: 'ignored',
        notes: 'Can donate freshly made sandwiches every Monday'
    },
    {
        id: 4,
        requestId: 103,
        requestTitle: 'Elderly Home Monthly Supply',
        foodItemName: 'Vegetables',
        contributionAmount: '5 kg',
        donorName: 'Fresh Farm Market',
        donorContact: '+94765432109',
        dateContributed: '2025-03-07',
        status: 'pending',
        notes: 'Assorted vegetables from our farm'
    },
    {
        id: 5,
        requestId: 103,
        requestTitle: 'Elderly Home Monthly Supply',
        foodItemName: 'Rice',
        contributionAmount: '15 kg',
        donorName: 'Rice Distributors Ltd',
        donorContact: '+94701234567',
        dateContributed: '2025-03-08',
        status: 'pending',
        notes: 'Premium quality rice'
    }
];
