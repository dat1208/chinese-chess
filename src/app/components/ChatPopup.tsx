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
    
    React.useEffect(() => {
        const token =  getTokens();
        console.log(token?.accessToken);
        const socket = io(SOCKET_URL); // Connect to the Socket.io serve
        socket.emit('JOIN_ROOM', roomCurrent, {userId: 'string' , accessToken: token?.accessToken, data: 'any'});


        socket.on('message', (msg) => {
          console.log('Received message:', msg);
          // Handle the message here
        });
        
        
        return () => {
          socket.disconnect(); // Disconnect when component unmounts
        };
      }, []);
  const roomCurrent = getRoom();
  return (
    <div>
      <h1>Chat</h1>
      <button>RoomId: {roomCurrent}</button>
    </div>
  );
}
