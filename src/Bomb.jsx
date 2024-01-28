import { useState, useEffect, useRef } from "react";
import bombBg from "./assets/bomb-bg.png";
import bombIcon from "./assets/bomb.png";
import { useDraggable } from "./utils";

export function Bomb(props) {
  const windowRef = useRef(null);
  const [bobombs, setbobombs] = useState([{ color: "black", age: 0 }]);
  const { windowProps, pos } = useDraggable(props.mousePos, null, {
    startPosition: [0, 0],
    bounds: windowRef,
  });

  return (
    <div className="bombWindow" ref={windowRef}>
      <img src={bombBg} className="bombBg" draggable={false} />
      <div className="leftBomb" />
      <div className="rightBomb" />
      {bobombs.map((bobomb, index) => {
        return (
          <img
            key={index}
            className="bobomb"
            src={bombIcon}
            style={{ transform: `translate(${pos[0]}px, ${pos[1]}px)` }}
            draggable={false}
            {...windowProps}
          />
        );
      })}
    </div>
  );
}
