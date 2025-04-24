import { Card, CardContent, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'

const BasicCard = ({ option, icon, title, description, setSelectedOption, selectedOption }) => {

    return (
        <Card sx={{
            width: '100%',
            borderRadius: 3,
            height: { xs: 180, sm: 250, md: 380,lg: 450 },
            border: selectedOption === option ? '2px solid #059669' : '1px solid #EEEEEE',
            bgcolor: selectedOption === option ? '#F8FFFA' : 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
            "&:hover": {
                transform: 'scale(1.02)',
            }
        }}
            onClick={() => setSelectedOption(option)}
        >
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: { xs: 1, sm: 2, md: 4, lg: 4 },
                px: { xs: 2, md: 1, lg: 5 },
            }}>
                {icon}
                <Typography sx={{
                    fontSize: { xs: 18,sm:28,md:26 ,lg: 36 },
                    textAlign: 'center',
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, sm:20,md: 24 },
                    textAlign: 'center',
                    color: '#686D76',
                    fontWeight: 500,
                }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BasicCard