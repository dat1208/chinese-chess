import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
function Sidebar() {
  return (
    <div className="flex flex-col items-center w-44 h-full overflow-hidden text-gray-100 bg-indigo-800">
      <a className="flex items-center w-full px-3 mt-3" href="/">
       <SportsEsportsRoundedIcon></SportsEsportsRoundedIcon>
        <span className="ml-2 text-sm font-bold">Chinese Chess</span>
      </a>
      <div className="w-full px-2">
      <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
      <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-600" href="/">
        <HomeRoundedIcon></HomeRoundedIcon>
        <span className="ml-2 text-sm font-medium">Home</span>
      </a>
      <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-600" href="#">
        <MeetingRoomRoundedIcon></MeetingRoomRoundedIcon>
        <span className="ml-2 text-sm font-medium">List Room</span>
      </a>
      <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-600" href="/auth/login">
        <LoginRoundedIcon></LoginRoundedIcon>
        <span className="ml-2 text-sm font-medium">Login</span>
      </a>
      <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-600" href="/auth/register">
        <VpnKeyRoundedIcon></VpnKeyRoundedIcon>
        <span className="ml-2 text-sm font-medium">Register</span>
      </a>
      <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-600" href="/game">
    
        <span className="ml-2 text-sm font-medium">Cờ Cờ</span>
      </a>
      
      {/* Repeat the above structure for other menu items */}
    </div>
      </div>
      <a className="flex items-center justify-center w-full h-16 mt-auto bg-indigo-700 hover:bg-indigo-600" href="/">
        <LogoutRoundedIcon></LogoutRoundedIcon>
        <span className="ml-2 text-sm font-medium">Logout</span>
      </a>
    </div>
  );
}

export default Sidebar;
