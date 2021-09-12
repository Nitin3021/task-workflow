import Node from './NodeConstructor'
import { STATUS_INPROGRESS, STATUS_BLOCKED } from '../constants/status'

export default class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  // Add new node
  addData(data) {
    let node, current

    // If empty, make head (first node)
    // else, make subsequent node.
    if (!this.head) {
      data.status = STATUS_INPROGRESS
      node = new Node(data)
      this.head = node
    } else {
      data.status = STATUS_BLOCKED
      node = new Node(data)
      current = this.head

      while (current.next) {
        current = current.next
      }
      current.next = node
    }

    this.size++
  }

  // get list of data to be displayed in default order
  getOrderedList() {
    let result = []
    let current = this.head

    while (current) {
      result.push(current.data)
      current = current.next
    }

    return result
  }
}
