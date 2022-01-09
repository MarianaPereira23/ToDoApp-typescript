import React, {useState} from 'react';
import { io, Socket } from "socket.io-client";
import './Forms.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  id: string;
  setUserLists(lists: List[]): void;
  setDisplay(display: boolean): void;
};

const ListUser: React.FC<Props> = ({ id, setUserLists, setDisplay }) => {
  const [email, setEmail] = useState<string>('');

  socket.on('lists', (lists: List[]) => setUserLists(lists));

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);

  const handleSubmit = (type: string) => {
    const info = { email, id };
    console.log(info);
    if (info.email === '') {
      return;
    };
    if (type === 'Add') {
      socket.emit('addListUser', info);
      setEmail('');
      return setDisplay(false);
    };
    socket.emit('removeListUser', info);
    setEmail('');
    return setDisplay(false);
  };

  const handleAdd = () => handleSubmit('Add');

  const handleRemove = () => handleSubmit('Remove');

  return (
    <form className="pop-up__form">
      <label className="form__label">Manage list users</label>
      <input className="form__input" type="email" placeholder="User email" value={email} onChange={handleEmail}/>
      <div className="form__button-container">
        <button className="form__button" id="add" type="button" onClick={handleAdd}>Add</button>
        <button className="form__button" id="remove" type="button" onClick={handleRemove}>Remove</button>
      </div>
    </form>
  );
};

export default ListUser;
