import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route
        path='/'
        element={<Navigate to='/login'/>}
        />

        <Route
        path='/login'
        element={<Login/>}
        />

        <Route
        path='/register'
        element={<Register/>}
        />




      </Routes>
      
    </div>
  )
}

export default App
