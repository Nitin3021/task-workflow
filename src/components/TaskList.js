import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { STATUS_INPROGRESS } from '../constants/status'

const TaskList = ({ data, updateStatus }) => {
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
                  className='float-right rounded'
                  type='button'
                  onClick={updateStatus}
                >
                  Done
                </Button>
              ) : null}
            </Card.Body>
          </Card>
        ))}
    </div>
  )
}

export default TaskList
