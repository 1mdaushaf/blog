import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authServices from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const Login = async (data) => {
        setError("")

        try {
            const session = await authServices.login(data)
            if (session) {
                const userData = await authServices.getCurrentUser()
                if (userData) dispatch(authLogin({ userData }));
                Navigate('/')

            }
        } catch (error) {
            setError(error.message)

        }
    }


    return (
        <div className='flex items-center justify-center w-full'   >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className=''>{error}</p>}
                <form onSubmit={handleSubmit(Login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            lable='Email'
                            placeholder='Enter your Email'
                            type='email'
                            {...register('email', {
                                required: true
                            })}
                        />
                        <Input
                            lable='password'
                            placeholder='Enter your Password'
                            type='password'
                            {...register('password', {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login