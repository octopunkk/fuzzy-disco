import { useState, useEffect, useRef } from "react";
import bombBg from "./assets/bomb-bg.png";
import bombIcon from "./assets/bomb.png";
import explosionIcon from "./assets/explosion.png";

import { useDraggable } from "./utils";

function Bobomb(props) {
  const { windowProps, pos } = useDraggable(null, {
    startPosition: [Math.random() * 200 + 100, Math.random() * 200 + 100],
    bounds: props.windowRef,
  });

  return (
    <img
      className="bobomb"
      src={props.gameTime - props.createdAt > 10 ? explosionIcon : bombIcon}
      style={{ transform: `translate(${pos[0]}px, ${pos[1]}px)` }}
      draggable={false}
      {...windowProps}
    />
  );
}

export function Bomb(props) {
  const windowRef = useRef(null);
  const [bobombs, setBobombs] = useState([{ color: "black", createdAt: 0 }]);
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGameTime((p) => p + 1);
      if (gameTime % 5 === 0) {
        setBobombs((b) => [...b, { color: "black", createdAt: gameTime }]);
      }
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameTime]);
  return (
    <div className="bombWindow" ref={windowRef}>
      <img src={bombBg} className="bombBg" draggable={false} />
      <div className="leftBomb" />
      <div className="rightBomb" />
      {bobombs.map((bobomb, index) => {
        return (
          <Bobomb
            key={index}
            windowRef={windowRef}
            createdAt={bobomb.createdAt}
            gameTime={gameTime}
          />
        );
      })}
    </div>
  );
}
