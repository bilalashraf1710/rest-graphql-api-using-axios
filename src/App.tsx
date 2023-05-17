import './App.css'
import Home from './pages/home'

if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  require('./mocks/setupServer')
}

function App() {
  return (
    <div className='App'>
      <Home />
    </div>
  )
}
export default App
