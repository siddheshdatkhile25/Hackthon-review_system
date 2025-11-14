import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
      <Register/>
    </>
  )
}

export default App
