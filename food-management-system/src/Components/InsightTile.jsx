import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const InsightTile = ({ title, image: Icon, count, unit }) => {
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.5, // Trigger when 50% of the tile is visible
    });
    const parsedCount = parseInt(count.replace(/,/g, ''));

    return (
        <Card
            ref={ref}
            sx={{
                borderRadius: 2,
                width: { xs: '100%', md: 280 },
                py: { xs: 3, md: 0 },
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                },
            }}
        >
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: 100, md: 150 },
                gap: 0.5,
            }}>
                <Icon fontSize='large' sx={{ color: '#059669' }} />
                <Typography sx={{
                    fontWeight: { xs: 500, md: 700, },
                    fontSize: { xs: 22, sm: 26, },
                    letterSpacing: { xs: 1, sm: 1.2, },
                }}>
                    {inView ? (
                        <CountUp
                            start={0}
                            end={parsedCount}
                            duration={parsedCount > 9999 ? 2 : 1}
                            separator=","
                        />
                    ) : (
                        '0'
                    )}+ {unit}
                </Typography>
                <Typography sx={{
                    fontWeight: 500,
                    fontSize: { xs: 12, sm: 14, md: 16, },
                    color: '#687989',
                    textAlign: 'center',
                }}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InsightTile;