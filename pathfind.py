from maze import *
import matplotlib.pyplot as plt

size = 20

def aStar(maze, start, end):
  queue = [end + [0]]
  i = 0
  while queue:
    current = queue[i]
    #end found
    if current[:-1] == start:
      path = [current]
      while path[-1][:-1] != end:
        path.append(min([x for x in queue if x[:-1] in [x for x in neighbors(path[-1][:-1])]], key=lambda x: x[2]))
      return path
    
    neighbor = [x + [current[2]+1] for x in neighbors(current[:-1])]
    
    for x in list(neighbor):
      if maze[x[0]][x[1]] == 0 or x[:-1] in [x[:-1] for x in queue]:
        neighbor.remove(x)
    queue += neighbor
    i += 1

if __name__ == '__main__':
  maze = generateMaze(size)

  path = aStar(maze[0], maze[1], maze[2])
  for x in path:
    maze[0][x[0]][x[1]] = 2
  maze[0][1][1] = maze[0][-2][maze[2][1]] = 3

  plt.imshow(maze[0])
  plt.axis('off')
  plt.show()