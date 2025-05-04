import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Chip, Box } from '@mui/material';

const BasicTable = ({ headers, data }) => {
    return (
        <TableContainer 
            component={Paper} 
            sx={{ 
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
                <TableHead>
                    <TableRow sx={{ 
                        backgroundColor: '#1e293b',
                        '& .MuiTableCell-head': {
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }
                    }}>
                        {headers.map((header, index) => (
                            <TableCell 
                                key={index} 
                                align="center"
                                sx={{ 
                                    borderBottom: '2px solid #059669',
                                    py: 2.5,
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow 
                            key={rowIndex} 
                            sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:nth-of-type(odd)': { 
                                    backgroundColor: '#F9FAFB' 
                                },
                                '&:hover': { 
                                    backgroundColor: '#F0FDF4' 
                                },
                                transition: 'background-color 0.2s ease',
                            }}
                        >
                            {headers.map((header, colIndex) => (
                                <TableCell 
                                    key={colIndex} 
                                    align="center"
                                    sx={{
                                        borderBottom: '1px solid #E5E7EB',
                                        py: 1.5,
                                        color: '#374151',
                                        fontSize: '0.925rem',
                                    }}
                                >
                                    {header === "Status" ? (
                                        <Chip
                                            label={row[header]}
                                            size="small"
                                            sx={{
                                                ...statusStyles[row[header]],
                                                height: 28,
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                borderRadius: 5,
                                                minWidth: 100,
                                                '& .MuiChip-label': {
                                                    paddingLeft: 12,
                                                    paddingRight: 12,
                                                },
                                            }}
                                        />
                                    ) : header === "Expiry Date" ? (
                                        <Chip
                                            label={row[header]}
                                            size="small"
                                            sx={{
                                                ...expiryDateStyles[expiryDateStyles[row[header]] ? row[header] : 'Default'],
                                                height: 28,
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                borderRadius: 5,
                                                minWidth: 100,
                                                '& .MuiChip-label': {
                                                    paddingLeft: 12,
                                                    paddingRight: 12,
                                                },
                                            }}
                                        />
                                    ) : header === "Action" ? (
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                ...actionStyles[row[header]],
                                                borderRadius: 1.5,
                                                px: 2,
                                                py: 0.75,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {row[header]}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '0.925rem',
                                                color: '#374151',
                                            }}
                                        >
                                            {row[header]}
                                        </Typography>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasicTable;

const statusStyles = {
    'Completed': { 
        backgroundColor: '#DCFCE7', 
        color: '#166534', 
        fontWeight: 600 
    },
    'Pending': { 
        backgroundColor: '#FEF3C7', 
        color: '#92400E', 
        fontWeight: 600 
    },
    'Confirmed': { 
        backgroundColor: '#FECACA', 
        color: '#991B1B', 
        fontWeight: 600 
    },
    'In Transit': { 
        backgroundColor: '#DBEAFE', 
        color: '#1E40AF', 
        fontWeight: 600 
    },
    'Cancelled': { 
        backgroundColor: '#FEE2E2', 
        color: '#991B1B', 
        fontWeight: 600 
    },
    'Expired': { 
        backgroundColor: '#E5E7EB', 
        color: '#374151', 
        fontWeight: 600 
    },
};

const actionStyles = {
    'Request Pickup': { 
        color: '#FFFFFF', 
        backgroundColor: '#059669',
        '&:hover': {
            backgroundColor: '#047857',
        } 
    },
};

const expiryDateStyles = {
    'Default': { 
        backgroundColor: '#DCFCE7', 
        color: '#166534', 
        fontWeight: 600 
    },
    'Today': { 
        backgroundColor: '#FEF3C7', 
        color: '#92400E', 
        fontWeight: 600 
    },
    'Tomorrow': { 
        backgroundColor: '#FECACA', 
        color: '#991B1B', 
        fontWeight: 600 
    },
    'Expired': { 
        backgroundColor: '#E5E7EB', 
        color: '#374151', 
        fontWeight: 600 
    },
};