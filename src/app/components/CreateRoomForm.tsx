'use client'
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../scripts/notification';
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

  const handleCreateRoom = async () => {
    notify(roomCode + ' room created' ,"success");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Create Room</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          className="rounded bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          onClick={handleGenerateRoom}
        >
          Generate
        </button>
        <button
          className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCreateRoom}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateRoomForm;
