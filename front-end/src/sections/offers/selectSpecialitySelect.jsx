/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  useState, PiStethoscopeBold, useSelector, specialitiesDataState, useDispatch, setspecialitiesData, useEffect,
  useCookies, baseUrl, useNavigate
} from '../../import'

function Selectspeciality({ specialityValue, setSpecialityValue, error }) {
  const [toggleMenu, setToggleMenu] = useState(false)
  const specialitiesData = useSelector(specialitiesDataState)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }
  const handleSpecialitySelect = (e) => {
    setSpecialityValue({
      ...specialityValue,
      'speciality': e.target.innerText,
    })
    setToggleMenu(false)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/speciality`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        dispatch(setspecialitiesData(data))
      })
  }, [])

  return (
    <div className='flex flex-row  items-center border p-2 text-dark-color relative cursor-pointer
      rounded-lg  w-full shrink-0 md:w-[calc(50%-12px)] bg-white  md:mr-3'
      onClick={handleToggleMenu} >
      <span className='text-xs text-red-500 pl-1 h-2 absolute bottom-[-13%] left-0'>{error.speciality}</span>
      <PiStethoscopeBold className=' text-teal-color font-[500] text-[30px] mr-3 pointer-event-none' />
      <div className='flex flex-col flex-grow pointer-event-none' >
        <div className='text-teal-color text-lg font-light mb-1 pointer-event-none cursor-pointer'>Select Speciality</div>
        <input type='text' name='speciality' id='speciality' value={specialityValue.speciality} readOnly placeholder='Choose Speciality'
          className='text-center focus:outline-0 active:outline-0 pointer-event-none cursor-pointer placeholder:text-dark-color' />
        <ul className={`absolute w-full border bg-white rounded-b-lg top-[103%] left-0 overflow-x-hidden text-center md:text-left
          ${toggleMenu ? 'block' : 'hidden'} max-h-[200px] overflow-y-auto z-10 pointer-events-auto`}>
          {
            specialitiesData.map(speciality => {
              return (
                <li key={speciality.id} name={speciality.name} id={speciality.id}
                  className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
                  onClick={(e) => handleSpecialitySelect(e)} >{speciality.name}</li>
              )
            })
          }
          <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={() => navigate('/specialities/create')} >+ Add new Speciality</li>
        </ul>
      </div>
    </div>
  )
}

export default Selectspeciality