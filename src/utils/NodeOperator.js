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

  // Update node with passed updates
  // Since the task is implicitly marked as Done and InProgress,
  // therefore, not using Task ID as a parameter to check as it is
  // always going to be a sequential update
  updateData(updates) {
    let current = this.head
    console.log('what')

    while (current) {
      if (current.data.status === STATUS_INPROGRESS) {
        current.data.status = updates.status
        if (current.next) {
          current = current.next
          current.data.status = STATUS_INPROGRESS
        }
        return
      }
      current = current.next
    }
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
