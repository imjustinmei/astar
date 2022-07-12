function aStar(maze, start, end) {
  let queue = [[...end, 0]];
  let i = 0;

  while (queue.length) {
    let current = queue[i];
    if (JSON.stringify(current.slice(0, 2)) == JSON.stringify(start)) {
      let path = [current];
      while (JSON.stringify(path[path.length - 1].slice(0, 2)) != JSON.stringify(end)) {
        let previous = [path[path.length - 1].slice(0, 2)];
        path.push(
          queue
            .filter((cell) => JSON.stringify(neighbors(previous[0], previous[1])).indexOf(JSON.stringify(cell.slice(0, 2))) != -1)
            .reduce((a, b) => {
              return a[2] < b[2] ? a : b;
            })
        );
      }
      return [path, queue];
    }

    let neighbor = neighbors(current.slice(0, 2));
    neighbor = neighbor.filter((n) => !(maze[n[0]][n[1]] == 0 || JSON.stringify(queue.map((x) => x.slice(0, 2))).indexOf(JSON.stringify(n)) != -1)).map((n) => [...n, current[2] + 1]);
    queue = [...queue, ...neighbor];
    i += 1;
  }
}
