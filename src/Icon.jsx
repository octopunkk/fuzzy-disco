import { useEffect, useState } from "react";
import { useDraggable } from "./utils";
import "./App.css";

const ICON_SIZE = 75;

function Icon(props) {
  const { windowProps, pos } = useDraggable(props.openWindow, {
    startPosition: props?.startPosition,
  });

  return (
    <div
      className="icon"
      style={{
        height: `${ICON_SIZE}px`,
        width: `${ICON_SIZE}px`,
        transform: `translate(${pos[0]}px, ${pos[1]}px)`,
      }}
      {...windowProps}
    >
      <img draggable={false} src={props.path} />
    </div>
  );
}

export default Icon;
