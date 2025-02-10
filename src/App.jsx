import { useEffect, useState } from "react";
import "./App.css";
import Toolbar from "./Toolbar";
import Window from "./Window";
import { Bomb } from "./Bomb";
import spiralIcon from "./assets/pixel-spiral.jpg";
import bombIcon from "./assets/bomb.png";
import dinoIcon from "./assets/dino-static.png";
import { Cursors } from "./Cursors";
import { Automata } from "./Automata";

function App() {
  const [currentCursor, setCurrentCursor] = useState("default");
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [lastPositions, setLastPositions] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition([event.clientX, event.clientY]);
      setLastPositions((prev) => [...prev, [event.clientX, event.clientY]]);
      if (lastPositions.length > 10) {
        setLastPositions((prev) => prev.slice(1));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="app" style={{ cursor: currentCursor == 'default' ? 'default' : 'none' }}>
      {currentCursor !== 'default' && currentCursor !== 'bubble' && 
        <div className="cursor" style={{ left: cursorPosition[0] - 20, top: cursorPosition[1] - 20}}>
         <img src={currentCursor} alt="cursor" className="cursorImg"/>
        </div>
      }
      {currentCursor === 'bubble' && 
        <div className="cursor" style={{ left: cursorPosition[0] - 10, top: cursorPosition[1] - 10}}>
          <div className="bubble"></div>
        </div>
        
      }

      <div className="screen">
        <Window icon={bombIcon} height="300px" startPosition={[-100, -100]}>
          <Bomb />
        </Window>
        <Window icon={spiralIcon} height="300px" startPosition={[0, -100]}>
          <Automata />
        </Window>
        <Window icon={dinoIcon} height="300px" startPosition={[100, -100]}>
          <Cursors setCurrentCursor={setCurrentCursor}/>
        </Window>
        <h1 className="mainTitle">ANAIS_95</h1>
      </div>
      <Toolbar> </Toolbar>
    </div>
  );
}

export default App;
