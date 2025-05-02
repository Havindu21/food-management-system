import { Box, Button, InputAdornment, TextField, Typography, Card, CardContent, Grid, Divider, Chip } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EventIcon from '@mui/icons-material/Event';
import BentoIcon from '@mui/icons-material/Bento';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

const PickupHistory = () => {
    // Mock data for past pickups
    const [pastPickups, setPastPickups] = useState([
        {
            id: "DON-10001",
            status: "Completed",
            donorName: "Sathkara Foundation",
            mealName: "Chicken",
            quantity: "25 kg",
            date: "Jan 15, 2025",
            category: "Food Item",
            address: "171 Sir James Pieris Mawatha, Colombo 02",
            location: {
                lat: 6.921789,
                lng: 79.856163,
                address: "Colombo 02"
            }
        },
        {
            id: "DON-10002",
            status: "Completed",
            donorName: "Api Foundation",
            mealName: "Egg Fried Rice",
            quantity: "50 meals",
            date: "Jan 10, 2025",
            category: "Meal Packs",
            address: "Shantha Villa, 588 10th Mile Post Rd, Malabe",
            location: {
                lat: 6.906449,
                lng: 79.958242,
                address: "Malabe"
            }
        },
        {
            id: "DON-10003",
            status: "Completed",
            donorName: "Caritas Sri Lanka",
            mealName: "Rice and Curry",
            quantity: "25 meals",
            date: "Jan 5, 2025",
            category: "Meal Packs",
            address: "133 Kynsey Road, Colombo 08",
            location: {
                lat: 6.910839,
                lng: 79.867112,
                address: "Colombo 08"
            }
        },
        {
            id: "DON-10004",
            status: "Cancelled",
            donorName: "Api Foundation",
            mealName: "Pasta",
            quantity: "25 meals",
            date: "Dec 28, 2024",
            category: "Meal Packs",
            address: "Shantha Villa, 588 10th Mile Post Rd, Malabe",
            location: {
                lat: 6.906449,
                lng: 79.958242,
                address: "Malabe"
            }
        },
    ]);
    
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [showList, setShowList] = useState(true);

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

    // Filter pickups based on selected tab and search term
    const filteredPickups = pastPickups.filter(pickup => {
        const matchesTab = selectedTab === 'All' || 
                          (selectedTab === 'Completed' && pickup.status === 'Completed') ||
                          (selectedTab === 'Cancelled' && pickup.status === 'Cancelled');
        
        const matchesSearch = pickup.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             pickup.mealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             pickup.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesTab && matchesSearch;
    });

    // Render list of past pickups
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
                        Pickup History
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: '#686D76',
                        mb: 2,
                    }}>
                        View your past donation pickups and their details
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
                        placeholder="Search pickups..."
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

                {filteredPickups.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f9fafb', borderRadius: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            No pickup history found
                        </Typography>
                    </Box>
                ) : (
                    filteredPickups.map((pickup) => (
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
                                        bgcolor: pickup.status === "Completed" ? '#F0FFF4' : '#FEF2F2',
                                        color: pickup.status === "Completed" ? '#059669' : '#DC2626',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontSize: 12,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}>
                                        {pickup.status === "Completed" ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                        {pickup.status}
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ my: 1 }} />
                                
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <RestaurantIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                            <Typography variant="body2">{pickup.mealName}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <BentoIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                            <Typography variant="body2">{pickup.quantity}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EventIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                            <Typography variant="body2">Date: {pickup.date}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" sx={{ 
                                            color: '#6B7280', 
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <Chip size="small" label={pickup.category} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                                <Divider sx={{ my: 1 }} />
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocationOnIcon fontSize="small" sx={{ opacity: 0.6 }} />
                                    <Typography variant="body2" noWrap>{pickup.address}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
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
                    Back to History
                </Button>
                
                <Box sx={{
                    width: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    px: { xs: 2, md: 4 },
                    py: { xs: 1, md: 3 },
                    bgcolor: selectedPickup.status === "Completed" ? '#F0FFF4' : '#FEF2F2',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        color: selectedPickup.status === "Completed" ? '#059669' : '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: 14, md: 16 },
                    }}>
                        {selectedPickup.status === "Completed" ? <CheckCircleIcon /> : <CancelIcon />}
                        Status: {selectedPickup.status}
                    </Typography>
                    <Typography sx={{
                        color: selectedPickup.status === "Completed" ? '#059669' : '#DC2626',
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
                            <Typography fontWeight={500}>
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
                                    {selectedPickup.mealName}
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
                                    {selectedPickup.quantity}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <EventIcon sx={{
                                    opacity: 0.54
                                }} />
                                <Typography>
                                    Pickup Date: {selectedPickup.date}
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
                            <Typography fontWeight={500}>
                                Donor Information
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
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <Chip 
                                    size="small" 
                                    label={selectedPickup.category} 
                                    sx={{ 
                                        bgcolor: '#E6FFFA', 
                                        color: '#047857',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                
                {selectedPickup.status === "Completed" && (
                    <Box sx={{ 
                        mt: 3, 
                        p: 2, 
                        bgcolor: '#F0FFF4', 
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <CheckCircleIcon sx={{ color: '#059669' }} />
                        <Typography sx={{ color: '#059669' }}>
                            This pickup was completed successfully on {selectedPickup.date}
                        </Typography>
                    </Box>
                )}
                
                {selectedPickup.status === "Cancelled" && (
                    <Box sx={{ 
                        mt: 3, 
                        p: 2, 
                        bgcolor: '#FEF2F2', 
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <CancelIcon sx={{ color: '#DC2626' }} />
                        <Typography sx={{ color: '#DC2626' }}>
                            This pickup was cancelled on {selectedPickup.date}
                        </Typography>
                    </Box>
                )}
            </Box>
        )
    };

    return (
        <>
            {showList ? renderPickupsList() : renderPickupDetail()}
        </>
    )
}

export default PickupHistory
