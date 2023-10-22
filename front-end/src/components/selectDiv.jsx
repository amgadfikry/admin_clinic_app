import { PiStethoscopeBold } from 'react-icons/pi';
import { useState } from 'react';

function SelectDiv() {
  const [specialityMenu, setSpecialityMenu] = useState(false)
  const [soecialityValue, setSpecialityValue] = useState('')

  const handleSpecialityMenu = () => {
    setSpecialityMenu(!specialityMenu)
  }
  const handleSpecialitySelect = (e) => {
    setSpecialityValue(e.target.innerText)
    setSpecialityMenu(false)
  }

  return (
    <div className='flex flex-row  items-center border rounded-lg p-2 text-dark-color relative cursor-pointer
      md:rounded-l-lg md:rounded-r-none md:flex-grow' onClick={handleSpecialityMenu} >
      <PiStethoscopeBold className=' text-teal-color font-[500] text-[30px] mr-3 pointer-event-none' />
      <div className='flex flex-col flex-grow pointer-event-none' >
        <div className='text-teal-color text-lg font-light mb-1 pointer-event-none cursor-pointer'>Select Speciality</div>
        <input type='text' name='speciality' id='speciality' value={soecialityValue} readOnly placeholder='Choose Speciality'
          className='text-center focus:outline-0 active:outline-0 pointer-event-none cursor-pointer placeholder:text-dark-color' />
        <ul className={`absolute w-full border bg-white rounded-b-lg top-[103%] left-0 overflow-hidden text-center md:text-left
          ${specialityMenu ? 'block' : 'hidden'} max-h-[200px] overflow-scroll z-10 pointer-events-auto`}>
          <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={(e) => handleSpecialitySelect(e)} >All</li>
          <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={(e) => handleSpecialitySelect(e)} >Gynacology</li>
          <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={(e) => handleSpecialitySelect(e)} >Cardiology</li>
          <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={(e) => handleSpecialitySelect(e)} >Neurology</li>
          <li className=' hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={(e) => handleSpecialitySelect(e)} >Orthopedic</li>
        </ul>
      </div>
    </div>
  )
}

export default SelectDiv