import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddTaskIcon from '@mui/icons-material/AddTask';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

export default function Sidebar() {
    const theme = useTheme();
    const isMdOrBelow = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(isMdOrBelow ? false : true);
    const location = useLocation();
    const navigate = useNavigate();
    const { userType: userRole } = useSelector((state) => state.user);
    const initialTab = location.state?.initialTab || userRole === 'admin' ? 'Recipients Approval' : 'Dashboard';
    const [currentTab, setCurrentTab] = useState(initialTab);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        navigate('/login'); // replace with actual logout logic
    };

    const tabs = userRole === 'donor' ? [
        { label: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
        { label: 'Donate Food', icon: <VolunteerActivismIcon />, path: 'donate-food' },
        { label: 'Food Requests', icon: <RequestPageIcon />, path: 'food-requests' },
        { label: 'Active Donations', icon: <ShoppingBasketIcon />, path: 'active-donations' },
        { label: 'Donation History', icon: <HistoryIcon />, path: 'donation-history' },
        { label: 'My Profile', icon: <AccountCircleIcon />, path: 'my-profile' }
    ] : userRole === 'recipient' ? [
        { label: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
        { label: 'Available Food', icon: <FastfoodIcon />, path: 'available-donations' },
        { label: 'Request Food', icon: <RestaurantMenuIcon />, path: 'request-donations' },
        { label: 'Active Pickups', icon: <LocalShippingIcon />, path: 'active-pickups' },
        { label: 'Pickup History', icon: <HistoryIcon />, path: 'pickup-history' },
        { label: 'Settings', icon: <SettingsIcon />, path: 'recepient-settings' }
    ] : userRole === 'admin' ? [
        { label: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
        { label: 'Recipients Approval', icon: <AddTaskIcon />, path: 'recipient-approvals' },
        { label: 'User Management', icon: <SupervisedUserCircleIcon />, path: 'user-management' },
        { label: 'Analytics', icon: <AnalyticsIcon />, path: 'analytics' },
    ] : [];

    const LogoutButton = (
        <List sx={{ mb: 1 }}>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={[
                        {
                            minHeight: 48,
                            px: 2.5,
                            mx: 0.5,
                            mb: 0.5,
                            borderRadius: 1.5,
                            backgroundColor: 'transparent',
                            "&:hover": {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                            transition: 'all 0.3s ease',
                        },
                        open
                            ? { justifyContent: 'initial' }
                            : { justifyContent: 'center' },
                    ]}
                >
                    <ListItemIcon
                        sx={[
                            {
                                minWidth: 0,
                                justifyContent: 'center',
                                color: 'rgba(255, 255, 255, 0.7)',
                            },
                            open
                                ? { mr: 3 }
                                : { mr: 'auto' },
                        ]}
                    >
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '0.925rem',
                                }}
                            >
                                Logout
                            </Typography>
                        }
                        sx={[
                            { color: 'rgba(255, 255, 255, 0.85)' },
                            open
                                ? { opacity: 1 }
                                : { opacity: 0 },
                        ]}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CssBaseline />

            {!isMdOrBelow && (
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        '& .MuiDrawer-paper': {
                            marginTop: '64px',
                            height: `calc(100vh - 64px)`,
                            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#FFFFFF',
                        },
                    }}
                >
                    <List>
                        <ListItem disablePadding sx={{ display: 'flex', justifyContent: open ? 'flex-start' : 'center', alignItems: 'center', py: 1.5, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <ListItemButton
                                onClick={open ? handleDrawerClose : handleDrawerOpen}
                                sx={{
                                    display: 'flex',
                                    justifyContent: open ? 'flex-start' : 'center',
                                    alignItems: 'center',
                                    px: 2.5,
                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFFFFF' }}>
                                    {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon />}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>

                        {open && (
                            <ListItem disablePadding sx={{ py: 1.5 }}>
                                <Typography variant="subtitle2" sx={{ px: 2.5, color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.875rem' }}>
                                    {userRole === 'donor' ? 'Donor Menu' : userRole === 'recipient' ? 'Recipient Menu' : userRole === 'admin' ? 'Admin Panel' : 'Menu'}
                                </Typography>
                            </ListItem>
                        )}

                        {tabs.map((tab, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => { navigate(tab?.path); setCurrentTab(tab.label); }}
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                            mx: 0.5,
                                            mb: 0.5,
                                            borderRadius: 1.5,
                                            backgroundColor: currentTab === tab.label ? '#059669' : 'transparent',
                                            "&:hover": { backgroundColor: currentTab === tab.label ? '#059669' : 'rgba(255, 255, 255, 0.08)' },
                                            transition: 'all 0.3s ease',
                                        },
                                        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                    ]}
                                >
                                    <ListItemIcon sx={[{ color: currentTab === tab.label ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)', minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                                        {tab?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: currentTab === tab.label ? 600 : 500, fontSize: '0.925rem' }}>{tab?.label}</Typography>} sx={[{ color: currentTab === tab.label ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)' }, open ? { opacity: 1 } : { opacity: 0 }]} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ flexGrow: 1 }} />
                    {LogoutButton}
                </Drawer>
            )}

            {isMdOrBelow && (
                <MuiDrawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            marginTop: '64px',
                            height: `calc(100vh - 64px)`,
                            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#FFFFFF',
                        },
                    }}
                >
                    <List>
                        <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', py: 1.5 }}>
                            <ListItemButton
                                onClick={handleDrawerClose}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    px: 2.5,
                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFFFFF' }}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding sx={{ py: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ px: 2.5, color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.875rem' }}>
                                {userRole === 'donor' ? 'Donor Menu' : userRole === 'recipient' ? 'Recipient Menu' : userRole === 'admin' ? 'Admin Panel' : 'Menu'}
                            </Typography>
                        </ListItem>

                        {tabs.map((tab, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => { handleDrawerClose(); navigate(tab?.path); setCurrentTab(tab.label); }}
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                        mx: 0.5,
                                        mb: 0.5,
                                        borderRadius: 1.5,
                                        justifyContent: 'flex-start',
                                        backgroundColor: currentTab === tab.label ? '#059669' : 'transparent',
                                        "&:hover": { backgroundColor: currentTab === tab.label ? '#059669' : 'rgba(255, 255, 255, 0.08)' },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3, color: currentTab === tab.label ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)' }}>
                                        {tab?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: currentTab === tab.label ? 600 : 500, fontSize: '0.925rem' }}>{tab?.label}</Typography>} sx={{ color: currentTab === tab.label ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ flexGrow: 1 }} />
                    {LogoutButton}
                </MuiDrawer>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, bgcolor: '#FAFAFA', width: '100%', minHeight: `calc(100vh - 64px)`, transition: 'margin-left 0.3s ease' }}>
                {isMdOrBelow && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mb: 2, backgroundColor: '#1e293b', color: '#FFFFFF', '&:hover': { backgroundColor: '#0f172a' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Outlet />
            </Box>
        </Box>
    );
}

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
