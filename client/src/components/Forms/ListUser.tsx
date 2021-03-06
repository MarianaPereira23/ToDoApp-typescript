import React, {useState} from 'react';
import { io, Socket } from "socket.io-client";
import './Forms.css';

const url = 'https://todo-typescript-server.herokuapp.com/';

const socket: Socket = io(url);

interface Props {
  id: string;
  setDisplay(display: boolean): void;
  error: string;
  setError(error: string): void;
};

const ListUser: React.FC<Props> = ({ id, setDisplay, error, setError }) => {
  const [email, setEmail] = useState<string>('');

  socket.on('userListError', (error: string) => {
    setDisplay(true);
    setError(error);
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);

  const handleSubmit = (type: string) => {
    const info = { email, id };
    if (info.email === '') {
      return setError('Please add a valid email');
    };
    if (type === 'Add') {
      socket.emit('addListUser', info);
      setEmail('');
      setError('');
      return setDisplay(false);
    };
    socket.emit('removeListUser', info);
    setEmail('');
    setError('');
    return setDisplay(false);
  };

  const handleAdd = () => handleSubmit('Add');

  const handleRemove = () => handleSubmit('Remove');

  return (
    <form className="pop-up__form">
      <label className="form__label">Manage list users</label>
      <input className="form__input" type="email" placeholder="User email" value={email} onChange={handleEmail}/>
      <p className="error">{error}</p>
      <div className="form__button-container">
        <button className="form__button" id="add" type="button" onClick={handleAdd}>Add</button>
        <button className="form__button" id="remove" type="button" onClick={handleRemove}>Remove</button>
      </div>
    </form>
  );
};

export default ListUser;
