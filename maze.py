import random

def neighbors(cell, size):
    return [[cell[0] + x, cell[1]] for x in [-2, 2] if cell[0] + x > 0 and cell[0] + x < size + 2] + [[cell[0], cell[1] + y] for y in [-2, 2] if cell[1] + y > 0 and cell[1] + y < size + 2]

def generateMaze(size, start=1):
    # randomized prim's algorithm

    wlist = neighbors([start, start], size)
    maze = [['u' for y in range(size + 2)] for x in range(size + 2)]
    maze[start][start] = 'c'
    for wall in wlist: maze[wall[0]][wall[1]] = 's'

    while wlist:
        randWall = random.choice(wlist)
        notEdge = randWall[0] != size + 1 and randWall[1] != size + 1
        nearbyCells = []
        for cell in neighbors(randWall, size):
            value = maze[cell[0]][cell[1]]
            if value == 'c': nearbyCells += [cell]
            elif value == 'u': 
                maze[cell[0]][cell[1]] = 's'
                if notEdge: wlist += [cell]

        chosenCell = random.choice(nearbyCells)
        maze[(randWall[0] + chosenCell[0]) // 2][(randWall[1] + chosenCell[1]) // 2] = 'c'
        if notEdge: maze[randWall[0]][randWall[1]] = 'c'

        wlist.remove(randWall)

    # normalize cell values
    for x in range(1, size + 1):
        if maze[size + 1][x] == 's': maze[size][x] = 'c'
        if maze[x][size + 1] == 's': maze[x][size] = 'c'

    for y, x in enumerate(maze):
        for z in range(len(x)):
            if x[z] != 'c':
                maze[y][z] = 0
            else:
                maze[y][z] = 1

    end = random.choice([i for i in range(size)[1:-1] if maze[-2][i-1] != maze[-2][i]])
    return (maze, [start, start], [size, end])