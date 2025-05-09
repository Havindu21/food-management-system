import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Grid, Paper, Card, CardContent, Divider,
  Chip, Avatar, Dialog, DialogActions, DialogContent,
  DialogTitle, Alert, Snackbar, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Tooltip,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import userService from '../../Services/userService';


const RecipientsApproval = () => {
  // State for pending recipients
  const [pendingRecipients, setPendingRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for document preview dialog
  const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: "", recipient: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch unverified recipients on component mount
  useEffect(() => {
    fetchUnverifiedRecipients();
  }, []);

  // Function to fetch unverified recipients
  const fetchUnverifiedRecipients = async () => {
    setLoading(true);
    try {
      const response = await userService.getUnverifiedRecipients();
      if (response.success) {
        setPendingRecipients(response.data);
      } else {
        setError("Failed to load recipients");
      }
    } catch (error) {
      console.error("Error fetching unverified recipients:", error);
      setError("An error occurred while loading recipients");
    } finally {
      setLoading(false);
    }
  };

  // Open document preview
  const handleViewDocument = (recipient) => {
    setSelectedDocument(recipient.verificationDocument);
    setSelectedRecipient(recipient);
    setOpenDocumentDialog(true);
  };

  // Close document preview
  const handleCloseDocumentDialog = () => {
    setOpenDocumentDialog(false);
  };

  // Open confirmation dialog
  const handleConfirmAction = (type, recipient) => {
    setConfirmDialog({
      open: true,
      type: type,
      recipient: recipient
    });
  };

  // Close confirmation dialog
  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ open: false, type: "", recipient: null });
  };

  // Handle approval or rejection
  const handleRecipientStatus = async () => {
    const { type, recipient } = confirmDialog;
    setLoading(true);

    try {
      if (type === "approved") {
        await userService.approveRecipient(recipient._id);
      } else {
        await userService.rejectRecipient(recipient._id);
      }

      // Update local state by removing the processed recipient
      setPendingRecipients(prevRecipients =>
        prevRecipients.filter(item => item._id !== recipient._id)
      );

      setSnackbar({
        open: true,
        message: `${recipient.businessName || recipient.name} has been ${type === "approved" ? "approved" : "rejected"} successfully.`,
        severity: "success"
      });

    } catch (error) {
      console.error(`Error ${type === "approved" ? "approving" : "rejecting"} recipient:`, error);
      setSnackbar({
        open: true,
        message: `Failed to ${type === "approved" ? "approve" : "reject"} recipient. Please try again.`,
        severity: "error"
      });
    } finally {
      setLoading(false);
      handleCloseConfirmDialog();
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && pendingRecipients.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#059669' }} />
      </Box>
    );
  }

  if (error && pendingRecipients.length === 0) {
    return (
      <Box sx={{ width: '100%', mb: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={fetchUnverifiedRecipients}
          sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' } }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontSize: { xs: 24, md: 28 },
          fontWeight: 700,
          color: '#059669',
          mb: 1,
        }}>
          Recipients Approval
        </Typography>
        <Typography sx={{
          fontSize: { xs: 14, md: 16 },
          color: '#686D76',
          mb: 2,
        }}>
          Review and approve recipient organizations requesting to join the platform
        </Typography>
        <Divider sx={{ mb: 4 }} />
      </Box>

      {pendingRecipients.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No pending recipient approval requests.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          mb: 4
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                <TableCell sx={{ fontWeight: 600 }}>Organization</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contact Information</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submission Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRecipients.map((recipient) => (
                <TableRow key={recipient._id} sx={{ '&:hover': { bgcolor: '#F7FAFC' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#059669', mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography sx={{ fontWeight: 500 }}>
                        {recipient.businessName || recipient.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon fontSize="small" sx={{ color: '#059669' }} />
                        <Typography variant="body2">{recipient.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon fontSize="small" sx={{ color: '#059669' }} />
                        <Typography variant="body2">{recipient.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon fontSize="small" sx={{ color: '#059669' }} />
                        <Typography variant="body2" sx={{
                          maxWidth: '200px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {recipient.address}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={formatDate(recipient.createdAt)}
                      sx={{ bgcolor: '#F0FFF4', color: '#22543D' }}
                    />
                  </TableCell>
                  <TableCell>
                    {recipient.verificationDocument ? (
                      <Tooltip title="View Document">
                        <IconButton
                          onClick={() => handleViewDocument(recipient)}
                          sx={{ color: '#059669' }}
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Chip
                        label="No Document"
                        sx={{ bgcolor: '#FEF2F2', color: '#B91C1C' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Approve">
                        <IconButton
                          onClick={() => handleConfirmAction("approved", recipient)}
                          sx={{ color: '#059669' }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton
                          onClick={() => handleConfirmAction("rejected", recipient)}
                          sx={{ color: '#EF4444' }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Document Preview Dialog */}
      <Dialog
        open={openDocumentDialog}
        onClose={handleCloseDocumentDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#F0FFF4', color: '#047857', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Verification Document - {selectedRecipient?.businessName || selectedRecipient?.name}</span>
          <IconButton onClick={handleCloseDocumentDialog} size="small">
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '70vh' }}>
          {selectedDocument ? (
            <Box
              component="img"
              src={`http://localhost:5001/uploads/${selectedDocument}`}
              alt="Verification Document"
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="body1" color="textSecondary">
                No document available for preview
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              handleCloseDocumentDialog();
              handleConfirmAction("rejected", selectedRecipient);
            }}
            sx={{
              borderColor: '#EF4444',
              color: '#EF4444',
              '&:hover': { borderColor: '#DC2626', bgcolor: 'rgba(239, 68, 68, 0.04)' }
            }}
            startIcon={<CancelIcon />}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCloseDocumentDialog();
              handleConfirmAction("approved", selectedRecipient);
            }}
            sx={{
              bgcolor: '#059669',
              '&:hover': { bgcolor: '#047857' }
            }}
            startIcon={<CheckCircleIcon />}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: confirmDialog.type === "approved" ? '#F0FFF4' : '#FEF2F2', color: confirmDialog.type === "approved" ? '#047857' : '#DC2626', fontWeight: 600 }}>
          {confirmDialog.type === "approved" ? "Approve Recipient" : "Reject Recipient"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 1, px: 3, mt: 2 }}>
          <Typography variant="body1">
            Are you sure you want to {confirmDialog.type === "approved" ? "approve" : "reject"} <strong>{confirmDialog.recipient?.businessName || confirmDialog.recipient?.name}</strong> as a recipient organization?
          </Typography>
          {confirmDialog.type === "rejected" && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Rejection will remove this organization from the pending list. They may reapply with correct documentation.
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseConfirmDialog} sx={{ color: '#4A5568' }}>
            Cancel
          </Button>
          <Button
            onClick={handleRecipientStatus}
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: confirmDialog.type === "approved" ? '#059669' : '#EF4444',
              '&:hover': {
                bgcolor: confirmDialog.type === "approved" ? '#047857' : '#DC2626',
              }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (confirmDialog.type === "approved" ? "Approve" : "Reject")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecipientsApproval;