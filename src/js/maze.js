function neighborCells([x, y], size) {
  let neighbors = [];
  for (let value of [-2, 2]) {
    if (x + value > 0 && x + value < size + 2) neighbors.push([x + value, y]);
    if (y + value > 0 && y + value < size + 2) neighbors.push([x, y + value]);
  }
  return neighbors;
}

function generateMaze(size) {
  let maze = Array.from({ length: size + 2 }, () => new Array(size + 2).fill(''));
  let wallList = neighborCells([1, 1], size);
  for (let wall of wallList) maze[wall[0]][wall[1]] = 's';
  maze[1][1] = 'c';

  while (wallList.length) {
    let tentative = wallList[Math.floor(Math.random() * wallList.length)];
    let notEdge = tentative[0] != size + 1 && tentative[1] != size + 1;
    let nearbyCells = neighborCells(tentative, size).filter((cell) => {
      value = maze[cell[0]][cell[1]];
      if (value == 'c') return cell;
      if (!value) {
        maze[cell[0]][cell[1]] = 's';
        if (notEdge) wallList.push(cell);
      }
    });

    let chosenCell = nearbyCells[Math.floor(Math.random() * nearbyCells.length)];
    maze[(tentative[0] + chosenCell[0]) / 2][(tentative[1] + chosenCell[1]) / 2] = 'c';
    if (notEdge) maze[tentative[0]][tentative[1]] = 'c';

    wallList.splice(wallList.indexOf(tentative), 1);
  }

  // normalize values
  for (let i = 1; i < size + 1; i++) {
    if (maze[size + 1][i] == 's') maze[size][i] = 'c';
    if (maze[i][size + 1] == 's') maze[i][size] = 'c';
  }

  for (let i = 0; i < size + 2; i++) {
    for (let j = 0; j < size + 2; j++) {
      if (maze[i][j] != 'c') maze[i][j] = 0;
      else maze[i][j] = 1;
    }
  }
  let end = maze[size].reduce((r, d, i) => (d == 1 ? (r.push(i), r) : r), []);
  return [maze, [1, 1], [size, end[Math.floor(Math.random() * end.length)]]];
}
