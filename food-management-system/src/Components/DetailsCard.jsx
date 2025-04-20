import { Box, Button, Divider, Grid2, Typography } from '@mui/material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

const DetailsCard = ({ card }) => {
    return (
        <Box sx={{
            width: '100%',
            bgcolor: '#FFFFFF',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 3,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
            }}>
                <Typography sx={{
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 18 },
                }}>
                    {card.title}
                </Typography>
                <Typography
                    sx={{
                        bgcolor: card.status === 'Cancelled' ? '#FFE2E2' : '#C2FFC7',
                        color: card.status === 'Cancelled' ? '#DC2626' : '#059669',
                        borderRadius: { xs: 4, md: 6 },
                        fontSize: 14,
                        py: 1,
                        px: 0,
                        width: 100,
                        display: 'inline-block',
                        textAlign: 'center',
                        fontWeight: 600,
                    }}
                >
                    {card.status}
                </Typography>
            </Box>
            <Divider sx={{ mt: 1 }} />
            <Grid2 container >
                {card.details.map((section, index2) => (
                    <Grid2 key={index2} item size={{ xs: 12, sm: 6 }} mt={2}>
                        <Typography sx={{
                            color: '#686D76',
                            fontSize: { xs: 14, md: 16 },

                        }}>
                            {section.title}
                        </Typography>
                        <Typography sx={{
                            fontSize: { xs: 14, md: 16 },
                        }}>
                            {section.Description}
                        </Typography>
                    </Grid2>
                ))}
            </Grid2>
            <Box sx={{
                display: 'flex',
                gap: 2,
                mt: 2,
            }}>
                <Button
                    variant="outlined"
                    startIcon={<RemoveRedEyeOutlinedIcon />}
                    sx={{
                        border: '1px solid #686D76',
                        color: '#000000',
                        width: { xs: '100%', sm: 'unset' },
                    }}
                >
                    <Typography sx={{
                        color: '#000000',
                        fontSize: { xs: 14, md: 16 },
                        textTransform: 'none',
                    }}>
                        View Details
                    </Typography>
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ReceiptOutlinedIcon />}
                    sx={{
                        border: '1px solid #686D76',
                        color: '#000000',
                        width: { xs: '100%', sm: 'unset' },
                    }}
                >
                    <Typography sx={{
                        color: '#000000',
                        fontSize: { xs: 14, md: 16 },
                        textTransform: 'none',
                    }}>
                        View Receipt
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default DetailsCard