// 环形链表入口

var detectCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    // 如果链表有环, 从起始节点到入口 = 快慢指针节点相遇点到入口
    if (fast === slow) {
      let temp = head

      while (temp !== slow) {
        temp = temp.next
        slow = slow.next
      }

      return slow
    }
  }

  return null;
};
