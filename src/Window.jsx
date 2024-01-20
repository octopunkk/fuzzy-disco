import { useState, useEffect } from "react";
import { useDraggable } from "./utils";
import "./App.css";
import Icon from "./Icon";

function Window(props) {
  const [open, setOpen] = useState(false);
  const { windowProps, pos } = useDraggable(props.mousePos);

  return (
    <div>
      <Icon
        path={props.icon}
        mousePos={props.mousePos}
        openWindow={() => setOpen(true)}
      />
      <div
        className="window"
        style={{
          display: open ? "" : "none",
          transform: `translate(${pos[0]}px, ${pos[1]}px)`,
        }}
        {...windowProps}
      >
        <div className="windowBar">
          <div className="has-grow" />
          <button className="close" onClick={() => setOpen(false)}>
            X
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Window;
