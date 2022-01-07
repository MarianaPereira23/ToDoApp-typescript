import React from 'react';
import './Forms.css';

const ListUser = () => {
  return (
    <form className="pop-up__form">
      <label className="form__label">Manage list users</label>
      <input className="form__input" type="email" placeholder="User email" required />
      <div className="form__button-container">
        <button className="form__button" id="add" type="submit">Add</button>
        <button className="form__button" id="remove" type="submit">Remove</button>
      </div>
    </form>
  );
};

export default ListUser;
