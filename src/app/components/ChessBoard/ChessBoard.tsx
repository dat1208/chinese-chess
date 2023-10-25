'use client'
import { IOChanel, SocketIOService } from "@/scripts/socket";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Team } from "./interface";
import ChatIcon from '@mui/icons-material/Message';
import ChatDetail from "../Chat/ChatDetail";
import DisplayMessage from '../Chat/ChatDetail'
import { API_URL , URL} from "@/scripts/config";
import { getUser } from "@/scripts/storage";
import User2Player from "../User/User2Player";

const UPDATE_CHESS_BOARD_CUSTOM_EVENT = 'UPDATE_CHESS_BOARD_CUSTOM_EVENT';
const UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT = 'UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT';
const CAN_ACCESS_CHESS_BOARD = 'CAN_ACCESS_CHESS_BOARD';
const WINNER_NOTIFICATION = 'WINNER_NOTIFICATION';
const UPDATE_WINNER_FROM_SOCKET_CUSTOM_EVENT = 'UPDATE_WINNER_FROM_SOCKET_CUSTOM_EVENT';

var sender = '';

// Get room id in this component and user info join to this room.
const ChessBoard = () => {
  const [currentTeam, setCurrentTeam] = useState(0); // red/black

  const [viewers, setViewers] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false)
 
  const user = getUser();
  const searchParams = useSearchParams();
  const room = searchParams.get('room') ?? '';
  const ioService = new SocketIOService();
  const socket = ioService.reqConnection({ roomId: room as string });
  const joinRoom = () => {
    if (room !== "") {
      console.log('start emit join chat')
      socket.emit(IOChanel.JOIN_CHAT, room);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = URL+'/js/chess/script.js';
    script.async = true;

    document.body.appendChild(script);

    const ioService = new SocketIOService();

    const socket = ioService.reqConnection({ roomId: room as string });
    function addViewerIfNotExists(username: any) {
      if (!viewers.includes(username)) {
        const newViewers = [...viewers, username];
        setViewers(newViewers);
      }
    }
    socket.on(IOChanel.JOIN_CHAT, (response: any) => {
      if (response?.metadata?.username) {
        addViewerIfNotExists(response.metadata.username);
      }
      sender= response.metadata.username;
    });

    socket.on(IOChanel.JOIN_ROOM, async (response: any) => {
      // #region handle policy can access chess board;
      var canAccessChessBoard: boolean = false;
      var team : number =  response?.team as number; // Added a check for response.team
      setCurrentTeam(team);
      if(team !== 0){
        canAccessChessBoard = true;
      }
      const canAccessChessBoardEvent = new CustomEvent(CAN_ACCESS_CHESS_BOARD, { detail: {canAccessChessBoard, currentTeam: response} }); // Changed currentTeam to team
      document.dispatchEvent(canAccessChessBoardEvent);
      // #endregion handle policy can access chess board;
    });
    

    socket.emit(IOChanel.JOIN_ROOM, user);

    joinRoom();
    // socket.emit(IOChanel.JOIN_CHAT, room);
    
    socket.on(IOChanel.GAME_CHANEL, (metadata: any, nextTurnTeam : number, chsIsDead : any, chsIsCross) => {
      const eventData = {
        detail: {
          board: metadata,
          nextTurnTeam: nextTurnTeam,
          chsIsDead: chsIsDead,
          chsIsCross: chsIsCross
        }
      };
      const updateCheckBoard = new CustomEvent(UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT, eventData);
      document.dispatchEvent(updateCheckBoard);
    })

    socket.on(IOChanel.GAME_CHANEL_WINNER, (metadata: any) => {
       const eventData = {
         detail: {
           winer: -metadata,     
         }
       };
       const updateWinner = new CustomEvent(UPDATE_WINNER_FROM_SOCKET_CUSTOM_EVENT, eventData);
       document.dispatchEvent(updateWinner);
     })
 

     document.addEventListener(UPDATE_CHESS_BOARD_CUSTOM_EVENT, (event: any) => {
     socket.emit(IOChanel.GAME_CHANEL, event.detail.board_matrix, event.detail.nextTurn, event.detail.chsIsDead, event.detail.chsIsCross);
      // Todo: Work;
    });

    document.addEventListener(WINNER_NOTIFICATION, (event: any) => {
      socket.emit(IOChanel.GAME_CHANEL_WINNER, event.detail.isWiner);
       // Todo: Work;
     });

    
    
    return () => {
      document.body.removeChild(script);
    }
    }, []);
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="./css/chess/styles.module.css"
      ></link>
      <div className="app">
        <div className="game-room-bar">
          <p>Game Room: {room}</p>
        </div>
        <User2Player>{players[0]?.displayName}</User2Player>
        <div className="cont-wrap">
          <div className="cont">
            <div className="chs"></div>
            <div className="bg"></div>
          </div>
        </div>
        {/* Game room: {room}
        <br />
        Đến lượt: {nextTurn == 1 ? 'Bên đỏ' : 'Bên Xanh'}
        <br />
        Bên của bạn là: {currentTeam == 1 ? 'Bên đỏ' : 'Bên Xanh'}

        <br />
        Bạn là người : {currentTeam == 0 ? 'Xem' : 'Chơi'}
        <br />
        Lũ đang xem là:
        <ul>{viewers[0]?.displayName}</ul> */}
        {/* {showModal && <ChatDetail socket={socket} username={sender}/>}  */}
        {/* Đứa đang chơi là là:
        <ul>{players[0]?.displayName}</ul> */}
{/* 
        <button
          onClick={() => {
            showModal ? setShowModal(false) : setShowModal(true);
            // joinRoom();
          }}
          className="fixed bottom-0 right-0 p-4 m-4 bg-indigo-600 rounded-full text-white hover-bg-indigo-700"
        >
          </button> */}
        <ChatIcon className="text-gray-100" />

        <ChatDetail socket={socket} username={sender} />
      </div>
    </>
  );
}

export default ChessBoard;

