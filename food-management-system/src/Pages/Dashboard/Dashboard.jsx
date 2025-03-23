import { Box, Grid2, Typography } from '@mui/material'
import React from 'react'
import DashboardTile from '../../Components/DashboardTile'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import StarIcon from '@mui/icons-material/Star';
import BasicTable from '../../Components/BasicTable';

const Dashboard = () => {
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
            <Box sx={{ mt: 4, pb: { xs: 4, md: 0 } }}>
                <BasicTable headers={tableHeaders} data={tableData} />
            </Box>
        </Box>
    )
}

export default Dashboard

const tableHeaders = ["Date", "Items", "Quantity", "Status"];
const tableData = [
    { Date: "2025-03-15", Items: "Laptop", Quantity: 3, Status: "Completed" },
    { Date: "2025-03-18", Items: "Mouse", Quantity: 5, Status: "Completed" },
    { Date: "2025-03-19", Items: "Keyboard", Quantity: 2, Status: "Completed" },
    { Date: "2025-03-20", Items: "Monitor", Quantity: 1, Status: "Completed" },
];

const tiles = [
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
]