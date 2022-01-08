import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Forms/Login';
import Join from './components/Forms/Join';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | string>('');

  return (
    <div className="todo-app">
      <div className="todo-app__content">
        <Routes>
          <Route path="/" element={(
            <>
              <Header user={user} setUser={setUser}/>
              <Home user={user}/>
              <Footer />
            </>
          )} />
          <Route path="/login" element={(
            <>
              <Header user={user} setUser={setUser}/>
              <Login user={user} setUser={setUser}/>
              <Footer />
            </>
          )} />
          <Route path="/join" element={(
            <>
              <Header user={user} setUser={setUser}/>
              <Join user={user} setUser={setUser}/>
              <Footer />
            </>
          )} />
          <Route path="/list/:id" element={(
            <>
              <Header user={user} setUser={setUser}/>
              <TaskList user={user}/>
              <Footer />
            </>
          )} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
