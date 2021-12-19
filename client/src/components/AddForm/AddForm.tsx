import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { MyDispatch } from "../../store/store";
import { addTodo } from "../../slices/todoSlice";
import './AddForm.css';

const AddForm = () => {
  const dispatch = useDispatch<MyDispatch>();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState(""); 

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTaskName(e.currentTarget.value);
  };

  const handleDescChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTaskDescription(e.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const taskToAdd = {
      name: taskName,
      description: taskDescription,
      completed: false,
      display: true,
      id: uuidv4(),
    } as Todo;
    dispatch(
      addTodo(taskToAdd)
    );
    e.currentTarget.reset();
  };

  return (
    <div className="addTodo">
      <form className="addTodo-form" onSubmit={handleSubmit}>
        <button type="submit" className="form__add">
          <FontAwesomeIcon icon={faPlus} className="add__icon" />
        </button>
        <input type="text" className="form__title" placeholder="Task Name*" required onChange={handleNameChange} />
        <input type="textarea" className="form__description" placeholder="Task Description" onChange={handleDescChange} />
      </form>
    </div>
  );
};

export default AddForm;
