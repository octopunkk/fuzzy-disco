import { useState } from "react";
import "./App.css";
import Toolbar from "./Toolbar";
import Window from "./Window";
import { Bomb } from "./Bomb";
import paintIcon from "./assets/react.svg";
import bombIcon from "./assets/bomb.png";

function App() {
  return (
    <div className="app">
      <div className="screen">
        <Window icon={paintIcon}>
          <p>coucou</p>
        </Window>
        <Window icon={bombIcon} height="300px">
          <Bomb />
        </Window>
        <h1 className="mainTitle">ANAIS_95</h1>
      </div>
      <Toolbar> </Toolbar>
    </div>
  );
}

export default App;
