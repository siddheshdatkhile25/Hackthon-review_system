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
import DisplayMovies from './pages/displayMovies/DisplayMovies'
import AddReview from './pages/AddReview/AddReview'
import DisplayAllReviews from './pages/DisplayAllReviews/DisplayAllReviews'

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
            <Route
            path='/home'
            element={<DisplayMovies/>}
            />
            <Route
            path='change-password'
            element={<ChangePassword />} />
            <Route
            path='add-review/:id'
            element={<AddReview />} />

            <Route
            path='display-review'
            element={<DisplayAllReviews/>}
            />
          </Route>





        </Routes>
      </AuthProvider>


    <ToastContainer />

    </div>
  )
}

export default App
