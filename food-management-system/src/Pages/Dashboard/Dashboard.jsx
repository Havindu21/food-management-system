import { Box, Grid2, Typography } from '@mui/material'
import React from 'react'
import DashboardTile from '../../Components/DashboardTile'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import StarIcon from '@mui/icons-material/Star';
import BasicTable from '../../Components/BasicTable';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const Dashboard = () => {
    const userRole = localStorage.getItem('userRole');
    const tiles = userRole === 'Don' ? [
        {
            title: 'Total Meals Donated',
            count: '12,458',
            image: RestaurantIcon,
        },
        {
            title: 'CO2 Emissions Saved',
            count: '2.4 tons',
            image: SpaIcon,
        },
        {
            title: 'Total Meals Donated',
            count: '4.5/5.0',
            image: StarIcon,
            rate: 4.5,
        },
    ] : userRole === 'Rec' ? [
        {
            title: 'Available Donations',
            count: '3',
            image: VolunteerActivismIcon,
        },
        {
            title: 'Successful Pickups',
            count: '156',
            image: LocalShippingIcon,
        },
        {
            title: 'Total Meals Saved',
            count: '500 meals',
            image: FoodBankIcon,
        },
    ] : []
    const tableHeaders = userRole === 'Don' ? ["Date", "Items", "Quantity", "Status"] : userRole === 'Rec' ? ['Item', 'Quantity', 'Expiry Date', 'Donor', 'Action'] : [];
    const tableData = userRole === 'Don' ? [
        { Date: "2025-03-15", Items: "Laptop", Quantity: 3, Status: "Completed" },
        { Date: "2025-03-18", Items: "Mouse", Quantity: 5, Status: "Completed" },
        { Date: "2025-03-19", Items: "Keyboard", Quantity: 2, Status: "Completed" },
        { Date: "2025-03-20", Items: "Monitor", Quantity: 1, Status: "Completed" },
    ] : userRole === 'Rec' ? [
        { Item: "Fresh Bread", Quantity: "50 Loaves", 'Expiry Date': 'Today', Donor: "Hansana Sandipa", Action: 'Request Pickup' },
        { Item: "Mixed Vegetables", Quantity: "200 kg", 'Expiry Date': '3 Days', Donor: "Fresh Market", Action: 'Request Pickup' },
        { Item: "Chicken Rice", Quantity: "50 meals", 'Expiry Date': 'Tomorrow', Donor: "Hansana Sandipa", Action: 'Request Pickup' },
    ] : [];

    return (
        <Box sx={{ width: '100%' }}>
            <Typography sx={{
                fontSize: { xs: 20, md: 22 },
                fontWeight: { xs: 500, md: 600 },
                color: '#3F4F44',
            }}>
                Welcome back, Hansana
            </Typography>
            <Typography sx={{
                fontSize: { xs: 14, md: 16 },
                color: '#686D76',
            }}>
                Here's your donation impact overview
            </Typography>
            <Grid2 container spacing={4} sx={{
                mt: 4,
            }}>
                {tiles.map((tile, index) => (
                    <Grid2 key={index} item size={{ xs: 14, sm: 6, md: 4 }}>
                        <DashboardTile tile={tile} />
                    </Grid2>
                ))}
            </Grid2>
            <Box sx={{
                bgcolor: '#FFFFFF',
                ...(userRole === 'Rec' && { p: 1, mt: 4, })
            }}>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    mt: 2,
                    ml: 1,
                    display: userRole === 'Rec' ? 'flex' : 'none',
                }}>
                    AvailableDonations
                </Typography>
                <Box sx={{ mt: 4, pb: { xs: 4, md: 0 }, }}>
                    <BasicTable headers={tableHeaders} data={tableData} />
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard