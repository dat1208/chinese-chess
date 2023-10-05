'use client'
import React, { useState } from 'react';
import { notify } from '../../scripts/notification';
import { ApiGetRoomResponse, Room } from '@/interfaces/gameInterface';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, ListItemButton, ListItemIcon, IconButton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { API_URL } from '@/scripts/config';
import { setRoom, getRoom } from '@/scripts/storage';
const ListRoom: React.FC = () => {

    const [rooms, setRooms] = useState<Room[]>([]);

    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = async (buttonName: string) => {
        try {
            const response = await fetch(API_URL+'/api/v1/room?currentState=' + buttonName, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              
            });
      
            if (response.ok) {
              const data : ApiGetRoomResponse = await response.json() as ApiGetRoomResponse;
              
              
              if(data.status.toLowerCase() === "success") {
                console.log(data)
                setRooms(data.data)
                setActiveButton(buttonName);
                setTimeout(function() {
                  
                }, 3000);
                       
              }
            } else {
              notify('Get failed, try again!', "error");
            }
          } catch (error) {
            notify('Get failed, try again!', "error");
          }
      
      
        
    };

    function handleJoinButtonClick(roomId: string){
        setRoom(roomId);
        notify('Joined room '+roomId, "success");
          setTimeout(function() {
            window.location.replace('/game');
          }, 2000);
    }

  return (
    <div className="p-4 space-y-4">
    <h1 className="text-2xl font-semibold">List Room</h1>
       
    <button
        className={`mr-3 rounded ${
          activeButton === 'WAITING' ? 'bg-indigo-600' : 'bg-slate-400'
        } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick('WAITING')}
      >
        WAITING
      </button>
      <button
        className={`mr-3 rounded ${
          activeButton === 'PLAYING' ? 'bg-indigo-600' : 'bg-slate-400'
        } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick('PLAYING')}
      >
        PLAYING
      </button>
      <button
        className={`mr-3 rounded ${
          activeButton === 'ENDING' ? 'bg-indigo-600' : 'bg-slate-400'
        } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick('ENDING')}
      >
        ENDING
      </button>
      
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  {rooms.map((room) => (
    <div key={room.roomId}>
      <ListItem alignItems="flex-start" secondaryAction={
        <IconButton onClick={() => handleJoinButtonClick(room.roomId)} edge="end" aria-label="join">
          <AddCircleOutlineRoundedIcon />
        </IconButton>
      }>
        <ListItemAvatar>
          <Avatar alt={room.roomId} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={room.createdBy}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {room.currentState}
              </Typography>
              {` — ${room.players.length} player`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  ))}
</List>

  </div>
  );
};

export default ListRoom;
