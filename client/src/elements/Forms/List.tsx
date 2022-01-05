import React, {useState} from 'react';
import './Forms.css';

const List = () => {
  const [listName, setListName] = useState("");

  const handleListName = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setListName(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    //MISSING USER EMAIL
    // e.currentTarget.reset();
  }

  return (
    <form className="home-page__form" onSubmit={handleSubmit}>
      <label className="form__label">Create new task list</label>
      <input className="form__input" type="text" placeholder="List name" required onChange={handleListName} />
      <button className="form__button" type="submit">Create</button>
    </form>
  );
};

export default List;
