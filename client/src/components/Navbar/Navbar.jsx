import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../pages/providers/AuthProvider'

function Navbar() {

const navigate = useNavigate()

const { setUser } = useAuth()


    const onLogout = () => {
    // remove all the cached items
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')

    // set the user to null
    setUser(null)

    // redirect to Login page
    navigate('/login')
  }
  return (
     <nav
      className='navbar navbar-expand-lg'
      data-bs-theme='dark'
      style={{ backgroundColor: '#1565C0' }}
    >
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/home/properties'
        >
          MyClimaxReviewer
        </Link>

        <div
          className='collapse navbar-collapse'
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/properties'
              >
                Reviewed Movies
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/change-password'
              >
                Change Password
              </Link>
            </li>

            <li className='nav-item'>
              <button
                onClick={onLogout}
                className='nav-link'
                aria-current='page'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar