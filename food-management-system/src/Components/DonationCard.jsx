import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Person3Icon from '@mui/icons-material/Person3';
import BentoIcon from '@mui/icons-material/Bento';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const DonationCard = ({ data }) => {
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 2 },
                bgcolor: '#FFFFFF',
                borderRadius:2,
                border: '1px solid #EEEEEE',
                height: {xs:310,md: 320},
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        bgcolor: '#059669',
                        color: '#C2FFC7',
                        borderRadius: { xs: 3, md: 6 },
                        fontSize: 14,
                        py: { xs: 0, md: 0.2 },
                        px: 0,
                        width: 100,
                        display: 'inline-block',
                        textAlign: 'center',
                        mb:1,
                    }}
                >
                    {data.category}
                </Typography>
                <Box
                    onClick={() => setBookmarked(!bookmarked)}
                    sx={{
                        cursor: 'pointer',
                        color: bookmarked ? '#059669' : 'inherit',
                    }}
                >
                    {bookmarked ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
                </Box>
            </Box>
            <Typography>
                {data.title}
            </Typography>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
            }}>
                <Person3Icon sx={{
                    opacity: 0.54
                }} />
                <Typography>
                    {data.name}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
            }}>
                <BentoIcon sx={{
                    opacity: 0.54
                }} />
                <Typography>
                    {data.count}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
            }}>
                <CalendarMonthIcon sx={{
                    opacity: 0.54
                }} />
                <Typography>
                    {data.date}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
            }}>
                <LocationOnIcon sx={{
                    opacity: 0.54
                }} />
                <Typography>
                    {data.address}
                </Typography>
            </Box>
            <Button sx={{
                bgcolor: data.status === 'Request Pickup' ? '#059669' : '#F59E0B',
                mt:'auto',
            }}>
                <Typography sx={{
                    color: data.status === 'Request Pickup' ? '#C2FFC7' : '#443627',
                }}>
                    {data.status}
                </Typography>
            </Button>
        </Box>
    );
};

export default DonationCard;
