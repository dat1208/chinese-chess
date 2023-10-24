'use client'
import React, { useState } from 'react';
import { notify } from '../../scripts/notification';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/scripts/config';
import { ApiCreateRoomResponse } from '@/interfaces/gameInterface';
import { getTokens } from '@/scripts/storage';
const JoinRoomForm: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');
  const router = useRouter()
  const Token = getTokens();
  const handleJoinRoom = async () => {
    // Add your logic for joining the room here
    if (roomCode === undefined || roomCode === "") {
      notify("Please enter a room code", "error");
    }
    else
    setTimeout(function () {
      const gameByRoomID = `/game?room=${roomCode}`;
      router.push(gameByRoomID, { scroll: false })
    }, 500);
  };

  async function handleCreateRoom() {

    try {
      const response = await fetch(API_URL+'/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Token?.accessToken || ''
        }
      });

      if (response.ok) {
        const data : ApiCreateRoomResponse = await response.json() as ApiCreateRoomResponse;
        
        
        if(data.status.toLowerCase() === "success") {
         
          notify('Created👋 '+data.data.roomId , "success");
          
          setTimeout(function () {
            const gameByRoomID = `/game?room=${data.data.roomId}`;
            router.push(gameByRoomID, { scroll: false })
          }, 500);
                 
        }
      } else {
        notify('Create failed, try again!', "error");
      }
    } catch (error) {
      notify('Create failed, try again!', "error");
    }
    
  }

  return (
    <div className=''>
      <h1><strong>Tham gia phòng:</strong></h1>
      <div className="flex space-x-4">
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Nhập mã phòng"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleJoinRoom}
        >
          Tham gia
        </button>
        <button
          className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCreateRoom}
        >
          Tạo phòng
        </button>
      </div>
    </div>
  );
};

export default JoinRoomForm;
