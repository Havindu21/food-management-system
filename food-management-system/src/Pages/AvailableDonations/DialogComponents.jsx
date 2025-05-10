import React from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box, Divider, TextField, InputAdornment,
    Slider, IconButton, Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MapSelector from '../../Components/MapSelector';

// Dialog for donation details and request submission
export const DialogComponents = ({ 
    openDialog, 
    selectedDonation, 
    requestQuantity,
    setRequestQuantity, 
    handleCloseDialog,
    handleSubmitRequest 
}) => {
    // Guards against null selectedDonation
    if (!selectedDonation) {
        return null;
    }

    // Calculate maximum quantity that can be requested (from raw quantity)
    const maxQuantity = selectedDonation?.rawQuantity || 1;
    
    // Handle quantity input change
    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setRequestQuantity('');
        } else {
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                setRequestQuantity(Math.min(Math.max(parsedValue, 1), maxQuantity));
            }
        }
    };

    // Handle slider change
    const handleSliderChange = (event, newValue) => {
        setRequestQuantity(newValue);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ pb: 0 }}>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: 600, 
                        color: '#059669',
                    }}
                >
                    {selectedDonation?.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Donation from {selectedDonation?.name}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PersonIcon sx={{ mr: 1, color: '#059669' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Donor
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                {selectedDonation?.name}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon sx={{ mr: 1, color: '#059669' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Contact Number
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                {selectedDonation?.contactNumber || selectedDonation?.donorPhone || 'Not provided'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <DateRangeIcon sx={{ mr: 1, color: '#059669' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Post Date
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                {selectedDonation?.postDate || 'Not specified'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <AccessTimeIcon sx={{ mr: 1, color: '#059669' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Expiry Details
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                Date: {selectedDonation?.expiryDate || 'Not specified'}
                            </Typography>
                            <Typography variant="body1">
                                Time: {selectedDonation?.expiryTime || 'Not specified'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOnIcon sx={{ mr: 1, color: '#059669' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Location
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                {selectedDonation?.address || 'Location not specified'}
                            </Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Box sx={{ height: 250, mb: 3 }}>
                            <MapSelector 
                                latitude={selectedDonation?.latitude} 
                                longitude={selectedDonation?.longitude}
                                readOnly={true}
                            />
                        </Box>
                        
                        <Divider sx={{ mb: 3 }} />
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Available Quantity: {selectedDonation?.quantity}
                            </Typography>
                            
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Request Quantity:
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TextField
                                    value={requestQuantity}
                                    onChange={handleQuantityChange}
                                    type="number"
                                    InputProps={{
                                        endAdornment: selectedDonation?.unit !== 'none' ? (
                                            <InputAdornment position="end">{selectedDonation?.unit}</InputAdornment>
                                        ) : null,
                                        inputProps: { min: 1, max: maxQuantity }
                                    }}
                                    size="small"
                                    sx={{ width: 120, mr: 1 }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Max: {maxQuantity}
                                </Typography>
                            </Box>
                            
                            <Slider
                                value={typeof requestQuantity === 'number' ? requestQuantity : 1}
                                min={1}
                                max={maxQuantity}
                                onChange={handleSliderChange}
                                sx={{
                                    color: '#059669',
                                    '& .MuiSlider-thumb': {
                                        height: 24,
                                        width: 24,
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button 
                    onClick={handleCloseDialog}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmitRequest}
                    variant="contained"
                    sx={{
                        bgcolor: '#059669',
                        '&:hover': {
                            bgcolor: '#047857',
                        }
                    }}
                    disabled={selectedDonation?.requested}
                >
                    Request Donation
                </Button>
            </DialogActions>
        </Dialog>
    );
};