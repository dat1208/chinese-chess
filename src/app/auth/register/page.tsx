import { Button } from '@mui/material';
import * as React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
         <Button variant='contained'>Sign Up</Button>
    </div>
  );
}