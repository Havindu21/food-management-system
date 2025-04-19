import { Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react'
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
    // Example coordinates (replace with your actual data)
    const location = {
        lat: 6.902299275392892,
        lng: 79.92001463072924,
        address: "Sosage Gedara"
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                width: '100%',
                borderRadius: 2,
                display: 'flex',
                px: { xs: 2, md: 4 },
                py: { xs: 1, md: 3 },
                bgcolor: '#DBEAFE',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography sx={{
                    color: '#537FEF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: { xs: 14, md: 16 },
                }}>
                    <LocalShippingIcon />
                    Status: In Transit
                </Typography>
                <Typography sx={{
                    color: '#537FEF',
                    fontSize: { xs: 14, md: 16 },
                }}>
                    Donation ID: DON-12345
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
                    center={[location.lat, location.lng]}
                    zoom={33}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>
                            {location.address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
            <Grid2 container spacing={2} mt={2}>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
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
                            <Person3Icon sx={{
                                opacity: 0.54
                            }} />
                            <Typography>
                                Chicken Fried Rice
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
                                25 Meals
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
                                Expires: Mar 15, 2025
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
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
                                Hansana - Shanghai Terrace
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
                                251/1, Kaduwela Road, Battaramulla
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => {
                                const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
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
                </Grid2>
            </Grid2>
            <Grid2 container spacing={2} mt={2}>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                    <Button
                        sx={{
                            bgcolor: '#E5E7EB',
                            color: '#5A5A70',
                            width: '100%',
                            height: 50,
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
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                    <Button
                        sx={{
                            bgcolor: '#059669',
                            color: '#FFFFFF',
                            width: '100%',
                            height: 50,
                        }}
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
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default ActivePickups