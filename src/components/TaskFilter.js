import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import {
  SELECT_DEFAULT_VIEW,
  SELECT_FIRST_TASK,
  SELECT_LAST_TASK,
  SELECT_REVERSE_TASK
} from '../constants/selectOption'

const TaskFilter = ({ sortByOption, onSearchById, onSearchByKeyword }) => {
  const [selectOption, setSelectOption] = useState(SELECT_DEFAULT_VIEW)
  const [searchId, setSearchId] = useState('')
  const [searchByKeyword, setSearchByKeyword] = useState('')

  const onOptionChange = (e) => {
    setSelectOption(e.target.value)

    sortByOption(e.target.value)
  }

  const onSearchIdChange = (e) => {
    setSearchId(e.target.value)

    onSearchById(e.target.value, selectOption)
  }

  const onSearchKeywordChange = (e) => {
    setSearchByKeyword(e.target.value)

    onSearchByKeyword(e.target.value)
  }

  return (
    <Row>
      <Col md={4}>
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
      </Col>

      <Col md={4}>
        <Form.Group controlId='title'>
          <Form.Control
            type='text'
            placeholder='Search by Task Id'
            value={searchId}
            onChange={onSearchIdChange}
          ></Form.Control>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId='title'>
          <Form.Control
            type='text'
            placeholder='Search by Keyword'
            value={searchByKeyword}
            onChange={onSearchKeywordChange}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
  )
}

export default TaskFilter
