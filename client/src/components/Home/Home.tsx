/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from "socket.io-client";
import List from '../Forms/List';
import ListButton from './ListButton';
import './Home.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  user: User | string;
  userLists: List[];
  setUserLists(lists: List[]): void;
};

const Home: React.FC<Props> = ({ user, userLists, setUserLists }) => {
  const navigate = useNavigate();

  socket.on('lists', (lists: List[]) => setUserLists(lists));

  const render = () => {
    if (userLists.length !== 0) {
      return userLists.map(list => <ListButton key={list.id} user={user} list={list} setUserLists={setUserLists} />);
    };
  };

  useEffect(() => {
    if (typeof user === 'string') {
      return navigate('/login');
    };
    socket.emit('getLists', user);
  }, []);

  return (
    <div className="home-page">
      {typeof user !== 'string' &&
        <>
          <h2 className="home-page__user">{user.username}</h2>
          <List user={user} userLists={userLists} setUserLists={setUserLists}/>
          <div className="home-page__lists">
            {userLists.length !== 0 &&
              <p>Task lists</p>
            }
            {render()}
          </div>
        </>
      }
    </div>
  );
};

export default Home;
