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
        // use transform:translate3d() to make it way faster to update than left/top
        style={{ display: open ? "" : "none", left: pos[0], top: pos[1] }}
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
