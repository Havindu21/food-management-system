import React, { useState } from 'react';
import { Box, Grid, Typography, Skeleton, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DonationCard from '../../Components/DonationCard';
import { showLoadingAnimation, hideLoadingAnimation } from '../../app/loadingAnimationController';
import { showAlertMessage } from '../../app/alertMessageController';
import contributionService from '../../Services/contributionService';

const ContributionsList = ({ contributions, isLoading, error, onStatusUpdate }) => {
    const [selectedContribution, setSelectedContribution] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    
    // Handle opening contribution details dialog
    const handleViewDetails = (contribution) => {
        setSelectedContribution(contribution);
        setOpenDetailsDialog(true);
    };
    
    // Handle closing dialog
    const handleCloseDialog = () => {
        setOpenDetailsDialog(false);
        setSelectedContribution(null);
    };
    
    // Handle accepting a contribution
    const handleAcceptContribution = async (contributionId) => {
        showLoadingAnimation({ message: "Processing contribution acceptance..." });
        try {
            const response = await contributionService.acceptContribution(contributionId);
            if (response && response.success) {
                showAlertMessage({
                    message: "Successfully accepted the contribution. The donor will be notified.",
                    type: "success"
                });
                
                // Update the local state to reflect the change
                onStatusUpdate(contributionId, 'accepted');
                
                // Close the dialog
                handleCloseDialog();
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
        }
    };
    
    // Handle declining a contribution
    const handleDeclineContribution = async (contributionId) => {
        showLoadingAnimation({ message: "Processing decline request..." });
        try {
            const response = await contributionService.declineContribution(contributionId);
            if (response && response.success) {
                showAlertMessage({
                    message: "Successfully declined the contribution. The donor will be notified.",
                    type: "success"
                });
                
                // Update the local state to reflect the change
                onStatusUpdate(contributionId, 'declined');
                
                // Close the dialog
                handleCloseDialog();
            } else {
                throw new Error("Failed to decline contribution");
            }
        } catch (error) {
            console.error("Error declining contribution:", error);
            showAlertMessage({
                message: error.response?.data?.message || "Failed to decline contribution. Please try again.",
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
                {error || "Failed to load contributions. Please try again later."}
            </Alert>
        );
    }
    
    // Render no contributions message
    if (!contributions || contributions.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', my: 6 }}>
                <Typography variant="h5" sx={{ color: '#686D76', mb: 1 }}>
                    No contributions to your requests yet
                </Typography>
                <Typography variant="body1" sx={{ color: '#686D76' }}>
                    When donors contribute to your food requests, they will appear here
                </Typography>
            </Box>
        );
    }
    
    // Status color mapping
    const statusColorMap = {
        pending: '#F59E0B',
        accepted: '#10B981',
        declined: '#EF4444',
        completed: '#3B82F6',
        cancelled: '#6B7280',
    };
    
    // Render contributions list
    return (
        <>
            <Grid container spacing={3}>
                {contributions.map((contribution) => (
                    <Grid item xs={12} sm={6} md={4} key={contribution.id}>
                        <DonationCard
                            title={contribution.foodItemName}
                            subtitle={`For request: ${contribution.requestTitle}`}
                            description={`Offered: ${contribution.contributionAmount}`}
                            donorName={contribution.donorName}
                            date={contribution.dateContributed}
                            status={contribution.status}
                            statusColor={statusColorMap[contribution.status] || '#686D76'}
                            onButtonClick={() => handleViewDetails(contribution)}
                        />
                    </Grid>
                ))}
            </Grid>
            
            {/* Contribution Details Dialog */}
            {selectedContribution && (
                <Dialog
                    open={openDetailsDialog}
                    onClose={handleCloseDialog}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        Contribution Details
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Request:
                            </Typography>
                            <Typography variant="body1">
                                {selectedContribution.requestTitle}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Donor:
                            </Typography>
                            <Typography variant="body1">
                                {selectedContribution.donorName}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Contact Information:
                            </Typography>
                            <Typography variant="body1">
                                Phone: {selectedContribution.donorContact}
                            </Typography>
                            <Typography variant="body1">
                                Email: {selectedContribution.donorEmail}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Contributed Items:
                            </Typography>
                            {selectedContribution.allContributedItems?.map((item, index) => (
                                <Typography key={index} variant="body1">
                                    • {item.mealName}: {item.amount}
                                </Typography>
                            ))}
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Date Contributed:
                            </Typography>
                            <Typography variant="body1">
                                {selectedContribution.dateContributed}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Status:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: statusColorMap[selectedContribution.status] || '#686D76',
                                fontWeight: 500
                            }}>
                                {selectedContribution.status.charAt(0).toUpperCase() + selectedContribution.status.slice(1)}
                            </Typography>
                        </Box>
                        
                        {selectedContribution.notes && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Notes:
                                </Typography>
                                <Typography variant="body1">
                                    {selectedContribution.notes}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        {selectedContribution.status === 'pending' && (
                            <>
                                <Button 
                                    onClick={() => handleDeclineContribution(selectedContribution.id)} 
                                    color="error"
                                    variant="outlined"
                                >
                                    Decline
                                </Button>
                                <Button 
                                    onClick={() => handleAcceptContribution(selectedContribution.id)} 
                                    color="success"
                                    variant="contained"
                                >
                                    Accept
                                </Button>
                            </>
                        )}
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default ContributionsList;