import React from 'react';
import logo from './logo.svg';
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="AppHeader">
              <p className="AppHeaderText">Organisation Name</p>
              <button className="AppHeaderText">Login</button>
      </div>

      <div className="AppContainer">
            <MainPanel/>
            <SidePanel/>

      </div>
    </div>
  );
}

export default App;
