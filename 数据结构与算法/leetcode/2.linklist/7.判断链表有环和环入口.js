/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
  // 先判断有环无环
  // 再计算入环节点
  // 有环的特点：链表尾节点指向前面的节点，遍历链表的时候能一直找到下一个节点
  // 如果设置一个快指针（一次位移两步）， 一个慢指针， 都往前位移， 必然会在环内相交
  let fast = head // 2步
  let slow = head // 1步
  while(fast && fast.next) {
      // 判断存在环
      slow = slow.next
      fast = fast.next.next
      if (slow === fast) {
          // 有环，找入口节点， 条件是走过的节点数，
          // fast指针走过的节点数 = slow指针走过的节点数 * 2
          // 假设head =》 入口为x， 入口 =》 相遇点到为y，相遇点 =》 入口为z
          // (x + y) * 2 = x + y + n (y + z) 推导出 x = z
          let L1 = head
          let L2 = fast
          while(L1 !== L2) {
              L1 = L1.next
              L2 = L2.next
          }
          return L1
      }
  }
  return null
};