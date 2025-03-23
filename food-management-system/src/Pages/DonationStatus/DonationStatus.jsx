import { Box, Typography } from '@mui/material'
import React from 'react'
import BasicTable from '../../Components/BasicTable'

const DonationStatus = () => {
  return (
    <Box sx={{
      px: { xs: 2, md: 3 },
      py: { xs: 2, md: 3 },
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      bgcolor: '#FFFFFF',
      mt: 4,
      borderRadius: 2,
    }}>
      <Typography sx={{
        fontSize: { xs: 20, md: 22 },
        fontWeight: { xs: 500, md: 600 },
        color: '#3F4F44',
      }}>
        Donation Status
      </Typography>
      <Typography sx={{
        fontSize: { xs: 14, md: 16 },
        color: '#686D76',
      }}>
        Track your donation status
      </Typography>
      <Box sx={{ mt: 4, pb: { xs: 4, md: 0 } }}>
        <BasicTable headers={tableHeaders} data={tableData} />
      </Box>
    </Box>
  )
}

export default DonationStatus

const tableHeaders = ["Date", "Organization", "Category", "Quantity", "Location", "Status"];
const tableData = [
  { Date: "2025-03-15", Organization: "", Category: "Fresh Vegetables", Quantity: "25 kg", Location: "", Status: 'Pending' },
  { Date: "2025-03-18", Organization: "Api Foundation", Category: "Meal Packs", Quantity: "50 meals", Location: "Shantha Villa, 588 10th Mile Post Rd, Malabe", Status: "Confirmed" },
  { Date: "2025-03-19", Organization: "Caritas Sri Lanka", Category: "Meal Packs", Quantity: "25 meals", Location: "133 Kynsey Road, Colombo 08", Status: "In Transit" },
  { Date: "2025-03-20", Organization: "Api Foundation", Category: "Meal Packs", Quantity: "10 meals", Location: "Shantha Villa, 588 10th Mile Post Rd, Malabe", Status: "Cancelled" },
  { Date: "2025-03-19", Organization: "Caritas Sri Lanka", Category: "Meal Packs", Quantity: "100 meals", Location: "133 Kynsey Road, Colombo 08", Status: "Expired" },
];
