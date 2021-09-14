import LinkedList from '../NodeOperator'
import {
  STATUS_BLOCKED,
  STATUS_DONE,
  STATUS_INPROGRESS
} from '../../constants/status'
import { userOne, userTwo, userThree } from './fixtures/userData'

let dataList

beforeEach(() => {
  dataList = new LinkedList()
})

it('adds the first new task to the head', () => {
  dataList.addData(userOne)

  expect(dataList.size).toEqual(1)
  expect(dataList.head.data.id).toEqual(userOne.id)
  expect(dataList.head.data.title).toEqual(userOne.title)
  expect(dataList.head.data.description).toEqual(userOne.description)
  expect(dataList.head.data.status).toEqual(STATUS_INPROGRESS)
})

it('adds subsequent task to the next property', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)

  const current = dataList.head.next

  expect(dataList.size).toEqual(2)
  expect(dataList.head.data.status).toEqual(STATUS_INPROGRESS)
  expect(current.data.id).toEqual(userTwo.id)
  expect(current.data.title).toEqual(userTwo.title)
  expect(current.data.description).toEqual(userTwo.description)
  expect(current.data.status).toEqual(STATUS_BLOCKED)
})

it('updates task status to completed & unlocks next task', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // updates the first task
  dataList.updateData({
    status: STATUS_DONE
  })

  const current = dataList.head.next
  const subsequent = dataList.head.next.next

  expect(dataList.size).toEqual(3)
  expect(dataList.head.data.status).toEqual(STATUS_DONE)
  expect(current.data.id).toEqual(userTwo.id)
  expect(current.data.status).toEqual(STATUS_INPROGRESS)
  expect(subsequent.data.id).toEqual(userThree.id)
  expect(subsequent.data.status).toEqual(STATUS_BLOCKED)
})

it('removes task by id', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // removes the second task
  dataList.removeData(userTwo.id)

  const current = dataList.head.next
  const subsequent = dataList.head.next.next

  // second task gets deleted. So third task takes place of second. Third task must not exist thereafter.
  expect(dataList.size).toEqual(2)
  expect(dataList.head.data.id).toEqual(userOne.id)
  expect(current.data.id).toEqual(userThree.id)
  expect(subsequent).toBeNull()
})

it('gets ordered task list in an array', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)

  // orders task
  const value = dataList.getOrderedList()

  // second task gets deleted. So third task takes place of second. Third task must not exist thereafter.
  expect(dataList.size).toEqual(2)
  expect(value).toHaveLength(2)
  expect(value[0].id).toEqual(userOne.id)
  expect(value[1].id).toEqual(userTwo.id)
})

it('gets only first task from the list', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // gets only first task
  const value = dataList.showFirstData()

  // second task gets deleted. So third task takes place of second. Third task must not exist thereafter.
  expect(dataList.size).toEqual(3)
  expect(value).toHaveLength(1)
  expect(value[0].id).toEqual(userOne.id)
  expect(value[1]).not.toBeDefined()
})

it('gets only last task from the list', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // gets only last task
  const value = dataList.showLastData()

  // second task gets deleted. So third task takes place of second. Third task must not exist thereafter.
  expect(dataList.size).toEqual(3)
  expect(value).toHaveLength(1)
  expect(value[0].id).toEqual(userThree.id)
  expect(value[1]).not.toBeDefined()
})

it('reverses the tasks order', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // reverses Order
  const value = dataList.reverseOrder()

  // second task gets deleted. So third task takes place of second. Third task must not exist thereafter.
  expect(dataList.size).toEqual(3)
  expect(value).toHaveLength(3)
  expect(value[0].id).toEqual(userThree.id)
  expect(value[1].id).toEqual(userTwo.id)
  expect(value[2].id).toEqual(userOne.id)
})

it('searches the task by ID', () => {
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // search by Id
  const value = dataList.searchById(userThree.id)

  expect(dataList.size).toEqual(3)
  expect(value).toHaveLength(1)
  expect(value[0].id).toEqual(userThree.id)
  expect(value[1]).not.toBeDefined()
})

it('searches the task by Keyword', () => {
  const keyword = 'testing'
  dataList.addData(userOne)
  dataList.addData(userTwo)
  dataList.addData(userThree)

  // search by Id
  const value = dataList.searchByKeyword(keyword)

  expect(dataList.size).toEqual(3)
  expect(value).toHaveLength(3)
  expect(value[0].stepCounter).toEqual(0)
  expect(value[1].id).toEqual(userOne.id)
  expect(value[2].stepCounter).toEqual(2)
})
