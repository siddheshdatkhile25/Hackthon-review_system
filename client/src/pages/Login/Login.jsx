import React, { useState } from 'react'
import './Login.css'

import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'


function Login() {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async()=>{
        if(email.length == 0){
            toast.warning('please enter email');
        }else if(password.length == 0){
            toast.warning('please enter Password');
        }
        else{
            const response = await login(email,password);
        }
    }


    return (
        <div className="container">
            <h2 className="page-header">Welcome to movie review-system</h2>

            <h4 className="page-header">Login here</h4>

            <div className="login-container">
                <div className='mb-3'>
                    <label htmlFor=''>Email</label>
                    <input
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                        type='email'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Password</label>
                    <input
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
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
                    Don't have an account yet? <Link to='/register'>Register here</Link>
                </div>

                <div className='mb-3 d-grid gap-2 col-6 mx-auto'>
                    <button
                        onClick={onLogin}
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