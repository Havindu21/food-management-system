import { Box, Grid2, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
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
import dashboardService from '../../Services/dashboardService';

const Dashboard = () => {
    const { userType: userRole } = useSelector((state) => state.user.userData);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                let response;
                
                switch (userRole) {
                    case 'admin':
                        response = await dashboardService.getAdminDashboard();
                        break;
                    case 'donor':
                        response = await dashboardService.getDonorDashboard();
                        break;
                    case 'recipient':
                        response = await dashboardService.getRecipientDashboard();
                        break;
                    default:
                        // No valid user role
                        setError('Invalid user role');
                        return;
                }
                
                setDashboardData(response.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Could not load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [userRole]);

    // Define the tiles with icons for each user role
    const getTilesForUserRole = () => {
        if (!dashboardData) {
            // Return empty array if data hasn't loaded yet
            return [];
        }

        if (userRole === 'donor') {
            const { metrics } = dashboardData;
            return [
                {
                    title: 'Total Meals Donated',
                    count: metrics.totalMealsDonated.count,
                    image: RestaurantIcon,
                    trend: metrics.totalMealsDonated.trend
                },
                {
                    title: 'CO2 Emissions Saved',
                    count: metrics.co2EmissionsSaved.count,
                    image: SpaIcon,
                    trend: metrics.co2EmissionsSaved.trend
                },
                {
                    title: 'Donor Rating',
                    count: metrics.rating.count,
                    image: StarIcon,
                    rate: metrics.rating.rate,
                    trend: metrics.rating.trend
                },
            ];
        } else if (userRole === 'recipient') {
            const { metrics } = dashboardData;
            return [
                {
                    title: 'Available Donations',
                    count: metrics.availableDonations.count,
                    image: VolunteerActivismIcon,
                    trend: metrics.availableDonations.trend
                },
                {
                    title: 'Successful Pickups',
                    count: metrics.successfulPickups.count,
                    image: LocalShippingIcon,
                    trend: metrics.successfulPickups.trend
                },
                {
                    title: 'Total Meals Saved',
                    count: metrics.totalMealsSaved.count,
                    image: FoodBankIcon,
                    trend: metrics.totalMealsSaved.trend
                },
            ];
        } else { // admin
            const data = dashboardData;
            return [
                // Row 1: User/Stakeholder metrics
                {
                    title: 'Total Donors',
                    count: data.donors.count,
                    image: PeopleAltIcon,
                    trend: data.donors.trend,
                    trendStyle: 'modern'
                },
                {
                    title: 'Total Recipients',
                    count: data.recipients.count,
                    image: AccessibilityNewIcon,
                    trend: data.recipients.trend,
                    trendStyle: 'modern'
                },
                {
                    title: 'Total Participants',
                    count: data.participants.count,
                    image: GroupsIcon,
                    trend: data.participants.trend,
                    trendStyle: 'modern'
                },
                
                // Row 2: Current Activity metrics
                {
                    title: 'Available Food Donations',
                    count: data.availableDonations.count,
                    image: InventoryIcon,
                    trend: data.availableDonations.trend,
                    trendStyle: 'modern'
                },
                {
                    title: 'Available Food Requests',
                    count: data.availableRequests.count,
                    image: ListAltIcon,
                    trend: data.availableRequests.trend,
                    trendStyle: 'modern'
                },
                {
                    title: 'Active Pickups',
                    count: data.activePickups.count,
                    image: ReceiptLongIcon,
                    trend: data.activePickups.trend,
                    trendStyle: 'modern'
                },
                
                // Row 3: Impact metrics
                {
                    title: 'CO2 Emissions Saved',
                    count: data.co2Saved.count,
                    image: SpaIcon,
                    trend: data.co2Saved.trend,
                    trendStyle: 'modern'
                },
                {
                    title: 'Total Meals Saved',
                    count: data.mealsSaved.count,
                    image: RestaurantMenuIcon,
                    trend: data.mealsSaved.trend,
                    trendStyle: 'modern'
                },
                {
                    title: 'Successful Pickups',
                    count: data.successfulPickups.count,
                    image: LocalShippingIcon,
                    trend: data.successfulPickups.trend,
                    trendStyle: 'modern'
                },
            ];
        }
    };
    
    // Get table data based on user role
    const getTableData = () => {
        if (!dashboardData) {
            return { headers: [], data: [] };
        }
        
        if (userRole === 'donor') {
            return {
                headers: ["Date", "Items", "Quantity", "Status"],
                data: dashboardData.donationHistory || []
            };
        } else if (userRole === 'recipient') {
            return {
                headers: ['Item', 'Quantity', 'Expiry Date', 'Donor'],
                data: dashboardData.availableDonations || []
            };
        }
        
        return { headers: [], data: [] };
    };
    
    const tiles = !loading && dashboardData ? getTilesForUserRole() : [];
    const { headers: tableHeaders, data: tableData } = !loading && dashboardData ? getTableData() : { headers: [], data: [] };

    if (loading) {
        return (
            <Box sx={{ width: '100%', py: 4, textAlign: 'center' }}>
                <Typography>Loading dashboard data...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ width: '100%', py: 4, textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography sx={{
                fontSize: { xs: 20, md: 22 },
                fontWeight: { xs: 500, md: 600 },
                color: '#3F4F44',
            }}>
                Welcome back
            </Typography>
            <Typography sx={{
                fontSize: { xs: 14, md: 16 },
                color: '#686D76',
            }}>
                Here&apos;s the impact overview of the platform
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
                    {tableData.length > 0 && <BasicTable headers={tableHeaders} data={tableData} />}
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard