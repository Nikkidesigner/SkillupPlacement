import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'info' }}>
              <Button variant="text" color="info" size="large">
                SkillUpPlacement
              </Button>
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="black" size="small" onClick={() => window.scrollTo({ top: document.getElementById('highlights').offsetTop, behavior: 'smooth' })}>
                Highlights
              </Button>
              <Button variant="text" color="black" size="small" onClick={() => window.scrollTo({ top: document.getElementById('contact-us').offsetTop, behavior: 'smooth' })}>
                Contact Us
              </Button>
              <Button variant="text" color="black" size="small" onClick={() => window.scrollTo({ top: document.getElementById('testimonials').offsetTop, behavior: 'smooth' })}>
                Testimonials
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button color="primary" variant="text" size="small">
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button color="primary" variant="contained" size="small">
                Register as Student
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Testimonials</MenuItem>
                <MenuItem>About Us</MenuItem>
                <MenuItem>Contact Us</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Register as Student
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Login
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
