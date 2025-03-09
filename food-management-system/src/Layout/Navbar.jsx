import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, useNavigate } from 'react-router-dom';

const pages = ['Home', 'Insights', 'Projects', 'Donate Now'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogged = location?.state?.isLogged || false;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{
            bgcolor: '#FFFFFF',
            height: 76, px: 5,
            boxShadow: 'none',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }} >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            // color: '#FFFFFF',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        gap: 4,
                        pl: 40,
                    }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: '#059669', display: 'block',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    ":hover": {
                                        bgcolor: '#FFFFFF',
                                        // transform: 'scale(1.02)',
                                        fontWeight: 600,
                                    }
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                        display: { xs: 'none', md: isLogged ? 'none' : 'flex' },
                        gap: 2,
                        // ml: 'auto',
                    }}>
                        <Button
                            onClick={() => navigate('/sign-in')}
                            sx={{
                                my: 2,
                                color: '#059669',
                                //  color: '#000000',
                                display: 'block',
                                // bgcolor: '#059669',
                                borderRadius: '30px',
                                px: 2,
                                py: 1,
                                fontWeight: 600,
                                ":hover": {
                                    transform: 'scale(1.04)',
                                    // bgcolor: '#059669',
                                    // color: '#FFFFFF',
                                }
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            // onClick={handleCloseNavMenu}
                            sx={{
                                my: 2, color: '#FFFFFF', display: 'block',
                                bgcolor: '#059669',
                                borderRadius: '20px',
                                px: 2,
                                py: 1,
                                fontWeight: 600,
                                ":hover": {
                                    transform: 'scale(1.02)',
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: isLogged ? 'flex' : 'none' }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{
                            p: 0, bgcolor: '#059669',
                            width: 45,
                            height: 45,
                            ":hover": {
                                transform: 'scale(1.02)',
                                bgcolor: '#059669',
                            }
                        }}>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 600,
                            }}>
                                HS
                            </Typography>
                        </IconButton>
                        <Menu
                            sx={{
                                mt: '65px',
                            }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{
                                    color: '#059669',
                                    width: 150,
                                    ":hover": {
                                        bgcolor: '#059669',
                                        color: '#FFFFFF',
                                    }
                                }}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
