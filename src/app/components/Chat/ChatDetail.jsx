import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ModalMain from "../ModalMain";
import User1 from "../../../../public/images/hero1.jpg";
import User4 from "../../../../public/images/hero4.jpg";
import { IOChanel, SocketIOService } from "@/scripts/socket";
import { useSearchParams } from "next/navigation";
import styles from "../../../../public/css/chess/styles.module.css";
import Message from "@mui/icons-material/Message";


const ChatDetail = ({ socket, username }) => {
  
  const [showModal, setShowModal] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesContainerRef = useRef(null);

  const searchParams = useSearchParams();
  const room = searchParams.get("room") ?? "";
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //   setCurrentMessage(currentMessage);
      socket.emit(IOChanel.CHAT_CHANEL_SEND, messageData);
      setCurrentMessage("");
    }
  }
    const getCache = (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };
    const scrollToBottom = () => {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    };
    const roomKey = `chatMessages_${room}`;
    useEffect(() => {
      const cachedMessages = getCache(roomKey);
      if (cachedMessages) {
        setMessageList(cachedMessages);
      }
    }, [roomKey]);

    useEffect(() => {
      
      const roomKey = `chatMessages_${room}`;

      socket.on(IOChanel.CHAT_CHANEL_RECEIVE, (data) => {
        setMessageList((list) => {
          const updatedList = [...list, data];
          localStorage.setItem(roomKey, JSON.stringify(updatedList));
          return updatedList;
        });
      });
    }, [socket, room]);
    const customScrollbarStyle = {
      overflowY: 'auto',
      maxHeight: '400px',
      scrollbarColor: '#f5f5f5',
    };
    useEffect(() => {
      scrollToBottom();
    }, [messageList]);
    return (
      <div
        id="main"
        ref={messagesContainerRef}
        style={{
          position: "fixed",
          padding: "2.5rem",
          backgroundColor: "#fff",
          width: "330px",
          height: "500px",
          bottom: "10px",
          right: "10px",
          borderRadius: "15px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)",
        }}
      >
        <div
          style={customScrollbarStyle}
        >
          <div style={{
            marginTop: "30px"
          }}>
            {messageList.map((messageContent, key) => {
              return (
                <div
                  key={key}
                  className={
                    messageContent.author == username
                      ? styles.containerReviceMess
                      : styles.containerSendMess
                  }
                >
                  <div className={styles.mess}>
                    <div className={styles.detail}>{messageContent.message}</div>
                    <Image
                      className={styles.avatar}
                      src={messageContent.author == username ? User1 : User4}
                      alt="User Image"
                    />
                    <div className={styles.name}>{messageContent.author}</div>
                    <div className={styles.time}>{messageContent.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 w-full p-3 border-t border-gray-300">
            <div className="flex items-center">
              <input
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                type="text"
                value={currentMessage}
                placeholder="Enter the message"
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <SendIcon
                onClick={() => {
                  sendMessage();
                }}
                className="ml-2 h-6 w-6 text-blue"
              />
            </div>
          </div>
        </div>
        {showModal && <ModalMain setShowModal={setShowModal} />}
      </div>
    );
  };
export default ChatDetail;
