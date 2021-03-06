import Node from './NodeConstructor'
import { randomBytes } from 'crypto'
import {
  STATUS_INPROGRESS,
  STATUS_BLOCKED,
  STATUS_DONE
} from '../constants/status'

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
      current = this.head

      while (current.next) {
        current = current.next
      }

      // To check whether the last task has already completed or not.
      if (current.data.status === STATUS_DONE) {
        data.status = STATUS_INPROGRESS
      } else {
        data.status = STATUS_BLOCKED
      }

      // Build a new node and assign it to the last position
      node = new Node(data)
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

  // Removing the task (node) by the passed Id
  removeData(id) {
    let current = this.head
    let previous = null

    // If the task to be removed is head, then remove it directly
    // else, iterate through the list and find the particular task to be removed.
    if (current.data.id === id) {
      // Update subsequent task to 'in_progress' if the current task to be removed is also 'in_progress'
      if (current.next && current.data.status === STATUS_INPROGRESS) {
        current.next.data.status = STATUS_INPROGRESS
      }
      this.head = current.next
    } else {
      while (current && previous === null) {
        if (current.next.data.id === id) {
          previous = current
        }
        current = current.next
      }
      if (current.next && current.data.status === STATUS_INPROGRESS) {
        current.next.data.status = STATUS_INPROGRESS
      }
      previous.next = current.next
    }

    this.size--
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

  // Return first task from the list
  showFirstData() {
    let result = []
    if (!this.head) {
      return result
    }
    result.push(this.head.data)
    return result
  }

  // Return last task from the list
  showLastData() {
    let result = []
    if (!this.head) {
      return result
    }
    let current = this.head
    while (current.next) {
      current = current.next
    }

    result.push(current.data)

    return result
  }

  // Reverse the list order. This will not alter the original linkedlist
  // And return a new linked list instead
  reverseOrder() {
    let result = []

    if (!this.head) {
      return result
    }

    let current = this.head
    let previous = null
    let temp = null

    while (current) {
      let newNode = new Node(current.data)
      temp = newNode.next
      newNode.next = previous
      previous = newNode
      newNode = temp
      current = current.next
    }

    // return the result back to display
    current = previous

    while (current) {
      result.push(current.data)
      current = current.next
    }

    return result
  }

  // Search by given ID as a parameter
  searchById(inputId) {
    let current = this.head
    let result = []

    while (current && result.length === 0) {
      if (current.data.id === inputId) {
        result.push(current.data)
      } else {
        current = current.next
      }
    }

    return result
  }

  // Search by given keyword as a parameter & performed in lowercase.
  searchByKeyword(keyword) {
    let current = this.head
    let result = []
    let stepCounter = 0

    while (current) {
      if (
        current.data.title.toLowerCase().includes(keyword.toLowerCase()) ||
        current.data.description.toLowerCase().includes(keyword.toLowerCase())
      ) {
        result.push({
          id: randomBytes(5).toString('hex'),
          stepCounter
        })
        stepCounter = 0
        result.push(current.data)
      } else {
        stepCounter++

        // check for last tasks, if not found under selection
        if (!current.next) {
          result.push({
            id: randomBytes(5).toString('hex'),
            stepCounter
          })
        }
      }

      current = current.next
    }

    return result
  }
}
