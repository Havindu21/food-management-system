import { Card, CardContent, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'

const BasicCard = ({ option, icon, title, description, setSelectedOption, selectedOption }) => {

    return (
        <Card sx={{
            width: '100%',
            borderRadius: 3,
            height: { xs: 180, sm: 250, md: 350 },
            border: selectedOption === option ? '2px solid #059669' : '1px solid #EEEEEE',
            bgcolor: selectedOption === option ? '#F8FFFA' : 'transparent',
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
                px: { xs: 2, md: 5, },
            }}>
                {icon}
                <Typography sx={{
                    fontSize: { xs: 18, md: 30 },
                    textAlign: 'center',
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    fontSize: { xs: 14, md: 18 },
                    textAlign: 'center',
                    color: '#686D76',
                }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BasicCard