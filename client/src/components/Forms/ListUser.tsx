import React, {useState} from 'react';
import axios from 'axios';
import './Forms.css';

interface Props {
  id: string;
  setDisplay(display: boolean): void;
}

const ListUser: React.FC<Props> = ({ id, setDisplay }) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const info = { email, id }
    console.log(info);
    console.log(type);
    
    if (type === 'Add') {
      const addedData = await axios.put('http://localhost:8000/list/adduser', info);
      if (addedData.data === "Sorry, a user with that email address does not seem to exist") {
        // Error message to user!
        console.log('User does not exist');
        return;
      }
      setEmail("");
      return setDisplay(false);
    }
    await axios.put('http://localhost:8000/list/removeuser', info);
    setEmail("");
    return setDisplay(false);
  }

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setType('Add');
    await handleSubmit();
  };

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setType('Remove');
    await handleSubmit();
  };

  return (
    <form className="pop-up__form">
      <label className="form__label">Manage list users</label>
      <input className="form__input" type="email" placeholder="User email" required value={email} onChange={handleEmail}/>
      <div className="form__button-container">
        <button className="form__button" id="add" type="submit" onClick={handleAdd}>Add</button>
        <button className="form__button" id="remove" type="submit" onClick={handleRemove}>Remove</button>
      </div>
    </form>
  );
};

export default ListUser;
