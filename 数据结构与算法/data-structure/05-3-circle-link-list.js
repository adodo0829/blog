/**
 * 循环链表
 * 特点
 * 循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是引用undefined，而是指向第一个元素（head）
 * 双向循环链表有指向 head 元素的 tail.next 和指向 tail 元素的 head.prev
 */

const { Node, defaultEquals } = require("./utils");
const { LinkList } = require("./05-1-link-list");

class CircleLinkList extends LinkList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  push(ele) {
    const node = new Node(ele);
    let curr;
    if (this.head == null) {
      this.head = node;
    } else {
      curr = this.getEleAt(this.size() - 1);
      curr.next = node;
    }
    // 尾节点的next指向head
    node.next = this.head;
    this.len++;
  }

  insertAt(ele, index) {
    if (index >= 0 && index <= this.len) {
      const node = new Node(ele);
      let curr = this.head;

      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = this.head;
          curr = this.getEleAt(this.size());
          this.head = node;
          curr.next = this.head;
        }
      } else {
        const prevNode = this.getElementAt(index - 1);
        node.next = prevNode.next;
        prevNode.next = node;
      }
      this.len++;
      return true;
    }

    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.len) {
      let currNode = this.head; // 返回出去
      // 删头节点
      if (index === 0) {
        if (this.len === 1) {
          this.head = null;
        } else {
          currNode = this.getEleAt(this.len - 1);
          const removeNode = this.head;
          this.head = this.head.next;
          curr.next = this.head;
          currNode = removeNode;
        }
      } else {
        const prevNode = this.getEleAt(index - 1);
        curr = prevNode.next;
        prevNode.next = curr.next;
      }

      this.len--;
      return currNode.element;
    }
    return null;
  }
}

let cl = new CircleLinkList();

cl.push("aaa");
cl.push("bbb");
cl.push("ccc");
