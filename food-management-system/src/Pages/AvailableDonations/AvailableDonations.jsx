import React, { useState, useEffect } from 'react';
import { 
    Box, TextField, MenuItem, Select, Typography, Grid, Card, 
    CardContent, Avatar, Chip, Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, Alert, Divider, IconButton, Snackbar,
    Tabs, Tab, Paper, List, ListItem, ListItemIcon, ListItemText
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
import EmailIcon from '@mui/icons-material/Email';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { showLoadingAnimation, hideLoadingAnimation } from '../../app/loadingAnimationController';
import { showAlertMessage } from '../../app/alertMessageController';
import donationService from '../../Services/donationService';
import contributionService from '../../Services/contributionService';

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
    
    // State for my contributions and available donations
    const [myContributions, setMyContributions] = useState([]);
    const [contributionsLoading, setContributionsLoading] = useState(true);
    const [contributionsError, setContributionsError] = useState(null);
    const [availableDonations, setAvailableDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch donations from API when component mounts
    useEffect(() => {
        fetchDonations();
        if (activeTab === 1) {
            fetchMyContributions();
        }
    }, []);

    // Fetch contributions when tab changes to contributions tab
    useEffect(() => {
        if (activeTab === 1) {
            fetchMyContributions();
        }
    }, [activeTab]);

    // Function to fetch my contributions from API
    const fetchMyContributions = async () => {
        setContributionsLoading(true);
        try {
            const response = await contributionService.getRecipientContributions();
            if (response && response.success) {
                const formattedContributions = formatContributionsData(response.data);
                setMyContributions(formattedContributions);
            } else {
                throw new Error("Failed to fetch contributions data");
            }
        } catch (error) {
            console.error("Error fetching contributions:", error);
            setContributionsError(error.message);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to load contributions. Please try again.",
                type: "error"
            });
        } finally {
            setContributionsLoading(false);
        }
    };

    // Function to format contributions data from API to match our component structure
    const formatContributionsData = (contributions) => {
        return contributions.map(contribution => {
            // Format the date
            const contributionDate = new Date(contribution.createdAt);
            
            // Format all contributed items
            const contributedItems = contribution.contributedItems.map(item => ({
                mealName: item.mealName,
                amount: `${item.quantityOffered} ${item.unit !== 'none' ? item.unit : 'units'}`
            }));
            
            // Get the first contributed item for card display
            const firstItem = contribution.contributedItems[0];
            
            return {
                id: contribution._id, // Use _id instead of id
                requestId: contribution.foodRequest._id,
                requestTitle: contribution.foodRequest.title,
                foodItemName: firstItem.mealName,
                contributionAmount: `${firstItem.quantityOffered} ${firstItem.unit !== 'none' ? firstItem.unit : 'units'}`,
                allContributedItems: contributedItems,
                donorName: contribution.donor.name,
                donorContact: contribution.donor.phone || contribution.contactNumber || 'Not provided',
                donorEmail: contribution.donor.email,
                dateContributed: contributionDate.toISOString().split('T')[0],
                status: contribution.status,
                notes: contribution.message || ''
            };
        });
    };

    // Function to fetch donations from API using the donationService
    const fetchDonations = async () => {
        showLoadingAnimation({ message: "Fetching available donations..." });
        try {
            const response = await donationService.getAllDonations();
            if (response && response.success) {
                const formattedDonations = formatDonationsData(response.data);
                setAvailableDonations(formattedDonations);
            } else {
                throw new Error("Failed to fetch donations data");
            }
        } catch (error) {
            console.error("Error fetching donations:", error);
            setError(error.message);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to load donations. Please try again.",
                type: "error"
            });
        } finally {
            hideLoadingAnimation();
            setIsLoading(false);
        }
    };

    // Function to format API response data to match our component structure
    const formatDonationsData = (donations) => {
        const formattedDonations = [];
        
        donations.forEach(donation => {
            // Create a separate card for each food item in the donation
            donation.foodItems.forEach(foodItem => {
                // Only include food items with "available" status
                if (foodItem.status === 'available') {
                    // Parse expiry date from string format
                    const [day, month, year] = foodItem.expiryDate.split('-');
                    const formattedExpiryDate = `${year}-${month}-${day}`;
                    
                    formattedDonations.push({
                        id: donation._id,
                        foodItemId: foodItem._id, // Added to differentiate between food items in the same donation
                        category: foodItem.unit !== 'none' ? `${foodItem.unit}` : 'Food items',
                        title: foodItem.mealName,
                        name: donation.donor.businessName || donation.donor.name,
                        donorId: donation.donor._id,
                        quantity: `${foodItem.quantity} ${foodItem.unit !== 'none' ? foodItem.unit : 'units'}`,
                        rawQuantity: foodItem.quantity,
                        unit: foodItem.unit,
                        expiryDate: formattedExpiryDate,
                        expiryTime: foodItem.expiryTime,
                        postDate: new Date(donation.createdAt).toISOString().split('T')[0],
                        address: donation.location?.address || 'Location not specified',
                        latitude: donation.location?.latitude,
                        longitude: donation.location?.longitude,
                        description: `${foodItem.mealName} - ${foodItem.quantity} ${foodItem.unit !== 'none' ? foodItem.unit : ''}`,
                        contactNumber: donation.contactNumber,
                        donorPhone: donation.donor?.phone,
                        status: foodItem.status,
                        requested: false,
                    });
                }
            });
        });
        
        return formattedDonations;
    };

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Filtered donations based on search and filters
    const filteredDonations = availableDonations.filter(donation => {
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
    const handleRequestSubmit = async () => {
        showLoadingAnimation({ message: "Sending donation request..." });
        
        try {
            await donationService.requestDonation({
                donationId: selectedDonation.id,
                foodItemId: selectedDonation.foodItemId, // Add foodItemId to the request
            });
            
            setSnackbarMessage(`Request for ${selectedDonation.title} has been sent to ${selectedDonation.name}`);
            setSnackbarOpen(true);
            setOpenDialog(false);

            // Update the donation to show requested status
            const updatedDonations = availableDonations.map(donation => 
                (donation.id === selectedDonation.id && donation.foodItemId === selectedDonation.foodItemId) 
                ? {...donation, requested: true} 
                : donation
            );
            setAvailableDonations(updatedDonations);
            
        } catch (error) {
            console.error("Error requesting donation:", error);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to send request. Please try again.",
                type: "error"
            });
        } finally {
            hideLoadingAnimation();
        }
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
    const handleConfirmContribution = async () => {
        showLoadingAnimation({ message: "Accepting contribution..." });
        
        try {
            const response = await contributionService.acceptContribution(selectedContribution.id);
            
            if (response && response.success) {
                // Update the contributions list with the accepted contribution
                const updatedContributions = myContributions.map(contribution => {
                    if (contribution.id === selectedContribution.id) {
                        return { ...contribution, status: 'accepted' };
                    }
                    return contribution;
                });
                
                setMyContributions(updatedContributions);
                setSnackbarMessage(`Contribution from ${selectedContribution.donorName} has been accepted!`);
                setSnackbarOpen(true);
            } else {
                throw new Error("Failed to accept contribution");
            }
        } catch (error) {
            console.error("Error accepting contribution:", error);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to accept contribution. Please try again.",
                type: "error"
            });
        } finally {
            hideLoadingAnimation();
            setOpenConfirmDialog(false);
        }
    };

    // Handle ignoring/rejecting a contribution
    const handleIgnoreContribution = async () => {
        showLoadingAnimation({ message: "Rejecting contribution..." });
        
        try {
            const response = await contributionService.rejectContribution(selectedContribution.id);
            
            if (response && response.success) {
                // Update the contributions list with the rejected contribution
                const updatedContributions = myContributions.map(contribution => {
                    if (contribution.id === selectedContribution.id) {
                        return { ...contribution, status: 'rejected' };
                    }
                    return contribution;
                });
                
                setMyContributions(updatedContributions);
                setSnackbarMessage(`Contribution from ${selectedContribution.donorName} has been rejected`);
                setSnackbarOpen(true);
            } else {
                throw new Error("Failed to reject contribution");
            }
        } catch (error) {
            console.error("Error rejecting contribution:", error);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to reject contribution. Please try again.",
                type: "error"
            });
        } finally {
            hideLoadingAnimation();
            setOpenIgnoreDialog(false);
        }
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

    // Render contribution card
    const renderContributionCard = (contribution) => {
        return (
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
                    contribution.status === 'accepted' ? '#10B981' : 
                    contribution.status === 'rejected' ? '#6B7280' : 
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
                                    Contribution
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
                        ) : contribution.status === 'accepted' ? (
                            <Chip 
                                label="ACCEPTED" 
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
                                label="REJECTED" 
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
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Contributed Items:
                        </Typography>
                        <List dense disablePadding sx={{ mb: 2 }}>
                            {contribution.allContributedItems.map((item, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                        <ArrowRightIcon sx={{ color: '#3B82F6', fontSize: '1rem' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={`${item.mealName}: ${item.amount}`}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ color: '#3B82F6', mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">
                                Email: {contribution.donorEmail}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon sx={{ color: '#3B82F6', mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">
                                Date: {formatDate(contribution.dateContributed)}
                            </Typography>
                        </Box>
                        {contribution.notes && (
                            <Box sx={{ mt: 1, p: 1, bgcolor: '#F9FAFB', borderRadius: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Note: {contribution.notes}
                                </Typography>
                            </Box>
                        )}
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
                                    Accept
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
                                    Reject
                                </Button>
                            </Box>
                        )}
                        {contribution.status === 'accepted' && (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography sx={{ color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CheckCircleIcon sx={{ mr: 1 }} /> Contribution accepted
                                </Typography>
                            </Box>
                        )}
                        {contribution.status === 'rejected' && (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography sx={{ color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CancelIcon sx={{ mr: 1 }} /> Contribution rejected
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        );
    };

    // Render contributions tab
    const renderContributionsTab = () => {
        if (contributionsLoading) {
            return (
                <Box sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    bgcolor: '#f9fafb', 
                    borderRadius: 2,
                    mt: 2
                }}>
                    <Typography variant="h6" color="textSecondary">
                        Loading your contributions...
                    </Typography>
                </Box>
            );
        }
        
        if (contributionsError) {
            return (
                <Box sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    bgcolor: '#f9fafb', 
                    borderRadius: 2,
                    mt: 2
                }}>
                    <Typography variant="h6" color="error">
                        Error loading contributions. Please try refreshing the page.
                    </Typography>
                </Box>
            );
        }
        
        if (myContributions.length === 0) {
            return (
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
            );
        }
        
        return (
            <Grid container spacing={3}>
                {myContributions.map((contribution) => (
                    <Grid item key={contribution.id} xs={12} md={6} lg={4}>
                        {renderContributionCard(contribution)}
                    </Grid>
                ))}
            </Grid>
        );
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
                            <MenuItem value="kg">Kilograms</MenuItem>
                            <MenuItem value="g">Grams</MenuItem>
                            <MenuItem value="l">Liters</MenuItem>
                            <MenuItem value="ml">Milliliters</MenuItem>
                            <MenuItem value="pcs">Pieces</MenuItem>
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

                {isLoading ? (
                    <Box sx={{ 
                        p: 4, 
                        textAlign: 'center', 
                        bgcolor: '#f9fafb', 
                        borderRadius: 2,
                        mt: 2
                    }}>
                        <Typography variant="h6" color="textSecondary">
                            Loading available donations...
                        </Typography>
                    </Box>
                ) : error ? (
                    <Box sx={{ 
                        p: 4, 
                        textAlign: 'center', 
                        bgcolor: '#f9fafb', 
                        borderRadius: 2,
                        mt: 2
                    }}>
                        <Typography variant="h6" color="error">
                            Error loading donations. Please try refreshing the page.
                        </Typography>
                    </Box>
                ) : sortedDonations.length === 0 ? (
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
                        {sortedDonations.map((donation) => (
                            <Grid 
                                item 
                                key={`${donation.id}-${donation.foodItemId}`} 
                                xs={12} 
                                sm={6} 
                                lg={4}
                            >
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
                {renderContributionsTab()}
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
                    Accept Contribution
                </DialogTitle>
                <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
                    {selectedContribution && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Are you sure you want to accept this contribution of <strong>{selectedContribution.contributionAmount}</strong> for <strong>{selectedContribution.foodItemName}</strong> from <strong>{selectedContribution.donorName}</strong>?
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: '#4B5563' }}>
                                By accepting, you'll be able to coordinate with the donor for the handover.
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
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Ignore Contribution Dialog */}
            <Dialog open={openIgnoreDialog} onClose={() => setOpenIgnoreDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ bgcolor: '#F9FAFB', color: '#4B5563', fontWeight: 600 }}>
                    Reject Contribution
                </DialogTitle>
                <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
                    {selectedContribution && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Are you sure you want to reject this contribution of <strong>{selectedContribution.contributionAmount}</strong> from <strong>{selectedContribution.donorName}</strong>?
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
                        Reject
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
