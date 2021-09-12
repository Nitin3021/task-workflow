import React, { useState } from 'react'
import { randomBytes } from 'crypto'
import LinkedList from '../utils/NodeOperator'
import { Button, Container, Form } from 'react-bootstrap'

const dataList = new LinkedList()

const TaskForm = () => {
  // To handle input title
  const [title, setTitle] = useState('')
  // To handle input description
  const [description, setDescription] = useState('')
  // To store state of data
  const [data, setData] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()
    dataList.addData({
      id: randomBytes(5).toString('hex'),
      title,
      description
    })

    setTitle('')
    setDescription('')
    setData(dataList.getOrderedList())
  }

  console.log(data)
  return (
    <Container>
      <Form className='mt-3' onSubmit={onSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            placeholder='Enter Title'
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            value={description}
            placeholder='Enter Description'
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add
        </Button>
      </Form>

      {data.map((item) => (
        <p key={item.id}>
          {item.title} - {item.description}
        </p>
      ))}
    </Container>
  )
}

export default TaskForm
