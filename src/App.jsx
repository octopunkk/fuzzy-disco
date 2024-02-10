import { useState } from "react";
import "./App.css";
import Toolbar from "./Toolbar";
import Window from "./Window";
import { Bomb } from "./Bomb";
import reactIcon from "./assets/react.svg";
import bombIcon from "./assets/bomb.png";
import { Automata } from "./Automata";

function App() {
  return (
    <div className="app">
      <div className="screen">
        <Window icon={bombIcon} height="300px" startPosition={[-100, -100]}>
          <Bomb />
        </Window>
        <Window icon={reactIcon} height="300px" startPosition={[0, -100]}>
          <Automata />
        </Window>
        <h1 className="mainTitle">ANAIS_95</h1>
      </div>
      <Toolbar> </Toolbar>
    </div>
  );
}

export default App;
