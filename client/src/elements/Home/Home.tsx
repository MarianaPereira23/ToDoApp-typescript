import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import List from '../Forms/List';
import './Home.css';

interface Props {
  user: User;
}

const Home: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username === '') {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div className="home-page">
      <h2 className="home-page__user">{user.username}</h2>
      <List user={user}/>
    </div>
  );
};

export default Home;
