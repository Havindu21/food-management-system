import { Box, Button, Grid, Typography, List, Divider, Card, CardContent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import BentoIcon from '@mui/icons-material/Bento';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsIcon from '@mui/icons-material/Directions';
import CallIcon from '@mui/icons-material/Call';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import pickupService from '../../Services/pickupService';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../reducers/loaderSlice';
import { showAlertMessage } from '../../app/alertMessageController';

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

const ActivePickups = () => {
    const [pickups, setPickups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [showList, setShowList] = useState(true);
    const dispatch = useDispatch();

    // Fetch active pickups from the API
    useEffect(() => {
        const fetchActivePickups = async () => {
            try {
                setIsLoading(true);
                const response = await pickupService.getActivePickups();
                if (response.success) {
                    // Filter donations and keep only the "claimed" food items in each donation
                    const filteredDonations = response.data.map(pickup => {
                        // Create a new object with all the original donation properties
                        const filteredPickup = { ...pickup };

                        // Replace the foodItems array with only the "claimed" food items
                        filteredPickup.foodItems = pickup.foodItems ?
                            pickup.foodItems.filter(item => item.status === "claimed") :
                            [];

                        return filteredPickup;
                    }).filter(pickup => pickup.foodItems.length > 0); // Optionally remove donations with no claimed items

                    // The result will be an array of donations where each donation's foodItems array 
                    // contains only the food items with status "claimed"
                    setPickups(filteredDonations);
                    console.log('pickups', filteredDonations);

                }
            } catch (error) {
                console.error("Failed to fetch active pickups:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivePickups();

    }, []);

    // Handle click on a pickup from the list
    const handlePickupClick = (pickup) => {
        setSelectedPickup(pickup);
        setShowList(false);
    };

    // Handle going back to list view
    const handleBackToList = () => {
        setShowList(true);
        setSelectedPickup(null);
    };

    // Handle marking a pickup as completed
    const handleMarkAsCompleted = async (pickupId) => {
        try {
            dispatch(showLoading({ message: 'Completing pickup...' }));

            // Determine if this is a donation or contribution pickup based on ID format
            // This is a simplified approach - adjust based on your actual ID format
            const isDonation = pickupId.startsWith('DON-');

            let response;
            if (isDonation) {
                response = await pickupService.completeDonationPickup(pickupId);
            } else {
                response = await pickupService.completeContributionPickup(pickupId);
            }

            if (response.success) {
                // Remove the completed pickup from the list
                setPickups(pickups.filter(pickup => pickup.id !== pickupId));
                dispatch(showAlertMessage({
                    message: 'Pickup marked as completed successfully',
                    type: "success",
                }));
                setShowList(true);
            }
        } catch (error) {
            console.error("Failed to mark pickup as completed:", error);
        } finally {
            dispatch(hideLoading());
        }
    };

    // Render list of active pickups
    const renderPickupsList = () => {
        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{
                        fontSize: { xs: 24, md: 28 },
                        fontWeight: 700,
                        color: '#059669',
                        mb: 1,
                    }}>
                        Active Pickups
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: '#686D76',
                        mb: 2,
                    }}>
                        Donations ready for pickup based on your requests
                    </Typography>
                    <Divider sx={{ mb: 4 }} />
                </Box>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {isLoading ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Loading active pickups...
                            </Typography>
                        </Box>
                    ) : pickups.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                No active pickups at the moment
                            </Typography>
                        </Box>
                    ) : (
                        pickups.map((pickup) => (
                            <Card
                                key={pickup.id}
                                sx={{
                                    mb: 2,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                                }}
                                onClick={() => handlePickupClick(pickup)}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography sx={{ fontWeight: 500 }}>
                                            {pickup.donorName}
                                        </Typography>
                                        <Box sx={{
                                            bgcolor: pickup.status === "In Transit" ? '#DBEAFE' : '#F0FFF4',
                                            color: pickup.status === "In Transit" ? '#537FEF' : '#059669',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: 12,
                                        }}>
                                            {pickup.status}
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 1 }} />

                                    {pickup.foodItems.map((item, index) => (
                                        <Grid container key={index} spacing={2} mt={index > 0 ? 1 : 0}>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <RestaurantIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                    <Typography variant="body2">{item.mealName}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BentoIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                    <Typography variant="body2">{item.quantity} {item.unit === 'none' ? '' : item.unit} </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CalendarMonthIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                    <Typography variant="body2">Expires: {item.expiryDate}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AccessTimeIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                    <Typography variant="body2">Requested: {pickup.requestDate}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    ))}

                                    <Divider sx={{ my: 1 }} />

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationOnIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                        <Typography variant="body2" noWrap>{pickup.address}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </List >
            </Box >
        )
    };

    // Render pickup detail view
    const renderPickupDetail = () => {
        if (!selectedPickup) return null;

        return (
            <Box sx={{ width: '100%' }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackToList}
                    sx={{ mb: 2 }}
                >
                    Back to List
                </Button>

                <Box sx={{
                    width: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    px: { xs: 2, md: 4 },
                    py: { xs: 1, md: 3 },
                    bgcolor: selectedPickup.status === "In Transit" ? '#DBEAFE' : '#F0FFF4',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        color: selectedPickup.status === "In Transit" ? '#537FEF' : '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        <LocalShippingIcon />
                        Status: {selectedPickup.status}
                    </Typography>
                    <Typography sx={{
                        color: selectedPickup.status === "In Transit" ? '#537FEF' : '#059669',
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        Pickup ID: {selectedPickup.id}
                    </Typography>
                </Box>

                <Box sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400 },
                    mt: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}>
                    <MapContainer
                        center={[selectedPickup.location.lat, selectedPickup.location.lng]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[selectedPickup.location.lat, selectedPickup.location.lng]}>
                            <Popup>
                                {selectedPickup.location.address}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>

                <Grid container spacing={2} mt={2}>
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
                            <Typography>
                                Donation Information
                            </Typography>
                            {selectedPickup.foodItems.map((item, index) => (
                                <>
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'center',
                                    }}>
                                        <RestaurantIcon sx={{
                                            opacity: 0.54
                                        }} />
                                        <Typography>
                                            {item.mealName}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'center',
                                    }}>
                                        <BentoIcon sx={{
                                            opacity: 0.54
                                        }} />
                                        <Typography>
                                            {item.quantity}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'center',
                                    }}>
                                        <CalendarMonthIcon sx={{
                                            opacity: 0.54
                                        }} />
                                        <Typography>
                                            Expires: {item.expiryDate}
                                        </Typography>
                                    </Box>
                                </>
                            ))}
                        </Box>
                    </Grid>
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
                            <Typography>
                                Contact Information
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <HomeIcon sx={{
                                    opacity: 0.54
                                }} />
                                <Typography>
                                    {selectedPickup.donorName}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <LocationOnIcon sx={{
                                    opacity: 0.54
                                }} />
                                <Typography>
                                    {selectedPickup.address}
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => {
                                    const googleMapsUrl = `https://www.google.com/maps?q=${selectedPickup.location.lat},${selectedPickup.location.lng}`;
                                    window.open(googleMapsUrl, '_blank');
                                }}
                                sx={{
                                    bgcolor: '#059669',
                                    color: '#FFFFFF',
                                    width: 200,
                                    mt: 1,
                                }}
                            >
                                <Typography sx={{
                                    textTransform: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <DirectionsIcon />
                                    Get Directions
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            sx={{
                                bgcolor: '#E5E7EB',
                                color: '#5A5A70',
                                width: '100%',
                                height: 50,
                            }}
                            onClick={() => {
                                // In a real app, this would open a dialer or messaging system
                                alert(`Contact donor at: ${selectedPickup.contactNumber}`);
                            }}
                        >
                            <Typography sx={{
                                textTransform: 'none',
                                fontSize: { xs: 14, sm: 18 },
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <CallIcon sx={{ color: '#5A5A70' }} />
                                Contact Donor
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            sx={{
                                bgcolor: '#059669',
                                color: '#FFFFFF',
                                width: '100%',
                                height: 50,
                            }}
                            onClick={() => handleMarkAsCompleted(selectedPickup.id)}
                        >
                            <Typography sx={{
                                textTransform: 'none',
                                fontSize: { xs: 14, sm: 18 },
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                                <CheckIcon />
                                Mark as Completed
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    };

    return (
        <>
            {showList ? renderPickupsList() : renderPickupDetail()}
        </>
    )
}

export default ActivePickups;