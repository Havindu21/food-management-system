import { Box, Grid2 } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{
      bgcolor: '#059669',
    }}>
      <Grid2>
        <Grid2 container spacing={1}>
          <Grid2 item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 2 }}>
              <Box sx={{ fontWeight: 'bold', color: 'white' }}>About Us</Box>
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 2 }}>
              <Box sx={{ fontWeight: 'bold', color: 'white' }}>Contact Us</Box>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Footer