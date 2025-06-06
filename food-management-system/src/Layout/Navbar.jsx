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
import Logo from '../assets/logo-remove-bg.png'
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { globalPx } from '../Theme/Theme';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUserType } from '../reducers/userSlice';


const Navbar = ({ callingFrom }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userType } = useSelector((state) => state.user.userData);
    const isAuthenticated = userType && userType !== null;
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))

    const [currentPage, setCurrentPage] = useState('Home');
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [profileMenuItems, setProfileMenuItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

    let pages = [];
    userType === 'donor'
        ? pages = ['Home', 'Insights', 'Projects', 'About Us', 'Donate Now']
        : userType === 'recipient'
            ? pages = ['Home', 'Insights', 'Projects', 'About Us', 'Request Food']
            : pages = ['Home', 'Insights', 'Projects', 'About Us'];
    const settings = callingFrom === 'PROFILE' ? ['Logout', 'Home'] : ['Profile','Home' ,'Logout'];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseMenu = (page) => {
        setAnchorElNav(null);
        setAnchorElUser(null);
        setCurrentPage(page);

        if (page === "Insights") {
            document.querySelector("#insights-section")?.scrollIntoView({ behavior: "smooth" });
        } else if (page === "Projects") {
            document.querySelector("#projects-section")?.scrollIntoView({ behavior: "smooth" });
        } else if (page === "Home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate('/home');
        } else if (page === "About Us") {
            navigate('/about-us');
        } else if (page === "Profile") {
            navigate('/profile/dashboard');
        } else if (page === "Logout") {
            // Clear Redux state on logout
            dispatch(setUserType(null));
            dispatch(setUserData(false));
            localStorage.removeItem('token');
            navigate("/home");
        } else if (page === "Donate Now") {
            navigate('/profile/donate-food', { state: { initialTab: 'Donate Food' } });
        } else if (page === "Request Food") {
            navigate('/profile/request-donations', { state: { initialTab: 'Request Donations' } });
        }
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
            bgcolor: callingFrom === 'PROFILE' ? '#FFFFFF' : isScrolled ? '#FFFFFF' : 'transparent',
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
                        width: 150,
                        objectFit: 'cover',
                    }}
                />
                <Box sx={{ flexGrow: 1, display: { xs: callingFrom === 'PROFILE' ? 'none' : isAuthenticated ? 'none' : 'flex', md: 'none' } }}>
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
                        onClose={handleCloseMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {menuItems.map((page) => (
                            <MenuItem key={page} onClick={() => handleCloseMenu(page)} sx={{
                                color: currentPage === page ? '#FFFFFF' : '#000000',
                                bgcolor: currentPage === page ? '#059669' : '#FFFFFF',
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
                            onClick={() => handleCloseMenu(page)}
                            sx={{
                                my: 2,
                                color: currentPage === page ? '#059669' : isScrolled ? '#000000' : '#FFFFFF',
                                display: callingFrom === 'PROFILE' ? 'none' : 'block',
                                fontSize: 16,
                                fontWeight: currentPage === page ? 600 : 500,
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
                    display: { xs: 'none', md: callingFrom === 'PROFILE' ? 'none' : isAuthenticated ? 'none' : 'flex' },
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
                        onClick={() => navigate('join-us')}
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
                        Join Us
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 0, display: callingFrom === 'PROFILE' ? 'flex' : isAuthenticated ? 'flex' : 'none' }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{
                        p: 0,
                        bgcolor: callingFrom === 'PROFILE' ? '#059669' : isScrolled ? '#059669' : '#FFFFFF',
                        width: 45,
                        height: 45,
                        ":hover": {
                            transform: 'scale(1.02)',
                            bgcolor: callingFrom === 'PROFILE' ? '#059669' : isScrolled ? '#059669' : '#FFFFFF',
                        }
                    }}>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: callingFrom === 'PROFILE' ? '#FFFFFF' : isScrolled ? '#FFFFFF' : '#059669',
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
                        onClose={handleCloseMenu}
                    >
                        {profileMenuItems.map((setting) => (
                            <MenuItem key={setting} sx={{
                                color: currentPage === setting ? '#FFFFFF' : '#000000',
                                bgcolor: currentPage === setting ? '#059669' : '#FFFFFF',
                                width: { xs: 120, sm: 150, },
                                ":hover": {
                                    bgcolor: '#059669',
                                    color: '#FFFFFF',
                                }
                            }}
                                onClick={() => handleCloseMenu(setting)}
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