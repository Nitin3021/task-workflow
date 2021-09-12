import React from 'react'
import { Card } from 'react-bootstrap'

const TaskList = ({ data }) => {
  console.log(data)
  return (
    <div>
      {data.length > 0 &&
        data.map((item) => (
          <Card key={item.id}>
            {item.id} -- {item.title}-{item.description}
          </Card>
        ))}
    </div>
  )
}

export default TaskList
