from maze import generateMaze
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap

size = 50
def neighbors(cell):
    return [[cell[0] + x, cell[1]] for x in [-1, 1]] + [[cell[0], cell[1] + x] for x in [-1, 1]]

def aStar(maze, start, end):
    queue = [end + [0]]
    i = 0
    while queue:
        current = queue[i]

        # end found
        if current[:-1] == start:
            path = [current]
            while (path[-1])[:-1] != end: 
                path.append(min([x for x in queue if x[:-1] in [x
                            for x in neighbors((path[-1])[:-1])]], key=lambda x: x[2]))
            return path

        neighbor = neighbors(current[:-1])
        for x in list(neighbor):
            if maze[x[0]][x[1]] == 0 or x in [y[:-1] for y in queue]:
                neighbor.remove(x)
        queue += map(lambda x: x + [current[2]+1], neighbor)
        i += 1

if __name__ == '__main__':
    maze = generateMaze(size)
    path = aStar(maze[0], maze[1], maze[2])
    for x in path:
        maze[0][x[0]][x[1]] = 2 
    maze[0][maze[2][0]][maze[2][1]] = 3
    maze[0][1][1] = 4

    plt.imshow(maze[0], cmap=ListedColormap(['k', 'w', '#99d9ea', '#ed1c24', '#22b14c']))
    plt.axis('off')
    plt.show()