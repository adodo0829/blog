/**
 * 删除链表中等于给定值 val 的所有节点
 *
 * 移除头结点和移除其他节点的操作是不一样的，因为链表的其他节点都是通过前一个节点来移除当前节点，而头结点没有前一个节点。
 * 所以头结点如何移除呢，其实只要将头结点向后移动一位就可以
 *
 * 可以设置一个虚拟头结点，这样原链表的所有节点就都可以按照统一的方式进行移除了。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  // 删除的节点为头节点
  while (head != null && head.val === val) {
    head = head.next;
  }
  // 删除的节点不为头节点
  let curr = head;
  while (curr != null && curr.next != null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
};
