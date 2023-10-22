import React, { useState } from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import ChatIcon from '@mui/icons-material/Message';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import Person from '@mui/icons-material/Person';
import ModalMain from "./ModalMain"

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const handleLogout = () => {
    localStorage.clear()
  };

  return (
    <div className="flex flex-col items-center w-44 h-full overflow-hidden text-gray-100 bg-indigo-800 relative">
      <a className="flex items-center w-full px-3 mt-3" href="/">
        <SportsEsportsRoundedIcon></SportsEsportsRoundedIcon>
        <span className="ml-2 text-sm font-bold">Chinese Chess</span>
      </a>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
          <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-600" href="/">
            <HomeRoundedIcon></HomeRoundedIcon>
            <span className="ml-2 text-sm font-medium">Trang chủ</span>
          </a>
          {showModal && <ModalMain setShowModal={setShowModal} />}

          <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover-bg-indigo-600" href="/auth/profile">
            <Person></Person>
            <span className="ml-2 text-sm font-medium">Trang cá nhân</span>
          </a>
          {/* Repeat the above structure for other menu items */}
        </div>
      </div>
      <a onClick={handleLogout} className="flex items-center justify-center w-full h-16 mt-auto bg-indigo-700 hover-bg-indigo-600" href="/auth/login">
        <LogoutRoundedIcon></LogoutRoundedIcon>
        <span className="ml-2 text-sm font-medium">Logout</span>
      </a>
      <button
        onClick={() => showModal ? setShowModal(false) : setShowModal(true)}
        className="fixed bottom-0 right-0 p-4 m-4 bg-indigo-600 rounded-full text-white hover-bg-indigo-700"
      >
        <ChatIcon></ChatIcon>
      </button>
    </div>

  );
}

export default Sidebar;
