import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

const TaskForm = ({ addData, isKeySearch }) => {
  // To handle input title
  const [title, setTitle] = useState('')
  // To handle input description
  const [description, setDescription] = useState('')
  // To handle errors
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (title.length === 0) {
      return setError('Title is required')
    }

    addData(title, description)
    setTitle('')
    setDescription('')
    setError('')
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

      <Button
        className='mb-3 rounded'
        type='submit'
        variant='primary'
        disabled={isKeySearch}
      >
        Add
      </Button>
      {error && <Alert variant='danger'>{error}</Alert>}
    </Form>
  )
}

export default TaskForm
