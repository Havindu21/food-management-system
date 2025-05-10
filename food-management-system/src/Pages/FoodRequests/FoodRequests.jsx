import React, { useState, useEffect } from 'react';
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
import { showLoadingAnimation, hideLoadingAnimation } from '../../app/loadingAnimationController';
import { showAlertMessage } from '../../app/alertMessageController';
import requestService from '../../Services/requestService';
import contributionService from '../../Services/contributionService';

const FoodRequests = () => {
    // State variables
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for contribution dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [selectedFoodItem, setSelectedFoodItem] = useState(null);
    const [contributionAmount, setContributionAmount] = useState("");
    const [contributionError, setContributionError] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");
    const [message, setMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Fetch food requests from API when component mounts
    useEffect(() => {
        fetchRequests();
    }, []);

    // Function to fetch food requests from API
    const fetchRequests = async () => {
        showLoadingAnimation({ message: "Fetching food requests..." });
        try {
            const response = await requestService.getAllRequests();
            if (response && response.success) {
                const formattedRequests = formatRequestsData(response.data);
                setRequests(formattedRequests);
            } else {
                throw new Error("Failed to fetch food requests data");
            }
        } catch (error) {
            console.error("Error fetching food requests:", error);
            setError(error.message);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to load food requests. Please try again.",
                type: "error"
            });
        } finally {
            hideLoadingAnimation();
            setIsLoading(false);
        }
    };

    // Function to format API response data to match our component structure
    const formatRequestsData = (requestsData) => {
        return requestsData.map(request => {
            return {
                id: request._id,
                title: request.title,
                description: request.description,
                requestor: request.recipient.name,
                contactNumber: request.recipient.phone,
                dateRequested: new Date(request.recipient.createdAt).toISOString().split('T')[0],
                status: "active",
                foodItems: request.foodRequests.map(item => {
                    // Parse deadline from string format (DD-MM-YYYY to YYYY-MM-DD)
                    const [day, month, year] = item.deadline.split('-');
                    const formattedDeadline = `${year}-${month}-${day}`;
                    
                    return {
                        id: item._id,
                        mealName: item.mealName,
                        quantityNeeded: `${item.quantityNeeded} ${item.unit !== 'none' ? item.unit : ''}`.trim(),
                        deadline: formattedDeadline,
                        contributedAmount: `${item.quantityFulfilled || 0} ${item.unit !== 'none' ? item.unit : ''}`.trim(),
                        unit: item.unit
                    };
                })
            };
        });
    };

    // Open dialog for contributing to a specific food item
    const handleContributeClick = (request, foodItem) => {
        setSelectedRequest(request);
        setSelectedFoodItem(foodItem);
        setContributionAmount("");
        setContributionError("");
        setContactNumber("");
        setContactNumberError("");
        setMessage("");
        setOpenDialog(true);
    };

    // Open dialog for contributing to the entire request
    const handleContributeToAllClick = (request) => {
        setSelectedRequest(request);
        setSelectedFoodItem(null);
        setContributionAmount("");
        setContributionError("");
        setContactNumber("");
        setContactNumberError("");
        setMessage("");
        setOpenDialog(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Validate form inputs
    const validateForm = () => {
        let isValid = true;
        
        if (!contributionAmount.trim()) {
            setContributionError("Please enter contribution amount");
            isValid = false;
        } else {
            setContributionError("");
        }
        
        if (!contactNumber.trim()) {
            setContactNumberError("Please enter your contact number");
            isValid = false;
        } else if (!/^\d{9,15}$/.test(contactNumber.replace(/\D/g, ''))) {
            setContactNumberError("Please enter a valid phone number");
            isValid = false;
        } else {
            setContactNumberError("");
        }
        
        return isValid;
    };

    // Handle the contribution submission
    const handleSubmitContribution = async () => {
        if (validateForm()) {
            showLoadingAnimation({ message: "Processing your contribution..." });
            
            try {
                if (selectedFoodItem) {
                    // Contributing to a specific food item
                    const response = await contributionService.contributeToSingleItem(
                        selectedRequest.id,
                        selectedFoodItem.id,
                        selectedFoodItem.mealName,
                        contributionAmount.split(' ')[0], // Extract numeric value
                        selectedFoodItem.unit,
                        contactNumber,
                        message
                    );
                    
                    if (response && response.success) {
                        setSnackbarMessage(`Thank you for contributing ${contributionAmount} of ${selectedFoodItem.mealName}!`);
                        
                        // Update the local state to reflect the contribution
                        updateLocalRequestData(selectedRequest.id, selectedFoodItem.id, contributionAmount);
                    } else {
                        throw new Error("Failed to submit contribution");
                    }
                } else {
                    // Contributing to the entire request
                    const contributedItems = selectedRequest.foodItems.map(item => ({
                        requestItem: item.id,
                        mealName: item.mealName,
                        quantityOffered: contributionAmount.split(' ')[0], // Extract numeric value
                        unit: item.unit
                    }));
                    
                    const response = await contributionService.contributeToEntireRequest(
                        selectedRequest.id,
                        contributedItems,
                        contactNumber,
                        message
                    );
                    
                    if (response && response.success) {
                        setSnackbarMessage("Thank you for contributing to the entire request!");
                        
                        // Refresh the requests data to reflect the contributions
                        fetchRequests();
                    } else {
                        throw new Error("Failed to submit contributions");
                    }
                }
                
                setSnackbarOpen(true);
                setOpenDialog(false);
            } catch (error) {
                console.error("Error submitting contribution:", error);
                showAlertMessage({
                    message: error.response?.data?.message || "Failed to process your contribution. Please try again.",
                    type: "error"
                });
            } finally {
                hideLoadingAnimation();
            }
        }
    };
    
    // Update the local state to reflect a new contribution
    const updateLocalRequestData = (requestId, foodItemId, newContribution) => {
        const updatedRequests = requests.map(request => {
            if (request.id === requestId) {
                const updatedFoodItems = request.foodItems.map(item => {
                    if (item.id === foodItemId) {
                        // Parse current contributed amount
                        let currentAmount = item.contributedAmount.split(' ')[0] || '0';
                        let newAmount = newContribution.split(' ')[0] || '0';
                        
                        // Convert to numbers for addition
                        currentAmount = parseFloat(currentAmount) || 0;
                        newAmount = parseFloat(newAmount) || 0;
                        
                        // Calculate new total and format with unit
                        const total = currentAmount + newAmount;
                        const unit = item.unit !== 'none' ? item.unit : '';
                        
                        return {
                            ...item,
                            contributedAmount: `${total} ${unit}`.trim()
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

            {isLoading ? (
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="textSecondary">
                        Loading food requests...
                    </Typography>
                </Paper>
            ) : error ? (
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="error">
                        Error: {error}. Please try again.
                    </Typography>
                </Paper>
            ) : requests.length === 0 ? (
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
                                label={selectedFoodItem ? `Amount to contribute (numbers only)` : "Specify your contribution (numbers only)"}
                                variant="outlined"
                                value={contributionAmount}
                                onChange={(e) => {
                                    // Only allow numeric input (digits and decimal point)
                                    const value = e.target.value;
                                    if (value === '' || /^[0-9]+\.?[0-9]*$/.test(value)) {
                                        setContributionAmount(value);
                                        setContributionError('');
                                    }
                                }}
                                type="number"
                                inputProps={{ 
                                    step: "0.01",
                                    min: "0.01"
                                }}
                                error={!!contributionError}
                                helperText={contributionError || `Enter numeric value only (e.g., "5" for ${selectedFoodItem?.unit || 'units'})`}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Your contact number"
                                variant="outlined"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                error={!!contactNumberError}
                                helperText={contactNumberError}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Message (optional)"
                                variant="outlined"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                multiline
                                rows={2}
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
