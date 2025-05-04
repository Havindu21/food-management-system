import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Box, Typography, Divider, Paper } from '@mui/material';

const Analytics = () => {
  // Mock data for monthly donations
  const monthlyDonationData = [
    { name: 'Jan', donations: 65 },
    { name: 'Feb', donations: 59 },
    { name: 'Mar', donations: 80 },
    { name: 'Apr', donations: 81 },
    { name: 'May', donations: 56 },
    { name: 'Jun', donations: 55 },
    { name: 'Jul', donations: 40 },
    { name: 'Aug', donations: 70 },
    { name: 'Sep', donations: 90 },
    { name: 'Oct', donations: 75 },
    { name: 'Nov', donations: 60 },
    { name: 'Dec', donations: 85 },
  ];

  // Mock data for donor and recipient count
  const userCountData = [
    { name: 'Donors', value: 120, color: '#059669' },
    { name: 'Recipients', value: 85, color: '#0284c7' },
  ];
  
  // Mock data for verified and rejected recipients
  const recipientStatusData = [
    { name: 'Verified', value: 72, color: '#059669' },
    { name: 'Rejected', value: 13, color: '#DC2626' },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography sx={{
          fontSize: { xs: 24, md: 28 },
          fontWeight: 700,
          color: '#059669',
          mb: 1,
        }}>
          Analytics Dashboard
        </Typography>
        <Typography sx={{
          fontSize: { xs: 14, md: 16 },
          color: '#686D76',
          mb: 2,
        }}>
          Track and monitor donation statistics and user demographics
        </Typography>
        <Divider />
      </Box>
      
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          },
          borderTop: '4px solid #059669',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#059669' }}>
          Monthly Confirmed Donations
        </Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={monthlyDonationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#686D76' }} />
              <YAxis tick={{ fill: '#686D76' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="donations" name="Confirmed Donations" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%' }}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            flex: 1,
            borderRadius: 2,
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
            },
            borderTop: '4px solid #0284c7',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#0284c7' }}>
            Donor and Recipient Distribution
          </Typography>
          <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userCountData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userCountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
        
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            flex: 1,
            borderRadius: 2,
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
            },
            borderTop: '4px solid #D97706',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#D97706' }}>
            Recipient Verification Status
          </Typography>
          <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recipientStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {recipientStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} recipients`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Analytics;