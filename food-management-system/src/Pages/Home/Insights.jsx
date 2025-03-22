import { Box, Grid2 } from '@mui/material';
import React from 'react';
import { globalMt, globalPx } from '../../Theme/Theme';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaIcon from '@mui/icons-material/Spa';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InsightTile from './InsightTile'; 

const Insights = () => {
    return (
        <Box sx={{
            ...globalPx,
            ...globalMt,
        }}>
            <Grid2 container spacing={{ xs: 2, md: 6 }}>
                {insights.map((tile, index) => (
                    <Grid2 key={index} item size={{ xs: 6, sm: 4, md: 3 }} container justifyContent={'center'}>
                        <InsightTile
                            title={tile.title}
                            image={tile.image}
                            count={tile.count}
                            unit={tile?.unit}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default Insights;

const insights = [
    {
        title: 'Meals Saved',
        image: RestaurantIcon,
        count: '125,000',
    },
    {
        title: 'People Fed',
        image: GroupsIcon,
        count: '45,000',
    },
    {
        title: 'CO2 Emissions Prevented',
        image: SpaIcon,
        count: '75',
        unit: 'tons',
    },
    {
        title: 'Total Donors',
        image: CardMembershipIcon,
        count: '15,000',
    },
    {
        title: 'Volunteers Engaged',
        image: VolunteerActivismIcon,
        count: '5,000',
    },
    {
        title: 'Food Rescued (kg)',
        image: ShoppingCartIcon,
        count: '2,000',
        unit: 'kg',
    },
    {
        title: 'Active Partnerships',
        image: HandshakeIcon,
        count: '300',
    },
    {
        title: 'Deliveries Made',
        image: LocalShippingIcon,
        count: '50,000',
    },
];