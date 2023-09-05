'use client'
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import Loading from './components/Loading';
import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';
import { ToastContainer } from 'react-toastify';
import './styles/globals.css'
export const metadata = {
  title: 'Chinese Chess',
  description: 'Chinese Chess: Next.js App Router + Material UI v5',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeRoundedIcon },
  { text: 'List Room', href: '/rooms', icon: MeetingRoomRoundedIcon },
  { text: 'Login', href: '/auth/login', icon: LoginRoundedIcon },
  { text: 'Register', href: '/auth/register', icon: PersonAddAltRoundedIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Logout', icon: LogoutIcon },
];



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading by adding a delay (you can replace this with actual loading logic)
    setTimeout(() => {
      setLoading(false); // Set loading to false when the app has finished loading
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/images/favicon.ico" />
      </head>
      
        <body>        
        <ThemeRegistry>
          <AppBar color='primary' position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <SportsEsportsIcon sx={{ color: '#444', mr: 2, fontSize:35}} />
              <Typography variant="h6" fontSize={20} noWrap component="div" color="black">
              CHINESE CHESS
              </Typography>
             
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: ['48px', '56px', '64px'],
                height: 'auto',
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                  <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 'auto' }} />
            <List>
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {loading ? (
        // Display loading component while loading is true
        <Loading />
      ) : (
        // Display the actual application content when loading is false
        children
      )}
           
          </Box>
        </ThemeRegistry>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        
      </body>
    </html>
  );
}