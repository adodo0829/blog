/**
 * 二叉搜索树
 * 在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值
 */

const { defaultCompare, Compare, TreeNode } = require("./utils");

class SearchTree {
  constructor(compareFn = defaultCompare) {
    this.root = null;
    this.compareFn = compareFn;
  }

  // 找到新节点应该插入的正确位置
  insertNode(node, key) {
    // 比较插入的值 vs 当前节点
    const lessThan = this.compareFn(key, node.key) === Compare.LESS_THAN;
    if (lessThan) {
      // 插入左子树
      if (node.left == null) {
        node.left = new TreeNode(key);
      } else {
        // 继续往下面插入
        this.insertNode(node.left, key);
      }
    } else {
      // 插入右子树
      if (node.right == null) {
        node.right = new TreeNode(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  // 树中插入一个新的键
  insert(key) {
    if (this.root == null) {
      const node = new TreeNode(key);
      this.root = node;
    } else {
      // 将节点添加到根节点以外的其他位置
      this.insertNode(this.root, key);
    }
  }

  // 树中查找一个键
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) return false;

    const lt = this.compareFn(key, node.key) === Compare.LESS_THAN;
    const gt = this.compareFn(key, node.key) === Compare.BIGGER_THAN;
    if (lt) {
      return this.searchNode(node.left, key);
    } else if (gt) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  // 中序遍历
  inOrderTraverse(fn) {
    this.inOrderTraverseNode(this.root, fn);
  }
  inOrderTraverseNode(node, fn) {
    // 左 =》 中(节点本身) =》 右
    if (node == null) return;
    this.inOrderTraverseNode(node.left, fn);
    fn(node.key);
    this.inOrderTraverseNode(node.right, fn);
  }

  // 先序遍历
  preOrderTraverse(fn) {
    this.preOrderTraverseNode(this.root, fn);
  }
  preOrderTraverseNode(node, fn) {
    // 中(节点本身) =》 左 =》 右
    if (node == null) return;
    fn(node.key);
    this.preOrderTraverseNode(node.left, fn);
    this.preOrderTraverseNode(node.right, fn);
  }

  // 后序遍历
  postOrderTraverse(fn) {
    this.postOrderTraverseNode(this.root, fn);
  }
  postOrderTraverseNode(node, fn) {
    // 左 => 右 => 中(节点本身)
    if (node == null) return;
    this.postOrderTraverseNode(node.left, fn);
    this.postOrderTraverseNode(node.right, fn);
    fn(node.key);
  }

  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let currNode = node;
    while (currNode != null && currNode.left != null) {
      currNode = currNode.left;
    }
    return currNode;
  }

  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let currNode = node;
    while (currNode != null && currNode.right != null) {
      currNode = currNode.right;
    }
    return currNode;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key); // root 父节点
  }
  removeNode(node, key) {
    if (node == null) return null;
    // 先找节点
    const lt = this.compareFn(key, node.key) === Compare.LESS_THAN;
    const gt = this.compareFn(key, node.key) === Compare.BIGGER_THAN;

    if (lt) {
      // 往左子树找
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (gt) {
      // 往右子树找
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 找到了, 移除引用
      // 1: 叶节点, 无左右子节点, 但是有父节点的引用
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }

      // 2.节点: 有一个左侧或右侧子节点的节点
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      // 3.节点: 左右子节点都存在
      // 需要找到该节点下右侧最小的节点来替换要删除的节点
      // 我们替换值就行了
      const tempNode = this.minNode(node.right);
      node.key = tempNode.key;
      node.right = this.removeNode(node.right, tempNode.key); // 把替换的节点删除
      return node;
    }
  }
}

const printNode = (value) => console.log(value);
let stree = new SearchTree();

stree.insert(12);
stree.insert(9);
stree.insert(13);
stree.insert(8);
stree.insert(6);
stree.insert(3);
stree.insert(24);
stree.insert(16);

// stree.inOrderTraverse(printNode); // 从小到大排列
// console.log("==========");
// stree.preOrderTraverse(printNode); //
// console.log("==========");
// stree.postOrderTraverse(printNode);
// console.log("==========");
// console.log(stree.min());
// console.log(stree.max());
// console.log("==========");
// console.log(stree.search(24));

// console.log(stree)

module.exports = {
  SearchTree,
};
