import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CustomButton} from '../compIndex'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import LogOutBtn from './LogOutBtn';

function Header() {

    const authStatus = useSelector((state)=>(state.auth.login));

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const listItems = [
        {
            name:"Home",
            slug:"/",
            active:true,
        },
        {
            name:"My Posts",
            slug:"/myposts",
            active:authStatus,
        },
        {
            name:"Saves",
            slug:"/saves",
            active:authStatus,
        },
        {
            name:"Add Posts",
            slug:"/addpost",
            active:authStatus,
        }
    ]


  return (
    <header className='fixed top-0 w-full z-50'>
         <div className=''>
            <nav className="flex justify-evenly bg-white  pl-2  font-medium  shadow-md  text-xl h-20 ">
                <div className="m-5 ml-2 p-3 self-center flex cursor-pointer ">
                   {/* <img src="megabyte.png" alt="" width="50" height="50"> */}
                   <span className="mt-3 font-normal text-2xl ml-2">My Blog</span>
                </div>
                <div className="">
                    <ul className='flex mt-0 mr-5 mb-0 ml-5 pr-12 pl-12 justify-center'>
                        {
                            listItems.map((item)=>(
                                item.active ? <li key={item.name} 
                                >
                                    <CustomButton type='button' label={item.name}
                                    onClick={()=>navigate(item.slug)}
                                    classname='m-5 p-2 no-underline hover:text-green-500 hover:underline cursor-pointer'></CustomButton>
                                </li>
                                :null
                            ))
                        }
                        
                        {
                            authStatus && (<LogOutBtn/>)
                        }
                    </ul>
                    
                </div>
                
                   {
                    authStatus ? null : (
                        <div className='mt-4 hidden md:flex'>
                            <CustomButton type='button' label='Log In' classname=' border-purple-600  border-2 rounded-md text-purple-600  p-2 h-12 bg-white hover:bg-slate-100 ' onClick={()=>navigate('/login')}></CustomButton>
                        <CustomButton type='button' label='SignUP' classname='rounded-md p-2  ml-3 h-12 bg-purple-600  text-white hover:bg-purple-700' onClick={()=>navigate("/signup")} ></CustomButton>
                        </div>
                    )}
                
            </nav>
        </div>
    </header>
  )
}

export default Header