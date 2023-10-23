import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ModalMain from "../ModalMain";
import User1 from "../../../../public/images/hero1.jpg";
import User4 from "../../../../public/images/hero4.jpg";
import { IOChanel, SocketIOService } from "@/scripts/socket";
import { useSearchParams } from "next/navigation";
import { ReceiverComponent } from "../ChessBoard/ChessBoard";
import styles from "../../../../public/css/chess/styles.module.css"
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "@mui/icons-material/Message";

const ChatDetail = ({ socket, username}) => {
    const [showModal, setShowModal] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentMessage, setCurrentMessage] = useState("");

    const searchParams = useSearchParams();
    const room = searchParams.get("room") ?? "";
    const sendMessage = async () => {
        if (currentMessage !== ""){
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
          await socket.emit(IOChanel.CHAT_CHANEL_SEND, messageData);
          setCurrentMessage('');
        }
    }
    useEffect(()=>{
        socket.on(IOChanel.CHAT_CHANEL_RECEIVE, (data) => {
            setMessageList((list) => [...list, data]);
            console.log('Data receive from chat detail: '+ JSON.stringify(messageList));
          });
    }, [socket])
    return (
        <div
            className='fixed p-10 bg-indigo-800'
            id='main'
            style={{
                width: '330px',
                height: '600px',
                top: '30px',
                right: '10px',
                borderRadius: '25px',
            }}
        >
            <div>
                <div className={styles.containerSendMess}>
                    {/* phần con */}
                    <div className={styles.mess}>
                        <Image className={styles.avatar} src={User1} alt="User Image" />
                        <div className={styles.detail}>Xin chào!</div>
                        <div className={styles.name}>Phan Hoàng Kha</div>
                    </div>
                </div>
                {/* phần cha */}
                <div className={styles.containerReviceMess}>
                    {/* phần con */}
                    <div className={styles.mess}>
                        <div className={styles.detail}>Chào Kha!</div>
                        <Image className={styles.avatar} src={User4} alt="User Image" />
                        <div className={styles.name}>Hồ Thành Vinh</div>
                    </div>
                </div>
                <div className={styles.containerSendMess}>
                    <div className={styles.mess}>
                        <Image className={styles.avatar} src={User1} alt="User Image" />
                        <div className={styles.detail}>Kéo api xong chưa?</div>
                        <div className={styles.name}>Phan Hoàng Kha</div>
                    </div>
                </div>
                <div className={styles.containerReviceMess}>
                    <div className={styles.mess}>
                        <div className={styles.detail}>Đang kéo api lòi l nè Kha!</div>
                        <Image className={styles.avatar} src={User4} alt="User Image" />
                        <div className={styles.name}>Hồ Thành Vinh</div>
                    </div>
                </div>
                {messageList.map((messageContent, key) => {
                    return (
                    <div
                    key = {key}
                    className={
                        messageContent.author == username
                            ? styles.containerReviceMess
                            : styles.containerSendMess
                        }
                    >
                        <div className={styles.mess}>
                                <div className={styles.detail}>{messageContent.message}</div>
                                <Image className={styles.avatar} src={User4} alt="User Image" />
                                <div className={styles.name}>{messageContent.author}</div>
                        </div>
                    </div>
                    );
                })}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-300">
                    <div className="flex items-center">
                        <input
                            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                            type="text"
                            value={currentMessage}
                            placeholder="Hey..."
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
                            className="ml-2 h-6 w-6 text-gray-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDetail;
