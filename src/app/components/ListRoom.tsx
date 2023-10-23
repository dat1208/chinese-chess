import React, { useEffect, useState } from 'react';
import { notify } from '../../scripts/notification';
import { ApiGetRoomResponse, Room, RoomStatus } from '@/interfaces/gameInterface';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, IconButton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { API_URL } from '@/scripts/config';
import { setRoom } from '@/scripts/storage';
import { useRouter } from 'next/navigation';
import JoinRoomForm from './JoinRoomForm';

const ListRoom: React.FC = () => {

  useEffect(() =>{
    handleButtonClick('WAITING')
  },[]);

  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeButton, setActiveButton] = useState('');
  const [reachedEndOfList, setReachedEndOfList] = useState(false);

  const handleLoadMore = async (buttonName: string = 'WAITING') => {
    try {
      const nextPage = Math.ceil(rooms.length / 5) + 1;

      const response = await fetch(API_URL + `/room?currentState=${buttonName}&page=${nextPage}&pageSize=5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: ApiGetRoomResponse = await response.json() as ApiGetRoomResponse;

        if (data.status.toLowerCase() === "success") {
          const newRooms = data.data;
          setRooms(prevRooms => [...prevRooms, ...newRooms]);

          if (newRooms.length < 5) {
            setReachedEndOfList(true);
          }
        }
      } else {
        notify('Get failed, try again!', "error");
      }
    } catch (error) {
      notify('Get failed, try again!', "error");
    }
  };

  const handleButtonClick = async (buttonName: string = 'WAITING') => {
    setReachedEndOfList(false);
    try {
      const response = await fetch(API_URL + '/room?currentState=' + buttonName + '&page=1&pageSize=5', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: ApiGetRoomResponse = await response.json() as ApiGetRoomResponse;

        if (data.status.toLowerCase() === "success") {
          console.log(data);
          setRooms(data.data)
          setActiveButton(buttonName);
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
        {rooms.map((room, index) => (
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
                    {room.players && room.players.length !== undefined ? ` — ${room.players.length} người chơi` : ` — 0 người chơi`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            {index === rooms.length - 1 && reachedEndOfList && (
              <Typography align="center" variant="body2" color="text.secondary">
                Hết
              </Typography>
            )}
          </div>
        ))}
        {reachedEndOfList && rooms.length === 0 && (
          <Typography align="center" variant="body2" color="text.secondary">
            Không tìm thấy phòng
          </Typography>
        )}
      </List>
      {!reachedEndOfList && (
        <button
          className=" mx-auto my-4 p-2 bg-indigo-60 rounded px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500 border shadow-sm hover:bg-gray-300 "
          onClick={() => handleLoadMore(activeButton)}
        >
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default ListRoom;
