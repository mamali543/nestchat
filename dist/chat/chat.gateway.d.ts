import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
interface Person {
    name: string;
    text: string;
    room: string;
}
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleMessage(client: Socket, payload: Person): void;
    handleJoinRoom(client: Socket, room: string): void;
    handleLeftRoom(client: Socket, room: string): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
export {};
