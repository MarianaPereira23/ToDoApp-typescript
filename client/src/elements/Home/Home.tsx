/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '../Forms/List';
import ListButton from './ListButton';
import './Home.css';

interface Props {
  user: User;
}

const Home: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [userLists, setUserLists] = useState<List[]>([]);
  const [newList, setNewList] = useState("");

  const getNewList = (name: string): void => {
    setNewList(name);
  };

  const getUserLists = async () => {
    const data = await axios.post('http://localhost:8000/lists/get', user);
    setUserLists(data.data);
  };

  useEffect(() => {
    getUserLists();
  }, [newList]);

  useEffect(() => {
    if (user.username === '') {
      navigate('/login');
    }
  }, [user]);

  const render = () => {
    if (userLists.length !== 0) {
      return userLists.map(list => <ListButton key={list.id} list={list}/>)
    }
  };

  return (
    <div className="home-page">
      <h2 className="home-page__user">{user.username}</h2>
      <List user={user} getNewList={getNewList}/>
      <div className="home-page__lists">
        {userLists.length !== 0 &&
          <p>Task lists</p>
        }
        {render()}
      </div>
    </div>
  );
};

export default Home;
