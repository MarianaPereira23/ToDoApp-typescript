import React from 'react';
import TodoList from './components/TodoList/TodoList';
import AddForm from './components/AddForm/AddForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <AddForm />
      <TodoList />
    </div>
  );
}

export default App;
