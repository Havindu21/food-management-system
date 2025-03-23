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
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const tabs = [
    {
        label: 'Dashboard',
        icon: <DashboardIcon />,
        path: 'dashboard',
    },
    {
        label: 'Donations',
        icon: <VolunteerActivismIcon />,
        path: 'donations',
    },
    {
        label: 'Donations Status',
        icon: <SignalWifiStatusbarConnectedNoInternet4Icon />,
        path: 'donation-status',
    },
    {
        label: 'Donation History',
        icon: <HistoryIcon />,
        path: 'donation-history',
    },
    {
        label: 'My Profile',
        icon: <AccountCircleIcon />,
        path: 'my-profile',
    },
]

export default function Sidebar() {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CssBaseline />
            {/* Drawer for larger screens (permanent) */}
            {!isMd && (
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        '& .MuiDrawer-paper': {
                            marginTop: '64px', // Adjust based on your Navbar height
                            height: `calc(100vh - 64px)`, // Ensure it doesn't extend beyond the screen
                        },
                    }}
                >
                    <List>
                        <ListItem disablePadding sx={{ display: 'flex', justifyContent: open ? 'flex-start' : 'center', alignItems: 'center' }}>
                            <ListItemButton
                                onClick={open ? handleDrawerClose : handleDrawerOpen}
                                sx={{
                                    display: 'flex',
                                    justifyContent: open ? 'flex-start' : 'center',
                                    alignItems: 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0, // Removes extra spacing on the left
                                        display: 'flex', // Ensures the icon is centered
                                        justifyContent: 'center', // Centers icon in closed state
                                        alignItems: 'center',
                                    }}
                                >
                                    {open ? (
                                        theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />
                                    ) : (
                                        <MenuIcon />
                                    )}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        {tabs.map((tab, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => navigate(tab?.path)}
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {tab?.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={tab?.label}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}
            {/* Temporary Drawer for xs screens */}
            {isMd && (
                <MuiDrawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            marginTop: '64px', // Adjust based on your Navbar height
                            height: `calc(100vh - 64px)`, // Ensure it doesn't extend beyond the screen
                        },
                    }}
                >
                    <List>
                        <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <ListItemButton
                                onClick={handleDrawerClose}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        {tabs.map((tab, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => {
                                        handleDrawerClose();
                                        navigate(tab?.path);
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            mr: 3,
                                        }}
                                    >
                                        {tab?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={tab?.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </MuiDrawer>
            )}
            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#FAFAFA', width: '100%', height: `calc(100vh - 64px)`, }}>
                {isMd && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mb: 2 }}
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