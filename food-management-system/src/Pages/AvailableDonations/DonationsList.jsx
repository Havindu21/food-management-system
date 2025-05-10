import React, { useState } from 'react';
import { Box, Grid, Typography, Skeleton, Alert } from '@mui/material';
import DetailsCard from '../../Components/DetailsCard';
import { DialogComponents } from './DialogComponents';
import donationService from '../../Services/donationService';
import { showLoadingAnimation, hideLoadingAnimation } from '../../app/loadingAnimationController';
import { showAlertMessage } from '../../app/alertMessageController';

const DonationsList = ({ donations, isLoading, error, onRequestDonation }) => {
    // Dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [requestQuantity, setRequestQuantity] = useState(1);

    // Open details dialog
    const handleOpenDetailsDialog = (donation) => {
        setSelectedDonation(donation);
        setRequestQuantity(1); // Reset quantity on every new dialog
        setOpenDialog(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDonation(null);
    };

    // Handle donation request submission
    const handleSubmitRequest = async () => {
        if (!selectedDonation || requestQuantity <= 0) return;
        
        showLoadingAnimation({ message: "Submitting your request..." });
        
        try {
            // Prepare the request payload
            const requestPayload = {
                donationId: selectedDonation.id,
                foodItemId: selectedDonation.foodItemId,
                quantity: requestQuantity
            };
            
            // Make the API call to request the donation
            const response = await donationService.requestDonation(requestPayload);
            
            if (response && response.success) {
                showAlertMessage({
                    message: "Successfully requested the donation. The donor will contact you shortly.",
                    type: "success"
                });
                
                // Update local state to show that this donation has been requested
                onRequestDonation(selectedDonation.id, selectedDonation.foodItemId);
                
                // Close the dialog
                handleCloseDialog();
            } else {
                throw new Error("Failed to submit donation request");
            }
        } catch (error) {
            console.error("Error requesting donation:", error);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to submit request. Please try again.",
                type: "error"
            });
        } finally {
            hideLoadingAnimation();
        }
    };

    // Render skeleton cards when loading
    if (isLoading) {
        return (
            <Grid container spacing={3}>
                {[...Array(6)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    // Render error message if any
    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error || "Failed to load donations. Please try again later."}
            </Alert>
        );
    }

    // Render no donations message
    if (donations.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', my: 6 }}>
                <Typography variant="h5" sx={{ color: '#686D76', mb: 1 }}>
                    No available donations at the moment
                </Typography>
                <Typography variant="body1" sx={{ color: '#686D76' }}>
                    Check back later for more donations or create a food request
                </Typography>
            </Box>
        );
    }

    // Render donations list
    return (
        <>
            <Grid container spacing={3}>
                {donations.map((donation) => (
                    <Grid item xs={12} sm={6} md={4} key={`${donation.id}-${donation.foodItemId}`}>
                        <DetailsCard
                            title={donation.title}
                            subtitle={donation.name}
                            category={donation.category}
                            quantity={donation.quantity}
                            expiryDate={donation.expiryDate}
                            location={donation.address}
                            postDate={donation.postDate}
                            onClick={() => handleOpenDetailsDialog(donation)}
                            disabled={donation.requested}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Donation Details Dialog */}
            <DialogComponents
                openDialog={openDialog}
                selectedDonation={selectedDonation}
                requestQuantity={requestQuantity}
                setRequestQuantity={setRequestQuantity}
                handleCloseDialog={handleCloseDialog}
                handleSubmitRequest={handleSubmitRequest}
            />
        </>
    );
};

export default DonationsList;