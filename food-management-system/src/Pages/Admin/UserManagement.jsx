import React, { useState } from 'react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for tab selection
  const [tabValue, setTabValue] = useState(0);
  
  // Mock data for donors
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "Green Foods Restaurant",
      email: "contact@greenfoods.com",
      phone: "+94771234567",
      address: "45 Green Lane, Colombo, Sri Lanka",
      joinDate: "2023-05-15",
      donationCount: 28,
      status: "active"
    },
    {
      id: 2,
      name: "Fresh Harvest Supermarket",
      email: "support@freshharvest.com",
      phone: "+94777654321",
      address: "120 Market Street, Kandy, Sri Lanka",
      joinDate: "2023-06-20",
      donationCount: 15,
      status: "active"
    },
    {
      id: 3,
      name: "Royal Bakery",
      email: "info@royalbakery.com",
      phone: "+94712345678",
      address: "67 Main Road, Galle, Sri Lanka",
      joinDate: "2023-07-10",
      donationCount: 12,
      status: "suspended"
    },
    {
      id: 4,
      name: "Sunny Day Catering",
      email: "bookings@sunnyday.com",
      phone: "+94765432198",
      address: "32 Beach Road, Negombo, Sri Lanka",
      joinDate: "2023-08-05",
      donationCount: 8,
      status: "active"
    }
  ]);
  
  // Mock data for recipients
  const [recipients, setRecipients] = useState([
    {
      id: 1,
      name: "Community Welfare Center",
      email: "community@welfare.org",
      phone: "+94771234567",
      address: "123 Main St, Colombo, Sri Lanka",
      joinDate: "2023-04-15",
      receivedCount: 32,
      status: "active"
    },
    {
      id: 2,
      name: "Happy Kids Foundation",
      email: "info@happykids.org",
      phone: "+94777654321",
      address: "45 Park Avenue, Kandy, Sri Lanka",
      joinDate: "2023-05-10",
      receivedCount: 24,
      status: "active"
    },
    {
      id: 3,
      name: "Golden Age Care Home",
      email: "contact@goldenage.org",
      phone: "+94712345678",
      address: "78 Beach Road, Galle, Sri Lanka",
      joinDate: "2023-06-05",
      receivedCount: 18,
      status: "suspended"
    },
    {
      id: 4,
      name: "Hope Shelter",
      email: "help@hopeshelter.org",
      phone: "+94765432198",
      address: "15 Hill Street, Nuwara Eliya, Sri Lanka",
      joinDate: "2023-07-20",
      receivedCount: 10,
      status: "active"
    }
  ]);
  
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
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecipients = recipients.filter(recipient => 
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleUserStatusChange = () => {
    const { type, user, userType } = confirmDialog;
    
    if (userType === "donor") {
      const updatedDonors = donors.map(donor => {
        if (donor.id === user.id) {
          return { ...donor, status: type === "suspend" ? "suspended" : "active" };
        }
        return donor;
      });
      setDonors(updatedDonors);
    } else if (userType === "recipient") {
      const updatedRecipients = recipients.map(recipient => {
        if (recipient.id === user.id) {
          return { ...recipient, status: type === "suspend" ? "suspended" : "active" };
        }
        return recipient;
      });
      setRecipients(updatedRecipients);
    }
    
    setSnackbar({
      open: true,
      message: `${user.name} has been ${type === "suspend" ? "suspended" : "restored"} successfully.`,
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
  
  // Render user cards for mobile view
  const renderUserCards = (users, userType) => {
    return (
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} key={user.id}>
            <Card sx={{ 
              mb: 2, 
              borderLeft: user.status === 'suspended' ? '4px solid #EF4444' : '4px solid #059669'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: user.status === 'suspended' ? '#EF4444' : '#059669', mr: 1 }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user.name}
                      </Typography>
                      <Chip 
                        size="small"
                        label={user.status === 'active' ? 'Active' : 'Suspended'}
                        sx={{ 
                          bgcolor: user.status === 'active' ? '#F0FFF4' : '#FEF2F2',
                          color: user.status === 'active' ? '#059669' : '#EF4444',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => handleConfirmAction(
                      user.status === 'active' ? 'suspend' : 'restore',
                      user,
                      userType
                    )}
                  >
                    {user.status === 'active' ? 
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
                    Joined: {formatDate(user.joinDate)}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {userType === "donor" 
                      ? `${user.donationCount} Donations` 
                      : `${user.receivedCount} Received`
                    }
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
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
                    <TableCell sx={{ fontWeight: 600 }}>Organization</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Contact Information</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Joined On</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Donations</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDonors.map((donor) => (
                    <TableRow key={donor.id} sx={{ '&:hover': { bgcolor: '#F7FAFC' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: donor.status === "active" ? '#059669' : '#EF4444', mr: 2 }}>
                            <PersonIcon />
                          </Avatar>
                          <Typography sx={{ fontWeight: 500 }}>
                            {donor.name}
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
                      <TableCell>{formatDate(donor.joinDate)}</TableCell>
                      <TableCell>{donor.donationCount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={donor.status === "active" ? "Active" : "Suspended"}
                          sx={{ 
                            bgcolor: donor.status === "active" ? '#F0FFF4' : '#FEF2F2',
                            color: donor.status === "active" ? '#059669' : '#EF4444',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={donor.status === "active" ? "Suspend User" : "Restore User"}>
                          <IconButton
                            onClick={() => handleConfirmAction(
                              donor.status === "active" ? "suspend" : "restore",
                              donor,
                              "donor"
                            )}
                            sx={{ 
                              color: donor.status === "active" ? '#EF4444' : '#059669'
                            }}
                          >
                            {donor.status === "active" ? <BlockIcon /> : <RestoreIcon />}
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
                    <TableCell sx={{ fontWeight: 600 }}>Received</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id} sx={{ '&:hover': { bgcolor: '#F7FAFC' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: recipient.status === "active" ? '#059669' : '#EF4444', mr: 2 }}>
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
                            <EmailIcon fontSize="small" sx={{ color: '#6B7280' }} />
                            <Typography variant="body2">{recipient.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" sx={{ color: '#6B7280' }} />
                            <Typography variant="body2">{recipient.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(recipient.joinDate)}</TableCell>
                      <TableCell>{recipient.receivedCount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={recipient.status === "active" ? "Active" : "Suspended"}
                          sx={{ 
                            bgcolor: recipient.status === "active" ? '#F0FFF4' : '#FEF2F2',
                            color: recipient.status === "active" ? '#059669' : '#EF4444',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={recipient.status === "active" ? "Suspend User" : "Restore User"}>
                          <IconButton
                            onClick={() => handleConfirmAction(
                              recipient.status === "active" ? "suspend" : "restore",
                              recipient,
                              "recipient"
                            )}
                            sx={{ 
                              color: recipient.status === "active" ? '#EF4444' : '#059669'
                            }}
                          >
                            {recipient.status === "active" ? <BlockIcon /> : <RestoreIcon />}
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
            Are you sure you want to {confirmDialog.type === "restore" ? "restore access for" : "suspend"} <strong>{confirmDialog.user?.name}</strong>?
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