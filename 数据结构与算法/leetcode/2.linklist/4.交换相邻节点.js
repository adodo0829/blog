/**
 * 交换相邻节点
 * 1-2-3-4 ==》 2-1-4-3
 *
 */

// 思路:
// 使用虚拟头节点
// 并不是简单的成对交换, 而且引用指向变化

// virtual -> 1(head) -> 2 -> 3 -> 4 -> null ==》curr-2-1-3-4-null
// 头节点就是1

const swapPairs = function (head) {
  let fakeHead = new ListNode(0) // 虚拟头节点, 保存对节点的引用
  fakeHead.next = head

  let temp = fakeHead // 临时节点, 开始指向同一个对象

  // 只有当temp指向的节点后面存在2个节点时 才会发生交换
  while (temp.next && temp.next.next) {
    let node1 = temp.next      // 相邻节点1
    let node2 = node1.next     // 相邻节点2
    let subHead = node2.next   

    // 开始交换
    node2.next = node1
    node1.next = subHead
    // head此时指向node2, 第一次赋值其实就是fakeHead.next
    temp.next = node2 // 等价于fakeHead.next = node2
    // temp指向变量node1指向的节点, 开始下一组交换
    temp = node1
  }

  return fakeHead.next;
};
