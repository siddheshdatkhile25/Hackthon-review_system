import React from 'react'

function Login() {
    return (
        <div className="container">
            <h2 className="page-header">Welocme to movie review-system</h2>

            <h3 className="login-tag">Login here</h3>

            <div className="login-container">
                <div className='mb-3'>
                    <label htmlFor=''>Email</label>
                    <input

                        type='email'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Email</label>
                    <input
                        type='email'
                        className='form-control'
                    />
                </div>
            </div>


        </div>

    )
}

export default Login