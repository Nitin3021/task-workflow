import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
  STATUS_BLOCKED,
  STATUS_DONE,
  STATUS_INPROGRESS
} from '../constants/status'

const TaskList = ({ data, updateStatus, removeItem }) => {
  return (
    <div>
      {data.length > 0 &&
        data.map((item) =>
          item.stepCounter >= 0 ? (
            item.stepCounter !== 0 && (
              <Card className='mb-3 rounded' key={item.id}>
                <Card.Title className='stepCounter'>{`<----- ${item.stepCounter} Step(s) Hidden ----->`}</Card.Title>
              </Card>
            )
          ) : (
            <Card className='mb-3 rounded' key={item.id}>
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

                {item.status === STATUS_DONE ? (
                  <i className='float-right rounded ml-3 fa fa-check fa-5x'></i>
                ) : null}

                {item.status === STATUS_BLOCKED ? (
                  <i className='float-right rounded ml-3 fa fa-lock fa-5x'></i>
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
          )
        )}
    </div>
  )
}

export default TaskList
