import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { STATUS_INPROGRESS } from '../constants/status'

const TaskList = ({ data, updateStatus, removeItem }) => {
  return (
    <div>
      {data.length > 0 &&
        data.map((item) => (
          <Card className='mb-3' key={item.id}>
            <Card.Header>Task Id: {item.id}</Card.Header>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              {item.status === STATUS_INPROGRESS ? (
                <Button
                  className='float-right rounded ml-3'
                  type='button'
                  variant='success'
                  onClick={updateStatus}
                >
                  Done
                </Button>
              ) : null}
              <Button
                className='float-right rounded'
                type='button'
                variant='danger'
                onClick={() => removeItem(item.id)}
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  )
}

export default TaskList
