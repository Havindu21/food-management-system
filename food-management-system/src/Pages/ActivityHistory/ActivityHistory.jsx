import { Box, Button, InputAdornment, TextField, Typography, Card, CardContent, Grid, Divider, Chip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import EventIcon from '@mui/icons-material/Event'
import BentoIcon from '@mui/icons-material/Bento'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import VerifiedIcon from '@mui/icons-material/Verified'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import activityService from '../../Services/activityService'
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation'

// Fix for default marker icons in React Leaflet
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ActivityHistory = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showList, setShowList] = useState(true);

    // Fetch activity history data
    useEffect(() => {
        const fetchActivityHistory = async () => {
            try {
                setLoading(true);
                const response = await activityService.getActivityHistory();
                setActivities(response.data || []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch activity history:", err);
                setError("Failed to load your activity history. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchActivityHistory();
    }, []);

    // Handle click on an activity from the list
    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
        setShowList(false);
    };

    // Handle going back to list view
    const handleBackToList = () => {
        setShowList(true);
        setSelectedActivity(null);
    };

    // Get appropriate icon for each activity type
    const getActivityIcon = (type, status) => {
        switch (type) {
            case 'donation_pickup':
                return status === 'completed' ? <CheckCircleIcon sx={{ color: '#059669' }} /> : <CancelIcon sx={{ color: '#DC2626' }} />;
            case 'donation_claim':
                return <ShoppingBasketIcon sx={{ color: '#3B82F6' }} />;
            case 'contribution_received':
                return <ReceiptLongIcon sx={{ color: '#8B5CF6' }} />;
            case 'contribution_accepted':
                return <ThumbUpIcon sx={{ color: '#059669' }} />;
            case 'contribution_rejected':
                return <ThumbDownIcon sx={{ color: '#DC2626' }} />;
            case 'contribution_completed':
                return <VerifiedIcon sx={{ color: '#059669' }} />;
            case 'request_created':
                return <RestaurantIcon sx={{ color: '#3B82F6' }} />;
            case 'request_fulfilled':
                return <AssignmentTurnedInIcon sx={{ color: '#059669' }} />;
            default:
                return <EventIcon sx={{ color: '#6B7280' }} />;
        }
    };

    // Get background color based on activity status
    const getStatusBackgroundColor = (status) => {
        switch (status) {
            case 'completed':
                return '#F0FFF4';
            case 'cancelled':
                return '#FEF2F2';
            case 'accepted':
                return '#EFF6FF';
            case 'rejected':
                return '#FEF2F2';
            case 'active':
                return '#F0FDF4';
            default:
                return '#F3F4F6';
        }
    };

    // Get text color based on activity status
    const getStatusTextColor = (status) => {
        switch (status) {
            case 'completed':
                return '#059669';
            case 'cancelled':
                return '#DC2626';
            case 'accepted':
                return '#3B82F6';
            case 'rejected':
                return '#DC2626';
            case 'active':
                return '#059669';
            default:
                return '#6B7280';
        }
    };

    // Filter activities based on selected tab and search term
    const filteredActivities = activities.filter(activity => {
        const matchesTab = selectedTab === 'All' || 
                          (selectedTab === 'Completed' && ['completed', 'accepted', 'fulfilled'].includes(activity.status)) ||
                          (selectedTab === 'Cancelled' && ['cancelled', 'rejected'].includes(activity.status));
        
        const matchesSearch = activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             activity.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             activity.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (activity.details?.foodItems && 
                              activity.details.foodItems.some(item => 
                                item.name.toLowerCase().includes(searchTerm.toLowerCase())
                              ));
        
        return matchesTab && matchesSearch;
    });

    // Render list of activities
    const renderActivitiesList = () => {
        if (loading) {
            return <LoadingAnimation />;
        }

        if (error) {
            return (
                <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f9fafb', borderRadius: 2 }}>
                    <Typography variant="subtitle1" color="error">{error}</Typography>
                </Box>
            );
        }

        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{
                        fontSize: { xs: 24, md: 28 },
                        fontWeight: 700,
                        color: '#059669',
                        mb: 1,
                    }}>
                        Activity History
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: '#686D76',
                        mb: 2,
                    }}>
                        View your past activities and their details
                    </Typography>
                    <Divider sx={{ mb: 4 }} />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 2,
                    mb: 3,
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                    }}>
                        {['All', 'Completed', 'Cancelled'].map((text) => (
                            <Button key={text} sx={{
                                borderRadius: 8,
                                bgcolor: selectedTab === text ? '#059669' : '#E5E7EB',
                            }}
                                onClick={() => setSelectedTab(text)}
                            >
                                <Typography sx={{
                                    color: selectedTab === text ? '#FFFFFF' : '#000000',
                                    textTransform: 'none',
                                    py: { xs: 0, sm: 0.5, },
                                    px: { xs: 0.3, sm: 1.5, },
                                    fontSize: { xs: 14, md: 16 },
                                }}>
                                    {text}
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                    <TextField
                        size="small"
                        placeholder="Search activities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            minWidth: { xs: '100%', sm: 300 },
                            maxWidth: 300,
                            '& .MuiOutlinedInput-root': {
                                height: 50,
                                borderRadius: 3,
                            },
                        }}
                    />
                </Box>

                {filteredActivities.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f9fafb', borderRadius: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            No activity history found
                        </Typography>
                    </Box>
                ) : (
                    filteredActivities.map((activity) => (
                        <Card 
                            key={activity.id} 
                            sx={{ 
                                mb: 2, 
                                cursor: 'pointer', 
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } 
                            }}
                            onClick={() => handleActivityClick(activity)}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {activity.title}
                                    </Typography>
                                    <Box sx={{
                                        bgcolor: getStatusBackgroundColor(activity.status),
                                        color: getStatusTextColor(activity.status),
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontSize: 12,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}>
                                        {getActivityIcon(activity.type, activity.status)}
                                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ my: 1 }} />
                                
                                <Grid container spacing={2}>
                                    {activity.donorName && (
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <RestaurantIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">{activity.donorName}</Typography>
                                            </Box>
                                        </Grid>
                                    )}
                                    
                                    {activity.details?.foodItems && activity.details.foodItems.length > 0 && (
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <BentoIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">
                                                    {activity.details.foodItems[0].name}
                                                    {activity.details.foodItems.length > 1 ? ` + ${activity.details.foodItems.length - 1} more` : ''}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    )}
                                    
                                    {activity.formattedDate && (
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EventIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">Date: {activity.formattedDate}</Typography>
                                            </Box>
                                        </Grid>
                                    )}
                                    
                                    <Grid item xs={6}>
                                        <Typography variant="body2" sx={{ 
                                            color: '#6B7280', 
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <Chip 
                                                size="small" 
                                                label={activity.type.split('_').map(word => 
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')} 
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                                <Divider sx={{ my: 1 }} />
                                
                                {activity.details?.location && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationOnIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                        <Typography variant="body2" noWrap>{activity.details.location}</Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        );
    };

    // Render activity detail view
    const renderActivityDetail = () => {
        if (!selectedActivity) return null;
        
        const hasLocation = selectedActivity.details?.location && 
                          typeof selectedActivity.details.location === 'object' && 
                          selectedActivity.details.location.lat && 
                          selectedActivity.details.location.lng;
        
        return (
            <Box sx={{ width: '100%' }}>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={handleBackToList}
                    sx={{ mb: 2 }}
                >
                    Back to History
                </Button>
                
                <Box sx={{
                    width: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    px: { xs: 2, md: 4 },
                    py: { xs: 1, md: 3 },
                    bgcolor: getStatusBackgroundColor(selectedActivity.status),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        color: getStatusTextColor(selectedActivity.status),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        {getActivityIcon(selectedActivity.type, selectedActivity.status)}
                        Status: {selectedActivity.status.charAt(0).toUpperCase() + selectedActivity.status.slice(1)}
                    </Typography>
                    <Typography sx={{
                        color: getStatusTextColor(selectedActivity.status),
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        Activity ID: {selectedActivity.id}
                    </Typography>
                </Box>
                
                {hasLocation && (
                    <Box sx={{
                        width: '100%',
                        height: { xs: 300, sm: 400 },
                        mt: 2,
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}>
                        <MapContainer
                            center={[selectedActivity.details.location.lat, selectedActivity.details.location.lng]}
                            zoom={15}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[selectedActivity.details.location.lat, selectedActivity.details.location.lng]}>
                                <Popup>
                                    {selectedActivity.details.location.address || selectedActivity.details.location}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                )}
                
                <Grid container spacing={2} mt={2}>
                    {/* Activity Detail Information */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                px: { xs: 2, md: 3 },
                                py: { xs: 1, md: 2 },
                                bgcolor: '#FFFFFF',
                                borderRadius: 2,
                                border: '1px solid #EEEEEE',
                                height: '100%',
                            }}
                        >
                            <Typography fontWeight={500}>
                                {selectedActivity.title} Details
                            </Typography>
                            
                            {selectedActivity.details?.foodItems && selectedActivity.details.foodItems.length > 0 && (
                                <>
                                    <Typography variant="subtitle2" color="text.secondary">Food Items:</Typography>
                                    {selectedActivity.details.foodItems.map((item, index) => (
                                        <Box key={index} sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center',
                                            pl: 2,
                                        }}>
                                            <BentoIcon sx={{ opacity: 0.54 }} />
                                            <Typography>
                                                {item.name} - {item.quantity || 'N/A'} {item.status ? `(${item.status})` : ''}
                                            </Typography>
                                        </Box>
                                    ))}
                                </>
                            )}
                            
                            {selectedActivity.details?.contributedItems && selectedActivity.details.contributedItems.length > 0 && (
                                <>
                                    <Typography variant="subtitle2" color="text.secondary">Contributed Items:</Typography>
                                    {selectedActivity.details.contributedItems.map((item, index) => (
                                        <Box key={index} sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center',
                                            pl: 2,
                                        }}>
                                            <BentoIcon sx={{ opacity: 0.54 }} />
                                            <Typography>
                                                {item.name} - {item.quantity || 'N/A'}
                                            </Typography>
                                        </Box>
                                    ))}
                                </>
                            )}
                            
                            {selectedActivity.details?.foodRequests && selectedActivity.details.foodRequests.length > 0 && (
                                <>
                                    <Typography variant="subtitle2" color="text.secondary">Requested Items:</Typography>
                                    {selectedActivity.details.foodRequests.map((item, index) => (
                                        <Box key={index} sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center',
                                            pl: 2,
                                        }}>
                                            <BentoIcon sx={{ opacity: 0.54 }} />
                                            <Typography>
                                                {item.name} - {item.quantity || 'N/A'}
                                            </Typography>
                                        </Box>
                                    ))}
                                </>
                            )}
                            
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <EventIcon sx={{ opacity: 0.54 }} />
                                <Typography>
                                    Date: {selectedActivity.formattedDate}
                                </Typography>
                            </Box>
                            
                            {selectedActivity.details?.deadline && (
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                }}>
                                    <EventIcon sx={{ opacity: 0.54 }} />
                                    <Typography>
                                        Deadline: {new Date(selectedActivity.details.deadline).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    
                    {/* Donor/Request Information */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                px: { xs: 2, md: 3 },
                                py: { xs: 1, md: 2 },
                                bgcolor: '#FFFFFF',
                                borderRadius: 2,
                                border: '1px solid #EEEEEE',
                                height: '100%',
                            }}
                        >
                            <Typography fontWeight={500}>
                                {selectedActivity.donorName ? 'Donor Information' : 'Request Information'}
                            </Typography>
                            
                            {selectedActivity.donorName && (
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                }}>
                                    <RestaurantIcon sx={{ opacity: 0.54 }} />
                                    <Typography>
                                        {selectedActivity.donorName}
                                    </Typography>
                                </Box>
                            )}
                            
                            {selectedActivity.details?.title && (
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                }}>
                                    <RestaurantIcon sx={{ opacity: 0.54 }} />
                                    <Typography>
                                        {selectedActivity.details.title}
                                    </Typography>
                                </Box>
                            )}
                            
                            {selectedActivity.details?.description && (
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'flex-start',
                                }}>
                                    <RestaurantIcon sx={{ opacity: 0.54, mt: 0.5 }} />
                                    <Typography>
                                        {selectedActivity.details.description}
                                    </Typography>
                                </Box>
                            )}
                            
                            {selectedActivity.details?.location && typeof selectedActivity.details.location === 'string' && (
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                }}>
                                    <LocationOnIcon sx={{ opacity: 0.54 }} />
                                    <Typography>
                                        {selectedActivity.details.location}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                
                {/* Status Box */}
                <Box sx={{ 
                    mt: 3, 
                    p: 2, 
                    bgcolor: getStatusBackgroundColor(selectedActivity.status), 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    {getActivityIcon(selectedActivity.type, selectedActivity.status)}
                    <Typography sx={{ color: getStatusTextColor(selectedActivity.status) }}>
                        {selectedActivity.title} on {selectedActivity.formattedDate}
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <>
            {showList ? renderActivitiesList() : renderActivityDetail()}
        </>
    );
};

export default ActivityHistory;
