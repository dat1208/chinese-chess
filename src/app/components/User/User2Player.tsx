// User2Player.tsx

import React from "react";
import "./User2Player.css";
import { User } from "@/interfaces/userInterface";
import { getUser } from "@/scripts/storage";

interface User2PlayerProps {
  children: React.ReactNode;
}

export default function User2Player({ children }: User2PlayerProps) {
  const [userLeft, setUserLeft] = React.useState<User | null>(null);
  const [userRight, setUserRight] = React.useState<User | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo: User = getUser() as User;

      // If userLeft is not set, set it as the current user
      if (!userLeft) {
        setUserLeft(userInfo);
      } else if (!userRight && userLeft._id !== userInfo._id) {
        // If userRight is not set and the current user is different from userLeft, set it as the current user
        setUserRight(userInfo);
      }

      console.log(userInfo);
    };

    fetchUserInfo();
  }, [userLeft, userRight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Assuming you only want to allow changes for the right user
    setUserRight({ ...userRight!, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(userRight);
  };

  return (
    <div className="user2player-container">
      {/* Phía bên trái */}
      <div className="player-info left">
        <div className="user-details">
          <div className="avatar">
            <img
              width={60}
              src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"
              alt="Avatar 1"
            />
          </div>
          <div className="text-info">
            <div className="bold-text">{userLeft?.username}</div>
            <div className="status-and-time">
              <div
                className={`status ${isPlaying ? "gray-text" : "green-text"}`}
              >
                {isPlaying ? "Đang chơi" : "Chờ đối thủ"}
              </div>
              <div className="status gray-text">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phía bên phải */}
      <div className="player-info right">
        {userRight ? (
          // Nếu userRight đã được thiết lập, hiển thị thông tin người chơi
          <div className="user-details">
            <div className="avatar">
              <img
                 width={60}
                 src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"
                 alt="Avatar 2"
              />
            </div>
            <div className="text-info">
              <div className="bold-text">{userRight.username}</div>
              <div className="status-and-time">
                <div
                  className={`status ${isPlaying ? "gray-text" : "green-text"}`}
                >
                  {isPlaying ? "Đang chơi" : "Chờ đối thủ"}
                </div>
                <div className="status gray-text">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Nếu userRight chưa được thiết lập, hiển thị dòng chờ người chơi
          <div className="user-details">
            <div className="avatar">
              <img
                 width={60}
                 src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"
                 alt="Avatar 2"
              />
            </div>
            <div className="text-info">
              <div className="bold-text">Đang đợi người chơi</div>
              <div className="status-and-time">
                <div
                  className={`status ${isPlaying ? "gray-text" : "green-text"}`}
                >
                  {isPlaying ? "Đang chơi" : "Chờ đối thủ"}
                </div>
                <div className="status gray-text">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
