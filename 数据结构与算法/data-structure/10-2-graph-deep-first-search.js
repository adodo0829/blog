/**
 * 2.图的深度优先遍历
 * 从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径.(递归)
 * 创建函数栈 =》标注指定顶点 =》 标注相邻顶点(指定顶点已访问两次)...
 */

const { Graph } = require("./10-0-graph");
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

const deepFirstSearch = (graph, cbFn) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initColor(vertices)

  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    if (color[v] === Colors.WHITE) {
      deepFirstSearchVisit(v, color, adjList, cbFn)
    }    
  }
}

const deepFirstSearchVisit = (v, color, adjList, callback) => {
  color[v] = Colors.GREY
  if (callback) callback(v)

  const vRelates = adjList.get(v)
  for (let i = 0; i < vRelates.length; i++) {
    const w = vRelates[i];
    if (color[w] === Colors.WHITE) {
      deepFirstSearchVisit(w, color, adjList, callback)
    }
  }
  color[v] = Colors.BLACK
}