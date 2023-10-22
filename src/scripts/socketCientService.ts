import io from 'socket.io-client';
import { SOCKET_URL } from './config';


export class SocketIOService {
  private SOCKET_SERVER_URL: string = SOCKET_URL;
  private CHANNEL: string = 'message';
  private socket: any;

  constructor(accesstoken: string, userId: string, limitMessage: number) {
    this.socket = io(this.SOCKET_SERVER_URL,
      {
        auth: { accesstoken },
        query: { userId: userId, limitMessage: limitMessage },
      });
    console.log('SOCKET.IO Establish connection')
  }
  public onListenMessage(callback: (message: any) => void): void {
    this.socket.on(this.CHANNEL, callback);
  }

  public onListenError(callback: (error: any) => void): void {
    this.socket.on('connect_error', callback);
  }

  public getNotify(userId: string, page: number, limit: number): void {
    this.socket.emit(this.CHANNEL, {
      userId: userId,
      page: page,
      limit: limit
    })
  }
}