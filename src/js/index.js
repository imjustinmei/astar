let size = document.getElementById('size');
let sizeValue = document.getElementById('sizeValue');
let speed = document.getElementById('speed');
let speedValue = document.getElementById('speedValue');

size.oninput = () => {
  sizeValue.innerHTML = size.value;
};

speed.oninput = () => {
  speedValue.innerHTML = speed.value;
};

let newMaze = (generating = false);
async function generate() {
  newMaze = true;
  if (generating) {
    return;
  }
  let currentSize = parseInt(size.value);
  let [mazeArray, startCell, endCell] = generateMaze(currentSize);
  let [path, queue] = aStar(mazeArray, startCell, endCell);

  sessionStorage.path = JSON.stringify(path);
  sessionStorage.queue = JSON.stringify(queue);

  generating = true;
  setTimeout(() => {
    generating = false;
  }, currentSize * 8);

  let maze = document.getElementById('maze');
  maze.innerHTML = '';
  for (let i = 0; i < currentSize + 2; i++) {
    let row = document.createElement('div');
    row.className = 'row';

    for (let j = 0; j < currentSize + 2; j++) {
      let cell = document.createElement('div');
      cell.className = mazeArray[i][j] == 1 ? '' : 'wall';
      cell.classList.add('cell');
      cell.id = String(i) + ',' + String(j);
      row.appendChild(cell);
    }
    maze.appendChild(row);
    let current = new Promise((resolve) => setTimeout(resolve, 8));
    await current;
  }

  // color cells
  let start = document.getElementById('1,1');
  start.classList.add('start');
  let end = document.getElementById(String(path[path.length - 1][0]) + ',' + String(path[path.length - 1][1]));
  end.classList.add('end');
}

async function animateMaze(demonstration) {
  if (!newMaze) {
    return;
  }
  newMaze = false;
  let animationSpeed = speed.value / 2;
  let path = JSON.parse(sessionStorage.path);
  let queue = JSON.parse(sessionStorage.queue);

  // demonstration
  if (demonstration) {
    for (let c of queue.slice(1, queue.length)) {
      if (String(c[0]) + ',' + String(c[1]) == '1,1') {
        break;
      }
      let cell = document.getElementById(String(c[0]) + ',' + String(c[1]));
      cell.style.backgroundColor = 'hsl(12, 65%, ' + (95 - (20 * c[2]) / path.length) + '%)';
      let current = new Promise((resolve) => setTimeout(resolve, 5 / animationSpeed));
      await current;
    }
  }

  // final path
  for (let c of path.slice(1, path.length - 1)) {
    let pathCell = document.getElementById(String(c[0]) + ',' + String(c[1]));
    pathCell.style.backgroundColor = 'hsl(193, 66%, ' + (76 + (19 * c[2]) / path.length) + '%)';
    let current = new Promise((resolve) => setTimeout(resolve, 75 - animationSpeed));
    await current;
  }
}
