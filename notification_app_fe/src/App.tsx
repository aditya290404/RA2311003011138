import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '@fontsource/inter';
import { PriorityInbox } from './pages/PriorityInbox';
import { AllNotifications } from './pages/AllNotifications';
import { Log } from '../../logging_middleware';

const theme = createTheme({
  palette: {
    primary: { main: '#007AFF' },
    secondary: { main: '#FF3B30' },
    background: { default: '#F5F5F7', paper: '#FFFFFF' },
    text: { primary: '#1D1D1F', secondary: '#86868B' },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em', color: '#1D1D1F' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    body1: { letterSpacing: '-0.01em' },
    body2: { letterSpacing: '-0.01em' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 500,
          padding: '6px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function Navigation() {
  const location = useLocation();
  const isPriority = location.pathname === '/priority';

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.75)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        color: '#1D1D1F'
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <NotificationsIcon sx={{ mr: 1, color: '#1D1D1F' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#1D1D1F' }}>
              Campus Notifications
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color={!isPriority ? "primary" : "inherit"} 
              variant={!isPriority ? "contained" : "text"} 
              disableElevation 
              component={Link} 
              to="/" 
              sx={{ borderRadius: 12, '&:hover': !isPriority ? {} : { bgcolor: 'rgba(0,0,0,0.05)' } }}
            >
              All
            </Button>
            <Button 
              color={isPriority ? "primary" : "inherit"} 
              variant={isPriority ? "contained" : "text"} 
              disableElevation 
              component={Link} 
              to="/priority" 
              sx={{ borderRadius: 12, '&:hover': isPriority ? {} : { bgcolor: 'rgba(0,0,0,0.05)' } }}
            >
              Priority Inbox
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function App() {
  useEffect(() => {
    Log("frontend", "info", "component", "Application initialized and mounted");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />

        <Container maxWidth="md" sx={{ pt: 4, pb: 8, position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityInbox />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
