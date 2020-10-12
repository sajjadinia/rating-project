import React from 'react';
import logo from './logo.svg';
import './App.css';
//node import axios from "axios"

//import { getAllLanguages,addLanguage } from './service'


function App() {

  
  // const langs = await axios.get('http://localhost:3080/api/languages');
  // console.log(langs);
  // const lang = await axios.post('http://localhost:3080/api/addLanguage',{name:"fr"});
  // console.log(lang);

  // getAllLanguages()
  // addLanguage()
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit .... <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link "
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
