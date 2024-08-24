import React, { useState, useCallback, useRef } from 'react';
import { Grid } from './Components/Grid';
import { initializeGrid, nextGen } from './TheGameOfLife/algorithm';
import { Navbar } from './Components/Navbar';

function App() {
  const [grid, setGrid] = useState(() => initializeGrid(50, 50));
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);

  const handleNext = useCallback(() => {
    setGrid(prevGrid => nextGen(prevGrid));
  }, []);

  const toggleCell = useCallback((i, j) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      newGrid[i][j] = newGrid[i][j] === 1 ? 0 : 1;
      return newGrid;
    });
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setGrid(prevGrid => nextGen(prevGrid));
      }, 150);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, grid]);

  return (
    <div class="bg-slate-950">
      <Navbar/>
      <div className="relative w-[100px] h-screen">
      <Grid  grid={grid} toggleCell={toggleCell} />
      </div>
      <button className="absolute top-[100px] right-[90px] font-mono font-bold text-black py-2 px-10 rounded  border-black hover:opacity-60 transition-all duration-100 bg-white" onClick={handleNext}>Next</button>
      {isPlaying ? (
        <button className="absolute top-[150px] right-[90px] font-mono font-bold text-black py-2 px-10 rounded  border-black hover:opacity-60 transition-all duration-100 bg-white" onClick={handleStop}>Stop</button>
      ) : (
        <button className="absolute top-[150px] right-[90px] font-mono font-bold text-black py-2 px-10 rounded  border-black hover:opacity-60 transition-all duration-100 bg-white" onClick={handlePlay}>Play</button>
      )}
    </div>
  );
}

export default App;