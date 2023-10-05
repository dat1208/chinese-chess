'use client'
import React, { useState } from 'react';
import { notify } from '../../scripts/notification';

const JoinRoomForm: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = async () => {
    // Add your logic for joining the room here
    if(roomCode === undefined || roomCode === "") {
        notify("Please enter a room code", "error");
    }
    else
        notify(roomCode, "success");
  };

  function handleCreateRoom() {
    notify("Room Created", "success");
  }

  return (
    <div className="p-4 space-y-4">
    <h1 className="text-2xl font-semibold">Join Room</h1>
    <div className="flex space-x-4">
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button
        className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleJoinRoom}
      >
        Join
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

export default JoinRoomForm;
