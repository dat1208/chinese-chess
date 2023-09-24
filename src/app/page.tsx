'use client'
import Head from 'next/head';
import JoinRoomForm from './components/JoinRoomForm';
import CreateRoomForm from './components/CreateRoomForm';
import io from 'socket.io-client';
import React from 'react';


const Home: React.FC = () => {
  React.useEffect(() => {
    const socket = io('http://localhost:3200'); // Connect to the Socket.io server
    socket.connect();
    socket.emit('message', 'Hello Thg Kha!');
    
    
    return () => {
      socket.disconnect(); // Disconnect when component unmounts
    };
  }, []);
  return (
    <div>
      
      <Head>
        <title>Join Room</title>
      </Head>
      <main>
        <div style={{maxWidth:'50%'}} className="grid grid-cols-1">
          <div >
          <JoinRoomForm />
          </div>
          <div >
          <CreateRoomForm />
          </div>
        </div>
       
        
      </main>
    </div>
  );
};

export default Home;
