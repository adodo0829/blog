/**
 * 翻转链表
 * 一个cur指针，指向头结点，再定义一个pre指针，初始化为null;
 * 先要把 cur->next 节点用tmp指针保存一下,
 * 接下来要改变 cur->next 的指向了，将cur->next 指向pre ，此时已经反转了第一个节点了
 * 继续移动cur 和 pre
 * cur 指针已经指向了null，循环结束，链表也反转完毕了。 此时我们return pre指针
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 双指针
  let curr = head;
  let prev = null; // 新的头节点
  let nextNode = null; // 保存下一个节点

  while (curr) {
    nextNode = curr.next; // 
    curr.next = prev; // 翻转, 指向前一个节点
    prev = curr; // 重新连接
    curr = nextNode;
  }

  return prev;
};
