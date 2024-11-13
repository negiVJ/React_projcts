import React, { useState } from 'react'
import { Input, CustomButton } from './compIndex'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock , faEnvelope, faPerson, faUser} from '@fortawesome/free-solid-svg-icons';

function SignUp() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const handleSignup=(data)=>{
        setError(null)
        try {
            const account = authService.createAccount(data);
            if (account) {
                const userData = authService.getUser();
                if (userData) {
                    // dispatch(login(userData))
                    //navigate here--
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className=' bg-white login-size m-20 p-5  border-white rounded-2xl shadow-xl'>
            <form onSubmit={handleSubmit(handleSignup)}>
                <h1 className='text-center  text-4xl font-bold'> Sign Up</h1>
                <div>
                <div className='relative'>
                    <Input type="text" placeholder="Username"
                    className='mt-4 w-full h-14 p-1 login-back rounded-full outline-none text-gray-500 text-xl pl-5 placeholder:text-gray-500 '
                    {...register('name', {
                        required:true
                    })}
                    ></Input>
                    <FontAwesomeIcon icon={faUser} className='i-position'/>
                </div>
                </div>
                <div className=' relative '>
                    <Input type="email" placeholder="Email"
                    className='mt-4 w-full h-14 p-1 login-back rounded-full outline-none text-gray-500 pl-5 text-xl placeholder:text-gray-500'
                    {...register('email', {
                        required:true,
                        validate:{
                            matchPattern: (value) =>
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email is not valid"
                        }
                    })}
                    ></Input>
                    <FontAwesomeIcon icon={faEnvelope} className='i-position'></FontAwesomeIcon>
                </div>
                
                <div className='relative'>
                    <Input type="password" placeholder="Password"
                    className='mt-4 w-full h-14 p-1 login-back rounded-full outline-none text-gray-500 text-xl pl-5 placeholder:text-gray-500'
                    {...register('password', {
                        required:true
                    })}
                    ></Input>
                    <FontAwesomeIcon icon={faLock} className='i-position'/>
                </div>
                <div className='flex justify-between mt-7 mb-6'>
                    <div className='flex'>
                    <Input type="checkbox" label="Remember Me" className="cursor-pointer ml-2  accent-white outline-none " ></Input>
                    </div>
                    {/* <Link to="#">Forget Password</Link> */}
                    <a to="#" className='cursor-pointer text-pink-500 hover:underline'>Forget Password</a>
                </div>
                <div>
                    <span>{error}</span>
                </div>
                <CustomButton type='submit' label='SIGN UP' classname='mt-3 w-full outline-none rounded-full font-medium text-xl bg-purple-600 border-purple-600 text-white h-12 hover:bg-purple-800'></CustomButton>
                <div className='mt-3 text-center'>
                    <span>Already have an account? <a to={"#"} className='cursor-pointer font-medium text-lg text-pink-500 hover:underline'>Log In</a></span>
                </div>
            </form>
        </div>
    )
}

export default SignUp