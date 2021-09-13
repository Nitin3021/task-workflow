import { Container } from 'react-bootstrap'
import Header from './components/Header'
import TaskDashboard from './components/TaskDashboard'

function App() {
  return (
    <>
      <Header />
      <Container>
        <TaskDashboard />
      </Container>
    </>
  )
}

export default App
