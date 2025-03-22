import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpeg'
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { globalPx } from '../Theme/Theme';

const pages = ['Home', 'Insights', 'Projects', 'Donate Now'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogged = location?.state?.isLogged || false;
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [profileMenuItems, setProfileMenuItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

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

    useEffect(() => {
        setProfileMenuItems(isXs ? [...pages, ...settings] : settings)
        setMenuItems(isXs ? [...pages, ...settings] : pages)
    }, [isXs]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar position="fixed" sx={{
            bgcolor: isScrolled ? '#FFFFFF' : 'transparent',
            transition: 'background-color 0.3s ease-in-out',
            ...globalPx,
            boxShadow: 'none',
        }}>
            <Toolbar disableGutters sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 64,
            }} >
                <Box
                    component={'img'}
                    src={Logo}
                    alt='logo'
                    sx={{
                        width: 100,
                        objectFit: 'cover',
                    }}
                />
                <Box sx={{ flexGrow: 1, display: { xs: isLogged ? 'none' : 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color='#000000'
                        sx={{ ml: 'auto' }}
                    >
                        <MenuIcon sx={{
                            color: isScrolled ? '#000000' : '#FFFFFF',
                        }} />
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
                        {menuItems.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} sx={{
                                color: '#000000',
                                width: { xs: 120, sm: 150, },
                                ":hover": {
                                    bgcolor: '#059669',
                                    color: '#FFFFFF',
                                }
                            }}>
                                <Typography sx={{ textAlign: 'center', fontSize: { xs: 14, sm: 16 } }}>{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 4,
                }}>
                    {pages.map((page, index) => (
                        <Button
                            key={index}
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: index === 0 ? '#059669' : isScrolled ? '#000000' : '#FFFFFF',
                                display: 'block',
                                fontSize: 16,
                                fontWeight: index === 0 ? 600 : 500,
                                ":hover": {
                                    transform: 'scale(1.02)',
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
                }}>
                    <Button
                        onClick={() => navigate('/sign-in')}
                        sx={{
                            my: 2,
                            color: isScrolled ? '#000000' : '#FFFFFF',
                            display: 'block',
                            borderRadius: '30px',
                            px: 2,
                            py: 1,
                            fontWeight: 600,
                            ":hover": {
                                transform: 'scale(1.04)',
                            }
                        }}
                    >
                        Login
                    </Button>
                    <Button
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
                        p: 0,
                        bgcolor: isScrolled ? '#059669' : '#FFFFFF',
                        width: 45,
                        height: 45,
                        ":hover": {
                            transform: 'scale(1.02)',
                            bgcolor: '#FFFFFF',
                        }
                    }}>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: isScrolled ? '#FFFFFF' : '#059669'
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
                        {profileMenuItems.map((setting) => (
                            <MenuItem key={setting} sx={{
                                color: '#000000',
                                width: { xs: 120, sm: 150, },
                                ":hover": {
                                    bgcolor: '#059669',
                                    color: '#FFFFFF',
                                }
                            }}
                                onClick={() => (setting === 'Logout' ? navigate('sign-in') : handleCloseUserMenu)}
                            >
                                <Typography sx={{ textAlign: 'center', fontSize: { xs: 14, sm: 16 } }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar >
    );
}
export default Navbar;
