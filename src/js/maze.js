function neighbors(cell) {
  let neighbor = [];
  for (let value of [-1, 1]) {
    neighbor.push([cell[0] + value, cell[1]]);
  }
  for (let value of [-1, 1]) {
    neighbor.push([cell[0], cell[1] + value]);
  }
  return neighbor;
}

function generateMaze(size) {
  let start = 1;
  let wallList = neighbors([start, start]);
  var maze = Array.from({ length: size + 2 }, () => new Array(size + 2).fill('u'));
  maze[1][1] = 'c';

  while (wallList.length) {
    let randWall = wallList[Math.floor(Math.random() * wallList.length)];
    if (0 < randWall[0] && randWall[0] < size + 1 && 0 < randWall[1] && randWall[1] < size + 1) {
      let values = neighbors([randWall[0], randWall[1]]).map((neighbor) => maze[neighbor[0]][neighbor[1]]);
      if (values.filter((value) => value == 'c').length < 2) {
        let horizontal = (values[0] == 'c') != (values[1] == 'c') && (values[0] == 'u') != (values[1] == 'u');
        let vertical = (values[2] == 'c') != (values[3] == 'c') && (values[2] == 'u') != (values[3] == 'u');
        if (horizontal || vertical) {
          maze[randWall[0]][randWall[1]] = 'c';
          for (let neighbor of neighbors([randWall[0], randWall[1]])) {
            if (maze[neighbor[0]][neighbor[1]] == 'u') {
              maze[neighbor[0]][neighbor[1]] = 'w';
              wallList.push([neighbor[0], neighbor[1]]);
            }
          }
        }
      }
    }
    wallList = wallList.filter(function (wall) {
      return wall !== randWall;
    });
  }
  for (let i = 0; i < size + 2; i++) {
    for (let j = 0; j < size + 2; j++) {
      if (maze[i][j] != 'c') {
        maze[i][j] = 0;
      } else {
        maze[i][j] = 1;
      }
    }
  }
  let end = maze[size].reduce((r, d, i) => (d == 1 ? (r.push(i), r) : r), []);
  return [maze, [start, start], [size, end[Math.floor(Math.random() * end.length)]]];
}
