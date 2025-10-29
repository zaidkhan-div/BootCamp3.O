import React, { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { validateEmail } from '../../utils/helper'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    // handling login form here
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email!");
            return;
        }
        if (!password) {
            setError("Please enter the password!");
            return;
        }

        setError('');
        console.log('Logging in:', { email, password })
        setEmail("");
        setPassword("");

        // Login Api Call

    }

    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-3xl font-semibold text-black'>Welcome Back</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Please enter your details to login
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label='Enter Your Email'
                        placeholder='john@example.com'
                        type='text'
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label='Password'
                        placeholder='Min 8 Characters'
                        type='password'
                    />
                    {error && <p className='text-xs text-red-500 pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-primary cursor-pointer'>
                        Login
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don’t have an account?{' '}
                        <Link to='/signUp' className='font-medium text-primary underline'>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login
