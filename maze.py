import random
import matplotlib.pyplot as plt

def neighbors(cell):
  return [[cell[0] + x, cell[1]] for x in [-1, 1]] + [[cell[0], cell[1] + x] for x in [-1, 1]]

def generateMaze(size, start=1):
  wlist = []
  maze = [['u' for y in range(size + 2)] for x in range(size + 2)]
  maze[start][start] = 'c'

  for x in neighbors([start, start]):
    wlist.append([x[0], x[1]])

  #randomized prim's algorithm
  while wlist:
    randWall = random.choice(wlist)
    if 0 < randWall[0] < size + 1 and 0 < randWall[1] < size + 1:
      if [maze[x[0]][x[1]] == 'c' for x in neighbors([randWall[0], randWall[1]])].count(True) < 2: 
        vertical = (maze[randWall[0] + 1][randWall[1]] == 'c') != (maze[randWall[0] - 1][randWall[1]] == 'c') and (maze[randWall[0] + 1][randWall[1]] == 'u') != (maze[randWall[0] - 1][randWall[1]] == 'u')
        horizontal = (maze[randWall[0]][randWall[1]+1] == 'c') != (maze[randWall[0]][randWall[1] - 1] == 'c') and (maze[randWall[0]][randWall[1] + 1] == 'u') != (maze[randWall[0]][randWall[1] - 1] == 'u')
        
        if vertical or horizontal:
          maze[randWall[0]][randWall[1]] = 'c'
          for x in neighbors([randWall[0], randWall[1]]):
            if maze[x[0]][x[1]] == 'u':
              maze[x[0]][x[1]] = 'w'
              wlist.append([x[0], x[1]])
        elif not vertical and not horizontal:
          maze[randWall[0]][randWall[1]] = 'w'
    else:
      maze[randWall[0]][randWall[1]] = 'w'
    wlist.remove(randWall)

  #normalize cell values
  for y,x in enumerate(maze):
    for z in range(len(x)):
      if x[z] != 'c':
        maze[y][z] = 0
      else:
        maze[y][z] = 1

  end = random.choice([i for i in range(size+1)[1:-1] if [maze[x[0]][x[1]] for x in neighbors([-2, i])].count(True) < 2])
  return maze, [start, start], [size, end]
