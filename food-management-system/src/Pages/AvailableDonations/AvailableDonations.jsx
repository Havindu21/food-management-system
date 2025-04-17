import React from 'react';
import { Box, Grid2, MenuItem, Select, TextField, Typography } from '@mui/material';
import DonationCard from '../../Components/DonationCard';

const AvailableDonations = () => {
    const [category, setCategory] = React.useState('');
    const [sort, setSort] = React.useState('');

    return (
        <Box
            sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 4,
                borderRadius: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    bgcolor: '#FFFFFF',
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Search Donations..."
                    variant="outlined"
                    fullWidth
                    size='small'
                />
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    size='small'
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="clothes">Clothes</MenuItem>
                    <MenuItem value="medicine">Medicine</MenuItem>
                </Select>
                <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    displayEmpty
                    size='small'
                >
                    <MenuItem value="">Sort By</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="urgent">Most Urgent</MenuItem>
                </Select>
            </Box>
            <Grid2 container spacing={4} mt={4}>
                {donationsCards.map((card, index) => (
                    <Grid2 item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <DonationCard data={card} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default AvailableDonations;

const donationsCards = [
    {
        category: 'Meal packs',
        title: 'Chicken Fried rice',
        name: 'Hansana - Shanghai Terrace',
        count: '25 meals',
        date: 'Expires : Mar 15,2025',
        address: '251/1 Kaduwela Road, Battaramulla',
        status: 'Mark in Transit',
    },
    {
        category: 'Food items',
        title: 'Mixed Vegetables',
        name: 'Upul - Upul Traders',
        count: '20 kg',
        date: 'Expires : Mar 12,2025',
        address: '251/1 Dematagoda Road, Dematagoda',
        status: 'Request Pickup',
    },
    {
        category: 'Food Items',
        title: 'Yoghurt Cups',
        name: 'Harsha',
        count: '100 meals',
        date: 'Expires : Mar 14,2025',
        address: '251 Dewman Palace, Battaramulla',
        status: 'Request Pickup',
    },
]
