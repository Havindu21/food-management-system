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
                                                bgcolor: '#059669',
                                                color: '#C2FFC7',
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
