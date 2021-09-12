import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const TaskForm = ({ addData }) => {
  // To handle input title
  const [title, setTitle] = useState('')
  // To handle input description
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    addData(title, description)
  }

  return (
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
  )
}

export default TaskForm
