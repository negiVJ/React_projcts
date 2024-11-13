import React, { useState } from 'react'
import { Input, CustomButton } from '../components/compIndex'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock , faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { login } from '../store/authSlice'


export default function() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    


    const handleLogin = async (data) => {
        try {
            const account = await authService.logIn(data );
            if (account) {
                const userdata = await authService.getUser();
                if (userdata) {
                    dispatch(login(userdata))
                    navigate('/addPost');
                }
            }

        } catch (error) {
            setError(error.message);
        }
    }

    const printIt = async()=>{
        console.log("clicked")
        const user = await authService.getUser();
        console.log(user);
        // dispatch(login(user))
    }

    return (
        <div className='bg-white login-size m-20 p-5  border-white rounded-2xl shadow-xl'>
            <form onSubmit={handleSubmit(handleLogin)}>
                <h1 className='text-center mt-5 text-4xl font-bold'> Log In</h1>
                <div className='mt-5 relative '>
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
                <CustomButton type='submit' label='LOGIN' classname='mt-3 w-full outline-none rounded-full font-medium text-xl bg-purple-600 border-purple-600 text-white h-12 hover:bg-purple-800'></CustomButton>
                <div className='mt-3 text-center'>
                    <span>Don't have an account? <a to={"#"} className='cursor-pointer font-medium text-lg text-pink-500 hover:underline'>Sign Up</a></span>
                </div>
            </form>
        </div>
    )
}
