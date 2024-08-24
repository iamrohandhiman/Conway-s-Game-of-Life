import React from 'react';
import { EachPixel } from './EachPixel';

export const Grid = React.memo(({ grid, toggleCell }) => {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  return (
    <div
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        width: '100%'
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <EachPixel
            key={`${i}-${j}`}
            isAlive={cell === 1}
            onClick={() => toggleCell(i, j)}
          />
        ))
      )}
    </div>
  );
});