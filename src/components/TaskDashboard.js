import React, { useState } from 'react'
import { randomBytes } from 'crypto'
import LinkedList from '../utils/NodeOperator'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { Container } from 'react-bootstrap'
import { STATUS_DONE } from '../constants/status'
import TaskFilter from './TaskFilter'
import {
  SELECT_DEFAULT_VIEW,
  SELECT_FIRST_TASK,
  SELECT_LAST_TASK,
  SELECT_REVERSE_TASK
} from '../constants/selectOption'

const dataList = new LinkedList()

const TaskDashboard = () => {
  // To store state of data
  const [data, setData] = useState([])
  const [currentSort, setCurrentSort] = useState(SELECT_DEFAULT_VIEW)

  // Add the given task in the list
  const addData = (title, description) => {
    dataList.addData({
      id: randomBytes(5).toString('hex'),
      title,
      description
    })

    sortByOption(currentSort)
  }

  // Update the task as per the parameters passed
  const updateStatus = () => {
    dataList.updateData({
      status: STATUS_DONE
    })

    sortByOption(currentSort)
  }

  // Remove task by id
  const removeItem = (id) => {
    dataList.removeData(id)

    sortByOption(currentSort)
  }

  // Sort as per selected parameter
  const sortByOption = (sortBy) => {
    setCurrentSort(sortBy)
    if (sortBy === SELECT_FIRST_TASK) {
      setData(dataList.showFirstData())
    } else if (sortBy === SELECT_LAST_TASK) {
      setData(dataList.showLastData())
    } else if (sortBy === SELECT_REVERSE_TASK) {
      setData(dataList.reverseOrder())
    } else {
      setData(dataList.getOrderedList())
    }
  }

  // Search the list by ID
  // If no result -> display list as it is
  const onSearchById = (id, selectOption) => {
    const searchResult = dataList.searchById(id)

    if (searchResult.length > 0) {
      setData(searchResult)
    } else {
      sortByOption(currentSort)
    }
  }

  // Search the list by keyword
  // If no result -> list will be empty
  const onSearchByKeyword = (keyword, selectOption) => {
    const searchResult = dataList.searchByKeyword(keyword)

    if (keyword.length === 0) {
      sortByOption(currentSort)
    } else {
      setData(searchResult)
    }
  }

  return (
    <Container>
      <TaskForm addData={addData} />
      <TaskFilter
        sortByOption={sortByOption}
        onSearchById={onSearchById}
        onSearchByKeyword={onSearchByKeyword}
      />
      <TaskList
        data={data}
        updateStatus={updateStatus}
        removeItem={removeItem}
      />
    </Container>
  )
}

export default TaskDashboard
