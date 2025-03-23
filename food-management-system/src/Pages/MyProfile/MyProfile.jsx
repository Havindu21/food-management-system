import { Box, Grid2, IconButton, Typography } from '@mui/material'
import React from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const MyProfile = () => {
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography sx={{
          fontSize: { xs: 20, md: 22 },
          fontWeight: { xs: 500, md: 600 },
          color: '#3F4F44',
        }}>
          Personal Information
        </Typography>
        <IconButton>
          <DriveFileRenameOutlineIcon fontSize='large' sx={{
            color: '#059669',
          }} />
        </IconButton>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
      }}>
        <Grid2 container rowSpacing={1}>
          {infos.map((info, index) => (
            <>
              <Grid2 key={index} size={{ xs: 1.5, md: 0.7 }}>
                {info.icon}
              </Grid2>
              <Grid2 key={index} size={{ xs: 3, md: 2 }}>
                <Typography sx={{
                  fontSize: { xs: 14, md: 16 },
                  color: '#686D76',
                }}>
                  {info.key}
                </Typography>
              </Grid2>
              <Grid2 key={index} size={{ xs: 7.5, md: 9.3 }}>
                <Typography sx={{
                  fontSize: { xs: 14, md: 16 },
                }}>
                  {info.value}
                </Typography>
              </Grid2>
            </>
          ))}
        </Grid2>
        {/* profile image */}
      </Box>
    </Box>
  )
}

export default MyProfile

const infos = [
  {
    key: 'Name',
    value: 'Hansana Sandipa',
    icon: <PermIdentityOutlinedIcon fontSize='small' />,
  },
  {
    key: 'Email',
    value: 'donor@gmail.com',
    icon: <EmailOutlinedIcon fontSize='small' />,
  },
  {
    key: 'Phone',
    value: '+947771234567',
    icon: <LocalPhoneOutlinedIcon fontSize='small' />,
  },
]