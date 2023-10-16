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

interface CreateRoom {
    roomId: string;
    createdBy: string;
    createdAt: Date;
    players: string[];
    currentState: string;
    inviteLink: string;
    _id: string;
}

interface Player{

}


interface ApiGetRoomResponse extends ApiResponse {
    data: Room[];
}


interface ApiCreateRoomResponse extends ApiResponse{
    data: CreateRoom;
}

export type { ApiGetRoomResponse, Room, ApiCreateRoomResponse }