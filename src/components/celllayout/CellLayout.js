import React, { useState, useEffect } from 'react';
import './CellLayout.css';
import './CellLayout.css';

const defaultGridSize = 3;

const CellLayout = () => {

  const [selectedId, setSelectedId] = useState(null);
  const [clickedCells, setClickedCells] = useState([]);
  const [gridSize] = useState(defaultGridSize);

  useEffect(() => {
    const storedSequence = JSON.parse(localStorage.getItem('clickedCells'));
    if (storedSequence) {
      setClickedCells(storedSequence);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clickedCells', JSON.stringify(clickedCells));
  }, [clickedCells]);


  const handleCellClick = (id) => {
    setSelectedId(id);
    setClickedCells((prev) => [...prev, id]);
  };

  const handleReplay = () => {
    if (clickedCells.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setSelectedId(clickedCells[index]);
        index++;
        if (index === clickedCells.length) {
          clearInterval(interval);
        }
      }, 500);
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setClickedCells([]);
    localStorage.removeItem('clickedCells');
  };

const renderCells = () => {
  const cells = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    cells.push(
      <div
        key={i}
        id={i}
        className={`cell ${selectedId === i ? 'bg-green' : 'bg-white'}`}
        onClick={() => handleCellClick(i)}
      />
    );
  }
  return cells;
};

  return (
    <div className="container">
    <div className="grid">
      {renderCells()}
    </div>
    <div className="controls">
      <button className="btn btn-primary" onClick={handleReplay}>Replay</button>
      <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
    </div>
  </div>
);
  
}

export default CellLayout