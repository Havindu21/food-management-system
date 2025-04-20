import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import DetailsCard from '../../Components/DetailsCard';

const PickupHistory = () => {
    const [selectedTab, setSelectedTab] = useState('All Donations');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                mx: { xs: -2, md: -3 },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                bgcolor: '#FFFFFF',
                px: 4,
                py: 2,
                gap: 3,
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                }}>
                    {['All Donations', 'Completed', 'Cancelled'].map((text, index) => (
                        <Button key={index} sx={{
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
                    placeholder="Search donations..."
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
            {pickupHistory.map((card, index) => (
                <DetailsCard card={card} key={index} />
            ))}
        </Box>
    )
}

export default PickupHistory

const pickupHistory = [
    {
        title: 'Sathkara Foundation',
        status: 'Completed',
        details: [
            {
                title: 'Date',
                Description: 'Jan 15, 2025',
            },
            {
                title: 'Category',
                Description: 'Food Item',
            },
            {
                title: 'Items',
                Description: 'Chicken',
            },
            {
                title: 'Quantity',
                Description: '25 kg',
            },
            {
                title: 'Location',
                Description: '171 Sir James Pieris Mawatha, Colombo 02',
            },
        ],
    },
    {
        title: 'Api Foundation',
        status: 'Completed',
        details: [
            {
                title: 'Date',
                Description: 'Jan 15, 2025',
            },
            {
                title: 'Category',
                Description: 'Meal Packs',
            },
            {
                title: 'Items',
                Description: 'Egg Fried Rice',
            },
            {
                title: 'Quantity',
                Description: '50 meals',
            },
            {
                title: 'Location',
                Description: 'Shantha Villa, 588 10th Mile Post Rd, Malabe',
            },
        ],
    },
    {
        title: 'Caritas Sri Lanka',
        status: 'Completed',
        details: [
            {
                title: 'Date',
                Description: 'Jan 15, 2025',
            },
            {
                title: 'Category',
                Description: 'Meal Packs',
            },
            {
                title: 'Items',
                Description: 'Rice and Curry',
            },
            {
                title: 'Quantity',
                Description: '25 meals',
            },
            {
                title: 'Location',
                Description: '133 Kynsey Road, Colombo 08',
            },
        ],
    },
    {
        title: 'Api Foundation',
        status: 'Cancelled',
        details: [
            {
                title: 'Date',
                Description: 'Jan 15, 2025',
            },
            {
                title: 'Category',
                Description: 'Meal Packs',
            },
            {
                title: 'Items',
                Description: 'Pasta',
            },
            {
                title: 'Quantity',
                Description: '25 meals',
            },
            {
                title: 'Location',
                Description: 'Shantha Villa, 588 10th Mile Post Rd, Malabe',
            },
        ],
    },
];
