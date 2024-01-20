import { useEffect, useState } from "react";
import { useDraggable } from "./utils";
import "./App.css";

const ICON_SIZE = 75;

function Icon(props) {
  const { windowProps, pos } = useDraggable(props.mousePos, props.openWindow);

  return (
    <div
      className="icon"
      style={{
        height: `${ICON_SIZE}px`,
        width: `${ICON_SIZE}px`,
        left: pos[0],
        top: pos[1],
      }}
      {...windowProps}
    >
      <img draggable={false} src={props.path} />
    </div>
  );
}

export default Icon;
