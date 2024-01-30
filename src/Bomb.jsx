import { useState, useEffect, useRef } from "react";
import bombBg from "./assets/bomb-bg.png";
import bombIcon from "./assets/bomb.png";
import explosionIcon from "./assets/explosion.png";

import { useDraggable } from "./utils";

function Bobomb(props) {
  const { windowProps, pos } = useDraggable(null, {
    startPosition: [40, 190],
    bounds: props.windowRef,
  });
  return (
    <img
      className="bobomb"
      src={props.age < 10 ? bombIcon : explosionIcon}
      style={{ transform: `translate(${pos[0]}px, ${pos[1]}px)` }}
      draggable={false}
      {...windowProps}
    />
  );
}

export function Bomb(props) {
  const windowRef = useRef(null);
  const [bobombs, setBobombs] = useState([
    { color: "black", age: 0 },
    { color: "black", age: 5 },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // bobomb doit avoir : heure ed création + heure actuelle pour déterminer si explosion => on update 1 variable a chaque tick au lieu de n
      setBobombs((prev) =>
        [...prev].map((a) => {
          let b = { ...a };
          b.age = a.age + 1;
          return b;
        })
      );
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="bombWindow" ref={windowRef}>
      <img src={bombBg} className="bombBg" draggable={false} />
      <div className="leftBomb" />
      <div className="rightBomb" />
      {bobombs.map((bobomb, index) => {
        return <Bobomb key={index} windowRef={windowRef} age={bobomb.age} />;
      })}
    </div>
  );
}
