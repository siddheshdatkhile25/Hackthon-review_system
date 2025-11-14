import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthProvider from './pages/providers/AuthProvider'
import Home from './pages/Home/Home'
import ChangePassword from './pages/Home/ChangePassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/login' />}
          />

          <Route
            path='/login'
            element={<Login />}
          />

          <Route
            path='/register'
            element={<Register />}
          />

          <Route
            path='/home'
            element={<Home/>}
          >
            <Route path='change-password' element={<ChangePassword />} />
          </Route>



        </Routes>
      </AuthProvider>


    <ToastContainer />

    </div>
  )
}

export default App
