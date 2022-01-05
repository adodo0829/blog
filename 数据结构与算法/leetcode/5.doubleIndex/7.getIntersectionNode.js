// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

// 链表想叫意味着啥?
// 从节点n开始, 后面的节点指向都相同
// 给定的链表假设一长一短, 从短表出发开始遍历
// 所以我们先实现末尾对其, 短从头开始, 长从lenthA - lengthB开始

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  const getLenLinkList = (head) => {
    let len = 0;
    let curr = head;
    while (curr) {
      curr = curr.next;
      len++;
    }
    return len;
  };

  const lenA = getLenLinkList(headA);
  const lenB = getLenLinkList(headB);

  //假设A是长的
  let currA = headA;
  let currB = headB;

  if (lenA < lenB) {
    // 交换
    [lenA, lenB] = [lenB, lenA];
    [currA, currB] = [currB, currA];
  }

  // 移动长链表到 lenA - lenB
  let i = lenA - lenB;
  while (i--) {
    currA = currA.next;
  }

  while (currA && currA !== currB) {
    currA = currA.next;
    currB = currB.next;
  }

  return currA;
};
