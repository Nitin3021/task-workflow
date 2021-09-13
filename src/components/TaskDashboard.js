import React, { useState } from 'react'
import { randomBytes } from 'crypto'
import LinkedList from '../utils/NodeOperator'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { Container } from 'react-bootstrap'
import { STATUS_DONE } from '../constants/status'
import TaskFilter from './TaskFilter'
import { SELECT_FIRST_TASK, SELECT_REVERSE_TASK } from '../constants/selectOption'

const dataList = new LinkedList()

const TaskDashboard = () => {
  // To store state of data
  const [data, setData] = useState([])

  const addData = (title, description) => {
    dataList.addData({
      id: randomBytes(5).toString('hex'),
      title,
      description
    })
    setData(dataList.getOrderedList())
  }

  const updateStatus = () => {
    dataList.updateData({
      status: STATUS_DONE
    })

    setData(dataList.getOrderedList())
  }

  const removeItem = (id) => {
    dataList.removeData(id)

    setData(dataList.getOrderedList())
  }

  const sortByOption = (sortBy) => {
    if (sortBy === SELECT_FIRST_TASK) {
      setData(dataList.showFirstData())
    } else if (sortBy === SELECT_REVERSE_TASK) {
      setData(dataList.reverseOrder())
    }
  }

  return (
    <Container>
      <TaskForm addData={addData} />
      <TaskFilter sortByOption={sortByOption} />
      <TaskList
        data={data}
        updateStatus={updateStatus}
        removeItem={removeItem}
      />
    </Container>
  )
}

export default TaskDashboard
