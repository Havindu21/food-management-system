import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import SideImage1 from '../assets/SideImage1.png';
import SideImage2 from '../assets/SignInImage.png';
import { Outlet } from 'react-router-dom';

const RegistrationLayout = () => {
    const randomImage = useMemo(() => (Math.random() < 0.5 ? SideImage1 : SideImage2), []);

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
        }}>
            <Box sx={{
                width: { xs: '100vw', md: '50vw' },
            }}>
                <Outlet />
            </Box>
            <Box sx={{
                display: { xs: 'none', md: 'block' },
                width: '50vw',
                height: '100vh',
                position: 'sticky',
                top: 0,
                backgroundImage: `url(${randomImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} />
        </Box>
    );
}

export default RegistrationLayout;
