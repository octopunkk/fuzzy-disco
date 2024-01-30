import { useEffect, useState } from "react";

/*
useDraggable : hook for custom drag and drop an an element
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

export const useDraggable = (clickAction, options = {}) => {
  const [mousePos, setMousePos] = useState([0, 0]);
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

  //todo: add new useEffect (with empty array), to add event listener on document to :
  // - check if pointer is up and execute stuff from onpointer up

  const handlePointerMove = (e) => {
    setMousePos([e.clientX, e.clientY]);
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
  };

  const handlePointerUp = (e) => {
    if (clickEv.isClicked) {
      if (
        clickAction &&
        Math.abs(clickEv.mouseOnClick[0] - mousePos[0]) < 5 &&
        Math.abs(clickEv.mouseOnClick[1] - mousePos[1]) < 5
      ) {
        clickAction();
      }
    }
    setClickEv((c) => ({ ...c, isClicked: false }));
  };

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [clickEv, mousePos]);

  //touchE-eents  ??

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
    },
    pos: pos,
  };
};
