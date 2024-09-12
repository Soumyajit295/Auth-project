import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../Redux/userSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  function onValueChange(e) {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await dispatch(login(loginData))
    if (res?.payload?.success) {
      navigate('/')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center text-white mb-6'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm text-gray-400'>Email</label>
            <input
              type='email'
              name='email'
              value={loginData.email}
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
              value={loginData.password}
              onChange={onValueChange}
              className='w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none'
          >
            Login
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-400'>Don't have an account?</p>
          <Link
            to='/signup'
            className='text-blue-400 hover:text-blue-500 transition-all'
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
