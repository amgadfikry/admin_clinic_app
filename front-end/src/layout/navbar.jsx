/* eslint-disable react/prop-types */
import { IoMdNotifications } from 'react-icons/io'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useState } from 'react'

function Navbar({ adminData }) {
  const [darkMode, setDarkMode] = useState(false)

  const handleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <nav className='fixed top-0 w-full flex flex-row px-5 py-2 items-center bg-white drop-shadow-lg select-none'>
      <div className='text-2xl font-black text-teal-color cursor-pointer mr-auto'>Clinic App</div>
      <div className='mr-3' onClick={handleTheme}>
        {darkMode
          ? <MdDarkMode className='text-2xl text-teal-color font-bold cursor-pointer' />
          : <MdLightMode className='text-2xl text-teal-color font-bold cursor-pointer' />
        }
      </div>
      <IoMdNotifications className="text-2xl text-teal-color font-bold cursor-pointer mr-3" />
      <div className='flex flex-row items-center space-x-2'>
        <p>{adminData.admin_name}</p>
        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src='https://i.pravatar.cc/100' alt='profile' />
      </div>
    </nav>
  )
}

export default Navbar