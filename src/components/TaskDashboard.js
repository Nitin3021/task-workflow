import React, { useState } from 'react'
import { randomBytes } from 'crypto'
import LinkedList from '../utils/NodeOperator'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { Container } from 'react-bootstrap'

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

  return (
    <Container>
      <TaskForm addData={addData} />
      <TaskList data={data} />
    </Container>
  )
}

export default TaskDashboard
