import { useEffect, useState } from "react";

/*
useDraggable : hook for custom drag and drop an an element
mousePos = position of the mouse (usually from the App component)
clickAction = function to execute if the element is clicked on but not moved
options = optionnal obj to tweak the comportment of the hook
  startPosition: [int, int] = start position, default:  random
  bounds: {size, boundsSize}
*/

const isInside = (e, ref) => {
  const innerRect = e.target.getBoundingClientRect();
  const outerRect = ref.current.getBoundingClientRect();
  return (
    innerRect.top >= outerRect.top &&
    innerRect.bottom < outerRect.bottom &&
    innerRect.left > outerRect.left &&
    innerRect.right < outerRect.right
  );
};

// pos: [x, y], size: [width, height], boundsSize: [width, height]
const getPosInBounds = (pos, size, boundsSize) => {
  let posInBounds = [...pos];
  if (pos[0] < 0) posInBounds[0] = 0;
  if (pos[1] - size[1] < 0) posInBounds[1] = size[1];
  if (pos[0] + size[0] > boundsSize[0])
    posInBounds[0] = boundsSize[0] - size[0];
  if (pos[1] > boundsSize[1]) posInBounds[1] = boundsSize[1];
  return posInBounds;
};

export const useDraggable = (mousePos, clickAction, options = {}) => {
  const [pos, setPos] = useState(
    options?.startPosition
      ? options.startPosition
      : [
          Math.random() * 0.5 * window.innerWidth,
          Math.random() * 0.5 * window.innerHeight,
        ]
  );
  const [clickEv, setClickEv] = useState({
    event: {},
    isClicked: false,
    mouseOnClick: [0, 0],
    offsetOnClick: [0, 0],
  });

  useEffect(() => {
    if (clickEv.isClicked) {
      const pos = [
        mousePos[0] + clickEv.offsetOnClick[0],
        mousePos[1] + clickEv.offsetOnClick[1],
      ];

      if (options.bounds) {
        setPos(getPosInBounds(pos, [30, 30], [400, 300]));
      } else {
        setPos(pos);
      }
    }
  }, [clickEv, mousePos]);
  return {
    windowProps: {
      onPointerDown: (e) => {
        setClickEv({
          event: e,
          isClicked: true,
          mouseOnClick: [e.clientX, e.clientY],
          offsetOnClick: [pos[0] - e.clientX, pos[1] - e.clientY],
        });
      },
      onPointerUp: (e) => {
        setClickEv((c) => ({ ...c, isClicked: false }));
        if (options.bounds) isInside(e, options.bounds);
        if (
          clickAction &&
          Math.abs(clickEv.mouseOnClick[0] - mousePos[0]) < 5 &&
          Math.abs(clickEv.mouseOnClick[1] - mousePos[1]) < 5
        ) {
          clickAction();
        }
      },
    },
    pos: pos,
  };
};
