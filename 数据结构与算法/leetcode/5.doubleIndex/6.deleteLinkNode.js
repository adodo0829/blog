// 删除链表的倒数第N个节点
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 双指针
// 移除节点可以用 虚拟头节点, 这样减少删除项是否是头节点的情况

// 解析: 删掉倒数第n个,  正方向就是 length - n;  但是链表没有 length属性
// 遍历一次, 等 i 移动到n, 再定义一个指针, 移动j和i,  i到length, j的位置就是 length - n
// 数学运算中的 n = len - x

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function (head, n) {
  let fakeHead = new ListNode(0); // 虚拟节点
  fakeHead.next = head;
  let slow = fakeHead; // 都从虚拟节点开始
  let fast = fakeHead;

  // 先找到n的位置
  while (n > 0 && fast) {
    fast = fast.next;
    n--
  }

  // 再找 len - n, 同时移动slow和fast, 直到fast到null
  // 终点是fast.next === null, 后面没节点了
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return fakeHead.next;
};