import * as React from 'react';
import { Button } from '@mui/material';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Button variant='contained'>Sign In</Button>
    </div>
  );
}