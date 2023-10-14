import { type } from "os";

interface ApiResponse {
    id: string;
    timestamp: string;
    apiVersion: string;
    status: string;
    message: string;
}

export enum RoomStatus {
    WAITING = 'WAITING',
    ENDING = 'ENDING',
    PLAYING = 'PLAYING'
}

//--------------------------------------------------------------------ROOM_API----------------------------------------------------------//
interface Room {
    _id: string;
    roomId: string;
    createdBy: string;
    createdAt: Date;
    players: string[];
    currentState: RoomStatus;
}


interface ApiGetRoomResponse extends ApiResponse {
    data: Room[];
}


export type { ApiGetRoomResponse, Room }