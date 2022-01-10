/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { io, Socket } from "socket.io-client";
import './TaskList.css';

const url = 'https://todo-typescript-server.herokuapp.com/';

const socket: Socket = io(url);

interface Props {
  id: string;
};

const ListName: React.FC<Props> = ({ id }) => {
  const [listName, setListName] = useState<string>('');

  socket.on('listName', (name: string) => {
    setListName(name);
  });

  useEffect(() => {
    socket.emit('getListName', id);
  }, []);

  return (
    <h2 className="task-page__list-name">{listName}</h2>
  );
};

export default ListName;
