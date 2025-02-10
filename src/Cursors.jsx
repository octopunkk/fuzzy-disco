import React from 'react';
import dino from './assets/dino.gif';
import drum from './assets/drum.webp';
import planet from './assets/planet.webp';
import banana from './assets/banana.webp';
import cursor from './assets/cursor.webp';
import science from './assets/science.gif';

function Cursors(props) {
    
  const { setCurrentCursor } = props;

  return (
    <div>
      <h1>Cursors !</h1>
        <img className="cursorButton" style={{height: '20px', width: '20px', padding: '10px'}} src={cursor} alt="cursor" onClick={() => setCurrentCursor('default')} />
        <img className="cursorButton" src={science} alt="science" onClick={() => setCurrentCursor("bubble")} />
        <img className="cursorButton" src={dino} alt="dino" onClick={() => setCurrentCursor(dino)} />
        <img className="cursorButton" src={drum} alt="drum" onClick={() => setCurrentCursor(drum)} />
        <img className="cursorButton" src={planet} alt="planet" onClick={() => setCurrentCursor(planet)} />
        <img className="cursorButton" src={banana} alt="banana" onClick={() => setCurrentCursor(banana)} />
    </div>
  );
}

export { Cursors };