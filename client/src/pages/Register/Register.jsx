import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/users'
import { toast } from 'react-toastify'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birth, setBirth] = useState('')

    const navigate = useNavigate()

    const onRegister = async () => {
        
        if (firstName.length === 0) {
            toast.warning('Please enter first name')
        } 
        else if (lastName.length === 0) {
            toast.warning('Please enter last name')
        } 
        else if (email.length === 0) {
            toast.warning('Please enter email')
        } 
        else if (phoneNumber.length === 0) {
            toast.warning('Please enter phone number')
        } 
        else if (password.length === 0) {
            toast.warning('Please enter password')
        } 
        else if (confirmPassword.length === 0) {
            toast.warning('Please confirm password')
        } 
        else if (password !== confirmPassword) {
            toast.warning('Passwords do not match')
        } 
        else if (birth.length === 0) {
            toast.warning('Please enter birth date')
        } 
        else {
            const response = await register(firstName, lastName, email, password, phoneNumber, birth)
            if (response['status'] === 'success') {
                toast.success('Registration successful')
                navigate('/login')
            } else {
                toast.error(response['error'])
            }
        }
    }

    return (
        <div className="container">
            <h4 className="page-header">Register here</h4>

            <div className="register-container">
                <div className='mb-3'>
                    <label htmlFor=''>First Name</label>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Last Name</label>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Phone Number</label>
                    <input
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type='tel'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Birth Date</label>
                    <input
                        onChange={(e) => setBirth(e.target.value)}
                        type='date'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Confirm Password</label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type='password'
                        className='form-control'
                    />
                </div>

                <div>
                    Already have an account? <Link to='/login'>Login here</Link>
                </div>

                <div className='mb-3 d-grid gap-2 col-6 mx-auto'>
                    <button
                        onClick={onRegister}
                        className='btn btn-info'
                    >
                        Register
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Register
