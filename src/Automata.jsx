import { useState, useEffect, useRef } from "react";
import Window from "./Window";

const colors = ["#15F5BA", "#836FFF", "#211951"];
const deathColor = [1, 2, 0];

const randomArray = () => {
  return new Array(30).fill(0).map(() => {
    return new Array(40).fill(0).map(() => Math.floor(Math.random() * 3));
  });
};

const initVal = randomArray();

const update = (cells) => {
  const nextCells = new Array(30).fill(0).map(() => {
    return new Array(40).fill(0);
  });
  cells.forEach((row, i) => {
    row.forEach((cell, j) => {
      const neighbors = [
        cell,
        i > 0 ? cells[i - 1][j] : null,
        i < 29 ? cells[i + 1][j] : null,
        j > 0 ? cells[i][j - 1] : null,
        j < 39 ? cells[i][j + 1] : null,
        i > 0 && j > 0 ? cells[i - 1][j - 1] : null,
        i < 29 && j > 0 ? cells[i + 1][j - 1] : null,
        i > 0 && j < 39 ? cells[i - 1][j + 1] : null,
        i < 29 && j < 39 ? cells[i + 1][j + 1] : null,
      ];

      let losts = 0;
      neighbors.forEach((n) => {
        if (fightLost(cell, n)) losts += 1;
      });
      if (losts <= 2) {
        nextCells[i][j] = cell;
      } else {
        nextCells[i][j] = deathColor[cell];
      }
    });
  });
  return nextCells;
};

const fightLost = (currentCell, neighbor) => {
  // 0 < 1, 1 < 2, 2 < 0
  if (currentCell === neighbor || neighbor == null) return false;
  if (currentCell === 0) {
    return neighbor === 1;
  }
  if (currentCell === 1) {
    return neighbor === 2;
  }
  if (currentCell === 2) {
    return neighbor === 0;
  }
};
export function Automata(props) {
  //30 x 40 cells
  // cell value can be 0, 1, 2
  const cells = useRef(initVal);
  const canvas = useRef(null);
  const [paused, setPaused] = useState(true);
  const [settings, setSettings] = useState({
    opened: false,
  });

  const paint = (cells) => {
    const ctx = canvas.current.getContext("2d");
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[0].length; j++) {
        ctx.fillStyle = colors[cells[i][j]];
        ctx.fillRect(
          (j * canvas.current.width) / cells[0].length,
          (i * canvas.current.height) / cells.length,
          canvas.current.width / cells[0].length,
          canvas.current.height / cells.length
        );
      }
    }
  };

  useEffect(() => {
    if (!paused) {
      const intervalId = setInterval(() => {
        cells.current = update(cells.current);
        paint(cells.current);
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [paused]);

  useEffect(() => {
    paint(cells.current);
  }, []);

  return (
    <>
      <canvas ref={canvas} id="canvas"></canvas>
      {paused && (
        <span
          className="material-symbols-outlined pause"
          onClick={() => setPaused((p) => !p)}
        >
          play_arrow
        </span>
      )}
      {!paused && (
        <span
          className="material-symbols-outlined pause"
          onClick={() => setPaused((p) => !p)}
        >
          pause
        </span>
      )}
      <span
        className="material-symbols-outlined settings"
        onClick={() => setSettings((s) => ({ ...s, opened: !s.opened }))}
      >
        settings
      </span>
      {settings.opened && (
        <Window height="200px" width="200px" windowStartPosition={[420, -150]}>
          <p>Settings</p>
        </Window>
      )}
    </>
  );
}
