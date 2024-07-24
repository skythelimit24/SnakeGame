import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SnakeUi from './Components/SnakeUi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<SnakeUi/>
    </>
  )
}

export default App
