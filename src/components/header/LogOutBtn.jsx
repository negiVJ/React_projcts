import React from 'react'
import {useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogOutBtn() {

  const dispatch = useDispatch()
    const logOutHandler=()=>{
      
        authService.logOut().then(()=>(dispatch(logout())))
    }


  return (
    <div>
        <button className='rounded-md p-2 mt-5 mb-5 ml-3 bg-purple-600  text-white hover:bg-purple-700' onClick={logOutHandler}>Log Out</button>
        
    </div>
  )
}

export default LogOutBtn