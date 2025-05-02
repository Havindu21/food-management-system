import { Box, Button, Grid, Typography, List, ListItem, ListItemText, Divider, Avatar, Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Person3Icon from '@mui/icons-material/Person3';
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
    // Mock donation data for demonstration
    const [donations, setDonations] = useState([
        {
            id: "DON-12345",
            status: "Ready for Pickup",
            donorName: "Hansana - Shanghai Terrace",
            address: "251/1, Kaduwela Road, Battaramulla",
            contactNumber: "+94771234567",
            mealName: "Chicken Fried Rice",
            quantity: "25 Meals",
            expiry: "Mar 15, 2025",
            location: {
                lat: 6.902299275392892,
                lng: 79.92001463072924,
                address: "Shanghai Terrace, Battaramulla"
            },
            requestDate: "Mar 10, 2024"
        },
        {
            id: "DON-12346",
            status: "Ready for Pickup",
            donorName: "Grand Monarch Hotel",
            address: "189 Galle Road, Colombo 03",
            contactNumber: "+94112345678",
            mealName: "Vegetable Curry & Rice",
            quantity: "15 Meals",
            expiry: "Mar 14, 2024",
            location: {
                lat: 6.914422,
                lng: 79.847163,
                address: "Grand Monarch Hotel, Colombo"
            },
            requestDate: "Mar 9, 2024"
        },
        {
            id: "DON-12347",
            status: "In Transit",
            donorName: "Chillax Cafe",
            address: "42 Park Street, Colombo 02",
            contactNumber: "+94776543210",
            mealName: "Pasta & Sandwiches",
            quantity: "10 Meals",
            expiry: "Mar 13, 2024",
            location: {
                lat: 6.927079,
                lng: 79.863244,
                address: "Chillax Cafe, Colombo"
            },
            requestDate: "Mar 8, 2024"
        }
    ]);
    
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [showList, setShowList] = useState(true);

    // Handle click on a donation from the list
    const handleDonationClick = (donation) => {
        setSelectedDonation(donation);
        setShowList(false);
    };

    // Handle going back to list view
    const handleBackToList = () => {
        setShowList(true);
        setSelectedDonation(null);
    };

    // Handle marking a donation as completed
    const handleMarkAsCompleted = (donationId) => {
        setDonations(donations.map(donation => 
            donation.id === donationId 
                ? {...donation, status: "Completed"} 
                : donation
        ));
        setShowList(true);
    };

    // Render list of active pickups
    const renderDonationsList = () => {
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
                    {donations.filter(d => d.status !== "Completed").length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                No active pickups at the moment
                            </Typography>
                        </Box>
                    ) : (
                        donations.filter(d => d.status !== "Completed").map((donation, index) => (
                            <Card 
                                key={donation.id} 
                                sx={{ 
                                    mb: 2, 
                                    cursor: 'pointer', 
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } 
                                }}
                                onClick={() => handleDonationClick(donation)}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography sx={{ fontWeight: 500 }}>
                                            {donation.donorName}
                                        </Typography>
                                        <Box sx={{
                                            bgcolor: donation.status === "In Transit" ? '#DBEAFE' : '#F0FFF4',
                                            color: donation.status === "In Transit" ? '#537FEF' : '#059669',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: 12,
                                        }}>
                                            {donation.status}
                                        </Box>
                                    </Box>
                                    
                                    <Divider sx={{ my: 1 }} />
                                    
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <RestaurantIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">{donation.mealName}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <BentoIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">{donation.quantity}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarMonthIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">Expires: {donation.expiry}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AccessTimeIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                                <Typography variant="body2">Requested: {donation.requestDate}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    
                                    <Divider sx={{ my: 1 }} />
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationOnIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                        <Typography variant="body2" noWrap>{donation.address}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </List>
            </Box>
        )
    };

    // Render donation detail view
    const renderDonationDetail = () => {
        if (!selectedDonation) return null;
        
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
                    bgcolor: selectedDonation.status === "In Transit" ? '#DBEAFE' : '#F0FFF4',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        color: selectedDonation.status === "In Transit" ? '#537FEF' : '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        <LocalShippingIcon />
                        Status: {selectedDonation.status}
                    </Typography>
                    <Typography sx={{
                        color: selectedDonation.status === "In Transit" ? '#537FEF' : '#059669',
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        Donation ID: {selectedDonation.id}
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
                        center={[selectedDonation.location.lat, selectedDonation.location.lng]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[selectedDonation.location.lat, selectedDonation.location.lng]}>
                            <Popup>
                                {selectedDonation.location.address}
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
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <RestaurantIcon sx={{
                                    opacity: 0.54
                                }} />
                                <Typography>
                                    {selectedDonation.mealName}
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
                                    {selectedDonation.quantity}
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
                                    Expires: {selectedDonation.expiry}
                                </Typography>
                            </Box>
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
                                    {selectedDonation.donorName}
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
                                    {selectedDonation.address}
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => {
                                    const googleMapsUrl = `https://www.google.com/maps?q=${selectedDonation.location.lat},${selectedDonation.location.lng}`;
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
                                alert(`Contact donor at: ${selectedDonation.contactNumber}`);
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
                                <CallIcon sx={{color:'#5A5A70'}} />
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
                            onClick={() => handleMarkAsCompleted(selectedDonation.id)}
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
            {showList ? renderDonationsList() : renderDonationDetail()}
        </>
    )
}

export default ActivePickups