import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Grid, Paper, IconButton,
    Divider, Card, CardContent, Stack, InputAdornment,
    Select, MenuItem, FormControl
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MapSelector from '../../Components/MapSelector';
import dayjs from 'dayjs';
import donationService from '../../Services/donationService';
import { showAlertMessage } from '../../app/alertMessageController';
import { showLoadingAnimation, hideLoadingAnimation } from '../../app/loadingAnimationController';
import { useNavigate } from 'react-router-dom';

const DonateFood = () => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([
        { mealName: '', quantity: '', unit: 'none', expiryDate: null, expiryTime: null }
    ]);
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
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

    // Add a new food item to the list
    const handleAddFoodItem = () => {
        setFoodItems([...foodItems, { mealName: '', quantity: '', unit: 'none', expiryDate: null, expiryTime: null }]);
    };

    // Remove a food item from the list
    const handleRemoveFoodItem = (index) => {
        const newFoodItems = [...foodItems];
        newFoodItems.splice(index, 1);
        setFoodItems(newFoodItems);
    };

    // Update a food item field
    const handleFoodItemChange = (index, field, value) => {
        const newFoodItems = [...foodItems];

        // If the field is quantity, validate that it only contains numbers
        if (field === 'quantity') {
            // Allow only numbers or empty string
            if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
                return;
            }
        }

        newFoodItems[index][field] = value;
        setFoodItems(newFoodItems);

        // Clear error when user types
        if (formErrors[`foodItems[${index}].${field}`]) {
            const newErrors = { ...formErrors };
            delete newErrors[`foodItems[${index}].${field}`];
            setFormErrors(newErrors);
        }
    };

    // Validate Sri Lankan phone number
    const validateContactNumber = (number) => {
        setContactNumber(number);

        // Sri Lankan mobile number format (ex: 071-1234567 or 0711234567)
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

        // Validate food items
        foodItems.forEach((item, index) => {
            if (!item.mealName) {
                errors[`foodItems[${index}].mealName`] = 'Meal name is required';
            }
            if (!item.quantity) {
                errors[`foodItems[${index}].quantity`] = 'Quantity is required';
            }
            if (!item.expiryDate) {
                errors[`foodItems[${index}].expiryDate`] = 'Expiry date is required';
            }
            if (!item.expiryTime) {
                errors[`foodItems[${index}].expiryTime`] = 'Expiry time is required';
            }
        });

        // Validate contact number
        if (!contactNumber) {
            errors.contactNumber = 'Contact number is required';
        } else if (contactNumberError) {
            errors.contactNumber = contactNumberError;
        }

        // Validate location
        if (!selectedLocation) {
            errors.location = 'Pickup location is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Format the date and time for submission
            const formattedFoodItems = foodItems.map(item => {
                return {
                    mealName: item.mealName,
                    quantity: item.quantity,
                    unit: item.unit,
                    // Format date to dd-mm-yyyy if exists
                    expiryDate: item.expiryDate ? dayjs(item.expiryDate).format('DD-MM-YYYY') : null,
                    // Format time to hh:mm if exists
                    expiryTime: item.expiryTime ? dayjs(item.expiryTime).format('HH:mm') : null
                };
            });

            const donationData = {
                foodItems: formattedFoodItems,
                contactNumber,
                selectedLocation
            };

            showLoadingAnimation({ message: "Submitting donation..." });

            try {
                const response = await donationService.createDonation(donationData);

                if (response.success) {
                    showAlertMessage({ 
                        message: "Your donation has been submitted successfully!", 
                        type: "success" 
                    });

                    // Reset form or redirect
                    setTimeout(() => {
                        navigate('/profile/donation-history');
                    }, 1500);

                } else {
                    showAlertMessage({ 
                        message: response.message || "Failed to submit donation", 
                        type: "error" 
                    });
                }
            } catch (error) {
                console.error("Error submitting donation:", error);
                showAlertMessage({ 
                    message: error.response?.data?.message || error?.response?.data?.error || "An error occurred while submitting your donation", 
                    type: "error" 
                });
            } finally {
                hideLoadingAnimation();
            }
        } else {
            console.log('Form has errors');
            showAlertMessage({ 
                message: "Please fix the errors in the form before submitting", 
                type: "error" 
            });
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
                    Donate Food
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                    mb: 2,
                }}>
                    Help us fight hunger by donating your excess food
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
                        <FoodBankIcon sx={{ color: '#059669' }} /> Food / Meal Details
                    </Typography>

                    {foodItems.map((item, index) => (
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
                                    {foodItems.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveFoodItem(index)}
                                            size="small"
                                            sx={{ color: '#e53935' }}
                                            aria-label="remove food item"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Name<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter food item name"
                                            value={item.mealName}
                                            onChange={(e) => handleFoodItemChange(index, 'mealName', e.target.value)}
                                            error={!!formErrors[`foodItems[${index}].mealName`]}
                                            helperText={formErrors[`foodItems[${index}].mealName`] || ''}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Quantity<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <TextField
                                                sx={{ flex: 1, mb: 2 }}
                                                size="small"
                                                placeholder="Enter quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleFoodItemChange(index, 'quantity', e.target.value)}
                                                error={!!formErrors[`foodItems[${index}].quantity`]}
                                                helperText={formErrors[`foodItems[${index}].quantity`] || ''}
                                                inputProps={{ inputMode: 'numeric' }}
                                            />
                                            <FormControl sx={{ minWidth: 120, mb: 2 }} size="small">
                                                <Select
                                                    value={item.unit}
                                                    onChange={(e) => handleFoodItemChange(index, 'unit', e.target.value)}
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
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Expiry Date<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={item.expiryDate}
                                                onChange={(date) => handleFoodItemChange(index, 'expiryDate', date)}
                                                minDate={dayjs()}
                                                format="DD-MM-YYYY"
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: "small",
                                                        error: !!formErrors[`foodItems[${index}].expiryDate`],
                                                        helperText: formErrors[`foodItems[${index}].expiryDate`] || '',
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                            Expiry Time<span style={{ color: 'red' }}> *</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                value={item.expiryTime}
                                                onChange={(time) => handleFoodItemChange(index, 'expiryTime', time)}
                                                format="HH:mm"
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: "small",
                                                        error: !!formErrors[`foodItems[${index}].expiryTime`],
                                                        helperText: formErrors[`foodItems[${index}].expiryTime`] || '',
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
                        onClick={handleAddFoodItem}
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
                        Contact & Pickup Details
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

                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                                Pickup Location<span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <Box sx={{ border: formErrors.location ? '1px solid #d32f2f' : '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                                <MapSelector value={selectedLocation} onChange={setSelectedLocation} />
                            </Box>
                            {formErrors.location && (
                                <Typography color="error" variant="caption">
                                    {formErrors.location}
                                </Typography>
                            )}
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
                            Submit Donation
                        </Button>
                    </Box>
                </Paper>
            </form>
        </Box>
    );
};

export default DonateFood;