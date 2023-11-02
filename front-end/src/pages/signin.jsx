// Desc: Signin page for admin
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import { baseUrl } from '../../constant'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function Signin() {
  const [formState, setFormState] = useState({ 'user_name': '', 'password': '', 'remember': false })
  const [loginError, setLoginError] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'remember') {
      setFormState({ ...formState, [name]: !formState.remember })
    } else {
      setFormState({ ...formState, [name]: value })
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    const data = formState
    e.target.reset()
    setLoginError('')
    fetch(`${baseUrl}/api/admin/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('access_token' in data) {
          setCookie('token', data.access_token, { path: '/', expires: new Date(Date.now() + 604800000) })
          navigate('/dashboard')
        } else {
          setLoginError(data.msg)
        }
      })
    setFormState({ 'user_name': '', 'password': '', 'remember': false })
  }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-teal-color">
      <div className="rounded-xl drop-shadow-xl bg-white px-6 py-8 md:px-12 md:py-16 relative">
        <div className="text-xl mr-10 font-black text-teal-color cursor-pointer whitespace-nowrap
          absolute top-1 left-2">Clinic App</div>
        <h2 className="text-teal-color font-[900] text-4xl mb-12 text-center mt-3 md:mt-0">Admin Login</h2>
        <form className='text-dark-color text-center' onSubmit={handlesubmit}>
          <div className="flex flex-col relative mb-2 w-full">
            <FaUserAlt className='absolute text-teal-color text-base md:text-lg left-3 top-[30%]' />
            <input type="text" id="user_name" name="user_name" placeholder='User Name' onChange={handlechange}
              className="bg-gray-200 rounded-lg outline-none px-9 py-2 md:px-12 text-lg"></input>
          </div>
          <div className="flex flex-col relative mb-2 w-full">
            <FaLock className='absolute text-teal-color text-base md:text-lg left-3 top-[30%]' />
            <input type="password" id="password" name="password" placeholder='Password' onChange={handlechange}
              className="bg-gray-200 rounded-lg outline-none px-9 py-2 md:px-12 text-lg"></input>
          </div>
          <div className="flex flex-row items-center mb-6 px-1">
            <input type="checkbox" id="remember" name="remember" className="accent-teal-color outline-dark-color"></input>
            <label htmlFor="remember" className="font-medium ml-2">Remember me</label>
          </div>
          <input type="submit" value="Submit" onChange={handlechange}
            className='bg-teal-color rounded-3xl w-[50%] px-6 py-2 text-white font-medium text-lg cursor-pointer
            hover:bg-dark-color transition-all duration-300'></input>
          <div className="text-red-500 text-sm mt-2 h-2">{loginError}</div>
        </form>
      </div>
    </div>
  )
}

export default Signin