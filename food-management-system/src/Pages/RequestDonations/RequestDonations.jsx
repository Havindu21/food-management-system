import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Grid, Paper, IconButton,
    Divider, Card, CardContent, MenuItem, InputAdornment,
    Select, FormControl
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import dayjs from 'dayjs';

// Date format configuration
const DATE_FORMAT = 'DD-MM-YYYY';

const RequestDonations = () => {
    // Main request details (single for the entire form)
    const [requestTitle, setRequestTitle] = useState('');
    const [requestDescription, setRequestDescription] = useState('');
    
    // Individual food items
    const [foodRequests, setFoodRequests] = useState([
        { mealName: '', quantityNeeded: '', unit: 'none', deadline: null }
    ]);
    
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // List of unit types
    const unitTypes = [
        { value: 'none', label: 'None' },
        { value: 'kg', label: 'Kilograms (kg)' },
        { value: 'g', label: 'Grams (g)' },
        { value: 'l', label: 'Liters (L)' },
        { value: 'ml', label: 'Milliliters (ml)' },
        { value: 'pcs', label: 'Pieces' },
        { value: 'boxes', label: 'Boxes' },
        { value: 'plates', label: 'Plates' },
        { value: 'servings', label: 'Servings' },
    ];

    // Add a new food request to the list
    const handleAddFoodRequest = () => {
        setFoodRequests([...foodRequests, { mealName: '', quantityNeeded: '', unit: 'none', deadline: null }]);
    };

    // Remove a food request from the list
    const handleRemoveFoodRequest = (index) => {
        const newFoodRequests = [...foodRequests];
        newFoodRequests.splice(index, 1);
        setFoodRequests(newFoodRequests);
    };

    // Update a food request field
    const handleFoodRequestChange = (index, field, value) => {
        const newFoodRequests = [...foodRequests];
        
        // If the field is quantityNeeded, validate that it only contains numbers
        if (field === 'quantityNeeded') {
            // Allow only numbers or empty string
            if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
                return;
            }
        }
        
        newFoodRequests[index][field] = value;
        setFoodRequests(newFoodRequests);

        // Clear error when user types
        if (formErrors[`foodRequests[${index}].${field}`]) {
            const newErrors = { ...formErrors };
            delete newErrors[`foodRequests[${index}].${field}`];
            setFormErrors(newErrors);
        }
    };

    // Update title and clear error
    const handleTitleChange = (value) => {
        setRequestTitle(value);
        if (formErrors.title) {
            const newErrors = { ...formErrors };
            delete newErrors.title;
            setFormErrors(newErrors);
        }
    };

    // Update description
    const handleDescriptionChange = (value) => {
        setRequestDescription(value);
    };

    // Validate Sri Lankan phone number
    const validateContactNumber = (number) => {
        setContactNumber(number);

        // Sri Lankan mobile number format
        const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;

        if (!number) {
            setContactNumberError('Contact number is required');
        } else if (!regex.test(number)) {
            setContactNumberError('Please enter a valid Sri Lankan phone number');
        } else {
            setContactNumberError('');
        }
    };

    // Form validation
    const validateForm = () => {
        const errors = {};

        // Validate main title
        if (!requestTitle.trim()) {
            errors.title = 'Request title is required';
        }

        // Validate food requests
        foodRequests.forEach((item, index) => {
            if (!item.mealName) {
                errors[`foodRequests[${index}].mealName`] = 'Meal name is required';
            }
            if (!item.quantityNeeded) {
                errors[`foodRequests[${index}].quantityNeeded`] = 'Quantity needed is required';
            }
            if (!item.deadline) {
                errors[`foodRequests[${index}].deadline`] = 'Deadline is required';
            }
        });

        // Validate contact number
        if (!contactNumber) {
            errors.contactNumber = 'Contact number is required';
        } else if (contactNumberError) {
            errors.contactNumber = contactNumberError;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Format deadlines for submission
            const formattedFoodRequests = foodRequests.map(request => ({
                ...request,
                deadline: request.deadline ? request.deadline.format(DATE_FORMAT) : null
            }));
            
            console.log('Form submitted:', { 
                title: requestTitle,
                description: requestDescription,
                foodRequests: formattedFoodRequests,
                contactNumber
            });
            // Here you would handle the submission to your backend

            // Show success message or redirect
            alert('Food request submitted successfully!');
        } else {
            console.log('Form has errors');
        }
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
                    Request Food Donations
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                    mb: 2,
                }}>
                    Let donors know what supplies you need for your community
                </Typography>
                <Divider sx={{ mb: 4 }} />
            </Box>

            <form onSubmit={handleSubmit}>
                <Paper elevation={2} sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 2,
                    background: 'linear-gradient(to right bottom, #ffffff, #f9fffc)'
                }}>
                    <Typography sx={{
                        fontSize: 18,
                        fontWeight: 600,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#333',
                    }}>
                        <RestaurantIcon sx={{ color: '#059669' }} /> Request Information
                    </Typography>

                    {/* Request Title and Description (Single for the whole request) */}
                    <Card
                        variant="outlined"
                        sx={{
                            mb: 4,
                            borderColor: '#e0e0e0',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }
                        }}
                    >
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                        Request Title<span style={{ color: 'red' }}> *</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Enter a title for your food request"
                                        value={requestTitle}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        error={!!formErrors.title}
                                        helperText={formErrors.title || ''}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                        Request Description
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        size="small"
                                        placeholder="Describe your overall request and any special requirements"
                                        value={requestDescription}
                                        onChange={(e) => handleDescriptionChange(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Typography sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 2,
                        color: '#333',
                    }}>
                        Food / Meal Items Needed
                    </Typography>

                    {foodRequests.map((request, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                mb: 3,
                                position: 'relative',
                                borderColor: '#e0e0e0',
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 16 }}>
                                        Item #{index + 1}
                                    </Typography>
                                    {foodRequests.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveFoodRequest(index)}
                                            size="small"
                                            sx={{ color: '#e53935' }}
                                            aria-label="remove food request"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Meal Name<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter food item name"
                                            value={request.mealName}
                                            onChange={(e) => handleFoodRequestChange(index, 'mealName', e.target.value)}
                                            error={!!formErrors[`foodRequests[${index}].mealName`]}
                                            helperText={formErrors[`foodRequests[${index}].mealName`] || ''}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Quantity Needed<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <TextField
                                                sx={{ flex: 1, mb: 2 }}
                                                size="small"
                                                placeholder="Enter quantity"
                                                value={request.quantityNeeded}
                                                onChange={(e) => handleFoodRequestChange(index, 'quantityNeeded', e.target.value)}
                                                error={!!formErrors[`foodRequests[${index}].quantityNeeded`]}
                                                helperText={formErrors[`foodRequests[${index}].quantityNeeded`] || ''}
                                                inputProps={{ inputMode: 'numeric' }}
                                            />
                                            <FormControl sx={{ minWidth: 120, mb: 2 }} size="small">
                                                <Select
                                                    value={request.unit || 'none'}
                                                    onChange={(e) => handleFoodRequestChange(index, 'unit', e.target.value)}
                                                >
                                                    {unitTypes.map((unit) => (
                                                        <MenuItem key={unit.value} value={unit.value}>
                                                            {unit.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Deadline<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={request.deadline}
                                                onChange={(date) => handleFoodRequestChange(index, 'deadline', date)}
                                                minDate={dayjs()}
                                                format={DATE_FORMAT}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: "small",
                                                        error: !!formErrors[`foodRequests[${index}].deadline`],
                                                        helperText: formErrors[`foodRequests[${index}].deadline`] || '',
                                                        placeholder: 'DD-MM-YYYY',
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}

                    <Button
                        startIcon={<AddCircleIcon />}
                        onClick={handleAddFoodRequest}
                        sx={{
                            mb: 4,
                            color: '#059669',
                            '&:hover': {
                                backgroundColor: 'rgba(5, 150, 105, 0.08)',
                            }
                        }}
                    >
                        Add Another Food Item
                    </Button>

                    <Divider sx={{ my: 3 }} />

                    <Typography sx={{
                        fontSize: 18,
                        fontWeight: 600,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#333',
                    }}>
                        Contact Details
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                Contact Number<span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter Sri Lankan mobile number"
                                value={contactNumber}
                                onChange={(e) => validateContactNumber(e.target.value)}
                                error={!!contactNumberError || !!formErrors.contactNumber}
                                helperText={contactNumberError || formErrors.contactNumber || ''}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+94</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: '#059669',
                                color: 'white',
                                px: 5,
                                py: 1.5,
                                borderRadius: 2,
                                '&:hover': {
                                    bgcolor: '#047857',
                                },
                                transition: 'all 0.3s ease',
                                fontWeight: 600,
                                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
                            }}
                        >
                            Submit Request
                        </Button>
                    </Box>
                </Paper>
            </form>
        </Box>
    );
};

export default RequestDonations;