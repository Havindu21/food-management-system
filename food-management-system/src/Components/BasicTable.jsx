import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function createData(date, items, quantity, status) {
    return { date, items, quantity, status };
}

const rows = [
    createData('2025-03-15', 'Laptop', 3, 'Completed'),
    createData('2025-03-18', 'Mouse', 5, 'Completed'),
    createData('2025-03-19', 'Keyboard', 2, 'Completed'),
    createData('2025-03-20', 'Monitor', 1, 'Completed'),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Date</TableCell>
                        <TableCell align='center'>Items</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align='center'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.items}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell align='center'>{row.items}</TableCell>
                            <TableCell align='center'>{row.quantity}</TableCell>
                            <TableCell align="center">
                                <Typography
                                    sx={{
                                        bgcolor: '#059669',
                                        color: '#C2FFC7',
                                        borderRadius: { xs: 3, md: 6 },
                                        fontSize: 14,
                                        py: { xs: 0, md: 0.2 },
                                        px:0,
                                        width: 100,
                                        display: 'inline-block', // Ensures proper centering
                                        textAlign: 'center', // Centers text inside Typography
                                    }}
                                >
                                    {row.status}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
        </TableContainer >
    );
}