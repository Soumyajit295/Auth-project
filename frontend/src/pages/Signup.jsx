import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../Redux/userSlice'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  })

  function onValueChange(e) {
    const { name, value } = e.target
    setSignupData({
      ...signupData,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await dispatch(register(signupData))
    if (res?.payload?.success) {
      navigate('/login')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center text-white mb-6'>Signup</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm text-gray-400'>Name</label>
            <input
              type='text'
              name='name'
              value={signupData.name}
              onChange={onValueChange}
              className='w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter your name'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-gray-400'>Email</label>
            <input
              type='email'
              name='email'
              value={signupData.email}
              onChange={onValueChange}
              className='w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-gray-400'>Password</label>
            <input
              type='password'
              name='password'
              value={signupData.password}
              onChange={onValueChange}
              className='w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter your password'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-gray-400'>Bio</label>
            <textarea
              name='bio'
              value={signupData.bio}
              onChange={onValueChange}
              className='w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Tell us about yourself'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none'
          >
            Signup
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-400'>Do you have an account?</p>
          <Link
            to='/login'
            className='text-blue-400 hover:text-blue-500 transition-all'
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
