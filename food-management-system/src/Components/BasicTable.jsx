import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const BasicTable = ({ headers, data }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} align="center" sx={{ fontWeight: 600 }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {headers.map((header, colIndex) => (
                                <TableCell key={colIndex} align="center">
                                    {header === "Status" ? (
                                        <Typography
                                            sx={{
                                                ...statusStyles[row[header]],
                                                borderRadius: { xs: 3, md: 6 },
                                                fontSize: 14,
                                                py: { xs: 0, md: 0.2 },
                                                px: 0,
                                                width: 100,
                                                display: 'inline-block',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {row[header]}
                                        </Typography>
                                    ) : header === "Expiry Date" ? (
                                        <Typography
                                            sx={{
                                                ...expiryDateStyles[expiryDateStyles[row[header]] ? row[header] : 'Default'],
                                                borderRadius: { xs: 3, md: 6 },
                                                fontSize: 14,
                                                fontWeight: 500,
                                                py: { xs: 0, md: 0.2 },
                                                px: 0,
                                                width: 100,
                                                display: 'inline-block',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {row[header]}
                                        </Typography>
                                    ) : header === "Action" ? (
                                        <Typography
                                            sx={{
                                                ...actionStyles[row[header]],
                                                borderRadius:1,
                                                p:1,
                                                fontSize: 14,
                                                fontWeight: 500,
                                                display: 'inline-block',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {row[header]}
                                        </Typography>
                                    ) : (
                                        row[header]
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
    'Completed': { bgcolor: '#059669', color: '#C2FFC7' },
    'Pending': { bgcolor: '#F6E05E', color: '#92400E' },
    'Confirmed': { bgcolor: '#F59E0B', color: '#443627' },
    'In Transit': { bgcolor: '#0EA5E9', color: '#211C84' },
    'Cancelled': { bgcolor: '#F87171', color: '#A31D1D' },
    'Expired': { bgcolor: '#B17F59', color: '#E3D2C3' },
};
const actionStyles = {
    'Request Pickup': { color: '#059669', bgcolor: '#C2FFC7' },
};
const expiryDateStyles = {
    'Default': { bgcolor: '#059669', color: '#C2FFC7' },
    'Today': { bgcolor: '#F59E0B', color: '#443627' },
    'Tomorrow': { bgcolor: '#F87171', color: '#A31D1D' },
    'Expired': { bgcolor: '#B17F59', color: '#E3D2C3' },
};
