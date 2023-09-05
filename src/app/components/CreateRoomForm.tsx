'use client'
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const CreateRoomForm: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');
  const generateRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 6; // You can adjust the length of the room code as needed
    let roomCode = '';
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      roomCode += characters.charAt(randomIndex);
    }
  
    return roomCode;
  };
  const handleGenerateRoom = async () => {
    const randomRoomCode = generateRoomCode();
    setRoomCode(randomRoomCode);
  };

  return (
    <div className="p-4 space-y-4">
        
      <h1 className="text-2xl font-semibold">Create Room</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
          onClick={handleGenerateRoom}
        >
          Generate
        </button>
      
      </div>
      
    </div>
  );
};

export default CreateRoomForm;
