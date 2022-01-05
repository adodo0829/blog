/**
 * 获取链表长度, 然后是len - n位置的节点
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const getListLength = (head) => {
    let i = 0;
    while (head.next) {
      head = head.next;
      i++;
    }
    return i;
  };
  const len = getListLength(head);

  const fakeHead = new ListNode(0, head);
  const deleteIndex = len + 1 - n;
  let temp = fakeHead;

  for (let i = 0; i < deleteIndex; i++) {
    temp = temp.next;
  }
  temp.next = temp.next.next;

  return fakeHead.next;
};
