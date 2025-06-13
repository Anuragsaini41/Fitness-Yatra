import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stack,
  AppBar,
  Toolbar,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Logo from '../assets/images/Logo.png';
import { useAuth } from '../contexts/AuthContext';
// Import the CSS
import '../styles/navbar.css';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
    handleCloseMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Exercises', path: '#exercises' },
    { name: 'Health Calculator', path: '/health-calculator' },
    ...(currentUser
      ? [
          { name: 'Workout Plan', path: '/workout-generator' },
          { name: 'Progress Tracker', path: '/progress-tracker' },
          { name: 'Meal Planner', path: '/meal-planner' },
          { name: 'Community', path: '/community' }, // नया लिंक जोड़ें
        ]
      : []),
  ];

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const drawer = (
    <Box className="mobile-drawer">
      <IconButton onClick={handleDrawerToggle} className="drawer-close-btn">
        <CloseIcon />
      </IconButton>

      <Box className="drawer-header">
        <img src={Logo} alt="logo" style={{ width: '40px', height: '40px' }} />
        <Typography className="logo-text">Fitness Yatra</Typography>
      </Box>

      {currentUser && (
        <Box className="drawer-user-profile">
          <Avatar
            sx={{
              bgcolor: 'var(--primary-color)',
            }}
          >
            {getInitials(userProfile?.username || currentUser.displayName)}
          </Avatar>
          <Typography className="drawer-user-name">
            {userProfile?.username || currentUser.displayName || 'User'}
          </Typography>
        </Box>
      )}

      <List className="drawer-nav-list">
        {navLinks.map((item) => (
          <ListItem key={item.name} className="drawer-nav-item">
            <Link to={item.path} className="drawer-nav-link" onClick={handleDrawerToggle}>
              {item.name}
            </Link>
          </ListItem>
        ))}
        {!currentUser ? (
          <ListItem className="drawer-nav-item">
            <Link to="/login" className="drawer-login-btn" onClick={handleDrawerToggle}>
              Login
            </Link>
          </ListItem>
        ) : (
          <>
            <ListItem className="drawer-nav-item">
              <Link to="/dashboard" className="drawer-nav-link" onClick={handleDrawerToggle}>
                Dashboard
              </Link>
            </ListItem>
            <ListItem className="drawer-nav-item">
              <Link
                to="#"
                className="drawer-nav-link"
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
              >
                Logout
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: scrolled ? '0 4px 15px rgba(229, 57, 53, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        paddingY: { xs: 0.5, md: 1 },
        height: { xs: '60px', md: 'auto' }, // Add fixed height for mobile
        display: 'flex',
        alignItems: 'center',
      }}
      elevation={scrolled ? 1 : 0}
      className="app-bar"
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1600px',
          mx: 'auto',
          px: { xs: 1, sm: 2, md: 4 },
          minHeight: { xs: '56px', md: '64px' },
          display: 'flex',
          alignItems: 'center', // Ensure vertical alignment
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              src={Logo}
              alt="logo"
              className="logo-img"
              style={{ width: '50px', height: '50px' }}
            />
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                fontSize: '24px',
              }}
            >
              Fitness Yatra
            </Box>
          </Stack>
        </Link>

        {isMobile ? (
          <Stack direction="row" spacing={1} alignItems="center">
            {currentUser && (
              <IconButton
                onClick={handleProfileMenu}
                sx={{
                  p: 0,
                  border: '2px solid',
                  borderColor: '#e53935',
                  width: 36,
                  height: 36,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'var(--primary-color)',
                    width: 32,
                    height: 32,
                    fontSize: '14px',
                  }}
                >
                  {getInitials(userProfile?.username || currentUser.displayName)}
                </Avatar>
              </IconButton>
            )}

            <IconButton
              className="menu-icon-button"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 'var(--drawer-width)',
                  background: 'var(--drawer-bg)',
                  boxSizing: 'border-box',
                  animation: 'slideIn var(--transition-speed) ease-out',
                },
              }}
            >
              {drawer}
            </Drawer>
          </Stack>
        ) : (
          <Stack direction="row" spacing={4} alignItems="center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                <Button
                  sx={{
                    color: '#3A1212',
                    fontWeight: 600,
                    fontSize: '18px',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'transparent',
                      '&::after': {
                        width: '100%',
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '5px',
                      left: '50%',
                      width: '0%',
                      height: '2px',
                      background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                  }}
                >
                  {link.name}
                </Button>
              </Link>
            ))}

            {!currentUser ? (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                startIcon={<FitnessCenterIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)',
                  borderRadius: '30px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '8px 20px',
                  boxShadow: '0 4px 10px rgba(229, 57, 53, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
                    boxShadow: '0 6px 15px rgba(229, 57, 53, 0.4)',
                  },
                }}
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton
                  onClick={handleProfileMenu}
                  sx={{
                    p: 0,
                    border: '2px solid',
                    borderColor: '#e53935', // Changed from 'var(--primary-color)'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'var(--primary-color)',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {getInitials(userProfile?.username || currentUser.displayName)}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() => {
                      navigate('/dashboard');
                      handleCloseMenu();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
