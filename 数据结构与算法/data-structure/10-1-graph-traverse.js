/**
 * 图的遍历
 * DFS: 栈, 将顶点存入栈，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
 * BFS: 队列, 将顶点存入队列，最先入队列的顶点先被探索
 */

const { Graph } = require("./10-0-graph");
const { Queue } = require("./04-1-queue");

// 问每个顶点至多访问两次
const Colors = {
  WHITE: 0, // 未访问
  GREY: 1, // 访问一次
  BLACK: 2, // 访问两次
};

// 初始化一个全局表, 记录顶点被访问的情况
const initColor = (vList) => {
  const colors = {};
  for (let i = 0; i < vList.length; i++) {
    const v = vList[i];
    colors[v] = Colors.WHITE;
  }
  return colors;
};

/**
 * 1.图的广度优先遍历
 * 从指定的第一个顶点开始遍历图，先访问其所有的邻点（相邻顶点），先宽后深地访问顶点; 按顺序访问, 适合用队列来储存访问的顶点
 * 创建队列 =》标注顶点 =》将访问过的顶点出队列, 将关联顶点入队列, .....
 */

const breadFirstSearch = (graph, startVertex, cbFn) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initColor(vertices);
  const queue = new Queue();
  queue.enQueue(startVertex);

  while (!queue.isEmpty()) {
    const visited = queue.deQueue();
    const visitedRelateList = adjList.get(visited);
    color[visited] = Colors.GREY;

    for (let i = 0; i < visitedRelateList.length; i++) {
      const w = visitedRelateList[i];
      // 这里做一下判断, 没访问过的进队列里进行标记
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enQueue(w);
      }
    }

    color[visited] = Colors.BLACK;

    if (cbFn) {
      cbFn(visited);
    }
  }
};

// BFS 寻找最短路径, 以边的数量计
// 给定一个图 G 和源顶点 v，找出每个顶点 u 和 v 之间最短路径的距离
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initColor(vertices);
  const queue = new Queue();
  queue.enQueue(startVertex);

  // 记录源顶点和 每个顶点的距离
  const distances = {};
  // 记录前溯点, 推导出从 v 到其他每个顶点 u 的最短路径
  const predecessors = {};
  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    distances[v] = 0;
    predecessors[v] = null;
  }

  while (!queue.isEmpty()) {
    const visited = queue.deQueue();
    const visitedRelateList = adjList.get(visited);
    color[visited] = Colors.GREY;

    for (let i = 0; i < visitedRelateList.length; i++) {
      const w = visitedRelateList[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        // 记录距离和前溯点
        distances[w] = distances[visited] + 1;
        predecessors[w] = visited;
        queue.enQueue(w);
      }
    }

    color[visited] = Colors.BLACK;
  }

  return {
    distances,
    predecessors,
  };
};

const g = new Graph();
const edgeList = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < edgeList.length; i++) {
  g.addVertex(edgeList[i]);
}
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("A", "D");
g.addEdge("C", "D");
g.addEdge("C", "G");
g.addEdge("D", "G");
g.addEdge("D", "H");
g.addEdge("B", "E");
g.addEdge("B", "F");
g.addEdge("E", "I");

console.log(BFS(g, "B"));



