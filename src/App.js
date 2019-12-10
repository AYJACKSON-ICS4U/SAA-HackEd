import React from 'react';
import logo from './logo.svg';
import {verifyLogin, deleteSet, deleteCard, deleteUser, createSet, createUser, createCard, getUserData} from '../db/app.js';
import './App.css';



function App() {
  function handle(){
    createUser("test", "test!", "test@test.test");
  }
  return (
    <div onClick={handle()} className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
