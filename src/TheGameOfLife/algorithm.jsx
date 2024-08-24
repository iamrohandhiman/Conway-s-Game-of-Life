export function initializeGrid(rows, cols) {
  return Array(rows).fill().map(() => Array(cols).fill(0));
}

export function nextGen(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  return grid.map((row, i) =>
    row.map((cell, j) => {
      const liveNeighbours = countLiveNeighbours(grid, i, j);
      if (cell === 1) {
        return (liveNeighbours === 2 || liveNeighbours === 3) ? 1 : 0;
      } else {
        return liveNeighbours === 3 ? 1 : 0;
      }
    })
  );
}

function countLiveNeighbours(grid, x, y) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = x + i;
      const newY = y + j;
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        count += grid[newX][newY];
      }
    }
  }
  return count;
}