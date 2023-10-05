'use client'
import Head from 'next/head';
import JoinRoomForm from './components/JoinRoomForm';
import { SOCKET_URL } from '@/scripts/config';
import io from 'socket.io-client';
import React from 'react';
import ListRoom from './components/ListRoom';

const Home: React.FC = () => {

  return (
    <div>
      
      <Head>
        <title>Join Room</title>
      </Head>
      <main className='grid grid-flow-col grid-cols-2'>
        <div style={{maxWidth:'75%'}} className="grid grid-cols-1">
          <div >
          <JoinRoomForm />
          </div>
          <div >
          </div>
        </div>
        <div style={{maxWidth:'100%'}} className="grid">
            <ListRoom></ListRoom>
        </div>
       
      </main>
    </div>
  );
};

export default Home;
