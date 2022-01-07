import React from 'react';
import { useSelector } from "react-redux";
import { MyState } from "../../store/store";
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = () => {
  const todos = useSelector((state: MyState) => state);

  return (
    <div className="todo-container">
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoList;
