import { useState, useEffect } from "react";
import { useDraggable } from "./utils";
import "./App.css";
import Icon from "./Icon";

function Window(props) {
  const [open, setOpen] = useState(props.icon ? false : true);
  // TODO : finish this
  const [reduce, setReduce] = useState(false);
  const { windowProps, pos } = useDraggable(null, {
    startPosition: props.windowStartPosition,
  });

  return (
    <div>
      {props.icon && (
        <Icon
          path={props.icon}
          openWindow={() => setOpen(true)}
          startPosition={props?.startPosition}
        />
      )}
      <div
        className="window"
        style={{
          display: open ? "" : "none",
          transform: `translate(${pos[0]}px, ${pos[1]}px)`,
          height: props.height ? props.height : "400px",
          width: props.width ? props.width : "400px",
        }}
      >
        <div className="windowBar" {...windowProps}>
          <div className="has-grow" />
          <button
            className="close"
            onClick={() => {
              setReduce(true);
              setOpen(false);
            }}
          >
            -
          </button>
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
