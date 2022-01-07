import React, {useState} from 'react';
import axios from 'axios';
import './Forms.css';

interface Props {
  user: User;
  getNewList(name: string): void;
}

const List: React.FC<Props> = ({ user, getNewList }) => {
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
      const addedList = await axios.post('http://localhost:8000/lists/create', listInfo);
      if (addedList.data === "Sorry, a list with that name already exists") {
        // Error message to user!
        console.log('List already exists');
        setListName("");
        return;
      }
      getNewList(listName);
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
