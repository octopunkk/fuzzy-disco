import { useEffect, useState } from "react";
import "./App.css";

const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour12: false,
    minutes: "2-digit",
  });
};

function Toolbar() {
  const [clock, setClock] = useState(getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(getTime());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="toolbar">
      <div className="has-grow" />
      <div className="clock">{clock}</div>
    </div>
  );
}

export default Toolbar;
