import { Box } from '@mui/material'
import React from 'react'
import Wallpaper from '../../assets/Home/wallpaper.jpg';

const Home = () => {
    return (
        <Box
            component={'img'}
            src={Wallpaper}
            alt='Wallpaper'
            sx={{
                width: '100%',
                height: '95vh',
                // objectFit: 'cover',
                filter: 'brightness(0.5)' 
            }}
        />
    )
}

export default Home