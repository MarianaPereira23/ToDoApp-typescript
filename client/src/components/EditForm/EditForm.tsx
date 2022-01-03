import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './EditForm.css';

const EditForm = () => {
  return (
    <div className="editTodo">
      <form className="editTodo-form">
      {/* <form className="addTodo-form" onSubmit={handleSubmit}> */}
        <button type="submit" className="form__add">
          <FontAwesomeIcon icon={faEdit} className="edit__icon" />
        </button>
        <input type="text" className="form__title" />
        <input type="textarea" className="form__description" />
      </form>
    </div>
  );
};

export default EditForm;
