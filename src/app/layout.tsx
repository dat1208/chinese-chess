'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Loading from './components/Loading';
import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

const DRAWER_WIDTH = 240;


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
          <Drawer
            variant="permanent"
            anchor="left"
          >
            <Sidebar></Sidebar>
            
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
        <ToastContainer />
        
      </body>
    </html>
  );
}