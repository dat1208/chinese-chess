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

var displayListMessage = new Array();
var Sender = "";
export function DisplaySenderComponent(sender) {
  Sender = sender;
}
export function DisplayMessage(message) {
  displayListMessage = message;
  console.log("message list: " + JSON.stringify(displayListMessage));
}

const ChatDetail = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const searchParams = useSearchParams();
  const room = searchParams.get("room") ?? "";
  // const sendMessage = () => {
  //     socket.emit(IOChanel.CHAT_CHANEL, newMessage);
  //     setNewMessage('');
  //   };

  const displayMsgRef = useRef(null);
  const display = (msg, type) => {
    const msgDiv = document.createElement("div");
    let className = type;
    msgDiv.classList.add(className, "flex");
    msgDiv.classList.add(className, "justify-start");
    msgDiv.classList.add(className, "mb-3");
    let times = new Date().toLocaleTimeString();

    let innerText = `
            <div className="flex items-center group relative">
                <Image src=${User1} className='w-10 h-10 rounded-full mr-5' />
                <div className="bg-gray-200 p-2 rounded-lg">${msg.message}</div>
                <div className="hidden group-hover:block absolute -top-10 -left-17 text-black bg-white rounded-[0.5rem] p-1">
                ${msg.user}
                </div>
        </div>`;

    msgDiv.innerHTML = innerText;

    displayMsgRef.current.appendChild(msgDiv);
  };

  const sendMessage = () => {
    ReceiverComponent(newMessage);
    setMessages("");
  };

  const sendMsg = (message) => {
    let msg = {
      user: Sender,
      message: newMessage,
    };
    display(msg, "you-message");
  };
  //   useEffect(() => {
  //     socket.on(IOChanel.CHAT_CHANEL, (data) => {
  //       const { sender, message } = data;
  //       setMessages([...messages, { sender, message }]);
  //     });

  //     // Hủy lắng nghe khi component unmount
  //     return () => {
  //       socket.off(IOChanel.CHAT_CHANEL);
  //     };
  //   }, [messages]);
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
        {/* <button
                    onClick={() => showModal ? setShowModal(false) : setShowModal(true)}
                >
                    <ArrowBackIosIcon className="h-6 w-6" ></ArrowBackIosIcon>

                    <span className="ml-2 text-sm font-medium">Back</span>
                </button> */}
        {/* Phần chat */}
        <div className="p-4 text-black rounded-lg" ref={displayMsgRef}>
          {/* phần cha */}
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
          {/* Thêm tin nhắn và avatar khác theo định dạng tương tự */}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-300">
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
              placeholder="Aa"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {/* <input
                            type="text"
                            value={currentMessage}
                            placeholder="Hey..."
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                        /> */}
            <SendIcon
              onClick={() => {
                sendMessage();
                sendMsg();
              }}
              className="ml-2 h-6 w-6"
            />
          </div>
        </div>
      </div>
      {showModal && <ModalMain setShowModal={setShowModal} />}
    </div>
  );
};

export default ChatDetail;
