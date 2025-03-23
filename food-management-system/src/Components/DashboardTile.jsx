import { Box, Rating, Typography } from '@mui/material'
import React from 'react'

const DashboardTile = ({ tile }) => {
    return (
        <Box sx={{
            width: '100%',
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            backgroundColor: '#FFFFFF',
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#686D76',
                }}>
                    {tile?.title}
                </Typography>
                <tile.image fontSize='large' sx={{ color: '#059669' }} />
            </Box>
            <Typography sx={{
                fontSize: { xs: 20, md: 22 },
                fontWeight: { xs: 500, md: 600 },
                color: '#3F4F44',
            }}>
                {tile?.count}
            </Typography>
            {tile?.rate && <Rating name="read-only" value={tile?.rate} readOnly precision={0.5} sx={{mt:1}} />}
        </Box>
    )
}

export default DashboardTile
