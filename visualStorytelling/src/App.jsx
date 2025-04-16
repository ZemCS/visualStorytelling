import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VisualStorytelling from './visualStorytelling'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <VisualStorytelling />
      </div>
    </>
  )
}

export default App
