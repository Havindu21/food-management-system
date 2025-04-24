import { Card, CardContent, Typography } from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import React from 'react'

const BasicCard = ({ option, icon, title, description, setSelectedOption, selectedOption }) => {
    const isSelected = selectedOption === option

    return (
        <Card
            sx={{
                position: 'relative',
                width: '100%',
                borderRadius: 3,
                height: { xs: 180, sm: 250, md: 380, lg: 450 },
                border: isSelected ? '2px solid #059669' : '1px solid #EEEEEE',
                bgcolor: isSelected ? '#F8FFFA' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                "&:hover": {
                    transform: 'scale(1.02)',
                }
            }}
            onClick={() => setSelectedOption(option)}
        >
            {isSelected && (
                <CheckCircleOutlineRoundedIcon
                    fontSize='large'
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        color: '#059669',
                        bgcolor: '#fff',
                        borderRadius: '50%',
                    }}
                />
            )}

            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    gap: { xs: 1, sm: 2, md: 4, lg: 4 },
                    px: { xs: 2, md: 1, lg: 5 },
                }}
            >
                {icon}
                <Typography
                    sx={{
                        fontSize: { xs: 18, sm: 28, md: 26, lg: 36 },
                        textAlign: 'center',
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: 14, sm: 20, md: 24 },
                        textAlign: 'center',
                        color: '#686D76',
                        fontWeight: 500,
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BasicCard
