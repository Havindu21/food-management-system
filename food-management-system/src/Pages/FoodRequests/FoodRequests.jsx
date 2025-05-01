import React, { useState } from 'react';
import {
    Box, Typography, Button, Grid, Paper, Card, CardContent, Divider, 
    Chip, Avatar, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, Accordion, AccordionSummary, AccordionDetails, Alert, Snackbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const FoodRequests = () => {
    // Mock data - in a real app this would come from an API
    const [requests, setRequests] = useState([
        {
            id: 1,
            title: "Weekly Meals for Community Center",
            description: "We need food for our weekly community lunch program that serves 50 underprivileged individuals.",
            requestor: "Community Welfare Center",
            contactNumber: "+94771234567",
            dateRequested: "2023-10-15",
            status: "active",
            foodItems: [
                { id: 101, mealName: "Rice", quantityNeeded: "20kg", deadline: "2023-10-30", contributedAmount: "5kg" },
                { id: 102, mealName: "Vegetable Curry", quantityNeeded: "10 portions", deadline: "2023-10-25", contributedAmount: "2 portions" },
                { id: 103, mealName: "Chicken Curry", quantityNeeded: "8kg", deadline: "2023-10-28", contributedAmount: "0kg" }
            ]
        },
        {
            id: 2,
            title: "School Lunch Program",
            description: "Supporting underprivileged children with nutritious lunch meals for a week.",
            requestor: "Happy Kids Foundation",
            contactNumber: "+94777654321",
            dateRequested: "2023-10-18",
            status: "active",
            foodItems: [
                { id: 201, mealName: "Sandwiches", quantityNeeded: "100 pcs", deadline: "2023-11-05", contributedAmount: "30 pcs" },
                { id: 202, mealName: "Fruit Packets", quantityNeeded: "80 packs", deadline: "2023-11-02", contributedAmount: "20 packs" }
            ]
        },
        {
            id: 3,
            title: "Elderly Home Monthly Supply",
            description: "Food supplies needed for our local elderly care home with 30 residents.",
            requestor: "Golden Age Care Home",
            contactNumber: "+94712345678",
            dateRequested: "2023-10-12",
            status: "active",
            foodItems: [
                { id: 301, mealName: "Rice", quantityNeeded: "25kg", deadline: "2023-10-31", contributedAmount: "10kg" },
                { id: 302, mealName: "Lentils", quantityNeeded: "10kg", deadline: "2023-10-31", contributedAmount: "5kg" },
                { id: 303, mealName: "Vegetables", quantityNeeded: "15kg", deadline: "2023-10-29", contributedAmount: "5kg" },
                { id: 304, mealName: "Fruit", quantityNeeded: "10kg", deadline: "2023-10-27", contributedAmount: "2kg" }
            ]
        }
    ]);

    // State for contribution dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [selectedFoodItem, setSelectedFoodItem] = useState(null);
    const [contributionAmount, setContributionAmount] = useState("");
    const [contributionError, setContributionError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Open dialog for contributing to a specific food item
    const handleContributeClick = (request, foodItem) => {
        setSelectedRequest(request);
        setSelectedFoodItem(foodItem);
        setContributionAmount("");
        setContributionError("");
        setOpenDialog(true);
    };

    // Open dialog for contributing to the entire request
    const handleContributeToAllClick = (request) => {
        setSelectedRequest(request);
        setSelectedFoodItem(null);
        setContributionAmount("");
        setContributionError("");
        setOpenDialog(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Validate contribution amount
    const validateContribution = () => {
        if (!contributionAmount.trim()) {
            setContributionError("Please enter contribution amount");
            return false;
        }
        return true;
    };

    // Handle the contribution submission
    const handleSubmitContribution = () => {
        if (validateContribution()) {
            // In a real app, this would call an API to record the contribution
            setSnackbarMessage(selectedFoodItem 
                ? `Thank you for contributing ${contributionAmount} of ${selectedFoodItem.mealName}!` 
                : "Thank you for contributing to the entire request!");
            setSnackbarOpen(true);
            setOpenDialog(false);
            
            // Update the mock data to reflect the contribution
            if (selectedFoodItem) {
                // Contributing to a specific food item
                const updatedRequests = requests.map(request => {
                    if (request.id === selectedRequest.id) {
                        const updatedFoodItems = request.foodItems.map(item => {
                            if (item.id === selectedFoodItem.id) {
                                // This is simplified - in real app, would need to parse and add amounts properly
                                return {
                                    ...item,
                                    contributedAmount: contributionAmount
                                };
                            }
                            return item;
                        });
                        
                        return {
                            ...request,
                            foodItems: updatedFoodItems
                        };
                    }
                    return request;
                });
                
                setRequests(updatedRequests);
            } else {
                // Mark as contributing to the entire request (this is simplified)
                console.log("Contributing to entire request:", selectedRequest.id, contributionAmount);
            }
        }
    };

    // Calculate progress for each food item
    const calculateProgress = (needed, contributed) => {
        // Extract numeric values (simple parsing, in a real app would need more robust parsing)
        const neededValue = parseFloat(needed);
        const contributedValue = parseFloat(contributed);
        
        if (isNaN(neededValue) || isNaN(contributedValue) || neededValue === 0) {
            return 0;
        }
        
        return Math.min((contributedValue / neededValue) * 100, 100);
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                    Food Requests
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                    mb: 2,
                }}>
                    Help fulfill food requests from community organizations and make a difference
                </Typography>
                <Divider sx={{ mb: 4 }} />
            </Box>

            {requests.length === 0 ? (
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="textSecondary">
                        No food requests available at the moment.
                    </Typography>
                </Paper>
            ) : (
                requests.map((request) => (
                    <Card
                        key={request.id}
                        sx={{
                            mb: 4,
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            overflow: 'visible',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                            }
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
                                    <Avatar sx={{ bgcolor: '#059669', mr: 2 }}>
                                        <RequestPageIcon />
                                    </Avatar>
                                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#2D3748' }}>
                                        {request.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip 
                                        icon={<PersonIcon fontSize="small" />}
                                        label={request.requestor}
                                        sx={{ 
                                            bgcolor: '#E6FFFA', 
                                            color: '#047857',
                                            border: '1px solid #047857',
                                            fontWeight: 500
                                        }}
                                    />
                                    <Chip 
                                        icon={<CalendarTodayIcon fontSize="small" />}
                                        label={`Requested: ${formatDate(request.dateRequested)}`}
                                        sx={{ bgcolor: '#F0FFF4', color: '#22543D' }}
                                    />
                                </Box>
                            </Box>

                            <Typography sx={{ mb: 3, color: '#4A5568' }}>
                                {request.description}
                            </Typography>

                            <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PhoneIcon sx={{ color: '#059669', mr: 1 }} fontSize="small" />
                                    <Typography sx={{ fontSize: 14, color: '#4A5568' }}>
                                        {request.contactNumber}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="outlined"
                                    startIcon={<VolunteerActivismIcon />}
                                    onClick={() => handleContributeToAllClick(request)}
                                    sx={{
                                        ml: { xs: 0, sm: 'auto' },
                                        borderColor: '#059669',
                                        color: '#059669',
                                        '&:hover': {
                                            borderColor: '#047857',
                                            bgcolor: 'rgba(5, 150, 105, 0.04)',
                                        }
                                    }}
                                >
                                    Contribute to Entire Request
                                </Button>
                            </Box>

                            <Divider sx={{ mb: 2 }} />
                            
                            <Typography sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <RestaurantIcon sx={{ color: '#059669' }} />
                                Food Items Requested
                            </Typography>

                            {request.foodItems.map((foodItem) => (
                                <Accordion 
                                    key={foodItem.id}
                                    sx={{
                                        mb: 2,
                                        boxShadow: 'none',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '8px !important',
                                        '&:before': {
                                            display: 'none',
                                        },
                                        '&.Mui-expanded': {
                                            margin: '0 0 16px 0',
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            bgcolor: '#F7FAFC',
                                            borderRadius: '8px',
                                            '&.Mui-expanded': {
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0,
                                            }
                                        }}
                                    >
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                            <Typography sx={{ fontWeight: 500 }}>{foodItem.mealName}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Typography sx={{ fontSize: 14, color: '#4A5568' }}>
                                                    Needed: {foodItem.quantityNeeded}
                                                </Typography>
                                                <Chip 
                                                    label={`Deadline: ${formatDate(foodItem.deadline)}`}
                                                    size="small"
                                                    sx={{ bgcolor: '#FEF2F2', color: '#DC2626' }}
                                                />
                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={6}>
                                                <Box>
                                                    <Typography sx={{ mb: 1, fontSize: 14 }}>
                                                        Current Contribution: {foodItem.contributedAmount} of {foodItem.quantityNeeded}
                                                    </Typography>
                                                    <Box sx={{ 
                                                        width: '100%', 
                                                        height: 10, 
                                                        bgcolor: '#E2E8F0', 
                                                        borderRadius: 5,
                                                        overflow: 'hidden'
                                                    }}>
                                                        <Box sx={{
                                                            width: `${calculateProgress(foodItem.quantityNeeded, foodItem.contributedAmount)}%`,
                                                            height: '100%',
                                                            bgcolor: '#059669',
                                                            borderRadius: 5
                                                        }} />
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleContributeClick(request, foodItem)}
                                                        startIcon={<VolunteerActivismIcon />}
                                                        sx={{
                                                            bgcolor: '#059669',
                                                            '&:hover': {
                                                                bgcolor: '#047857',
                                                            }
                                                        }}
                                                    >
                                                        Contribute
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </CardContent>
                    </Card>
                ))
            )}

            {/* Contribution Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#F0FFF4', color: '#047857', fontWeight: 600 }}>
                    {selectedFoodItem ? `Contribute ${selectedFoodItem.mealName}` : "Contribute to Entire Request"}
                </DialogTitle>
                <DialogContent sx={{ pt: 2, pb: 1, px: 3, mt: 2 }}>
                    {selectedRequest && (
                        <>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                {selectedRequest.title}
                            </Typography>
                            
                            {selectedFoodItem && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography sx={{ mb: 1, fontSize: 14, color: '#4A5568' }}>
                                        Needed: {selectedFoodItem.quantityNeeded}
                                    </Typography>
                                    <Typography sx={{ mb: 2, fontSize: 14, color: '#4A5568' }}>
                                        Current Contribution: {selectedFoodItem.contributedAmount}
                                    </Typography>
                                </Box>
                            )}
                            
                            <TextField
                                fullWidth
                                label={selectedFoodItem ? `Amount to contribute (e.g., "5kg", "10 portions")` : "Specify your contribution"}
                                variant="outlined"
                                value={contributionAmount}
                                onChange={(e) => setContributionAmount(e.target.value)}
                                error={!!contributionError}
                                helperText={contributionError}
                                sx={{ mb: 2 }}
                            />
                            
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Your contribution will be reviewed and the recipient will be notified.
                            </Alert>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleCloseDialog} sx={{ color: '#4A5568' }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmitContribution}
                        variant="contained" 
                        sx={{
                            bgcolor: '#059669',
                            '&:hover': {
                                bgcolor: '#047857',
                            }
                        }}
                    >
                        Confirm Contribution
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default FoodRequests;
