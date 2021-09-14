import { randomBytes } from 'crypto'

export const userOne = {
  id: randomBytes(5).toString('hex'),
  title: 'Test case #1',
  description: 'Lets do testing!'
}

export const userTwo = {
  id: randomBytes(5).toString('hex'),
  title: 'Test case #2',
  description: 'InProgress!'
}

export const userThree = {
  id: randomBytes(5).toString('hex'),
  title: 'Test case #3',
  description: 'Work in Progress'
}