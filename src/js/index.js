const size = document.getElementById("size");
const sizeValue = document.getElementById("sizeValue");
const speed = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const maze = document.getElementById("maze");

let animating = (newMaze = false);
let clone;

["size", "speed"].map((e) => {
  let input = eval(e);
  input.oninput = () => {
    if (e == "size") input.value = input.value - (input.value % 2 == 0 ? 1 : 0);
    eval(e + "Value").innerHTML = input.value;
  };
});

async function generate() {
  if (animating) return;
  animating = true;
  maze.innerHTML = "";

  let currentSize = parseInt(size.value);
  let [mazeArray, startCell, endCell] = generateMaze(currentSize);

  // "drawing"
  for (let i = 0; i < currentSize + 2; i++) {
    let row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < currentSize + 2; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      if (mazeArray[i][j] != 1) cell.classList.add("wall");
      cell.id = String(i) + "," + String(j);

      row.appendChild(cell);
    }
    maze.appendChild(row);
    if (i % 4 == 0) await new Promise((resolve) => setTimeout(resolve, 1));
  }
  document.getElementById("1,1").classList.add("start");
  document.getElementById(endCell[0] + "," + endCell[1]).classList.add("end");

  setTimeout(() => {
    let [path, queue] = aStar(mazeArray, startCell, endCell);

    sessionStorage.setItem(
      "pathfind",
      JSON.stringify({ path: path, queue: queue })
    );

    newMaze = true;
    clone = maze.cloneNode(true);
    animating = false;
  }, 0);
}

async function animateMaze(demonstration) {
  if (animating) return;
  animating = true;

  if (!newMaze) maze.innerHTML = clone.innerHTML;
  let animationSpeed = speed.value;
  let { path, queue } = JSON.parse(sessionStorage.getItem("pathfind"));

  // demonstration
  if (demonstration) {
    let count = 0;
    for (let c of queue.slice(1, queue.length)) {
      if (String(c[0]) + "," + String(c[1]) == "1,1") break;
      count++;

      let cell = document.getElementById(String(c[0]) + "," + String(c[1]));
      cell.style.backgroundColor =
        "hsl(12, 65%, " + (95 - (20 * c[2]) / path.length) + "%)";
      if (count % animationSpeed == 0)
        await new Promise((resolve) => setTimeout(resolve, 9 - animationSpeed));
    }
  }

  // final path
  for (let c of path.slice(1, path.length - 1)) {
    let pathCell = document.getElementById(String(c[0]) + "," + String(c[1]));
    pathCell.style.backgroundColor =
      "hsl(193, 66%, " + (76 + (19 * c[2]) / path.length) + "%)";
    await new Promise((resolve) => setTimeout(resolve, 15));
  }

  animating = newMaze = false;
}
