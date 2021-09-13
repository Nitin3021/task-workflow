import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import {
  SELECT_DEFAULT_VIEW,
  SELECT_FIRST_TASK,
  SELECT_LAST_TASK,
  SELECT_REVERSE_TASK
} from '../constants/selectOption'

const TaskFilter = ({ sortByOption }) => {
  const [selectOption, setSelectOption] = useState(SELECT_DEFAULT_VIEW)

  const onOptionChange = (e) => {
    setSelectOption(e.target.value)

    sortByOption(e.target.value)
  }

  return (
    <div>
      <Form.Control
        as='select'
        className='selectForm mb-3'
        value={selectOption}
        onChange={onOptionChange}
      >
        <option value={SELECT_DEFAULT_VIEW}>Default view</option>
        <option value={SELECT_FIRST_TASK}>Show Only first task</option>
        <option value={SELECT_LAST_TASK}>Show only last task</option>
        <option value={SELECT_REVERSE_TASK}>Reverse tasks order</option>
      </Form.Control>
    </div>
  )
}

export default TaskFilter
