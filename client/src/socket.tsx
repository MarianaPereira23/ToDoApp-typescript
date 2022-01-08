import { io, Socket } from "socket.io-client";

const url = 'http://localhost:8080';

const socket: Socket = io(url);

export const login = (email: string, password: string, callback: Function) => {
  socket.emit('login', { email, password });
  socket.on('loginStatus', (user: User | string) => callback(user))
};

export const join = (username: string, email: string, password: string, callback: Function) => {
  socket.emit('join', { username, email, password });
  socket.on('loginStatus', (user: User | string) => callback(user));
};