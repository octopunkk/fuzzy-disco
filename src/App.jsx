import { useState } from "react";
import "./App.css";
import Toolbar from "./Toolbar";
import Window from "./Window";
import { Bomb } from "./Bomb";
import paintIcon from "./assets/react.svg";
import bombIcon from "./assets/bomb.png";

function App() {
  const [mousePos, setMousePos] = useState([0, 0]);
  const handleMouseMove = (e) => {
    setMousePos([e.clientX, e.clientY]);
  };
  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <div className="screen">
        {/* instead of passing mousePos to the component, isolate each component and add the event listener there, this will prevent re-rendering on each mouse move */}
        <Window mousePos={mousePos} icon={paintIcon}>
          <p>coucou</p>
        </Window>
        <Window mousePos={mousePos} icon={bombIcon} height="300px">
          <Bomb />
        </Window>

        <h1 className="mainTitle">ANAIS_95</h1>
      </div>
      <Toolbar> </Toolbar>
    </div>
  );
}

export default App;
