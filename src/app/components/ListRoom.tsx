'use client'
import React, { useState } from 'react';
import { notify } from '../../scripts/notification';
import { ApiGetRoomResponse, Room, RoomStatus } from '@/interfaces/gameInterface';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, IconButton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { API_URL } from '@/scripts/config';
import { setRoom, } from '@/scripts/storage';
import { useRouter } from 'next/navigation';
import JoinRoomForm from './JoinRoomForm';

const ListRoom: React.FC = () => {
  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = async (buttonName: string = 'WAITING') => {
    try {
      const response = await fetch(API_URL + '/room?currentState=' + buttonName, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: ApiGetRoomResponse = await response.json() as ApiGetRoomResponse;


        if (data.status.toLowerCase() === "success") {
          console.log(data)
          setRooms(data.data)
          setActiveButton(buttonName);
          setTimeout(function () {

          }, 3000);

        }
      } else {
        notify('Get failed, try again!', "error");
      }
    } catch (error) {
      notify('Get failed, try again!', "error");
    }

  };

  function handleJoinButtonClick(roomId: string) {
    setRoom(roomId);
    setTimeout(function () {
      const gameByRoomID = `/game?room=${roomId}`;
      router.push(gameByRoomID, { scroll: false })
    }, 500);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Trang chủ</h1>
      <div className="w-50">
        <JoinRoomForm></JoinRoomForm>
      </div>
      <h1><strong>Danh sách phòng đấu:</strong></h1>
      <button
        className={`mr-3 rounded ${activeButton === 'WAITING' ? 'bg-indigo-600' : 'bg-slate-400'
          } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick('WAITING')}
      >
        Đang thiếu người
      </button>
      <button
        className={`mr-3 rounded ${activeButton === 'PLAYING' ? 'bg-indigo-600' : 'bg-slate-400'
          } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick('PLAYING')}
      >
        Đang thi đấu
      </button>
      <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
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
                primary={`Mã phòng: ${room.roomId}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {room?.currentState === RoomStatus.WAITING ? 'Thiếu người' : 'Đang thi đấu'}
                    </Typography>
                    {` — ${room.players.length} người chơi`}
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
