import { Box, Rating, Typography, Chip } from '@mui/material'
import React from 'react'

const DashboardTile = ({ tile }) => {
    return (
        <Box sx={{
            width: '100%',
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            backgroundColor: '#FFFFFF',
            px: { xs: 2.5, md: 3.5 },
            py: { xs: 2.5, md: 3 },
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E5E7EB',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(5, 150, 105, 0.12)',
                transform: 'translateY(-4px)',
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: '#059669',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
            }
        }}>
            {/* Top section with title and icon */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}>
                <Typography sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: '#6B7280',
                    fontWeight: 500,
                    letterSpacing: '0.025em',
                }}>
                    {tile?.title}
                </Typography>
                <Box sx={{
                    backgroundColor: '#F3F4F6',
                    borderRadius: 2,
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <tile.image 
                        fontSize='medium' 
                        sx={{ 
                            color: '#059669',
                            fontSize: '2rem'
                        }} 
                    />
                </Box>
            </Box>

            {/* Count section */}
            <Typography sx={{
                fontSize: { xs: 32, md: 36 },
                fontWeight: 700,
                color: '#1F2937',
                lineHeight: 1,
                mb: tile?.rate ? 1.5 : 'auto',
                background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                {tile?.count}
            </Typography>

            {/* Rating section */}
            {tile?.rate && (
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    mt: 'auto'
                }}>
                    <Rating 
                        name="read-only" 
                        value={tile?.rate} 
                        readOnly 
                        precision={0.5} 
                        size="small"
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#059669',
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#D1D5DB',
                            },
                        }}
                    />
                    <Typography 
                        sx={{
                            fontSize: '0.875rem',
                            color: '#6B7280',
                            fontWeight: 500,
                        }}
                    >
                        {tile?.rate.toFixed(1)}
                    </Typography>
                </Box>
            )}

            {/* Optional trend indicator - with modern style option */}
            {tile?.trend && (
                tile?.trendStyle === 'modern' ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 28,
                            padding: '0 12px',
                            borderRadius: 14,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            backgroundColor: tile.trend > 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                            color: tile.trend > 0 ? '#059669' : '#DC2626',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: tile.trend > 0 ? 'rgba(16, 185, 129, 0.18)' : 'rgba(239, 68, 68, 0.18)',
                            }
                        }}
                    >
                        {`${tile.trend > 0 ? '+' : ''}${tile.trend}%`}
                    </Box>
                ) : (
                    <Chip
                        label={`${tile.trend > 0 ? '+' : ''}${tile.trend}%`}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            height: 24,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            backgroundColor: tile.trend > 0 ? '#DCFCE7' : '#FEE2E2',
                            color: tile.trend > 0 ? '#166534' : '#991B1B',
                            '& .MuiChip-label': {
                                paddingLeft: 8,
                                paddingRight: 8,
                            },
                            '&:hover': {
                                backgroundColor: tile.trend > 0 ? '#DCFCE7' : '#FEE2E2',
                            }
                        }}
                    />
                )
            )}

            {/* Decorative circle element */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />
        </Box>
    )
}

export default DashboardTile