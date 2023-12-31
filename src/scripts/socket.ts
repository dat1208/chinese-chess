import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "./config";


export enum IOChanel {
  MAIN_CONNECTION = "connection",
  DISCONECTION_CHANEL = 'disconnect',
  JOIN_CHAT = "JOIN_CHAT",
  GAME_CHANEL = "GAME_CHANEL",
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  ERROR_CHANEL = "ERROR_CHANEL",
  VIEWER_CHANEL = "VIEWER_CHANEL",
  CHAT_CHANEL = "CHAT_CHANEL",
  CHAT_CHANEL_RECEIVE = "CHAT_CHANEL_RECEIVE",
  CHAT_CHANEL_SEND = "CHAT_CHANEL_SEND",
  GAME_CHANEL_WINNER = "GAME_CHANEL_WINNER",
  GET_PLAYER_INFO = "GET_PLAYER_INFO"
}

export class SocketIOService {
  private readonly IO_SERVER_URL = SOCKET_URL;
  private readonly DEFAULT_DEPLAY_RECONNECTION = 10000; // ms

  reqConnection = (medataData: { roomId: string, team?: 'RED' | 'BLACK' }): Socket => {
    const accessToken = localStorage.getItem('accessToken') ?? 'TokenNotFound';
    return io(this.IO_SERVER_URL, {
      reconnectionDelayMax: this.DEFAULT_DEPLAY_RECONNECTION,
      auth: {
        token: accessToken ?? ''
      },
      query: {
        room_id: medataData?.roomId ?? '',
        team: medataData?.team ?? 'RED',
      }
    })
  }
}