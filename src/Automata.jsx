import { useState, useEffect, useRef } from "react";

const colors = ["red", "green", "blue"];
const deathColor = [1, 2, 0];

const randomize = () => {
  return new Array(30).fill(0).map(() => {
    return new Array(40).fill(0).map(() => Math.floor(Math.random() * 3));
  });
};

const initVal = randomize();

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

  const paint = (cells) => {
    const ctx = canvas.current.getContext("2d");
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[0].length; j++) {
        ctx.fillStyle = colors[cells[i][j]];
        ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      cells.current = update(cells.current);
      paint(cells.current);
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <canvas ref={canvas} id="canvas"></canvas>;
}
