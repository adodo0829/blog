/**
 * 回溯思想
 * 回溯是一种渐进式寻找并构建问题解决方式的策略;
 * 我们从一个可能的动作开始并试着用这个动作解决问题。如果不能解决，就回溯并选择另一个动作直到将问题解决。
 * 根据这种行为，回溯算法会尝试所有可能的动作（如果更快找到了解决办法就尝试较少的次数）来解决问题。
 */

// 迷宫老鼠: 从位置[0][0]开始并移动到[n-1][n-1]
// 0: 阻挡, 1:通过
const maze = [
  [1, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
  [0, 1, 1, 1],
];

const res = [
  [1, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
];

function ratInMaze(maze) {
  const solution = [];

  // 先初始化路径地图
  for (let i = 0; i < maze.length; i++) {
    solution[i] = [];
    for (let j = 0; j < maze.length; j++) {
      solution[i][j] = 0;
    }
  }

  // 找路径, 两个矩阵的比较, 在新地图上标记
  if (findPath(maze, 0, 0, solution) === true) {
    return solution;
  }

  return "No Path Found";
}

const findPath = (maze, x, y, solution) => {
  const n = maze.length;
  // 最后一步
  if (x === n - 1 && y === n - 1) {
    solution[x][y] === 1;
    return true;
  }

  // 水平向右和向下移动, 如果碰壁则不能移动
  if (isSafe(maze, x, y)) {
    solution[x][y] = 1;

    // 向右
    if (findPath(maze, x + 1, y, solution)) {
      return true;
    }

    // 向下
    if (findPath(maze, x, y + 1, solution)) {
      return true;
    }
    solution[x][y] = 0;
    return false;
  }

  return false;
};

function isSafe(maze, x, y) {
  const n = maze.length;

  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true;
  }
  return false;
}

console.log(ratInMaze(maze))