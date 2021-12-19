import React from 'react';
import TodoList from './components/TodoList/TodoList';
import AddForm from './components/AddForm/AddForm';
import './App.css';

function App() {
  return (
    <div className="todo-app">
      <div className="todo-app__content">
        <AddForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
