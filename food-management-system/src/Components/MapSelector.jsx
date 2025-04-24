import React, { useEffect, useState } from 'react';
import {
    Box, Dialog, DialogContent, IconButton, TextField, Autocomplete, InputAdornment,
} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const LocationMarker = ({ onSelect }) => {
    const [position, setPosition] = useState(null);
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    onSelect({
                        address: data.display_name || '',
                        latitude: lat,
                        longitude: lng,
                    });
                });
        },
    });
    return position ? <Marker position={position} icon={customIcon} /> : null;
};

const MapMover = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) map.setView([coords.lat, coords.lon], 13);
    }, [coords]);
    return null;
};

const MapSelector = ({ value, onChange }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cityInput, setCityInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 7.8731, lon: 80.7718 });

    useEffect(() => {
        if (cityInput.length > 2) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityInput}&limit=5`)
                .then(res => res.json())
                .then(setSearchResults);
        }
    }, [cityInput]);

    const handleSelect = (val) => {
        setMapCenter({ lat: parseFloat(val.lat), lon: parseFloat(val.lon) });
    };

    const handleMapSelect = (locationData) => {
        onChange(locationData);
        setDialogOpen(false);
    };

    return (
        <>
            <TextField
                fullWidth
                value={value?.address || ''}
                InputProps={{
                    readOnly: true, // Prevent typing
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setDialogOpen(true)}>
                                <RoomIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onClick={() => setDialogOpen(true)} // Optional: open on whole field click
                sx={{
                    cursor: 'pointer', // Looks clickable
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'inherit', // Keep text color when disabled (if you try that route)
                    },
                }}
            />
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogContent>
                    <Autocomplete
                        options={searchResults}
                        getOptionLabel={(option) => option.display_name}
                        onInputChange={(e, val) => setCityInput(val)}
                        onChange={(e, val) => val && handleSelect(val)}
                        renderInput={(params) => (
                            <TextField {...params} label="Search your town/city" fullWidth sx={{ mb: 2 }} />
                        )}
                    />

                    <MapContainer center={[mapCenter.lat, mapCenter.lon]} zoom={13} style={{ height: '400px' }}>
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapMover coords={mapCenter} />
                        <LocationMarker onSelect={handleMapSelect} />
                    </MapContainer>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MapSelector;
