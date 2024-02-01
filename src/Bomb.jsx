import { useState, useEffect, useRef } from "react";
import bombBg from "./assets/bomb-bg.png";
import bombIcon from "./assets/bomb.png";
import explosionIcon from "./assets/explosion.png";

import { useDraggable, isInside } from "./utils";

function Bobomb(props) {
  const bobombRef = useRef(null);
  let [isDefused, setIsDefused] = useState(false);
  let hasExploded = props.gameTime - props.createdAt > 10;
  const { windowProps, pos } = useDraggable(null, {
    startPosition: [Math.random() * 200 + 100, Math.random() * 200 + 100],
    bounds: props.windowRef,
  });

  if (
    !isDefused &&
    !hasExploded &&
    props.color == "black" &&
    isInside(bobombRef, props.rightRef)
  ) {
    setIsDefused(true);
  }

  return (
    <img
      ref={bobombRef}
      className="bobomb"
      src={!isDefused && hasExploded ? explosionIcon : bombIcon}
      style={{ transform: `translate(${pos[0]}px, ${pos[1]}px)` }}
      draggable={false}
      {...windowProps}
    />
  );
}

export function Bomb(props) {
  const windowRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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
      <div className="leftBomb" ref={leftRef} />
      <div className="rightBomb" ref={rightRef} />
      {bobombs.map((bobomb, index) => {
        return (
          <Bobomb
            key={index}
            windowRef={windowRef}
            leftRef={leftRef}
            rightRef={rightRef}
            createdAt={bobomb.createdAt}
            color={bobomb.color}
            gameTime={gameTime}
          />
        );
      })}
    </div>
  );
}
