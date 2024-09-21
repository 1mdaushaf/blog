import React, {useState} from 'react'
import authServices from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button , Input , Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'



function SignUpC() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData =  await authServices.creatAccount(data)
            if (userData) {
              const userData =  await authServices.getCurrentUser()
                if (userData) dispatch(login(userData))
                Navigate('/')
                               
            }
        } catch (error) {
            setError(error.message)
            
        }
    }

  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
       <form onSubmit={handleSubmit(create)}>
        <div>
            <Input
            lable = 'Name'
            placeholder='Enter your Name'
            {...register('Name', {
                required :true
            })}
            />
               <Input 
            lable = 'Email'
            placeholder='Enter your Email'
            type='Email'
            {...register('Email', {
                required : true
            })}
            />
            <Input
            lable = 'Password'
            placeholder='Enter your Password'
            type='Password'
            {...register('Password', {
                required :true
            })}
            />
            <Button type ="submit"
            className = "w-full"
            > Create Account</Button>
        </div>
       </form>
    </div>
   </div>
  )
}

export default SignUpC