import React, { ReactNode } from 'react';
import { setRoom, getRoom } from '@/scripts/storage';
import { SOCKET_URL } from '@/scripts/config';
import { getTokens } from '@/scripts/storage';
import io from 'socket.io-client';

interface SocketMetadata{
    userId: string ;
    accessToken: string;
    data: any;
}
export default function Chat(): ReactNode {

  const chatComponentStyles: React.CSSProperties = {
    position: 'fixed',
    top: 30,
    right: 200
  };
    
    React.useEffect(() => {
        const token =  getTokens();
        console.log(token?.accessToken);
        // const socket = io(SOCKET_URL); // Connect to the Socket.io serve
        


        // socket.on('message', (msg) => {
        //   console.log('Received message:', msg);
        //   // Handle the message here
        // });
        
        
        // return () => {
        //   socket.disconnect(); // Disconnect when component unmounts
        // };
      }, []);
  const roomCurrent = getRoom();
  return (
    <>
      <h1>Chat</h1>
      <button>RoomId: {roomCurrent}</button>

    </>
  );
}
