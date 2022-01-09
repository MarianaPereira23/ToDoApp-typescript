import React, {useState} from 'react';
import { io, Socket } from "socket.io-client";
import './Forms.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  user: User | string;
  userLists: List[];
  setUserLists(lists: List[]): void;
};

const List: React.FC<Props> = ({ user, userLists, setUserLists }) => {
  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string>('');

  socket.on('newList', (list: List) => {
    const newLists: List[] = userLists.concat(list);
    setUserLists(newLists);
  });

  socket.on('listError', (error: string) => setError(error));

  const handleListName = (e: React.ChangeEvent<HTMLInputElement>) => setListName(e.currentTarget.value);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof user !== 'string') {
      const listInfo: ListToAdd = {
        name: listName,
        user: user.email
      };
      socket.emit('createList', listInfo);
      setListName('');
      setError('');
    };
  };

  return (
    <form className="home-page__form" onSubmit={handleSubmit}>
      <label className="form__label">Create new task list</label>
      <input className="form__input" type="text" placeholder="List name" value={listName} required onChange={handleListName} />
      <p className="error">{error}</p>
      <button className="form__button" type="submit">Create</button>
    </form>
  );
};

export default List;
