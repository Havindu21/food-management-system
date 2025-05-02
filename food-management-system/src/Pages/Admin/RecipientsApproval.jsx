import React, { useState } from 'react';
import {
    Box, Typography, Button, Grid, Paper, Card, CardContent, Divider, 
    Chip, Avatar, Dialog, DialogActions, DialogContent, 
    DialogTitle, Alert, Snackbar, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Tooltip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RecipientsApproval = () => {
  // Mock data for recipients awaiting approval
  const [pendingRecipients, setPendingRecipients] = useState([
    {
      id: 1,
      name: "Community Welfare Center",
      email: "community@welfare.org",
      phone: "+94771234567",
      address: "123 Main St, Colombo, Sri Lanka",
      latitude: 6.9271,
      longitude: 79.8612,
      submissionDate: "2023-11-15",
      documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      status: "pending"
    },
    {
      id: 2,
      name: "Happy Kids Foundation",
      email: "info@happykids.org",
      phone: "+94777654321",
      address: "45 Park Avenue, Kandy, Sri Lanka",
      latitude: 7.2906,
      longitude: 80.6337,
      submissionDate: "2023-11-10",
      documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      status: "pending"
    },
    {
      id: 3,
      name: "Golden Age Care Home",
      email: "contact@goldenage.org",
      phone: "+94712345678",
      address: "78 Beach Road, Galle, Sri Lanka",
      latitude: 6.0328,
      longitude: 80.2170,
      submissionDate: "2023-11-05",
      documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      status: "pending"
    }
  ]);

  // State for document preview dialog
  const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: "", recipient: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Open document preview
  const handleViewDocument = (recipient) => {
    setSelectedDocument(recipient.documentUrl);
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
  const handleRecipientStatus = () => {
    const { type, recipient } = confirmDialog;
    const updatedRecipients = pendingRecipients.map(item => {
      if (item.id === recipient.id) {
        return { ...item, status: type };
      }
      return item;
    });
    
    setPendingRecipients(updatedRecipients.filter(item => item.id !== recipient.id));
    
    setSnackbar({
      open: true,
      message: `${recipient.name} has been ${type === "approved" ? "approved" : "rejected"} successfully.`,
      severity: "success"
    });
    
    handleCloseConfirmDialog();
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
                <TableRow key={recipient.id} sx={{ '&:hover': { bgcolor: '#F7FAFC' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#059669', mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography sx={{ fontWeight: 500 }}>
                        {recipient.name}
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
                      label={formatDate(recipient.submissionDate)}
                      sx={{ bgcolor: '#F0FFF4', color: '#22543D' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Document">
                      <IconButton 
                        onClick={() => handleViewDocument(recipient)}
                        sx={{ color: '#059669' }}
                      >
                        <DescriptionIcon />
                      </IconButton>
                    </Tooltip>
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
          <span>Verification Document - {selectedRecipient?.name}</span>
          <IconButton onClick={handleCloseDocumentDialog} size="small">
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '70vh' }}>
          {selectedDocument && (
            <iframe 
              src={selectedDocument} 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }} 
              title="Verification Document"
            />
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
            Are you sure you want to {confirmDialog.type === "approved" ? "approve" : "reject"} <strong>{confirmDialog.recipient?.name}</strong> as a recipient organization?
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
            sx={{
              bgcolor: confirmDialog.type === "approved" ? '#059669' : '#EF4444',
              '&:hover': {
                bgcolor: confirmDialog.type === "approved" ? '#047857' : '#DC2626',
              }
            }}
          >
            {confirmDialog.type === "approved" ? "Approve" : "Reject"}
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