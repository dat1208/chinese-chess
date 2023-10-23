'use client'
import { IOChanel, SocketIOService } from "@/scripts/socket";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Team } from "./interface";
import ChatIcon from '@mui/icons-material/Message';
import ModalMain from "../ModalMain";

import list, { List } from "postcss/lib/list";
import ChatDetail from "../Chat/ChatDetail";
import DisplayMessage from '../Chat/ChatDetail'

var MessageReceived = '';
const UPDATE_CHESS_BOARD_CUSTOM_EVENT = 'UPDATE_CHESS_BOARD_CUSTOM_EVENT';
const UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT = 'UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT';
const CAN_ACCESS_CHESS_BOARD = 'CAN_ACCESS_CHESS_BOARD';
var sender = '';

// Get room id in this component and user info join to this room.
const ChessBoard = () => {
  const joinRoom = () => {
    if (room !== "") {
      console.log('start emit join chat')
      socket.emit(IOChanel.JOIN_CHAT, room);
    }
  };
  
  const [nextTurn, setNextTurn] = useState(Team.RED);
  const [team, setTeam] = useState(); // red/black
  const [isPlayer, setIsPlayer] = useState(false);

  const [viewers, setViewers] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false)
 

  const searchParams = useSearchParams();
  const room = searchParams.get('room') ?? '';
  const ioService = new SocketIOService();
  const socket = ioService.reqConnection({ roomId: room as string });
  const [MessageReceived, setMessageReceive] = useState();


  useEffect(() => {
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

    socket.on(IOChanel.JOIN_ROOM, (response: any) => {
      console.log(response.metadata)
      // #region handle policy can access chess board;
      const canAccessChessBoard: any = {};

      if (response?.team) {
        setTeam(response?.team);
        canAccessChessBoard.team = response?.team;
      }

      if (response?.isPlayer) {
        setIsPlayer(response?.isPlayer);
        canAccessChessBoard.isPlayer = response?.isPlayer;
      }

      const canAccessChessBoardEvent = new CustomEvent(CAN_ACCESS_CHESS_BOARD, { detail: canAccessChessBoard });
      document.dispatchEvent(canAccessChessBoardEvent);
      // #endregion handle policy can access chess board;

      // #region display viewer: 
      if (response?.metadata?.user && !response?.isPlayer) {
        viewers.push(response?.metadata?.user);
        setViewers(viewers);
      }
      // #endregion display viewer: 

      // #region display player: 
      if (response?.metadata?.user && response?.isPlayer) {
        players.push(response?.metadata?.user);
        setPlayers(players);
      }
      // #endregion display player: 
    });

    socket.emit(IOChanel.JOIN_ROOM);

    socket.on(IOChanel.GAME_CHANEL, (metadata: any, nextTurnTeam : string, chsIsDead : any) => {
     
      const eventData = {
        detail: {
          board: metadata,
          nextTurnTeam: nextTurnTeam,
          chsIsDead: chsIsDead
        }
      };
      const updateCheckBoard = new CustomEvent(UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT, eventData);
      document.dispatchEvent(updateCheckBoard);
    })

    document.addEventListener(UPDATE_CHESS_BOARD_CUSTOM_EVENT, (event: any) => {
      socket.emit(IOChanel.GAME_CHANEL, event.detail.board_matrix, event.detail.nextTurn, event.detail.chsIsDead);
      // Todo: Work;
    });

    
    return () => {

    }
  }, [viewers,MessageReceived]);
  return (<>
    <link rel="stylesheet" type="text/css" href="./css/chess/styles.module.css"></link>
    <div className="app">
      <div className="cont-wrap">
        <div className="cont">
          <div className="chs"></div>
          <div className="bg"></div>
        </div>
      </div>
      Game room: {room}
      <br />
      Đến lượt: {nextTurn == Team.RED ? 'Bên đỏ' : 'Bên Xanh'}
      <br />
      Bên của bạn là: {team == Team.RED ? 'Bên đỏ' : 'Bên Xanh'}

      <br />
      Bạn là người : {isPlayer == true ? 'Chơi' : 'Xem'}
      <br />

      Lũ đang xem là:
      <ul>
        {viewers[0]?.displayName}
      </ul>
      {showModal && <ChatDetail socket={socket} username={sender}/>}
      Đứa đang chơi là là:
      <ul>
        {players[0]?.displayName}
      </ul>
      <button
        onClick={() => {showModal ? setShowModal(false) : setShowModal(true); joinRoom();}}
        className="fixed bottom-0 right-0 p-4 m-4 bg-indigo-600 rounded-full text-white hover-bg-indigo-700"
      >
        <ChatIcon className="text-gray-100" />

      </button>
      <ChatDetail socket={socket} username={sender} />
      <Script type="module" rel="javascript preload prefetch" src="/js/chess/script.js" />
    </div>
  </>)
}

export default ChessBoard;

