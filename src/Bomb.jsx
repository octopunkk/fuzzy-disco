import bombBg from "./assets/bomb-bg.png";
import { useDraggable } from "./utils";

export function Bomb(props) {
  return (
    <div className="bombWindow">
      <img src={bombBg} className="bombBg" draggable={false} />

      <div className="leftBomb" />
      <div className="rightBomb" />
    </div>
  );
}
