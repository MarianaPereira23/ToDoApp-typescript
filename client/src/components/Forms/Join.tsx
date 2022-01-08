/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../../socket';
import './Forms.css';

interface Props {
  user: User | string;
  setUser(user: User | string): void;
}

const Join: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: JoinUser = {
      username,
      email,
      password
    }
    join(newUser.username, newUser.email, newUser.password, setUser);
  };

  const handleRedirect = () => navigate('/join');

  useEffect(() => {
    if (typeof user === 'string') return;
    navigate('/');
  }, [user]);

  return (
    <div className="join-page">
      <h2 className="join-page__title">Sign-up</h2>
      <form className="join-page__form" onSubmit={handleSubmit}>
        <input className="form__input" type="text" placeholder="Username" required onChange={handleUsername} />
        <input className="form__input" type="email" placeholder="Email" required onChange={handleEmail} />
        <input className="form__input" type="password" placeholder="Password" required onChange={handlePassword} />
        {typeof user === "string" && 
          <p>{user}</p>
        }
        <button className="form__button" type="submit">Sign-up</button>
      </form>
      <p className="join-page__login">Already a member? <button className="join__redirect" onClick={handleRedirect}>Join</button></p>
    </div>
  );
};

export default Join;
