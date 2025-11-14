import React from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'


function Register() {
    return (
        <div className="container">
            <h4 className="page-header">register here</h4>

            <div className="register-container">
                <div className='mb-3'>
                    <label htmlFor=''>First Name</label>
                    <input
                        /*onChange={(e) => setFirstName(e.target.value)} */
                        type='text'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Last Name</label>
                    <input
                        /*onChange={(e) => setFirstName(e.target.value)} */
                        type='text'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Email</label>
                    <input
                        /*onChange={(e) => setFirstName(e.target.value)} */
                        type='email'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Phone Number</label>
                    <input
                        /*onChange={(e) => setFirstName(e.target.value)} */
                        type='tel'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Password</label>
                    <input
                        /*onChange={(e) => setFirstName(e.target.value)} */
                        type='password'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Confirm Password</label>
                    <input
                        /*onChange={(e) => setFirstName(e.target.value)} */
                        type='password'
                        className='form-control'
                    />
                </div>



                <div>
                    Already have an account? {/*<Link to='/'>Login here</Link>*/}
                </div>

                <div className='mb-3 d-grid gap-2 col-6 mx-auto'>
                    <button
                        //onClick={onRegister}
                        className='btn btn-primary'
                    >
                        Register
                    </button>
                </div>










            </div>




        </div>
    )
}

export default Register