/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import ListUser from '../Forms/ListUser';
import './TaskList.css';

const url = 'https://todo-typescript-server.herokuapp.com/';

const socket: Socket = io(url);

interface Props {
  id: string;
};

const ManageList: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);

  socket.on('listUsers', (listUsers: string[]) => setUsers(listUsers));

  const toggleDisplay = () => setDisplay(!display);

  const closeDisplay = () => {
    setDisplay(false);
    setError('');
  };

  const handleRedirect = () => navigate('/');

  useEffect(() => {
    socket.emit('getListUsers', id);
  }, []);

  return (
    <>
      <div className="task-page__manage">
        <button className="manage__button" onClick={handleRedirect}>
          <FontAwesomeIcon icon={faArrowLeft} className="button__icon"/>
        </button>
        <button className="manage__button" onClick={toggleDisplay}>
          <FontAwesomeIcon icon={faUsers} className="button__icon"/>
        </button>
      </div>
      {id &&
        <div className={`task-page__pop-up ${display ? "" : "hidden"}`}>
          <button className="pop-up__close" onClick={closeDisplay}>X</button>
          <ListUser id={id} setDisplay={setDisplay} error={error} setError={setError}/>
          {users.length > 0 &&
            <>
              <p className="pop-up__users">Users with access to this list:</p>
              {users.map((user, i) => <p key={i}>- {user}</p>)}
            </>
          }
        </div>
      }
    </>
  );
};

export default ManageList;
