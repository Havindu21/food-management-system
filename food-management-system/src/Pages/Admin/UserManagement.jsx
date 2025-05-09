import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Tabs, Tab, Paper, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Avatar, Chip,
    IconButton, Tooltip, Dialog, DialogActions, DialogContent, 
    DialogTitle, TextField, InputAdornment, Alert, Snackbar, 
    Divider, useMediaQuery, useTheme, Card, CardContent, Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningIcon from '@mui/icons-material/Warning';
import RestoreIcon from '@mui/icons-material/Restore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import userService from '../../Services/userService';
import { showAlertMessage } from '../../app/alertMessageController';
import { showLoadingAnimation, hideLoadingAnimation } from '../../app/loadingAnimationController';

const UserManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for tab selection
  const [tabValue, setTabValue] = useState(0);
  
  // State for donors and recipients
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({ 
    open: false, 
    type: "", 
    user: null, 
    userType: "" 
  });
  
  // State for notification
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch users data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Function to fetch all users
  const fetchUsers = async () => {
    showLoadingAnimation({ message: "Loading users..." });
    try {
            const response = await userService.getAllUsers();
      if (response.success) {
        setDonors(response.data.filter(user => user.userType === "donor"));
        setRecipients(response.data.filter(user => user.userType === "recipient"));
      } else {
        setError("Failed to load users");
        showAlertMessage({ message: "Failed to load users", type: "error" });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("An error occurred while loading users");
      showAlertMessage({ 
        message: error.response?.data?.message || error?.response?.data?.error || "An error occurred while loading users", 
        type: "error" 
      });
    } finally {
      setLoading(false);
      hideLoadingAnimation();
    }
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter users based on search term
  const filteredDonors = donors.filter(donor => 
    donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecipients = recipients.filter(recipient => 
    recipient.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Open confirmation dialog
  const handleConfirmAction = (type, user, userType) => {
    setConfirmDialog({
      open: true,
      type,
      user,
      userType
    });
  };
  
  // Close confirmation dialog
  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ 
      open: false, 
      type: "", 
      user: null, 
      userType: "" 
    });
  };
  
  // Handle user status change
  const handleUserStatusChange = async () => {
    const { type, user, userType } = confirmDialog;
    showLoadingAnimation({ message: `${type === "suspend" ? "Suspending" : "Restoring"} user...` });
    
    try {
      if (type === "suspend") {
        await userService.suspendUser(user._id);
      } else {
        await userService.restoreUser(user._id);
      }
      
      if (userType === "recipient") {
        // Update local state for recipients
        const updatedRecipients = recipients.map(recipient => {
          if (recipient._id === user._id) {
            return { ...recipient, isActive: type === "suspend" ? false : true };
          }
          return recipient;
        });
        setRecipients(updatedRecipients);
      } else if (userType === "donor") {
        // Update local state for donors
        const updatedDonors = donors.map(donor => {
          if (donor._id === user._id) {
            return { ...donor, isActive: type === "suspend" ? false : true };
          }
          return donor;
        });
        setDonors(updatedDonors);
      }
      
      setSnackbar({
        open: true,
        message: `${user.businessName || user.name} has been ${type === "suspend" ? "suspended" : "restored"} successfully.`,
        severity: "success"
      });
      
    } catch (error) {
      console.error(`Error ${type === "suspend" ? "suspending" : "restoring"} user:`, error);
      showAlertMessage({
        message: error.response?.data?.message || error?.response?.data?.error || `Failed to ${type === "suspend" ? "suspend" : "restore"} user. Please try again.`,
        type: "error"
      });
    } finally {
      hideLoadingAnimation();
      handleCloseConfirmDialog();
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to retry loading if there was an error
  const retryLoading = () => {
    setError(null);
    setLoading(true);
    fetchUsers();
  };
  
  // Render user cards for mobile view
  const renderUserCards = (users, userType) => {
    return (
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} key={user._id}>
            <Card sx={{ 
              mb: 2, 
              borderLeft: user.isActive ? '4px solid #059669' : '4px solid #EF4444'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: user.isActive ? '#059669' : '#EF4444', mr: 1 }}>
                      {userType === "donor" ? <LocalShippingIcon /> : <StorefrontIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user.businessName || user.name}
                      </Typography>
                      <Chip 
                        size="small"
                        label={user.isActive ? 'Active' : 'Suspended'}
                        sx={{ 
                          bgcolor: user.isActive ? '#F0FFF4' : '#FEF2F2',
                          color: user.isActive ? '#059669' : '#EF4444',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => handleConfirmAction(
                      user.isActive ? 'suspend' : 'restore',
                      user,
                      userType
                    )}
                  >
                    {user.isActive ? 
                      <BlockIcon sx={{ color: '#EF4444' }} /> : 
                      <RestoreIcon sx={{ color: '#059669' }} />
                    }
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon fontSize="small" sx={{ color: '#6B7280', mr: 1 }} />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ color: '#6B7280', mr: 1 }} />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon fontSize="small" sx={{ color: '#6B7280', mr: 1, mt: 0.3 }} />
                    <Typography variant="body2">{user.address}</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Joined: {formatDate(user.createdAt)}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {userType === "donor" && `${user.donationCount || 0} Donations`}
                    {userType === "recipient" && `${user.receivedCount || 0} Received`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  // Display loading or error states
  if (loading) {
    return (
      <Box sx={{ width: '100%', mb: 6, display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography>Loading users...</Typography>
      </Box>
    );
  }

  if (error && recipients.length === 0 && donors.length === 0) {
    return (
      <Box sx={{ width: '100%', mb: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={retryLoading}
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
          User Management
        </Typography>
        <Typography sx={{
          fontSize: { xs: 14, md: 16 },
          color: '#686D76',
          mb: 2,
        }}>
          Manage donors and recipients on the platform
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9CA3AF' }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
              },
              '& .Mui-selected': {
                color: '#059669',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#059669',
              }
            }}
          >
            <Tab label="Donors" id="donors-tab" />
            <Tab label="Recipients" id="recipients-tab" />
          </Tabs>
        </Box>
      </Box>
      
      {/* Donors Tab Panel */}
      <Box sx={{ mt: 2 }} role="tabpanel" hidden={tabValue !== 0}>
        {tabValue === 0 && (
          filteredDonors.length === 0 ? (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="body1" color="textSecondary">
                No donors found matching your search.
              </Typography>
            </Paper>
          ) : isMobile ? (
            renderUserCards(filteredDonors, "donor")
          ) : (
            <TableContainer component={Paper} sx={{ 
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Donor</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Contact Information</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Joined On</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDonors.map((donor) => (
                    <TableRow key={donor._id} sx={{ '&:hover': { bgcolor: '#F7FAFC' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: donor.isActive ? '#059669' : '#EF4444', mr: 2 }}>
                            <LocalShippingIcon />
                          </Avatar>
                          <Typography sx={{ fontWeight: 500 }}>
                            {donor.businessName || donor.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon fontSize="small" sx={{ color: '#6B7280' }} />
                            <Typography variant="body2">{donor.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" sx={{ color: '#6B7280' }} />
                            <Typography variant="body2">{donor.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(donor.createdAt)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={donor.isActive ? "Active" : "Suspended"}
                          sx={{ 
                            bgcolor: donor.isActive ? '#F0FFF4' : '#FEF2F2',
                            color: donor.isActive ? '#059669' : '#EF4444',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={donor.isActive ? "Suspend User" : "Restore User"}>
                          <IconButton
                            onClick={() => handleConfirmAction(
                              donor.isActive ? "suspend" : "restore",
                              donor,
                              "donor"
                            )}
                            sx={{ 
                              color: donor.isActive ? '#EF4444' : '#059669'
                            }}
                          >
                            {donor.isActive ? <BlockIcon /> : <RestoreIcon />}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        )}
      </Box>
      
      {/* Recipients Tab Panel */}
      <Box sx={{ mt: 2 }} role="tabpanel" hidden={tabValue !== 1}>
        {tabValue === 1 && (
          filteredRecipients.length === 0 ? (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="body1" color="textSecondary">
                No recipients found matching your search.
              </Typography>
            </Paper>
          ) : isMobile ? (
            renderUserCards(filteredRecipients, "recipient")
          ) : (
            <TableContainer component={Paper} sx={{ 
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Organization</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Contact Information</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Joined On</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecipients.map((recipient) => (
                    <TableRow key={recipient._id} sx={{ '&:hover': { bgcolor: '#F7FAFC' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: recipient.isActive ? '#059669' : '#EF4444', mr: 2 }}>
                            <StorefrontIcon />
                          </Avatar>
                          <Typography sx={{ fontWeight: 500 }}>
                            {recipient.businessName || recipient.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon fontSize="small" sx={{ color: '#6B7280' }} />
                            <Typography variant="body2">{recipient.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" sx={{ color: '#6B7280' }} />
                            <Typography variant="body2">{recipient.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(recipient.createdAt)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={recipient.isActive ? "Active" : "Suspended"}
                          sx={{ 
                            bgcolor: recipient.isActive ? '#F0FFF4' : '#FEF2F2',
                            color: recipient.isActive ? '#059669' : '#EF4444',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={recipient.isActive ? "Suspend User" : "Restore User"}>
                          <IconButton
                            onClick={() => handleConfirmAction(
                              recipient.isActive ? "suspend" : "restore",
                              recipient,
                              "recipient"
                            )}
                            sx={{ 
                              color: recipient.isActive ? '#EF4444' : '#059669'
                            }}
                          >
                            {recipient.isActive ? <BlockIcon /> : <RestoreIcon />}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        )}
      </Box>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ 
          bgcolor: confirmDialog.type === "restore" ? '#F0FFF4' : '#FEF2F2', 
          color: confirmDialog.type === "restore" ? '#047857' : '#DC2626', 
          fontWeight: 600 
        }}>
          {confirmDialog.type === "restore" ? "Restore User Access" : "Suspend User Access"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 1, px: 3, mt: 2 }}>
          <Typography variant="body1">
            Are you sure you want to {confirmDialog.type === "restore" ? "restore access for" : "suspend"} <strong>{confirmDialog.user?.businessName || confirmDialog.user?.name}</strong>?
          </Typography>
          
          {confirmDialog.type === "suspend" ? (
            <Alert severity="warning" sx={{ mt: 2, alignItems: 'center' }} icon={<WarningIcon />}>
              This will temporarily prevent the user from accessing the platform and participating in food donation activities.
            </Alert>
          ) : (
            <Alert severity="info" sx={{ mt: 2, alignItems: 'center' }} icon={<CheckCircleIcon />}>
              This will restore the user's access to the platform and allow them to participate in food donation activities.
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseConfirmDialog} sx={{ color: '#4A5568' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleUserStatusChange}
            variant="contained" 
            sx={{
              bgcolor: confirmDialog.type === "restore" ? '#059669' : '#EF4444',
              '&:hover': {
                bgcolor: confirmDialog.type === "restore" ? '#047857' : '#DC2626',
              }
            }}
          >
            {confirmDialog.type === "restore" ? "Restore Access" : "Suspend User"}
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

export default UserManagement;