/**
 * 图: 一组节点, 通过边连接
 * G=(V, E)
 * V：一组顶点
 * E：一组边，连接 V 中的顶点
 * 特性:
 * 相邻顶点: 一条边连接在一起的顶点称为相邻顶点;
 * 顶点的度: 是其相邻顶点的数量;
 * 路径: 是顶点 v1, v2, …, vk的一个连续序列
 * 简单路径: 要求不包含重复的顶点;
 * 环: 是一个简单路径，比如 A D C A, 图中每两个顶点间都存在路径，则该图是连通的
 * 方向性: 有向和无向
 */

// 图的数据结构表示:
// 1.邻接矩阵, 每个节点都和一个整数相关联，该整数将作为数组的索引
// 用一个二维数组来表示顶点之间的连接。如果索引为 i 的节点和索引为 j 的节点相邻，则array[i][j] === 1，否则 array[i][j] === 0

// 2.邻接表, 邻接表由图中每个顶点的相邻顶点列表所组成

// 3.关联矩阵, 矩阵的行表示顶点，列表示边; 使用二维数组来表示两者之间的连通性
// 顶点是边的入射点, array[i][j] === 1
const { Dictionary } = require("./07-1-dictionary");

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected; // 默认无向
    // 邻接表实现
    this.vertices = []; // 顶点表
    this.adjList = new Dictionary(); // 相邻顶点表
  }

  // 添加顶点
  addVertex(v) {
    if (this.vertices.includes(v)) return;
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  // 添加邻接顶点, 边
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w); // w 加到 v 的邻接表里

    if (!this.isDirected) { // 无向
      // 添加 w 到 v 的边
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let res = "";
    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      res += `${v} -> `;
      const linkList = this.adjList.get(v);
      // console.log(linkList)
      for (let j = 0; j < linkList.length; j++) {
        const w = linkList[j];
        res += `${w} `;
      }
      res += "\n";
    }
    return res;
  }
}

let g = new Graph();
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
g.addEdge('E', 'I');

// console.log(g.toString())

module.exports = {
  Graph
}
