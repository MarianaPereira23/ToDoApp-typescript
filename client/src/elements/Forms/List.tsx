import React, {useState} from 'react';
import axios from 'axios';
import './Forms.css';

interface Props {
  user: User;
}

const List: React.FC<Props> = ({ user }) => {
  const [listName, setListName] = useState("");

  const handleListName = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setListName(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const listInfo = {
        name: listName,
        user: user.email
      };
      await axios.post('http://localhost:8000/lists/create', listInfo);
      setListName("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="home-page__form" onSubmit={handleSubmit}>
      <label className="form__label">Create new task list</label>
      <input className="form__input" type="text" placeholder="List name" value={listName} required onChange={handleListName} />
      <button className="form__button" type="submit">Create</button>
    </form>
  );
};

export default List;
