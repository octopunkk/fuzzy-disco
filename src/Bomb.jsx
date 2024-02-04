import { useState, useEffect, useRef } from "react";
import bombBg from "./assets/bomb-bg.png";
import bombIcon from "./assets/bomb.png";
import bobomb from "./assets/bobomb.png";
import pink_bobomb from "./assets/pink_bobomb.png";

import explosionIcon from "./assets/explosion.png";

import { useDraggable, isInside } from "./utils";

function Bobomb(props) {
  const bobombRef = useRef(null);
  let [isDefused, setIsDefused] = useState(false);
  let hasExploded = props.gameTime - props.createdAt > 20;
  const { windowProps, pos } = useDraggable(null, {
    startPosition: [Math.random() * 200 + 100, Math.random() * 200 + 100],
    bounds: props.windowRef,
  });
  const bobombAsset = props.color === "black" ? bobomb : pink_bobomb;

  if (!isDefused && !hasExploded && isInside(bobombRef, props.target)) {
    setIsDefused(true);
    props.setScore((p) => p + 100);
  }

  if (!isDefused && hasExploded) {
    props.setGameOver(true);
    props.setGameStarted(false);
  }

  let isBlinking =
    props.gameTime - props.createdAt > 12 &&
    props.gameTime % 2 === 0 &&
    !isDefused;

  return (
    <img
      ref={bobombRef}
      className="bobomb"
      src={!isDefused && hasExploded ? explosionIcon : bobombAsset}
      style={{
        transform: `translate(${pos[0]}px, ${pos[1]}px)`,
        filter: isBlinking ? `invert(75%) contrast(600%)` : "",
      }}
      draggable={false}
      {...windowProps}
    />
  );
}

export function Bomb(props) {
  const windowRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [bobombs, setBobombs] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      const intervalId = setInterval(() => {
        setGameTime((p) => p + 1);
        console.log(gameTime);
        if (gameTime % 5 === 0 && gameTime <= 15) {
          setBobombs((b) => [...b, { color: "black", createdAt: gameTime }]);
        }
        if (gameTime > 15 && gameTime % 2 === 0) {
          const bombColor = Math.random() < 0.5 ? "pink" : "black";
          setBobombs((b) => [...b, { color: bombColor, createdAt: gameTime }]);
        }
        if (gameTime > 30 && gameTime % 7 === 0) {
          const bombColor = Math.random() < 0.5 ? "pink" : "black";
          setBobombs((b) => [...b, { color: bombColor, createdAt: gameTime }]);
        }
      }, 500);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameTime, gameStarted]);

  const restart = () => {
    setGameOver(false);
    setGameStarted(true);
    setBobombs([]);
    setScore(0);
    setGameTime(0);
  };

  return (
    <div className="bombWindow" ref={windowRef}>
      <img src={bombBg} className="bombBg" draggable={false} />
      <p className="score">SCORE: {score}</p>
      <div className="leftBomb" ref={leftRef} />
      <div className="rightBomb" ref={rightRef} />
      {!gameStarted && !gameOver && (
        <button className="startButton" onClick={() => setGameStarted(true)}>
          START
        </button>
      )}

      {gameOver && (
        <div className="gameOver">
          <p>GAME OVER</p>
          <span> Score: {score}</span>
          <button onClick={restart}>RESTART</button>
        </div>
      )}
      {bobombs.map((bobomb, index) => {
        return (
          <Bobomb
            key={index}
            windowRef={windowRef}
            target={bobomb.color == "black" ? rightRef : leftRef}
            createdAt={bobomb.createdAt}
            color={bobomb.color}
            gameTime={gameTime}
            setGameOver={setGameOver}
            setGameStarted={setGameStarted}
            setScore={setScore}
          />
        );
      })}
    </div>
  );
}
