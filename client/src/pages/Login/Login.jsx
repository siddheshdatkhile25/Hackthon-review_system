import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className="container">
            <h2 className="page-header">Welcome to movie review-system</h2>

            <h4 className="page-header">Login here</h4>

            <div className="login-container">
                <div className='mb-3'>
                    <label htmlFor=''>Email</label>
                    <input

                        type='email'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Password</label>
                    <input
                        type='password'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type='checkbox'
                        className='me-2'
                    />
                    <label htmlFor=''>Remember me</label>
                </div>
                <div className='mb-3'>
                    {/* <button className='btn btn-link'>Forgot password?</button> */}
                    Don't have an account yet? {/*<Link to=''>Register here</Link>*/}
                </div>

                <div className='mb-3 d-grid gap-2 col-6 mx-auto'>
                    <button
                        // onClick={onLogin}
                        className='btn btn-primary w-10'
                    >
                        Login
                    </button>
                </div>






            </div>


        </div>

    )
}

export default Login