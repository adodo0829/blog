/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let curr = head;
  let prev = null;

  while (curr) {
    let temp = curr.next;
    // 当前节点 指向prev
    curr.next = prev;
    // prev 后移, 指向curr
    prev = curr;
    // curr 后移, 指向 temp
    curr = temp;
  }

  return prev
};
