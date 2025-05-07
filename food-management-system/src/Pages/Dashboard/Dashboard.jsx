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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { userType: userRole } = useSelector((state) => state.user);
    // Define the tiles for each user role
    const tiles = userRole === 'Don' ? [
        {
            title: 'Total Meals Donated',
            count: '500',
            image: RestaurantIcon,
            trend: 12
        },
        {
            title: 'CO2 Emissions Saved',
            count: '850 kg',
            image: SpaIcon,
            trend: 8
        },
        {
            title: 'Total Meals Donated',
            count: '4.5/5.0',
            image: StarIcon,
            rate: 4.5,
            trend: 5
        },
    ] : userRole === 'Rec' ? [
        {
            title: 'Available Donations',
            count: '3',
            image: VolunteerActivismIcon,
            trend: 20
        },
        {
            title: 'Successful Pickups',
            count: '156',
            image: LocalShippingIcon,
            trend: 15
        },
        {
            title: 'Total Meals Saved',
            count: '500 meals',
            image: FoodBankIcon,
            trend: 10
        },
    ] : [
        // Row 1: User/Stakeholder metrics
        {
            title: 'Total Donors',
            count: '125',
            image: PeopleAltIcon,
            trend: 8,
            trendStyle: 'modern'
        },
        {
            title: 'Total Recipients',
            count: '42',
            image: AccessibilityNewIcon,
            trend: 15,
            trendStyle: 'modern'
        },
        {
            title: 'Total Participants',
            count: '167',
            image: GroupsIcon,
            trend: 12,
            trendStyle: 'modern'
        },
        
        // Row 2: Current Activity metrics
        {
            title: 'Available Food Donations',
            count: '18',
            image: InventoryIcon,
            trend: 25,
            trendStyle: 'modern'
        },
        {
            title: 'Available Food Requests',
            count: '7',
            image: ListAltIcon,
            trend: 14,
            trendStyle: 'modern'
        },
        {
            title: 'Active Pickups',
            count: '5',
            image: ReceiptLongIcon,
            trend: 10,
            trendStyle: 'modern'
        },
        
        // Row 3: Impact metrics
        {
            title: 'CO2 Emissions Saved',
            count: '4,250 kg',
            image: SpaIcon,
            trend: 9,
            trendStyle: 'modern'
        },
        {
            title: 'Total Meals Saved',
            count: '2,850',
            image: RestaurantMenuIcon,
            trend: 12,
            trendStyle: 'modern'
        },
        {
            title: 'Successful Pickups',
            count: '342',
            image: LocalShippingIcon,
            trend: 17,
            trendStyle: 'modern'
        },
    ];
    
    const tableHeaders = userRole === 'Don' ? ["Date", "Items", "Quantity", "Status"] : userRole === 'Rec' ? ['Item', 'Quantity', 'Expiry Date', 'Donor', 'Action'] : [];
    const tableData = userRole === 'Don' ? [
        { Date: "2025-03-15", Items: "Rice and Curry (Chicken)", Quantity: "30 meals", Status: "Completed" },
        { Date: "2025-03-18", Items: "Chicken Fried Rice", Quantity: "25 meals", Status: "Completed" },
        { Date: "2025-03-19", Items: "White Rice", Quantity: "20kg", Status: "Completed" },
        { Date: "2025-03-20", Items: "Lentils", Quantity: "20kg", Status: "Completed" },
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
                Welcome back, Admin
            </Typography>
            <Typography sx={{
                fontSize: { xs: 14, md: 16 },
                color: '#686D76',
            }}>
                Here's the impact overview of the platform
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
                <Box sx={{ mt: 4, pb: { xs: 4, md: 0 }, display: userRole === 'admin' ? 'none' : 'block' }}>
                    <BasicTable headers={tableHeaders} data={tableData} />
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard