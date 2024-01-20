import { useEffect, useState } from "react";

export const useDraggable = (mousePos, clickAction) => {
  const [pos, setPos] = useState([
    Math.random() * 0.7 * window.innerWidth,
    Math.random() * 0.7 * window.innerHeight,
  ]);
  const [clickEv, setClickEv] = useState({
    isClicked: false,
    xOnClick: 0,
    yOnClick: 0,
    offsetOnClick: 0,
  });

  useEffect(() => {
    if (clickEv.isClicked) {
      setPos([
        mousePos[0] + clickEv.offsetOnClick[0],
        mousePos[1] + clickEv.offsetOnClick[1],
      ]);
    }
  }, [clickEv, mousePos]);
  return {
    windowProps: {
      onPointerDown: (e) => {
        setClickEv({
          isClicked: true,
          xOnClick: e.clientX,
          yOnClick: e.clientY,
          offsetOnClick: [pos[0] - e.clientX, pos[1] - e.clientY],
        });
      },
      onPointerUp: () => {
        setClickEv((c) => ({ ...c, isClicked: false }));
        if (
          clickAction &&
          Math.abs(clickEv.xOnClick - mousePos[0]) < 5 &&
          Math.abs(clickEv.yOnClick - mousePos[1]) < 5
        ) {
          clickAction();
        }
      },
    },
    pos: pos,
  };
};
