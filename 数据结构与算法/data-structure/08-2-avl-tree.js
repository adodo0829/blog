/**
 * avl tree: Adelson-Velskii-Landi 树
 * 自平衡树。添加或移除节点时，AVL树会尝试保持自平衡。任意一个节点（不论深度）的左子树和右子树高度最多相差 1
 */

const { SearchTree } = require("./08-1-binary-search-tree");
const { defaultCompare, TreeNode, Compare } = require("./utils");
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};

class AvlTree extends SearchTree {
  constructor(conpareFn = defaultCompare) {
    super(conpareFn);
    this.compareFn = this.compareFn;
    this.root = null;
  }

  insert(key) {
    super.insert(key);
  }

  // 节点的高度 = 节点到其任意子节点的边的最大值
  getNodeHeight(node) {
    if (node == null) return -1;
    let leftHeight = this.getNodeHeight(node.left);
    let rightHeight = this.getNodeHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // 平衡因子 = 每个节点计算右子树高度（hr）与 左子树高度（hl）之间的差值,
  // leftHeight - rightHeight
  // 为 0、1 或-1
  getBalanceFactor(node) {
    const heightDiff =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDiff) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  /**
   * 平衡操作——AVL 旋转
   * 左-左（LL）：向右的单旋转, 左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的
   * 右-右（RR）：向左的单旋转,
   * 左-右（LR）：向右的双旋转（先 LL 旋转，再 RR 旋转）
   * 左-左（RL）：向右的单旋转
   */

  // Left left case: 左节点左深, 往右边旋转
  /**
   *       50                       30
   *      /  \                     /  \
   *     30   70                  10   50
   *    /  \       =(LL)=>       /    /  \
   *   10  40                   5    40  70
   *  /
   * 5
   */
  rotationLL(node) {
    // 进行节点转移
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }
  // Right right case: 右节点右深, 往左边旋转
  /**
   *       50                       70
   *      /  \                     /  \
   *     30   70                  50   80
   *         /  \     =(RR)=>    /  \    \
   *       60    80             30   60   90
   *              \
   *               90
   */
  rotaionRR(node) {
    const temp = node.right;
    node.right = temp.left
    temp.left = node
    return temp
  }
  // Left right case: 左节点右边深, rotate left then right
  rotaionLR(node) {
    node.left = this.rotationRR(node)
    return this.rotationLL(node)
  }
  // right Left case: 右节点左边深, rotate right then left
  rotaionRL(node) {
    node.left = this.rotationRR(node)
    return this.rotationLL(node)
  }

  insert(key) {
    this.insertNode(this.root, key)
  }

  insertNode(node, key) {
    if (node == null) {
      return new TreeNode(key)
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key)
    } else {
      // 相同的key
      return node
    }

    // 将树进行平衡操作
    const balance = this.getBalanceFactor(node)
    if (balance === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        // 左节点左侧深
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    }

    if (balance === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        // you节点you侧深
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }

    return node
  }
}

const alvTree = new AvlTree();
console.log(alvTree.getNodeHeight(alvTree.root));
