import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfile, logout } from '../Redux/userSlice'

function MainPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loggedInUserData, userLoggedIn} = useSelector((state)=>state.user)

  useEffect(()=>{
    async function fetchUser(){
        await dispatch(getProfile())
    }
  },[dispatch])

  async function logoutUser(){
    const res = await dispatch(logout())
    if(res?.payload?.success){
        navigate('/login')
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5'>
      <div className='w-full flex justify-center mb-10'>
        {
          userLoggedIn ? (
            <button 
            onClick={logoutUser}
            className='px-6 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-all'>
              Logout
            </button>
          ) : (
            <div className='flex space-x-4'>
              <button 
              onClick={()=>navigate('/signup')}
              className='px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all'>
                Signup
              </button>
              <button className='px-6 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-all'>
                Login
              </button>
            </div>
          )
        }
      </div>
      <div className='mx-auto flex justify-center'>
        {
          userLoggedIn ? (
            <div className='w-1/2 border border-gray-700 rounded-lg p-5 shadow-lg bg-gray-800'>
              <h1 className='text-center text-2xl font-semibold mb-4'>User Details</h1>
              <p className='text-lg mb-2'><span className='font-bold'>Name:</span> {loggedInUserData?.name}</p>
              <p className='text-lg mb-2'><span className='font-bold'>Email:</span> {loggedInUserData?.email}</p>
              <p className='text-lg'><span className='font-bold'>Bio:</span> {loggedInUserData?.bio}</p>
            </div>
          ) : (
            <div className='w-1/2 border border-gray-700 rounded-lg p-5 shadow-lg bg-gray-800'>
              <h1 className='text-center text-2xl font-semibold'>Please Join Us</h1>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MainPage
