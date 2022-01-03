import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { MyState } from "../../store/store";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MyDispatch } from "../../store/store";
import { editTodo } from "../../slices/todoSlice";
import './EditForm.css';

const EditForm = () => {
  const dispatch = useDispatch<MyDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state: MyState) => state);
  const todo = todos.find(todo => todo.id === id);
  let taskToEdit:Todo;

  if (todo) {
    taskToEdit = {
      name: todo.name,
      description: todo.description,
      completed: todo.completed,
      display: todo.display,
      id: todo.id,
    };
  }

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (todo) {
      taskToEdit.name = e.currentTarget.value;
    }
  };

  const handleDescChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (todo) {
      taskToEdit.description = e.currentTarget.value;
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todo) {
      dispatch(
        editTodo(taskToEdit)
      );
    }
    navigate('/');
  };
  
  return (
    <div className="editTodo">
      {todo && 
      <form className="editTodo-form" onSubmit={handleSubmit} >
        <button type="submit" className="form__add">
          <FontAwesomeIcon icon={faEdit} className="edit__icon" />
        </button>
        <input type="text" className="form__title" defaultValue={todo.name} required onChange={handleNameChange} />
        <input type="textarea" className="form__description" defaultValue={todo.description !== '' ? todo.description  : ''} placeholder={todo.description === '' ? 'Add description' : ''} onChange={handleDescChange} />
      </form>
      }
    </div>
  );
};

export default EditForm;
