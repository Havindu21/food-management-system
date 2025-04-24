import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { globalPx } from '../Theme/Theme'
import Logo from '../assets/logo-remove-bg.png'

const Footer = () => {
  return (
    <Box sx={{
      bgcolor: '#059669',
      // height: 70,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FFFFFF',
      ...globalPx,
      py: 2,
      gap: 2,
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
        <Box
          component={'img'}
          src={Logo}
          alt='logo'
          sx={{
            width: 100,
            objectFit: 'cover',
          }}
        />
        <Typography sx={{
          textAlign: 'right',
          fontSize: { xs: 14, md: 16 },
        }}>
          Making food surplus redistribution efficient and impactful !
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: '#ACD3A8', width: '100%' }} />
      <Typography sx={{
        textAlign: 'center',
        fontSize: { xs: 14, md: 16 },
      }}>
        © 2025 Food Management System. <Box component={'br'} sx={{ display: { xs: 'block', sm: 'none' } }} /> All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer