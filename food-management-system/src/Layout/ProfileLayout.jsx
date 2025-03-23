import { Box } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'

const ProfileLayout = () => {
  return (
    <>
      <Navbar callingFrom={'PROFILE'} />
      <Box sx={{ height: 64 }} />
      <Box sx={{
        display: 'flex',
        width: '100%',
      }}>
        <Sidebar />
      </Box>
    </>
  )
}

export default ProfileLayout