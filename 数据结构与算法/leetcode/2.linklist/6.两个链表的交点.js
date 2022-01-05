/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
const getLinkListLength = (head) => {
  let count = 0;
  let curr = head;
  // 判断curr和curr.next是否存在是一致的
  while (curr) {
    count++;
    curr = curr.next;
  }
  return count;
};
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  // 两个链表一长一短, 如有相同节点, 此节点后面都一样
  // 遍历两条链表, 逐一比较节点引用地址, 如何定义起点?
  // 如有相同节点, 此节点之后长度也是一样, 所以我们可以把遍历的起始点设为 短链表的开始值
  // 长链表遍历的长度需要和短的保持一致, 所以要先移动到和短链表剩余长度一致
  let currA = headA;
  let currB = headB;
  let lenA = getLinkListLength(headA);
  let lenB = getLinkListLength(headB);

  // 找出谁是较长的链表, 我们设A是长的
  if (lenA < lenB) {
    // 如果实际的A是短的, 需要交互值
    [lenA, lenB] = [lenB, lenA];
    [currA, currB] = [currB, currA];
  }

  let gap = lenA - lenB;
  // 找到长链表的起点
  while (gap--) {
    currA = currA.next;
  }

  // 遍历, 比较引用, 如果存在, 则返回节点应用currA
  while (currA && currA !== currB) {
    currA = currA.next;
    currB = currB.next;
  }

  return currA;
};
