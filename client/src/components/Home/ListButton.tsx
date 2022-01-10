import React from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from "socket.io-client";
import './Home.css';

const url = 'https://todo-typescript-server.herokuapp.com/';

const socket: Socket = io(url);

interface Props {
  user: User | string;
  list: List;
  setUserLists(lists: List[]): void;
};

const ListButton: React.FC<Props> = ({ user, list, setUserLists }) => {
  const navigate = useNavigate();

  socket.on('lists', (lists: List[]) => setUserLists(lists));

  const handleRedirect = () => navigate(`/list/${list.id}`);

  const handleDelete = () => socket.emit('deleteList', list.id, user);

  return (
    <div className="lists__button">
      <button className="button-redirect" onClick={handleRedirect}>
        {list.name}
      </button>
      <button className="button-remove" onClick={handleDelete}>X</button>
    </div>
  );
};

export default ListButton;
